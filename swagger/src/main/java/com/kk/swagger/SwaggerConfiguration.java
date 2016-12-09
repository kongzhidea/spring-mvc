package com.kk.swagger;

import io.swagger.annotations.ApiOperation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.paths.AbstractPathProvider;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


/**
 * 访问地址：http://localhost:8080/swagger-ui.html
 *
 * 接口中最好定义 RequestMapping的method字段
 */
@EnableWebMvc
@EnableSwagger2
@Configuration
public class SwaggerConfiguration {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2).select()
//                .apis(RequestHandlerSelectors.any()) // 所有接口
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class)) // 只扫描有此注解的接口F
                .paths(PathSelectors.any()).build().pathProvider(new AbstractPathProvider() {
                    @Override
                    protected String applicationPath() {
                        return "/";
                    }

                    @Override
                    protected String getDocumentationPath() {
                        return "/";
                    }
                });
    }
}
