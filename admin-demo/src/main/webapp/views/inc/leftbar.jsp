<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<div class="sb-slidebar sb-left" style="text-align:center">
    <nav>
        <ul class="sb-menu">
            <li class="sb-toggle-left"><h3>管理后台</h3></li>
            <li><a href="/admin/list">员工列表</a></li>
            <li><a href="/login/logout" data-method="delete" rel="nofollow">注销</a></li>
            <li><a href="/admin/setting">编辑账户信息</a></li>
        </ul>
    </nav>
</div>
<script type="text/javascript">
    $(function () {
        $.slidebars();
    });
</script>