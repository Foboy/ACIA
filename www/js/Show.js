// JavaScript Document
$(function () {

    //popup_state
    $(".popup_state").each(function () {
        $(this).find("a").click(function () {
            if ($(this).closest(".popup_state").find("div.popup").is(":visible")) {
                $(this).closest(".popup_state").find("div.popup").hide();
            } else {
                $(this).closest(".popup_state").find("div.popup").show();
            }
        })
    });


    //$(".popup_state").each(function () {
    //        var currnav = $(this);
    //	    $(this).find("a").each(function(){
    //	        $(this).toggle(function () {
    //	            $(this).parents("div.popup_state").find("div.popup").show();
    //			},function(){
    //				$(this).parents("div.popup_state").find("div.popup").hide();
    //	        })          
    //		})
    //     });

    //Close click event	
    $(".popup_close").each(function () {
        var currnav = $(this);
        $(this).find("a").each(function () {
            $(this).click(function () {
                $(this).parents("div.popup_state").find("div.popup").css("display", "none");
            })
        })
    });

    //votes
    $('.votes').each(function () {
        var book_num = $(this).find(".book_num").val();
        $(this).find(".jia").click(function () {
            book_num++;
            $(this).closest('.votes').find(".book_num").val(book_num);
        });
        $(this).find(".jian").click(function () {
            if (book_num == 0) {
                $(this).closest('.votes').find(".book_num").val(0);
            } else {
                book_num--;
                $(this).closest('.votes').find(".book_num").val(book_num);
            }
        })
    });


    //tabs event
    $(window).scroll(function () {
        var headerH = $(".header_wrap").height() + $(".breadcrumbs").height()+ $(".lineshow_wrap").height();
        var myDivTop = $("#detailed").position().top;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var myTopSum = headerH + myDivTop;
        if (scrollTop >= myTopSum) {
            $("#tabs").addClass("active");
            $(".detailed_cont").css({ marginTop: "41px" });
        } else {
            $("#tabs").removeClass("active");
            $(".detailed_cont").css({ marginTop: "0px" });
        }
    });



    /*调用页面水平滚动导航*/
    $('#tabs ul').onePageNav({
        currentClass: 'TabDown',
        changeHash: false,
        scrollSpeed: 750
    });

    $("#tabs ul>li").each(function (index) {
        $(this).hover(function () {
            $(this).addClass("TabDown0");
        }, function () {
            $(this).removeClass("TabDown0");
        });
    }).click(function () {							// 点击的时候模拟锚链接
        var href = $(this).find("a").attr("href");
        var pos = $(href).offset().top;				//获取该点到头部的距离
        $("body").animate({ scrollTop: pos }, 800);
    });


    //$("#tabs ul>li a").each(function(index){
    //		$(this).click(function(){
    //			$("#tabs ul>li a").removeClass("TabDown");
    //			$(this).addClass("TabDown");
    //			$(".tabCont:eq("+index+")").show().siblings().hide();
    //		});
    //    });

    //slider_about
    $(".box2 .slider_theme").each(function () {
        $(this).find("a.slider_fenlei:eq(3)").css("margin-right", 0);
        $(this).find("a.slider_fenlei:eq(7)").css("margin-right", 0);
        $(this).find("a.slider_fenlei:eq(11)").css("margin-right", 0);
    });

    //slider_notes
    $("#slider_notes>li:last").css("border-bottom", "none");

    //slider_record
    $("#slider_record>li:last").css("border-bottom", "none");
    $("#slider_record li").each(function () {
        $(this).hover(function () {
            $(this).find("a.slider_contrast").show();
        }, function () {
            $(this).find("a.slider_contrast").hide();
        })
    });

    //information_like event
    $(".lineshow_xgxl>li").each(function () {
        $(this).mousemove(function () {
            $(".lineshow_xgxl>li.border_orange").removeClass("border_orange");
            $(this).addClass("border_orange");
        })
    });

    //Counseling
    var $Counseling = $("#Counseling");
    var CounselingValue = $("#Counseling").attr("value");
    var oldValue = $("#Counseling").val();
    $Counseling.focus(function () {
        var $thisVal = $(this).val();
        if ($thisVal == CounselingValue) {
            $(this).val("").addClass("inputFC");
        }
    });
    $Counseling.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue);
        }
    });

    //Comment_box
    $(".comment_cycle").each(function () {
        $(this).find("dl:last").css("border-bottom", "none");
    });
    $(".comment_nav").each(function () {
        var currnav = $(this);
        $(this).find("li").each(function () {
            $(this).click(function () {
                $(this).addClass("comment_current").siblings().removeClass("comment_current");
                $(this).parents("div.text_box").find("div.comment_cycle").eq($(this).index()).show().siblings().hide();
                $(".text_box h2").show();
                $(".text_box .fanye").show();
                $(".text_box .comment_nav").show();
            });
        });
    });

    //Counseling_box
    $("#Counseling_box>dl:last").css("border-bottom", "none");

    //slider_hothotel
    $("#slider_hothotel>li:last").css("border-bottom", "none");

    //slider_record
    $("#slider_record>li:last").css("border-bottom", "none");

    //slider_information
    $("#slider_information>li:last").css("border-bottom", "none");

    //HotelRoom
    $("#HotelRoom ul li:last").css("border-bottom", "none");

    //Hotel最终页轮播图片
    $("#thumbs li:last").css("margin-right", 0);

    //room_type_popup
    $(".hotel_room ul li").each(function () {
        $(this).find("td.room_type div a").click(function () {
            if ($(this).closest("li").find(".room_type_popup").is(":visible")) {
                $(this).find("em").removeClass("room_close");
                $(this).closest("li").find(".room_type_popup").hide();
            } else {
                $(this).find("em").addClass("room_close");
                $(this).closest("li").find(".room_type_popup").show();
            }
        })
    });

    //room_type_popup Close click event 
    $(".room_close").each(function () {
        $(this).click(function () {
            $(this).closest("li").find(".room_type_popup").hide();
            $(this).closest("li").find(".room_type div a em").removeClass("room_close");
        })
    });

    //comment_box
    $("#Comment dd h4").each(function () {
        $(this).hover(function () {
            $(this).find("a.comment_quit").show();
        }, function () {
            $(this).find("a.comment_quit").hide();
        })
    });

    //Issue
    var $Issue = $("#Issue");
    var IssueValue = $("#Issue").attr("value");
    var oldValue1 = $("#Issue").val();
    $Issue.focus(function () {
        var $thisVal = $(this).val();
        if ($thisVal == IssueValue) {
            $(this).val("").addClass("inputFC");
        }
    });
    $Issue.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue1);
        }
    });

    //slider_scenic
    $("#slider_scenic li:last").css("border-bottom", "none");

    //hotel_price
    $(".hotel_price em.colororange").each(function () {
        $(this).hover(function () {
            $(this).closest(".hotel_price").find(".PriceCeng").show();
        }, function () {
            $(this).closest(".hotel_price").find(".PriceCeng").hide();
        })
    });

    //已收藏
    $(".line_collect_share a.line_collect").each(function () {
        $(this).toggle(function () {
            $(this).addClass("line_collected").html("已收藏");
        }, function () {
            $(this).removeClass("line_collected").html("收藏");
        });
    });
    $(".show_container a.hotel_collect").each(function () {
        $(this).toggle(function () {
            $(this).addClass("hotel_collected").html("已收藏");
        }, function () {
            $(this).removeClass("hotel_collected").html("收藏");
        });
    });

    //quit_pop
    $(".hotel_room ul li td.policy2 a").each(function () {
        $(this).hover(function () {
            $(this).closest(".plicy_quit").find(".quit_pop").css("display", "block");
        }, function () {
            $(this).closest(".plicy_quit").find(".quit_pop").css("display", "none");
        });
    });
});
	
//加入收藏
function bookmark(){
   var title = document.title;
    var url = document.location.href;
    var ua = navigator.userAgent.toLowerCase();
    if(ua.indexOf("msie 8")>-1){
        external.AddToFavoritesBar(url,title,'');//IE8
    }else{
        try{
            window.external.addFavorite(url, title);
        }catch(e) {
            try {
                window.sidebar.addPanel(title, url, "");//firefox
            } catch(e) {
                alert("加入收藏失败，请使用Ctrl+D进行添加");
            };
        };
    };
};

//打印
function doPrint(){
    winname = window.open('', "_blank", '');
    bdhtml = $(".body-wrapper").html();
    sprnstr = "<!--startprint-->";
    eprnstr = "<!--endprint-->";
    winname.document.body.innerHTML = bdhtml;
    winname.print();
}
