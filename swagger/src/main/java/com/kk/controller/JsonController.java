package com.kk.controller;

import com.kk.utils.JsonUtil;
import io.swagger.annotations.ApiOperation;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/t/json")
public class JsonController {

    @RequestMapping(value = "get", method = RequestMethod.GET)
    @ApiOperation(value = "测试get方式", notes = "method=get")
    public String get(HttpServletRequest request,
                      HttpServletResponse response, Model model, @RequestParam("id") int id) {
        return JsonUtil.getOkJsonResult("测试中文乱码不").toString();
    }


    @RequestMapping(value = "post", method = RequestMethod.POST)
    @ApiOperation(value = "测试post方法", notes = "")
    public JSONObject post(HttpServletRequest request,
                           HttpServletResponse response, Model model, @RequestParam("id") int id) {
        return JsonUtil.getOkJsonResult("中文编码为utf-8");
    }

}