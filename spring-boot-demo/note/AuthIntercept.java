package com.kk.spring.aop;


import com.alibaba.fastjson.JSON;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author kongzhihui
 */
@Component
public class AuthIntercept extends HandlerInterceptorAdapter {
    private Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        if (!handler.getClass().isAssignableFrom(HandlerMethod.class)) {
            return true;
        }

        HandlerMethod handlerMethod = (HandlerMethod) handler;

        // 优先取 方法上权限验证
        AuthCheck authCheck = handlerMethod.getMethodAnnotation(AuthCheck.class);

        // 如果方法上没有注解，再判断类上面的注解
        if (authCheck == null) {
            authCheck = handlerMethod.getBeanType().getAnnotation(AuthCheck.class);
        }

        if (authCheck == null) {
            return true;
        }

        return true;
    }

    /**
     * 设置无权限返回体，json类型
     *
     */
    private void setNoAuthResponse(HttpServletResponse response) throws IOException {
        response.setHeader("Content-Type", "application/json;charset=UTF-8");

        BaseResult result = ResultUtil.getFailBaseResult("403", msg);

        String respJSonStr = JSON.toJSONString(result);
        response.getOutputStream().write(respJSonStr.getBytes("UTF-8"));
    }

    
    /**
     * 设置无权限返回体，跳转
     *
     */
    private boolean nologin(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String callBack = request.getRequestURI();
        String params = request.getQueryString();
        if (params != null) {
            callBack = callBack + "?" + params;
            callBack = callBack.replace("&", "%26");
        }
        response.sendRedirect("/login?callback=" + callBack);
        return false;
    }
}
