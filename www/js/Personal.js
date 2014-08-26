// JavaScript Document
$(function () {

    //PersonalMenu
    var lmIcon = $("#PersonalMenu .bottom_icon");
    lmIcon.click(function () {
        var _this = $(this);
        var lmIconParent = _this.parent(".personalmenu_title");

        if (lmIconParent.hasClass("personalmenu_Show")) {
            lmIconParent.removeClass("personalmenu_Show");
            lmIconParent.next(".personalmenu_con").removeClass("personalmenu_con_cur").hide();
        } else { lmIconParent.addClass("personalmenu_Show").next(".personalmenu_con").addClass("personalmenu_con_cur").show().end().siblings(".personalmenu_title").removeClass("personalmenu_Show").next(".personalmenu_con").removeClass("personalmenu_con_cur").hide(); }
    })

    //Hot
    $("#Hot").each(function () {
        $(this).find("li:nth-child(4)").css("margin-right", "0px");
    });

    //.hot_border event
    $(".hot_cont>li").each(function () {
        $(this).mousemove(function () {
            $(".hot_cont>li.border_orange").removeClass("border_orange");
            $(this).addClass("border_orange");
        })
    });

    //Notes
    $("#Notes").each(function () {
        $(this).find("li:odd").css("padding-right", "0px");
    });

    //HotelOrders event
    $("#HotelOrders").each(function () {
        var currnav = $(this);
        $(this).find("li").each(function () {
            $(this).click(function () {
                $(this).addClass("pitch").siblings().removeClass("pitch");
                $(this).parents("div.hotel_orders").find("div.orders_cont").eq($(this).index()).show().siblings().hide();
                $(".hotel_orders_nav").show();
                $(".my_integrate").show();
            });
        });
    });

    //KeyWords
    var $KeyWords = $("#KeyWords");
    var KeyWordsValue = $("#KeyWords").attr("value");
    var oldValue1 = $("#KeyWords").val();
    $KeyWords.focus(function () {
        var $thisVal = $(this).val();
        if ($thisVal == KeyWordsValue) {
            $(this).val("").addClass("inputFC");
        }
    });
    $KeyWords.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue1);
        }
    });

    //ChinaName
    var $ChinaName = $("#ChinaName");
    var ChinaNameValue = $("#ChinaName").attr("value");
    var oldValue_ChinaName = $("#ChinaName").val();
    $ChinaName.focus(function () {
        var $thisVal = $(this).val();
        if ($thisVal == ChinaNameValue) {
            $(this).val("");
        }
    });
    $ChinaName.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_ChinaName);
        }
    });
    //EnglishName1
    var $EnglishName1 = $("#EnglishName1");
    var EnglishName1Value = $("#EnglishName1").attr("value");
    var oldValue_EnglishName1 = $("#EnglishName1").val();
    $EnglishName1.focus(function () {
        var $thisVal = $(this).val();
        if ($thisVal == EnglishName1Value) {
            $(this).val("");
        }
    });
    $EnglishName1.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_EnglishName1);
        }
    });
    //EnglishName2
    var $EnglishName2 = $("#EnglishName2");
    var EnglishName2Value = $("#EnglishName2").attr("value");
    var oldValue_EnglishName2 = $("#EnglishName2").val();
    $EnglishName2.focus(function () {
        var $thisVal = $(this).val();
        if ($thisVal == EnglishName2Value) {
            $(this).val("");
        }
    });
    $EnglishName2.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_EnglishName2);
        }
    });
    //EnglishName3
    var $EnglishName3 = $("#EnglishName3");
    var EnglishName3Value = $("#EnglishName3").attr("value");
    var oldValue_EnglishName3 = $("#EnglishName3").val();
    $EnglishName3.focus(function () {
        var $thisVal = $(this).val();
        if ($thisVal == EnglishName3Value) {
            $(this).val("");
        }
    });
    $EnglishName3.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_EnglishName3);
        }
    });
    //Nationality
    var $Nationality = $("#Nationality");
    var NationalityValue = $("#Nationality").attr("value");
    var oldValue_Nationality = $("#Nationality").val();
    $Nationality.focus(function () {
        var $thisVal = $(this).val();
        if ($thisVal == NationalityValue) {
            $(this).val("");
        }
    });
    $Nationality.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_Nationality);
        }
    });
    //Phone1
    var $Phone1 = $("#Phone1");
    var Phone1Value = $("#Phone1").attr("value");
    var oldValue_Phone1 = $("#Phone1").val();
    $Phone1.focus(function () {
        var $thisVal = $(this).val();
        if ($thisVal == Phone1Value) {
            $(this).val("");
        }
    });
    $Phone1.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_Phone1);
        }
    });
    //Phone2
    var $Phone2 = $("#Phone2");
    var Phone2Value = $("#Phone2").attr("value");
    var oldValue_Phone2 = $("#Phone2").val();
    $Phone2.focus(function () {
        var $thisVal = $(this).val();
        if ($thisVal == Phone2Value) {
            $(this).val("");
        }
    });
    $Phone2.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_Phone2);
        }
    });
    //AeraCode
    var $AeraCode = $("#AeraCode");
    var AeraCodeValue = $("#AeraCode").attr("value");
    var oldValue_AeraCode = $("#AeraCode").val();
    //$AeraCode.focus(function () {
    //    var $thisVal = $(this).val();
    //    if ($thisVal == AeraCodeValue) {
    //        $(this).val("");
    //    }
    //});
    $AeraCode.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_AeraCode);
        }
    });
    //PhoneNum
    var $PhoneNum = $("#PhoneNum");
    var PhoneNumValue = $("#PhoneNum").attr("value");
    var oldValue_PhoneNum = $("#PhoneNum").val();
    //$PhoneNum.focus(function () {
    //    var $thisVal = $(this).val();
    //    if ($thisVal == PhoneNumValue) {
    //        $(this).val("");
    //    }
    //});
    $PhoneNum.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_PhoneNum);
        }
    });
    //Extension
    var $Extension = $("#Extension");
    var ExtensionValue = $("#Extension").attr("value");
    var oldValue_Extension = $("#Extension").val();
    //$Extension.focus(function () {
    //    var $thisVal = $(this).val();
    //    if ($thisVal == ExtensionValue) {
    //        $(this).val("");
    //    }
    //});
    $Extension.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_Extension);
        }
    });

    //AeraCode
    var $AeraCode1 = $("#AeraCode1");
    var AeraCode1Value = $("#AeraCode1").attr("value");
    var oldValue_AeraCode1 = $("#AeraCode1").val();
    //$AeraCode1.focus(function () {
    //    var $thisVal = $(this).val();
    //    if ($thisVal == AeraCode1Value) {
    //        $(this).val("");
    //    }
    //});
    $AeraCode1.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_AeraCode1);
        }
    });
    //PhoneNum
    var $PhoneNum1 = $("#PhoneNum1");
    var PhoneNum1Value = $("#PhoneNum1").attr("value");
    var oldValue_PhoneNum1 = $("#PhoneNum1").val();
    //$PhoneNum1.focus(function () {
    //    var $thisVal = $(this).val();
    //    if ($thisVal == PhoneNum1Value) {
    //        $(this).val("");
    //    }
    //});
    $PhoneNum1.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_PhoneNum1);
        }
    });
    //Extension
    var $Extension1 = $("#Extension1");
    var Extension1Value = $("#Extension1").attr("value");
    var oldValue_Extension1 = $("#Extension1").val();
    //$Extension1.focus(function () {
    //    var $thisVal = $(this).val();
    //    if ($thisVal == Extension1Value) {
    //        $(this).val("");
    //    }
    //});
    $Extension1.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_Extension1);
        }
    });

    //.integral_border event
    $(".integral_cont li").each(function () {
        $(this).mousemove(function () {
            $(".integral_cont>li.border_orange").removeClass("border_orange");
            $(this).addClass("border_orange");
        })
    });

    //integral_top_r
    $('.integral_top_r table td').each(function () {
        var book_num = $(this).find(".book_num").val();
        $(this).find(".jia").click(function () {
            book_num++;
            $(this).closest('.integral_top_r table td').find(".book_num").val(book_num);
        });
        $(this).find(".jian").click(function () {
            if (book_num == 0) {
                $(this).closest('.integral_top_r table td').find(".book_num").val(0);
            } else {
                book_num--;
                $(this).closest('.integral_top_r table td').find(".book_num").val(book_num);
            }
        })
    });

    //Operation click event;立即取消订单事件
    $(".operation[type=btnCancel]").click(function () {
        var $Cancel_Mask = $("<div class='cancel_mask' id='Cancel_Mask'></div>");
        $("body").append($Cancel_Mask);
        showPop();
        $("#Cancel_Orders").show();
    });
    //Cancel_Orders Close click event;弹出层关闭按钮点击事件
    $("#Cancel_Close").click(function () {
        $("#Cancel_Orders").hide();
        $("#Cancel_Mask").remove();
    });
    //弹出层及蒙板设置
    function showPop() {
        var docH = $(document).height();
        var objW = $(window);
        var objP = $("#Cancel_Orders");
        var objM = $("#Cancel_Mask");
        var brsW = objW.width();
        var brsH = objW.height();
        var sclL = objW.scrollLeft();
        var sclT = objW.scrollTop();
        var popW = objP.width();
        var popH = objP.height();
        var left = sclL + (brsW - popW) / 2;
        var top = sclT + (brsH - popH) / 2;
        objP.css({ "left": left, "top": top });
        objM.css({ "height": docH });
    }
    //窗口改变大小时,调整弹出层位置
    $(window).resize(function () {
        if (!$("#Cancel_Orders").is(":visible")) {
            return;
        };
        showPop();
    });

    //details_cycle
    $(".details_cycle").each(function () {
        $(this).find("dl:last").css("border-bottom", "none");
    });
    $(".details_nav").each(function () {
        var currnav = $(this);
        $(this).find("li").each(function () {
            $(this).click(function () {
                $(this).addClass("details_current").siblings().removeClass("details_current");
                $(this).parents("div.details_box").find("div.details_cycle").eq($(this).index()).show().siblings().hide();
                $(".details_box h2").show();
                $(".details_box .fanye").show();
                $(".details_box .details_nav").show();
                $(".details_box .details_input").show();
            });
        });
    });

    //details_issue
    var $details_issue = $("#details_issue");
    var details_issueValue = $("#details_issue").attr("value");
    var oldValue_details_issue = $("#details_issue").val();
    $details_issue.focus(function () {
        var $thisVal = $(this).val();
        if ($thisVal == details_issueValue) {
            $(this).val("");
        }
    });
    $details_issue.blur(function () {
        var $thisVal = $(this).val();
        if ($thisVal == "") {
            $(this).attr("value", oldValue_details_issue);
        }
    });

});

