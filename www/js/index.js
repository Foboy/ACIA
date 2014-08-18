$(document).ready(function () {

    //menu event
    $(".menu_open>li").hover(function () {
        $(this).addClass("hover");
        $(this).find(".menu_close").show();
        modifyImgMaxWidth(this);

    }, function () {
        $(this).removeClass("hover");
        $(this).find("dd").css({ "max-width": "630px" })
        $(this).find(".menu_close").hide();
    });
    /**
     * 修改首页导航图片位置
     *
     * @param 悬浮左侧导航的li
     *
    */
    var modifyImgMaxWidth = function (that) {
        var $img = $(that).find("img");	// 广告图片

        var $close_link = $(that).find(".close_link");			// 关闭层
        var $close_link_dl = $close_link.find("dl");				// 关闭层中dd
        var $close_link_dt = $close_link.find("dt");				// 关闭层中dt
        var $close_link_dd = $close_link.find("dd");				// 关闭层中dd
        var $menu_close_img = $(that).find(".menu_close_img");  // 广告图片父层

        var imgHeight = $img.height();			// 图片高
        var imgWidth = $img.width(); 			// 图片宽

        var menu_close_imgRight = parseInt($menu_close_img.css("right"));		// 图片定位移动位置 // 负值

        var close_linkHeight = $close_link.height();			// 关闭层高
        var close_linkWidth = $close_link.width();				// 关闭层宽

        var close_linkPaddingLeft = parseInt($close_link.css("padding-left"));	// 关闭层左填充
        var close_linkPaddingBottom = parseInt($close_link.css("padding-bottom"));	// 关闭层左填充
        var close_linkDtWidth = $close_link_dt.width();			// 关闭层中dt宽
        var totalHeight = close_linkPaddingBottom;
        var totalChange = close_linkPaddingBottom;
        var totalElseChange = close_linkPaddingBottom;

        var max_width = close_linkWidth - close_linkPaddingLeft - close_linkDtWidth - imgWidth - menu_close_imgRight; // 计算出dd的最大宽度

        if (close_linkHeight <= 348) {								// 设置了min-height值
            // 此时所有的dd最大宽度都为max_width
            $close_link_dd.css({ "max-width": max_width });	// 修改所有dd的最大宽度			
            if ($close_link.height() > 348) {
                // 计算有多少个dd需要设置最大宽度
                for (var i = $close_link_dl.length - 1 ; i > 0 ; i--) {
                    var close_link_dlHeight = $($close_link_dl[i]).height();
                    totalElseChange += close_link_dlHeight;
                    if (totalElseChange > imgHeight) {	// 修改完高度之后，还得重新计算，因为高度不一样了
                        $($close_link_dl[i - 1]).find("dd").css({ "max-width": "630px" });	// 修改dd的最大宽度						
                    }
                }
            }
        } else {
            // 计算有多少个dd需要设置最大宽度
            for (var i = $close_link_dl.length - 1 ; i > 0 ; i--) {
                var close_link_dlHeight = $($close_link_dl[i]).height();
                totalHeight += close_link_dlHeight;
                if (totalHeight < imgHeight) {
                    $($close_link_dl[i]).find("dd").css({ "max-width": max_width });	// 修改dd的最大宽度						
                }
                var after_change = $($close_link_dl[i]).height();
                totalChange += after_change;
                if (totalChange > imgHeight) {	// 修改完高度之后，还得重新计算，因为高度不一样了
                    $($close_link_dl[i]).find("dd").css({ "max-width": "630px" });	// 修改dd的最大宽度						
                }
            }
        }
    }
});

