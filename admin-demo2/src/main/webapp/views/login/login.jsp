<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ page import="java.util.Calendar" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>管理后台</title>

    <link href="http://libs.baidu.com/bootstrap/2.3.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="/static/css/common/application.css" media="all" rel="stylesheet" type="text/css" />
    <script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/jinplace/1.2.1/jinplace.min.js"></script>
    <script src="http://cdn.bootcss.com/bootbox.js/4.4.0/bootbox.js"></script>
    <script src="http://libs.baidu.com/bootstrap/2.3.2/js/bootstrap.min.js"></script>
    <script src="/static/js/common/common.js" type="text/javascript"></script>

</head>
<body class="no-padding">
<div id="fixed-top" class="sb-slide"></div>

<div id="sb-site" class="top-padding">
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span4 offset4 well">
                <h3>欢迎访问管理后台，请登录</h3>

                <form class="simple_form new_user" id="_form" method="post" novalidate="novalidate">
                    <div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden"
                                                                          value="&#x2713;"/><input
                            name="authenticity_token" type="hidden"
                            value="KotJlvL3BAdoGe/5BXIkaugPy/wpbXisa+a3CowPIok="/></div>
                    <div class="form-inputs">
                        <div class="control-group tel optional user_phone_num">
                            <label class="tel optional control-label" for="username">用户名</label>

                            <div class="controls">
                                <input autofocus="autofocus" class="string tel optional input-block-level" id="username"
                                       name="username" size="50" type="tel"/>
                            </div>
                        </div>
                        <div class="control-group password optional user_password">
                            <label class="password optional control-label" for="password">密码</label>

                            <div class="controls">
                                <input class="password optional input-block-level" id="password" name="password"
                                       size="50" type="password"/>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <input class="btn btn-block btn-primary" type="submit" value="登录"/>
                    </div>
                </form>
            </div>

        </div>
    </div>
</div>

<footer style="text-align:center">
    <p>&copy; 管理后台 <% out.print(Calendar.getInstance().get(Calendar.YEAR)); %></p>
</footer>

<script type="text/javascript">
    $(document).ready(function () {

        $("#_form").bind("submit", function (e) {
            e.preventDefault(); // 阻止默认事件，表单提交后R页面跳转
            var username = $("#username").val();
            var password = $("#password").val();
            $.ajax({
                type: "post",
                data: {"username": username, "password": password},
                url: "/login/commit",
                success: function (ret) {
                    console.log(ret);
                    if (ret.code == 0) {
                        var callback = cutOffStr("callback");
                        if(callback == null || callback == ""){
                            callback = "/";
                        }
                        window.location.href = callback;
                    } else {
                        bootbox.alert(ret.msg);
                    }
                },
                error: function () {
                    bootbox.alert("请求失败");
                }
            });
        });
    });
</script>
</body>
</html>

