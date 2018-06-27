package com.kk.spring;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import com.kk.middleware.aop.AclIntercept;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.List;

/**
 * spring-mvc 返回值使用fastjson解析。
 */
@Configuration
@EnableWebMvc
public class MVCConfiguration extends WebMvcConfigurerAdapter {

    @Autowired
    AuthIntercept authIntercept;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authIntercept);
    }

    /**
    * 设置spring返回类型转换器，默认为fastjson，  spring类型指定编码为utf-8。
    */
    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        for (int i = 0; i < converters.size(); i++) {
            HttpMessageConverter converter = converters.get(i);
            if (converter instanceof StringHttpMessageConverter) {
                ((StringHttpMessageConverter) converter).setDefaultCharset(Charset.forName("UTF-8"));
            }
        }

        FastJsonHttpMessageConverter jsonConverter = new FastJsonHttpMessageConverter();
        jsonConverter.getFastJsonConfig().setSerializerFeatures(SerializerFeature.BrowserSecure, SerializerFeature.DisableCircularReferenceDetect);
        jsonConverter.setSupportedMediaTypes(Arrays.asList(
                MediaType.valueOf("application/json;charset=UTF-8")
        ));
        converters.add(0, jsonConverter);

        super.extendMessageConverters(converters);
    }
}
