package com.kk.controller;

import com.alibaba.fastjson.JSONObject;
import com.kk.model.User;
import com.kk.utils.JsonUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@EnableAutoConfiguration
public class IndexController {
    private Log logger = LogFactory.getLog(this.getClass());

    @RequestMapping("/")
    public String index(
            HttpServletRequest request,
            HttpServletResponse response, Model model) {
        logger.info("spring-boot index");
        return "index";
    }

    @RequestMapping("/cn")
    public String cn(
            HttpServletRequest request,
            HttpServletResponse response, Model model) {
        return "中文";
    }

    // 返回值为string，则默认返回的Content-Type 为text-html， produces可以设置返回编码
    @RequestMapping(value = "/json", produces = {"application/json;charset=UTF-8"})
    public String json(
            HttpServletRequest request,
            HttpServletResponse response, Model model) {
        return JsonUtil.getOkJsonResult("中文").toString();
    }

    @RequestMapping("/json2")
    public JSONObject json2(
            HttpServletRequest request,
            HttpServletResponse response, Model model) {
        return JsonUtil.getOkJsonResult("中文");
    }

    @RequestMapping("/json3")
    public User json3(
            HttpServletRequest request,
            HttpServletResponse response, Model model) {
        User user = new User();
        user.setId(1);
        user.setUsername("kk");
        user.setRealname("孔");
        return user;
    }

    @RequestMapping("/log")
    public String log(
            HttpServletRequest request,
            HttpServletResponse response, Model model) {
        logger.info("log test");
        //
        org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(this.getClass());
        log.info("log {}", "test2");
        return "log";
    }
}