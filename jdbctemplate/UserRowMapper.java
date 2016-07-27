package com.kk.jdbctemplate;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

class UserRowMapper implements RowMapper<User> {

    public User mapRow(ResultSet rs, int index) throws SQLException {

        User u = new User();//可以使用name和index两种方式，index从1开始
        u.setId(rs.getInt("id"));
        u.setUsername(rs.getString("username"));
        u.setPassword(rs.getString("password"));
        u.setRealname(rs.getString("realname"));
        u.setStatus(rs.getInt("status"));
        u.setUptime(rs.getDate("uptime"));
        u.setCtime(rs.getDate("ctime"));
        u.setMobile(rs.getString("mobile"));
        u.setCityName(rs.getString("city_name"));
        return u;

    }

}

