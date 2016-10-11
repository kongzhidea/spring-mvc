package com.kk.intercepter;

import com.kk.annotation.Authorization;
import com.kk.service.UserService;
import org.apache.commons.lang3.StringUtils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 登录拦截器
 * <p>
 * 采用Authorization 注解方式， 在controller或者controller对应的方法中 加上此注解，则需要此拦截器
 */
public class AuthorizationInterceptor extends HandlerInterceptorAdapter {
    private Log logger = LogFactory.getLog(this.getClass());

    @Autowired
    UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!handler.getClass().isAssignableFrom(HandlerMethod.class)) {
            return true;
        }

        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }

        HandlerMethod method = (HandlerMethod) handler;

        if (method.getMethodAnnotation(Authorization.class) != null || method.getBeanType().getAnnotation(Authorization.class) != null) {
            logger.info("auth preHandler");
        }

        return true;
    }
}
