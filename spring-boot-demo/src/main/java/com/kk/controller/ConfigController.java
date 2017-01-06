package com.kk.controller;

import com.kk.config.WeChatConfig;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 配置文件使用
 */
@RequestMapping("/config")
@RestController
public class ConfigController {
    private Log logger = LogFactory.getLog(this.getClass());

    @Autowired
    WeChatConfig weChatConfig;

    @RequestMapping("weixin")
    public Object weixin(
            HttpServletRequest request,
            HttpServletResponse response, Model model) {
        logger.info(weChatConfig);
        return weChatConfig;
    }

}