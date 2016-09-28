package com.kk.controller;

import com.kk.model.User;
import com.kk.model.conste.Passport;
import com.kk.service.UserService;
import com.kk.utils.CookieManager;
import com.kk.utils.JsonUtil;
import com.kk.utils.MD5Util;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("login")
public class CLoginController {
    private Log logger = LogFactory.getLog(this.getClass());

    @Autowired
    UserService userService;

    @RequestMapping("")
    public String index(HttpServletRequest request,
                        HttpServletResponse response, Model model) {
        return "login/login";
    }


    @RequestMapping(value = "commit")
    @ResponseBody
    public String commit(HttpServletRequest request,
                         HttpServletResponse response,
                         @RequestParam("username") String username,
                         @RequestParam("password") String password
    ) {
        try {
            Assert.hasLength(username, "请输入用户名");
            Assert.hasLength(password, "请输入密码");
        } catch (Exception e) {
            return JsonUtil.getJson(1, e.getMessage()).toString();
        }

        User user = userService.getUserByUsername(username);

        if (user == null) {
            return JsonUtil.getJson(1, "用户不存在").toString();
        }
        if (user.getStatus() != 0) {
            return JsonUtil.getJson(1, "用户已离职").toString();
        }
        if (!MD5Util.md5(password).equals(user.getPassword())) {
            return JsonUtil.getJson(1, "密码不正确").toString();
        }

        int cTime = 60 * 60 * 24 * 7;

        long timestamp = System.currentTimeMillis();
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.saveKKCookie(request, response, Passport.LOGIN_USER_NAME_COOKIE, user.getUsername(), cTime);
        cookieManager.saveKKCookie(request, response, Passport.LOGIN_USER_TIME_STAMP_COOKIE, String.valueOf(timestamp), cTime);
        cookieManager.saveKKCookie(request, response, Passport.LOGIN_USER_TICKET_COOKIE, MD5Util.generateLoginTicket(user.getUsername(), user.getPassword(), String.valueOf(timestamp)), cTime);

        return JsonUtil.getOkJson().toString();
    }

    @RequestMapping("logout")
    public String logout(HttpServletRequest request,
                         HttpServletResponse response, Model model) {
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.clearCookie(response, Passport.LOGIN_USER_NAME_COOKIE, "/");
        cookieManager.clearCookie(response, Passport.LOGIN_USER_TIME_STAMP_COOKIE, "/");
        cookieManager.clearCookie(response, Passport.LOGIN_USER_TICKET_COOKIE, "/");
        return "redirect:/login";
    }
}