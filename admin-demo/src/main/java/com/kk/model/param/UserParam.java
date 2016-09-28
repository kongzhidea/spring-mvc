package com.kk.model.param;

public class UserParam {
    private String id;
    private String username;
    private String realname;
    private String mobile;
    private String status;// 空表示全部

    public String getId() {
        return id;
    }

    public UserParam setId(String id) {
        this.id = id;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public UserParam setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getRealname() {
        return realname;
    }

    public UserParam setRealname(String realname) {
        this.realname = realname;
        return this;
    }

    public String getMobile() {
        return mobile;
    }

    public UserParam setMobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public String getStatus() {
        return status;
    }

    public UserParam setStatus(String status) {
        this.status = status;
        return this;
    }
}
