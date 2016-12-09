package com.kk.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

/**
 * UploadController
 */
@Controller
@RequestMapping("upload")
public class UploadController {
    public static final Log logger = LogFactory.getLog(UploadController.class);

    @RequestMapping("")
    public String test(HttpServletRequest request,
                       HttpServletResponse response, Model model) {
        return "upload";
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String create(HttpServletRequest request,
                         HttpServletResponse response, Model model,
                         @RequestParam("file_name") MultipartFile file) {

        try {
            System.out.println(file.getOriginalFilename() + ".." + file.getSize());
            return "upload.create";
        } catch (Exception e) {
            logger.error("catch error! " + e.getMessage(), e);
        }
        return "upload.error";
    }


}
