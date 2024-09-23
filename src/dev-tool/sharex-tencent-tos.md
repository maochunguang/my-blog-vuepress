---
title: sharex上传到腾讯云cos
icon: pen-to-square
date: 2024-02-18
category:
  - 开发工具

tag:
  - 博客工具
  - 博客图床
---



不管用什么工具写个人博客，都需要处理图片。在自媒体平台一般要求是把图片上传到他们那，比如公众号，知乎等，但是这样文章发到自己个人博客图片还需要在处理一次，非常的低效。因此使用工具把图片上传到自己的图床会非常的高效，常用的方案有两种，第一种是picgo+cos，第二种是sharex+cos。

<!-- more -->

## 原理

sharex自带很多种上传服务，但是没有腾讯云cos的选项。但是腾讯云cos是兼容AWS S3的api的，因此可以使用AWS S3的api来进行配置腾讯云cos。



## 腾讯云cos配置

这个地方就是设置SecretId，SecretKey，Bucket，AppId等关键信息。腾讯云cos有详细的教程，这里简单贴一下

1. 设定 Secretld：开发者拥有的项目身份识别 ID，用于身份认证，可在 [API 密钥管理](https://console.cloud.tencent.com/capi) 页面中创建和获取。
2. 设定 SecretKey：开发者拥有的项目身份密钥，可在 [API 密钥管理](https://console.cloud.tencent.com/capi) 页面获取。  
3. 设定 Bucket：存储桶，COS 中用于存储数据的容器。有关存储桶的进一步说明，请参见 [存储桶概述](https://cloud.tencent.com/document/product/436/13312) 文档。
4. 设定 AppId：开发者访问 COS 服务时拥有的用户维度唯一资源标识，用以标识资源，可在 [API 密钥管理](https://console.cloud.tencent.com/capi) 页面获取。
5. 设定存储区域：存储桶所属地域信息，枚举值可参见 [可用地域](https://cloud.tencent.com/document/product/436/6224) 文档，例如 `ap-beijing`、`ap-hongkong`、`eu-frankfurt` 等。
6. 设定存储路径：图片存放到 COS 存储桶中的路径。
7. 设定自定义域名：可选，若您为上方的存储空间配置了自定义源站域名，则可填写。相关介绍可参见 [开启自定义源站域名](https://cloud.tencent.com/document/product/436/36638)。
8. 设定网址后缀：通过在网址后缀添加 COS 数据处理参数实现图片压缩、裁剪、格式转换等操作，相关介绍可参见 [图片处理](https://cloud.tencent.com/document/product/436/54049)。



## sharex配置

![img](https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/21e85ac4332409bb39504c2f71a60de3.png)

![ShareX_Fnt7iUF4ka](https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/ShareX_Fnt7iUF4ka.png)



1、密钥id和密钥就是上面设置的Secretld，SecretKey。

2、节点就是访问地址域名去掉bucket，比如我的是北京的服务器就是https://cos.ap-beijing.myqcloud.com。

3、存储桶就是上面设置的bucket名字

4、上传路径这个可以使用默认的，也可以修改。

5、其他的不需要改了。

6、在“截图后的任务”设置为“上传图片”就行了。

