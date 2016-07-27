package com.kk.utils;

import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import java.util.List;
import java.util.Map;

public class CommonUtil {

    private CommonUtil() {
    }

    private static final String QRCODE_API = "http://qr.liantu.com/api.php?w=200&el=l&m=25&text=%s";

    /**
     * 返回二维码图片 链接
     * 
     * @param url url 必须用UTF8编码格式，url内容出现 & 符号时，请用 %26 代替, 换行符使用 %0A
     * @return
     */
    public static String getQRCode(String url) {
        return String.format(QRCODE_API, url.replaceAll("&", "%26"));
    }

    /**
     * 通用的将List归并成Map的方法
     * 
     * <pre>
     * Map&lt;Integer, List&lt;Order&gt;&gt; cityId2orders = CommonUtil.group(orders, new Function&lt;Order, Integer&gt;() {
     *     &#064;Override
     *     public Integer apply(Order order) {
     *         return order.getCustomerCityId();
     *     }
     * });
     * </pre>
     * 
     * @param list
     * @param function
     * @return
     */
    public static <K, E> Map<K, List<E>> group(List<E> list, Function<E, K> function) {
        Map<K, List<E>> map = Maps.newHashMap();
        for (E e : list) {
            K k = function.apply(e);
            List<E> es = map.get(k);
            if (es == null) {
                es = Lists.newArrayList();
                map.put(k, es);
            }
            es.add(e);
        }
        return map;
    }


    /**
     * 通用的将List映射成Map的方法
     * 
     * @param list
     * @param functionK
     * @param functionV
     * @return
     */
    public static <K, V, E> Map<K, V> map(List<E> list, Function<E, K> functionK, Function<E, V> functionV) {
        Map<K, V> map = Maps.newHashMap();
        for (E e : list) {
            K k = functionK.apply(e);
            V v = functionV.apply(e);
            map.put(k, v);
        }
        return map;
    }

    /**
     * 通用的将List映射成Map的方法
     *
     * @param list
     * @param functionK
     * @return
     */
    public static <K, E> Map<K, E> map(List<E> list, Function<E, K> functionK) {
        Map<K, E> map = Maps.newHashMap();
        for (E e : list) {
            K k = functionK.apply(e);
            map.put(k, e);
        }
        return map;
    }
}
