(function($){
$.fn.extend({  //hotel_scroll event酒店
        Scroll:function(opt,callback){
                //参数初始化
                if(!opt) var opt={};
                var _btmLeft = $("#"+ opt.left);
                var _btnRight = $("#"+ opt.right);
                var timerID;
                var _this=$("#displaycssbelt");
                var     panelWidth=_this.find("li:first").width() + parseInt(_this.find("li:first").css("margin-left"),10) //获取行高
                        panelnum=opt.panelnum?parseInt(opt.panelnum,10):parseInt(this.width()/panelWidth,10), //每次滚动的行数，默认为一屏，即父容器高度
                        speed=opt.speed?parseInt(opt.speed,10):500; //卷动速度，数值越大，速度越慢（毫秒）
                        timer=opt.timer //?parseInt(opt.timer,10):3000; //滚动的时间间隔（毫秒）
                if(panelnum==0) panelnum=1;
                var leftWidth=0-panelnum*panelWidth;

                //滚动函数
                var scrollLeft=function(){
                        _btmLeft.unbind("click",scrollLeft); //Shawphy:取消向上按钮的函数绑定
                        _this.animate({
                                marginLeft:leftWidth
                        },speed,function(){
                                for(i=1;i<=panelnum;i++){
                                        _this.find("li:first").appendTo(_this);
                                }
                                _this.css({marginLeft:0});
                                _btmLeft.bind("click",scrollLeft); //Shawphy:绑定向上按钮的点击事件
                        });

                }
                //Shawphy:向下翻页函数
                var scrollRight=function(){
                        _btnRight.unbind("click",scrollRight);
                        for(i=1;i<=panelnum;i++){
                                _this.find("li:last").show().prependTo(_this);
                        }
                        _this.css({marginLeft:leftWidth});
                        _this.animate({
                                marginLeft:0
                        },speed,function(){
                                _btnRight.bind("click",scrollRight);
                        });
                }
               //Shawphy:自动播放
                var autoPlay = function(){
                        if(timer)timerID = window.setInterval(scrollLeft,timer);
                };
                var autoStop = function(){
                        if(timer)window.clearInterval(timerID);
                };
                 //鼠标事件绑定
                _this.hover(autoStop,autoPlay).mouseout();
                _btmLeft.css("cursor","pointer").hover(autoStop,autoPlay).click( scrollLeft );//Shawphy:向上向下鼠标事件绑定
                _btnRight.css("cursor","pointer").hover(autoStop,autoPlay).click( scrollRight );

        }       
})
})(jQuery);