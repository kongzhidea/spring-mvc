<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
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
    <title>编辑账户信息</title>
    <jsp:include page="/views/inc/head.jsp"/>
</head>
<body class="no-padding">

<jsp:include page="/views/inc/header.jsp"/>
<div id="sb-site" class="top-padding">
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span4 offset4 well">
                <h2>编辑账户信息</h2>

                <form  class="simple_form " id="_form" >
                    <div class="form-inputs">
                        <div class="control-group  ">
                            <label class="control-label" for="id">
                                <abbr title="必填项">*</abbr> Id</label>
                            <div class="controls">
                                <input autofocus="autofocus" class="string string required disabled input-block-level"
                                       disabled="disabled" id="id"  size="50" type="tel" value="${loginUser.id}" />
                            </div>
                        </div>
                        <div class="control-group ">
                            <label class="control-label" for="username">
                                <abbr title="必填项">*</abbr> 用户名</label>
                            <div class="controls">
                                <input class="string required input-block-level" id="username"  size="50" type="text" value="${loginUser.username}" />
                            </div>
                        </div>
                        <div class="control-group ">
                            <label class="control-label" for="realname">
                                <abbr title="必填项">*</abbr> 姓名</label>
                            <div class="controls">
                                <input class="string required input-block-level" id="realname"  size="50" type="text" value="${loginUser.realname}" />
                            </div>
                        </div>
                        <div class="control-group ">
                            <label class="control-label" for="mobile">
                                <abbr title="必填项">*</abbr> 手机号</label>
                            <div class="controls">
                                <input class="tel required input-block-level" id="mobile"  size="50" type="text" value="${loginUser.mobile}" />
                            </div>
                        </div>
                        <div class="control-group  ">
                            <label class="control-label" for="mail">Email</label>
                            <div class="controls">
                                <input class="string email optional input-block-level" id="mail"  size="50" type="email" value="${loginUser.mail}" />
                            </div>
                        </div>
                        <div class="control-group  ">
                            <label class=" control-label" for="new_password">密码</label>
                            <div class="controls">
                                <input class="password optional input-block-level" id="new_password"  size="50" type="password" />
                                <p class="help-block">为空，则表示不修改密码</p>
                            </div>
                        </div>
                        <div class="control-group  ">
                            <label class=" control-label" for="new_password_confirmation">确认密码</label>
                            <div class="controls">
                                <input class="password optional input-block-level" id="new_password_confirmation"  size="50" type="password" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class=" control-label" for="current_password">
                                <abbr title="必填项">*</abbr> 当前密码</label>
                            <div class="controls">
                                <input class="password required input-block-level" id="current_password"  size="50" type="password" />
                                <p class="help-block">为了安全，您需要输入当前登录密码</p>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <input class="btn btn-block btn-primary"   type="submit" value="保存" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<jsp:include page="/views/inc/leftbar.jsp" />
<script type="text/javascript">
    $(document).ready(function () {

        $("#_form").bind("submit", function (e) {
            e.preventDefault(); // 阻止默认事件，表单提交后R页面跳转

            if($("#new_password").val() != $("#new_password_confirmation").val()){
                bootbox.alert("密码输入不一致");
                return ;
            }

//            data = {};
//            data["id"] = $("#id").val();
//            data["username"] = $("#username").val();
//            data["realname"] = $("#realname").val();
//            data["mobile"] = $("#mobile").val();
//            data["mail"] = $("#mail").val();
//            data["new_password"] = $("#new_password").val();
//            data["current_password"] = $("#current_password").val();
            data = parseCommitFormData($(this));
            $.ajax({
                type: "post",
                data: data,
                url: "settingDo",
                success: function (ret) {
                    if(ret.code == 0){
                        toastr.success("更新成功");
                    }else{
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
