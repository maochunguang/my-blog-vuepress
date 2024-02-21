---
icon: pen-to-square
date: 2024-02-06
category:
  - java入门到精通
  - 五分钟学java

tag:
  - 异常处理
---
# 五分钟学会java异常处理

## 为什么要处理异常

任何程序都会有边界问题，当出现边界问题时，程序大概率会有异常发生，如果不对异常进行处理，轻则异常增多，局部功能不可用；重则服务崩溃，引发链路雪崩。因此需要对异常进行处理，保证线上服务的安全以及业务的正常运行。

<!-- more -->

## java异常分类

在Java中，异常错误被分为三大类：严重错误（ERROR），检查型异常（Checked Exceptions）和非检查型异常（Unchecked Exceptions）。这两类异常的主要区别在于它们如何被处理和传播。
1. **严重错误（Error）**
   * `Error`是`Throwable`的直接子类之一，它代表严重的问题，通常是由Java虚拟机（JVM）或运行时环境抛出的。Error类表示的错误条件通常是不可恢复的，应用程序不应该尝试捕获或处理这些错误。
2. **检查型异常（Checked Exceptions）**：
   - 检查型异常是编译时异常，这意味着编译器会强制要求程序员处理这些异常。如果一个方法抛出了检查型异常，那么调用这个方法的地方必须要么捕获这个异常并处理，要么在方法签名中声明抛出该异常。
   - 检查型异常通常用于表示那些预期之外的情况，但程序员可以合理地预期并处理这些情况，例如文件不存在（`FileNotFoundException`）、网络连接失败（`IOException`）等。
   - 检查型异常是`Exception`类或其子类，但不包括`RuntimeException`及其子类。
3. **非检查型异常（Unchecked Exceptions）**：
   - 非检查型异常是运行时异常，编译器不强制要求程序员处理这些异常。如果一个方法抛出了非检查型异常，调用这个方法的地方可以捕获并处理，也可以不处理。
   - 非检查型异常通常用于表示程序错误，如逻辑错误、错误的API使用等。这些异常往往是不可恢复的，因为它们通常表示代码中的缺陷。
   - 非检查型异常包括`RuntimeException`及其子类，如`NullPointerException`、`ArrayIndexOutOfBoundsException`、`ArithmeticException`等。



### 严重错误

![img](https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/14277225-f49f21cfa77ab714.png)

在Java中，`Error`是`Throwable`的直接子类之一，它代表严重的问题，通常是由Java虚拟机（JVM）或运行时环境抛出的。`Error`类表示的错误条件通常是不可恢复的，应用程序不应该尝试捕获或处理这些错误。
常见的`Error`类型如下：

- JVM内部错误：例如，`OutOfMemoryError`表示JVM没有足够的内存进行对象分配，`StackOverflowError`表示方法调用层次过深导致栈溢出。
- 系统错误：例如，` IOError`表示底层输入/输出操作失败。
- 库错误：例如，`LinkageError`表示类或接口的链接失败。
- 线程死亡：例如，`ThreadDeath`表示线程已死亡。
- 虚拟机错误：例如，`VirtualMachineError`表示JVM遇到严重问题。
由于`Error`表示的是严重的系统级问题，因此通常建议应用程序不要捕获这些错误，除非你有明确的恢复措施。在大多数情况下，遇到`Error`时，应用程序应该让错误传播到顶层，导致程序终止，并记录错误信息以便后续分析。



### 常见的检查型异常

![img](https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/14277225-90ea3f6417d4f719.png)

检查型异常（Checked Exceptions）是那些在编译时必须被处理的异常。在Java中，这些异常通常是外部因素导致的，如I/O错误、文件不存在、网络问题等，这些问题在程序运行时可能发生，也可能不发生，但程序员应该有意识地处理它们。
以下是一些常见的检查型异常：
1. `ClassNotFoundException`：尝试加载类时，找不到类定义。
2. `CloneNotSupportedException`：尝试克隆一个不实现`Cloneable`接口的对象。
3. `IllegalAccessException`：尝试反射地创建一个对象的实例，访问字段或者调用方法时，没有相应的访问权限。
4. `InstantiationException`：尝试使用`Class`对象的`newInstance`方法来创建一个类的实例，但该类是一个抽象类或者接口，或者没有无参构造函数。
5. `InterruptedException`：一个线程在等待、休眠或以其他方式占用状态时被中断。
6. `NoSuchFieldException`：反射时尝试访问一个不存在的字段。
7. `NoSuchMethodException`：反射时尝试访问一个不存在的方法。
8. `IOException`：发生I/O错误。
9. `FileNotFoundException`：尝试访问一个不存在的文件时。
10. `EOFException`：已到达文件末尾。
11. `SQLException`：数据库访问异常。
12. `TimeoutException`：在规定的时限内未完成操作。
13. `GeneralSecurityException`：处理安全问题时发生异常。
14. `ClassNotFoundException`：尝试加载类时，找不到类定义。
15. `IllegalAccessException`：非法访问异常。
16. `UnsupportedEncodingException`：不支持的字符编码异常。
这些异常都是`Exception`的直接或间接子类，但不是`RuntimeException`的子类。由于它们是检查型异常，任何抛出这些异常的方法都必须在方法签名中声明这些异常，或者在一个`try-catch`块中捕获并处理它们。



