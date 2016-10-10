<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page import="java.util.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta charset="utf-8" />
    <title>管理后台-用户编辑</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <meta name="MobileOptimized" content="320">
    <%@ include file="/views/inc/head.jsp" %>
</head>
<body class="page-header-fixed" id="indexView">
<%@ include file="/views/inc/header.jsp" %>
<!-- END HEADER -->
<!-- BEGIN CONTAINER -->
<div class="page-container">
    <!-- BEGIN SIDEBAR -->
    <%@ include file="/views/inc/leftbar.jsp" %>
    <!-- END SIDEBAR -->
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-content-body">
                <c:if test="${id > 0}">
                    <h2 class="page_title">
                        <span>用户Id：${id}</span>
                    </h2>
                </c:if>
                <form id="_form">
                <table class="order_table user_table">
                        <input id="id" type="hidden" value="${id}"/>
                        <tr class="gray_th"><th colspan="4">基本信息</th></tr>
                        <tr>
                            <td>
                                <strong class="star">*</strong>用户名：
                                <input type="text" class="normal_input" id="username" value="${user.username}" placeholder="请输入用户名"/>
                            </td>
                            <td>
                                <strong class="star">*</strong>姓名：<input type="text" class="normal_input" id="realname" value="${user.realname}" placeholder="请输入姓名"/>
                            </td>
                            <td>
                                <strong class="star">*</strong>手机号：<input type="text" class="normal_input" id="mobile" value="${user.mobile}" placeholder="请输入手机号"/>
                            </td>
                            <td>
                                <strong class="star">*</strong>Email：<input type="text" class="normal_input" id="mail" value="${user.mail}" placeholder="请输入邮箱"/>
                            </td>
                        </tr>
                        <tr>
                            <td><strong class="star">*</strong>状态：
                                <select  id="status">
                                    <option value="0" <c:if test="${user.status==0}">selected="selected"</c:if>>在职</option>
                                    <option value="1" <c:if test="${user.status==1}">selected="selected"</c:if>>离职</option>
                                </select>
                            </td>
                            <td>
                                <strong class="star">*</strong>密码：<input type="text" class="normal_input" id="new_password" value="" placeholder="为空，则表示不修改密码"/>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <input type="submit" class="green_btn green_btnSumit" value="保存" />
                            </td>
                        </tr>
                </table>
                </form>
            </div>
        </div>
    </div>
    <!-- END CONTENT -->
</div>

<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<%@ include file="/views/inc/footer.jsp" %>

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

<!-- END FOOTER -->
</body>
<!-- END PAGE HEADER-->
<!-- BEGIN PAGE CONTENT-->

</html>



