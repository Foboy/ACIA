$(document).ready(function () {
    function pk() {
        var winW = $(window).width();
        var boxW = $("#box").width();
        var leftVal = (winW - boxW) / 2;
        $("#box").css({ left: leftVal + "px", bottom: "0" });
        $(window).resize(function () {
            pk()
        });
    }
    pk();

    var cookie_pz = "cookie_pz";
    var cookie_aHref = "cookie_aHref";
    var cookie_price = "cookie_price";
    var cookie_imgStr = "cookie_imgStr";
    var cookie_pid = "cookie_pid";
    var boxKId = "#boxKongId";
    var boxCid = "#boxConId";

    $("#box").hide();  //默认隐藏

    $(".duibiLan").toggle(function () {  //右侧打开对比层
            $("#box").show();
		},function(){
			$("#box").hide();
    });

    $(".right").click(function () {   //隐藏对比层
        $("#box").hide();
    });

    //加入对比
    $("a[biaozhi]").click(function () {  //对比点击事件
        $("#box").show();
        for (var k = 1; k < 5; k++) {
            if (null == $.cookie((cookie_pz + k))) {
                if (!$(this).hasClass("Jiaru") && !$(this).hasClass("Quxiao")) {
                    if ($((boxKId + k)).css("display") == "block") {  //还有可以加入的空位置
                        $((boxKId + k)).hide(); //隐藏现有空位 
                        $(this).addClass("Quxiao");  //修改样式
                        var docDiv = $(this).closest("dl").children("dd").children("div");  //获取外层div
                        var pz = $.trim(docDiv.children("h3").children("a").text());  //品质+标题
                        if (pz.length > 16) { pz = pz.substr(0, 16); }
                        var aHref = docDiv.children("h3").children("a").attr("href");  //链接地址
                        var imgSrc = docDiv.children("div").children("#hdPicSrc").val();  //图片路径
                        var priceStr = docDiv.children("div").children("#hdPrice").val();  //价格
                        var pid = docDiv.children("div").children("#hdPid").val();  //价格
                        /* 加入对比-cookie */
                        $.cookie((cookie_pz + k), pz);
                        $.cookie((cookie_aHref + k), aHref);
                        $.cookie((cookie_price + k), "&#xFFE5;" + priceStr + "&#x8D77;");
                        $.cookie((cookie_imgStr + k), imgSrc);
                        $.cookie((cookie_pid + k), pid);
                        /* 结束-cookie */

                        showDb(k);
                        break;
                    }
                } else if ($(this).hasClass("Quxiao")) {
                    $(this).removeClass("Quxiao");  //修改样式
                    var xxx = $(this).closest("dt").children("a").children("img").attr("src");
                    for (var j = 1; j < 5; j++) {
                        if (null != $.cookie((cookie_imgStr + j)) && ('undefined' != $.cookie((cookie_imgStr + j)))) {
                            if ($.cookie((cookie_imgStr + j)) == xxx) {
                                $(boxCid + j).css({ "display": "none" }); //隐藏
                                $(boxKId + j).css({ "display": "block" });  //显示
                                delCookie(j);  //删除cookie\
                                break;
                            }
                        }
                    }
                    break;
                }
            }
            else {
                showDb(k);
            }
        }
    });

    //删除对比
    $(".boxConcn_Right").click(function () {

        //删除当前加入的路线
        delDb($(this));

        //删除cookie
        var cNum = $(this).parent("div").parent("div").parent("div").attr("id").replace(/boxConId/, '');
        delCookie(cNum);
    });

    //显示对比栏事件
    $(".duibiLan").click(function () {
        getCookieOfPro();
        $("#box").show();
        //for (var i = 1; i < 5; i++) {
        //    showDb(i);
        //}
    });

    //清空对比栏
    $(".qingkong").click(function () {

        var historyHtml = "";

        for (var j = 1; j <= 4; j++) {
            historyHtml += "<li><div class=\"boxKong\"><div class=\"boxKong_Left\">" + j + "</div><div class=\"boxKong_Right\">您还可以继续添加</div></div></li>";
        }
        if (historyHtml != "") {
            $("#ulDuiBi").html(historyHtml);
        }
        delCookieDuiBi("awtripduibi");
    });

    //清除cookie
    function delCookie(num) {
        $.cookie((cookie_pz + num), '', { expires: -1 });
        $.cookie((cookie_aHref + num), '', { expires: -1 });
        $.cookie((cookie_price + num), '', { expires: -1 });
        $.cookie((cookie_imgStr + num), '', { expires: -1 });
        $.cookie((cookie_pid + num), '', { expires: -1 });
    }

    //显示加入的对比
    function showDb(num) {
        //$((boxKId + num)).show(); 
        if (null != ($.cookie(cookie_pz + num))) {
            $((boxCid + num)).children("div:eq(1)").children("a").html($.cookie(cookie_pz + num));  //设置标题和品质
            $((boxCid + num)).show();
            $((boxKId + num)).hide(); //隐藏现有空位
        }
        if (null != ($.cookie(cookie_aHref + num))) {
            $((boxCid + num)).children("div:eq(1)").children("a").attr("href", $.cookie(cookie_aHref + num));  //设置链接地址
        }
        if (null != ($.cookie(cookie_price + num))) {
            $((boxCid + num)).children("div:eq(1)").children("div").children("span").html($.cookie(cookie_price + num));  //设置价格
        }
        if (null != ($.cookie(cookie_imgStr + num))) {
            $((boxCid + num)).children("div").children("img").attr("src", $.cookie(cookie_imgStr + num));  //设置图片路径
        }
    }

    //清除对比栏显示项目
    function delDb(divName) {
        var docDiv = $(divName).closest("li");  //获取外层div
        var divOne = docDiv.children("div");

        var delId = $(divOne).children("div:eq(1)").children("a").attr("href");  //

        //青旅特色、国内、出境、北京、周边
        $("a[biaozhi]").each(function () {
            if (delId == $(this).closest("dt").children("a").attr("href")) { //加入对比的路线
                $(this).removeClass("Quxiao");
            }
        });

        $(divOne).css({"display": "none" }); //隐藏
        docDiv.children("div:eq(1)").css({ "display": "block" });  //显示
        $(divOne).children("div").children("img").attr("src", ""); //图片
        $(divOne).children("div:eq(1)").children("a").html("");  //标题和品质
        $(divOne).children("div:eq(1)").children("a").attr("href", "");  //链接地址
        $(divOne).children("div:eq(1)").children("div").children("span").html(""); //价格；
    }

    $("#duibibtn").click(function () {
        BtnDuiBi();
    });

});