$(function () {
    $("#btnAddressDetailSubmit").click(function () {
        var consignee = $.trim($("#txtConsignee").val());
        var engName1 = $.trim($("#EnglishName1").val());
        if ($("#s_province option:selected").val() == "--请选择--") {
            alert("请选择省份"); return false;
        }
        var pro = $.trim($("#s_province option:selected").val());
        if ($("#s_city option:selected").val() == "--请选择--") {
            alert("请选择省份"); return false;
        }
        if ($("#s_county option:selected").val() == "--请选择--") {
            alert("请选择省份"); return false;
        }
        var city = $.trim($("#s_city option:selected").val() + "|" + $("#s_county option:selected").val());
        var street = $.trim($("#txtStreet").val());
        var mb = $.trim($("#txtMobile").val());
        var post = $.trim($("#txtPostCode").val());
        var area = $.trim($("#AeraCode").val());
        var phoneNum = $.trim($("#PhoneNum").val());
        var extension = $.trim($("#Extension").val());
        var email = $.trim($("#txtEmail").val());
        var tel = area + "-" + phoneNum;
        if (userNameCheck(consignee, true)) {
            if ("" == street) { alert("地址不能为空"); return false; }
            if (postCodeCheck(post, true)) {
                if ("" == mb && "-" == tel) { alert("手机和固话必须填写一个"); return false; }
                else {
                    var mt = false;
                    if (mb.length <= 0) { if (telphoneCheck(tel, true)) { mt = true; } }
                    else if (phoneNum.length <= 0) { if (mobileCheck(mb, true)) { mt = true; } }
                    else {
                        if (telphoneCheck(tel, true) && mobileCheck(mb, true)) {
                            mt = true;
                        }
                    }
                    if (mt) {
                    if (emailCheck(email, true)) {
                        $.post("/Personal/UpdateAddress", { hidId: $("#hidId").val(), txtConsignee: consignee, EnglishName1: engName1, txtPro: pro, txtCity: city, txtStreet: street, txtMobile: mb, txtPostCode: post, AeraCode: area, PhoneNum: phoneNum, Extension: extension, telphone: "", email: email, rnd: Math.random() }, function (data) {
                            if (data != "error") {
                                window.location.href = "/Personal/" + data;
                            } else {
                                alert("错误，请尝试重新填写");
                            }
                        });
                    }
                    }
                }
            }
        }
    });
});

