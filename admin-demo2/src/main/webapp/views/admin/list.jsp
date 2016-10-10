<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page import="java.util.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta charset="utf-8" />
    <title>管理后台-用户列表</title>
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
                <h2 class="page_title">用户列表</h2>
                <div class="filter_wrapper">
                    <form action="/admin/list" >
                        <h4><font class="fl">参数控制器</font><span class="set_icon"></span></h4>
                        <p>
                            <label >
                                Id: <input class="control"  name="id" type="text" value="${param.id}" style="width: 80px;"/>
                            </label>

                            <label >
                                用户名: <input class="control"  name="username" type="text" value="${param.username}" />
                            </label>

                            <label >
                                姓名: <input class="control"  name="realname" type="text" value="${param.realname}" />
                            </label>

                            <label >
                                手机号: <input class="control"  name="mobile" type="text" value="${param.mobile}" />
                            </label>
                        </p>
                        <p>
                            <label >
                                状态:
                                <select  name="status">
                                    <option value="" >全部</option>
                                    <option value="0" <c:if test="${param.status==0}">selected="selected"</c:if>>在职</option>
                                    <option value="1" <c:if test="${param.status==1}">selected="selected"</c:if>>离职</option>
                                </select>
                            </label>

                            <input type="submit" value="确认筛选" class="green_btn" id="filter_submit"/>
                        </p>

                    </form>
                </div>
                <jsp:include page="/views/inc/fenye.jsp"/>
                <table class="order_table">
                    <tr>
                        <th>Id</th>
                        <th>用户名</th>
                        <th>姓名</th>
                        <th>手机号</th>
                        <th>更新时间</th>
                        <th>邮箱</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    <c:forEach items="${list}" var="item">
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.username}</td>
                            <td>${item.realname}</td>
                            <td>${item.mobile}</td>
                            <td><fmt:formatDate value="${item.uptime}" pattern="yyyy-MM-dd HH:mm:ss" /> </td>
                            <td>${item.mail}</td>
                            <td class="_status">${item.statusDesc}</td>
                            <td>
                                <!-- <a class="min_green_btn"> -->
                                <a href="view?id=${item.id}" target="_blank">编辑</a>
                                <c:if test="${item.status == 0}">
                                    <a href="javascript:void(0);" class="delete"
                                       data-id="${item.id}" data-name="${item.realname}">删除</a>
                                </c:if>
                            </td>
                        </tr>
                    </c:forEach>
                </table>
                <c:if test="${fn:length(list) > 15}">
                    <jsp:include page="/views/inc/fenye.jsp"/>
                </c:if>
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
        $(".delete").click(function(){
            var id = $(this).attr("data-id");
            var name = $(this).attr("data-name");
            bootbox.confirm("确认删除:" + name, function(result){
                if(result){
                    $.ajax({
                        type: "post",
                        data: {"id":id},
                        url: "delete",
                        success: function (ret) {
                            if(ret.code != 0){
                                bootbox.alert(ret.msg);
                            }else{
                                window.location.reload();
                            }

                        },
                        error: function () {
                            bootbox.alert("请求失败");
                        }
                    });
                }
            });
        });
    });
</script>

<script src="/static/js/common/fenye.js"></script>
<!-- END FOOTER -->
</body>
<!-- END PAGE HEADER-->
<!-- BEGIN PAGE CONTENT-->

</html>