var DuiBiCount = 4;
function SetCookieOfPro(id, title, picture, price) {
    var stringCookie = getCookieDuiBi('awtripduibi');
    var stringduibi = "" != stringCookie ? stringCookie : "{awtripduibi:[]}";
    var json = new JSONHistory(stringduibi);  //转成json
    var list = json['awtripduibi'];  //获得json
    for (var i = 0; i < list.length; i++) {
        try {
            if (list[i].id == id) {
                list.splice(i, 1); //删除重复数据，开始位置,删除个数
                i = i - 1; //下标归位
            }
        } catch (e) {
            break;
        }
    }

    if (list.length >= DuiBiCount) {
        //删除最开始的多余记录
        var count = list.length - DuiBiCount + 1; //需要删除的个数
        list.splice(0, count); //开始位置,删除个数
    }

    var e = "{id:'" + id + "',title:'" + title + "',price:'" + price + "',picture:'" + picture + "'}";
    json['awtripduibi'].push(e);//添加一个新的记录
    setCookieDuiBi('awtripduibi', json.toString(), 1);
}
function getCookieOfPro() {
    var historyJSON = getCookie('awtripduibi');
    if (historyJSON == "") {
    } else {
        var data = eval("(" + historyJSON + ")");
        var history = data['awtripduibi'];
        var length = history.length;
        if (length > DuiBiCount) {
            length = DuiBiCount;
        }
        //从最后一个浏览记录开始获取  

        var historyHtml = "";
        for (var i = length - 1; i >= 0; i--) {
            historyHtml += "<li><div class=\"boxCon\"><div class=\"boxCon_Img\"><img src=\"http://img.awtrip.com/" + history[i].picture + "\" alt=\"\"></div><div class=\"boxCon_cent\"><a class=\"boxCon_name\" href=\"/s/Line/" + history[i].id + ".html\" target=\"_blank\" title=\"" + history[i].title + "\">" + history[i].title + "</a><div class=\"boxCon_cn\"><span class=\"boxCon_Price\">￥" + history[i].price + "起</span><a class=\"boxConcn_Right\"></a></div></div></div></li>";
        }
        if (length < 4) {
            for (var j = length + 1; j <= 4; j++) {
                historyHtml += "<li><div class=\"boxKong\"><div class=\"boxKong_Left\">" + j + "</div><div class=\"boxKong_Right\">您还可以继续添加</div></div></li>";
            }
        }
        if (historyHtml != "") {
            $("#ulDuiBi").html(historyHtml);
            delOne();
        }
    }
}

