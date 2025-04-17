$(function () {

    $(".banner").addClass("ani");

    $('.banner .slick').slick({
        autoplay: true,
        dots: true,
        arrows: false,
        accessibility: true,
        speed: 500,
        // prevArrow: '.banner-prev',
        // nextArrow: '.banner-next',

    });
    $('.banner .slick').slick("slickGoTo", 0)
    $('.banner .slick').on("afterChange", function (item, index) {
        $(".banner .slick-slide a div img").removeClass("on")
        $(".banner .slick-slide.slick-current a .banner-text img").addClass("on")
        $(".banner .slick-slide.slick-current a .banner-ty").addClass("on")
    })

    $('.s1-mtext>ul').slick({
autoplaySpeed:5000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        fade: true,
        arrows: false,
        asNavFor: '.s1-mpics>ul',
    });
    $('.s1-mpics>ul').slick({
autoplaySpeed:5000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        asNavFor: '.s1-mtext>ul'
    });

    $('.s2-r>ul').slick({
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 0,
        fade: true,
        dots: false,
        arrows: true,
        prevArrow: '.s2-prev',
        nextArrow: '.s2-next',
    });

    state_speed(".s2-r", ".s2-r>ul .slick-slide", ".s2-r>ul");
    function state_speed(doc_parent, doc_child, doc_swicth) {
        var dq_state = 1;
        state();
        function state() {
            if ($(doc_child).length > $(doc_child + ".slick-active").length) {
                var all_len = $(doc_child).length - $(doc_child + ".slick-cloned").length;
            } else {
                var all_len = $(doc_child).length;
            }
            var num = dq_state / all_len * 100;
            $(doc_parent + " .slick-speed span").css("width", num + '%')
        }
        $(doc_swicth).on("afterChange", function (item, index) {
            dq_state = index.currentSlide + 1;
            $(".s2-l ul li").eq(index.currentSlide).addClass("on").siblings().removeClass("on");
            state()
        })
    }

    $(".s2-l ul li").mouseenter(function () {
        var i = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $('.s2-r>ul').slick("slickGoTo", i)
    })

    $(".s2-l ul").hover(function () {
        $('.s2-r>ul').slick("pause")
    }, function () {
        $('.s2-r>ul').slick("play")
    })


    $('.s5-r .slick>ul').slick({
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: '.s5-prev',
        nextArrow: '.s5-next',
        responsive: [{
            breakpoint: 1401,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            }
        }, {
            breakpoint: 769,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        }, {
            breakpoint: 481,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        }]
    });








    $(window).scroll(function () {
        $(".s1-m,.s6").each(function (index, element) {
            var e = $(this);
            var fix = parseInt(e.attr("fix"));
            if (!fix && fix != 0) { fix = $(window).height() * 5 * 0.1; }
            else { fix = $(window).height() * fix * 0.1; }
            if ($(window).scrollTop() >= $(e).offset().top - fix) {
                if (!$(e).hasClass("showdiv")) {
                    $(e).addClass("showdiv");
                }
            }
            else {
                if ($(e).hasClass("showdiv")) {
                    $(e).removeClass("showdiv");
                }
            }
        });

    });



});