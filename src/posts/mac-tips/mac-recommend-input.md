---
icon: pen-to-square
date: 2024-02-08
category:
  - 玩转Mac

tag:
  - Mac
  - 输入法
---
# mac自定义输入法

从2015年开始用mac，时光荏苒，不知不觉已经九年了。今天就分享一个可以高度自定义的输入法，“鼠须管”。
“鼠须管”输入法，从输入法名字，样式，词库，行为等都可以自定义的输入法，推荐给有一定折腾能力的软件开发者。

<!-- more -->

## 鼠须管是什么？

[RIME | 中州韻輸入法引擎](https://rime.im/)
RIME是一个开源的输入法引擎，基于这一框架，Rime 开发者与其他开源社区的参与者在 Windows、macOS、Linux、Android 等平台上创造了不同的输入法前端实现。

- 鼠须管是mac版本的实现。
- 小狼毫是windows版本的实现。

## 如何安装

#### 方法一、直接安装

下载地址：[Release 0.16.2 · rime/squirrel (github.com)](https://github.com/rime/squirrel/releases/tag/0.16.2)

#### 方案二、brew安装

```bash
brew install --cask squirrel
```

## 如何配置

建议使用plum进行配置管理，建议把plum安装到 `~/Library/Rime`目录，这个也是鼠须管输入法的配置目录。

```bash
git clone --depth 1 https://github.com/rime/plum.git
cd plum
bash rime-install :preset
```

plum可以安装非常多的东西，建议按需安装，推荐安装的是 emoj，明月简拼。我个人使用的是**明月简拼**，所以后面很多的配置都是基于这个来的。

常见的配置文件如下：

| 文件                   | 注释                                               |
| :--------------------- | :------------------------------------------------- |
| default.custom.yaml    | 核心配置、全局配置                                 |
| squirrel.custom.yaml   | 平台相关配置。样式皮肤，不同软件默认输入法状态等。 |
| <方案标识>.custom.yaml | 对预设输入方案的定制配置                           |
| <名称>.dict.yaml       | 词典                                               |
| custom_phrase.txt      | 自定义短语                                         |

**修改配置文件后记得重新部署才能生效。mac 上的快捷键是 `Ctrl + Option + ~`。**



#### 1、配置外观

编辑`squirrel.custom.yaml` 文件，这里主要是修改输入法的字体，主题，文字大小，还有横排竖排展示等。

```yaml
patch:
  # 修改程序外观
  style:
    color_scheme: clean_white    # 选择配色主题（squirrel.yaml 源文件中预定义了多种主题）
    font_face: Hei                  # 候选词字体（可以使用 macOS 自带的“字体册.app”检索）
    font_point: 16                  # 候选词大小
    label_font_face: Hei   			# 候选词编号字体
    label_font_size: 18             # 候选词编号大小
    horizontal: true                # 候选词是否横排
    inline_preedit: true           # true 将待转字母嵌入显示在目标程序窗口，false 将待转字母显示在输入法窗口
```



编辑default.custom.yaml文件，设置默认输入法，候选词个数。

```yaml
patch:
  menu:
    page_size: 9
  schema_list:
    - schema: luna_pinyin_simp
    # - schema: easy_en
```



#### 2、emoj输入设置

编辑luna_pinyin_simp.custom.yaml文件

```yaml
__patch:
  - patch/+:
      __include: emoji_suggestion:/patch

```

使用输入法，输入篮球，就能看到🏀️的表情了。



#### 3、特定程序的默认输入

这个比较实用，比如在命令行界面，默认输入英文，在文本编辑器默认使用中文等，这里都很容易实现。由于我使用的是明月简拼，所以只需要修改`luna_pinyin_simp.custom.yaml`文件

```yaml
patch:
  app_options/com.googlecode.iterm2:  # 程序名字全用小写字母
    ascii_mode: true
    sacii_punct: true
```

这里需要注意的是，程序的名字如何找。

活动监视器 --» 搜索进程  --» 检查所选进程 --» 点击取样 --» 找到`Identifier`即可。 

![image-20240209212920272](https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/image-20240209212920272.png)



#### 4、自定义短语

这个比较简单，编辑`custom_phrase.txt`文件。

```
马上到 msd
稍等一下 sdyx
我正在开会，稍后回复你 wzzkh
```



#### 5、自定义词典

首先这里不记录也不推荐各位导入网上的词典，比如搜狗词典，百度词典。因为它们很多日积月累非常庞大，包含了不少已经过时的词汇，都非常的大，影响性能。Rime 在使用的过程中会逐步积累真正常用的词汇。

第一步，查看当前方案所使用的词典文件。「明月拼音」里默认配置如下：

```yaml
translator:
  dictionary: luna_pinyin # <-- 这个就是使用的词典
```

然后建立我们自己的词典，文件名为 `xxx.dict.yaml`，内容格式见 [wiki](https://github.com/rime/home/wiki/RimeWithSchemata#編寫詞典) 这里给出一个例子：

```yaml
---
name: my_pinyin
version: "1"
sort: by_weight
use_preset_vocabulary: true
import_tables:
  - luna_pinyin
...

测试    ce shi
集美    ji mei
```

关键点有两个：

1. `import_tables` 里记得导入方案原来使用的词典。
2. 每一个条目不同字段用 `Tab` 分隔。部分编辑器会自动转成空格，注意！

最后编辑我们的方案定制文件 `luna_pinyin_simp.custom.yaml`，把词典改成自己创建的：

```yaml
patch:
  translator/dictionary: my_pinyin
```



#### 6、自定义标点符号

默认的符号会有很多，比如我输入$，默认能出一堆符号，我要连续输入的时候，更麻烦。因此这里需要特殊配置一下。

![image-20240209225140678](https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/image-20240209225140678.png)

对于方案「明月拼音」，输入 `{` 默认会有一堆选项，要是我希望和 mac 系统输入法一样直接输入 `「` 呢。查看输入方案定义，发现引用了 `symbols`：

```yaml
punctuator:
  import_preset: symbols
```

再看看 `symbols.yaml` 里面有一大堆形形色色的符号，总体上分为全角模式、半角模式与图形。其中半角模式的定义如下：

```yaml
'{' : [ 『, 〖, ｛ ]
'}' : [ 』, 〗, ｝ ]
```

仿照这个模式来编写定制文件 `luna_pinyin_simp.custom.yaml`:

```yaml
patch:
  punctuator/half_shape:
    "{": "「"
    "}": "」"
    "#": "#"
```

> 当 value 是一个值时将直接输入，若是数组，哪怕只有一个元素，也会弹出候选框，例如 `"{" : ["「"]`



#### 7、快捷键配置

注意这里和 mac 上 `Caps` 切换不是一回事。`Caps` 实际上是切换输入法，是系统级别的。这里是输入法内部的切换。

中文切换可用的按键包括 `Caps_Lock`, `Shift_L`, `Shift_R`, `Control_L`, `Control_R`，mac 系统的实现由于不区分左右按钮，故 `_R` 结尾的 key 不可使用。

**按下按钮后的动作有这几种：**

| value        | 注释                                                         |
| :----------- | :----------------------------------------------------------- |
| commit_text  | 提交候选区的文字，然后切换到英文模式。                       |
| commit_code  | 提交已输入的编码（拼音字母），然后切换到英文模式。           |
| inline_ascii | 仅 `inline_preedit=true` 时有效。在输入法的编辑区临时切换到英文，提交后恢复中文。 |
| noop         | 不执行任何操作。                                             |
| clear        | 清除已输入的编码，然后切换到英文模式。                       |

修改`default.custom.yaml`文件。

```yaml
patch:
  ## 切换输入法设置
  ascii_composer/good_old_caps_lock: true
  ascii_composer/switch_key:
    Caps_Lock: commit_code
    Control_L: noop
    Control_R: noop
    Shift_L: commit_code
    Shift_R: commit_code
  key_binder/bindings:
  ## 翻页设置[]
    - when: paging
      accept: bracketleft
      send: Page_Up
    - when: has_menu
      accept: bracketright
      send: Page_Down
```



#### 8、中英混输

这个不建议折腾了，我用了easy_en，配置完之后一直有个问题没解决，就是有些拼音拼错了，经常出现在第一个位置一长串的拼音英文，很影响输入体验。

我的中英混输配置如下，编辑`luna_pinyin_simp.custom.yaml`文件。

```yaml
# 加載 easy_en 依賴
"schema/dependencies/@next": easy_en
# 載入翻譯英文的碼表翻譯器，取名爲 english
"engine/translators/@next": table_translator@english
# english 翻譯器的設定項
english:
  dictionary: easy_en
  spelling_hints: 9
  enable_completion: false
  enable_sentence: false
  initial_quality: -3
easy_en/enable_sentence: false


__patch:
  - patch/+:
      __include: emoji_suggestion:/patch
      __include: easy_en:/patch

```





