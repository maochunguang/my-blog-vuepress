import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as d,c as l,d as e,e as n,f as t,a as i}from"./app-Ka-hdGpI.js";const o={},c=i(`<h2 id="一、背景" tabindex="-1"><a class="header-anchor" href="#一、背景"><span>一、背景</span></a></h2><p>每一个写java的同学都会为一堆set，get方法烦恼，特别是使用mvc分层或者DDD领域模型开发之后。有VO（View Object）视图对象，DTO（Data Transfer Object）数据传输对象，DO（Domain Object）领域对象，PO（Persistent Object）持久层对象等等。不同层之间进行交互时，免不了进行对象的复制。每次已修改底层数据结构，都要从头到尾改一遍，实在是不优雅。这篇文章让你以后不用写set和get赋值。</p><p><strong>在bean复制框架之前：</strong></p><figure><img src="https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/image (1).png" alt="image (1)" tabindex="0" loading="lazy"><figcaption>image (1)</figcaption></figure><p><strong>有了bean框架之后：</strong></p><figure><img src="https://blog-pics-1252092369.cos.ap-beijing.myqcloud.com/image.png" alt="image" tabindex="0" loading="lazy"><figcaption>image</figcaption></figure><h2 id="二、bean复制框架原理和使用" tabindex="-1"><a class="header-anchor" href="#二、bean复制框架原理和使用"><span>二、bean复制框架原理和使用</span></a></h2><p>java的对象之间转换原理主要有三种，第一种是直接使用代理进行字段赋值；第二种是生成动态代理进行赋值；第三种是和lombok类似，利用编译期实现jsr规范，生成转换代码。</p><div class="language-Java line-numbers-mode" data-ext="Java" data-title="Java"><pre class="language-Java"><code>@Data
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1、spring-beanutils-beanutils-copyproperties" tabindex="-1"><a class="header-anchor" href="#_1、spring-beanutils-beanutils-copyproperties"><span>1、Spring-BeanUtils，<code>BeanUtils.\`\`*copyProperties*</code></span></a></h3><h4 id="a、用法" tabindex="-1"><a class="header-anchor" href="#a、用法"><span>a、用法</span></a></h4><div class="language-Java line-numbers-mode" data-ext="Java" data-title="Java"><pre class="language-Java"><code>public UserDto beanUtilCopyBean(User user) {
    UserDto dto = new UserDto();
    BeanUtils.copyProperties(user, dto);
    System.out.println(&quot;source:&quot; + user.toString());
    System.out.println(&quot;target:&quot; + dto.toString());
    return dto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="b、原理" tabindex="-1"><a class="header-anchor" href="#b、原理"><span>b、原理</span></a></h4><p>利用java反射，对类中的所有字段进行反射赋值。</p><h3 id="_2、apache-beanutils-propertyutils-copyproperties" tabindex="-1"><a class="header-anchor" href="#_2、apache-beanutils-propertyutils-copyproperties"><span>2、Apache-BeanUtils，<code>PropertyUtils.\`\`*copyProperties*</code></span></a></h3><h4 id="a、用法-1" tabindex="-1"><a class="header-anchor" href="#a、用法-1"><span>a、用法</span></a></h4><div class="language-Java line-numbers-mode" data-ext="Java" data-title="Java"><pre class="language-Java"><code>public UserDto propertyUtilCopyBean(User user) throws Exception {
    UserDto dto = new UserDto();
    PropertyUtils.copyProperties(dto, user);
    System.out.println(&quot;source:&quot; + user.toString());
    System.out.println(&quot;target:&quot; + dto.toString());
    return dto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="b、原理-1" tabindex="-1"><a class="header-anchor" href="#b、原理-1"><span>b、原理</span></a></h4><p>利用java反射，对类中的所有字段进行反射赋值。</p><h3 id="_3、cglib-beancopier" tabindex="-1"><a class="header-anchor" href="#_3、cglib-beancopier"><span>3、Cglib，BeanCopier</span></a></h3><h4 id="a、用法-2" tabindex="-1"><a class="header-anchor" href="#a、用法-2"><span>a、用法</span></a></h4><div class="language-Java line-numbers-mode" data-ext="Java" data-title="Java"><pre class="language-Java"><code>public UserDto cglibWithConvertCopyBean(User user) throws Exception {
    UserDto dto = new UserDto();
    UserConverter converter = new UserConverter();
    BeanCopier copier = BeanCopier.create(user.getClass(), dto.getClass(), true);
    copier.copy(user, dto, converter);
    return dto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="b、原理-2" tabindex="-1"><a class="header-anchor" href="#b、原理-2"><span>b、原理</span></a></h4><p>通过动态代理生成代理类，然后通过代理类的set get方法进行赋值。性能和直接set，get很接近</p>`,24),v={id:"_4、dozer-http-dozer-sourceforge-net",tabindex:"-1"},u={class:"header-anchor",href:"#_4、dozer-http-dozer-sourceforge-net"},p={href:"http://dozer.sourceforge.net/",target:"_blank",rel:"noopener noreferrer"},b=i(`<h4 id="a、用法-3" tabindex="-1"><a class="header-anchor" href="#a、用法-3"><span>a、用法</span></a></h4><div class="language-XML line-numbers-mode" data-ext="XML" data-title="XML"><pre class="language-XML"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;mappings xmlns=&quot;http://dozer.sourceforge.net&quot;
          xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
          xsi:schemaLocation=&quot;http://dozer.sourceforge.net
          http://dozer.sourceforge.net/schema/beanmapping.xsd&quot;&gt;
    &lt;configuration&gt;
        &lt;date-format&gt;yyyy-MM-dd HH:mm:ss&lt;/date-format&gt;
    &lt;/configuration&gt;

    &lt;mapping wildcard=&quot;true&quot;&gt;
        &lt;class-a&gt;com.mcg.javastudy.mode.User&lt;/class-a&gt;
        &lt;class-b&gt;com.mcg.javastudy.mode.UserDto&lt;/class-b&gt;
        &lt;field&gt;
            &lt;a&gt;name&lt;/a&gt;
            &lt;b&gt;name&lt;/b&gt;
        &lt;/field&gt;
        &lt;field&gt;
            &lt;a&gt;description&lt;/a&gt;
            &lt;b&gt;desc&lt;/b&gt;
        &lt;/field&gt;
        &lt;field&gt;
            &lt;a&gt;authorizeStatus&lt;/a&gt;
            &lt;b&gt;authorizeStatus&lt;/b&gt;
        &lt;/field&gt;
        &lt;field&gt;
            &lt;a&gt;birthDate&lt;/a&gt;
            &lt;b&gt;birthDate&lt;/b&gt;
        &lt;/field&gt;
    &lt;/mapping&gt;
&lt;/mappings&gt;
public UserDto dozerCopyBean(User user) {
    Mapper mapper = DozerBeanMapperSingletonWrapper.getInstance();
    UserDto dto = mapper.map(user, UserDto.class);
    System.out.println(&quot;source:&quot; + user.toString());
    System.out.println(&quot;target:&quot; + dto.toString());
    return dto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="b、原理-3" tabindex="-1"><a class="header-anchor" href="#b、原理-3"><span>b、原理</span></a></h4><p>根据xml配置解析出映射关系，生成动态代理类，然后进行set，get。</p>`,4),m={id:"_5、mapstruct-https-mapstruct-org",tabindex:"-1"},g={class:"header-anchor",href:"#_5、mapstruct-https-mapstruct-org"},h={href:"https://mapstruct.org/",target:"_blank",rel:"noopener noreferrer"},y=i(`<h4 id="a、用法-4" tabindex="-1"><a class="header-anchor" href="#a、用法-4"><span>a、用法</span></a></h4><div class="language-Java line-numbers-mode" data-ext="Java" data-title="Java"><pre class="language-Java"><code>@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = &quot;description&quot;, target = &quot;desc&quot;)
    @Mapping(source = &quot;birthDate&quot;, target = &quot;birthDate&quot;, dateFormat = &quot;yyyy-MM-dd HH:mm:ss&quot;)
    UserDto userToUserDto(User user);
}

public UserDto mapStructCopyBean(User user) {
    UserDto dto = UserMapper.INSTANCE.userToUserDto(user);
    System.out.println(&quot;source:&quot; + user.toString());
    System.out.println(&quot;target:&quot; + dto.toString());
    return dto;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="b、原理-4" tabindex="-1"><a class="header-anchor" href="#b、原理-4"><span>b、原理</span></a></h4><p>和lombok类似，mapSturct也实现了JSR 269 API规范，在编译时会生成一个转换的实现类，实现类进行set和get，几乎无性能损耗。自动生成的转化实现类如下：</p><div class="language-Java line-numbers-mode" data-ext="Java" data-title="Java"><pre class="language-Java"><code>@Generated(
    value = &quot;org.mapstruct.ap.MappingProcessor&quot;
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
            userDto.setBirthDate( new SimpleDateFormat( &quot;yyyy-MM-dd HH:mm:ss&quot; ).format( user.getBirthDate() ) );
        }
        userDto.setDesc( user.getDescription() );
        userDto.setName( user.getName() );
        if ( user.getAuthorizeStatus() != null ) {
            userDto.setAuthorizeStatus( user.getAuthorizeStatus() );
        }
        return userDto;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、性能压测对比" tabindex="-1"><a class="header-anchor" href="#三、性能压测对比"><span>三、性能压测对比</span></a></h2><p>使用benchmark进行压测</p><div class="language-Java line-numbers-mode" data-ext="Java" data-title="Java"><pre class="language-Java"><code>@BenchmarkMode(Mode.Throughput)
@Warmup(iterations = 5, time = 1)
@Measurement(iterations = 10, time = 5)
@Threads(8)
@Fork(2)
public class BeanCopyUtilsBenchMark {
    private static final User user = new User();
    private static final BeanCopyUtils copyUtils = new BeanCopyUtils();
    static {
        user.setName(&quot;maocg&quot;);
        user.setDescription(&quot;this is a boy !&quot;);
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
                .output(&quot;/Users/bytedance/work-demo/logs/benchmark/Benchmark1.log&quot;)
                .build();
        new Runner(options).run();
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-Apache line-numbers-mode" data-ext="Apache" data-title="Apache"><pre class="language-Apache"><code>Benchmark                                         Mode  Cnt      Score      Error  Units
BeanCopyUtilsBenchMark.beanUtilCopyBean          thrpt   20  52077.412 ± 3577.969  ops/s
BeanCopyUtilsBenchMark.cglibWithConvertCopyBean  thrpt   20  33298.593 ± 1361.677  ops/s
BeanCopyUtilsBenchMark.dozerCopyBean             thrpt   20   6799.457 ±  310.085  ops/s
BeanCopyUtilsBenchMark.mapStructCopyBean         thrpt   20  32847.143 ± 1588.968  ops/s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、框架对比总结" tabindex="-1"><a class="header-anchor" href="#四、框架对比总结"><span>四、框架对比总结</span></a></h2><table><thead><tr><th><strong>框架</strong></th><th><strong>类型转换</strong></th><th><strong>名称转换</strong></th><th><strong>注解配置</strong></th><th><strong>xml****配置</strong></th><th><strong>兼容性</strong></th><th><strong>性能</strong></th><th><strong>原理</strong></th></tr></thead><tbody><tr><td>BeanUtils</td><td>❌</td><td>❌</td><td>❌</td><td>❌</td><td>✅</td><td>⭐️</td><td>反射</td></tr><tr><td>PropertyUtils</td><td>❌（部分）</td><td>❌</td><td>❌</td><td>❌</td><td>✅</td><td>⭐️</td><td>反射</td></tr><tr><td>BeanCopier</td><td>✅</td><td>❌</td><td>❌</td><td>❌</td><td>✅</td><td>⭐️⭐️</td><td>动态代理</td></tr><tr><td>Dozer</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>⭐️⭐️</td><td>基于xml配置，生成动态代理类进行转换</td></tr><tr><td>MapStruct</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>⭐️⭐️⭐️</td><td>字节码生成转换实现类</td></tr></tbody></table><blockquote><p><strong>特别注意：</strong></p></blockquote><ol><li><blockquote><p>PropertyUtils类型无法转换时会报错</p></blockquote></li><li><blockquote><p>dozer的注解支持目前比较少，</p></blockquote></li><li><blockquote><p>MapStruct和lombok的builder有些地方不兼容，需要注意。</p></blockquote></li></ol><h2 id="五、结论" tabindex="-1"><a class="header-anchor" href="#五、结论"><span>五、结论</span></a></h2><p>从性能和功能性角度考虑，目前最佳的bean复制框架是**MapStruct，**上面几种框架排名如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MapStruct\` &gt; \`Dozer\` &gt; \`BeanCopier\` &gt; \`BeanUtils\`&gt; \`PropertyUtils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,16);function U(f,B){const s=r("ExternalLinkIcon");return d(),l("div",null,[c,e("h3",v,[e("a",u,[e("span",null,[n("4、dozer，"),e("a",p,[n("http://dozer.sourceforge.net/"),t(s)])])])]),b,e("h3",m,[e("a",g,[e("span",null,[n("5、mapstruct，"),e("a",h,[n("https://mapstruct.org/"),t(s)])])])]),y])}const x=a(o,[["render",U],["__file","java-bean-copy.html.vue"]]);export{x as default};
