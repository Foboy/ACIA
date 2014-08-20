$(function () {
    function boxAlign(leftBox, rightBox) {
        var leftBoxH = $(leftBox).height();
        var rightBoxH = $(rightBox).height();
        var winH = $(window).height();
        var mainTop = $(".wrap").position().top;
        var boxsTop = $(".container").position().top;
        var leftBoxTop = $(leftBox).parent().position().top;
        var rightBoxTop = $(rightBox).parent().position().top;
        $(leftBox).css({ "height": leftBoxH });
        $(rightBox).css({ "height": rightBoxH });
        if (leftBoxH > winH && rightBoxH > winH) {
            if (leftBoxH > rightBoxH) {
                $(window).scroll(function () {
                    var winH = $(window).height();
                    var leftBoxHSum = (leftBoxH + leftBoxTop + mainTop + boxsTop) - winH;
                    var leftBoxHMin = leftBoxH - rightBoxH;
                    var rightBoxHSum = (rightBoxH + rightBoxTop + mainTop + boxsTop) - winH;
                    var rightBoxHMin = rightBoxH - leftBoxH;
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    if (scrollTop >= rightBoxHSum) {
                        $(rightBox).css({ position: "fixed", top: "auto" });
                    } else {
                        $(rightBox).css({ position: "static", top: "auto" });
                    };
                    if (scrollTop >= leftBoxHSum) {
                        $(rightBox).css({ position: "absolute", top: leftBoxHMin });
                    };
                });
            } else {
                $(window).scroll(function () {
                    var winH = $(window).height();
                    var leftBoxHSum = (leftBoxH + leftBoxTop + mainTop + boxsTop) - winH;
                    var leftBoxHMin = leftBoxH - rightBoxH;
                    var rightBoxHSum = (rightBoxH + rightBoxTop + mainTop + boxsTop) - winH;
                    var rightBoxHMin = rightBoxH - leftBoxH;
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    if (scrollTop >= leftBoxHSum) {
                        $(leftBox).css({ position: "fixed", top: "auto" });
                    } else {
                        $(leftBox).css({ position: "static", top: "auto" });
                    };
                    if (scrollTop >= rightBoxHSum) {
                        $(leftBox).css({ position: "absolute", top: rightBoxHMin });
                    };
                });
            };
        };

        $(window).resize(function () {
            boxAlign(leftBox, rightBox);
        });
    }

    if ($.browser.msie) {
        var ver = $.browser.version;
        if (ver != 6.0) {
            boxAlign(".box1", ".box2");
        };
    } else {
        boxAlign(".box1", ".box2");
    };
})