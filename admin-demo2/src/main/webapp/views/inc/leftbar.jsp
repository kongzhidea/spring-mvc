<%@ page pageEncoding="UTF-8" %>
<div class="page-sidebar-wrapper" xmlns:c="http://www.w3.org/1999/XSL/Transform">
    <div class="page-sidebar navbar-collapse collapse">
        <!-- BEGIN SIDEBAR MENU -->
        <ul class="page-sidebar-menu">
            <li class="<c:if test="${tpage == 'admin_list'}">current</c:if> icon1">
                <a href="/admin/list">用户列表</a>
            </li>
        </ul>
        <!-- END SIDEBAR MENU -->
    </div>
</div>
<script>
    $('body').delegate('.has_sub','click',function(){
        var _this = $(this),sub = _this.parent().find('.sub-menu');
        if (sub.css('display') == 'block') {
            sub.hide()
        }else{
            sub.show()
        }
    })
    $('.sub-menu li').bind('click',function(){
        var link = $(this).attr('data');
        window.location.href = link
    })
</script>