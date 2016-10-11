package com.kk.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

/**
 * 从application.properties中获取redis配置
 */
@Service
@ConfigurationProperties(prefix = "redis")
public class RedisService {
    private Log logger = LogFactory.getLog(this.getClass());
    private String host;
    private int port;

    private int jPoolCfgMaxActive;
    private int jPoolCfgMaxIdle;
    private int jPoolCfgMaxWait;
    private String password;// 密码


    public RedisService setHost(String host) {
        this.host = host;
        return this;
    }

    public RedisService setPort(int port) {
        this.port = port;
        return this;
    }

    public RedisService setjPoolCfgMaxActive(int jPoolCfgMaxActive) {
        this.jPoolCfgMaxActive = jPoolCfgMaxActive;
        return this;
    }

    public RedisService setjPoolCfgMaxIdle(int jPoolCfgMaxIdle) {
        this.jPoolCfgMaxIdle = jPoolCfgMaxIdle;
        return this;
    }

    public RedisService setjPoolCfgMaxWait(int jPoolCfgMaxWait) {
        this.jPoolCfgMaxWait = jPoolCfgMaxWait;
        return this;
    }

    public RedisService setPassword(String password) {
        this.password = password;
        return this;
    }

    /**
     * 构建redis连接池 初始化
     */
    @PostConstruct
    public void init() {
        logger.info(this.toString());

//        JedisPoolConfig config = new JedisPoolConfig();
//        // 控制一个pool可分配多少个jedis实例，通过pool.getResource()来获取；
//        // 如果赋值为-1，则表示不限制；如果pool已经分配了maxActive个jedis实例，则此时pool的状态为exhausted(耗尽)。
////		config.setMaxActive(jPoolCfgMaxActive);
//        // 控制一个pool最多有多少个状态为idle(空闲的)的jedis实例。
//        config.setMaxIdle(jPoolCfgMaxIdle);
//        // 表示当borrow(引入)一个jedis实例时，最大的等待时间，如果超过等待时间，则直接抛出JedisConnectionException；
//        config.setMaxWaitMillis(jPoolCfgMaxWait);
//        // 在borrow一个jedis实例时，是否提前进行validate操作；如果为true，则得到的jedis实例均是可用的；
//        config.setTestOnBorrow(true);
//        if (StringUtils.isBlank(password)) {
//            pool = new JedisPool(config, host, port, 2000);
//        } else {
//            pool = new JedisPool(config, host, port, 2000, password);
//        }
    }

    @Override
    public String toString() {
        return "RedisService{" +
                "host='" + host + '\'' +
                ", port=" + port +
                ", jPoolCfgMaxActive=" + jPoolCfgMaxActive +
                ", jPoolCfgMaxIdle=" + jPoolCfgMaxIdle +
                ", jPoolCfgMaxWait=" + jPoolCfgMaxWait +
                ", password='" + password + '\'' +
                '}';
    }
}
