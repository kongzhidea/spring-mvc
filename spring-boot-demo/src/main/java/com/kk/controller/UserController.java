package com.kk.controller;

import com.kk.model.User;
import com.kk.service.UserService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RequestMapping("/user")
@RestController
public class UserController {
    private Log logger = LogFactory.getLog(this.getClass());

    @Autowired
    UserService userService;

    @RequestMapping("")
    public User index(
            @RequestParam("id") int id,
            HttpServletRequest request,
            HttpServletResponse response, Model model) {
        return userService.getUser(id);
    }

}