var timer = null;
var offset = 5000;
var index = 0;

//大图交替轮换
function slideImage(i){
	$("#bigpicarea").each(function(){
	   $(this).hover(function(){
		       $(this).find("#big_play_prev").css("display","block");
			   $(this).find("#big_play_next").css("display","block");
	   },function(){
		       $(this).find("#big_play_prev").css("display","none");
			   $(this).find("#big_play_next").css("display","none");
	   })
    });	
    var id = 'image_'+ target[i];
    $('#'+ id).animate({opacity: 1}, 1, function(){
            $(this).find('.word').show();
        }).show().siblings(':visible').find('.word').animate({height: 'show'},'fast',function(){
            $(this).parent().animate({opacity: 0}, 1).hide();
        });
}


//bind thumb a
function hookThumb(){    
    $('#thumbs li a')
        .bind('click', function(){
            if (timer) {
                clearTimeout(timer);
            }                
            var id = this.id;            
            index = getIndex(id.substr(6));
            rechange(index);
            slideImage(index); 
            timer = window.setTimeout(auto, offset);  
            this.blur();            
            return false;
        });
}

function bighookBtn(){
    $('#bigpicarea p span').filter('#big_play_prev,#big_play_next')
        .bind('click', function(){
            if (timer){
                clearTimeout(timer);
            }
            var id = this.id;
            if (id == 'big_play_prev') {
                index--;
                if (index < 0) index = $('#thumbs li a').length - 1;
            }else{
                index++;
                if (index > $('#thumbs li a').length - 1) index = 0;
            }
            rechange(index);
            slideImage(index);
            timer = window.setTimeout(auto, offset);
        });
}

//get index
function getIndex(v){
    for(var i=0; i < target.length; i++){
        if (target[i] == v) return i;
    }
}
function rechange(loop){
    var id = 'thumb_'+ target[loop];
    $('#thumbs li a.current').removeClass('current');
    $('#'+ id).addClass('current');
}
function auto(){
    index++;
    if (index > $('#thumbs li a').length - 1) {
        index = 0;
    }
    rechange(index);
    slideImage(index);
    timer = window.setTimeout(auto, offset);
}
$(function(){    
    //change opacity
    $('div.word').css({opacity:0.85});
    auto();  
    hookThumb(); 
	bighookBtn()
    
});