package com.kk.dao;

import com.kk.model.User;

@MyBatisRepository
public interface UserDao {

    public User getUser(int id);

}
