$(document).ready(function(){
    $(".c-mainvisual__slide").slick({
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 500,
      arrows: false,
      dots: false,
      fade: true,
      infinite: true,
      focusOnSelect: false,
      Swipe: false,
      draggable: false,
      pauseOnHover: false
    })
})

$(document).ready(function () {
    // nav
    $(".c-menu").click(function () {
      this.classList.toggle("active");
      $("body").toggleClass("is-hidden");
      $(".c-header__nav").toggleClass("c-header__nav--active");

      
    });
    $(".c-header__box a").on("click",function() {
      $(".c-menu").removeClass("active");
      $("body").removeClass("is-hidden");
      $(".c-header__nav").removeClass("c-header__nav--active");

    });
    //href # click
    $('a[href^="#"]').click(function () {
      var speed = 800;
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? "html" : href);
      var x = window.matchMedia("(max-width: 767px)");
      var position = 0;
      if (x.matches) {
        // If media query matches
        position = target.offset().top - 66;
      } else {
        position = target.offset().top - 79;
      }
      // var position = target.offset().top - 80;
      $("html, body").animate(
        {
          scrollTop: position,
        },
        speed,
        "swing"
      );
      return false;
    });
  
    //header fixed
    $(window).scroll(function () {
      if ($(window).scrollTop() > 0) {
        $(".c-header__inner").addClass("active");
        $(".c-backtop").addClass("active");
      } else {
        $(".c-header__inner").removeClass("active");
        $(".c-backtop").removeClass("active");
      }
    });
  
    // modal Img
    $("#modalClose,.c-photo__modalclose").click(function () {
      $(".c-photo__modal").fadeOut(500);
      $("body").removeClass("is-hidden");
    });
  
    $(".c-photo__item").click(function () {
      var imgUrl = $(this).find("img").attr("src");
      $("body").addClass("is-hidden");
      $(".c-photo__modalimg").attr("src", function () {
        return imgUrl;
      });
      $(".c-photo__modal").fadeIn(500);
      $("body").addClass("is-hidden");
    });
  
    // modal message
    $(".c-btn__modalclose,.c-modal__close").click(function () {
      $(".c-modal").fadeOut(500);
      $("body").removeClass("is-hidden");
    });

    var KEYCODE_ESC = 27;
    $(document).keyup(function(e) {
      if($("body").hasClass("is-hidden")) {
        if (e.keyCode == KEYCODE_ESC) {
          $(".c-modal").fadeOut(500);
          $("body").removeClass("is-hidden");
        }
      }
      
    });
  
    $(".c-message__item").on("click", function () {
      var messID = $(this).attr("id");
      $(".c-modal").attr("data-id", function () {
        if ($(this).attr("data-id") == messID) {
          $(this).fadeIn(500);
        }
      });
      $("body").addClass("is-hidden");
    });
  
    //scroll btn animation
    $(".c-mainvisual__scroll").click(function () {
      $(".p-top").addClass("scroll");
      setTimeout(function () {
        $(".p-top").addClass("scroll--hide");
      }, 600);
      setTimeout(function () {
        $(".p-top").removeClass("scroll scroll--hide");
      }, 900);
  
      var height = $(".p-top1").offset().top - 80;
      $("html,.p-top1").animate(
        {
          scrollTop: height,
        },
        800,
        "swing"
      );
    });
  
    //tab
    $(".c-tab__link").click(function () {
      $(".c-tab__link,.c-tab__pane").removeClass("active");
      $(this).addClass("active");
      var tabId = $(this).attr("data-id");
      $("#" + tabId).addClass("active");
    });
  
    //active nav menu
    $(window).scroll(function () {
      var current = $(window).scrollTop();
  
      var arr = [];
      $(".active-scroll").each(function () {
        arr.push($(this).attr("id"));
      });
  
      for (var i = 0; i < arr.length; i++) {
        var h1 = $("#" + arr[i]).offset().top;
        var h2 = $("#" + arr[i]).innerHeight() + h1;
  
        if (h1 - 81 < current && current < h2) {
          $(".c-header__link a").removeClass("is-active");
          $(".c-header__link a").attr("href", function () {
            if ($(this).attr("href") == "#" + arr[i]) {
              $(this).addClass("is-active");
            }
          });
        }
      }
    });
  });