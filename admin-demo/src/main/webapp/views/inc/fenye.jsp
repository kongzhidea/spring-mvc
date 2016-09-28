<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<!-- 与fenye.js 一起使用，js最好放到最底部 -->
<!-- 要求当前列表页有且仅有一个form， 总页数从 _totalPage中获取 -->
<!-- form表单中一定要设置name属性 -->

<p><strong>共 ${count} 个,<span class="_totalPage">${totalPage}</span>页</strong></p>
<nav class="pagination">
  <ul>

  </ul>
</nav>

