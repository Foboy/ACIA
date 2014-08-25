(function () {
    $(function () {

        /*
            全局
        */
        var Waring = '<div class="loginAlert"></div>';
        var SendNum = 0;
        var wait = 60;

        // 验证的正则表达式
        var validateRegExp = {
            intege: "^-?[1-9]\\d*$", //整数
            intege1: "^[1-9]\\d*$", //正整数
            intege2: "^-[1-9]\\d*$", //负整数
            num: "^([+-]?)\\d*\\.?\\d+$", //数字
            num1: "^[1-9]\\d*|0$", //正数（正整数 + 0）
            num2: "^-[1-9]\\d*|0$", //负数（负整数 + 0）
            ascii: "^[\\x00-\\xFF]+$", //仅ACSII字符
            chinese: "^[\\u4e00-\\u9fa5]+$", //仅中文
            date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", //日期
            email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
            letter: "^[A-Za-z]+$", //字母
            letter_l: "^[a-z]+$", //小写字母
            letter_u: "^[A-Z]+$", //大写字母
            mobile: "^0?(13|15|18|14)[0-9]{9}$", //手机
            notempty: "^\\S+$", //非空
            password: "^.*[A-Za-z0-9\\w_-]+.*$", //密码
            fullNumber: "^[0-9]+$", //数字
            tel: "^[0-9\-()（）]{7,18}$", //电话号码的函数(包括验证国内区号,国际区号,分机号)
            url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", //url
            username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$" //用户名
        };

        //检查验证规则
        var validateRules = {
            isNull: function (str) {
                return (str == "" || typeof str != "string");
            },
            isEmail: function (str) {
                return new RegExp(validateRegExp.email).test(str);
            },
            isMobile: function (str) {
                return new RegExp(validateRegExp.mobile).test(str);
            }
        };


        //验证文本信息
        var validateText = {
            registerId: {
                isNull: "邮箱/手机号",        // 默认值
                error: {
                    isNull: "请输入帐号",      // 输入帐号
                    minLength: "账号最短不能少于3位",
                    wrongText: "账号应是手机号或邮箱",
                    errorElse: "请输入正确的手机号/邮箱"
                }
            },
            pwd: {
                isNull: "请输入密码",    // 默认值
                error: {
                    minLength: "密码不能小于6位",
                }
            },
            pwd2: {
                isNull: "请再次输入密码",    // 默认值
                complete: "完成",
                error: {
                    wrongText: "两次密码不一致"
                }
            },
            authcode: {
                isNull: "请输入验证码",       // 默认值
                error: {
                    isError: "验证码错误"     // 验证码输入错误
                }
            }
        };



        //密码级别验证
        function pwdLevel(value) {
            var pattern_1 = /^.*([\W_])+.*$/i;
            var pattern_2 = /^.*([a-zA-Z])+.*$/i;
            var pattern_3 = /^.*([0-9])+.*$/i;
            var level = 0;
            if (value.length > 10) {
                level++;
            }
            if (pattern_1.test(value)) {
                level++;
            }
            if (pattern_2.test(value)) {
                level++;
            }
            if (pattern_3.test(value)) {
                level++;
            }
            if (level > 3) {
                level = 3;
            }
            return level;
        };

        //密码等级提示
        function pwdL($this, pwd) {
            if (pwd.length >= 6) {
                if (pwdLevel(pwd) == 1) {
                    $this.parent("dd").append(Waring);
                    $this.nextAll(".loginAlert").text("安全等级：低").removeClass("colorGreen colorYellow").addClass("colorOrange");
                } else if (pwdLevel(pwd) == 2) {
                    $this.parent("dd").append(Waring);
                    $this.nextAll(".loginAlert").text("安全等级：中").removeClass("colorGreen colorOrange").addClass("colorYellow");
                } else if (pwdLevel(pwd) == 3) {
                    $this.parent("dd").append(Waring);
                    $this.nextAll(".loginAlert").text("安全等级：高").removeClass("colorOrange colorYellow").addClass("colorGreen");
                };
            } else {
                $this.nextAll(".loginAlert").remove();
            };
        };

        // time2
        function time2(o) {
            if (wait == 0) {
                SendNum = 0;
                o.html("点击获取验证码");
                $("#pYzCode").html("请获取验证码").show();
                $("#hidMobileCode").val("");
                wait = 60;
            } else {
                SendNum++;
                o.html("重新发送");
                wait--;
                $("#pYzCode").html("验证码已发送" + wait + "秒后请再次获取").show();
                setTimeout(function () {
                    time2(o)
                },
                1000)
            }
        }

        /**
        *检测文本输入框是否包含非法字符串
        *@param value 检查的字符串
        *@param msg 检查后的提示信息
        *@param $msg 控件jquery 对象
        *@return:字符串 如果为true,则表示验证通过,否则返回false
        **/
        var checkInputValue = function (value, msg, $msg) {
            var illegalStringArray = /[\'\\[\]\+=&\-\^<>]/;
            if (!value) {
                return true;
            } else {
                var result = "";
                var mathes = new RegExp(illegalStringArray).exec(value);
                if (mathes != null) {
                    result = mathes[0];
                }
                if (result) {
                    msg = "输入的" + msg + "中含有非法字符!"
                    $msg.html(msg).show();
                    return false;
                }
                return true;
            }

        }

        // 封装一层ajax post
        var ajaxPost = function (option) {
            
            if (option.url && option.param && option.callback) {
                var request = $.ajax({
                    url: option.url,
                    type: "POST",
                    data: option.param
                });

                request.done(option.callback);

                request.fail(function (jqXHR, textStatus) {
                    alert("请求出错: " + textStatus);
                });

            }
        };
        /*   
         注册
        */
        $(function () {
            //帐号
            $("#RegisterId").focus(function () {
                var thisVal = $(this).val();

                if (thisVal == validateText.registerId.isNull) {
                    $(this).val("");
                }
            });
            $("#RegisterId").blur(checkRegistId);

            //注册
            $("#RegisterPassword").focus(function () {
                $(this).removeClass("error_border");
                $(this).nextAll(".loginAlert").remove();
            }).blur(checkRegpwd).keyup(function () {
                var $this = $(this);
                pwdL($this, $this.val());
            });

            //注册密码确认获取焦点的事件
            $("#RegisterPassword2").focus(function () {
                $(this).removeClass("error_border");
                $(this).nextAll(".loginAlert").remove();
            });

            //验证注册验证码
            //$("#txtValidateCode").blur(checkCode);

            //提交注册
            $("#btnRegister").click(function () {
                var registerid = $("#RegisterId").val().replace("邮箱/手机号", "").replace(/(^\s*)|(\s*$)/g, "");
                var utype = $("#utype").val();
                var txtValidateCode = $("#txtValidateCode").val();
                var sjCode = $("#checkPhone").val();
                var mcode = $("#hidMobileCode").val();
                if (utype == "sj" && sjCode == "") {
                    $("#pYzCode").html("请输入手机验证码！").show();
                    return false;
                } else if (utype == "sj" && sjCode != mcode) {
                    $("#pYzCode").html("输入的手机验证码不正确！").show();
                    return false;
                } else if ($("#Agree").attr("checked") != true && $("#Agree").attr("checked") != "checked") {
                    $("#Destine").click();
                    return false;
                }

                checkRegistId()         // 帐号      

            });

            //手机注册
            //注册获取手机验证码
            $("#sendMobileCodeReg").click(function () {
                var tel = $("#RegisterId").val();
                var option = {
                    url: "/Login/SendMobileCode",
                    param: { tel: tel, rnd: Math.random() },
                    callback: function (data) {
                        if (data != "") {
                            $("#hidMobileCode").val(data);
                            SendNum++;
                            wait = 60;
                            time2($("#sendMobileCodeReg"));
                        } else {
                            alert("获取验证码失败！");
                        }
                    }
                };

                if (tel != "" && SendNum == 0) {
                    ajaxPost(option);
                } else if (tel == "") {
                    alert("您还没有输入手机号!");
                }
            });



            //立即预定点击事件
            $("#Destine").click(function () {
                var $Mask = $("<div class='mask' id='Mask'></div>");
                $("body").append($Mask);
                showPop();
                $("#Pop").show();
            });

            //弹出层关闭按钮点击事件
            $("#Close").click(function () {
                $("#Pop").hide();
                $("#Mask").remove();
            });

            $(".submit_box .submit_btn").click(function () {
                $("#Pop").hide();
                $("#Mask").remove();
            });
            //验证码切换 
            $("#imgCode").click(function () {
                this.src = "/Login/GetValidateCode?rnd=" + Math.random();
            });

            //窗口改变大小时,调整弹出层位置
            $(window).resize(function () {
                if (!$("#Pop").is(":visible")) {
                    return;
                };
                showPop();
            });

            //弹出层及蒙板设置
            var showPop = function () {
                var docH = $(document).height();
                var objW = $(window);
                var objP = $("#Pop");
                var objM = $("#Mask");
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
            };

            // 改变提示信息
            var changeInfo = function ($id, info) {
                $id.focus();
                $id.addClass("error_border");
                $id.parent("dd").append(Waring);
                $id.nextAll(".loginAlert").text(info).removeClass("colorGreen").addClass("colorOrange");
            };

            // 检查帐号
            function checkRegistId() {
                var $this = $("#RegisterId");
                var $alert = $this.nextAll(".loginAlert");
                if ($alert.length == 0) {
                    $this.parent("dd").append(Waring);
                    $alert = $this.nextAll(".loginAlert");
                }

                var thisVal = $this.val();
                var registerId = validateText.registerId;

                var option = {
                    url: "/Login/CheckUserName",
                    param: { uname: thisVal, rnd: Math.random() }
                };

                if (!thisVal) {
                    $this.val(registerId.isNull);
                    $alert.text(registerId.error.isNull).addClass("colorOrange");
                    return;
                }

                var flag = checkInputValue(thisVal, "帐号", $alert);

                if (!flag) {
                    $alert.addClass("colorOrange");
                    return;
                }

                if (validateRules.isEmail(thisVal)) {

                    $.extend(option, {
                        callback: function (data) {
                            if (data == "完成") {
                                $alert.text(data).removeClass("colorOrange").addClass("colorGreen");
                                $("#utype").val("yx");
                                checkRegpwd(true); // 检查密码
                            } else {
                                $alert.text(data).removeClass("colorGreen").addClass("colorOrange");
                            }
                        }
                    });

                    ajaxPost(option);
                    $("#check_phone").hide();

                    return;

                }
                if (validateRules.isMobile(thisVal)) {
                    $.extend(option, {
                        callback: function (data) {
                            if (data == "完成") {
                                $alert.text(data).removeClass("colorOrange").addClass("colorGreen");
                                $("#utype").val("sj");
                                $("#check_phone").show();
                                $("#dlYxYz").hide();
                                checkRegpwd(true); // 检查密码
                            } else {
                                $alert.text(data).removeClass("colorGreen").addClass("colorOrange");
                                $("#check_phone").hide();
                                $("#dlYxYz").show();
                            }
                        }
                    });

                    ajaxPost(option);
                    $("#check_phone").hide();

                    return;
                }

                $this.addClass("error_border");
                if (thisVal.length < 3) {
                    $alert.text(registerId.error.minLength).removeClass("colorGreen").addClass("colorOrange");
                } else if (!validateRules.isEmail(thisVal) && !validateRules.isMobile(thisVal)) {
                    $alert.text(registerId.error.wrongText).removeClass("colorGreen").addClass("colorOrange");
                } else {
                    $alert.text(registerId.error.errorElse).removeClass("colorGreen").addClass("colorOrange");
                }
                $("#check_phone").hide();

            };

            // 检查密码
            function checkRegpwd(regist) {
                var $this = $("#RegisterPassword");
                var $alert = $this.nextAll(".loginAlert");
                var $phone = $("#check_phone");

                var thisVal = $this.val();
                var pwd = validateText.pwd;

                if ($alert.length == 0) {
                    $this.parent("dd").append(Waring);
                    $alert = $this.nextAll(".loginAlert");
                }
                if (!thisVal) {
                    $alert.text(pwd.isNull).removeClass("colorGreen").addClass("colorOrange");
                    return;
                }
                if (thisVal.length < 6) {
                    $alert.text(pwd.error.minLength).removeClass("colorGreen").addClass("colorOrange");
                    return;
                }
                if (regist === true) { checkRegpwd2(regist); }// 检查确认密码


            }

            // 检查确认密码
            function checkRegpwd2(regist) {
                var $this = $("#RegisterPassword2");
                var $alert = $this.nextAll(".loginAlert");
                var $phone = $("#check_phone");
                var thisVal = $this.val();
                var regPwd1 = $("#RegisterPassword").val();
                var pwd2 = validateText.pwd2;

                if ($alert.length == 0) {
                    $this.parent("dd").append(Waring);
                    $alert = $this.nextAll(".loginAlert");
                }

                if (!thisVal) {
                    $alert.text(pwd2.isNull).removeClass("colorGreen").addClass("colorOrange");
                    return;
                }
                if (thisVal == regPwd1) {
                    $alert.text(pwd2.complete).removeClass("colorOrange").addClass("colorGreen");
                    if ($phone.css("display") == "block") {
                        registerForm();
                        return;
                    }
                    if (regist === true) {
                        checkCode(regist);
                    }// 检查验证码
                } else {
                    $alert.text(pwd2.error.wrongText).removeClass("colorGreen").addClass("colorOrange");
                    return;
                }
            }

            // 检查验证码
            function checkCode(regist) {
                var $this = $("#txtValidateCode");
                var thisVal = $this.val();
                var $alert = $this.nextAll(".loginAlert");
                var codeError = validateText.authcode.error;

                if ($alert.length == 0) {
                    $this.parent("dd").append(Waring);
                    $alert = $this.nextAll(".loginAlert");
                }

                var flag = checkInputValue(thisVal, "验证码", $alert);     // 脚本验证

                var option = {
                    url: "/Login/CheckCode",
                    param: { code: thisVal, rnd: Math.random() },
                    callback: function (data) {
                        if (data == "false") {
                            $this.nextAll(".loginAlert").text(codeError.isError).removeClass("colorGreen").addClass("colorOrange");
                        } else {
                            $this.nextAll(".loginAlert").remove();
                            if (regist === true) { registerForm(regist) }// 进行注册
                        }
                    }
                };

                if (!flag) { return; }

                ajaxPost(option);   // 请求验证码

            }
            // 注册用户
            function registerForm() {
                var registerid = $("#RegisterId").val();
                var pwd = $("#RegisterPassword").val();
                var utype = $("#utype").val();
                var mail_url = $("#hideMailUrl").val();

                var option = {
                    url: "/Login/SubmitRegister",
                    param: { uname: registerid, pwd: pwd, utype: utype, rnd: Math.random() },
                    callback: function (data) {
                        if (data == "true") {
                            if (utype == "yx") {
                                alert("注册成功，请登录邮箱确认注册！");
                                window.open(mail_url);
                                window.location.href = "/Login/Login";
                            } else {
                                alert("恭喜您，注册成功！");
                                window.location.href = "/Personal";
                            }
                        } else {
                            alert("注册失败！");
                        }
                    }
                };
                ajaxPost(option);

            }


        });

    });
})();