$(function () {

    init();

    //menu event
    $(".menu_open>li").hover(function () {
        $(this).addClass("hover");
        $(this).find(".menu_close").show();
    }, function () {
        $(this).removeClass("hover");
        $(this).find(".menu_close").hide();
    });



    //group event
    var ShowPre1 = new ShowPre({ box: "banner_index", Pre: "banner_index_pre", Next: "banner_index_next", numIco: "index_numIco", loop: 1, auto: 1 });

    //hotevent event
    $(".hotevent li:last").css("border-bottom", "0");

    //event
    $(".event_cont li:last").css("margin-bottom", "0");
    $(".event_cont li:first").css("margin-top", "13px");

    //.product_list event
    $(".product_list>li").each(function () {
        $(this).mousemove(function () {
            $(".product_list>li.border_orange").removeClass("border_orange");
            $(this).addClass("border_orange");
        })
    });

    //link_nav event
    $(".link_nav").each(function () {
        var currnav = $(this);
        $(this).find("li").each(function () {
            $(this).click(function () {
                $(this).addClass("current").siblings().removeClass("current");
                $(this).parents("div.link").find("div.product>ul").eq($(this).index()).show().siblings().hide();
                $(".product .product_box").show();
                $(window).scroll();
            });
        });
        $(this).find("li:last").find("a").css("border-right", 0);
    });

    //news event
    var ShowPre1 = new ShowPre({ box: "news_index", numIco: "news_numIco", loop: 1, auto: 1 });

    //hotel_nav event
    $("#hotelnav ul li").each(function (index) {
        $(this).mousemove(function () {
            $("#hotelnav ul li.pitch").removeClass("pitch");
            $(this).addClass("pitch");
            $("#hotelcont .hotel_table:eq(" + index + ")").show().siblings().hide();
        })
    });

    //club_shequ event
    $(".club_shequ ul>li").hover(function () {
        $(this).find(".shequ_ceng").show();
        $(this).find(".shequ_ceng_bg").show();
    }, function () {
        $(this).find(".shequ_ceng").hide();
        $(this).find(".shequ_ceng_bg").hide();
    });

    $(".club_shequ ul").find("a.shequ_img").each(function () {
        $(this).hover(function () {
            $(this).closest("li").siblings().find("i").show();
            $(this).closest("ul").siblings().find("i").show();
        }, function () {
            $(this).closest("li").siblings().find("i").hide();
            $(this).closest("ul").siblings().find("i").hide();
        });
    });
    $(".club_shequ ul").find(".shequ_ceng").each(function () {
        $(this).hover(function () {
            $(this).closest("li").siblings().find("i").show();
            $(this).closest("ul").siblings().find("i").show();
        }, function () {
            $(this).closest("li").siblings().find("i").hide();
            $(this).closest("ul").siblings().find("i").hide();
        });
    });



    //hotel_choice js
    var $hotel_choice = $("#hotel_choice");
    var hotel_choiceValue = $("#hotel_choice").attr("value");
    var oldValue_hotel_choice = $("#hotel_choice").val();
    $hotel_choice.focus(function () {
        var $thisVal = $(this).val();
        if ($thisVal == hotel_choiceValue) {
            $(this).val("");
        }
    });
    $hotel_choice.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_hotel_choice);
        }
    });

    var $hotel_choice = $("#hotel_choices");
    var hotel_choiceValue = $("#hotel_choices").attr("value");
    var oldValue_hotel_choice = $("#hotel_choices").val();
    $hotel_choice.focus(function () {
        var $thisVal = $(this).val();
        if ($thisVal == hotel_choiceValue) {
            $(this).val("");
        }
    });
    $hotel_choice.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_hotel_choice);
        }
    });

    /**
　　* 取得Cookie值
　　* @param cookie的key值
　　* @return cookie值
　　*/
    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1)
                    c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    }

    /**
　　 * 设置Cookie值
     * @param 
     *     cookie的key值 value值 保存时间
     *
    */
    function setCookie(c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;";
    }

    /**
　　 * 创建weixin div
     *
    */
    function createWeixinDiv() {
        //<div class="weixin_extend">
        //    <div class="weixin_extend_con">
        //        <img src="~/Content/html/public/images/weixin_extend.png" alt="" usemap="#Map" />
        //        <map name="Map">
        //            <area alt="" class="weixin_extend_close" shape="rect" coords="1119,46,1157,86" href="javascript:;">
        //        </map>
        //    </div>
        //</div>
     
        var extent_div = document.createElement('div');
        var con_div = document.createElement('div');
        var img = document.createElement('img');
        var map = document.createElement('map');
        var area = document.createElement('area');

        extent_div.className = 'weixin_extend';
        extent_div.id = 'weixin_extend';
        con_div.className = 'weixin_extend_con';
        img.src = '/Content/html/public/images/weixin_extend.png';
        img.alt = '';
        img.useMap = '#Map';

        map.id = 'Map';
        map.name = 'Map';

        area.alt = '';
        area.className = 'weixin_extend_close';
        area.shape = 'rect';
        area.coords = '1118,94,1158,131';
        area.href = 'javascript:;';
        area.onclick = function () { weixin_extend_close(); }

        map.appendChild(area);
        con_div.appendChild(img);
        con_div.appendChild(map);
        extent_div.appendChild(con_div);

        $('.main').after(extent_div);


    }

    // 初始化方法 底部客户端下载弹出层
    function init() {
        //username = getCookie('weixin_close');
        //if (username.length > 0) {
        //    return false;
        //} else {
        //    createWeixinDiv();
        //}
    }

    // 点击关闭的触发事件
    function weixin_extend_close() {
        $(".weixin_extend").hide();
        setCookie("weixin_close", "cookie", 1); // 关闭，就保存cookie
    };

    //点赞+1 暂时保留
    ////zan
    //$("a.zan").each(function () {
    //    $(this).toggle(function () {
    //        $(this).addClass("zaned").find("b").html("+1").show().css("top", "8px").animate({ "top": "-42px", opacity: "hide" }, 800);
    //    }, function () {
    //        $(this).removeClass("zaned").find("b").html("-1").show().css("top", "8px").animate({ "top": "-42px", opacity: "hide" }, 800);
    //    });
    //});
})