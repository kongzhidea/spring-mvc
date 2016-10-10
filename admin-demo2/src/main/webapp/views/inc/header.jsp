<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<script type="text/javascript">
    $(function() {
                $("#logout").bind('click',function(e){
                    e.preventDefault();
                    $.get('/login/logout', function(data){
                        window.location.reload();
                    });
                });
            }
    );
</script>

<div class="header navbar navbar-inverse navbar-fixed-top clearfix">
    <!-- BEGIN TOP NAVIGATION BAR -->
    <div class="header-inner">
        <!-- BEGIN LOGO -->
        <h1>
            <a class="navbar-brand" href="/">
                <%--<img src="/static/admin-boostrap/img/data_web/logo.png" alt="logo" class="img-responsive" />--%>
            </a>
        </h1>
        <div class="user_wrapper">
            <img src="/static/admin-boostrap/img/data_web/head.png" alt="${loginUser.realname}" width="40"/>
            <span>${currentUser.realname}</span>
            <a href="/basic/logout" class="logout" id="logout" title="退出"></a>
        </div>
    </div>
    <!-- END TOP NAVIGATION BAR -->
</div>

