$(function(){
	
	//left_place
	$(".left_place ul").each(function(){
		$(this).find("li:last").css("border-bottom","none");
	});
	
    //wrap_left
	var left_ul_H = $(".left_place_box .left_ul").height();
	if (left_ul_H <= 663) {
	    $(".left_place_box .more").hide();
	}
	$(".left_place_box .left_ul").css({ "height": "663px", "overflow": "hidden" });
	$(".more a").click(function () {
	    var qt = $(this).parent().find(".qt");
	    var qq = $(this).parent().find(".qq");
	    if (qt.is(":visible")) {
	        qt.hide();
	        qq.show();
	        $(this).text("收起");
	        $(".left_place_box .left_ul").css({ "height": "auto", "overflow": "auto" });
	    } else {
	        qq.hide();
	        qt.show();
	        $(this).text("更多");
	        $(".left_place_box .left_ul").css({ "height": "663px", "overflow": "hidden" });
	    }
	});

	
	//topic
	$(".topic").each(function(){
		$(this).find("li:nth-child(3)").css("margin-right","0px");
		$(this).find("li:nth-child(6)").css("margin-right","0px");
		$(this).find("li:nth-child(9)").css("margin-right","0px");
	});
	
	//scenic
	$(".scenic").each(function(){
		$(this).find("li:last").css("border-bottom","none");
	});
	
	//visa
	$(".visa").each(function(){
		$(this).find("li:nth-child(3)").css("margin-right","0px");
		$(this).find("li:nth-child(6)").css("margin-right","0px");
		$(this).find("li:nth-child(9)").css("margin-right","0px");
		$(this).find("li:nth-child(12)").css("margin-right","0px");
		$(this).find("li:nth-child(15)").css("margin-right","0px");
		$(this).find("li:nth-child(18)").css("margin-right","0px");
		$(this).find("li:nth-child(21)").css("margin-right","0px");
	});
	
	//detail_top
	$(".detail_top").each(function(){
		$(this).find("li:nth-child(4)").css("padding-right","0px");
		$(this).find("li:nth-child(8)").css("padding-right","0px");
	});
	
    //detail_bottom
	$(".detail_bottom").each(function(){
		$(this).find("li:even").css("padding-right","20px");
	});
	
	//public_nav event
	$(".public_nav").each(function () {
        var currnav = $(this);
	    $(this).find("li").each(function(){
	        $(this).click(function () {
	            $(this).addClass("current").siblings().removeClass("current");
	            $(this).parents("div.public").find("div.public_cont>div.public_detail").eq($(this).index()).show().siblings().hide();
	            //$(".product .product_box").show();
	            $(window).scroll();
	    });           
		});
    });
	
	//notes_cont
	$(".notes_cont").each(function(){
		$(this).find("li:odd").css("padding-right","0px");
	});
	
	//self_hot
	$(".self_belt>li").each(function(){
	    $(this).mousemove(function(){
		      $(".self_belt>li.border_orange").removeClass("border_orange");
		      $(this).addClass("border_orange");
		})
    });
	
	//hothotel
	$(".hothotel li:last").css("border-bottom","none");
	
    //self_place
	$(".left_place_box .self_ul:last").css("border-bottom", "none");
	$(".self_more").each(function () {
	    $(this).toggle(function () {
	        $(".self_ul").find("dl").each(function () {
	            $(this).css({ "height": "23px", "overflow": "hidden" });
	        }).end().find(".self_more").each(function () {
	            $(this).html("更多>>");
	        });
	        $(this).closest(".self_ul").find("dl").each(function () {
	            $(this).css({ "height": "auto", "overflow": "auto" });
	        }).end().find(".self_more").each(function () {
	            $(this).html("收起");
	        });
	    }, function () {
	        $(this).closest(".self_ul").find("dl").each(function () {
	            $(this).css({ "height": "23px", "overflow": "hidden" });
	        }).end().find(".self_more").each(function () {
	            $(this).html("更多>>");
	        });
	    });
	});
	 
    //gty_place
	$(".left_place_box .gty_ul:last").css("border-bottom", "none");
	$(".gty_more").each(function () {
	    $(this).toggle(function () {
	        $(".gty_ul").find("dl").each(function () {
	            $(this).css({ "height": "23px", "overflow": "hidden" });
	        }).end().find(".gty_more").each(function () {
	            $(this).html("更多>>");
	        });
	        $(this).closest(".gty_ul").find("dl").each(function () {
	            $(this).css({ "height": "auto", "overflow": "auto" });
	        }).end().find(".gty_more").each(function () {
	            $(this).html("收起");
	        });
	    }, function () {
	        $(this).closest(".gty_ul").find("dl").each(function () {
	            $(this).css({ "height": "23px", "overflow": "hidden" });
	        }).end().find(".gty_more").each(function () {
	            $(this).html("更多>>");
	        });
	    });
	});

    /*
		计算mask位置，和鼠标hover事件
	*/
	function maskHover() {
	    $(".gty_hot_tab .gty_hot_box").each(function (index) {
	        var $this = $(this),
				$gty_hot_text = $this.find('.gty_hot_text'),
				$pic_mask = $this.find('.gty_hot_mask'),
				pic_textH = $gty_hot_text.height(),
				pic_texth1H = $gty_hot_text.find("h1").height(),
				pic_textBottom = -(pic_textH - pic_texth1H),
				pic_boxW = $this.find("img").width();

	        if (pic_textH) {		// 此时其他ul的display为none,height为0
	            $gty_hot_text.css({ "bottom": pic_textBottom });
	            $pic_mask.css({ "width": pic_boxW, "height": pic_textH, "bottom": pic_textBottom });

	            $this.hover(
					function () {
					    $gty_hot_text.animate({ bottom: 0 }, 200);
					    $pic_mask.animate({ bottom: 0 }, 200);
					},
					function () {
					    $gty_hot_text.animate({ bottom: pic_textBottom }, 200);
					    $pic_mask.animate({ bottom: pic_textBottom }, 200);
					}
                )
	        }

	    });
	}

    //gty_hot_nav
    // 鼠标悬浮到每月热门推荐 

	maskHover();		// 初始化的时候，执行一次哦。

	$(".gty_hot_nav li").each(function (index) {

	    $(this).mouseenter(function () {
	        $(".gty_hot_cont .gty_hot_tab:eq(" + (index) + ")").show().siblings().hide();

	        maskHover();		// 必须当display:block的时候，才能再次调用

	        $(this).siblings().find("a").removeClass("gty_hot_qt");
	        $(this).find("a").addClass("gty_hot_qt");
	        $(window).scroll();
	    });

	});

	$("gty_hot_nav").each(function(){
		$(this).find("li").addClass("gty_hot_qt").mousemove(); 
	});
	
	//scenic_place
	$(".left_place_box .scenic_ul:last").css("border-bottom","none");
	$(".Scenic").not($(".Scenic")[0]).each(function () {
	    var h = $(this).height();
		if (h <= 60) {
	        $(this).next().hide();
			
	    }
	    else {
	        $(this).next().show();
	        $(this).addClass("Scenic_Js");
	    }
	});	 	 
	$(".scenic_more").each(function () {
	     $(this).click(function () {
	         var i = $(this).attr("num");
	         if (i == 0) {
	             $(this).prev().removeClass("Scenic_Js");
	             $(this).parents(".scenic_ul").siblings().not($(".scenic_ul")[0]).find(".Scenic").addClass("Scenic_Js");
	             $(".scenic_more").attr("num", "0");
	             $(this).attr("num", "1");
	             $(this).text("收起").parents(".scenic_ul").siblings().not($(".scenic_ul")[0]).find(".scenic_more").text("更多>>");
	         }
	         else {
	             $(this).prev().addClass("Scenic_Js");
	             $(this).attr("num", "0");
	             $(this).text("更多>>");
	         }
	         
	     });
	});
	
	//hotsell
	$(".hotsell").each(function(){
		$(this).find("li:last").css("border-bottom","none");
	});
	
	//evaluate
	$(".evaluate").each(function(){
		$(this).find("li:last").css("border-bottom","none");
	});
	
	//ticket_cont 
	$(".ticket_cont").each(function(){
		$(this).find("li:even").css("margin-right","30px");
	});
	
	//theme_travel_cont
	$(".theme_travel_cont").each(function(){
		$(this).find("li:nth-child(3)").css("padding-right","0px");
		$(this).find("li:nth-child(4)").css("padding-right","20px");
		$(this).find("li:nth-child(5)").css("padding-right","0px");
	});
	
	//Visa_menu
	$("#Visa_menu ul").each(function(){
		$(this).find("li:last").css("border-bottom","none");
	});
	
	//public_visa
	$(".public_visa").each(function(){
		$(this).find("li:nth-child(4)").css("margin-right","0px");
		$(this).find("li:nth-child(8)").css("margin-right","0px");
		$(this).find("li:nth-child(12)").css("margin-right","0px");
		$(this).find("li:nth-child(16)").css("margin-right","0px");
		$(this).find("li:nth-child(20)").css("margin-right","0px");
	});
	
	$(".public_visa>li").each(function(){
	    $(this).mousemove(function(){
		      $(".public_visa>li.border_orange").removeClass("border_orange");
		      $(this).addClass("border_orange");
		})
    });
	
    //map_popup
	$(".map ul li").each(function () {
	    $(this).find("a.city").hover(function () {
	        $(this).closest("li").find(".map_popup").show();
	    }, function () {
	        $(this).closest("li").find(".map_popup").hide();
	    });
	});
	$(".map ul li").find(".map_popup").each(function () {
	    $(this).hover(function () {
	        $(this).show();
	    }, function () {
	        $(this).hide();
	    });
	});


	
    //预定排行榜
	$(".thexe .book").each(function () {
	    $(this).find("li:eq(0)").find(".book_img").show();
	    $(this).find("li").each(function () {
	        $(this).mouseover(function () {
	            $(this).find(".book_img").show();
	            $(this).siblings().find(".book_img").hide();
	        });
	    });
	});




	
})