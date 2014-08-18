$(function () {
    $(function () {   //flash轮播
        var $banner = $('.banner');
        var $banner_ul = $('.banner_img');
        var $btn = $('.banner_btn');
        var $btn_a = $btn.find('a')
        var v_width = $banner.width();

        var page = 1;

        var timer = null;
        var btnClass = null;

        var page_count = $banner_ul.find('li').length;//把这个值赋给小圆点的个数

        var banner_cir = "<li class='selected' href='#'><a></a></li>";
        for (var i = 1; i < page_count; i++) {
            //动态添加小圆点
            banner_cir += "<li><a href='#'></a></li>";
        }
        $('.banner_circle').append(banner_cir);
        var cirLeft = $('.banner_circle_con').width() * (-0.5);
        $('.banner_circle_con').css({ 'marginLeft': cirLeft });

        $banner_ul.width((page_count+1)*v_width);
        function move(obj, classname) {
            //手动及自动播放
            if (!$banner_ul.is(':animated')) {
                if (classname == 'prevBtn') {
                    if (page == 1) {
                        $banner_ul.animate({ left: -v_width * (page_count - 1) });
                        page = page_count;
                        cirMove();
                    }
                    else {
                        $banner_ul.animate({ left: '+=' + v_width }, "slow");
                        page--;
                        cirMove();
                    }
                }
                else {
                    if (page == page_count) {
                        $banner_ul.animate({ left: 0 });
                        page = 1;
                        cirMove();
                    }
                    else {
                        $banner_ul.animate({ left: '-=' + v_width }, "slow");
                        page++;
                        cirMove();
                    }
                }
            }
        }

        function cirMove() {
            //检测page的值，使当前的page与selected的小圆点一致
            $('.banner_circle li').eq(page - 1).addClass('selected').siblings().removeClass('selected');
        }

        $banner.mouseover(function () {
            $btn.css({ 'display': 'block' });
            clearInterval(timer);
        }).mouseout(function () {
            $btn.css({ 'display': 'none' });
            clearInterval(timer);
            timer = setInterval(move, 5000);
        }).trigger("mouseout");//激活自动播放

        $btn_a.mouseover(function () {
            //实现透明渐变，阻止冒泡
            $(this).animate({ opacity: 0.9 }, 'fast');
            $btn.css({ 'display': 'block' });
            return false;
        }).mouseleave(function () {
            $(this).animate({ opacity: 0.3 }, 'fast');
            $btn.css({ 'display': 'none' });
            return false;
        }).click(function () {
            //手动点击清除计时器
            btnClass = this.className;
            clearInterval(timer);
            timer = setInterval(move, 5000);
            move($(this), this.className);
        });

        $('.banner_circle li').live('click', function () {
            var index = $('.banner_circle li').index(this);
            $banner_ul.animate({ left: -v_width * index }, 'slow');
            page = index + 1;
            cirMove();
        });
    });
})