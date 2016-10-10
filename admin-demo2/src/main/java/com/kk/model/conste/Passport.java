package com.kk.model.conste;

/**
 * 登录相关
 *
 * @author zhihui.kong
 */
public interface Passport {

    /**
     * request中设置当前的登录用户，后台使用
     */
    String loginUser = "loginUser";

    /**
     * 后台登陆 cookie
     */
    String LOGIN_USER_NAME_COOKIE = "_k_u";
    String LOGIN_USER_TICKET_COOKIE = "_k_t";
    String LOGIN_USER_TIME_STAMP_COOKIE = "_k_timestamp";
}
