---
title: 安全 API 的设计模式
---

# 安全 API 的设计模式

由 [Code Patterns for API Authorization: Designing for Security](https://research.nccgroup.com/2020/04/21/code-patterns-for-api-authorization-designing-for-security/) 整理而来。便于开发者和审计者参考。

## 前言

内部代码的设计模式基本就反应了大型软件的安全性。

如果代码可以被危险地内部访问，安全性问题就会在不检查安全性时在外部体现出来：

+ 验证绕过
+ 提权
+ 攻击其他用户

APIs 应该强制要求访问数据时的安全性。良好的设计可以减小出问题的概率。

## 常见的认证内部设计模式
### Ad-hoc (专用方法)
每个路由都写一份权限检查和逻辑。

```py
@route("/messages/:id")
def get_message(context, message_id):
    message = get_message(message_id)

    if context.user == message.recipient:
        return message

    return "Not authorized"
```

这是最常见也是最危险的一种模式之一。

也许在一个简单程序中还行，但是随着程序的变大很快这种方法就难以维护、容易犯错误，导致严重的认证绕过漏洞，尤其是一个历史悠久的、有许多组合逻辑的程序。

__基本可以认为这种模式等于没有防护。__

对于审计来说，这种模式其实很难系统性地审计，手动测试还差不多。

[AutoRepeater](https://github.com/nccgroup/AutoRepeater) 和 [Autorize](https://portswigger.net/bappstore/f9bbac8c4acf4aefa4d7dc92a991af2f) 可以有助于进行测试。

### Route-based (基于路由)
每个路由显式声明访问这个路由所需要的权限。

一般在装饰器或路由文件中进行声明，同时中间件会在执行路由逻辑之前进行认证检查。

```py
@route("/messages/:id")
@authorize("read_messages")
def get_message(message_id):
    return get_message(message_id)
```

有些情况下可以用这种方法，但大部分情况下会导致严重的问题。

+ 在需要更多的上下文信息来判断认证方式时不适用。
    + 如果要检查一个用户是否允许访问某个对象，就要在路由逻辑中检查一遍，又在代码中 ad-hoc 地检查一遍。虽然这种上下文逻辑也可以放在中间件，但实际上只是转移了问题而并没有解决。
+ "fail-open" design 的风险。
    * 一般习惯只有在特定认证时才会进行检查，于是开发者就容易忘记给路由加上装饰器，导致认证漏洞。
    * 要解决这个问题就要加一个反装饰器（比如 `@dangerous_noauth`），拒绝掉没写装饰器的路由的认证。

这种方法对于企业级应用更有效，因为：

+ 应用程序的 [租户 (tenant)](https://zh.wikipedia.org/wiki/%E5%A4%9A%E7%A7%9F%E6%88%B6%E6%8A%80%E8%A1%93) 之间的强隔离(比如说数据库)
+ 对象属于租户，而不是特定的用户

这样，路由就不需要基于一个用户的上下文进行逻辑判断，而只需要判断某组用户是否有权限进行某些操作，比如管理员 有完全控制权，会计就只能读取财务数据。

这种模式利于审计(只要它可以被搜索)。搜出路由的定义并检查每个定义是否做了正确的权限检查即可。要注意前面提到的没写 路由定义导致的 "fail-open" 问题。


### Centralized (中央控制模式)
在一个地方统一地基于对象的身份和上下文定义权限，比如说在配置文件或者在代码里。

路由逻辑当想访问(创建、读取、更新、删除)对象调用中央 APIs，这样就没法绕过中央权限控制。

以下例子受到 Rails 和 [CanCanCan gem](https://github.com/CanCanCommunity/cancancan#32-loaders) 的启发。
```py
# External-facing route for /message/:id
def get_message(context, message_id)
    # Any logic here is safe as long as we use the safe APIs
    return safe_read_message(context.user, message_id)
end

# Safe APIs replace direct ORM calls
# These methods are usually not handwritten, but this shows the logic
def safe_read_message(user, message_id)
    # Unsafe direct ORM call, not used outside of this method
    message = Message.unsafe_find(message_id)

    # .can? explicitly checks authorization via authorize
    if user.can?(:read, message)
        return message

    raise NotAuthorizedException
end

# Central Authorization Logic
def authorize(user)
    # Examples: users can read profiles, update their own profile, write messages
    can :read, UserProfile
    can :update, UserProfile, id: user.profile.id
    can :create, Message

    # Users can only read messages where they are the recipient
    readable_messages = Message.where(recipient: user)
    can :read, Message, id: readable_messages
end
```

这种模式一般来讲比起 ad-hoc 和 route-based 更加有效，也极度方便审计：
所有认证逻辑都在一个地方，
并能有效防止不安全访问对象的路由逻辑。
开发者可以认为只要他们使用安全的 APIs 就不会引发认证绕过。

缺点就是比较难随着对象和开发者的增长而可扩展，所以后续一般会选择迁移到 Object-based 基于对象的模式。

### Object-based (基于对象)
Object-based 模式实际上和 centralized 中央控制模式相似，但权限在对象处定义（每个对象一个授权方法或者配置文件），这样可扩展性更好。

```py
class UserProfile
    def authorize(user)
        can :read, UserProfile
        can :update, UserProfile, id: user.profile.id
    end
end

class Message
    def authorize(user)
        can :create, Message

        readable_messages = Message.where(recipient: user)
        can :read, Message, id: readable_messages
    end
end
```

这种模式的缺点主要是，如果对象类型变多，授权容易出问题的地方就会很多。

在这种模式下，在开发流程中要保持对授权逻辑的重视：

+ 创建或修改授权方式时要仔细地 code review
+ 要有静态分析工具检测不安全的授权方法
+ 用可以检测授权逻辑的测试框架使开发者可以方便地测试授权

审计这种模式的方法和审计 centralized 中央控制模式是一样的，但一般大项目中用 object-based 的更多，所以可以专注于特定逻辑的审计，和只看对象的每个单独 feature 的授权逻辑。

这种模式下想要一次性系统性地审计每一个对象的授权逻辑基本上是不可能的，因为关联代码量太大而且如果不是在真正使用程序是很难搞清楚对象之间的关系。

## 结论
选用哪种设计模式取决于你软件的类型、use cases、功能，以及是否需要考虑扩展到多对象、多路由、多开发者。

+ 一般复杂的系统会选择 centralized 或 object-based 模式。
+ 简单的则可以用 route-based 或 ad-hoc。

</br>
除了这些设计模式外，一些通用的建议：

+ 确定 use cases 及其所需要的 认证检查
+ 从简单的设计开始，有需要的话确保能扩展
+ 确保这个设计在各种情况下正确工作且易于使用，这样开发者（至少在有 review 的情况下）就不容易绕过系统的安全检测
+ 尽量使逻辑易于审计，这样你就可以容易发现是否有遗漏认证检查、或可被绕过
