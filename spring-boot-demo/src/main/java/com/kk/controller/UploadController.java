package com.kk.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class UploadController {
    private Log logger = LogFactory.getLog(this.getClass());

    @RequestMapping(value = "/file/upload", method = RequestMethod.POST)
    public Object upload(@RequestParam(value = "name",required = false) String name,
                         @RequestParam(value ="file",required = false) MultipartFile file,
                         @RequestParam(value ="file2",required = false) MultipartFile file2) {

        System.out.println(name);

        if (file!= null && !file.isEmpty()) {

            System.out.println(file.getOriginalFilename() + "..."

                    + file.getSize());

            System.out.println(file2.getOriginalFilename() + "..."

                    + file2.getSize());

        }

        return "ok";

    }
}