package com.kk.service;

import com.kk.dao.UserDao;
import com.kk.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserDao userDao;

    public User getUser(int id) {
        return userDao.getUser(id);
    }
}