### 常见的非检查型异常

![img](https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/14277225-c1e3f2911e211dae.png)

非检查型异常（Unchecked Exceptions）是Java中的运行时异常，它们不需要在编译时被显式地捕获和处理。这些异常通常表示程序错误，如逻辑错误、错误的API使用等，它们往往是不可恢复的，因为它们通常表示代码中的缺陷。
以下是一些常见的非检查型异常：
1. `ArithmeticException`：算术运算错误，如除以零。
2. `ArrayIndexOutOfBoundsException`：数组访问时索引超出界限。
3. `ArrayStoreException`：尝试将错误类型的对象存储到数组中。
4. `ClassCastException`：尝试将对象强制转换为不是实例的子类。
5. `IllegalArgumentException`：向方法传递了一个不合法或不适当的参数。
6. `IllegalStateException`：方法在对象的不合适状态下被调用。
7. `NullPointerException`：尝试使用`null`对象引用进行操作。
8. `NumberFormatException`：尝试将字符串转换为数字，但字符串的格式不正确。
9. `SecurityException`：尝试违反安全性。
10. `StringIndexOutOfBoundsException`：字符串访问时索引超出界限。
11. `UnsupportedOperationException`：对象不支持请求的操作。
    这些异常都是`RuntimeException`类或其子类。由于它们是运行时异常，编译器不强制要求程序员处理这些异常。然而，程序员应该尽量编写代码来避免这些异常的发生，并在可能的情况下提供恢复机制。




## 异常处理最佳实践

**在Java中，异常处理是一个非常重要的事情，它有助于编写健壮、可靠和易于维护的代码。以下是一些关于Java异常处理的最佳实践：**

1. **早抛出，晚捕获**：在方法的最底层抛出异常，在高层处理异常。这样可以确保异常被适当处理，并且在捕获异常时，你有足够的上下文信息来做出决策。
2. **只捕获你知道如何处理的异常**：避免捕获并重新抛出异常，除非你在处理过程中添加了有价值的上下文信息。捕获你不打算处理的异常会导致代码混乱，并可能隐藏问题。
3. **提供有用的异常信息**：当抛出异常时，提供详细的错误信息，包括异常原因和可能的解决方案。这有助于快速定位问题和调试。
4. **使用具体的异常类型**：尽量使用具体的异常类型，而不是通用的`Exception`类。这有助于调用者更精确地处理异常。
5. **避免滥用检查型异常**：检查型异常会增加代码的复杂性，因为它们要求调用者必须处理或声明抛出这些异常。如果异常情况可以合理地预期并在运行时处理，考虑使用非检查型异常。
6. **清理资源**：使用`try-with-resources`语句自动关闭资源，以避免资源泄漏。
7. **不要吞掉异常**：捕获异常后，至少要将其记录下来。完全忽略异常可能会导致问题难以诊断。
8. **区分可恢复和不可恢复的异常**：对于可恢复的错误，可以使用检查型异常；对于编程错误或不可恢复的错误，应该使用非检查型异常。
9. **避免在`finally`块中抛出异常**：`finally`块中的异常会覆盖原始异常，从而丢失了重要的错误信息。
10. **合理地使用`throws`声明**：如果一个方法无法处理它可能抛出的异常，应该通过`throws`声明将这些异常传递给调用者。
11. **自定义异常**：创建自定义异常时，应该提供多个构造函数，包括一个带有字符串参数的构造函数，以及一个带有`Throwable`参数的构造函数，以便于链式异常。
12. **使用异常链**：在抛出新的异常时，将原始异常作为原因传递，以保持完整的堆栈跟踪。
13. **测试异常代码路径**：确保你的单元测试涵盖了异常情况，以验证异常是否被正确处理。
14. **文档化异常**：在`Javadoc`中说明方法可能抛出的异常，以及何时会发生这些异常。
15. **避免使用异常来控制流程**：异常处理机制不应该用于正常的程序流程控制。这会增加程序的复杂性，并可能导致性能问题。
16. **保持`catch`块简洁**：`catch`块应该保持简单，只包含处理异常所需的代码。
    遵循这些原则可以帮助你编写更清晰、更健壮的异常处理代码，并使得调试和维护变得更加容易。



> 参考文章：[java 异常类图 - 简书 (jianshu.com)](https://www.jianshu.com/p/279c848efa8b)
