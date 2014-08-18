var awtrip = {
	
	setCSS:{
		setIndexCss:function(siblings,targetParent,target,defCssName,defCssVal,defI,addI,iCssName,iCssVal){//设置指定索引样式（只支持一个样式）
			//siblings:拥有相同的样式的选择器,targetParent:目标的父级元素,target:目标选择器,defCssName:默认样式名字,defCssVal:默认样式值,defI:默认索引值,addI:索引值自加值,iCssName:索引样式名字,iCssVal:索引样式值
			$(siblings).each(function(){
				var $targetParent = $(this).find(targetParent);
				$($targetParent).each(function(){
					var $targetPath = $(this).children(target);
					$targetPath.css(defCssName,defCssVal);
					for(var i = defI;i <= $targetPath.length;i = i + addI){
						$(this).children(target + ":eq("+i+")").css(iCssName,iCssVal);
					};
				});
			});
		},
		lastChildCSS:function(parent,target,styleName,styleValue){//设置最后一个元素的样式
			//parent:父级元素,target:目标元素,styleName:样式名字,styleVelue:样式值3
			$(parent).each(function(){
				$(this).find(target + ":last").css(styleName,styleValue);
			});
		}
	},
	IndexAddClass:function(siblings,targetParent,target,defI,addI,className){//指定索引增加Class
		//siblings:拥有相同的样式的选择器,targetParent:目标的父级元素,target:目标选择器,defI:默认索引值,addI:索引值自加值,className:设置索引元素className
		$(siblings).each(function(){
			var $targetParent = $(this).find(targetParent);
			$($targetParent).each(function(){
				var $targetPath = $(this).children(target);
				for(var i = defI;i <= $targetPath.length;i = i + addI){
					$(this).children(target + ":eq("+i+")").addClass(className);
				};
			});
		});
	},
	Tabs:function(parent,tabs,nowTab,tabsCont,Event){//tabs 切换
		//parent:tabs 父级元素,tabs:tabs元素,nowTab:焦点样式class,tabsCont:tabs主体,_event:鼠标经过事件(*可选)(如click,mouseover)
		$(parent).each(function(){
			var $tabs = $(this).find(tabs + ">li");
			$tabs.each(function(index){
				var _event = Event ? Event : "mouseover";//如果Event未定义;默认为mouseover
				$(this).bind(_event,function(){
					if(nowTab){
						$(this).parent(tabs).find("li").removeClass(nowTab);
						$(this).addClass(nowTab);
						$(this).parents(parent).find(tabsCont + ">li:eq("+index+")").show().siblings().hide();
					}else{
						$(this).parents(parent).find(tabsCont + ">li:eq("+index+")").show().siblings().hide();
					};
				});
			});
		});
	},
	Table:{
		TableGHBS:function(tableParent,odd_even,bgColor){//表格隔行变色
			//tableParent:表格所在父级,odd_even:奇偶;可选(odd,even),bgColor:背景色
			$(tableParent).each(function(){
				$(this).find("tbody>tr" + ":nth-child("+odd_even+")").css("background-color",bgColor);
			});
		}
	},
	TabsSlides:function(slidesID,prevBtnID,nextBtnID){
		//slidesID:父级ID,prevBtnID:前一个按钮ID,nextBtnID:下一个按钮ID
		var $slides = $(slidesID);
		var $nextBtn = $(nextBtnID);
		var $prevBtn = $(prevBtnID);
		var tabsUl = $(slidesID).find("ul");
		var tabsLi = $(slidesID).find("li");
		var slidesWidth = $slides.width();
		var liWidth = tabsLi.width();
		var ulWidth = liWidth * tabsLi.length;
		tabsUl.css({width:ulWidth});	//设置ul的宽度
		$prevBtn.click(function(){//前一个
			var tabsUlLeft = tabsUl.position().left;
			tabsUl.stop(true);
			if(tabsUlLeft < 0){
				tabsUl.animate({left:'+=' + liWidth + 'px'},200);
			};
		});
		$nextBtn.click(function(){//后一个
			var tabsUlLeft = tabsUl.position().left;
			tabsUl.stop(true);
			if(tabsUlLeft > (-(ulWidth-slidesWidth-liWidth))){
				tabsUl.animate({left:'-=' + liWidth + 'px'},200);
			};
		});
	},
	hoverIE6:function($select,className){
		//$select:选择器,className:className
		$($select).hover(function(){
			$(this).addClass(className);
		},function(){
			$(this).removeClass(className);
		});
	}
};

