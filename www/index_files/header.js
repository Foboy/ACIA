function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return r[2]; return null; //返回参数值
}

/**
 *  来源统计
 */
function visitSource() {
    $.get("/controllers/flowhandler.ashx?rnd=" + Math.random() + "&ftid=" + getUrlParam("ftid"));

    if (new RegExp(/[a-zA-Z:/\.]+?awtrip\.com\/?$/i).test(window.location.href)) {
        $("#divlink").css("display", "block");
    } else { $("#divlink").css("display", "none"); }
}

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            $('#top').fadeIn(800);
        } else {
            $('#top').fadeOut(800);
        }
    });
    $("#top").click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
});
$(function () {
    $("#sina").hover(function () {
        $("#EWM").show();
        $(this).find("img").eq(0).animate({ "margin-top": "-50" }, 500);
    }, function () {
        $("#EWM").hide();
        $(this).find("img").eq(0).animate({ "margin-top": "0" }, 500);
    });
})
$(function () {

    //
    var $Search = $("#Search");
    var SearchValue = $("#Search").attr("value");
    var oldValue = $("#Search").val();
    $Search.focus(function () {
        var $thisVal = $(this).val();
        if ($thisVal == SearchValue) {
            $(this).val("").addClass("inputFC");
        }
    });
    $Search.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue);
        }
    });

    //logo_left   
    $("#city h3 a").each(function (index) {
        $(this).click(function () {
            if ($(this).parents("#city").find("#Switch").is(":visible")) {
                $(".curve").show();
                $(".curent").hide();
                $(this).parents("#city").find("#Switch").hide();
            } else {
                $(".curve").hide();
                $(".curent").show();
                $(this).parents("#city").find("#Switch").show();
            }
        });
    });
    $("#city .hot_city").find("span").each(function () {
        $(this).find("a").click(function () {
            $("#city h3 em").html($(this).html());
            $(".curve").show();
            $(".curent").hide();
            $(this).parents("#city").find("#Switch").hide();
        })
    })





    //Switch Close click event 
    $("#Close").click(function () {
        $("#Switch").hide();
        $(".curent").hide();
        $(".curve").show();
    })

 //nav_register 
    $("#navregister").each(function () {
        $(this).hover(function () {
            $(this).find(".register_pop").show();
            $(".curoent").show();
            $(".curove").hide();
        }, function () {
            $(this).find(".register_pop").hide();
            $(".curoent").hide();
            $(".curove").show();
        })
    });

    //menu
    $(".menu_open li:last>.menu_list").css("border-bottom", "none");

    $(".menu_close li menu_list:last").css("border-bottom", "0");

    //navcn
    $(".nav .navcn").find("li").each(function () {
        $(this).find("a").click(function () {
            $(this).addClass("pitch").parent().siblings().find("a").removeClass("pitch");
        })
    });

    //#header_weixin 
    $("#header_weixin").each(function () {
        $(this).hover(function () {
            $(this).find("img").show();
        }, function () {
            $(this).find("img").hide();
        })
    });

    //navcn_cont
    $(".navcn li").hover(function () {
        $(this).find("ul").show();
    },
	function () {
	    $(this).find("ul").hide();
	});

    bindImgError();     //图片加载失败时触发
    visitSource();      //来源统计
});

/**
 *  图片加载失败时触发
 */
function bindImgError() {
    $("img").error(function () {
        var $this = $(this);
        $this.error = null;

        var flag = $this.data("flag");
        var cache = $this.data("cache");

        var imgServer = "http://img.awtrip.com/";
        var url = imgServer + "RequestHandler.ashx";

        var imgID = $this.attr("src") || $this.data("original");
        var reg = new RegExp("(http://)?.+?/(.+)");
        var tmpImgID = imgID.replace(reg, "$2");

        var params = { imgID: tmpImgID, c: cache, f: flag };
        jQuery.get(url, params, function (data) {
            var url = imgServer + data;
            $this.attr("src", url);
        });

        return true;
    });
}

