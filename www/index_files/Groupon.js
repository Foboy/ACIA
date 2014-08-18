$(function () {
    updateEndTime();
});
//倒计时函数
function updateEndTime() {
    var date = new Date();
    var time = date.getTime();  //当前时间距1970年1月1日之间的毫秒数
    $(".settime").each(function (i) {
        var endDate = this.getAttribute("endTime"); //结束时间字符串
        //转换为时间日期类型
        //var endDate1 = eval('new Date(' + endDate.replace(/\d+(?=-[^-]+$)/, function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
        var endDate1 = new Date(Date.parse(endDate));
        var endTime = endDate1.getTime(); //结束时间毫秒数
        var lag = (endTime - time) / 1000; //当前时间和结束时间之间的秒数
        if (lag > 0) {
            var second = Math.floor(lag % 60);
            var minite = Math.floor((lag / 60) % 60);
            var hour = Math.floor((lag / 3600) % 24);
            var day = Math.floor((lag / 3600) / 24);
            if ((day) > 3) {
                $(this).html("距离结束还有 " + (day) + "天以上");
            }
            else if ((day) < 1) {
                $(this).html("距离结束还有 <em>" + hour + "小时" + minite + "分" + second + "秒</em>");
            }
            else {
                $(this).html("距离结束还有 " + (day) + "天");
            }
        }
        else
            $(this).html("团购已经结束啦！");
    });
    setTimeout("updateEndTime()", 1000);
}

function replacePara(url, para, paravalue) {
    url = url.replace("#top", "");
    url = url.replace("=#", "=");
    if (url.indexOf(para + "=") > 0) {
        var oldvalue = url.substring(url.indexOf(para + "=") + (para + "=").length);
        if (oldvalue.indexOf("&") > 0) {
            oldvalue = oldvalue.substring(0, oldvalue.indexOf("&"))
        }
        else {
            oldvalue = oldvalue.substring(0)
        }
        if (oldvalue.length > 0) {
            url = url.replace(oldvalue, paravalue)
        }
        else {
            url = url.substring(0, url.indexOf(para + "=")) + para + "=" + paravalue + url.substring(url.indexOf(para + "=") + (para + "=").length);

        }
    }
    else {
        if (url.indexOf("?") > 0) {
            url = url + "&" + para + "=" + paravalue;
        }
        else {
            url = url + "?" + para + "=" + paravalue;
        }
    }
    return url;
}