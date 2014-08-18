/// <reference path="../../../../Scripts/jquery-1.8.2.min.js" />
/// <reference path="../../../../Scripts/jquery.cookie.js" />

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return r[2]; return null; //返回参数值
}

$(function () {
    //取出Cookie中的最近搜索词
    //var cookieKeyword = $.cookie("LatelySearch");
    //var paramKeyword = getUrlParam("keyword");
    //if (cookieKeyword != null && paramKeyword != null) {
    //    $("#Search").val(cookieKeyword);
    //}

    $("#SearchBtn").click(function () {
        var searchKey = $("#Search").val().replace(/(^\s*)|(\s*$)/g, "");
        if (searchKey == "目的地/景点/酒店/主题") {
            searchKey = "";
        }

        //把搜索关键词保存在Cookie中
        //$.cookie("LatelySearch", searchKey);

        var strpath = window.location.pathname;
        if (strpath.length == 1 && strpath == "/") {
            window.location.href = "/Line/Search?keyword=" + encodeURI(searchKey);
        } else {
            strpath = strpath.substring(1, strpath.length);
            var strCtrl = strpath;
            if (strpath.indexOf("/") > 0) {
                strCtrl = strpath.substring(0, strpath.indexOf('/'));
            }
            switch (strCtrl) {
                case "Index":
                    window.location.href = "/Line/Search?keyword=" + encodeURI(searchKey);
                    break;
                case "Line":
                    //var type = getUrlParam("type");
                    var page = strpath.substring(strpath.indexOf('/') + 1);
                    var page = page.substring(0, page.indexOf('?'));
                    if (page += "" == "") {
                        page = strpath.substring(strpath.indexOf('/') + 1);
                    }
                    switch (page) {
                        case "Gty":
                            window.location.href = "/Line/Search?type=1&keyword=" + encodeURI(searchKey);
                            break;

                        case "Zyx":
                            window.location.href = "/Line/Search?type=2&keyword=" + encodeURI(searchKey);
                            break;

                        case "Zjy":
                            window.location.href = "/Line/Search?type=3&keyword=" + encodeURI(searchKey);
                            break;

                        case "Around":
                            window.location.href = "/Line/Search?gtype=1&keyword=" + encodeURI(searchKey);
                            break;
                        default:
                            window.location.href = "/Line/Search?keyword=" + encodeURI(searchKey);
                    }
                    break;
                case "Cruises":
                    window.location.href = "/Cruises/Search?keyword=" + encodeURI(searchKey);
                    break;
                case "Visa":
                    window.location.href = "/Visa/VisaShow?keyword=" + encodeURI(searchKey);
                    break;
                case "Groupon":
                    window.location.href = "/Groupon/Index?keyword=" + encodeURI(searchKey);
                    break;
                case "Hotel":
                    window.location.href = "/Hotel/Search?keyword=" + encodeURI(searchKey);
                    break;
                case "Scenic":
                    window.location.href = "/Scenic/Show?keyword=" + encodeURI(searchKey);
                    break;
                default:
                    window.location.href = "/Line/Search?keyword=" + encodeURI(searchKey);
            }
        }
    });
});
