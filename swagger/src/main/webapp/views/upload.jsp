<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib
        uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>上传图片</title>

</head>
<body class=" zh_CN">
<form id='file_form' action='/upload/create' enctype='multipart/form-data' method='post'>
    <input type='file' name='file_name' id='file_name' value=''/>
    <input type='submit'/>
</form>
</body>
</html>
