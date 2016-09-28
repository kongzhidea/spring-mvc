package com.kk.resolver;

import com.kk.model.User;
import com.kk.model.conste.Passport;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/**
 * User参数绑定
 * <p/>
 * 跟{@link com.kk.interceptor.CLoginRequiredInterceptor}配合，使得在Controller的方法中参数中 直接用{@code User user}
 * 就可以取到User对象，而不需要再从数据库查一次
 *
 * @author mrrao
 * @date 2015年8月31日, 下午2:35:50
 */
public class UserArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        if (parameter.getParameterType().equals(User.class)) {
            return true;
        }
        return false;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        return webRequest.getAttribute(Passport.loginUser, RequestAttributes.SCOPE_REQUEST);
    }

}
