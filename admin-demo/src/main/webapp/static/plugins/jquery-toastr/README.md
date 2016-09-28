# toast通知

```
<script type="text/javascript" src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript" src="/js-library/jquery/jquery-toastr/js/toastr.min.js"></script>
<link href="/js-library/jquery/jquery-toastr/css/toastr.min.css" rel="stylesheet">
```

```
 toastr.options = {
        closeButton: false,
    debug: false,
    progressBar: false,
    positionClass: "toast-top-center",
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
};
```
```
//成功提示绑定
toastr.success("祝贺你成功了");

//信息提示绑定
toastr.info("这是一个提示信息");

//敬告提示绑定
toastr.warning("警告你别来烦我了");

//错语提示绑定
toastr.error("出现错误，请更改");

//清除窗口绑定
toastr.clear();
```