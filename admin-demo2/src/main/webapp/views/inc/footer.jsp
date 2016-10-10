<%@ page pageEncoding="UTF-8" %>
<%@ page import="java.util.Calendar" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<div class="footer">
    <div class="footer-inner">
        <div class="copyright">Copyright  <% out.print(Calendar.getInstance().get(Calendar.YEAR)); %> 管理后台</div>
    </div>
</div>
