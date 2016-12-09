package com.kk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("")
public class IndexController {

    @RequestMapping("")
    public String index(HttpServletRequest request,
                        HttpServletResponse response, Model model) {
        return "index";
    }


    @RequestMapping(value = "json", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String json(HttpServletRequest request,
                       HttpServletResponse response, Model model) {
        return "中文";
    }


    @RequestMapping(value = "error", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String error(HttpServletRequest request,
                        HttpServletResponse response, Model model) {
        int x = 3 / 0;
        return "error";
    }

    @RequestMapping("jstl")
    public String jstl(HttpServletRequest request,
                       HttpServletResponse response, Model model) {
        List<Integer> list = new ArrayList<Integer>();
        list.add(1);
        list.add(11);
        list.add(11);
        model.addAttribute("list", list);
        return "list";
    }
}