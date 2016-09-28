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
    <title>管理后台</title>
    <jsp:include page="/views/inc/head.jsp"/>
</head>
<body class="no-padding">

<jsp:include page="/views/inc/header.jsp"/>
<div id="sb-site" class="top-padding">
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="modal-body">
                <h5>欢迎访问管理后台.</h5>
            </div>
        </div>
    </div>
</div>

<jsp:include page="/views/inc/leftbar.jsp" />

</body>
</html>
