import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as t,c as p,d as e,a as n,f as s,e as o}from"./app-LO_657cr.js";const c={},l=n("h1",{id:"rust写一个命令行工具-2",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#rust写一个命令行工具-2"},[n("span",null,"rust写一个命令行工具（2）")])],-1),i=n("p",null,"在上一个教程里，教了如何实现一个命令行，以及命令行支持cargo安装。",-1),u=n("p",null,"但是这个命令行工具，在使用的时候有个致命的问题，就是没有命令提示。",-1),d=n("p",null,[s("比如我要执行"),n("code",null,"my_dev_tool"),s("，按"),n("code",null,"tab"),s("键我看不到任何命令的提示，这样太不人性化了。")],-1),r=o(`<h2 id="命令补全原理" tabindex="-1"><a class="header-anchor" href="#命令补全原理"><span>命令补全原理</span></a></h2><p>用clap的生成的命令工具可以通过<code>clap_complete</code>包生成一个补全脚本，把这个脚本加到bash环境就可以自动提示了。</p><p>为了生成这些脚本，并让系统能自动提示命令参数，你需要按以下步骤：</p><h2 id="_1-修改依赖关系" tabindex="-1"><a class="header-anchor" href="#_1-修改依赖关系"><span>1. 修改依赖关系</span></a></h2><p>新增两个依赖<code>clap_complete</code>和<code>dirs</code>。</p><ol><li><code>clap_complete</code>是用来生成补全脚本的。</li><li><code>dirs</code>是用来定位用户目录的。</li></ol><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[dependencies]
clap_complete = &quot;4.4.0&quot;
dirs = &quot;4.0&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-在你的-rust-程序中生成补全脚本" tabindex="-1"><a class="header-anchor" href="#_2-在你的-rust-程序中生成补全脚本"><span>2. 在你的 Rust 程序中生成补全脚本</span></a></h2><p>首先，你需要修改你的 Rust 程序，使其能够生成相应的补全脚本。这可以在程序的一个特定命令或选项下实现。</p><h3 id="_1、重构buildcommand方法" tabindex="-1"><a class="header-anchor" href="#_1、重构buildcommand方法"><span>1、重构buildCommand方法</span></a></h3><p>把命令构造的内容单独重构为一个方法，后面生成补全命令还需要这个。并添加一个添加bash脚本的命令<code>add-completion</code>。</p><div class="language-rust line-numbers-mode" data-ext="rs" data-title="rs"><pre class="language-rust"><code><span class="token keyword">use</span> <span class="token namespace">clap<span class="token punctuation">::</span></span><span class="token punctuation">{</span><span class="token class-name">Command</span><span class="token punctuation">,</span> generate<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token namespace">clap_complete<span class="token punctuation">::</span></span><span class="token punctuation">{</span><span class="token namespace">shells<span class="token punctuation">::</span></span><span class="token punctuation">{</span><span class="token class-name">Bash</span><span class="token punctuation">,</span> <span class="token class-name">Zsh</span><span class="token punctuation">}</span><span class="token punctuation">,</span> generate_to<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span></span>env<span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span></span>io<span class="token punctuation">;</span>
<span class="token keyword">fn</span> <span class="token function-definition function">build_cli</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token class-name">Command</span> <span class="token punctuation">{</span>
    <span class="token class-name">Command</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token string">&quot;my_dev_tool&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">&quot;1.0&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">author</span><span class="token punctuation">(</span><span class="token string">&quot;tommy &lt;mcg91881127@163.com&gt;&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">about</span><span class="token punctuation">(</span><span class="token string">&quot;Developer&#39;s tool for urlencode and time format!&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">subcommand_required</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">arg_required_else_help</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token comment">// 省略。。。。</span>
        <span class="token punctuation">.</span><span class="token function">subcommand</span><span class="token punctuation">(</span><span class="token class-name">Command</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token string">&quot;add-completion&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">about</span><span class="token punctuation">(</span><span class="token string">&quot;Generates completion scripts for your shell&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-生成补全脚本" tabindex="-1"><a class="header-anchor" href="#_2-生成补全脚本"><span>2. 生成补全脚本</span></a></h3><p>这一步主要是生成补全命令的脚本，bash或者zsh脚本是根据这个脚本进行命令提示的。</p><div class="language-rust line-numbers-mode" data-ext="rs" data-title="rs"><pre class="language-rust"><code><span class="token keyword">fn</span> <span class="token function-definition function">add_completion</span><span class="token punctuation">(</span>matches<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token class-name">ArgMatches</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token keyword">mut</span> app <span class="token operator">=</span> <span class="token function">build_cli</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> shell <span class="token operator">=</span> <span class="token namespace">env<span class="token punctuation">::</span></span><span class="token function">var</span><span class="token punctuation">(</span><span class="token string">&quot;SHELL&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unwrap_or_default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> home_dir <span class="token operator">=</span> <span class="token namespace">dirs<span class="token punctuation">::</span></span><span class="token function">home_dir</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">&quot;Could not find the home directory&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> config_file<span class="token punctuation">;</span>
    <span class="token keyword">if</span> shell<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token string">&quot;zsh&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        config_file <span class="token operator">=</span> home_dir<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;.zshrc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> _ <span class="token operator">=</span> <span class="token function">generate_to</span><span class="token punctuation">(</span><span class="token class-name">Zsh</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> app<span class="token punctuation">,</span> <span class="token string">&quot;my_dev_tool&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;./&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">&quot;generate_to failed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;Generated Zsh completion script.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        config_file <span class="token operator">=</span> home_dir<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;.bashrc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 默认生成 Bash 补全脚本</span>
        <span class="token keyword">let</span> _ <span class="token operator">=</span> <span class="token function">generate_to</span><span class="token punctuation">(</span><span class="token class-name">Bash</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> app<span class="token punctuation">,</span> <span class="token string">&quot;my_dev_tool&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;./&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">&quot;generate_to failed&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;Generated Bash completion script.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> completion_script_path <span class="token operator">=</span> <span class="token class-name">PathBuf</span><span class="token punctuation">::</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;./_my_dev_tool&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> _ <span class="token operator">=</span> <span class="token function">add_completion_to_shell</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>config_file<span class="token punctuation">,</span> <span class="token operator">&amp;</span>completion_script_path<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们添加了一个名为 <code>add-completion</code> 的子命令，当运行此命令时，程序将生成 Bash 的自动补全脚本。这里需要注意的是：</p><ol><li><code>generate_to(Bash, &amp;mut app, &quot;my_dev_tool&quot;, &quot;./&quot;)</code>这行代码里的<code>my_dev_tool</code>，是你要补全命令的名字，比如你的工具叫啥这里就填啥。我这个工具命令就是<code>my_dev_tool</code>，所以这里传<code>my_dev_tool</code>。</li><li>这里生成的自动补全脚本的名字是<code>_my_dev_tool</code>，这个是默认的命名规则，生成的补全脚本叫“_”+“命令名”。</li><li>为了程序能够区分并生成 <code>.bashrc</code> 或 <code>.zshrc</code> 的补全命令，你需要确定用户正在使用的是哪种 shell。这可以通过检查环境变量 <code>SHELL</code> 来实现，然后根据这个环境变量的值决定修改 <code>.bashrc</code> 或 <code>.zshrc</code>。</li></ol><h3 id="_3-将生成的补全脚本添加到你的-shell-配置中" tabindex="-1"><a class="header-anchor" href="#_3-将生成的补全脚本添加到你的-shell-配置中"><span>3. 将生成的补全脚本添加到你的 shell 配置中</span></a></h3><p>生成的补全脚本需要被 source（或等效地添加）到你的 shell 配置文件中（例如 <code>.bashrc</code>, <code>.zshrc</code> 等），这样你的 shell 就能够利用这些脚本进行命令补全。有两种方式可以实现：</p><h4 id="第一种-手动添加" tabindex="-1"><a class="header-anchor" href="#第一种-手动添加"><span>第一种，手动添加</span></a></h4><p>将以下行添加到 <code>.bashrc</code> 或 <code>.bash_profile</code>，zsh为<code>.zshrc</code>。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> ~/_my_dev_tool
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，重新加载配置文件，zsh为<code>source ~/.zshrc</code>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> ~/.bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者重新启动你的终端。</p><h4 id="第二种-自动添加到bash或者zsh" tabindex="-1"><a class="header-anchor" href="#第二种-自动添加到bash或者zsh"><span>第二种，自动添加到bash或者zsh</span></a></h4><p>然后，使用以下 Rust 代码来自动化添加 shell 配置的过程：</p><div class="language-rust line-numbers-mode" data-ext="rs" data-title="rs"><pre class="language-rust"><code><span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span></span>env<span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span>fs<span class="token punctuation">::</span></span><span class="token punctuation">{</span><span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token class-name">OpenOptions</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span>io<span class="token punctuation">::</span></span><span class="token class-name">Write</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token namespace">std<span class="token punctuation">::</span>path<span class="token punctuation">::</span></span><span class="token class-name">PathBuf</span><span class="token punctuation">;</span>

<span class="token keyword">fn</span> <span class="token function-definition function">add_completion_to_shell</span><span class="token punctuation">(</span>config_file<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token class-name">PathBuf</span><span class="token punctuation">,</span> completion_script_path<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token class-name">PathBuf</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token namespace">std<span class="token punctuation">::</span>io<span class="token punctuation">::</span></span><span class="token class-name">Result</span><span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> completion_script_str <span class="token operator">=</span> <span class="token macro property">format!</span><span class="token punctuation">(</span><span class="token string">&quot;source {}&quot;</span><span class="token punctuation">,</span> completion_script_path<span class="token punctuation">.</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">let</span> <span class="token keyword">mut</span> config <span class="token operator">=</span> <span class="token class-name">OpenOptions</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span>config_file<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token namespace">fs<span class="token punctuation">::</span></span><span class="token function">read_to_string</span><span class="token punctuation">(</span>config_file<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>completion_script_str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;Completion script already added to {}.&quot;</span><span class="token punctuation">,</span> config_file<span class="token punctuation">.</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        config<span class="token punctuation">.</span><span class="token function">write_all</span><span class="token punctuation">(</span>completion_script_str<span class="token punctuation">.</span><span class="token function">as_bytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">;</span>
        <span class="token macro property">println!</span><span class="token punctuation">(</span><span class="token string">&quot;Added completion script to {}.&quot;</span><span class="token punctuation">,</span> config_file<span class="token punctuation">.</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">Ok</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了程序能够区分并自动向 <code>.bashrc</code> 或 <code>.zshrc</code> 添加 shell 配置，你需要确定用户正在使用的是哪种 shell。这可以通过检查环境变量 <code>SHELL</code> 来实现，然后根据这个环境变量的值决定修改 <code>.bashrc</code> 或 <code>.zshrc</code>。以下是一个示例实现：</p><h3 id="_4-source一下命令行或者重启命令行" tabindex="-1"><a class="header-anchor" href="#_4-source一下命令行或者重启命令行"><span>4. source一下命令行或者重启命令行</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>### zsh执行
source ~/.zshrc
### bash执行
source ~/bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="展示成果" tabindex="-1"><a class="header-anchor" href="#展示成果"><span>展示成果</span></a></h2><p>在命令行输入 <code>my_dev_tool</code>后，按tab键会提示所有命令。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>~ % my_dev_tool time
add-completion  -- Generates completion scripts for your shell
help            -- Print this message or the help of the given subcommand(s)
timestamp       -- Convert a UNIX timestamp to local datetime
urldecode       -- URL-decode a string
urlencode       -- URL-encode a string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,34);function k(m,v){return t(),p("div",null,[l,i,u,d,e(" more "),r])}const _=a(c,[["render",k],["__file","rust-command-tool-2.html.vue"]]);export{_ as default};