$(function(){
	awtrip.IndexAddClass(".footer_top","ul","li",0,10,"ma");
	awtrip.IndexAddClass(".footer_cont","ul","li",0,6,"first");
	awtrip.setCSS.setIndexCss(".public",".integral_cont","li","margin-right","20px",3,4,"margin-right","0px");
	awtrip.setCSS.setIndexCss(".public",".email_cont","li","margin-right","20px",1,2,"margin-right","0px");
	awtrip.setCSS.setIndexCss(".public",".coupon_cont","li","margin-right","20px",3,4,"margin-right","0px");
	
	//journey_cont event
	$(".journey_cont li").each(function(){
	   $(this).find("a").hover(function(){
		   $(this).find(".selfdriving_ceng").animate({"left":0},200);
		   $(this).find(".selfdriving_wenzi").animate({"left":0},200);
	   },function(){
		   $(this).find(".selfdriving_ceng").animate({"left":-295+"px"},200);
		   $(this).find(".selfdriving_wenzi").animate({"left":-295+"px"},200);
	   })
    });
	
	//.selfdriving_border event
    $(".selfdriving_line>li").each(function(){
	    $(this).mousemove(function(){
		      $(".selfdriving_line>li.border_orange").removeClass("border_orange");
		      $(this).addClass("border_orange");
		})
    });	
	
	awtrip.setCSS.setIndexCss(".selfdriving_cont",".selfdriving_line","li","margin-right","20px",3,4,"margin-right","0px");
	
	//gty_hot_nav
	$(".gty_hot_nav li").each(function(index){ 
		$(this).mousemove(function(){
			$(".gty_hot_cont .gty_hot_tab:eq("+index+")").show().siblings().hide();
			$(this).siblings().find("a").removeClass("gty_hot_qt"); 
			$(this).find("a").addClass("gty_hot_qt");
			$(window).scroll();
		})
	});
	$("gty_hot_nav").each(function(){
		$(this).find("li").addClass("gty_hot_qt").mousemove(); 
	});
	
	//selfdriving_world
	awtrip.setCSS.setIndexCss(".selfdriving_cont", ".selfdriving_world", "li", "margin-right", "8px", 7, 8, "margin-right", "0px");
	awtrip.setCSS.setIndexCss(".integral_bottoms", ".integral_cont", "li", "margin-right", "10px", 3, 4, "margin-right", "0px");

    //selfdriving_lask
	$(".selfdriving_ul").find("li").each(function () {
	    $(this).click(function () {
	        $(this).addClass("current").siblings().removeClass("current");
	        $(this).parents("div.selfdriving_cont").find("div.selfdriving_lask>ul").eq(($(this).index() + 1) / 2).show().siblings().hide();
	        $(window).scroll();
	    });
	});

    //custom_ding_ul
	awtrip.setCSS.setIndexCss(".custom_cont", ".custom_ding_ul", "li", "margin-right", "20px", 3, 4, "margin-right", "0px");
    //.custom_border event
	$(".custom_ding_ul>li").each(function () {
	    $(this).mousemove(function () {
	        $(".custom_ding_ul>li.border_orange").removeClass("border_orange");
	        $(this).addClass("border_orange");
	    })
	});
	$(".custom_ul li .zj_more_con").each(function () {
	    $(this).find("dl:last").css("border-bottom", 0);
	});
	$(".custom_ul li a.selfdriving_title_more").each(function () {
	    $(this).toggle(function () {
	        $(this).addClass("current").closest(".zj_more").find(".zj_more_con").show();
	    }, function () {
	        $(this).removeClass("current").closest(".zj_more").find(".zj_more_con").hide();
	    });
	});

	
})