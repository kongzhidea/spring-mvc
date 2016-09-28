package com.kk.interceptor;

import com.kk.model.User;
import com.kk.model.conste.Passport;
import com.kk.service.UserService;
import com.kk.utils.CookieManager;
import com.kk.utils.MD5Util;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author zhihui.kong
 */
@Component
public class CLoginRequiredInterceptor extends HandlerInterceptorAdapter {
    public static final Log logger = LogFactory.getLog(CLoginRequiredInterceptor.class);

    @Autowired
    UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {

        if (request.getRequestURI().startsWith("/login")) {
            return true;
        }

        String userName = null, timestamp = null, ticket = null;
        userName = CookieManager.getInstance().getCookie(request,
                Passport.LOGIN_USER_NAME_COOKIE);
        timestamp = CookieManager.getInstance().getCookie(request,
                Passport.LOGIN_USER_TIME_STAMP_COOKIE);
        ticket = CookieManager.getInstance().getCookie(request,
                Passport.LOGIN_USER_TICKET_COOKIE);

        User user = userService.getUserByUsername(userName);
        if (user != null && user.getStatus() != 0) {
            return nologin(request, response);
        }
        if (user != null
                && ticket != null
                && ticket.equals(MD5Util.generateLoginTicket(userName,
                user.getPassword(), timestamp))) {
            request.setAttribute(Passport.loginUser, user);
            return true;
        }
        return nologin(request, response);
    }

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
