package com.thirdparty.spring.ex;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

public class ExceptionHandler implements HandlerExceptionResolver {

    private Log logger = LogFactory.getLog(this.getClass());

    @Override
    public ModelAndView resolveException(HttpServletRequest request,
                                         HttpServletResponse response, Object handler, Exception ex) {

        logger.error(ex.getMessage(), ex);

        return null;

        // 也可以是自定义错误码，配置如下。可以根据ex异常类型来处理。
//        response.setStatus(HttpServletResponse.SC_OK);
//        ModelAndView model = new ModelAndView(new MappingJackson2JsonView());
//        model.addObject("success", false);
//        model.addObject("code", "500");
//        model.addObject("message", "系统繁忙,请稍后再试");
//        return model;

    }
}
