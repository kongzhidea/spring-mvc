package com.kk.controller;

import com.kk.model.User;
import com.kk.model.param.UserParam;
import com.kk.service.UserService;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("admin")
public class AdminController {
    private Log logger = LogFactory.getLog(this.getClass());

    @Autowired
    UserService userService;

    // 个人资料设置
    @RequestMapping("setting")
    public String setting(User user,
                          HttpServletRequest request,
                          HttpServletResponse response, Model model) {
        return "admin/setting";
    }

    // 设置个人资料设置
    @RequestMapping("settingDo")
    @ResponseBody
    public String settingDo(User user,
                            HttpServletRequest request,
                            HttpServletResponse response,
                            @RequestParam("username") String username,
                            @RequestParam("realname") String realname,
                            @RequestParam("mobile") String mobile,
                            @RequestParam("mail") String mail,
                            @RequestParam("new_password") String new_password,
                            @RequestParam("current_password") String current_password
    ) {
        try {
            Assert.hasLength(username, "请输入用户名");
            Assert.hasLength(realname, "请输入姓名");
            Assert.hasLength(mobile, "请输入手机号");
            Assert.hasLength(current_password, "请输入当前密码");
        } catch (Exception e) {
            return JsonUtil.getJson(1, e.getMessage()).toString();
        }

        User o = userService.getUserByUsername(username);
        if (o != null && o.getId() != user.getId()) {
            return JsonUtil.getJson(1, "用户名已存在").toString();
        }

        if (!MD5Util.md5(current_password).equals(user.getPassword())) {
            return JsonUtil.getJson(1, "密码不正确").toString();
        }

        user.setUsername(username);
        user.setRealname(realname);
        user.setMobile(mobile);
        user.setMail(mail);
        user.setUptime(new Date());
        if (StringUtils.isNotBlank(new_password)) {
            user.setPassword(MD5Util.md5(new_password));
        }
        userService.updateUser(user);

        return JsonUtil.getOkJson("更新成功").toString();
    }

    // 用户列表
    @RequestMapping("list")
    public String list(User user,
                       UserParam param,
                       @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
                       @RequestParam(value = "limit", required = false, defaultValue = "20") Integer limit,
                       HttpServletRequest request,
                       HttpServletResponse response, Model model) {
        page = (page == null || page <= 0) ? 1 : page;
        limit = (limit == null || limit <= 0) ? 20 : limit;

        int start = (page - 1) * limit;
        List<User> list = userService.search(param, start, limit);
        int count = userService.count(param);

        model.addAttribute("list", list);
        model.addAttribute("count", count);

        model.addAttribute("param", param);
        model.addAttribute("page", page);
        model.addAttribute("limit", limit);
        model.addAttribute("start", start);

        int totalPage = (count + limit - 1) / limit;
        model.addAttribute("totalPage", totalPage);

        return "admin/list";
    }

    // view
    @RequestMapping("view")
    public String view(
            @RequestParam("id") int id,
            HttpServletRequest request,
            HttpServletResponse response, Model model) {
        if (id > 0) {
            User user = userService.getUser(id);
            model.addAttribute("user", user);
        }
        model.addAttribute("id", id);
        return "admin/view";
    }

    // 保存用户信息
    @RequestMapping("save")
    @ResponseBody
    public String save(User admin,
                       HttpServletRequest request,
                       HttpServletResponse response,
                       @RequestParam("id") Integer id,
                       @RequestParam("username") String username,
                       @RequestParam("realname") String realname,
                       @RequestParam("mobile") String mobile,
                       @RequestParam("mail") String mail,
                       @RequestParam("status") int status,
                       @RequestParam("new_password") String new_password
    ) {
        id = id == null ? 0 : id;
        try {
            Assert.hasLength(username, "请输入用户名");
            Assert.hasLength(realname, "请输入姓名");
            Assert.hasLength(mobile, "请输入手机号");
        } catch (Exception e) {
            return JsonUtil.getJson(1, e.getMessage()).toString();
        }
        User user = new User();
        if (id > 0) {
            user = userService.getUser(id);
            if (user == null) {
                return JsonUtil.getJson(1, "用户不存在").toString();
            }
        }

        user.setUsername(username);
        user.setRealname(realname);
        user.setMobile(mobile);
        user.setMail(mail);
        user.setStatus(status);
        if (StringUtils.isNotBlank(new_password)) {
            user.setPassword(MD5Util.md5(new_password));
        }
        user.setUptime(new Date());
        if (id > 0) {
            userService.updateUser(user);
        } else {
            userService.addUser(user);
        }

        return JsonUtil.getOkJsonResultString(user);
    }

    // 设置为离职
    @RequestMapping("delete")
    @ResponseBody
    public String delete(User admin,
                       HttpServletRequest request,
                       HttpServletResponse response,
                       @RequestParam("id") int id
    ) {
        User user = userService.getUser(id);
        if (user == null) {
            return JsonUtil.getJson(1, "用户不存在").toString();
        }
        user.setStatus(1);
        userService.updateUser(user);

        return JsonUtil.getOkJson().toString();
    }
}
