$(document).ready(function () {

    var length = $("._pagination").length;
    for (var i=0;i<length;i++){
        var nav = $($("._pagination")[i]);
        var ul = nav;

        var totalPage = $($("._totalPage")[0]).text(); // 总页码
        var page = cutOffStr("page"); // 当前页
        if(page == null || page == "" || page <=0){
            page = 1;
        }
        page = Number(page);

        var limit = cutOffStr("limit");
        if(limit == null){
            limit = "";
        }
        var params = format("limit={}",limit);

        var inputs = $("form").find("input");
        for (var j=0;j<inputs.length;j++){
            var name = $(inputs[j]).attr("name");
            if(name == undefined || name == null){
                continue;
            }
            params = params + format("&{}={}",name,$(inputs[j]).val());
        }

        var selects = $("form").find("select");
        for (var j=0;j<selects.length;j++){
            var select = $(selects[j]);
            var name = select.attr("name");
            if(name == undefined || name == null){
                continue;
            }
            params = params + format("&{}={}",name,select.val());
        }

        if(totalPage > 1 && page > 1){
            ul.append(format("<a href='?page={}&{}'>{}</a> ","1",params,"首页"));
        }

        if(page > 1){
            ul.append(format("<a href='?page={}&{}'>{}</a> ",(page-1),params,"上一页"));
        }

        if(page > 3){
            ul.append(format("<a href='?page={}&{}'>{}</a> ",(page-3),params,"..."));
        }
        if(page > 2){
            ul.append(format("<a href='?page={}&{}'>{}</a> ",(page-2),params,(page-2)));
        }

        if(page > 1){
            ul.append(format("<a href='?page={}&{}'>{}</a> ",(page-1),params,(page-1)));
        }

        ul.append(format("<u><b><i><a href='{}'>{}</a></i></b></u> ","javascript:void(0)",page));

        if(page + 1 <= totalPage){
            ul.append(format("<a href='?page={}&{}'>{}</a> ",(page+1),params,(page+1)));
        }
        if(page + 2 <= totalPage){
            ul.append(format("<a href='?page={}&{}'>{}</a> ",(page+2),params,(page+2)));
        }
        if(page + 3 <= totalPage){
            ul.append(format("<a href='?page={}&{}'>{}</a> ",(page+3),params,"..."));
        }
        if(page < totalPage){
            ul.append(format("<a href='?page={}&{}'>{}</a> ",(page+1),params,"下一页"));
        }
        if(totalPage > 1 && page < totalPage){
            ul.append(format("<a href='?page={}&{}'>{}</a> ",totalPage,params,"尾页"));
        }
    }
});
