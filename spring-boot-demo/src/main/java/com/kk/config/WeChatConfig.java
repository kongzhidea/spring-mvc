package com.kk.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 从application.properties中查找 weixin. 开头的变量
 *
 * @Component 使得 可以@Autowired注入此类
 */
@Component
@ConfigurationProperties(prefix = "weixin")
public class WeChatConfig {
    private String appid;
    private String appsecret;

    public String getAppid() {
        return appid;
    }

    public WeChatConfig setAppid(String appid) {
        this.appid = appid;
        return this;
    }

    public String getAppsecret() {
        return appsecret;
    }

    public WeChatConfig setAppsecret(String appsecret) {
        this.appsecret = appsecret;
        return this;
    }

    @Override
    public String toString() {
        return "WeChatConfig{" +
                "appid='" + appid + '\'' +
                ", appsecret='" + appsecret + '\'' +
                '}';
    }
}

