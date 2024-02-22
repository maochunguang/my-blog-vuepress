const t=JSON.parse('{"key":"v-3225d472","path":"/rust-study/rust-command-tool-2.html","title":"rust写一个命令行工具（2）","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2023-11-29T00:00:00.000Z","category":["Rust入门到放弃"],"tag":["Rust","命令行"],"description":"rust写一个命令行工具（2） 在上一个教程里，教了如何实现一个命令行，以及命令行支持cargo安装。 但是这个命令行工具，在使用的时候有个致命的问题，就是没有命令提示。 比如我要执行my_dev_tool，按tab键我看不到任何命令的提示，这样太不人性化了。","head":[["meta",{"property":"og:url","content":"https://codingmore.site/rust-study/rust-command-tool-2.html"}],["meta",{"property":"og:site_name","content":"Coding More"}],["meta",{"property":"og:title","content":"rust写一个命令行工具（2）"}],["meta",{"property":"og:description","content":"rust写一个命令行工具（2） 在上一个教程里，教了如何实现一个命令行，以及命令行支持cargo安装。 但是这个命令行工具，在使用的时候有个致命的问题，就是没有命令提示。 比如我要执行my_dev_tool，按tab键我看不到任何命令的提示，这样太不人性化了。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-22T15:50:45.000Z"}],["meta",{"property":"article:author","content":"Tommy"}],["meta",{"property":"article:tag","content":"Rust"}],["meta",{"property":"article:tag","content":"命令行"}],["meta",{"property":"article:published_time","content":"2023-11-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-22T15:50:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"rust写一个命令行工具（2）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-11-29T00:00:00.000Z\\",\\"dateModified\\":\\"2024-02-22T15:50:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Tommy\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"命令补全原理","slug":"命令补全原理","link":"#命令补全原理","children":[]},{"level":2,"title":"1. 修改依赖关系","slug":"_1-修改依赖关系","link":"#_1-修改依赖关系","children":[]},{"level":2,"title":"2. 在你的 Rust 程序中生成补全脚本","slug":"_2-在你的-rust-程序中生成补全脚本","link":"#_2-在你的-rust-程序中生成补全脚本","children":[{"level":3,"title":"1、重构buildCommand方法","slug":"_1、重构buildcommand方法","link":"#_1、重构buildcommand方法","children":[]},{"level":3,"title":"2. 生成补全脚本","slug":"_2-生成补全脚本","link":"#_2-生成补全脚本","children":[]},{"level":3,"title":"3. 将生成的补全脚本添加到你的 shell 配置中","slug":"_3-将生成的补全脚本添加到你的-shell-配置中","link":"#_3-将生成的补全脚本添加到你的-shell-配置中","children":[]},{"level":3,"title":"4. source一下命令行或者重启命令行","slug":"_4-source一下命令行或者重启命令行","link":"#_4-source一下命令行或者重启命令行","children":[]}]},{"level":2,"title":"展示成果","slug":"展示成果","link":"#展示成果","children":[]}],"git":{"createdTime":1708617045000,"updatedTime":1708617045000,"contributors":[{"name":"maochunguang","email":"mcg915881127@163.com","commits":1}]},"readingTime":{"minutes":3.8,"words":1140},"filePathRelative":"rust-study/rust-command-tool-2.md","localizedDate":"2023年11月29日","excerpt":"<h1>rust写一个命令行工具（2）</h1>\\n<p>在上一个教程里，教了如何实现一个命令行，以及命令行支持cargo安装。</p>\\n<p>但是这个命令行工具，在使用的时候有个致命的问题，就是没有命令提示。</p>\\n<p>比如我要执行<code>my_dev_tool</code>，按<code>tab</code>键我看不到任何命令的提示，这样太不人性化了。</p>\\n","autoDesc":true}');export{t as data};
