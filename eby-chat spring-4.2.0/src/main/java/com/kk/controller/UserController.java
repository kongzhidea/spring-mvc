package com.kk.controller;

import com.kk.model.User;
import com.kk.service.UserService;
import com.kk.utils.JsonUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("user")
public class UserController {

    @Autowired
    UserService userService;

    // 转json  在ebay-servlet中已经定义了 Content-Type，chatset

//    @RequestMapping(value = "get", produces = {"application/json;charset=UTF-8"})
    @RequestMapping(value = "get")
    @ResponseBody
    public String get(HttpServletRequest request,
                      HttpServletResponse response, Model model, @RequestParam("id") int id) {
        response.setContentType("application/json; charset=UTF-8");
        User user = userService.getUser(id);
        return JsonUtil.getOkJsonResult(user).toString();
    }


//    @RequestMapping(value = "get2", produces = {"application/json;charset=UTF-8"})
    @RequestMapping(value = "get2")
    @ResponseBody
    public JSONObject get2(HttpServletRequest request,
                           HttpServletResponse response, Model model, @RequestParam("id") int id) {

        User user = userService.getUser(id);
        return JsonUtil.getOkJsonResult(user);
    }

//    @RequestMapping(value = "get3", produces = {"application/json;charset=UTF-8"})
    @RequestMapping(value = "get3")
    @ResponseBody
    public User get3(HttpServletRequest request,
                     HttpServletResponse response, Model model, @RequestParam("id") int id) {

        User user = userService.getUser(id);
        return user;
    }

}