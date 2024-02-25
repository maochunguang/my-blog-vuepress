import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r,o as a,c as s,b as l,d as e,e as t,f as n}from"./app-CPWs9-vO.js";const i={},p=e("h1",{id:"sharex上传到腾讯云cos",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#sharex上传到腾讯云cos"},[e("span",null,"sharex上传到腾讯云cos")])],-1),h=e("p",null,"不管用什么工具写个人博客，都需要处理图片。在自媒体平台一般要求是把图片上传到他们那，比如公众号，知乎等，但是这样文章发到自己个人博客图片还需要在处理一次，非常的低效。因此使用工具把图片上传到自己的图床会非常的高效，常用的方案有两种，第一种是picgo+cos，第二种是sharex+cos。",-1),d=e("h2",{id:"原理",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#原理"},[e("span",null,"原理")])],-1),m=e("p",null,"sharex自带很多种上传服务，但是没有腾讯云cos的选项。但是腾讯云cos是兼容AWS S3的api的，因此可以使用AWS S3的api来进行配置腾讯云cos。",-1),_=e("h2",{id:"腾讯云cos配置",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#腾讯云cos配置"},[e("span",null,"腾讯云cos配置")])],-1),u=e("p",null,"这个地方就是设置SecretId，SecretKey，Bucket，AppId等关键信息。腾讯云cos有详细的教程，这里简单贴一下",-1),g={href:"https://console.cloud.tencent.com/capi",target:"_blank",rel:"noopener noreferrer"},f={href:"https://console.cloud.tencent.com/capi",target:"_blank",rel:"noopener noreferrer"},x={href:"https://cloud.tencent.com/document/product/436/13312",target:"_blank",rel:"noopener noreferrer"},b={href:"https://console.cloud.tencent.com/capi",target:"_blank",rel:"noopener noreferrer"},y={href:"https://cloud.tencent.com/document/product/436/6224",target:"_blank",rel:"noopener noreferrer"},k=e("code",null,"ap-beijing",-1),S=e("code",null,"ap-hongkong",-1),T=e("code",null,"eu-frankfurt",-1),v=e("li",null,"设定存储路径：图片存放到 COS 存储桶中的路径。",-1),j={href:"https://cloud.tencent.com/document/product/436/36638",target:"_blank",rel:"noopener noreferrer"},C={href:"https://cloud.tencent.com/document/product/436/54049",target:"_blank",rel:"noopener noreferrer"},I=e("h2",{id:"sharex配置",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#sharex配置"},[e("span",null,"sharex配置")])],-1),q=e("figure",null,[e("img",{src:"https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/21e85ac4332409bb39504c2f71a60de3.png",alt:"img",tabindex:"0",loading:"lazy"}),e("figcaption",null,"img")],-1),A=e("figure",null,[e("img",{src:"https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/ShareX_Fnt7iUF4ka.png",alt:"ShareX_Fnt7iUF4ka",tabindex:"0",loading:"lazy"}),e("figcaption",null,"ShareX_Fnt7iUF4ka")],-1),F=e("p",null,"1、密钥id和密钥就是上面设置的Secretld，SecretKey。",-1),N={href:"https://cos.ap-beijing.myqcloud.com",target:"_blank",rel:"noopener noreferrer"},P=e("p",null,"3、存储桶就是上面设置的bucket名字",-1),Z=e("p",null,"4、上传路径这个可以使用默认的，也可以修改。",-1),z=e("p",null,"5、其他的不需要改了。",-1),B=e("p",null,"6、在“截图后的任务”设置为“上传图片”就行了。",-1);function O(U,V){const o=r("ExternalLinkIcon");return a(),s("div",null,[p,h,l(" more "),d,m,_,u,e("ol",null,[e("li",null,[t("设定 Secretld：开发者拥有的项目身份识别 ID，用于身份认证，可在 "),e("a",g,[t("API 密钥管理"),n(o)]),t(" 页面中创建和获取。")]),e("li",null,[t("设定 SecretKey：开发者拥有的项目身份密钥，可在 "),e("a",f,[t("API 密钥管理"),n(o)]),t(" 页面获取。")]),e("li",null,[t("设定 Bucket：存储桶，COS 中用于存储数据的容器。有关存储桶的进一步说明，请参见 "),e("a",x,[t("存储桶概述"),n(o)]),t(" 文档。")]),e("li",null,[t("设定 AppId：开发者访问 COS 服务时拥有的用户维度唯一资源标识，用以标识资源，可在 "),e("a",b,[t("API 密钥管理"),n(o)]),t(" 页面获取。")]),e("li",null,[t("设定存储区域：存储桶所属地域信息，枚举值可参见 "),e("a",y,[t("可用地域"),n(o)]),t(" 文档，例如 "),k,t("、"),S,t("、"),T,t(" 等。")]),v,e("li",null,[t("设定自定义域名：可选，若您为上方的存储空间配置了自定义源站域名，则可填写。相关介绍可参见 "),e("a",j,[t("开启自定义源站域名"),n(o)]),t("。")]),e("li",null,[t("设定网址后缀：通过在网址后缀添加 COS 数据处理参数实现图片压缩、裁剪、格式转换等操作，相关介绍可参见 "),e("a",C,[t("图片处理"),n(o)]),t("。")])]),I,q,A,F,e("p",null,[t("2、节点就是访问地址域名去掉bucket，比如我的是北京的服务器就是"),e("a",N,[t("https://cos.ap-beijing.myqcloud.com"),n(o)]),t("。")]),P,Z,z,B])}const D=c(i,[["render",O],["__file","sharex-tencent-tos.html.vue"]]),E=JSON.parse('{"path":"/dev-tool/sharex-tencent-tos.html","title":"sharex上传到腾讯云cos","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-02-18T00:00:00.000Z","category":["开发工具"],"tag":["博客工具","博客图床"],"description":"sharex上传到腾讯云cos 不管用什么工具写个人博客，都需要处理图片。在自媒体平台一般要求是把图片上传到他们那，比如公众号，知乎等，但是这样文章发到自己个人博客图片还需要在处理一次，非常的低效。因此使用工具把图片上传到自己的图床会非常的高效，常用的方案有两种，第一种是picgo+cos，第二种是sharex+cos。 原理 sharex自带很多种上...","head":[["meta",{"property":"og:url","content":"https://codingmore.site/dev-tool/sharex-tencent-tos.html"}],["meta",{"property":"og:site_name","content":"Coding More"}],["meta",{"property":"og:title","content":"sharex上传到腾讯云cos"}],["meta",{"property":"og:description","content":"sharex上传到腾讯云cos 不管用什么工具写个人博客，都需要处理图片。在自媒体平台一般要求是把图片上传到他们那，比如公众号，知乎等，但是这样文章发到自己个人博客图片还需要在处理一次，非常的低效。因此使用工具把图片上传到自己的图床会非常的高效，常用的方案有两种，第一种是picgo+cos，第二种是sharex+cos。 原理 sharex自带很多种上..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/21e85ac4332409bb39504c2f71a60de3.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-22T15:50:45.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"sharex上传到腾讯云cos"}],["meta",{"property":"article:author","content":"Tommy"}],["meta",{"property":"article:tag","content":"博客工具"}],["meta",{"property":"article:tag","content":"博客图床"}],["meta",{"property":"article:published_time","content":"2024-02-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-22T15:50:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"sharex上传到腾讯云cos\\",\\"image\\":[\\"https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/21e85ac4332409bb39504c2f71a60de3.png\\",\\"https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/ShareX_Fnt7iUF4ka.png\\"],\\"datePublished\\":\\"2024-02-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-02-22T15:50:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Tommy\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"原理","slug":"原理","link":"#原理","children":[]},{"level":2,"title":"腾讯云cos配置","slug":"腾讯云cos配置","link":"#腾讯云cos配置","children":[]},{"level":2,"title":"sharex配置","slug":"sharex配置","link":"#sharex配置","children":[]}],"git":{"createdTime":1708617045000,"updatedTime":1708617045000,"contributors":[{"name":"maochunguang","email":"mcg915881127@163.com","commits":1}]},"readingTime":{"minutes":2.28,"words":684},"filePathRelative":"dev-tool/sharex-tencent-tos.md","localizedDate":"2024年2月18日","excerpt":"\\n<p>不管用什么工具写个人博客，都需要处理图片。在自媒体平台一般要求是把图片上传到他们那，比如公众号，知乎等，但是这样文章发到自己个人博客图片还需要在处理一次，非常的低效。因此使用工具把图片上传到自己的图床会非常的高效，常用的方案有两种，第一种是picgo+cos，第二种是sharex+cos。</p>\\n","autoDesc":true}');export{D as comp,E as data};