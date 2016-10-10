package com.kk.dao;

import com.kk.model.User;
import com.kk.model.param.UserParam;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface UserDao {

    public User getUser(int id);

    User getUserByUsername(String username);

    void updateUser(User user);

    List<User> search(@Param("param") UserParam param,
                      @Param("start") int start,
                      @Param("limit") int limit);

    int count(@Param("param") UserParam param);

    void addUser(User user);
}
