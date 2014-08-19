
// JavaScript Document
$(function(){
	$(".search_recomend").each(function(){
		$(this).find("li:first").css({"padding-top":"0"})
	});
	
    //按需求排序查询
	$(".search_sort .search_sort_title li").each(function () {
	    var $this = $(this);
	    $this.click(function () {
	        if ($this.index() == 0) {
	            $this.addClass("current0").siblings().removeClass("current");
	        } else {
	            $this.addClass("current").siblings().removeClass("current").eq(0).removeClass("current0");
	        }
	    });
	});


	$("#search_box").each(function(){
		$(this).find("li").hover(function(){
			$(this).addClass("current");	
		},function(){
			$(this).removeClass("current");	
		})
	})
	
	
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

