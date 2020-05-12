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
