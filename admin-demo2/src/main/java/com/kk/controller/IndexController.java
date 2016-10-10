package com.kk.controller;

import com.kk.model.User;
import com.kk.service.UserService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    private Log logger = LogFactory.getLog(this.getClass());

    @Autowired
    UserService userService;

    @RequestMapping("")
    public String index(User user,
                        HttpServletRequest request,
                        HttpServletResponse response, Model model) {
        return "index";
    }
}