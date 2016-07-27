package com.kk.jdbctemplate;

import com.kk.log4j.ConsoleLogger;
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class JDBCTemplateTest {


    private static ConsoleLogger logger = new ConsoleLogger();

    static JdbcTemplate jdbc = getSource();

    private static JdbcTemplate getSource() {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/eby_test?useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&transformedBitIsBoolean=true");
        dataSource.setUsername("");
        dataSource.setPassword("");
        dataSource.setInitialSize(2);
        dataSource.setMaxActive(2);
        dataSource.setDefaultAutoCommit(true);
        dataSource.setTimeBetweenEvictionRunsMillis(3600000);
        dataSource.setMinEvictableIdleTimeMillis(3600000);

        JdbcTemplate jdbc = new JdbcTemplate();

        jdbc.setDataSource(dataSource);
        return jdbc;
    }

    public static void main(String[] args) {
        String sql = "select * from eby_user where id = 195";

//        List<User> list = jdbc.query(sql, new SimpleTemplateRowMapper<User>(User.class));
        List<User> list = jdbc.query(sql, new TemplateRowMapper<User>(User.class));
//        List<User> list = jdbc.query(sql, new BeanPropertyRowMapper(User.class, false, false));
//        List<User> list = jdbc.query(sql, new org.springframework.jdbc.core.BeanPropertyRowMapper(User.class));

        logger.info(list.size());
        for (User user : list) {
            logger.info(user);
        }
    }
}
