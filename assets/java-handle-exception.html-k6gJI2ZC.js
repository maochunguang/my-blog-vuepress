import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as n,c as d,d as t,e as o,f as e,b as r,a}from"./app-bmOsSVPh.js";const s={},p=o("h2",{id:"为什么要处理异常",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#为什么要处理异常"},[o("span",null,"为什么要处理异常")])],-1),g=o("p",null,"任何程序都会有边界问题，当出现边界问题时，程序大概率会有异常发生，如果不对异常进行处理，轻则异常增多，局部功能不可用；重则服务崩溃，引发链路雪崩。因此需要对异常进行处理，保证线上服务的安全以及业务的正常运行。",-1),h=a('<h2 id="java异常分类" tabindex="-1"><a class="header-anchor" href="#java异常分类"><span>java异常分类</span></a></h2><p>在Java中，异常错误被分为三大类：严重错误（ERROR），检查型异常（Checked Exceptions）和非检查型异常（Unchecked Exceptions）。这两类异常的主要区别在于它们如何被处理和传播。</p><ol><li><strong>严重错误（Error）</strong><ul><li><code>Error</code>是<code>Throwable</code>的直接子类之一，它代表严重的问题，通常是由Java虚拟机（JVM）或运行时环境抛出的。Error类表示的错误条件通常是不可恢复的，应用程序不应该尝试捕获或处理这些错误。</li></ul></li><li><strong>检查型异常（Checked Exceptions）</strong>： <ul><li>检查型异常是编译时异常，这意味着编译器会强制要求程序员处理这些异常。如果一个方法抛出了检查型异常，那么调用这个方法的地方必须要么捕获这个异常并处理，要么在方法签名中声明抛出该异常。</li><li>检查型异常通常用于表示那些预期之外的情况，但程序员可以合理地预期并处理这些情况，例如文件不存在（<code>FileNotFoundException</code>）、网络连接失败（<code>IOException</code>）等。</li><li>检查型异常是<code>Exception</code>类或其子类，但不包括<code>RuntimeException</code>及其子类。</li></ul></li><li><strong>非检查型异常（Unchecked Exceptions）</strong>： <ul><li>非检查型异常是运行时异常，编译器不强制要求程序员处理这些异常。如果一个方法抛出了非检查型异常，调用这个方法的地方可以捕获并处理，也可以不处理。</li><li>非检查型异常通常用于表示程序错误，如逻辑错误、错误的API使用等。这些异常往往是不可恢复的，因为它们通常表示代码中的缺陷。</li><li>非检查型异常包括<code>RuntimeException</code>及其子类，如<code>NullPointerException</code>、<code>ArrayIndexOutOfBoundsException</code>、<code>ArithmeticException</code>等。</li></ul></li></ol><h3 id="严重错误" tabindex="-1"><a class="header-anchor" href="#严重错误"><span>严重错误</span></a></h3><figure><img src="https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/14277225-f49f21cfa77ab714.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在Java中，<code>Error</code>是<code>Throwable</code>的直接子类之一，它代表严重的问题，通常是由Java虚拟机（JVM）或运行时环境抛出的。<code>Error</code>类表示的错误条件通常是不可恢复的，应用程序不应该尝试捕获或处理这些错误。<br> 常见的<code>Error</code>类型如下：</p><ul><li>JVM内部错误：例如，<code>OutOfMemoryError</code>表示JVM没有足够的内存进行对象分配，<code>StackOverflowError</code>表示方法调用层次过深导致栈溢出。</li><li>系统错误：例如，<code> IOError</code>表示底层输入/输出操作失败。</li><li>库错误：例如，<code>LinkageError</code>表示类或接口的链接失败。</li><li>线程死亡：例如，<code>ThreadDeath</code>表示线程已死亡。</li><li>虚拟机错误：例如，<code>VirtualMachineError</code>表示JVM遇到严重问题。<br> 由于<code>Error</code>表示的是严重的系统级问题，因此通常建议应用程序不要捕获这些错误，除非你有明确的恢复措施。在大多数情况下，遇到<code>Error</code>时，应用程序应该让错误传播到顶层，导致程序终止，并记录错误信息以便后续分析。</li></ul><h3 id="常见的检查型异常" tabindex="-1"><a class="header-anchor" href="#常见的检查型异常"><span>常见的检查型异常</span></a></h3><figure><img src="https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/14277225-90ea3f6417d4f719.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>检查型异常（Checked Exceptions）是那些在编译时必须被处理的异常。在Java中，这些异常通常是外部因素导致的，如I/O错误、文件不存在、网络问题等，这些问题在程序运行时可能发生，也可能不发生，但程序员应该有意识地处理它们。<br> 以下是一些常见的检查型异常：</p><ol><li><code>ClassNotFoundException</code>：尝试加载类时，找不到类定义。</li><li><code>CloneNotSupportedException</code>：尝试克隆一个不实现<code>Cloneable</code>接口的对象。</li><li><code>IllegalAccessException</code>：尝试反射地创建一个对象的实例，访问字段或者调用方法时，没有相应的访问权限。</li><li><code>InstantiationException</code>：尝试使用<code>Class</code>对象的<code>newInstance</code>方法来创建一个类的实例，但该类是一个抽象类或者接口，或者没有无参构造函数。</li><li><code>InterruptedException</code>：一个线程在等待、休眠或以其他方式占用状态时被中断。</li><li><code>NoSuchFieldException</code>：反射时尝试访问一个不存在的字段。</li><li><code>NoSuchMethodException</code>：反射时尝试访问一个不存在的方法。</li><li><code>IOException</code>：发生I/O错误。</li><li><code>FileNotFoundException</code>：尝试访问一个不存在的文件时。</li><li><code>EOFException</code>：已到达文件末尾。</li><li><code>SQLException</code>：数据库访问异常。</li><li><code>TimeoutException</code>：在规定的时限内未完成操作。</li><li><code>GeneralSecurityException</code>：处理安全问题时发生异常。</li><li><code>ClassNotFoundException</code>：尝试加载类时，找不到类定义。</li><li><code>IllegalAccessException</code>：非法访问异常。</li><li><code>UnsupportedEncodingException</code>：不支持的字符编码异常。<br> 这些异常都是<code>Exception</code>的直接或间接子类，但不是<code>RuntimeException</code>的子类。由于它们是检查型异常，任何抛出这些异常的方法都必须在方法签名中声明这些异常，或者在一个<code>try-catch</code>块中捕获并处理它们。</li></ol><h3 id="常见的非检查型异常" tabindex="-1"><a class="header-anchor" href="#常见的非检查型异常"><span>常见的非检查型异常</span></a></h3><figure><img src="https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/14277225-c1e3f2911e211dae.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>非检查型异常（Unchecked Exceptions）是Java中的运行时异常，它们不需要在编译时被显式地捕获和处理。这些异常通常表示程序错误，如逻辑错误、错误的API使用等，它们往往是不可恢复的，因为它们通常表示代码中的缺陷。<br> 以下是一些常见的非检查型异常：</p><ol><li><code>ArithmeticException</code>：算术运算错误，如除以零。</li><li><code>ArrayIndexOutOfBoundsException</code>：数组访问时索引超出界限。</li><li><code>ArrayStoreException</code>：尝试将错误类型的对象存储到数组中。</li><li><code>ClassCastException</code>：尝试将对象强制转换为不是实例的子类。</li><li><code>IllegalArgumentException</code>：向方法传递了一个不合法或不适当的参数。</li><li><code>IllegalStateException</code>：方法在对象的不合适状态下被调用。</li><li><code>NullPointerException</code>：尝试使用<code>null</code>对象引用进行操作。</li><li><code>NumberFormatException</code>：尝试将字符串转换为数字，但字符串的格式不正确。</li><li><code>SecurityException</code>：尝试违反安全性。</li><li><code>StringIndexOutOfBoundsException</code>：字符串访问时索引超出界限。</li><li><code>UnsupportedOperationException</code>：对象不支持请求的操作。<br> 这些异常都是<code>RuntimeException</code>类或其子类。由于它们是运行时异常，编译器不强制要求程序员处理这些异常。然而，程序员应该尽量编写代码来避免这些异常的发生，并在可能的情况下提供恢复机制。</li></ol><h2 id="异常处理最佳实践" tabindex="-1"><a class="header-anchor" href="#异常处理最佳实践"><span>异常处理最佳实践</span></a></h2><p><strong>在Java中，异常处理是一个非常重要的事情，它有助于编写健壮、可靠和易于维护的代码。以下是一些关于Java异常处理的最佳实践：</strong></p><ol><li><strong>早抛出，晚捕获</strong>：在方法的最底层抛出异常，在高层处理异常。这样可以确保异常被适当处理，并且在捕获异常时，你有足够的上下文信息来做出决策。</li><li><strong>只捕获你知道如何处理的异常</strong>：避免捕获并重新抛出异常，除非你在处理过程中添加了有价值的上下文信息。捕获你不打算处理的异常会导致代码混乱，并可能隐藏问题。</li><li><strong>提供有用的异常信息</strong>：当抛出异常时，提供详细的错误信息，包括异常原因和可能的解决方案。这有助于快速定位问题和调试。</li><li><strong>使用具体的异常类型</strong>：尽量使用具体的异常类型，而不是通用的<code>Exception</code>类。这有助于调用者更精确地处理异常。</li><li><strong>避免滥用检查型异常</strong>：检查型异常会增加代码的复杂性，因为它们要求调用者必须处理或声明抛出这些异常。如果异常情况可以合理地预期并在运行时处理，考虑使用非检查型异常。</li><li><strong>清理资源</strong>：使用<code>try-with-resources</code>语句自动关闭资源，以避免资源泄漏。</li><li><strong>不要吞掉异常</strong>：捕获异常后，至少要将其记录下来。完全忽略异常可能会导致问题难以诊断。</li><li><strong>区分可恢复和不可恢复的异常</strong>：对于可恢复的错误，可以使用检查型异常；对于编程错误或不可恢复的错误，应该使用非检查型异常。</li><li><strong>避免在<code>finally</code>块中抛出异常</strong>：<code>finally</code>块中的异常会覆盖原始异常，从而丢失了重要的错误信息。</li><li><strong>合理地使用<code>throws</code>声明</strong>：如果一个方法无法处理它可能抛出的异常，应该通过<code>throws</code>声明将这些异常传递给调用者。</li><li><strong>自定义异常</strong>：创建自定义异常时，应该提供多个构造函数，包括一个带有字符串参数的构造函数，以及一个带有<code>Throwable</code>参数的构造函数，以便于链式异常。</li><li><strong>使用异常链</strong>：在抛出新的异常时，将原始异常作为原因传递，以保持完整的堆栈跟踪。</li><li><strong>测试异常代码路径</strong>：确保你的单元测试涵盖了异常情况，以验证异常是否被正确处理。</li><li><strong>文档化异常</strong>：在<code>Javadoc</code>中说明方法可能抛出的异常，以及何时会发生这些异常。</li><li><strong>避免使用异常来控制流程</strong>：异常处理机制不应该用于正常的程序流程控制。这会增加程序的复杂性，并可能导致性能问题。</li><li><strong>保持<code>catch</code>块简洁</strong>：<code>catch</code>块应该保持简单，只包含处理异常所需的代码。<br> 遵循这些原则可以帮助你编写更清晰、更健壮的异常处理代码，并使得调试和维护变得更加容易。</li></ol>',18),x={href:"https://www.jianshu.com/p/279c848efa8b",target:"_blank",rel:"noopener noreferrer"};function E(u,f){const c=l("ExternalLinkIcon");return n(),d("div",null,[p,g,t(" more "),h,o("blockquote",null,[o("p",null,[e("参考文章："),o("a",x,[e("java 异常类图 - 简书 (jianshu.com)"),r(c)])])])])}const _=i(s,[["render",E],["__file","java-handle-exception.html.vue"]]);export{_ as default};