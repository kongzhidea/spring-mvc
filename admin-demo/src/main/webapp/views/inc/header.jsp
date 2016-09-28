<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<div id="fixed-top" class="sb-slide">
    <div class="sb-toggle-left">
        <a class="btn btn-inverse"><i class="icon-tasks">&nbsp;</i>菜单</a>
    </div>

    <a href="/login/logout" class="btn btn-inverse pull-right">退出</a>

    <a href="/admin/setting" class="btn btn-inverse pull-right">设置</a>

    <a type="button" class="btn btn-inverse pull-right">
        欢迎你，${loginUser.realname}
    </a>

</div>