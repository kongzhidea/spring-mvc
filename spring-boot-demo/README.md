# spring-boot , restful

* [Spring Boot的启动器Starter详解](http://412887952-qq-com.iteye.com/blog/2294926)

* 设置applicontextContext.xml 可以直接在Application上写@ImportResource({"classpath:applicationContext.xml"})，也可以另外定义ConfigClass，

```
@SpringBootApplication
@ImportResource({"classpath:applicationContext-core.xml"})
@EnableAutoConfiguration(exclude = { DataSourceTransactionManagerAutoConfiguration.class, DataSourceAutoConfiguration.class })
public class Application extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

```
@Configuration
@ImportResource(locations = {"classpath:applicationContext-core.xml"})
public class ConfigClass {

}
```