/*
*
* 手机号码验证
* 参数说明：
* mobile:手机号码
* allowNull:是否允许为空 true:不允许； false:允许
* 验证失败返回false
* 正则说明：13|15|18开头+任意数字9位
* 2014-06-25 - add
*
*/
function mobileCheck(mobile, allowNull) {
    //设置allowNull
    if ("" == allowNull || null == allowNull || undefined == allowNull || false == allowNull) { allowNull = false; }

    //验证正则
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

    if (allowNull) {
        if ($.trim(mobile).length <= 0) {
            alert("请输入您的手机号码");
        } else {
            return checkByReg(mobile, reg, "手机号码格式不正确");
        }
    } else {
        return checkByReg(mobile, reg, "手机号码格式不正确");
    }
}

/*
*
* 邮政号码验证
* 参数说明：
* postCode:邮政号码
* allowNull:是否允许为空 true:不允许； false:允许
* 验证失败返回false
* 正则说明：6位数字
* 2014-07-02 - add
*
*/
function postCodeCheck(postCode, allowNull) {
    //设置allowNull
    if ("" == allowNull || null == allowNull || undefined == allowNull || false == allowNull) { allowNull = false; }

    //验证正则
    var reg = /^\d{6}$/;

    if (allowNull) {
        if ($.trim(postCode).length <= 0) {
            alert("请输入邮政编码");
        } else {
            return checkByReg(postCode, reg, "邮政编码只能6位数字");
        }
    } else {
        return checkByReg(postCode, reg, "邮政编码只能6位数字");
    }
}

