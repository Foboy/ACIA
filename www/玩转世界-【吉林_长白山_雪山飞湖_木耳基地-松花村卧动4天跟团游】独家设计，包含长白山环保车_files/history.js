/** 
 * 线路详细中的js,最近浏览线路记录
 * @version: 1.0 
 * @author: lzy 
 */
$(function () {
    getHistory();
});

var PATH = "www.awtrip.com";
var historyCount = 5; //保存历史记录个数  

/** 
 * 增加浏览历史记录 
 * @param id 编号 
 * @param title 线路标题 
 * @param price 价格信息 
 * @return 
 */
function setHistory(id, title, price) {
    var stringCookie = getCookie('awtriphistory');
    var stringHistory = "" != stringCookie ? stringCookie : "{awtriphistory:[]}";
    var json = new JSONHistory(stringHistory);  //转成json  
    var list = json['awtriphistory'];  //获得json  
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

    if (list.length >= historyCount) {
        //删除最开始的多余记录  
        var count = list.length - historyCount + 1; //需要删除的个数  
        list.splice(0, count); //开始位置,删除个数  
    }

    var e = "{id:'" + id + "',title:'" + title + "',price:'" + price + "'}";
    json['awtriphistory'].push(e);//添加一个新的记录  
    setCookie('awtriphistory', json.toString(), 30); //365天  
}



/** 
 * 获得浏览历史记录 
 * @return 
 */
function getHistory() {
    var historyJSON = getCookie('awtriphistory');
    if (historyJSON == "") {
    } else {
        var data = eval("(" + historyJSON + ")");
        var history = data['awtriphistory']; //历史记录  
        var length = history.length;
        if (length > historyCount) {
            length = historyCount;
        }
        //从最后一个浏览记录开始获取  

        var historyHtml = '<div class="slider_title">' +
           '<span>浏览记录</span></div>';
        for (var i = length - 1; i >= 0; i--) {
            historyHtml += "<ul class=\"slider_cont slider_record\" id=\"slider_record\"><li><a class=\"slider_record_name\" href=\"/s/Line/" + history[i].id + ".html\" target=\"_blank\" title=\"" + history[i].title + "\">" + history[i].title + "</a><h4><span>￥<b>" + history[i].price + "</b>起</span></h4></li></ul>";
        }
        if (historyHtml != "") {
            $("#browsehistory").html(historyHtml);
        }
    }
}

/** 
 * 添加cookie 
 * @param cookName cookie名称 
 * @param cookName cookie值 
 * @param expiredays 时长 
 */
function setCookie(cookName, cookValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays * 24 * 3600 * 1000);
    var cookieVal = cookName + "=" + escape(cookValue) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
    document.cookie = cookieVal;
}


/** 
 * 获取cookie 
 * @param cookName cookie名称 
 * @return 
 */
function getCookie(cookName) {
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


/** 
 * JSON 
 */
var JSONHistory = function (sJSON) {
    this.objType = (typeof sJSON);
    if (this.objType == 'string' && '' == sJSON) {
        sJSON = '{history:[]}';
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