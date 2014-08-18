// JavaScript Documen


//不限全部处于选中状态时，结果栏消失
(function ($) {
    $.fn.checkstart = function () {
        var obj = this,
		start = false;

        obj.click(function () {
            //console.log(obj)
            start = true;
            obj.each(function () {
                if (!$(this).is('.current')) return start = false;
            })

            if (!start) {
                $('#total_result').show()
            } else {
                $('#total_result').hide()
            }
        })
    }
})(jQuery)



$(function () {

    //按需求排序查询
    $(".groupBuyingl .sort_title li").each(function () {
        var $this = $(this);
        $this.click(function () {
            if ($this.index() == 0) {
                $this.addClass("current0").siblings().removeClass("current");
            } else {
                $this.addClass("current").siblings().removeClass("current").eq(0).removeClass("current0");
            }
        })
    })

    $(".sort_con").each(function () {
        $(this).find("li:eq(2)").css("margin-right", "0px");
        $(this).find("li:eq(5)").css("margin-right", "0px");
        $(this).find("li:eq(8)").css("margin-right", "0px");
        $(this).find("li:eq(11)").css("margin-right", "0px");
        $(this).find("li:eq(14)").css("margin-right", "0px");
        $(this).find("li:eq(17)").css("margin-right", "0px");
    });

    //标题全部显示
    $(".sort_con ul li").each(function () {
        var $this = $(this);
        var pic_box = $(".pic_box", $this);
        var title = $(".title", $this);
        var titleH = title.outerHeight();
        var pic_boxH = pic_box.outerHeight();
        var pic_textTop = pic_boxH - titleH;
        $this.hover(
			function () {
			    $this.addClass("current");
			    title.animate({ top: pic_textTop }, 200);
			},
			function () {
			    $this.removeClass("current");
			    title.animate({ top: 157 }, 200);
			}
		)
    });

    $(".groupBuying_box").each(function () {
        $(this).find("li:last").css("border-bottom", "0px");
    });
    /*条件筛选*/
    for (var i = 0; i < ($(".total_item").length) / 2; i++) {
        $(".total_result").find("ul").append("<li class='choose'></li>");
    }


    $(".total_con").each(function () {
        $(this).find(".total_item0:last").css("border-bottom", "0px");
        $(this).find(".total_item_current:last").css("border-bottom", "0px");
    });

    //高度不大于32的，不显示后边的更多
    $(".total_con .total_item_con ul").each(function (index) {
        var $this = $(this);
        var item_con = $(".item_con:eq(" + index + ")");
        var item_conH = item_con.height();
        if (item_conH > 32) {
            $this.closest(".total_item").find("a.more").show();
            $this.closest(".total_item").find(".item_con").css({ "height": "32px", "overflow": "hidden" });
        }
    })

    //点击更多,再点击收起
    $(".total_con").find("a.more").toggle(function () {
        $(this).addClass("current").html("收起").append("<span></span>");
        $(this).closest(".total_item").css({ "height": "auto", "overflow": "auto" }).find("ul").css({ "height": "auto", "overflow": "auto" });
    }, function () {
        $(this).removeClass("current").html("更多").append("<span></span>");
        $(this).closest(".total_item").css({ "height": "32px", "overflow": "hidden" }).find("ul").css({ "height": "32px", "overflow": "hidden" });
    })


    //多选状态下，点击li，勾选前边的对钩
    $(".total_item_current li").toggle(function () {
        $(this).addClass("checked").find("a").css({ "color": "#ff9913" }).end().find("span").css({ "color": "#ff9913" });
        $(this).closest(".total_item_con").find("b").removeClass("current");
    }, function () {
        $(this).removeClass("checked").find("a").css({ "color": "#666" }).end().find("span").css({ "color": "#999" });
    });

    //点击右侧多选按钮
    $(".total_con").find("a.mutiply").each(function () {
        $(this).click(function () {
            var index = $(this).closest(".total_item").index();
         
            //$(".total_item0").show();
            //$(".total_item_current").hide();
            $(".total_item").eq(index).hide().next().show();
            $(".total_item").eq(index).next().css({ "height": "auto", "overflow": "auto" }).find("ul").css({ "height": "auto", "overflow": "auto" }).end().siblings().css({ "height": "32px", "overflow": "hidden" }).find("ul").css({ "height": "32px", "overflow": "hidden" });
        });
    });
    //点击多选后，按取消按钮
    $(".item_btn").each(function () {
        $(this).find("a.quit").click(function () {
            $(".total_item0").show();
            $(".total_item_current").hide();
            $(this).closest(".total_item").prev().find("a.more").removeClass("current").html("更多").append("<span></span>");
            $(this).closest(".total_item").css({ "height": "auto", "overflow": "auto" }).find("ul").css({ "height": "auto", "overflow": "auto" }).end().siblings().css({ "height": "32px", "overflow": "hidden" }).find("ul").css({ "height": "32px", "overflow": "hidden" });
            $(this).closest(".total_item").find("ul a").css({ "color": "#666" }).end().find("ul span").css({ "color": "#999" });
            $(this).closest(".total_item").find("li").removeClass("checked");
        })
    })

    //单选时，筛选条件


    $(".total_item0 li").each(function () {
        $(this).click(function () {
            $("#total_result").show();
            var index = $(this).closest(".total_item").index() / 2;
            $(".total_item").eq(index + 1).find("li").removeClass("checked").find("a").css({ "color": "#666" }).end().find("span").css({ "color": "#999" });
            $(this).parent().find("a").css({ "color": "#666" }).end().find("span").css({ "color": "#999" });
            $(this).find("a").css({ "color": "#ff9913" }).find("span").css({ "color": "#ff9913" }).closest(".total_item").find("b").removeClass("current").end().next().find("b").removeClass("current");
            var a = $(this).find("a").text();
            $("#total_result").find("li").eq(index).html("<a href='javascript:;'>" + a + "</a>");

        })
    });



    //点击多选，实现多条件筛选
    $(".item_btn").each(function () {
        $(this).find("a.ok").click(function () {
            var index = ($(this).closest(".total_item").index() - 1) / 2;
            var str = new Array();//存选中值;
            var hasCheckedLi = $(this).closest(".total_item_con").find("li");

            hasCheckedLi.filter(".checked").each(function () {
                //console.log($(this).index());
                //$('.item_con li').eq($(this).index()).find("a").css({"color":"#ff9913"}).end().find("span").css({"color":"#ff9913"});

                $(this).find("a").css({ "color": "#ff9913" }).find("span").css({ "color": "#ff9913" }).closest(".total_item_con").find("b").removeClass("current");
                var c = $(this).text().substring(0, $(this).text().indexOf("（"));
                str.push(c);
            })

            if (str != "") {
                $("#total_result").show();
                $("#total_result").find("li").eq(index).html("<a href='javascript:;'>" + str + "</a>");
                $(this).closest(".total_item").prev().find("b").removeClass("current");
                if (index == 0) {
                    var url = window.location.href.toString();

                    url = replacePara(url, "jq", encodeURI(str));
                    window.location.href = url;
                }
                else if (index == 1) {
                    var url = window.location.href.toString();
                    
                    url = replacePara(url, "ts", str);
                    var reg = new RegExp("日", "g"); //创建正则RegExp对象  
                    url = url.replace(reg, "");
                    reg = new RegExp("大于10", "g");
                    url = url.replace(reg, "10-");
                    window.location.href = url;
                  
                }
                else if (index == 2) {
                    var url = window.location.href.toString();
                    url = replacePara(url, "jt", encodeURI(str));
                    window.location.href = url;
                }
                else if (index == 3) {
                    var url = window.location.href.toString();
                    url = replacePara(url, "pz", encodeURI(str));
                    window.location.href = url;
                }
                else if (index == 4) {
                    var url = window.location.href.toString();
                    url = replacePara(url, "jjr", encodeURI(str));
                    window.location.href = url;
                }
                else if (index == 5) {
                    var url = window.location.href.toString();
                    url = replacePara(url, "xj", str);
                    var reg = new RegExp("星级", "g"); //创建正则RegExp对象  
                    url = url.replace(reg, "");
                    window.location.href = url;
                }
                else if (index == 6) {
                    var url = window.location.href.toString();
                    url = replacePara(url, "zt", encodeURI(str));
                    window.location.href = url;
                } 
            }
            $(this).closest(".total_item").hide().prev().show();
            $(this).closest(".total_item").css({ "height": "auto", "overflow": "auto" }).find("ul").css({ "height": "auto", "overflow": "auto" }).end().siblings().css({ "height": "32px", "overflow": "hidden" }).find("ul").css({ "height": "32px", "overflow": "hidden" });
        });
    })




    //筛选条件去除（单选多选适用）
    $("#total_result a").live("click", function () {
        var textTypeIndex = $(this).parent().index();

        var index = textTypeIndex;
        var total_result = $("#total_result").find("li").html();
        $(".total_item").eq(index * 2).find("ul a").css({ "color": "#666" }).end().find("ul span").css({ "color": "#999" }).end().find("b").addClass("current");
        $(this).remove();

        //如果无任何筛选条件，则隐藏total_result
        for (var i = 0; i < $("#total_result").find("li").length; i++) {
            if (($("#total_result").find("li")).html() == "") {
                $("#total_result").hide();
            }
        }
        if (index == 0) {
            var url = window.location.href.toString();

            url = replacePara(url, "jq", "");
            window.location.href = url;
        }
        else if (index == 1) {
            var url = window.location.href.toString();
            url = replacePara(url, "ts", "");
            window.location.href = url;
        }
        else if (index == 2) {
            var url = window.location.href.toString();
            url = replacePara(url, "jt", "");
            window.location.href = url;
        }
        else if (index == 3) {
            var url = window.location.href.toString();
            url = replacePara(url, "pz", "");
            window.location.href = url;
        }
        else if (index == 4) {
            var url = window.location.href.toString();
            url = replacePara(url, "jjr", "");
            window.location.href = url;
        }
        else if (index == 5) {
            var url = window.location.href.toString();
            url = replacePara(url, "xj", "");
            window.location.href = url;
        }
        else if (index == 6) {
            var url = window.location.href.toString();
            url = replacePara(url, "zt", "");
            window.location.href = url;
        }
    });


    //点击不限，触发事件
    $(".total_item").each(function () {
        $(this).find("b").click(function () {
            var textTypeIndex = $(this).closest(".total_item").index() / 2;
            var index = textTypeIndex;
            if (index % 2 == 0) {
                $(this).addClass("current").closest(".total_item").next().find("b").addClass("current");
                $(this).closest(".total_item").next().find("li").removeClass("checked").end().find("ul a").css({ "color": "#666" }).end().find("ul span").css({ "color": "#999" });
            } else {
                $(this).addClass("current").closest(".total_item").prev().find("b").addClass("current");
                $(this).closest(".total_item").find("li").removeClass("checked").end().find("ul a").css({ "color": "#666" }).end().find("ul span").css({ "color": "#999" });
            }
            $("#total_result").find("li").eq(index).html("");
        })
    })


    //当所有不限，都处于选中状态时，筛选结果消失
    $('.total_item b:visible').checkstart();
    $('.total_item b:hidden').checkstart();

    //清空所有条件 
    $(".eliminateCriteria").live("click", function () {
        $("#total_result").find("li").html("");
        $("#total_result").hide();
        $(".total_item_current").find("li").removeClass("checked");
        $(".total_item").find("b").addClass("current");
        $(".item_con").find("a").css({ "color": "#666" }).end().find("span").css({ "color": "#999" });
        closeAll();
    });

    function closeAll() {
        var b = location.href.substr(0, location.href.indexOf('?'));
        if (b.indexOf('#top') > 0) {
            window.location.href = b;
        }
        else {
            window.location.href = b + "#top";
        }
    }

    
    if (getUrlParam('jq') != null && getUrlParam('jq') + "" != "") {
        $("#total_result").show();
        $("#total_result").find("li").eq(0).html("<a href='javascript:;'>" + decodeURI(getUrlParam('jq')) + "</a>");
    }
    if (getUrlParam('ts') != null && getUrlParam('ts') + "" != "") {
        $("#total_result").show();
        var ts = getUrlParam('ts');
        var reg = new RegExp(",", "g"); //创建正则RegExp对象  
        if (ts.indexOf(",") >= 0) {
            ts = ts.replace(reg, "日,");
        }
        else { ts = ts + "日";}
       
        reg = new RegExp("10-", "g");
        ts = ts.replace(reg, "大于10日");
        $("#total_result").find("li").eq(1).html("<a href='javascript:;'>" + ts + "</a>");
    }
    if (getUrlParam('jt') != null && getUrlParam('jt') + "" != "") {
        $("#total_result").show();
        $("#total_result").find("li").eq(2).html("<a href='javascript:;'>" + decodeURI(getUrlParam('jt')) + "</a>");
    }
    if (getUrlParam('pz') != null && getUrlParam('pz') + "" != "") {
        $("#total_result").show();
        $("#total_result").find("li").eq(3).html("<a href='javascript:;'>" + decodeURI(getUrlParam('pz')) + "</a>");
    }
    if (getUrlParam('jjr') != null && getUrlParam('jjr') + "" != "") {
        $("#total_result").show();
        $("#total_result").find("li").eq(4).html("<a href='javascript:;'>" + decodeURI(getUrlParam('jjr')) + "</a>");
    }
    if (getUrlParam('xj') != null && getUrlParam('xj') + "" != "") {
        $("#total_result").show();
        var xj = getUrlParam('xj');
        var reg = new RegExp(",", "g"); //创建正则RegExp对象  
        xj = xj.replace(reg, "星级,");
        $("#total_result").find("li").eq(5).html("<a href='javascript:;'>" + xj + "星级</a>");
    }
    if (getUrlParam('zt') != null && getUrlParam('zt') + "" != "") {
        $("#total_result").show();
        $("#total_result").find("li").eq(6).html("<a href='javascript:;'>" + decodeURI(getUrlParam('zt')) + "</a>");
    }
})












