function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return r[2]; return null; //返回参数值
}

/**
 *  来源统计,以及处理首页底部友情链接
 */
function visitSource() {
    $.get("/controllers/flowhandler.ashx?rnd=" + Math.random() + "&ftid=" + getUrlParam("ftid"));

    if (new RegExp(/[a-zA-Z:/\.]+?awtrip\.com\/?$/i).test(window.location.href)) {
        $("#divlink").css("display", "block");
    } else { $("#divlink").css("display", "none"); }
}

/**
*  图片加载失败时触发
*/
function bindImgError() {
    $("img").error(function () {
        var $this = $(this);
        var $that = $this;

        var flag = $this.data("flag");
        var cache = $this.data("cache");

        var imgServer = globalImgserver;
        var url = imgServer + "RequestHandler.ashx";

        var imgID = $this.attr("src") || $this.data("original");
        var reg = new RegExp("(http://)?.+?/(.+)");
        var tmpImgID = imgID.replace(reg, "$2");
        //console.log(tmpImgID);
        var params = { imgID: tmpImgID, c: cache, f: flag };
        //$.get(url, params, function (imgName) {
        //    var url = imgServer + imgName;
        //    $that.attr("src", url);
        //    console.log("Get Reply From ImageServer.")
        //});
        $.ajax({
            url: url,
            data: params,
            dataType: 'text',
            type: 'get',
            async: false,
            crossDomain: true,
            success: function (imgName) {
                var url = imgServer + imgName;
                $that.attr("src", url);
                //console.log("Get Reply From ImageServer.")
            },
            error: function (xhr, textStatus, errorThrown) {
                //console.log(textStatus + errorThrown);
            },
            complete: function () {
                //console.log("imager server ajax complete.");
            }
        });

        $this.error = null;
        return true;
    });
}

function common() {
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

    $("#sina").hover(function () {
        $("#EWM").show();
        $(this).find("img").eq(0).animate({ "margin-top": "-50" }, 500);
    }, function () {
        $("#EWM").hide();
        $(this).find("img").eq(0).animate({ "margin-top": "0" }, 500);
    });
}

function searchFunc() {
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
}

$(function () {
    bindImgError();     //图片加载失败时的处理
    visitSource();      //来源统计
    common();
    searchFunc();
});