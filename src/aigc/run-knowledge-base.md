---
title: 本地搭建chatgpt知识库
icon: fab fa-markdown
order: 2
category:
  - AIGC
tag:
  - langchain
  - chatgpt
---
🤖️ 一种利用 langchain 思想实现的基于本地知识库的问答应用，目标期望建立一套对中文场景与开源模型支持友好、可离线运行的知识库问答解决方案。
<!-- more -->

## langchain-chatchat搭建知识库原理
🤖️ 一种利用 langchain 思想实现的基于本地知识库的问答应用，目标期望建立一套对中文场景与开源模型支持友好、可离线运行的知识库问答解决方案。

实现原理如下图所示，过程包括加载文件 -> 读取文本 -> 文本分割 -> 文本向量化 -> 问句向量化 -> 在文本向量中匹配出与问句向量最相似的 top k个 -> 匹配出的文本作为上下文和问题一起添加到 prompt中 -> 提交给 LLM生成回答。

![原理图](https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/langchain-chatglm.png)

## 环境准备
### 硬件准备：
win11+wsl2，显卡最好是N卡，我的是2080ti22g（魔改版），这款性价比很高，推荐购买。

### 软件准备：
1. 安装python环境管理工具，`pyenv`或者`conda`，我这里用的`pyenv`。
2. 安装好python 3.10版本，
3. 安装好显卡驱动和cuda，根据显卡来安装版本，在win11下安装就行。
4. 安装好git
5. 有梯子的话建议整一个。

#### 验证显卡，python和cuda
方法一、
打开命令提示符或 PowerShell。输入以下命令：`nvidia-smi`在输出中，可以看到显卡的名称和支持的 CUDA 版本。

方法二、
使用 Python导入 torch 库。
使用`torch.cuda.is_available()` 函数来检查是否支持 CUDA。
使用`torch.cuda.get_device_name(0)` 函数来获取第一个显卡的名称。
使用`torch.cuda.get_device_properties(0)`函数来获取第一个显卡的属性，其中包括支持的 CUDA 版本。
示例代码：
```python
import torch

if torch.cuda.is_available():
    print(f"支持 CUDA，第一个显卡名称：{torch.cuda.get_device_name(0)}")
    print(f"第一个显卡支持的 CUDA 版本：{torch.cuda.get_device_properties(0).cuda_version}")
else:
    print("不支持 CUDA")
```
这里可能有个小坑，如果win11里可以看到gpu可用，但是wsl2中无可用cpu，可以把wsl2先停掉，再重新启动。

## 本地搭建步骤
### 1、复制项目
```bash
git clone https://github.com/chatchat-space/Langchain-Chatchat.git; 
cd Langchain-Chatchat
```
### 2、创建环境
这里不管你用什么虚拟环境管理都可以，一定用一个单独的环境，防止依赖冲突和报错。这里是以`pyenv`为例子。
```bash
python -m venv test_langchain_chat
source test_langchain_chat/bin/activate
```

### 3、安装依赖
这里安装的适合如果下载的太慢，可以使用安装源，
#### a、 使用-i参数安装
`pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ package_name`。

#### b、全局设置安装源
可以修改 pip 的配置文件 pip.conf 来全局指定 pip 镜像源。pip.conf 文件位于用户目录下的 .config/pip 目录中。
在 pip.conf 文件中，添加以下内容：
```
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple/
```
保存并关闭 pip.conf 文件后，重启 pip。

#### c、安装所有依赖
```bash
# 安装全部依赖
pip install -r requirements.txt 
pip install -r requirements_api.txt
pip install -r requirements_webui.txt 
```

### 4、下载模型
在本地或离线环境下运行，需要首先将项目所需的模型下载至本地，通常开源 LLM 与 Embedding 模型可以从 HuggingFace下载。以本项目中默认使用的 LLM 模型 THUDM/ChatGLM3-6B 与 Embedding 模型 BAAI/bge-large-zh 为例：

下载模型常用的网站有以下几个，
1. https://huggingface.co/
2. https://www.modelscope.cn/models

下载方式有以下几种
#### a、git lfs下载
先安装git lfs，如下：
https://docs.github.com/zh/repositories/working-with-files/managing-large-files/installing-git-large-file-storage
```bash
git lfs install
git clone https://huggingface.co/THUDM/chatglm3-6b
git clone https://huggingface.co/BAAI/bge-large-zh
```

#### b、使用huggingface_hub下载
详细的教程可以参考：https://hf-mirror.com/docs/huggingface_hub/guides/download
```bash
pip install --upgrade huggingface_hub
from huggingface_hub import hf_hub_download
hf_hub_download(repo_id="lysandre/arxiv-nlp", filename="config.json")
```
#### c、使用modelscope-cli下载
```bash
## 安装下载客户端
pip install modelscope-cli

## 下载模型
modelscope download bert-base-chinese
 
```

### 5、修改和初始化配置
#### a、初始化配置
```bash
## 复制配置文件
python copy_config_example.py
## 初始化知识库
python init_database.py --recreate-vs
```

#### b、修改模型配置
修改`configs/model_config.py`
建议把所有的模型放到一个文件夹，后续如果玩其他大模型指定以下目录就行了。

```python
MODEL_ROOT_PATH = "/home/xx/soft/ai-models"
```

### 6、启动调试
执行命令启动服务；访问http://localhost:8501/
```bash
python startup.py -a
```
### 7、知识库测试
我这里上传了基本epub书籍，都是金融相关的。搜索什么是指数基金是可以显示知识库来源的

![img](https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/v2-cfc6b68f151b1ea8148093e0034ad686_1440w.webp)

![img](https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/v2-d3494e31e9a8c04fcd98da270adef82d_1440w.webp)