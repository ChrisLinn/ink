# Sublime Text Notes


You can also take a look at [my __Sublime Text 3__ config](https://bitbucket.org/chris_linn/my-subl-config/).

## Set Up
+ install `Package Control`
    * go to [`Package Control` Page](https://packagecontrol.io/installation)
    - ctrl+`
        - the Python console
        - execute the command
+ use `Package Control` to install/manage packages via Command Palette
    * Command Palette
        - control-shift-p
            + type `install package` or easily `ip`
+ install following packages and config them
    - MarkdownEditing
        - gfm
            - exclude txt extension
        * make scope gfm
    - MarkdownPreview
        - `"parser": "github",`
        - `"enable_mathjax": true,`
            + https://magicly.me/markdown-math/
        - `"enable_uml": true,`
        - ~~`"enable_highlight": false,`?~~
    * ClickableURLs
        - mouse
            + Ctrl+click
        - key
            + Ctrl+Alt+Enter
    * BracketHighlighter
    - allautocomplete
    - CompareSideBySide
    - rust enhanced
    - go sublime
    - pretty json
        + `ctrl+alt+j`
        ```
        {
            "keys": [
                "ctrl+alt+m"
            ],
            "command": "un_pretty_json"
        },
        ```
    - ~~sublimerge?~~
    - latextools
        + "open_pdf_on_build": true,
        + "keep_focus": false
        + builder_settings
            * `"linux" : {"command":["latexmk", "-cd", "-e", "-f", "-pdf", "-interaction=nonstopmode", "-synctex=1"]}`
        + "viewer": "okular",
        + "sync_wait": 0,
        + "keep_focus_delay": 0,
        + chinese support
            * https://tex.stackexchange.com/questions/41737/getting-xecjk-package-to-work-with-miktex
    - ~~refactor~~
    - ~~haskell~~
        + ~~cabal~~
            * ~~hsdev~~
            * ~~stylish haskell~~
    - ~~prolog~~
        - ~~for highlight~~
    * viewinbroswer
        - change default browser to chrome64 in Win
    * ConvertToUTF8
        * for linux may need Codecs33
    * git
        * for git still need to install it
            - install git-scm (non-portable) will be great
        * git savvy will install it
    * ~~gitgutter?~~
    * gitsavvy
        - need to config git path on win
    * ~~SyncedSideBar~~
    * ~~Side​Bar​Enhancements~~
        - ~~Open with~~
    * advancedNewFile
        - super + alt + n
    * bashbuild
    * Astyle?
    * sublimegdb?
        - .
            ```
            {
                "workingdir": "${folder:${file}}",
                "commandline": "g++ -g -std=c++11 ${file} -o ${file_base_name} && gdb --interpreter=mi --args ./${file_base_name}",
            }
            ```
        + key
            * F5
                - 开始调试
            * Ctrl+F5
                - 停止调试
            * F9
                - 设置断点
            * F10
                - Step over，执行一步，不进入函数
            * F11
                - Step into，进入函数
            * Shift+F11
                - Step out，跳出函数
    * clangformat?
    * clangautocomplete?
    * easyclangcomplete?
    * Terminal
        - 增加Open Terminal Here，快捷键为Ctrl+Shift+T
    * SublimeREPL
        - 这可能是对程序员很有用的插件。SublimeREPL 允许你在 Sublime Text 中运行各种语言（NodeJS ， Python，Ruby， Scala 和 Haskell 等等）。
    * SFTP
        - 只要Ctrl+S即可同步本地到服务器，妥妥的爽歪歪有么有？
    * packageDev
    * PackageResourceViewer
    * HexViewer
    * SublimeLinter
        - 这个插件最近才为SublimeText3重建和发布。新版本显然带来了很多新的和不同的功能，而不是把所有的Linter 放在一个包中，开发者允许你在更新时选择并安装你经常使用的Linter。很明显，这可以节省磁盘空间。“更多的定制”，这就是我需要的。
        - 用于高亮提示用户编写的代码中存在的不规范和错误的写法，支持 JavaScript、CSS、HTML、Java、PHP、Python、Ruby 等十多种开发语言。这篇文章介绍如何在 Windows 中配置 SublimeLinter 进行 JS & CSS 校验。 比如写例如像lua这样的弱语言脚本代码，有这个可以规避掉很多不该有的低级错误吧？当然这也需要你SublimeLinter安装完毕之后再安装一个SublimeLinter-lua即可。具体的使用可以参见：借助 SublimeLinter 编写高质量的 JavaScript & CSS 代码
    * TrailingSpaces
        - 她可以自动将多余的空格标红，以示提醒。当然，如果你想一键摒除之，这也很好办，加入一点配置即可：在 Preferences / Key Bindings – User加上如下代码即可（数组内部，当然快捷键可自行约定，我这里用的是 ctrl+shift+d ）
    * Trmmer
        - 你知道当你编写代码时，由于错误或别的某些原因，会产生一些不必要的空格。需要注意的是多余的空格有时也会造成错误。这个插件会自动删除这些不必要的空格。
    * Alignment
        - 这个插件让你能对齐你的代码，包括 PHP、CSS 和 Javascript。代码看起来更简洁和可读，便于编辑。您可以查看下面的图片来明白我说的意思。
    * jsFormat
    * HTML-CSS-JS Prettify
        - 一款集成了格式化（美化）html、css、js三种文件类型的插件，即便html,js写在PHP文件之内。插件依赖于nodejs，因此需要事先安装nodejs，然后才可以正常运行。插件安装完成后，快捷键ctrl+shift+H完成当前文件的美化操作。插件对html、css文件的美化不是非常满意，但还可以，后面将说明如何修改css美化脚本。本人用起来超级爽的，鉴于篇幅，就不赘述，可以参见这篇介绍。
    * phpFormat
    * DocBlockr
        - 可以自动生成 PHPDoc? JsDoc风格的注释。它支持的语言有Javascript, PHP, ActionScript, CoffeeScript, Java, Objective C, C, C++
            + `/*`:回车创建一个代码块注释
            + `/**`:回车在自动查找函数中的形参等等。
    * Javascript-API-Completions
        - 支持Javascript、JQuery、Twitter Bootstrap框架、HTML5标签属性提示的插件，是少数支持sublime text 3的后缀提示的插件，HTML5标签提示sublime text3自带，不过JQuery提示还是很有用处的，也可设置要提示的语言。
    * Emmet(Zen Coding)
        - 快速生成HTML代码段的插件，强大到无与伦比:可以超快速编写HTML/CSS/JS，当然这个插件还支持多种编译环境，如常见的：Eclipse/Aptana、Coda、Notepad++、Adobe Dreamweaver、TextMate等，web开发必备！！！
        - Emmet 是一个插件，它可以让你更快更高效地编写HTML和CSS，节省你大量的时间。怎么实现的？你只需使用约定的缩写形式而不用写整个代码，然后这些缩写会自动扩展转换为对应的有效的标签。 比如， 你只需要输入 ((h4>a[rel=external])+p>img[width=500 height=320])* 12 ， 然后它会被扩展转换成12个列表项和紧随其后的图像。 然后您可以填写上内容， 就这么简单。
    * CSSComb
        - 这是用来给CSS属性进行排序的格式化插件。如果你想保持的代码干净整洁，并且希望按一定的顺序排列（是不是有点强迫症了？），那么这个插件是一种有效解决的方案。特别是当你和其他有自己代码编写风格的开发者一同协作的时候。
    * CanIUse
        - 如果您想检查浏览器是否支持你包括在你的代码中的CSS和HTML元素，那么这是你需要的插件。所有您需要做的就是选择有疑问的元素，插件将为你做其余的事情。
    * SublimeTmpl 快速生成文件模板
        - 一直都很奇怪为什么sublime text 3没有新建文件模板的功能，像html头部的DTD声明每次都要复制粘贴。用SublimeTmpl这款插件终于可以解脱了，SublimeTmpl能新建html、css、javascript、php、python、ruby六种类型的文件模板，所有的文件模板都在插件目录的templates文件夹里，可以自定义编辑文件模板

## Apprearance
+ hide menu?
    + don't hide on Linux
+ Dracula
+ or maybe try the theme file (Adaptive) in [my __Sublime Text 3__ config](https://bitbucket.org/chris_linn/my-subl-config/).
- show folder (side bar) but hide open file


## Shortcuts
+ HTML-CSS-JS Prettify
    * C+S+H
+ MardownEditting
    * S+Tab
        - fold/unfold
+ show headers/function?
    * Cre
    * Crr
+ commentize
    * C+/
    * C+S+/
+ auto completion
        * "auto_complete": true
            * `C+space` somtimes not working because of IME shortcuts
        + "auto_complete_commit_on_tab" :true
            * for less ambiguous
+ reindent
    * { "keys": ["ctrl+r", "ctrl+i"], "command": "reindent" }
* code folding
    - fold
        - C+S+[
    * unfold
        - C+S+]
- fold case
    + Cku
    + Ckl
- show scope name
    - S+C+A+P
- select
    + C+d
    + C+l
- movements/navigations
    + go back
        + A-
    - go forward
        + AS-
- goto
    + file: C+p
    + tabs
        * C+TAB
        * C+S+TAB
        * C+PageUp
        * C+PageDown
    + symbol: Cr
    + symbol in the proj: S+C+r
    + def: F12
    + any word: C+;
- jump
    - back: A+-
    - forward: A+S+-
- bookmark
    + toggle: C+F2
    + next: F2
    + previous: S+F2
    + select all: A+F2
    + clear: S+C+F2
- search:
    + C+f
    + find in files: S+C+f
- replace:
    + C+h
    + S+C+h
- spell check
    + F6

# Latex formula
+ http://latex.codecogs.com/
+ https://www.codecogs.com/latex/eqneditor.php
+ http://www.sciweavers.org/free-online-latex-equation-editor
+ http://www.sciweavers.org/tex2img.php?eq=1%2Bsin%28mc%5E2%29&bc=White&fc=Black&im=jpg&fs=12&ff=arev&edit=
