function BrowserType() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion < 11) {
            alert("浏览器版本过低，请升级或更换浏览器（谷歌、火狐等）")
            var str = "你的浏览器版本太低了,请更新至IE11或更高版本";
            var str2 = "推荐使用:<a href='' target='_blank' style='color:blue;display:inline-block'>谷歌</a>,"
                + "<a href='' target='_blank' style='color:blue;display:inline-block'>火狐</a>,"
                + "其他双核极速模式";
            document.writeln("<pre style='text-align:center;color:#fff;background-color:#0cc; height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:1234;font-size:28px !important;'>" +
                "<h2 style='padding-top:200px;margin:0;line-height:35px;font-size:28px;'><strong>" + str + "<br/></strong></h2><h2>" +
                str2 + "</h2><h2 style='margin:0;line-height:35px;font-size:28px;'><strong>如果你的使用的是双核浏览器,请切换到极速模式访问<br/></strong></h2></pre>");
            document.execCommand("Stop");
            return false;
            return false;
        } //IE版本过低
    }
    if (isEdge) {
        var str = "你的浏览器版本太低了,请更新至IE11或更高版本";
        var str2 = "推荐使用:<a href='' target='_blank' style='color:blue;'>谷歌</a>,"
            + "<a href='' target='_blank' style='color:blue;'>火狐</a>,"
            + "其他双核极速模式";
        document.writeln("<pre style='text-align:center;color:#fff;background-color:#0cc; height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:1234;font-size:28px !important;'>" +
            "<h2 style='padding-top:200px;margin:0;line-height:35px;font-size:28px;'><strong>" + str + "<br/></strong></h2><h2>" +
            str2 + "</h2><h2 style='margin:0;line-height:35px;font-size:28px;'><strong>如果你的使用的是双核浏览器,请切换到极速模式访问<br/></strong></h2></pre>");
        document.execCommand("Stop");
        return false;
        alert("浏览器版本过低，请升级或更换浏览器（谷歌、火狐等）")
        return false;
    }
}
BrowserType() // 浏览器是否为ie


$(function () {
    if($(window).scrollTop()<=0){
        $(".head").removeClass("hide");
    }else{
        $(".head2").addClass("show");
    }
    

    var head_flag = true;
    $(window).scroll(function () {
        if ($(window).scrollTop() > 1) {
            $(".head").addClass("hide")
            $(".head2").addClass("show");
            head_flag = false;
        } else {
            $(".head").removeClass("hide")
            $(".head2").removeClass("show")
            head_flag = false;
        }
    })
    $(".search-switch").click(function () {
        $(".b-top").stop().fadeIn();

    })
    $(".t-search-zzc").click(function () {
        $(".b-top").stop().fadeOut();

    })



    $(".search-a").click(function () {
        $(".nav-search").stop().slideToggle();
    })

    navposi(".nav>ul")
    // navposi(".nav2>ul")
    function navposi(_dom) {
        // pc 二级导航不超出屏幕
        var ulLeft = $(_dom).offset().left; // nav>ul 到左边窗口距离
        var ulWidth = $(_dom).outerWidth(); // nav 的宽度
        var ejWidth = 200; // nav>ul>li>二级导航的宽度
        var ejDoem = 'div'; // nav>ul>li>二级导航的元素
        $(_dom + ">li").each(function (index, item) {
            var liLeft = $(this).offset().left; // nav>ul li 到左边窗口距离
            if ($(this).children(ejDoem).html() != null) { //判断是否有二级 
                if (liLeft + ($(this).outerWidth() / 2) - ulLeft >= ejWidth / 2) { // 当前一级导航距离左边的距离是否可以放下二级导航
                    if (ulWidth + ulLeft - ($(this).outerWidth() / 2) - liLeft > ejWidth / 2) { // 当前一级导航距离右边的距离是否可以放下二级导航
                        $(this).children(ejDoem).css("left", (-1) * (ejWidth - $(this).outerWidth()) / 2);
                    } else {
                        $(this).children(ejDoem).css("right", -1 * (ulWidth + ulLeft - liLeft - ($(this).outerWidth())));
                    }
                } else {
                    $(this).children(ejDoem).css("left", -1 * (liLeft - ulLeft));
                }
            }
        })
    }

    $(".g-nav").click(function () {
        $(".g-nav").toggleClass("on");
        $(".top-yc").stop().slideToggle(500);
        $(".tnav,.tejnav,.taddress").toggleClass("fadeInUp");
        $(".h-right").stop().fadeToggle();
        $("body").toggleClass("overhide")

        if ($(".g-nav").hasClass("on")) {
            $(".head").removeClass("hide").addClass("btncol")
            $(".head2").removeClass("show")
        } else {
            if($(window).scrollTop()>0){
                $(".head").addClass("hide").removeClass("btncol")
                $(".head2").addClass("show");
            }else{
                $(".head").removeClass("btncol")
            }
            
        }

    })


    // 导航下拉

    $(".nav>ul>li,.nav2>ul>li").hover(function () {
        $(this).addClass("on");
        $(this).children("div").css("display", "flex");
        $(this).children("div").stop().animate({ "top": "100%", "opacity": "1" }, 500);
    }, function () {
        $(this).removeClass("on");
        $(this).children("div").stop().animate({ "top": "150%", "opacity": "0" }, 500, function () {
            $(this).hide();
        });
    });




    // 移动端导航
    $(".menu").click(function () {
        $(".m-nav").animate({
            "right": "0"
        }, 300);
        $(this).hide()
        $(".close-menu").fadeIn();
        $("html").css("overflow", "hidden");
    })
    $(".close-menu").click(function () {
        $(".close-menu").fadeOut()
        $(".m-nav").animate({
            "right": "-100%"
        }, 300);
        $(".menu").fadeIn();
        $("html").css("overflow", "visible");
    })
    $(".m-nav>ul>li>span").click(function () {
        $(this).toggleClass("on").parent().siblings("li").find("span").removeClass("on")
        $(this).siblings("ul").slideToggle().parent().siblings("li").find("ul").slideUp()
    })


    //  移动端导航 二级导航展开关闭 
    $(".leftNav>h2 span").click(function () {
        $(this).toggleClass("on");
        $(".leftNav>ul").stop().slideToggle();
    })

     // 二级页面 移动端左侧三级导航 展示
     $(".leftNav>ul>li>span").click(function () {
        $(this).parent().stop().toggleClass("on").siblings("li").removeClass("on");
        $(this).siblings("ul").stop().slideToggle(300).parent().siblings().find("ul").stop().slideUp();
    })


})


