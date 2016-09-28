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
    <title>
        <c:choose>
            <c:when test="${id == 0 || id == null || id == ''}">
                添加用户信息
            </c:when>
            <c:otherwise>
                编辑用户信息
            </c:otherwise>
        </c:choose>
    </title>
    <jsp:include page="/views/inc/head.jsp"/>
</head>
<body class="no-padding">

<jsp:include page="/views/inc/header.jsp"/>
<div id="sb-site" class="top-padding">
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="collapse in">
                <h2>
                    <c:choose>
                        <c:when test="${id == 0 || id == null || id == ''}">
                            添加用户信息
                        </c:when>
                        <c:otherwise>
                            编辑用户信息
                        </c:otherwise>
                    </c:choose>
                </h2>

                <form  class="form-horizontal" id="_form" >
                    <div class="control-group ">
                        <label class="control-label" for="id">
                            <abbr title="必填项">*</abbr> Id</label>
                        <div class="controls form-inline">
                            <input autofocus="autofocus" class="string string required disabled "
                                   disabled="disabled" id="id"  size="50" type="tel" value="${user.id}" />
                        </div>
                    </div>
                    <div class="control-group ">
                        <label class="control-label" for="username">
                            <abbr title="必填项">*</abbr> 用户名</label>
                        <div class="controls form-inline">
                            <input class="string required " id="username"  size="50" type="text" value="${user.username}" />
                        </div>
                    </div>
                    <div class="control-group ">
                        <label class="control-label" for="realname">
                            <abbr title="必填项">*</abbr> 姓名</label>
                        <div class="controls form-inline">
                            <input class="string required " id="realname"  size="50" type="text" value="${user.realname}" />
                        </div>
                    </div>
                    <div class="control-group ">
                        <label class="control-label" for="mobile">
                            <abbr title="必填项">*</abbr> 手机号</label>
                        <div class="controls">
                            <input class="tel required " id="mobile"  size="50" type="text" value="${user.mobile}" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="mail">Email</label>
                        <div class="controls">
                            <input class="string email optional " id="mail"  size="50" type="email" value="${user.mail}" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="status">状态</label>
                        <div class="controls">
                            <select  id="status">
                                <option value="0" <c:if test="${user.status==0}">selected="selected"</c:if>>在职</option>
                                <option value="1" <c:if test="${user.status==1}">selected="selected"</c:if>>离职</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group password optional ">
                        <label class="password optional control-label" for="new_password">密码</label>
                        <div class="controls">
                            <input class="password optional " id="new_password"  size="50" type="password" />
                            <p class="help-block">为空，则表示不修改密码</p>
                        </div>
                    </div>

                    <div class="form-actions">
                        <input class="btn btn-primary"   type="submit" value="保存" />
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

            data  = parseCommitFormData($(this));

            $.ajax({
                type: "post",
                data: data,
                url: "save",
                success: function (ret) {
                    if(ret.code != 0){
                        bootbox.alert(ret.msg);
                    }else{
                        if($("#id").val == 0 || $("#id").val() == ""){
                            window.location.href="?id=" + ret.data.id;
                        }else{
                            toastr.success("更新成功");
                        }
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
