
(function () {

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
        }
    };


    //验证文本信息
    var validateText = {
        username: {
            isNull: "邮箱/手机",        // 默认值
            error: {
                beUsed: "该用户名已被使用，请使用其它用户名注册，如果您是&quot;{1}&quot;，请<a href='../uc/login' class='flk13'>登录</a>",
                badLength: "用户名长度只能在4-20位字符之间",
                badFormat: "用户名只能由中文、英文、数字及“_”、“-”组成",
                fullNumberName: "用户名不能全为数字"
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

    // time
    function time() {
        if (wait == 0) {
            window.location.href = '/Login/Login';
            wait = 60;
        } else {
            wait--;
            $("#emtime").html(wait);
            setTimeout(function () {
                time()
            },
            1000);
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
                msg = "输入的" + msg + "中含有非法字符，“" + result + "”，请在全角下输入！"
                $msg.html(msg).show();
                return false;
            }
            return true;
        }

    }

    // 封装一层ajax post
    var ajaxPost = function (option) {
        if (option.url && option.param && option.callback) {
            // 在发送ajax请求之前验证脚本攻击
            $.post(option.url, option.param, option.callback);
        }
    };


    /*
    登录
    */
    $(function () {
        // 登录名
        $("#username").focus(function () {
            var thisVal = $(this).val();

            if (thisVal == validateText.username.isNull) {
                $(this).val("");
            }
        }).blur(function () {
            var $this = $(this);
            var thisVal = $this.val();
            var usernameText = validateText.username;

            if (!thisVal) {
                $this.val(usernameText.isNull);
                $this.next().show();
                return;
            } else {
                $this.next().hide();
            }

        });

        // 密码
        $("#password").blur(function () {
            var $this = $(this);
            var thisVal = $this.val();
            if (!thisVal) {
                $this.next().show();
            } else {
                $this.next().hide();
            }
        });

        // 验证码
        $("#txtValidateCode2").blur(checkCode);

        //验证码切换 
        $("#imgCode").click(function () {
            this.src = "/Login/GetValidateCode?rnd=" + Math.random();
        });

        // 回车事件
        $("#username,#password,#txtValidateCode2").on('keyup', function (event) {
            if (event.keyCode == 13) {
                $("#btnLogin").click();
            }
        });

        //提交登陆
        $("#btnLogin").on("click", function () {
            var $name = $("#username");
            var $pwd = $("#password");
            var $code = $("#txtValidateCode2");

            var username = $name.val();
            var pwd = $pwd.val();
            var code = $code.val();

            var username_text = validateText.username;

            if (!username || username == username_text.isNull) {
                $name.next().show();
                return;
            }
            if (!pwd) {
                $pwd.next().show();
                return;
            }
            if (!code) {
                $code.next().next().show();
                return;
            }

            // 验证码
            checkCode(true);


        });

        // 检查验证码
        function checkCode(login) {
            var $this = $("#txtValidateCode2");
            var $p = $this.next().next();
            var thisVal = $this.val();
            var codeError = validateText.authcode.error;

            var flag = checkInputValue(thisVal, "验证码", $p);     // 脚本验证

            var option = {
                url: "/Login/CheckCode",
                param: { code: thisVal, rnd: Math.random() },
                callback: function (data) {
                    $this.parent("dd").append(Waring);
                    if (data == "false") {
                        $p.html(codeError.isError).show();
                    } else {
                        $p.hide();
                        if (login) {
                            loginForm();
                        }
                    }
                }
            };

            if (!thisVal || !flag) {
                $p.show();
                return;
            }

            ajaxPost(option);   // 请求验证码
            $p.hide();

        }

        // 登录
        function loginForm() {
            var $name = $("#username");
            var $pwd = $("#password");

            var username = $name.val();
            var pwd = $pwd.val();
            var mail_url = $("#hideMailUrl").val();
            var form_url = $("#hidFromUrl").val();
            var saveSate = 0;

            if ($("#chkSave").attr("checked") == true || $("#chkSave").attr("checked") == "checked") {
                saveSate = 1;
            }
            var option = {
                url: "/Login/SubmitLogin",
                param: { uname: username, pwd: pwd, save: saveSate, rnd: Math.random() },
                callback: function (data) {
                    switch (data) {
                        case "1":
                            $pwd.next().html("密码错误").show();
                            break;
                        case "2":
                            $name.next().html("输入的用户名不存在").show();
                            break;
                        case "3":
                            alert("该用户名还没有激活，请登录邮箱激活");
                            window.open(mail_url);
                            break;
                        default:
                            if (form_url) {
                                window.location.href = form_url;
                            } else {
                                window.location.href = "/Index/Index";
                            }
                            break;
                    }
                }
            };

            if (checkInputValue(username, "登录名", $name.next()) &&
                checkInputValue(pwd, "密码", $pwd.next())) {
                ajaxPost(option);           // 验证用户
            }
        }


    });



    /*
        未拆封
    */
    $(function () {

        //找回密码
        //以下为第一步
        $("#btnstep1").click(function () {
            var uname = $("#username").val().replace(/(^\s*)|(\s*$)/g, "").replace("邮箱/手机", "");
            if (uname == "") {
                $("#username").next().show();
                return false;
            }
            else if ($("#txtValidateCode2").val() == "") {
                $("#txtValidateCode2").next().next().show();
                return false;
            }
            else if ($("#txtValidateCode2").next().next().css("display") == "block") {
                return false;
            }
            else {
                $.post("/Login/CheckUserForFindPwd", { uname: uname, rnd: Math.random() }, function (data) {
                    if (data == "1") {
                        $("#username").next().html("您输入的账号不存在").show();
                        return false;
                    }
                    else if (data == "2") {
                        $("#username").next().html("请输入账号").show();
                        return false;
                    }
                    else if (data != "") {
                        $("#step2").show().siblings().hide();
                        var arr = data.split('$');
                        $("#dduname,#dduname2").html(uname);
                        $("#ddemail").html(arr[0]);
                        $("#spanmobile").html(arr[1]);
                    }
                });
            }
        });
        //以下为第二步
        //切换验证方式
        $("ul.sltList li").each(function () {
            $(this).click(function () {
                var curindex = $(this).index();
                $("div.part").eq(curindex).show().siblings(".part").hide();
            });
        })
        //发送验证邮箱
        $("#btnSendEmail").click(function () {
            if ($("#dduname2").html() == "" || $("#ddemail").html() == "") {
                alert("账号或邮箱为空，请确定！");
                return false;
            }
            else {
                $.post("/Login/SendYzEmail", { uname: $("#dduname2").html(), email: $("#ddemail").html(), rnd: Math.random() }, function (data) {
                    if (data == "true") {
                        alert("密码修改成功，已发送至邮箱，请查阅！");
                        $("#step4").show().siblings().hide();
                        window.open($("#hideMailUrl").val());
                        time();
                    }
                    else {
                        alert("密码修改失败！");
                        return false;
                    }
                });
            }
        });


        //第二步  手机验证方式提交事件
        $("#btnStep2").click(function () {
            var txtYz = $("#identifying").val();
            if (txtYz == "") {
                alert("请输入验证码！");
                return false;
            }
            else if (txtYz != $("#hidMobileCode").val()) {
                alert("输入验证码不正确，请确认后再输！");
                return;
            }
            else {
                $("#step3").show().siblings().hide();
            }
        });
        //第三步  手机验证成功后修改密码
        $("#btnSetp3").click(function () {
            if ($("#RegisterPassword").val().replace(/(^\s*)|(\s*$)/g, "") == "" || ($("#RegisterPassword").val().replace(/(^\s*)|(\s*$)/g, "") != "" && $("#RegisterPassword").val().replace(/(^\s*)|(\s*$)/g, "").length < 6)) {
                $("#RegisterPassword").focus();
                $("#RegisterPassword").addClass("error_border");
                $("#RegisterPassword").parent("dd").append(Waring);
                $("#RegisterPassword").nextAll(".loginAlert").text("密码为空或输入的密码长度小于6").removeClass("colorGreen").addClass("colorOrange");
                return false;
            }
            else if ($("#RegisterPassword2").val() == "") {
                $("#RegisterPassword2").focus();
                $("#RegisterPassword2").addClass("error_border");
                $("#RegisterPassword2").parent("dd").append(Waring);
                $("#RegisterPassword2").nextAll(".loginAlert").text("请输入确认密码").removeClass("colorGreen").addClass("colorOrange");
                return false;
            }
            else if ($("#RegisterPassword").val() != $("#RegisterPassword2").val()) {
                $("#RegisterPassword2").focus();
                $("#RegisterPassword2").addClass("error_border");
                $("#RegisterPassword2").parent("dd").append(Waring);
                $("#RegisterPassword2").nextAll(".loginAlert").text("输入的密码不一致").removeClass("colorGreen").addClass("colorOrange");
                return false;
            }
            else {
                $.post("/Login/UpdatePwd", { user: $("#dduname").html(), pwd: $("#RegisterPassword").val(), rnd: Math.random() }, function (data) {
                    if (data == "true") {
                        alert("密码修改成功！");
                        $("#step4").show().siblings().hide();
                        wait = 60;
                        time();
                    }
                    else {
                        alert("密码修改失败！");
                        return false;
                    }
                });
            }
        });

    });


})();
