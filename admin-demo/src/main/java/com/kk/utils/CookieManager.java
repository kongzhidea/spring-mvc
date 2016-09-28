package com.kk.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * cookie管理类
 *
 * @author zhihui.kong
 */

public class CookieManager {

    private static CookieManager instance;

    public static CookieManager getInstance() {
        if (instance == null)
            synchronized (CookieManager.class) {
                if (instance == null)
                    instance = new CookieManager();
            }

        return instance;
    }

    public String getCookie(HttpServletRequest request, String key) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null || cookies.length == 0)
            return null;
        for (int i = 0; i < cookies.length; i++) {
            if (cookies[i].getName().equals(key))
                return cookies[i].getValue();

        }
        return null;
    }

    public void saveCookie(HttpServletResponse response, String key,
                           String value) {
        this.saveCookie(response, key, value, -1, "/");
    }

    public void saveCookie(HttpServletResponse response, String key,
                           String value, String path) {
        this.saveCookie(response, key, value, -1, path);
    }

    public void saveCookie(HttpServletResponse response, String key,
                           String value, int second, String path) {
        Cookie cookie = new Cookie(key, value);
        cookie.setPath(path);
        cookie.setMaxAge(second);
        response.addCookie(cookie);
    }

    public void saveCookie(HttpServletResponse response, String key,
                           String value, int second, String path, String domain) {
        Cookie cookie = new Cookie(key, value);
        cookie.setPath(path);
        cookie.setMaxAge(second);
        cookie.setDomain(domain);
        response.addCookie(cookie);
    }

    public void clearCookie(HttpServletResponse response, String key,
                            String path) {
        saveCookie(response, key, null, 0, "/", "kk.cn");
        saveCookie(response, key, null, 0, "/", "www.kk.cn");

        saveCookie(response, key, null, 0, "/", "kk.com");
        saveCookie(response, key, null, 0, "/", "www.kk.com");
        saveCookie(response, key, null, 0, "/");// ip
    }

    /**
     * 设置cookie到kk域下,如果是用IP访问的，则设置到该ip下
     */
    public void saveKKCookie(HttpServletRequest request,
                             HttpServletResponse response, String key, String value, int second) {
        clearCookie(response, key, "/");
        if (request.getRequestURL().indexOf("kk.cn") != -1) {
            CookieManager.getInstance().saveCookie(response, key, value, second, "/", "kk.cn");
        } else if (request.getRequestURL().indexOf("kk.com") != -1) {
            CookieManager.getInstance().saveCookie(response, key, value, second, "/", "kk.com");
        } else {
            saveCookie(response, key, value, second, "/");// ip 情况
        }
    }

}
