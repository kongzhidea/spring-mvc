package com.kk.utils.jstl;

import java.util.Collection;

/**
 * jstl自定义方法
 * 
 * @author mrrao
 * @date 2015年9月1日, 上午11:12:20
 */
public class CustomFunctions {

    private CustomFunctions() {
    }

    /**
     * 判断集合中是否有该元素
     * 
     * @param collection
     * @param object
     * @return
     */
    public static boolean contains(Collection<?> collection, Object object) {
        return collection.contains(object);
    }

    /**
     * 转换成int类型，常用于解决jstl默认把数字封装成Long类型造成的困扰
     * 
     * @param number
     * @return
     */
    public static int toInt(Number number) {
        return number.intValue();
    }

}
