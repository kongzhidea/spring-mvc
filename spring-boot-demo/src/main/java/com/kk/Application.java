package com.kk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.support.SpringBootServletInitializer;


/**
 * 启动类
 *
 * @SpringBootApplication 注解等价于以默认属性使用 @Configuration ， @EnableAutoConfiguration 和 @ComponentScan 。
 * 
 * 
 * 1) controller 必须放到同目录，或者同目录下的包中
 * 
 * 2) boot默认使用logback，在resources下配置logback.xml
 * 
 * a) log使用方法1：
 * org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(this.getClass());
 * log.info("log {}", "param");
 * 
 * b) log使用方式2：
 * org.apache.commons.logging.Log logger = org.apache.commons.logging.LogFactory.getLog(this.getClass());
 * 
 * 3) NOTE:
 * 不要依赖 servet.jar，和 tomcat-embed-core 冲突
 * 不要手动添加依赖 jackson， 使用 spring-boot-web依赖的jackson
 * 
 * 4) 启动程序, 推荐方案b
 * a) mvn启动命令：mvn spring-boot:run，  需要工程中 只能有一个 main方法。
 * 
 * b) java启动命令(linux为':'，windows为';')：java -cp target/lib/*;target/classes com.kk.Application
 * 
 * 5) 修改启动端口， 默认8080， 推荐使用 方式c)
 * a)
 * Application implements EmbeddedServletContainerCustomizer
 * @Override public void customize(ConfigurableEmbeddedServletContainer container) {
 * container.setPort(8080);
 * }
 * 
 * b) 在application.properties中 配置 server.port=8080
 * c) 通过属性占位符还能缩短命令参数
 * 例如修改web默认端口需要使用--server.port=9090方式，如果在配置中写上：
 * server.port=${port:8080}
 * 那么就可以使用更短的--port=9090，当不提供该参数的时候使用默认值8080。
 * 
 * 6) 配置文件为:application.properties
 * 在 config类上加上此注解，可以查找 prefix. 开头的 变量， 如果不设置prefix值，则直接找变量。
 * @Component
 * @ConfigurationProperties(prefix = "prefix")
 * 例如RedisService中可以直接配置@ConfigurationProperties(prefix = "redis")，properties中配置ip，端口等，service中加上对应的变量。
 * 
 * 7) ConfigClass 配置 applicationContext-core.xml
 *
 * 8) 静态资源在 resources/static目录下， 访问 js/common.js，寻找static/js/common.js， pom中需要添加include file
 *
 * 9) 启动彩蛋， 可以在 resources/banner.txt 配置
 *
 * 10) 拦截器
 */
@SpringBootApplication
public class Application extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}