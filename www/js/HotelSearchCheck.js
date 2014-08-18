//+---------------------------------------------------  
//| 获取当前时间(格式：yyyy-MM-dd)  
//| AddDayCount:获取AddDayCount天后的日期
//| 2014-06-22  --  add  --  gjk  - 复制MvcExample中data.js代码
//+---------------------------------------------------
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    if (m < 10) { m = "0" + m; }
    if (d < 10) { d = "0" + d; }
    return (y + "-" + m + "-" + d);
}

/* 
/  2014-06-06
/  酒店搜索日期的限制
/  gjk
*/
function hotelCheck(strDateStart, strDateEnd) {
    if (Date.parse(strDateStart) < Date.parse(GetDateStr(0))) {
        //$(".comply").css({ "display": "block", "margin-top": "300px" });
        //$(".comply_box_con").html("入住时间不能小于今天");
        return "入住时间不能小于今天";
        //return false;
    }
    else if (Date.parse(strDateEnd) <= Date.parse(strDateStart)) {
        return "入住时间必须大于退房时间";
        //return false;
    }
    else if (daysCol(strDateStart, strDateEnd) > 30) {
        return "查询区间不能大于30天";
        //return false;
    }
    else {
        return "";
    }
}

function daysCol(strDateStart, strDateEnd) {
    var strSeparator = "-"; //日期分隔符
    var oDate1;
    var oDate2;
    var iDays;
    oDate1 = strDateStart.split(strSeparator);
    oDate2 = strDateEnd.split(strSeparator);
    var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
    var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
    iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24)//把相差的毫秒数转换为天数 
    return iDays;
}


