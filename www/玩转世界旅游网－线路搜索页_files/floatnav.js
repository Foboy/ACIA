// JavaScript Document
$(document).ready(function(){		
//menu event
	$(".nav_all").each(function(){
	   $(this).hover(function(){
		   $(this).find(".menu").show();
	   },function(){
		   $(this).find(".menu").hide();
	   })
    });	
	$(".menu_open>li").hover(function(){
		   $(this).addClass("hover");
		   $(this).find(".menu_close").show();
		   modifyImgMaxWidth(this) ;
		   
	   },function(){
		   $(this).removeClass("hover");
		   $(this).find("dd").css({"max-width":"630px"})
		   $(this).find(".menu_close").hide();
	});		
	var modifyImgMaxWidth = function(that){		
		var $img = $(that).find("img") ;	// 广告图片
		
		var $close_link = $(that).find(".close_link");			// 关闭层
		var $close_link_dl =$close_link.find("dl") ;				// 关闭层中dd
		var $close_link_dt =$close_link.find("dt") ;				// 关闭层中dt
		var $close_link_dd =$close_link.find("dd") ;				// 关闭层中dd
		var $menu_close_img = $(that).find(".menu_close_img") ;  // 广告图片父层

		var imgHeight = $img.height() ;			// 图片高
		var imgWidth = $img.width() ; 			// 图片宽

		var menu_close_imgRight = parseInt($menu_close_img.css("right")) ;		// 图片定位移动位置 // 负值

		var close_linkHeight = $close_link.height() ;			// 关闭层高
		var close_linkWidth = $close_link.width() ;				// 关闭层宽

		var close_linkPaddingLeft = parseInt($close_link.css("padding-left")) ;	// 关闭层左填充
		var close_linkPaddingBottom = parseInt($close_link.css("padding-bottom")) ;	// 关闭层左填充
		var close_linkDtWidth = $close_link_dt.width() ;			// 关闭层中dt宽
		var totalHeight = close_linkPaddingBottom;
		var totalChange = close_linkPaddingBottom;
		var totalElseChange = close_linkPaddingBottom;
		
		var max_width = close_linkWidth - close_linkPaddingLeft - close_linkDtWidth - imgWidth - menu_close_imgRight ; // 计算出dd的最大宽度
			   
		if(close_linkHeight <= 348){								// 设置了min-height值
			// 此时所有的dd最大宽度都为max_width
			$close_link_dd.css({"max-width":max_width}) ;	// 修改所有dd的最大宽度			
			if($close_link.height() > 348){
				// 计算有多少个dd需要设置最大宽度
				for(var i = $close_link_dl.length-1 ; i > 0 ; i --){
					var close_link_dlHeight = $($close_link_dl[i]).height() ;
					totalElseChange += close_link_dlHeight;	
					if(totalElseChange > imgHeight){	// 修改完高度之后，还得重新计算，因为高度不一样了
						$($close_link_dl[i-1]).find("dd").css({"max-width":"630px"}) ;	// 修改dd的最大宽度						
					}
			   }
			}
		}else{
			// 计算有多少个dd需要设置最大宽度
			for(var i = $close_link_dl.length-1 ; i > 0 ; i --){
				var close_link_dlHeight = $($close_link_dl[i]).height() ;
				totalHeight += close_link_dlHeight;	
				if(totalHeight < imgHeight){	
					$($close_link_dl[i]).find("dd").css({"max-width":max_width}) ;	// 修改dd的最大宽度						
				}
				var after_change = $($close_link_dl[i]).height() ;
				totalChange += after_change ;
				if(totalChange > imgHeight){	// 修改完高度之后，还得重新计算，因为高度不一样了
					$($close_link_dl[i]).find("dd").css({"max-width":"630px"}) ;	// 修改dd的最大宽度						
				}
		   }
		}
	}	
});
