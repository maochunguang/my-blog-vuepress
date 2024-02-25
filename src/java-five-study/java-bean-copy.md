---
pnpm dlx vp-updatetitle: JavaBean复制框架调研
icon: copy
date: 2024-02-06
category:
  - java入门到精通
  - 五分钟学java

tag:
  - java框架对比
---

## 一、背景

每一个写java的同学都会为一堆set，get方法烦恼，特别是使用mvc分层或者DDD领域模型开发之后。有VO（View Object）视图对象，DTO（Data Transfer Object）数据传输对象，DO（Domain Object）领域对象，PO（Persistent Object）持久层对象等等。不同层之间进行交互时，免不了进行对象的复制。每次已修改底层数据结构，都要从头到尾改一遍，实在是不优雅。这篇文章让你以后不用写set和get赋值。

**在bean复制框架之前：**

![image (1)](https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/image%20(1).png)

**有了bean框架之后：**

![image](https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/image.png)



## 二、bean复制框架原理和使用

java的对象之间转换原理主要有三种，第一种是直接使用代理进行字段赋值；第二种是生成动态代理进行赋值；第三种是和lombok类似，利用编译期实现jsr规范，生成转换代码。

```Java
@Data
public class UserDto {
    private String name;
    private int age;
    private String description;
    private String birthdate;
}

@Data
public class User {
    private String name;
    private int age;
    private String desc;
    private Date birthdate;

}
```

### 1、Spring-BeanUtils，`BeanUtils.``*copyProperties*`

#### a、用法

```Java
public UserDto beanUtilCopyBean(User user) {
    UserDto dto = new UserDto();
    BeanUtils.copyProperties(user, dto);
    System.out.println("source:" + user.toString());
    System.out.println("target:" + dto.toString());
    return dto;
}
```

#### b、原理

利用java反射，对类中的所有字段进行反射赋值。

### 2、Apache-BeanUtils，`PropertyUtils.``*copyProperties*`

#### a、用法

```Java
public UserDto propertyUtilCopyBean(User user) throws Exception {
    UserDto dto = new UserDto();
    PropertyUtils.copyProperties(dto, user);
    System.out.println("source:" + user.toString());
    System.out.println("target:" + dto.toString());
    return dto;
}
```

#### b、原理

利用java反射，对类中的所有字段进行反射赋值。

### 3、Cglib，BeanCopier

#### a、用法

```Java
public UserDto cglibWithConvertCopyBean(User user) throws Exception {
    UserDto dto = new UserDto();
    UserConverter converter = new UserConverter();
    BeanCopier copier = BeanCopier.create(user.getClass(), dto.getClass(), true);
    copier.copy(user, dto, converter);
    return dto;
}
```

#### b、原理

通过动态代理生成代理类，然后通过代理类的set get方法进行赋值。性能和直接set，get很接近



### 4、dozer，http://dozer.sourceforge.net/

#### a、用法

```XML
<?xml version="1.0" encoding="UTF-8"?>
<mappings xmlns="http://dozer.sourceforge.net"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://dozer.sourceforge.net
          http://dozer.sourceforge.net/schema/beanmapping.xsd">
    <configuration>
        <date-format>yyyy-MM-dd HH:mm:ss</date-format>
    </configuration>

    <mapping wildcard="true">
        <class-a>com.mcg.javastudy.mode.User</class-a>
        <class-b>com.mcg.javastudy.mode.UserDto</class-b>
        <field>
            <a>name</a>
            <b>name</b>
        </field>
        <field>
            <a>description</a>
            <b>desc</b>
        </field>
        <field>
            <a>authorizeStatus</a>
            <b>authorizeStatus</b>
        </field>
        <field>
            <a>birthDate</a>
            <b>birthDate</b>
        </field>
    </mapping>
</mappings>
public UserDto dozerCopyBean(User user) {
    Mapper mapper = DozerBeanMapperSingletonWrapper.getInstance();
    UserDto dto = mapper.map(user, UserDto.class);
    System.out.println("source:" + user.toString());
    System.out.println("target:" + dto.toString());
    return dto;
}
```

#### b、原理

根据xml配置解析出映射关系，生成动态代理类，然后进行set，get。

### 5、mapstruct，https://mapstruct.org/

#### a、用法

```Java
@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "description", target = "desc")
    @Mapping(source = "birthDate", target = "birthDate", dateFormat = "yyyy-MM-dd HH:mm:ss")
    UserDto userToUserDto(User user);
}

public UserDto mapStructCopyBean(User user) {
    UserDto dto = UserMapper.INSTANCE.userToUserDto(user);
    System.out.println("source:" + user.toString());
    System.out.println("target:" + dto.toString());
    return dto;
}
```

#### b、原理

