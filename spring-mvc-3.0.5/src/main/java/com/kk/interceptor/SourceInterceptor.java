package com.kk.interceptor;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 处理请求中的source信息，设置到cookie中，拦截所有请求
 * <p/>
 * 增加consumer的登录信息，判断t票
 *
 * @author zhihui.kong
 */
public class SourceInterceptor extends HandlerInterceptorAdapter {
    public static final Log logger = LogFactory.getLog(SourceInterceptor.class);


    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {
        logger.info("preHandle");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request,
                           HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
    }


}
