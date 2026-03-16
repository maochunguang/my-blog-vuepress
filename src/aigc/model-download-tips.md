---
title: 大模型下载的姿势大全
icon: fab fa-markdown
order: 3
category:
  - AIGC
tag:
  -  LLM
  - chatgpt
---
🤖️大模型下载的常用方法，用 huggingface，github 等工具来下载大模型。
<!-- more -->

下载开源大模型（如 Llama 3、DeepSeek、Qwen 等）的方法主要取决于你的**技术背景**以及**使用场景**。目前主流的方法可以分为以下四大类：

---

## 1. 开发者首选：Hugging Face (全球通用)

Hugging Face 是 AI 界的 "GitHub"，托管了绝大多数开源模型的权重文件。

* **方法：**
* **网页直接下载：** 在模型页面的 `Files and versions` 栏目下手动下载 `.safetensors` 或 `.bin` 文件。
* **命令行工具 (推荐)：** 使用官方提供的 `huggingface-cli`。
```bash
huggingface-cli download meta-llama/Meta-Llama-3-8B

```


* **Python 代码下载：** 使用 `transformers` 库，在运行代码时会自动触发下载并缓存。


* **优点：** 模型最全，更新最快。
* **缺点：** 权重文件动辄几十 GB，国内访问速度可能受限，需要配置镜像站（如 `hf-mirror.com`）。

## 2. 国内用户首选：魔搭社区 (ModelScope) & 始智 (WiseModel)

由于网络环境原因，国内大厂和机构推出了本土化的模型仓库。

* **魔搭社区 (ModelScope)：** 阿里巴巴旗下的开源平台。
* **方法：** 使用 `modelscope` 库通过 Python 下载。
```python
from modelscope import snapshot_download
model_dir = snapshot_download('qwen/Qwen2-7B-Instruct')

```




* **始智 (WiseModel)：** 清华系背景的国产开源社区，下载速度也非常快。
* **优点：** **国内直连，不限速**，对国产模型（Qwen, ChatGLM, Yi）支持极好。

## 3. 小白/本地部署神器：Ollama

如果你不想写代码，只想在电脑上直接“跑”模型，这是最简单的方法。

* **方法：**
1. 前往 [ollama.com](https://ollama.com) 下载并安装软件。
2. 打开终端输入命令即可自动下载并运行：
```bash
ollama run llama3

```




* **优点：** **一键下载+配置+运行**，支持模型量化（压缩），普通民用显卡也能跑大模型。
* **缺点：** 仅限 Ollama 库中已有的模型，灵活度略低于 Hugging Face。

## 4. 进阶量化版本：Hugging Face (GGUF/AWQ 分支)

如果你内存/显存有限，不想下载动辄 50GB 的原始模型，可以下载经过压缩的“量化版”。

* **方法：** 在 Hugging Face 搜索模型名时，关注带有 **-GGUF** (适合 CPU/普通电脑) 或 **-AWQ/-GPTQ** (适合专业显卡) 后缀的用户（如 `TheBloke` 或 `bartowski`）。
* **优点：** 文件体积缩小 50%-70%，且对推理性能影响较小。

---

## 总结建议

| 你的需求 | 推荐方法 |
| --- | --- |
| **纯新手，只想找模型聊天** | **Ollama** |
| **国内开发者，追求下载速度** | **ModelScope (魔搭)** |
| **科研/开发，需要最全的模型** | **Hugging Face** |
| **设备配置一般，追求流畅运行** | **下载 GGUF 量化版** |








