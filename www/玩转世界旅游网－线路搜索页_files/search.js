
// JavaScript Document
$(function(){
	$(".search_sort_title").each(function(){
		$(this).find("li:last").css("border-right",0);
	});
	$(".search_recomend").each(function(){
		$(this).find("li:last").css({"border-bottom":"0"});
		$(this).find("li:first").css({"padding-top":"0"})
	});
	
    //按需求排序查询
	$(".search_sort .search_sort_title li").each(function () {
	    var $this = $(this);
	    $this.click(function () {
	        if ($this.index() == 0) {
	            $this.addClass("current0").siblings().removeClass("current");
	            $this.parent().find("li:last").find("span").removeClass("des");
	        } else {
	            $this.addClass("current").siblings().removeClass("current").eq(0).removeClass("current0");
	            $this.parent().find("li:last").find("span").removeClass("des");
	        }
	    });
	});
	$(".search_sort .search_sort_title li").last().toggle(function () {
	    $(this).find("span").addClass("des");
	}, function () {
	    $(this).find("span").removeClass("des");
	});


	$("#search_box").each(function(){
		$(this).find("li").hover(function(){
			$(this).addClass("current");	
		},function(){
			$(this).removeClass("current");	
		})
	})
	
	//最早出发-最晚出发
	var $early_time=$(".early_time");
	var $late_time=$(".late_time");
	var early_timeValue=$(".early_time").attr("value");
	var late_timeValue=$(".late_time").attr("value");
	var oldValue1=$(".early_time").val();
	var oldValue2=$(".late_time").val();
	$early_time.focus(function(){
		var $thisVal=$(this).val();
		if($thisVal==early_timeValue){
			$(this).val("");
		}
	}).blur(function(){
		var $thisVal=$(this).val();
		if($thisVal==""){
			$(this).attr("value",oldValue1);
		}
	});
	
	$late_time.focus(function(){
		var $thisVal=$(this).val();
		if($thisVal==late_timeValue){
			$(this).val("");
		}
	}).blur(function(){
		var $thisVal=$(this).val();
		if($thisVal==""){
			$(this).attr("value",oldValue2);
		}
	});
	
	//slider_about
	$(".slider_r .slider_theme").each(function(){
		$(this).find("a.slider_fenlei:eq(3)").css("margin-right",0);
		$(this).find("a.slider_fenlei:eq(7)").css("margin-right",0);
		$(this).find("a.slider_fenlei:eq(11)").css("margin-right",0);
	});
	
	$("#slider_scenic>li:last").css("border-bottom","none");
	$("#slider_hothotel>li:last").css("border-bottom","none");
	$("#slider_notes>li:last").css("border-bottom","none");
	$("#slider_information>li:last").css("border-bottom","none");
	$("#slider_active>li:last").css("border-bottom","none");
	$("#slider_record>li:last").css("border-bottom","none");
	$("#slider_record li").each(function(){
	   $(this).hover(function(){
		       $(this).find("a.slider_contrast").show();
	   },function(){
		       $(this).find("a.slider_contrast").hide();
	   })
    });
	
	
    //2014-06-18添加置顶效果
	$(window).scroll(function () {
	    var headerH = $(".header_wrap").height();
	    var myDivTop = $("#Yao_kuang").position().top;
	    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	    var myTopSum = headerH + myDivTop;
	    if (scrollTop >= myTopSum) {
	        $("#Yao_title").addClass("active");
	        $(".total_con").css({ marginTop: "43px" });
	    } else {
	        $("#Yao_title").removeClass("active");
	        $(".total_con").css({ marginTop: "0px" });
	    }
	});
	
	
	
	
})