function BtnDuiBi() {
    var historyJSON = getCookie('awtripduibi');
    if (historyJSON == "") {
    } else {
        var data = eval("(" + historyJSON + ")");
        var history = data['awtripduibi'];
        var length = history.length;
        if (length > DuiBiCount) {
            length = DuiBiCount;
        }
        var strUrl = "";
        for (var i = length - 1; i >= 0; i--) {
            strUrl += history[i].id + ",";
        }
        window.location.href = "/Line/Compare?ids=" + strUrl;

    }
}

function delOne() {
    $(".boxConcn_Right").each(function (index) {
        $(this).click(function () {
            $(this).parents("li").html("<div class=\"boxKong\"><div class=\"boxKong_Left\">" + (index + 1) + "</div><div class=\"boxKong_Right\">您还可以继续添加</div></div></li>");
        });
    });
}

function setCookieDuiBi(cookName, cookValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays * 60 * 1000);
    var cookieVal = cookName + "=" + escape(cookValue) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
    document.cookie = cookieVal;
}



function getCookieDuiBi(cookName) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(cookName + "=");
        if (c_start != -1) { //存在  
            c_start = c_start + cookName.length + 1; //"history="后的开始位置  
            var c_end = document.cookie.indexOf(";", c_start); //找到JSESSIONID在的位置  
            if (c_end == -1) { //JSESSIONID不存在  
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function delCookieDuiBi(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookieDuiBi(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
}

/** 
 * JSON 
 */
var JSONHistory = function (sJSON) {
    this.objType = (typeof sJSON);
    if (this.objType == 'string' && '' == sJSON) {
        sJSON = '{awtripduibi:[]}';
    }
    this.self = [];
    (function (s, o) {
        for (var i in o) {
            o.hasOwnProperty(i) && (s[i] = o[i], s.self[i] = o[i])
        };
    })(this, (this.objType == 'string') ? eval('0,' + sJSON) : sJSON);
};
JSONHistory.prototype = {
    toString: function () {
        return this.getString();
    },
    valueOf: function () {
        return this.getString();
    },
    getString: function () {
        var sA = [];
        (function (o) {
            var oo = null;
            sA.push('{');
            for (var i in o) {
                if (o.hasOwnProperty(i) && i != 'prototype') {
                    oo = o[i];
                    if (oo instanceof Array) {
                        sA.push(i + ':[');
                        for (var b in oo) {
                            if (oo.hasOwnProperty(b) && b != 'prototype') {
                                sA.push(oo[b] + ',');
                                if (typeof oo[b] == 'object') arguments.callee(oo[b]);
                            }
                        }
                        sA.push('],');
                        continue;
                    } else {
                        sA.push(i + ':\'' + oo + '\',');
                    }
                    if (typeof oo == 'object') arguments.callee(oo);
                }
            }
            sA.push('},');
        })(this.self);
        return sA.slice(0).join('').replace(/\[object object\],/ig, '').replace(/,\}/g, '}').replace(/,\]/g, ']').slice(0, -1);
    },
    push: function (sName, sValue) {
        this.self[sName] = sValue;
        this[sName] = sValue;
    }
};


