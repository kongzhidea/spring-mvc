<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html dir="ltr" lang="zh-CN">
<head>
    <title>jstl</title>


</head>
<body>
<c:forEach items="${list}" var="item">
    ${item} <br/>
</c:forEach>
</body>
</html>
