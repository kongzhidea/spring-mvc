package com.kk.controller;

import com.kk.model.User;
import com.kk.utils.JsonUtil;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 404页面在web.xml中配置
 * <p/>
 * 500和异常栈 在ebay-servlet.xml中配置
 */
@Controller
@RequestMapping("")
public class IndexController {

    @RequestMapping("")
    public String index(HttpServletRequest request,
                        HttpServletResponse response, Model model) {
        return "index";
    }

    // 如果是json，最好转成string， 返回值最好是string。（如果返回值是json，有时候会有空指针异常）
    @RequestMapping(value = "/show/{id:[0-9]+}", method = {
            RequestMethod.POST, RequestMethod.GET}, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String show(HttpServletRequest request,
                       HttpServletResponse response, Model model, @PathVariable("id") int id) {
        return "展示:" + id;
    }

    @RequestMapping("error")
    @ResponseBody
    public String error(HttpServletRequest request,
                        HttpServletResponse response, Model model,
                        @RequestParam("a") int a,
                        @RequestParam(value = "b", required = false, defaultValue = "0") Integer _b
    ) {
        int b = _b == null ? 0 : _b;
        int x = a / b;

        return "" + x;
    }

    @RequestMapping("json")
    @ResponseBody
    public String json(HttpServletRequest request,
                       HttpServletResponse response, Model model) {
        return JsonUtil.getJson(0, "中文").toString();
    }

    @RequestMapping("json2")
    @ResponseBody
    public JSONObject json2(HttpServletRequest request,
                            HttpServletResponse response, Model model) {
        return JsonUtil.getJson(0, "中文");
    }

    @RequestMapping("json3")
    @ResponseBody
    public User json3(HttpServletRequest request,
                      HttpServletResponse response, Model model) {
        User user = new User();
        user.setId(1);
        user.setName("中文");
        return user;
    }

}