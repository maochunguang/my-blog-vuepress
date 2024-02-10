---
icon: pen-to-square
date: 2023-11-16
category:
  - 开发工具

tag:
  - 博客工具
  - 评论插件
---

# vuepress使用Twikoo评论系统
使用静态博客，永远离不开评论的问题。早些年有免费的“多说”，可惜因为资金问题倒闭了。现在博客的评论很多都是基于github的，对于国内用户来说访问太慢了。这里使用Twikoo主要是自己有云服务器，自己搭建Twikoo，国内用户访问比较快。

<!-- more -->



## 安装Twikoo步骤

#### 1、安装nodejs

这里建议使用nvm安装，先安装nvm，然后在安装nodejs。

```bash
## 安装nvm
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
## 安装nodejs的lts版本
nvm install --lts
```



#### 2、安装twikoo

使用npm安装tkserver。

```bash
npm i -g tkserver
```



#### 3、配置环境变量

Twikoo支持的环境变量如下，这些都是可选的，如果不配置，就走默认值。

| 名称                    | 描述                                                         | 默认值   |
| :---------------------- | :----------------------------------------------------------- | :------- |
| `MONGODB_URI`           | MongoDB 数据库连接字符串，不传则使用 lokijs                  | `null`   |
| `MONGO_URL`             | MongoDB 数据库连接字符串，不传则使用 lokijs                  | `null`   |
| `TWIKOO_DATA`           | lokijs 数据库存储路径                                        | `./data` |
| `TWIKOO_PORT`           | 端口号                                                       | `8080`   |
| `TWIKOO_THROTTLE`       | IP 请求限流，当同一 IP 短时间内请求次数超过阈值将对该 IP 返回错误 | `250`    |
| `TWIKOO_LOCALHOST_ONLY` | 为`true`时只监听本地请求，使得 nginx 等服务器反代之后不暴露原始端口 | `null`   |
| `TWIKOO_LOG_LEVEL`      | 日志级别，支持 `verbose` / `info` / `warn` / `error`         | `info`   |
| `TWIKOO_IP_HEADERS`     | 在一些特殊情况下使用，如使用了`CloudFlare CDN` 它会将请求 IP 写到请求头的 `cf-connecting-ip` 字段上，为了能够正确的获取请求 IP 你可以写成 `['headers.cf-connecting-ip']` | `[]`     |

我这里为了方便，配置了端口和数据存储路径。编辑`~/.bashrc`文件。

```bash
export TWIKOO_PORT=9898
export TWIKOO_DATA=/home/ubuntu/soft/twikoo/data
```

然后 `source ~/.bashrc`。



#### 4、启动twikoo服务

```bash
# 第一种直接启动
tkserver
# 后台启动
nohup tkserver >> tkserver.log 2>&1

```

![image-20240210094842499](https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/image-20240210094842499.png)



#### 5、配置nginx代理

编辑`/etc/nginx/nginx.conf`，或者编辑`/etc/nginx/sites-available/default`文件，配置端口代理。我由于博客在`/etc/nginx/sites-available/default`里配置，所以代理也是配置在这里。

```nginx
server {
        listen 80;
        server_name codingxxxx.com;
        # 重定向到 HTTPS
        return 301 https://$host$request_uri;

}        
		
server {
		# 监听https端口
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
		# https证书配置
        ssl_certificate /etc/nginx/ssl/xxx.crt;
        ssl_certificate_key /etc/nginx/ssl/xxxkey;

        server_name codingxxxx.com;
        root /home/ubuntu/blog/;
        index index.html;

        location /my_comment {
                proxy_pass http://localhost:9898;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
        }
}
```



