package com.kk.interceptor;

import com.kk.utils.PureTextUtil;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * 过滤script 标签
 *
 * @author yang
 */

@Component
public class ScriptInterceptor implements MethodInterceptor {

    public static final Log logger = LogFactory
            .getLog(ScriptInterceptor.class);

    @Autowired(required = false)
    private HttpServletRequest request;

    @Override
    public Object invoke(MethodInvocation inv) throws Throwable {
        // 增加注解 拦截
//        AdminRequired adminRequired = AnnotationUtils.findAnnotation(
//                inv.getMethod(), AdminRequired.class);
//        // 若没有添加标注，则放弃拦截
//        if (adminRequired == null) {
//            return inv.proceed();
//        }
        logger.info("script");
        Object[] args = inv.getArguments();
        if (args != null) {
            for (int i = 0; i < args.length; i++) {
                if (args[i] instanceof String) {
                    try {
                        String value = (String) args[i];
                        args[i] = PureTextUtil.filterScript(value);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return inv.proceed();
    }
}