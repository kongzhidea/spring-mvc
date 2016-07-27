package com.kk.interceptor;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
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

    // 判断后台权限
    private void checkRight(HttpServletRequest request, HttpServletResponse response) throws Exception {
    }
}