和lombok类似，mapSturct也实现了JSR 269 API规范，在编译时会生成一个转换的实现类，实现类进行set和get，几乎无性能损耗。自动生成的转化实现类如下：

```Java
@Generated(
    value = "org.mapstruct.ap.MappingProcessor"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto userToUserDto(User user) {
        if ( user == null ) {
            return null;
        }
        UserDto userDto = new UserDto();
        if ( user.getBirthDate() != null ) {
            userDto.setBirthDate( new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss" ).format( user.getBirthDate() ) );
        }
        userDto.setDesc( user.getDescription() );
        userDto.setName( user.getName() );
        if ( user.getAuthorizeStatus() != null ) {
            userDto.setAuthorizeStatus( user.getAuthorizeStatus() );
        }
        return userDto;
    }
}
```



## 三、性能压测对比

使用benchmark进行压测

```Java
@BenchmarkMode(Mode.Throughput)
@Warmup(iterations = 5, time = 1)
@Measurement(iterations = 10, time = 5)
@Threads(8)
@Fork(2)
public class BeanCopyUtilsBenchMark {
    private static final User user = new User();
    private static final BeanCopyUtils copyUtils = new BeanCopyUtils();
    static {
        user.setName("maocg");
        user.setDescription("this is a boy !");
        user.setBirthDate(new Date());
        user.setAuthorizeStatus(1);
    }

    @Benchmark
    public void beanUtilCopyBean() {
        UserDto dto = copyUtils.beanUtilCopyBean(user);
        Assert.assertEquals(user.getName(), dto.getName());
        Assert.assertNull(dto.getBirthDate());
    }

    @Benchmark
    public void cglibCopyBean() throws Exception {
        UserDto dto = copyUtils.cglibCopyBean(user);
    }

    @Benchmark
    public void cglibWithConvertCopyBean() throws Exception {
        UserDto dto = copyUtils.cglibWithConvertCopyBean(user);

    }

    @Benchmark
    public void dozerCopyBean() {
        UserDto dto = copyUtils.dozerCopyBean(user);
        Assert.assertEquals(user.getName(), dto.getName());
        Assert.assertNotNull(dto.getBirthDate());
    }

    @Benchmark
    public void mapStructCopyBean() {
        UserDto dto = copyUtils.mapStructCopyBean(user);
        Assert.assertEquals(user.getName(), dto.getName());
        Assert.assertNotNull(dto.getBirthDate());
    }

    public static void main(String[] args) throws RunnerException {
        Options options = new OptionsBuilder()
                .include(BeanCopyUtilsBenchMark.class.getSimpleName())
                .output("/Users/bytedance/work-demo/logs/benchmark/Benchmark1.log")
                .build();
        new Runner(options).run();
    }
}

```

```Apache
Benchmark                                         Mode  Cnt      Score      Error  Units
BeanCopyUtilsBenchMark.beanUtilCopyBean          thrpt   20  52077.412 ± 3577.969  ops/s
BeanCopyUtilsBenchMark.cglibWithConvertCopyBean  thrpt   20  33298.593 ± 1361.677  ops/s
BeanCopyUtilsBenchMark.dozerCopyBean             thrpt   20   6799.457 ±  310.085  ops/s
BeanCopyUtilsBenchMark.mapStructCopyBean         thrpt   20  32847.143 ± 1588.968  ops/s
```

## 四、框架对比总结

| **框架**      | **类型转换** | **名称转换** | **注解配置** | **xml****配置** | **兼容性** | **性能** | **原理**                            |
| ------------- | ------------ | ------------ | ------------ | --------------- | ---------- | -------- | ----------------------------------- |
| BeanUtils     | ❌            | ❌            | ❌            | ❌               | ✅          | ⭐️        | 反射                                |
| PropertyUtils | ❌（部分）    | ❌            | ❌            | ❌               | ✅          | ⭐️        | 反射                                |
| BeanCopier    | ✅            | ❌            | ❌            | ❌               | ✅          | ⭐️⭐️       | 动态代理                            |
| Dozer         | ✅            | ✅            | ✅            | ✅               | ✅          | ⭐️⭐️       | 基于xml配置，生成动态代理类进行转换 |
| MapStruct     | ✅            | ✅            | ✅            | ✅               | ✅          | ⭐️⭐️⭐️      | 字节码生成转换实现类                |

> **特别注意：**

1. > PropertyUtils类型无法转换时会报错

2. > dozer的注解支持目前比较少，

3. > MapStruct和lombok的builder有些地方不兼容，需要注意。



## 五、结论

从性能和功能性角度考虑，目前最佳的bean复制框架是**MapStruct，**上面几种框架排名如下：

```
MapStruct` > `Dozer` > `BeanCopier` > `BeanUtils`> `PropertyUtils
```