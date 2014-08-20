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

    $("#box").hide();  //Ĭ������

    $(".duibiLan").toggle(function () {  //�Ҳ�򿪶ԱȲ�
            $("#box").show();
		},function(){
			$("#box").hide();
    });

    $(".right").click(function () {   //���ضԱȲ�
        $("#box").hide();
    });

    //����Ա�
    $("a[biaozhi]").click(function () {  //�Աȵ���¼�
        $("#box").show();
        for (var k = 1; k < 5; k++) {
            if (null == $.cookie((cookie_pz + k))) {
                if (!$(this).hasClass("Jiaru") && !$(this).hasClass("Quxiao")) {
                    if ($((boxKId + k)).css("display") == "block") {  //���п��Լ���Ŀ�λ��
                        $((boxKId + k)).hide(); //�������п�λ 
                        $(this).addClass("Quxiao");  //�޸���ʽ
                        var docDiv = $(this).closest("dl").children("dd").children("div");  //��ȡ���div
                        var pz = $.trim(docDiv.children("h3").children("a").text());  //Ʒ��+����
                        if (pz.length > 16) { pz = pz.substr(0, 16); }
                        var aHref = docDiv.children("h3").children("a").attr("href");  //���ӵ�ַ
                        var imgSrc = docDiv.children("div").children("#hdPicSrc").val();  //ͼƬ·��
                        var priceStr = docDiv.children("div").children("#hdPrice").val();  //�۸�
                        var pid = docDiv.children("div").children("#hdPid").val();  //�۸�
                        /* ����Ա�-cookie */
                        $.cookie((cookie_pz + k), pz);
                        $.cookie((cookie_aHref + k), aHref);
                        $.cookie((cookie_price + k), "&#xFFE5;" + priceStr + "&#x8D77;");
                        $.cookie((cookie_imgStr + k), imgSrc);
                        $.cookie((cookie_pid + k), pid);
                        /* ����-cookie */

                        showDb(k);
                        break;
                    }
                } else if ($(this).hasClass("Quxiao")) {
                    $(this).removeClass("Quxiao");  //�޸���ʽ
                    var xxx = $(this).closest("dt").children("a").children("img").attr("src");
                    for (var j = 1; j < 5; j++) {
                        if (null != $.cookie((cookie_imgStr + j)) && ('undefined' != $.cookie((cookie_imgStr + j)))) {
                            if ($.cookie((cookie_imgStr + j)) == xxx) {
                                $(boxCid + j).css({ "display": "none" }); //����
                                $(boxKId + j).css({ "display": "block" });  //��ʾ
                                delCookie(j);  //ɾ��cookie\
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

    //ɾ���Ա�
    $(".boxConcn_Right").click(function () {

        //ɾ����ǰ�����·��
        delDb($(this));

        //ɾ��cookie
        var cNum = $(this).parent("div").parent("div").parent("div").attr("id").replace(/boxConId/, '');
        delCookie(cNum);
    });

    //��ʾ�Ա����¼�
    $(".duibiLan").click(function () {
        getCookieOfPro();
        $("#box").show();
        //for (var i = 1; i < 5; i++) {
        //    showDb(i);
        //}
    });

    //��նԱ���
    $(".qingkong").click(function () {

        var historyHtml = "";

        for (var j = 1; j <= 4; j++) {
            historyHtml += "<li><div class=\"boxKong\"><div class=\"boxKong_Left\">" + j + "</div><div class=\"boxKong_Right\">�������Լ������</div></div></li>";
        }
        if (historyHtml != "") {
            $("#ulDuiBi").html(historyHtml);
        }
        delCookieDuiBi("awtripduibi");
    });

    //���cookie
    function delCookie(num) {
        $.cookie((cookie_pz + num), '', { expires: -1 });
        $.cookie((cookie_aHref + num), '', { expires: -1 });
        $.cookie((cookie_price + num), '', { expires: -1 });
        $.cookie((cookie_imgStr + num), '', { expires: -1 });
        $.cookie((cookie_pid + num), '', { expires: -1 });
    }

    //��ʾ����ĶԱ�
    function showDb(num) {
        //$((boxKId + num)).show(); 
        if (null != ($.cookie(cookie_pz + num))) {
            $((boxCid + num)).children("div:eq(1)").children("a").html($.cookie(cookie_pz + num));  //���ñ����Ʒ��
            $((boxCid + num)).show();
            $((boxKId + num)).hide(); //�������п�λ
        }
        if (null != ($.cookie(cookie_aHref + num))) {
            $((boxCid + num)).children("div:eq(1)").children("a").attr("href", $.cookie(cookie_aHref + num));  //�������ӵ�ַ
        }
        if (null != ($.cookie(cookie_price + num))) {
            $((boxCid + num)).children("div:eq(1)").children("div").children("span").html($.cookie(cookie_price + num));  //���ü۸�
        }
        if (null != ($.cookie(cookie_imgStr + num))) {
            $((boxCid + num)).children("div").children("img").attr("src", $.cookie(cookie_imgStr + num));  //����ͼƬ·��
        }
    }

    //����Ա�����ʾ��Ŀ
    function delDb(divName) {
        var docDiv = $(divName).closest("li");  //��ȡ���div
        var divOne = docDiv.children("div");

        var delId = $(divOne).children("div:eq(1)").children("a").attr("href");  //

        //������ɫ�����ڡ��������������ܱ�
        $("a[biaozhi]").each(function () {
            if (delId == $(this).closest("dt").children("a").attr("href")) { //����Աȵ�·��
                $(this).removeClass("Quxiao");
            }
        });

        $(divOne).css({"display": "none" }); //����
        docDiv.children("div:eq(1)").css({ "display": "block" });  //��ʾ
        $(divOne).children("div").children("img").attr("src", ""); //ͼƬ
        $(divOne).children("div:eq(1)").children("a").html("");  //�����Ʒ��
        $(divOne).children("div:eq(1)").children("a").attr("href", "");  //���ӵ�ַ
        $(divOne).children("div:eq(1)").children("div").children("span").html(""); //�۸�
    }

    $("#duibibtn").click(function () {
        BtnDuiBi();
    });

});


var DuiBiCount = 4;
function SetCookieOfPro(id, title, picture, price) {
    var stringCookie = getCookieDuiBi('awtripduibi');
    var stringduibi = "" != stringCookie ? stringCookie : "{awtripduibi:[]}";
    var json = new JSONHistory(stringduibi);  //ת��json
    var list = json['awtripduibi'];  //���json
    for (var i = 0; i < list.length; i++) {
        try {
            if (list[i].id == id) {
                list.splice(i, 1); //ɾ���ظ����ݣ���ʼλ��,ɾ������
                i = i - 1; //�±��λ
            }
        } catch (e) {
            break;
        }
    }

    if (list.length >= DuiBiCount) {
        //ɾ���ʼ�Ķ����¼
        var count = list.length - DuiBiCount + 1; //��Ҫɾ���ĸ���
        list.splice(0, count); //��ʼλ��,ɾ������
    }

    var e = "{id:'" + id + "',title:'" + title + "',price:'" + price + "',picture:'" + picture + "'}";
    json['awtripduibi'].push(e);//���һ���µļ�¼
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
        //�����һ�������¼��ʼ��ȡ  

        var historyHtml = "";
        for (var i = length - 1; i >= 0; i--) {
            historyHtml += "<li><div class=\"boxCon\"><div class=\"boxCon_Img\"><img src=\"http://img.awtrip.com/" + history[i].picture + "\" alt=\"\"></div><div class=\"boxCon_cent\"><a class=\"boxCon_name\" href=\"/s/Line/" + history[i].id + ".html\" target=\"_blank\" title=\"" + history[i].title + "\">" + history[i].title + "</a><div class=\"boxCon_cn\"><span class=\"boxCon_Price\">��" + history[i].price + "��</span><a class=\"boxConcn_Right\"></a></div></div></div></li>";
        }
        if (length < 4) {
            for (var j = length + 1; j <= 4; j++) {
                historyHtml += "<li><div class=\"boxKong\"><div class=\"boxKong_Left\">" + j + "</div><div class=\"boxKong_Right\">�������Լ������</div></div></li>";
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
            $(this).parents("li").html("<div class=\"boxKong\"><div class=\"boxKong_Left\">" + (index + 1) + "</div><div class=\"boxKong_Right\">�������Լ������</div></div></li>");
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
        if (c_start != -1) { //����  
            c_start = c_start + cookName.length + 1; //"history="��Ŀ�ʼλ��  
            var c_end = document.cookie.indexOf(";", c_start); //�ҵ�JSESSIONID�ڵ�λ��  
            if (c_end == -1) { //JSESSIONID������  
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