/*
*
* 邮箱验证
* 参数说明：
* email:邮箱
* allowNull:是否允许为空 true:不允许； false:允许
* 验证失败返回false
* 正则说明：请自行参考
* 2014-06-25 - add
*
*/
function emailCheck(email, allowNull) {
    //设置allowNull
    if ("" == allowNull || null == allowNull || undefined == allowNull || false == allowNull) { allowNull = false; }

    //验证正则
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

    if (allowNull) {
        if ($.trim(email).length <= 0) {
            alert("请输入您的常用邮箱");
        } else {
            return checkByReg(email, reg, "邮箱格式不正确");
        }
    } else {
        return checkByReg(email, reg, "邮箱格式不正确");
    }
}

/*
*
* 座机验证
* 参数说明：
* telphone:座机
* allowNull:是否允许为空 true:不允许； false:允许
* 验证失败返回false
* 正则说明：格式为3位区号-7或8位号码
* 2014-06-25 - add
*
*/
function telphoneCheck(telphone, allowNull) {
    //设置allowNull
    if ("" == allowNull || null == allowNull || undefined == allowNull || false == allowNull) { allowNull = false; }

    //验证正则
    var reg = /^\d{3,4}\-\d{7,8}$/;

    if (allowNull) {
        if ($.trim(telphone).length <= 0) {
            alert("请输入您的电话号码");
        } else {
            return checkByReg(telphone, reg, "电话号码格式不正确");
        }
    } else {
        return checkByReg(telphone, reg, "电话号码格式不正确");
    }
}

/*
*
* 姓名验证
* 参数说明：
* userName:姓名
* allowNull:是否允许为空 true:不允许； false:允许
* 验证失败返回false
* 正则说明：至少2个汉字
* 2014-06-25 - add
*
*/
function userNameCheck(userName, allowNull) {
    //设置allowNull
    if ("" == allowNull || null == allowNull || undefined == allowNull || false == allowNull) { allowNull = false; }

    //验证正则
    var reg = /^[^x00-xff]{2,}$/;

    if (allowNull) {
        if ($.trim(userName).length <= 0) {
            alert("请输入姓名");
        } else {
            return checkByReg(userName, reg, "姓名必须中文且至少2个汉字");
        }
    } else {
        return checkByReg(userName, reg, "姓名必须中文且至少2个汉字");
    }
}

/*
*
* 验证checkStr是否符合reg
* 参数说明：checkStr：要验证的字符串
* reg：验证的正则表达式
* tips：错误提示
* 2014-06-25
*/
function checkByReg(checkStr, reg, tips) {
    if (!$.trim(checkStr).match(reg)) {
        alert(tips); return false;
    } else { return true; }
}
