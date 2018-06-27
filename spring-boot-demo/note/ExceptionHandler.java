package com.kk.spring;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

/**
 * 通用异常拦截器
 * 
 * @author  zhihui.kzh on 16/11/9.
 */
@Component
public class ExceptionHandler implements HandlerExceptionResolver {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public ModelAndView resolveException(HttpServletRequest request,
                                         HttpServletResponse response, Object handler, Exception ex) {

        response.setStatus(HttpServletResponse.SC_OK);

        logger.error(ex.getMessage(), ex);

        ModelAndView model = new ModelAndView(new MappingJackson2JsonView());
        model.addObject("success", false);
        model.addObject("code", "500");
        model.addObject("message", ex.getMessage());
        return model;
    }
}
