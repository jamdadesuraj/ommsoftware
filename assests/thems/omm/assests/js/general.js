/*---------------------------------------------------------------------*/
(function ($) {
  //'use strict';
  /*================= Global Variable Start =================*/
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  var IEbellow9 = !$.support.leadingWhitespace;
  var iPhoneAndiPad = /iPhone|iPod/i.test(navigator.userAgent);
  var isIE =
    navigator.userAgent.indexOf("MSIE") !== -1 ||
    navigator.appVersion.indexOf("Trident/") > 0;
  function isIEver() {
    var myNav = navigator.userAgent.toLowerCase();
    return myNav.indexOf("msie") !== -1
      ? parseInt(myNav.split("msie")[1])
      : false;
  }
  //if (isIEver () == 8) {}

  var jsFolder = "js/";
  var cssFolder = "css/";
  var ww = document.body.clientWidth,
    wh = document.body.clientHeight;
  var mobilePort = 800,
    ipadView = 1025,
    wideScreen = 1600;

  /*================= Global Variable End =================*/

  //css3 style calling
  //document.write('<link rel="stylesheet" type="text/css" href="' + cssFolder +'animate.css">');
  $.fn.verticalAlign = function () {
    return this.css(
      "padding-top",
      ($(this).parent().height() - $(this).height()) / 2 + "px"
    );
  };
  $.validator.setDefaults({ ignore: ".ignore" });

  $.validator.addMethod(
    "alphabets",
    function (value, element) {
      return this.optional(element) || /^[a-z ]*$/i.test(value);
    },
    "This field may contain only alphabets characters"
  );
  $.validator.addMethod(
    "noZeroPhone",
    function (value, element) {
      return this.optional(element) || /^(?=.*?[1-9])[0-9()-]+$/.test(value);
    },
    "Zeros not allowed"
  );
  $.validator.addMethod(
    "nozerophone",
    function (value, element) {
      return parseInt(value) != "0";
    },
    "Zeros not allowed"
  );
  $.validator.addMethod(
    "currentctc",
    function (value, element) {
      return this.optional(element) || /^[0-9]*$/i.test(value);
    },
    "Please enter only numeric characters."
  );
  $.validator.addMethod(
    "minsize",
    function (value, element, param) {
      param = param * 1000;
      return this.optional(element) || element.files[0].size >= param;
    },
    "File size must be greater than 1KB"
  );
  $.validator.addMethod(
    "checkmultiext",
    function (value, element) {
      return (
        this.optional(element) || element.files[0].name.split(".").length <= 2
      );
    },
    "Please upload valid project document (PDF, DOC, XLS or Text file)"
  );
  $.validator.addMethod(
    "checkmultispace",
    function (value, element) {
      return value === "" || value.trim().length !== 0;
    },
    "Multiple blank space not allowed"
  );
  $.validator.addMethod(
    "maxsize",
    function (value, element, param) {
      param = param * 1000;
      return this.optional(element) || element.files[0].size <= param;
    },
    "File size must be less than 3MB"
  );
  $.validator.addMethod(
    "customemail",
    function (value, element, param) {
      var pattern = new RegExp(/^([\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4})?$/);
      return pattern.test(element.value);
    },
    "Please enter a valid email address"
  );
  $.validator.addMethod(
    "checkUrl",
    function (value, element) {
      return (
        this.optional(element) ||
        /^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)/.test(
          value
        )
      );
    },
    "Please enter a valid URL."
  );
  $.validator.addMethod(
    "searchpattern",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Z0-9`!@%&()_-\s]*$/i.test(value);
    },
    "This field may contain only alphabets and numeric characters"
  );
  $.validator.addMethod(
    "phoneNewValidator",
    function (phone_number, element) {
      return (
        this.optional(element) ||
        (phone_number.length > 9 &&
          phone_number.match(/^(?=.*[0-9 ])[- +()0-9]+$/))
      );
    },
    "Please enter a valid phone number"
  );
  $.validator.addMethod(
    "mobileNewValidator",
    function (phone_number, element) {
      return (
        this.optional(element) ||
        (phone_number.length > 9 &&
          phone_number.match(/^(?=.*[0-9 ])[- +()0-9]+$/))
      );
    },
    "Please enter a valid mobile number"
  );

  /*================= On Document Load Start =================*/
  $(document).ready(function () {
    $("body").removeClass("noJS").addClass("hasJS");
    $(this).scrollTop(0);
    getWidth();
    phoneNo();
    swiperSelectable();
    cloneDiv();
    animation();
    //winHeightBlock();

    //Set Element to vertical center using padding

    setTimeout(function () {
      $(".vCenter").each(function () {
        $(this).verticalAlign();
      });
    }, 800);

    /*****Responsive Improvement - on click form open*****/
    if ($(".mobileForm").length) {
      $(".mobileForm").click(function () {
        $("body").addClass("formOpen");
        $(this).addClass("active");
      });
      $(".closeForm").click(function () {
        $("body").removeClass("formOpen");
        $(".mobileForm").removeClass("active");
      });
    }

    if ($(".techlabMenu").length) {
      $(".mobileForm").hide();
    }

    if ($(".commonBtnArrow, .commonBtn, .arrowBtnSubmit").length) {
      $(".commonBtnArrow, .commonBtn, .arrowBtnSubmit")
        .not(".cancelBtn")
        .each(function () {
          $(this).append(
            '<span class="blobBtnInner"><span class="blobBtnBlobs"><span class="blobBtnBlob"></span><span class="blobBtnBlob"></span><span class="blobBtnBlob"></span><span class="blobBtnBlob"></span></span></span>'
          );
        });
    }

    if ($(".bdrBtn").length) {
      $(".bdrBtn").each(function () {
        $(this).append(
          "<span class='line1'></span><span class='line2'></span> <span class='line3'></span><span class='line4'></span>"
        );
      });
    }

    if ($(".serviesContentPart").length) {
      slider();
    }

    if ($("#indexbanner").length) {
      var indexbannerRight;
      var indexbannerLeft;

      if ($("#indexbannerRight").length) {
        var imgPFirst = $("#indexbannerRight .swiper-slide:first-child")
          .find("img")
          .data("src");
        $("#indexbanner .twoColsBlock").append(
          "<div class='swiper-button-next1'>Next</div><div class='swiper-button-prev1'>Prev</div>"
        );

        indexbannerRight = new Swiper("#indexbannerRight .swiper-container", {
          pagination: ".swiper-pagination",
          paginationClickable: true,
          nextButton: ".swiper-button-next1",
          prevButton: ".swiper-button-prev1",
          slidesPerView: 1,
          spaceBetween: 0,
          mousewheelControl: false,
          autoplayStopOnLast: false,
          loop: true,
          autoplay: 7000,
          duration: 4000,
          preloadImages: false,
          lazyLoading: true,
          lazyLoadingInPrevNext: true,
          lazyLoadingOnTransitionStart: true,
          onInit: function (s, slide, imgP) {
            setTimeout(function () {
              var imgP = $(s.slides[s.activeIndex])
                .find(".imageWrap")
                .find("img")
                .data("src");
              if (typeof imgP === "undefined") {
                imgP = $(s.slides[s.activeIndex])
                  .find(".imageWrap")
                  .find("img")
                  .attr("src");
              }

              $(s.slides[s.activeIndex])
                .find(".imageWrap")
                .css("background-image", "url( " + imgP + " )");
            }, 500);
          },
          onTransitionStart: function (s, slide) {
            var imgP = $(s.slides[s.activeIndex]).find("img").attr("src");
            $(s.slides[s.activeIndex])
              .find(".imageWrap")
              .css("background-image", "url( " + imgP + " )");
          },
        });
      }

      if ($("#indexbannerLeft").length) {
        indexbannerLeft = new Swiper("#indexbannerLeft .swiper-container", {
          pagination: ".swiper-pagination",
          paginationClickable: true,
          nextButton: ".swiper-button-next1",
          prevButton: ".swiper-button-prev1",
          slidesPerView: 1,
          spaceBetween: 0,
          mousewheelControl: false,
          autoplayStopOnLast: false,
          effect: "fade",
          loop: true,
          autoplay: 7000,
          duration: 4000,
          preloadImages: false,
          lazyLoading: true,
          lazyLoadingInPrevNext: true,
          lazyLoadingOnTransitionStart: true,
          onSlideChangeStart: function (swiper) {
            //console.log(swiper.activeIndex);
            //swiper-lazy-loaded
          },
        });
      }

      if ($(".device").length) {
        indexbannerRight.params.control = indexbannerLeft;
        indexbannerLeft.params.control = indexbannerRight;
      }
    }
    if ($(".commonCarouselDetails").length) {
      $(".commonCarouselDetails").on("mousedown", function (e) {
        e.stopPropagation();
      });
    }

    if ($(".animatedSlider").length) {
      var path1data =
        "m5.9756,200c10.28572,5 20.57143,8 36.00001,5c10.28571,-2 21.05924,-18.48783 41.63066,-18.48783c20.57143,0 30.36934,20.48783 56.08362,18.48783c25.71429,0 32.05575,0.92686 52.62718,0.92686c20.57143,0 22.29966,-0.92686 48.01394,-0.92686c25.71429,0 5.7143,-0.5122 31.42859,0.4878c20.57143,0 16.9338,-0.92682 43.6237,0.04879c26.6899,0.97561 20.34843,-0.60975 46.06271,-0.60975c12.85715,0 16.60279,0.0122 29.61673,-0.21342c13.01393,-0.22561 14.96307,-1.15243 41.32405,0.31098c26.36097,1.46341 23.27524,-1.0244 47.03831,-0.53659c11.88154,0.2439 35.01741,0.0122 43.27525,0.20732c8.25783,0.19512 8.95471,0.81707 28.64112,0.32927c19.68641,-0.4878 20.69269,1.43902 30.63415,-1.0244";
      var path2data =
        "m5.9756,200c10.28572,5 20.57143,8 36.00001,5c10.28571,-2 19.59582,2 40.16724,2c20.57143,0 31.83276,0 57.54704,-2c25.71429,0 34.49478,-18.58536 55.06621,-18.58536c20.57143,0 19.86063,18.58536 45.57491,18.58536c25.71429,0 5.7143,-0.5122 31.42859,0.4878c20.57143,0 16.9338,-0.92682 43.6237,0.04879c26.6899,0.97561 20.34843,-0.60975 46.06271,-0.60975c12.85715,0 16.60279,0.0122 29.61673,-0.21342c13.01393,-0.22561 14.96307,-1.15243 41.32405,0.31098c26.36097,1.46341 23.27524,-1.0244 47.03831,-0.53659c11.88154,0.2439 35.01741,0.0122 43.27525,0.20732c8.25783,0.19512 8.95471,0.81707 28.64112,0.32927c19.68641,-0.4878 20.69269,1.43902 30.63415,-1.0244";
      var path3data =
        "m5.9756,200c10.28572,5 20.57143,8 36.00001,5c10.28571,-2 19.59582,2 40.16724,2c20.57143,0 31.83276,0 57.54704,-2c25.71429,0 32.54356,0.43903 53.11499,0.43903c20.57143,0 21.81185,-0.43903 47.52613,-0.43903c25.71429,0 5.7143,-0.5122 31.42859,0.4878c20.57143,0 17.4216,-19.95121 44.1115,-18.9756c26.6899,0.97561 19.86063,18.41464 45.57491,18.41464c12.85715,0 16.60279,0.0122 29.61673,-0.21342c13.01393,-0.22561 14.96307,-1.15243 41.32405,0.31098c26.36097,1.46341 23.27524,-1.0244 47.03831,-0.53659c11.88154,0.2439 35.01741,0.0122 43.27525,0.20732c8.25783,0.19512 8.95471,0.81707 28.64112,0.32927c19.68641,-0.4878 20.69269,1.43902 30.63415,-1.0244";
      var path4data =
        "m5.9756,200c10.28572,5 20.57143,8 36.00001,5c10.28571,-2 19.59582,2 40.16724,2c20.57143,0 31.83276,0 57.54704,-2c25.71429,0 32.54356,0.43903 53.11499,0.43903c20.57143,0 21.81185,-0.43903 47.52613,-0.43903c25.71429,0 5.7143,-0.5122 31.42859,0.4878c20.57143,0 14.98258,-1.41463 41.67248,-0.43902c26.6899,0.97561 22.29965,-0.12194 48.01393,-0.12194c12.85715,0 16.60279,0.0122 29.61673,-0.21342c13.01393,-0.22561 15.45087,-20.66462 41.81185,-19.20121c26.36097,1.46341 22.78744,18.48779 46.55051,18.9756c11.88154,0.2439 35.01741,0.0122 43.27525,0.20732c8.25783,0.19512 8.95471,0.81707 28.64112,0.32927c19.68641,-0.4878 20.69269,1.43902 30.63415,-1.0244";
      var path5data =
        "m5.9756,200c10.28572,5 20.57143,8 36.00001,5c10.28571,-2 19.59582,2 40.16724,2c20.57143,0 31.83276,0 57.54704,-2c25.71429,0 32.54356,0.43903 53.11499,0.43903c20.57143,0 21.81185,-0.43903 47.52613,-0.43903c25.71429,0 5.7143,-0.5122 31.42859,0.4878c20.57143,0 14.98258,-1.41463 41.67248,-0.43902c26.6899,0.97561 22.29965,-0.12194 48.01393,-0.12194c12.85715,0 16.60279,0.0122 29.61673,-0.21342c13.01393,-0.22561 14.47526,-1.15243 40.83624,0.31098c26.36097,1.46341 23.76305,-1.0244 47.52612,-0.53659c11.88154,0.2439 35.01741,0.0122 43.27525,0.20732c8.25783,0.19512 10.90593,-17.23171 30.59234,-17.71951c19.68641,-0.4878 18.74147,19.4878 28.68293,17.02438";
      var animatedSlider = new Swiper(".animatedSlider .swiper-container", {
        pagination: ".swiper-pagination",
        paginationClickable: true,
        nextButton: ".swiper-button-next1",
        prevButton: ".swiper-button-prev1",
        spaceBetween: 0,
        autoplay: 5000,
        loop: false,
        //effect: 'fade',
        hashnav: true,
        hashnavWatchState: true,
        onSlideChangeStart: function (swiper) {
          setTimeout(function () {
            $(".pagination.currentNav").removeClass("currentNav");
            $(".pagination").eq(swiper.activeIndex).addClass("currentNav");

            var clicktag = $(".currentNav").attr("id");
            //alert(clicktag);
            var clickPath = clicktag + "data";
            var currentPath = $("#bendyPath2").attr("d");
            var newPath = eval("(" + clickPath + ")");
            //$(".pagination").removeClass("currentNav");
            //$(this).addClass("currentNav");
            /*var clicktag = $(this).attr("id");
            var clickPath = (clicktag+"data")
            var activetag = $("a.active").eq();
            var currentPath = $("#bendyPath2").attr("d");
            var newPath = eval('(' + clickPath+ ')');*/

            animate({
              el: "#bendyPath2",
              // d: ["M 75 130 C 150 80 240 130 320 130", "M 75 130 C 150 130 240 80 320 130"],
              d: [currentPath, newPath],
              easing: "easeInOutBack",
              duration: 1000,
              loop: false,
              direction: "alternate",
            });
          }, 200);
        },
        onSliderMove: function (swiper) {
          setTimeout(function () {
            $(".pagination.currentNav").removeClass("currentNav");
            $(".pagination").eq(swiper.activeIndex).addClass("currentNav");

            var clicktag = $(".currentNav").attr("id");
            //alert(clicktag);
            var clickPath = clicktag + "data";
            var currentPath = $("#bendyPath2").attr("d");
            var newPath = eval("(" + clickPath + ")");
            //$(".pagination").removeClass("currentNav");
            //$(this).addClass("currentNav");
            /*var clicktag = $(this).attr("id");
                var clickPath = (clicktag+"data")
                var activetag = $("a.active").eq();
                var currentPath = $("#bendyPath2").attr("d");
                var newPath = eval('(' + clickPath+ ')');*/

            animate({
              el: "#bendyPath2",
              // d: ["M 75 130 C 150 80 240 130 320 130", "M 75 130 C 150 130 240 80 320 130"],
              d: [currentPath, newPath],
              easing: "easeInOutBack",
              duration: 1000,
              loop: false,
              direction: "alternate",
            });
          }, 200);
        },
      });

      $(".animatedSlider .swiper-container").hover(
        function () {
          animatedSlider.stopAutoplay();
        },
        function () {
          animatedSlider.startAutoplay();
        }
      );
    }

    /* IOT page slider  */
    if ($(".moreAboutIotSlider").length) {
      var moreAboutIotSlider = new Swiper(
        ".moreAboutIotSlider .swiper-container",
        {
          pagination: false,
          slidesPerView: 3,
          paginationClickable: true,
          noSwipingClass: false,
          spaceBetween: 30,
          //slideVisibleClass:"active",
          nextButton: ".swiper-button-next2",
          prevButton: ".swiper-button-prev2",
          loop: true,
          breakpoints: {
            2500: { slidesPerView: 3, spaceBetween: 20 },
            1800: { slidesPerView: 3, spaceBetween: 20 },
            1169: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 3, spaceBetween: 10, autoplay: 3000 },
            767: { slidesPerView: 2, spaceBetween: 10, autoplay: 3000 },
            530: { slidesPerView: 1, spaceBetween: 10, autoplay: 3000 },
          },
        }
      );
    }

    if ($(".blogSlider .swiper-slide > 1").length) {
      var swiper11 = new Swiper(".blogSlider .swiper-container", {
        direction: "vertical",
        centeredSlides: true,
        speed: 800,
        autoplay: 3500,
        spaceBetween: 25,
        loop: true,
        grabCursor: false,
        slidesPerView: "auto",
        autoHeight: false,
        breakpoints: {
          2500: {
            height: 120,
          },
          1023: {
            height: 120,
            spaceBetween: 20,
          },
          479: {
            height: 120,
            spaceBetween: 20,
          },
          400: {
            height: 120,
            spaceBetween: 20,
          },
        },
      });
    }

    //$('#videoBox').height($('#mep_0').height() - 100);
    if ($(".aboutAwardSlider").length) {
      $(".aboutAwardSlider").append(
        "<div class='swiper-button-next2 arrowNextBtn'>Next</div><div class='swiper-button-prev2 arrowPrevBtn'>Prev</div>"
      );
      var aboutAwardSlider = new Swiper(".aboutAwardSlider .swiper-container", {
        pagination: false,
        paginationClickable: true,
        nextButton: ".swiper-button-next2",
        prevButton: ".swiper-button-prev2",
        autoplay: 5000,
        loop: true,
        slidesPerView: 6,
        spaceBetween: 10,
        breakpoints: {
          1366: { slidesPerView: 5 },
          1023: { slidesPerView: 4 },
          768: { slidesPerView: 3 },
          640: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        },
      });
    }

    if ($(".awardSliderWrap").length) {
      $(".awardSliderWrap .swiper-container").append(
        "<div class='swiper-button-next2'>Next</div><div class='swiper-button-prev2'>Prev</div>"
      );
      var awardSliderWrap = new Swiper(".awardSliderWrap .swiper-container", {
        pagination: false,
        paginationClickable: true,
        nextButton: ".swiper-button-next2",
        prevButton: ".swiper-button-prev2",
        autoplay: 5000,
        spaceBetween: 0,
        breakpoints: {
          1800: {
            slidesPerView: 1,
            spaceBetween: 20,
            autoplay: false,
            loop: false,
          },
          979: {
            slidesPerView: 2,
            spaceBetween: 20,
            autoplay: 5000,
            loop: true,
          },
          800: {
            slidesPerView: 2,
            spaceBetween: 20,
            autoplay: 5000,
            loop: true,
          },
          639: {
            slidesPerView: 1,
            spaceBetween: 20,
            autoplay: 5000,
            loop: true,
          },
        },
      });
    }
    //Slider Measum
    if ($(".industryListSlider").length) {
      var industryListSlider = new Swiper(
        ".industryListSlider .swiper-container",
        {
          pagination: false,
          paginationClickable: true,
          slidesPerView: 2,
          spaceBetween: 30,
          autoplay: 4000,
          autoplayStopOnLast: true,
          loop: true,
          breakpoints: {
            992: {
              slidesPerView: 3,
            },
            767: {
              slidesPerView: 2,
            },
            501: {
              slidesPerView: 1,
            },
          },
        }
      );
    }
    if ($(".testimonialSlider").length) {
      $(".testimonialSlider").append(
        "<div class='swiper-button-next3'>Next</div><div class='swiper-button-prev3'>Prev</div>"
      );
      var testimonialSlider = new Swiper(
        ".testimonialSlider .swiper-container",
        {
          pagination: false,
          paginationClickable: true,
          nextButton: ".swiper-button-next3",
          prevButton: ".swiper-button-prev3",
          spaceBetween: 0,
          autoplay: true,
          loop: true,
          lazyLoading: true,
          lazyLoadingInPrevNext: true,
          //lazyLoadingOnTransitionStart:true,
          breakpoints: {
            2500: {
              slidesPerView: 1,
              spaceBetween: 20,
              autoplay: false,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
              autoplay: 5000,
            },
            767: {
              slidesPerView: 2,
              spaceBetween: 30,
              autoplay: 5000,
            },
            600: {
              slidesPerView: 1,
              spaceBetween: 20,
              autoplay: 5000,
            },
          },
        }
      );
    }
    if ($(".sucessStoriesSlider").length) {
      var sucessStoriesSlider = new Swiper(
        ".sucessStoriesSlider .swiper-container",
        {
          pagination: false,
          paginationClickable: true,
          nextButton: ".swiper-button-next2",
          prevButton: ".swiper-button-prev2",
          slideNextClass: "swiper-slide-active",
          spaceBetween: 30,
          slidesPerView: 2,
          slidesPerGroup: 2,
          autoplay: 5000,
          speed: 1000,
          loop: true,
          breakpoints: {
            1024: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 20,
              autoplay: 5000,
            },
          },
        }
      );
    }
    if ($(".footerLogoSlider").length) {
      var footerLogoSlider = new Swiper(".footerLogoSlider .swiper-container", {
        pagination: false,
        paginationClickable: true,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        autoplay: false,
        loop: true,
        spaceBetween: 0,
        slidesPerView: 6,
        breakpoints: {
          979: {
            slidesPerView: 5,
            spaceBetween: 25,
            autoplay: 5000,
          },
          767: {
            slidesPerView: 4,
            spaceBetween: 25,
            autoplay: 5000,
          },
          599: {
            slidesPerView: 3,
            spaceBetween: 25,
            autoplay: 5000,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 25,
            autoplay: 5000,
          },
          420: {
            slidesPerView: 1,
            spaceBetween: 0,
            autoplay: 5000,
          },
        },
      });
    }
    if ($(".sttlServicesIndSlider").length) {
      var sttlServicesIndSlider = new Swiper(
        ".sttlServicesIndSlider .swiper-container",
        {
          pagination: false,
          noSwipingClass: false,
          paginationClickable: true,
          slidesPerView: 2,
          nextButton: ".swiper-button-next",
          prevButton: ".swiper-button-prev",
          spaceBetween: 0,
          loop: true,
          breakpoints: {
            2500: {
              slidesPerView: 2,
            },
            1262: {
              slidesPerView: 2,
            },
            1023: {
              slidesPerView: 1,
            },
            800: {
              slidesPerView: 2,
            },
            500: {
              slidesPerView: 1,
            },
          },
        }
      );
    }
    if ($(".productDevelopmentSlider").length) {
      var productDevelopmentSlider = new Swiper(
        ".productDevelopmentSlider .swiper-container",
        {
          pagination: false,
          noSwipingClass: false,
          paginationClickable: true,
          slidesPerView: 1,
          autoplay: 5000,
          nextButton: ".swiper-button-next",
          prevButton: ".swiper-button-prev",
          spaceBetween: 0,
          loop: true,
        }
      );
    }
    if ($(".whatPeopleSlider").length) {
      var whatPeopleSlider = new Swiper(".whatPeopleSlider .swiper-container", {
        noSwipingClass: false,
        paginationClickable: true,
        slidesPerView: 1,
        autoplay: false,
        effect: "fade",
        slideVisibleClass: "active",
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        pagination: ".swiper-pagination-counter",
        paginationType: "fraction",
        spaceBetween: 0,
        loop: true,
        breakpoints: {
          1023: {
            effect: "slide",
          },
        },
      });
    }

    if ($(".dataCenterSlider").length) {
      var dataCenterSlider = new Swiper(".dataCenterSlider .swiper-container", {
        noSwipingClass: false,
        paginationClickable: true,
        slidesPerView: 1,
        autoplay: 5000,
        slideVisibleClass: "active",
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        pagination: ".swiper-pagination-counter",
        spaceBetween: 0,
        loop: true,
      });
    }

    if ($(".industryAgnostic").length) {
      var dataCenterSlider = new Swiper(".industryAgnostic .swiper-container", {
        noSwipingClass: false,
        paginationClickable: true,
        slidesPerView: 8,
        autoplay: 5000,
        spaceBetween: 10,
        slideVisibleClass: "active",
        spaceBetween: 0,
        loop: true,
        breakpoints: {
          2500: {
            slidesPerView: 8,
          },
          1000: {
            slidesPerView: 6,
          },
          800: {
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 3,
          },
          500: {
            slidesPerView: 2,
          },
        },
      });
    }

    if ($(".mobileIndSlider").length) {
      var mobileIndSlider = new Swiper(".mobileIndSlider .swiper-container", {
        pagination: false,
        paginationClickable: true,
        slidesPerView: 3,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        spaceBetween: 0,
        loop: true,
        autoplay: 5000,
        breakpoints: {
          1280: {
            slidesPerView: 3,
          },
          970: {
            slidesPerView: 3,
          },
          950: {
            slidesPerView: 2,
          },
          639: {
            slidesPerView: 1,
          },
        },
      });
    }

    if ($(".serveCarousel").length) {
      var serveCarousel = new Swiper(".serveCarousel .swiper-container", {
        pagination: false,
        paginationClickable: true,
        slidesPerView: 6,
        nextButton: ".swiper-button-next2",
        prevButton: ".swiper-button-prev2",
        spaceBetween: 0,
        loop: true,
        autoplay: 5000,
        breakpoints: {
          1280: {
            slidesPerView: 6,
          },
          970: {
            slidesPerView: 4,
          },
          950: {
            slidesPerView: 3,
          },
          639: {
            slidesPerView: 1,
          },
        },
      });
      $(".serveCarousel .swiper-container").hover(
        function () {
          serveCarousel.stopAutoplay();
        },
        function () {
          serveCarousel.startAutoplay();
        }
      );
    }

    if ($(".sectorSlider").length) {
      var sectorSlider = new Swiper(".sectorSlider .swiper-container", {
        pagination: false,
        paginationClickable: true,
        slidesPerView: 2,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        spaceBetween: 0,
        autoplay: 5000,
        autoplayStopOnLast: true,
        loop: true,
        breakpoints: {
          767: {
            slidesPerView: 2,
            centeredSlides: false,
            loop: true,
          },
          640: {
            slidesPerView: 1,
            loop: true,
          },
        },
      });
    }

    //industry Vertical Slider
    if ($(".industryVerSlider").length) {
      var industryVerSlider = new Swiper(
        ".industryVerSlider .swiper-container",
        {
          pagination: false,
          paginationClickable: true,
          slidesPerView: 4,
          nextButton: ".swiper-button-next",
          prevButton: ".swiper-button-prev",
          spaceBetween: 0,
          autoplay: 5000,
          autoplayStopOnLast: true,
          loop: true,
          breakpoints: {
            768: {
              slidesPerView: 3,
              centeredSlides: false,
              loop: true,
            },
            640: {
              slidesPerView: 2,
              loop: true,
            },
            479: {
              slidesPerView: 1,
              loop: true,
              spaceBetween: 5,
              centeredSlides: true,
            },
          },
        }
      );
    }

    //Our Brand Slider
    if ($(".ourBrandSlider").length) {
      var ourBrandSlider = new Swiper(".ourBrandSlider .swiper-container", {
        pagination: false,
        paginationClickable: true,
        slidesPerView: 5,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        spaceBetween: 0,
        autoplay: 4000,
        autoplayStopOnLast: true,
        loop: true,
        breakpoints: {
          992: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          479: {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 5,
          },
        },
      });
    }

    //Alliances Slider
    if ($(".alliancesSlider").length) {
      var alliancesSlider = new Swiper(".alliancesSlider .swiper-container", {
        pagination: false,
        paginationClickable: true,
        slidesPerView: 5,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        spaceBetween: 0,
        autoplay: 4000,
        autoplayStopOnLast: true,
        loop: true,
        breakpoints: {
          992: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          479: {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 5,
          },
        },
      });
    }

    //why silvertouch Slider
    if ($(".whySilvertouchSlider").length) {
      var whySilvertouchSlider = new Swiper(
        ".whySilvertouchSlider .swiper-container",
        {
          pagination: false,
          paginationClickable: true,
          slidesPerView: 4,
          nextButton: ".swiper-button-next",
          prevButton: ".swiper-button-prev",
          spaceBetween: 0,
          autoplay: 3500,
          autoplayStopOnLast: true,
          loop: true,
          breakpoints: {
            1100: {
              slidesPerView: 3,
            },
            850: {
              slidesPerView: 2,
            },
            639: {
              slidesPerView: 1,
              centeredSlides: true,
              spaceBetween: 5,
            },
          },
        }
      );
    }

    //why silvertouch Slider
    if ($(".microTechServicesSlider").length) {
      var whySilvertouchSlider = new Swiper(
        ".microTechServicesSlider .swiper-container",
        {
          pagination: false,
          paginationClickable: true,
          slidesPerView: 4,
          nextButton: ".swiper-button-next",
          prevButton: ".swiper-button-prev",
          spaceBetween: 0,
          autoplay: 3500,
          autoplayStopOnLast: true,
          loop: true,
          breakpoints: {
            1100: {
              slidesPerView: 2,
              spaceBetween: 60,
            },
            850: {
              slidesPerView: 2,
              spaceBetween: 60,
            },
            639: {
              slidesPerView: 1,
              centeredSlides: true,
              spaceBetween: 20,
            },
          },
        }
      );
    }

    // Home Our Services Slider
    if ($(".servicesSliderBlock .swiper-slide").length > 5) {
      $(".servicesSliderBlock .swiper-container").append(
        "<div class='swiper-pagination'></div>"
      );
      var servicesSliderBlock = new Swiper(
        ".servicesSliderBlock .swiper-container",
        {
          pagination: ".swiper-pagination",
          slidesPerView: 5,
          paginationClickable: true,
          spaceBetween: 30,
          speed: 1000,
          mousewheelControl: false,
          autoplayStopOnLast: false,
          autoplay: 5000,
          loop: true,
          breakpoints: {
            2600: {
              slidesPerView: 6,
              spaceBetween: 15,
            },
            1800: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
            1169: {
              slidesPerView: 4,
              spaceBetween: 15,
              loop: true,
            },
            979: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            767: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            479: {
              slidesPerView: 1,
              centeredSlides: false,
              spaceBetween: 0,
            },
          },
        }
      );
    }

    // Home Our Services Slider
    if ($(".homeEventSlider .swiper-slide").length > 3) {
      var homeEventSlider = new Swiper(".homeEventSlider .swiper-container", {
        direction: "vertical",
        pagination: false,
        slidesPerView: 3,
        spaceBetween: 0,
        speed: 1000,
        mousewheelControl: false,
        autoplayStopOnLast: false,
        autoplay: 5000,
        loop: true,
      });

      $(".homeEventSlider .swiper-container").hover(
        function () {
          homeEventSlider.stopAutoplay();
        },
        function () {
          homeEventSlider.startAutoplay();
        }
      );
    }

    if ($(".careerEventSlider .swiper-slide").length) {
      var careerEventSlider = new Swiper(
        ".careerEventSlider .swiper-container",
        {
          direction: "horizontal",
          pagination: false,
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 1000,
          mousewheelControl: false,
          autoplayStopOnLast: false,
          autoplay: 5000,
          loop: true,
        }
      );

      $(".careerEventSlider .swiper-container").hover(
        function () {
          careerEventSlider.stopAutoplay();
        },
        function () {
          careerEventSlider.startAutoplay();
        }
      );
    }

    // Home Our Services Mobile Slider
    if ($(".servicesMobSlider .swiper-slide").length) {
      $(".servicesMobSlider .swiper-container").append(
        "<div class='swiper-pagination'></div>"
      );
      var servicesMobSlider = new Swiper(
        ".servicesMobSlider .swiper-container",
        {
          pagination: ".swiper-pagination",
          slidesPerView: 5,
          paginationClickable: true,
          spaceBetween: 30,
          speed: 1000,
          mousewheelControl: false,
          autoplayStopOnLast: false,
          autoplay: 5000,
          loop: true,
          breakpoints: {
            1169: {
              slidesPerView: 4,
              spaceBetween: 0,
              loop: true,
            },
            979: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            767: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            479: {
              slidesPerView: 1,
              centeredSlides: false,
              spaceBetween: 0,
            },
          },
        }
      );
    }

    if ($(".copeUpSlider").length) {
      $(".copeUpSlider").append(
        "<div class='swiper-button-next'>Next</div><div class='swiper-button-prev'>Prev</div>"
      );
      var copeUpSlider = new Swiper(".copeUpSlider .swiper-container", {
        pagination: ".swiper-pagination",
        paginationClickable: true,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheelControl: false,
        autoplayStopOnLast: false,
        loop: true,
        autoplay: 7000,
        duration: 4000,
      });
    }

    //about page technologies
    if ($(".technologiesSlider .swiper-slide").length) {
      $(".technologiesSlider .swiper-container").append(
        "<div class='swiper-pagination'></div>"
      );
      var technologiesSlider = new Swiper(
        ".technologiesSlider .swiper-container",
        {
          pagination: ".swiper-pagination",
          slidesPerView: 6,
          paginationClickable: true,
          spaceBetween: 10,
          speed: 1000,
          autoplay: 5000,
          loop: false,
          breakpoints: {
            1024: { slidesPerView: 5 },
            1023: { slidesPerView: 4 },
            767: { slidesPerView: 3 },
            639: { slidesPerView: 2 },
            479: { slidesPerView: 1 },
          },
        }
      );
    }

    //college slider
    if ($(".collegesSlider .swiper-slide").length) {
      $(".collegesSlider .swiper-container").append(
        "<div class='swiper-pagination'></div>"
      );
      //$(".collegesSlider").append("<div class='swiper-button-next'>Next</div><div class='swiper-button-prev'>Prev</div>");
      var technologiesSlider = new Swiper(".collegesSlider .swiper-container", {
        pagination: false,
        slidesPerView: 5,
        paginationClickable: true,
        //nextButton: '.swiper-button-next',
        //prevButton: '.swiper-button-prev',
        spaceBetween: 10,
        speed: 1000,
        autoplay: 5000,
        loop: false,
        breakpoints: {
          1024: { slidesPerView: 5 },
          1023: { slidesPerView: 4 },
          767: { slidesPerView: 3 },
          639: { slidesPerView: 2 },
          479: { slidesPerView: 1 },
        },
      });
    }

    //college slider
    if ($(".techIndustriesSlider .swiper-slide").length) {
      $(".techIndustriesSlider .swiper-container").append(
        "<div class='swiper-pagination'></div>"
      );
      //$(".collegesSlider").append("<div class='swiper-button-next'>Next</div><div class='swiper-button-prev'>Prev</div>");
      var technologiesSlider = new Swiper(
        ".techIndustriesSlider .swiper-container",
        {
          pagination: false,
          slidesPerView: 5,
          paginationClickable: true,
          //nextButton: '.swiper-button-next',
          //prevButton: '.swiper-button-prev',
          spaceBetween: 10,
          speed: 1000,
          autoplay: 5000,
          loop: false,
          breakpoints: {
            1024: { slidesPerView: 4 },
            1023: { slidesPerView: 4 },
            767: { slidesPerView: 3 },
            639: { slidesPerView: 2 },
            479: { slidesPerView: 1 },
          },
        }
      );
    }

    //about page technologies
    if ($(".empanelmentsSlider .swiper-slide").length > 5) {
      $(".empanelmentsSlider .swiper-container").append(
        "<div class='swiper-pagination'></div>"
      );
      var technologiesSlider = new Swiper(
        ".empanelmentsSlider .swiper-container",
        {
          pagination: ".swiper-pagination",
          slidesPerView: 5,
          paginationClickable: true,
          spaceBetween: 10,
          slidesPerColumn: 2,
          speed: 1000,
          autoplay: 5000,
          loop: false,
          breakpoints: {
            1024: { slidesPerView: 5 },
            1023: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            639: { slidesPerView: 2 },
            479: { slidesPerView: 1 },
          },
        }
      );
    }

    if ($(".industriesSlider").length) {
      $(".industriesSlider").append(
        "<div class='swiper-button-next arrowNextBtn'>Next</div><div class='swiper-button-prev arrowPrevBtn'>Prev</div>"
      );
      var industriesSlider = new Swiper(".industriesSlider .swiper-container", {
        //pagination: '.swiper-pagination',
        paginationClickable: false,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        slidesPerView: 4,
        spaceBetween: 0,
        mousewheelControl: false,
        autoplayStopOnLast: false,
        loop: true,
        autoplay: false,
        duration: 4000,
        breakpoints: {
          1169: { slidesPerView: 3 },
          1023: { slidesPerView: 4 },
          767: { slidesPerView: 3 },
          639: { slidesPerView: 2 },
          479: { slidesPerView: 1 },
        },
      });
    }

    if ($(".rpaindustriesSlider").length) {
      $(".rpaindustriesSlider").append(
        "<div class='swiper-button-next arrowNextBtn'>Next</div><div class='swiper-button-prev arrowPrevBtn'>Prev</div>"
      );
      var btnnext = $(".rpaindustriesSlider").find(".swiper-button-next");
      var btnprev = $(".rpaindustriesSlider").find(".swiper-button-prev");
      var industriesSlider = new Swiper(
        ".rpaindustriesSlider .swiper-container",
        {
          pagination: ".swiper-pagination",
          paginationClickable: true,
          nextButton: btnnext,
          prevButton: btnprev,
          slideVisibleClass: ".active",
          slidesPerView: 6,
          spaceBetween: 0,
          mousewheelControl: false,
          autoplayStopOnLast: false,
          loop: true,
          autoplay: 5000,
          duration: 4000,
          breakpoints: {
            1169: { slidesPerView: 5 },
            1023: { slidesPerView: 4 },
            767: { slidesPerView: 3 },
            639: { slidesPerView: 2 },
            479: { slidesPerView: 1 },
          },
        }
      );
    }

    if ($(".positibiletiesSlider").length) {
      //$(".positibiletiesSlider").append("<div class='swiper-button-next arrowNextBtn'>Next</div><div class='swiper-button-prev arrowPrevBtn'>Prev</div>");
      //var btnnext = $(".positibiletiesSlider").find(".swiper-button-next");
      //var btnprev = $(".positibiletiesSlider").find(".swiper-button-prev");
      var industriesSlider = new Swiper(
        ".positibiletiesSlider .swiper-container",
        {
          pagination: ".swiper-pagination",
          paginationClickable: true,
          //nextButton: btnnext,
          //prevButton: btnprev,
          slideNextClass: "swiper-slide-active",
          slidesPerView: 2,
          spaceBetween: 0,
          mousewheelControl: false,
          autoplayStopOnLast: false,
          simulateTouch: false,
          loop: false,
          autoplay: false,
          direction: "vertical",
          duration: 4000,
        }
      );
    }
    if ($(".positibiletiesSliderMob").length) {
      var industriesSlider = new Swiper(
        ".positibiletiesSliderMob .swiper-container",
        {
          pagination: ".swiper-pagination",
          paginationClickable: true,
          nextButton: ".swiper-button-next",
          prevButton: ".swiper-button-prev",
          slideNextClass: "swiper-slide-active",
          slidesPerView: 2,
          spaceBetween: 0,
          mousewheelControl: false,
          autoplayStopOnLast: false,
          slidesPerGroup: 1,
          simulateTouch: false,
          loop: true,
          autoplay: 5000,
          duration: 4000,
          breakpoints: {
            800: { slidesPerView: 2 },
            639: { slidesPerView: 2 },
            576: { slidesPerView: 1 },
          },
        }
      );
    }
    if ($(".technologiesSliderLogo").length) {
      $(".technologiesSliderLogo").append(
        "<div class='swiper-button-next carouselNextBtn'>Next</div><div class='swiper-button-prev carouselPrevBtn'>Prev</div>"
      );
      var technologiesSliderLogo = new Swiper(
        ".technologiesSliderLogo .swiper-container",
        {
          pagination: ".swiper-pagination",
          paginationClickable: true,
          nextButton: ".swiper-button-next",
          prevButton: ".swiper-button-prev",
          spaceBetween: 0,
          loop: true,
          autoplay: 4000,
          speed: 700,
        }
      );

      $(".technologiesSliderLogo .swiper-container").hover(
        function () {
          technologiesSliderLogo.stopAutoplay();
        },
        function () {
          technologiesSliderLogo.startAutoplay();
        }
      );
    }

    if ($(".howWeDoItSlider").length) {
      var howWeDoItSlider = new Swiper(".howWeDoItSlider .swiper-container", {
        pagination: ".swiper-pagination",
        paginationClickable: true,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        spaceBetween: 0,
        effect: "fade",
        loop: true,
        autoplay: 4000,
        speed: 700,
      });
    }

    if ($(".howWeDoContentChangeSlider").length) {
      var howWeDoContentChangeSlider = new Swiper(
        ".howWeDoContentChangeSlider .swiper-container",
        {
          pagination: ".swiper-pagination",
          paginationClickable: true,
          nextButton: ".swiper-button-next",
          prevButton: ".swiper-button-prev",
          spaceBetween: 0,
          effect: "fade",
          loop: true,
          autoplay: 4000,
          speed: 700,
        }
      );
    }
    if ($(".marqueeScrolling li").length > 1) {
      var $mq = $(".marquee").marquee({
        speed: 25000,
        gap: 0,
        duplicated: true,
        pauseOnHover: true,
      });
      $(".btnMPause").toggle(
        function () {
          $(this).addClass("play");
          $(this).text("Play");
          $mq.marquee("pause");
        },
        function () {
          $(this).removeClass("play");
          $(this).text("Pause");
          $mq.marquee("resume");
          return false;
        }
      );
    }

    //about page technologies
    if ($(".technoLogoSlider .swiper-slide").length) {
      $(".technoLogoSlider").append("<div class='swiper-pagination'></div>");
      var technologiesSlider = new Swiper(
        ".technoLogoSlider .swiper-container",
        {
          pagination: ".swiper-pagination",
          slidesPerView: 5,
          paginationClickable: true,
          spaceBetween: 20,
          speed: 1000,
          autoplay: 5000,
          // autoplay:false,
          loop: false,
          breakpoints: {
            1024: { slidesPerView: 5 },
            1023: { slidesPerView: 4 },
            767: { slidesPerView: 3 },
            639: { slidesPerView: 2 },
            479: { slidesPerView: 1 },
          },
        }
      );
    }

    if ($(".technoLogoSliderFour .swiper-slide").length) {
      $(".technoLogoSliderFour").append(
        "<div class='swiper-pagination'></div>"
      );
      var technologiesSlider = new Swiper(
        ".technoLogoSliderFour .swiper-container",
        {
          pagination: ".swiper-pagination",
          slidesPerView: 4,
          paginationClickable: true,
          spaceBetween: 20,
          speed: 1000,
          // autoplay:5000,
          autoplay: false,
          loop: false,
          breakpoints: {
            1024: { slidesPerView: 4 },
            1023: { slidesPerView: 4 },
            767: { slidesPerView: 3 },
            639: { slidesPerView: 2 },
            479: { slidesPerView: 1 },
          },
        }
      );
    }
    if ($(".alianceSlider .swiper-slide").length) {
      $(".alianceSlider").append("<div class='swiper-pagination'></div>");
      var technologiesSlider = new Swiper(".alianceSlider .swiper-container", {
        pagination: ".swiper-pagination",
        slidesPerView: 7,
        paginationClickable: true,
        spaceBetween: 20,
        speed: 1000,
        // autoplay:5000,
        autoplay: false,
        loop: false,
        breakpoints: {
          1024: { slidesPerView: 7 },
          1023: { slidesPerView: 6 },
          767: { slidesPerView: 5 },
          639: { slidesPerView: 3 },
          479: { slidesPerView: 2 },
        },
      });
    }

    //bigData technologies
    if ($(".bigDataTechSlider .swiper-slide").length) {
      $(".bigDataTechSlider").append("<div class='swiper-pagination'></div>");
      var technologiesSlider = new Swiper(
        ".bigDataTechSlider .swiper-container",
        {
          pagination: ".swiper-pagination",
          slidesPerView: 5,
          paginationClickable: true,
          spaceBetween: 20,
          speed: 1000,
          autoplay: 5000,
          loop: false,
          breakpoints: {
            1024: { slidesPerView: 5 },
            1023: { slidesPerView: 4 },
            767: { slidesPerView: 3 },
            639: { slidesPerView: 2 },
            479: { slidesPerView: 1 },
          },
        }
      );
    }
    //bigData technologies
    if ($(".digitalTransSlider .swiper-slide").length) {
      var technologiesSlider = new Swiper(
        ".digitalTransSlider .swiper-container",
        {
          pagination: false,
          slidesPerView: 4,
          paginationClickable: true,
          spaceBetween: 20,
          speed: 1000,
          autoplay: 5000,
          loop: false,
          breakpoints: {
            1024: { slidesPerView: 3 },
            1023: { slidesPerView: 3 },
            767: { slidesPerView: 2 },
            639: { slidesPerView: 2 },
            479: { slidesPerView: 1, spaceBetween: 0 },
          },
        }
      );
    }

    //Home Enterprise IT Services Slider
    if ($(".enterpriseSerSlider").length) {
      var enterpriseSerSlider = new Swiper(
        ".enterpriseSerSlider .swiper-container",
        {
          speed: 800,
          spaceBetween: 0,
          slidesPerView: 3,
          centerSlide: true,
          loop: true,
          autoplay: 2000,
          pagination: ".enterpriseSerSlider-swiper-pagination",
          paginationClickable: true,
          navigation: {
            nextEl: ".enterpriseSerSlider-next",
            prevEl: ".enterpriseSerSlider-prev",
          },
          breakpoints: {
            639: {
              slidesPerView: 3,
              simulateTouch: true,
              centerSlide: true,
            },
            767: {
              slidesPerView: 3,
              simulateTouch: true,
              centerSlide: true,
            },
            992: {
              slidesPerView: 3,
              simulateTouch: true,
              centerSlide: true,
            },
            1169: {
              slidesPerView: 3,
              simulateTouch: true,
              centerSlide: true,
            },
          },
        }
      );
    }

    //Home Enterprise Software Services Slider
    if ($(".enterSoftSerSlider").length) {
      var enterSoftSerSlider = new Swiper(
        ".enterSoftSerSlider .swiper-container",
        {
          speed: 800,
          spaceBetween: 0,
          slidesPerView: 3,
          centerSlide: true,
          loop: true,
          autoplay: 2000,
          pagination: ".enterSoftSerSlider-swiper-pagination",
          paginationClickable: true,
          navigation: {
            nextEl: ".enterSoftSerSlider-next",
            prevEl: ".enterSoftSerSlider-prev",
          },
          breakpoints: {
            639: {
              slidesPerView: 3,
              simulateTouch: true,
              centerSlide: true,
            },
            767: {
              slidesPerView: 3,
              simulateTouch: true,
              centerSlide: true,
            },
            992: {
              slidesPerView: 3,
              simulateTouch: true,
              centerSlide: true,
            },
            1169: {
              slidesPerView: 3,
              simulateTouch: true,
              centerSlide: true,
            },
          },
        }
      );
    }

    //page scroll
    if (
      $(
        ".inquiryBtn, .silverCMSInq .commonBtnArrow, .possiblityIos .commonBtnArrow, .cmsServices .positonBlockContent, .dataCenterRow .commonBtnArrow"
      ).length
    ) {
      $(
        ".inquiryBtn, .silverCMSInq .commonBtnArrow, .possiblityIos .commonBtnArrow, .cmsServices .positonBlockContent, .dataCenterRow .commonBtnArrow"
      ).click(function (e) {
        e.preventDefault();
        var targetLink = $(this).attr("href");
        $("html,body").animate(
          {
            scrollTop: $(targetLink).offset().top,
          },
          2000,
          function () {
            if ($("#inquiryform").length) {
              $("#inquiryform .feildRow").eq(0).find("input").focus();
            }
            /*if($("#quickinquiryform").length){
                        $("#quickinquiryform .feildRow").eq(0).find("input").focus();
                    }*/
            if ($("#getquoteform").length) {
              $("#getquoteform .feildRow").eq(0).find("input").focus();
            }
          }
        );
      });
    }

    if (
      $(
        "#innerBanner .commonBtnArrow.hashLink, .innerBannerSmall, .thankYouPage"
      ).length === 0
    ) {
      $(".inquiryBtnWrap").fadeIn();
      //$(".floatedQuoteForm").fadeIn();

      $(window).scroll(function () {
        if ($(".contactUs, .innerContactInfo").hasClass("activeBlock")) {
          $(".inquiryBtnWrap").fadeOut();
        } else {
          $(".inquiryBtnWrap").fadeIn();
        }
      });
    }

    function smoothScrollingTo(target) {
      var position = $(target).offset().top;
      if ($(target).closest(".bannerTabs").length) {
        position = $(target).offset().top - 50;
      }
      $("html,body").animate({ scrollTop: position }, 1200);
    }
    if ($(".hashLink").length) {
      $(".hashLink[href*=\\#]").on("click", function (e) {
        //e.preventDefault();
        smoothScrollingTo(this.hash);
      });
      /*$(document).ready(function(){
              smoothScrollingTo(location.hash);
            });*/
    }

    // Multiple Ticker
    if ($(".ticker").length) {
      $(".ticker").each(function (i) {
        $(this)
          .addClass("tickerDiv" + i)
          .attr("id", "ticker" + i);
        $("#ticker" + i)
          .find(".tickerDivBlock")
          .first()
          .addClass("newsTikker" + i)
          .attr("id", "newsTikker" + i);
        $("#ticker" + i)
          .find("a.playPause")
          .attr("id", "stopNews" + i);
        $("#newsTikker" + i).vTicker({
          speed: 1e3,
          pause: 4e3,
          animation: "fade",
          mousePause: false,
          showItems: 3,
          height: 150,
          direction: "up",
        });
        $("#stopNews" + i).click(function () {
          if ($(this).hasClass("stop")) {
            $(this)
              .removeClass("stop")
              .addClass("play")
              .text("Play")
              .attr("title", "Play");
          } else {
            $(this)
              .removeClass("play")
              .addClass("stop")
              .text("Pause")
              .attr("title", "pause");
          }
          return false;
        });
      });
    }

    if ($(".topRightLinks li:last-child > a.popup-modal").length === 0) {
      $(".topRightLinks li:last-child > a").addClass("popup-modal");
      if (screen.width > 767) {
        $("#menu-top-right-menu li .popup-modal").click(function () {
          setTimeout(function () {
            $("#requestCallFrom .feildRow").eq(1).find("input").focus();
          }, 300);
        });
      }
    }

    if ($(".floatedQuoteForm").length) {
      $(".innerBannerPart .commonBtnArrow").click(function () {
        setTimeout(function () {
          $(".floatedQuoteFormWrap .feildRow").eq(0).find("input").focus();
        }, 300);
      });
    }

    if (screen.width > 767) {
      if ($(".floatedQuoteForm").length) {
        $(".floatedQuoteFormBtn").click(function () {
          setTimeout(function () {
            $(".floatedQuoteFormWrap .feildRow").eq(0).find("input").focus();
          }, 300);
        });
      }
    }

    if ($(".jobApplyBtn").length) {
      $(".jobApplyBtn").click(function () {
        var jobId = $(this).attr("data-jobid");
        $("#career_job_title option").removeAttr("selected");
        setTimeout(function () {
          $("#career_firstname").focus();
          $("#career_job_title option[data-joboption='" + jobId + "']").prop(
            "selected",
            true
          );

          $("#career_job_title").trigger("render.customSelect");
        }, 800);
      });
    }

    if ($(".popup-modal").length) {
      $(".popup-modal").magnificPopup({
        type: "inline",
        preloader: false,
        focus: "#username",
        CloseOnBgClick: true,
        enableEscapeKey: true,
        fixedContentPos: true,
        callbacks: {
          open: function () {
            if ($(".customSelect").length) {
              $(".customSelect").trigger("render.customSelect");
            }
          },
          close: function () {
            // Will fire when popup is closed
          },
        },
      });
    }

    $(document).on("click", ".popup-modal-dismiss", function (e) {
      e.preventDefault();
      $.magnificPopup.close();
    });

    if ($(".popup-youtube, .popup-vimeo, .popup-gmaps, .popup-iframe").length) {
      $(
        ".popup-youtube, .popup-vimeo, .popup-gmaps, .popup-iframe"
      ).magnificPopup({
        isableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 0,
        preloader: false,
        fixedContentPos: true,
        iframe: {
          markup:
            '<div class="mfp-iframe-scaler">' +
            '<div class="mfp-close"></div>' +
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
            "</div>", // HTML markup of popup, `mfp-close` will be replaced by the close button

          patterns: {
            youtube: {
              index: "youtube.com/", // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

              id: "v=", // String that splits URL in a two parts, second part should be %id%
              // Or null - full URL will be returned
              // Or a function that should return %id%, for example:
              // id: function(url) { return 'parsed id'; }

              src: "//www.youtube.com/embed/%id%?autoplay=1", // URL that will be set as a source for iframe.
            },
            vimeo: {
              index: "vimeo.com/",
              id: "/",
              src: "//player.vimeo.com/video/%id%?autoplay=1",
            },
            gmaps: {
              index: "//maps.google.",
              src: "%id%&output=embed",
            },

            // you may add here more sources
          },

          srcAction: "iframe_src", // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
        },
      });
    }

    //shareIcon
    if ($(".share-items22").length) {
      $(".share-items").find(".share-item").remove();
      $(".share-items").sharetastic();
    }

    if ($(".shareBtnWrap").length) {
      $(".share-toggle-button").each(function () {
        $(this).parent().removeClass("share");
        $(this).next().addClass("share");
        var $toggleButton = $(this),
          $shareButtons = $toggleButton.next("ul").find(".share-button"),
          menuOpen = false,
          buttonsNum = $shareButtons.length,
          buttonsMid = buttonsNum,
          spacing = 70;
        function openShareMenu() {
          TweenMax.to($toggleButton, 0.1, {
            scaleX: 0.6,
            scaleY: 0.6,
            ease: Quad.easeOut,
            onComplete: function () {
              TweenMax.to($toggleButton, 0.8, {
                scale: 0.95,
                ease: Elastic.easeOut,
                easeParams: [1.1, 0.6],
              });
              TweenMax.to($toggleButton.children(".share-icon"), 0.8, {
                scale: 0.95,
                ease: Elastic.easeOut,
                easeParams: [1.1, 0.6],
              });
            },
          });
          $shareButtons.each(function (i) {
            var $cur = $(this);
            var pos = i - buttonsMid;
            if (pos >= 0) {
              pos += 1;
            }
            var dist = Math.abs(pos);
            $cur.css({ zIndex: buttonsMid - dist });
            TweenMax.to($cur, 1.1 * dist, {
              x: pos * spacing,
              scaleY: 0.6,
              scaleX: 0.6,
              ease: Elastic.easeOut,
              easeParams: [1.01, 0.6],
            });
            TweenMax.to($cur, 0.8, {
              delay: 0.2 * dist - 0.1,
              scale: 0.95,
              ease: Elastic.easeOut,
              easeParams: [1.1, 0.6],
            });
            TweenMax.fromTo(
              $cur.children(".share-icon"),
              0.2,
              { scale: 0 },
              { delay: 0.2 * dist - 0.1, scale: 1, ease: Quad.easeInOut }
            );
          });
        }
        function closeShareMenu() {
          TweenMax.to(
            [$toggleButton, $toggleButton.children(".share-icon")],
            1.4,
            {
              delay: 0.01,
              scale: 1,
              ease: Elastic.easeOut,
              easeParams: [1.1, 0.3],
            }
          );
          $shareButtons.each(function (i) {
            var $cur = $(this);
            var pos = i - buttonsMid;
            if (pos >= 0) {
              pos += 1;
            }
            var dist = Math.abs(pos);
            $cur.css({ zIndex: dist });
            TweenMax.to($cur, 0.4 + (buttonsMid - dist) * 0.4, {
              x: 0,
              scale: 0.95,
              ease: Quad.easeInOut,
            });
            TweenMax.to($cur.children(".share-icon"), 0.2, {
              scale: 0,
              ease: Quad.easeIn,
            });
          });
        }
        function toggleShareMenu() {
          menuOpen = !menuOpen;
          menuOpen ? openShareMenu() : closeShareMenu();
        }
        $(this).on("click", function (event) {
          event.preventDefault();
          toggleShareMenu();
          $(this).parent().toggleClass("active");
        });
      });
    }

    if ($("input[type=file]").length) {
      $("input[type=file]").customFile();
    }
    if ($(".customSelect").length) {
      $(".customSelect").customSelect();
    }

    //showmore
    /* if($(".showMore").length){
            $(".showMore").on("click",function(e){
                e.preventDefault();		
                $(".showMoreDetial").toggleClass("active");
                $(this).toggleClass("active");
                if($(this).hasClass("active")){
                 $(".showMoreDetial").animate({height:175},800);	
                $(this).html("Show Less <span class='line-1'></span> <span class='line-2'></span> <span class='line-3'></span> <span class='line-4'></span>");	
                    }
                else{
                     $(".showMoreDetial").animate({height:75},800);	
                    $(this).html("Show More <span class='line-1'></span> <span class='line-2'></span> <span class='line-3'></span> <span class='line-4'></span>");	
                    }					
            });					  
         }*/

    if ($(".innerBannerPart").length) {
      $(".innerBannerPart").each(function () {
        if ($(".innerBannerPart > img").length) {
          var imagePath = $(".innerBannerPart > img").attr("src");
          $(this).css("background-image", "url( " + imagePath + " )");
        }
      });
    }
    if ($(".bgBackground").length) {
      $(".bgBackground").each(function () {
        var imagePath = $(this).find("img").attr("src");
        $(this).css("background-image", "url( " + imagePath + " )");
      });
    }
    if ($(".teamMemberImgBg").length) {
      $(".teamMemberImgBg").each(function () {
        var imagePath = $(this).find("img").attr("src");
        $(this).css("background-image", "url( " + imagePath + " )");
      });
    }

    // Responsive Tabing Script
    if ($(".resTab").length) {
      $(".resTab").responsiveTabs({
        rotate: false,
        startCollapsed: "tab", //accordion
        collapsible: "accordion", //accordion
        scrollToAccordion: true,
        scrollToAccordionOnLoad: false,
      });

      /*setTimeout(function(){
                if( $(".mobile").length) {	
                    $(".r-tabs-accordion-title.r-tabs-state-active").trigger("click");
                }					
            }, 3000);*/
    }

    //New Tabs
    if ($(".customTab").length) {
      $(document).on("click", ".tabNavigation a", function (e) {
        e.preventDefault();
        $(this)
          .parents(".customTab")
          .find(".tabNavigation li")
          .removeClass("active");
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
        var tab = $(this).attr("href");
        $(this)
          .parents(".customTab")
          .find(".tabContainer")
          .find(".customTabContent")
          .not(tab)
          .css("display", "none");

        $(tab).fadeIn();
      });

      $(".exploreSapTabs.customTab .customTabContent:nth-child(2)").hide();

      $(".tabNavigation").each(function () {
        if ($(this).hasClass("tabNavigation2")) {
        } else {
          $(this).find("li:first").addClass("active");
        }
        $(".tabNavigation li.active a").trigger("click");
      });

      if ($(".multipleTabs").length) {
        $(document).on("click", ".tabNavigation a", function (e) {
          e.preventDefault();
          var tab = "#" + $(this).attr("data-rel");
          if ($(this).hasClass("active")) {
            $(tab).show();
          } else {
            $(".multipleTabs .tabNav li a").removeClass("active");
            $(this).addClass("active");
            $(".multiTabs").find(".tabContent").hide();
            $(tab).show();
          }
        });
        $(".multipleTabs .tabNav li:first a").trigger("click");
      }
    }

    if ($(".accordion").length) {
      $(".accordion .accordDetail").hide();
      $(".accordion .accordDetail:first").show();
      $(".accordion .accTrigger:first").addClass("active");
      $(".accordion .accTrigger").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          $(this).next().slideUp();
        } else {
          if ($("body").hasClass("desktop")) {
            $(".accordion .accTrigger").removeClass("active");
            $(".accordion .accordDetail").slideUp();
          }
          $(this).addClass("active");
          $(this).next().slideDown();
        }
      });
    }

    if ($(".tableData").length > 0) {
      $(".tableData").each(function () {
        $(this).wrap('<div class="tableOut"></div>');
        $(this)
          .find("tr")
          .each(function () {
            $(this).find("td:first").addClass("firstTd");
            $(this).find("th:first").addClass("firstTh");
            $(this).find("th:last").addClass("lastTh");
          });
        $(this).find("tr:last").addClass("lastTr");
        $(this).find("tr:even").addClass("evenRow");
        $(this).find("tr:nth-child(2)").find("th:first").removeClass("firstTh");
      });
    }

    if ($(".upparMenu .socialLinks").length) {
      $(".upparMenu .socialLinks")
        .clone()
        .insertBefore(".footerSection .container");
    }

    // Responsive Table
    if ($(".responsiveTable").length) {
      $(".responsiveTable").each(function () {
        $(this).find("td").removeAttr("width");
        //$(this).find('td').removeAttr('align');
        var head_col_count = $(this).find("tr th").size();
        // loop which replaces td
        var i;
        for (i = 0; i <= head_col_count; i++) {
          // head column label extraction
          var head_col_label = $(this)
            .find("tr th:nth-child(" + i + ")")
            .text();
          // replaces td with <div class="column" data-label="label">
          $(this)
            .find("tr td:nth-child(" + i + ")")
            .attr("data-label", head_col_label);
        }
      });
    }

    // Responsive Table
    if ($(".tableScroll").length) {
      $(".tableScroll").each(function () {
        $(this).wrap('<div class="tableOut"></div>');
      });
    }

    if ($(".singleImgeSlider").length) {
      var singleImgSlider = new Swiper(".singleImgeSlider .swiper-container", {
        pagination: false,
        paginationClickable: true,
        noSwipingClass: false,
        slidesPerView: 1,
        nextButton: ".swiper-button-next2",
        prevButton: ".swiper-button-prev2",
        spaceBetween: 0,
        autoplay: 3000,
        loop: true,
      });
    }

    if ($(".offshoreThumbSlider").length) {
      var swiper10 = new Swiper(".offshoreThumbSlider .swiper-container", {
        pagination: false,
        slidesPerView: 3,
        paginationClickable: true,
        noSwipingClass: false,
        spaceBetween: 30,
        //slideVisibleClass:"active",
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        loop: true,
        breakpoints: {
          2500: { slidesPerView: 3, spaceBetween: 30 },
          1800: { slidesPerView: 2, spaceBetween: 30 },
          1169: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, spaceBetween: 10 },
          767: { slidesPerView: 2, spaceBetween: 10 },
          530: { slidesPerView: 1, spaceBetween: 10 },
        },
      });
    }

    /* News Page Slider  */
    if ($(".newsCarouselWrap").length) {
      var newsCarouselWrap = new Swiper(".newsCarouselWrap .swiper-container", {
        slidesPerView: 3,
        paginationClickable: true,
        noSwipingClass: false,
        spaceBetween: 0,
        //slideVisibleClass:"active",
        pagination: ".paginationNews",
        loop: false,
        updateTranslate: true,
        breakpoints: {
          2500: { slidesPerView: 3 },
          1800: { slidesPerView: 3 },
          1169: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          767: { slidesPerView: 1 },
          530: { slidesPerView: 1 },
        },
      });
    }

    /* PHP Frameworks Page Slider  */
    if ($(".phpFrmSwiper").length) {
      var phpFrmSwiper = new Swiper(".phpFrmSwiper .swiper-container", {
        slidesPerView: 3,
        paginationClickable: true,
        noSwipingClass: false,
        spaceBetween: 35,
        autoplay: 3000,
        //slideVisibleClass:"active",
        pagination: ".paginationPhp",
        loop: true,
        updateTranslate: true,
        breakpoints: {
          2500: { slidesPerView: 3 },
          1800: { slidesPerView: 3 },
          1169: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          767: { slidesPerView: 1 },
          530: { slidesPerView: 1 },
        },
      });
      $(".phpFrmSwiper .swiper-container").hover(
        function () {
          phpFrmSwiper.stopAutoplay();
        },
        function () {
          phpFrmSwiper.startAutoplay();
        }
      );
    }

    /* Portfolio Popup Slider  */
    if ($(".porflofLft").length) {
      var porflofLft = new Swiper(".porflofLft .swiper-container", {
        slidesPerView: 1,
        paginationClickable: true,
        noSwipingClass: false,
        spaceBetween: 0,
        //slideVisibleClass:"active",
        pagination: ".pagiPortPopup",
        observeParents: true,
        observer: true,
        loop: true,
      });

      $(".popupFolio").magnificPopup({
        type: "inline",
        preloader: false,
        CloseOnBgClick: true,
        enableEscapeKey: true,
        fixedContentPos: true,
        callbacks: {
          open: function () {
            //porflofLft.update();
            var mp = $.magnificPopup.instance,
              t = $(mp.currItem.el[0]),
              tid = $(t).attr("href");
            //alert( t.attr('class') );
            setTimeout(function () {
              if (
                $(tid).find(".mCustomScrollbarPop .mCSB_inside").length === 0
              ) {
                $(tid).find(".mCustomScrollbarPop").mCustomScrollbar();
              } else {
                $(tid).find(".mCustomScrollbarPop").mCustomScrollbar("update");
                //$(tid).find(".mCustomScrollbarPop").mCustomScrollbar("stop");
                //$(tid).find(".mCustomScrollbarPop").mCustomScrollbar("destroy");
              }
              // $(".mCustomScrollbar").mCustomScrollbar();alert(1)
            }, 500);
          },
        },
      });
    }

    if ($(".photoGallerSlider").length) {
      var technologyIconSlider = new Swiper(
        ".photoGallerSlider .swiper-container",
        {
          pagination: false,
          slidesPerView: 4,
          paginationClickable: true,
          noSwipingClass: false,
          spaceBetween: 30,
          //slideVisibleClass:"active",
          nextButton: ".swiper-button-next",
          prevButton: ".swiper-button-prev",
          loop: true,
          preloadImages: false,
          lazyLoading: true,
          breakpoints: {
            2500: { slidesPerView: 4, spaceBetween: 20 },
            1800: { slidesPerView: 4, spaceBetween: 20 },
            1169: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 3, spaceBetween: 10, autoplay: 3000 },
            767: { slidesPerView: 2, spaceBetween: 10, autoplay: 3000 },
            480: { slidesPerView: 1, spaceBetween: 0, autoplay: 3000 },
          },
        }
      );
    }

    if ($(".popupText").length) {
      $(".popupText").magnificPopup({
        type: "inline",
        preloader: false,
        CloseOnBgClick: true,
        enableEscapeKey: true,
        fixedContentPos: true,
        callbacks: {
          open: function () {
            porflofLft.update();
          },
        },
      });
    }
    if ($(".photoGalleryOuter").length) {
      $(".photoGalleryOuter").magnificPopup({
        delegate: ".imgPopup",
        type: "image",
        //tLoading: 'Loading image #%curr%...',
        //mainClass: 'mfp-img-mobile',
        gallery: {
          enabled: true,
          navigateByImgClick: false,
        },
      });
    }

    /* Trainind and Development - Career Page  */
    if ($(".trainDevlpSwiper").length) {
      var trainDevlpSwiper = new Swiper(".trainDevlpSwiper .swiper-container", {
        paginationClickable: true,
        pagination: ".pagitrainDevlp",
        loop: true,
      });
    }

    /* News Page Article Slider  */
    if ($(".articleCarouselWrap").length) {
      var articleCarouselWrap = new Swiper(
        ".articleCarouselWrap .swiper-container",
        {
          slidesPerView: 3,
          paginationClickable: true,
          noSwipingClass: false,
          spaceBetween: 0,
          //slideVisibleClass:"active",
          pagination: ".swiper-pagination-article",
          loop: false,
          updateTranslate: true,
          //observer:true,
          breakpoints: {
            22500: { slidesPerView: 3 },
            1800: { slidesPerView: 3 },
            1169: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
            767: { slidesPerView: 1 },
            530: { slidesPerView: 1 },
          },
        }
      );
      $(".defaultTab li a").on("click", function () {
        articleCarouselWrap.update();
      });
    }

    if ($(".leftBoxsSlider").length) {
      var leftBoxsSlider = new Swiper(".leftBoxsSlider .swiper-container", {
        pagination: false,
        slidesPerView: 3,
        paginationClickable: true,
        noSwipingClass: true,
        spaceBetween: 0,
        //slideVisibleClass:"active",
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        loop: false,
        simulateTouch: false,
        draggable: false,
        breakpoints: {
          2500: { slidesPerView: 3, spaceBetween: 0 },
          1800: { slidesPerView: 3, spaceBetween: 0 },
          1169: { slidesPerView: 3, spaceBetween: 0 },
          1024: { slidesPerView: 3, spaceBetween: 0 },
          767: { slidesPerView: 3, spaceBetween: 0 },
          480: { slidesPerView: 3, spaceBetween: 0 },
        },
      });
    }

    if ($(".technologyIconSlider").length) {
      var technologyIconSlider = new Swiper(
        ".technologyIconSlider .swiper-container",
        {
          pagination: false,
          slidesPerView: 3,
          paginationClickable: true,
          noSwipingClass: false,
          spaceBetween: 30,
          //slideVisibleClass:"active",
          nextButton: ".swiper-button-next2",
          prevButton: ".swiper-button-prev2",
          loop: true,
          breakpoints: {
            2500: { slidesPerView: 3, spaceBetween: 20 },
            1800: { slidesPerView: 3, spaceBetween: 20 },
            1169: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 3, spaceBetween: 10, autoplay: 3000 },
            767: { slidesPerView: 2, spaceBetween: 10, autoplay: 3000 },
            639: { slidesPerView: 1, spaceBetween: 0, autoplay: 3000 },
          },
        }
      );
    }

    if ($(".javaServiceIcon").length) {
      var javaServiceIcon = new Swiper(".javaServiceIcon .swiper-container", {
        slidesPerView: 3,
        noSwipingClass: false,
        spaceBetween: 30,
        pagination: ".swiper-pagination",

        paginationClickable: true,
        //slideVisibleClass:"active",
        autoplay: 3000,
        loop: true,
        breakpoints: {
          2500: { slidesPerView: 3, spaceBetween: 20 },
          1800: { slidesPerView: 3, spaceBetween: 20 },
          1169: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 2, spaceBetween: 10 },
          767: { slidesPerView: 2, spaceBetween: 10 },
          639: { slidesPerView: 1, spaceBetween: 10 },
        },
      });
      $(".javaServiceIcon .swiper-container").hover(
        function () {
          javaServiceIcon.stopAutoplay();
        },
        function () {
          javaServiceIcon.startAutoplay();
        }
      );
    }

    //Datafilter
    if ($(".portfolioSlider").length) {
      var swiper5 = new Swiper(".portfolioSlider  .swiper-container", {
        pagination: true,
        paginationClickable: true,
        scrollContainer: true,
        slidesPerView: 3,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        spaceBetween: 30,
        noSwipingClass: false,
        autoplay: 5000,
        loop: true,
        breakpoints: {
          2000: { slidesPerView: 4, spaceBetween: 30 },
          1650: { slidesPerView: 3, spaceBetween: 30 },
          1100: { slidesPerView: 2 },
          1024: { slidesPerView: 3, spaceBetween: 10 },
          767: { slidesPerView: 2, spaceBetween: 10 },
          460: { slidesPerView: 1, spaceBetween: 10 },
        },
      });

      $(".filterList li a").on("click", function (e) {
        e.preventDefault();
        var activeDiv = $(this).attr("data-rel");
        if ($(this).parent().hasClass("active")) {
        } else {
          $(".filterList li").removeClass("active");
          $(".filterText").removeClass("active").addClass("inactive");
          $(this).parent().addClass("active");
          $(".filterDivWrap")
            .find($("." + activeDiv))
            .removeClass("inactive")
            .addClass("active");
        }
        //swiper.update(updateTranslate);
      });

      $(".filterList li:first-child a").trigger("click");
    }

    //Years of Experience Slider
    if ($(".yearsOfExperienceCarousel").length) {
      var yearsOfExperienceCarousel = new Swiper(
        ".yearsOfExperienceCarousel .swiper-container",
        {
          pagination: false,
          slidesPerView: 2,
          paginationClickable: true,
          noSwipingClass: false,
          spaceBetween: 0,
          nextButton: ".swiper-button-next",
          prevButton: ".swiper-button-prev",
          loop: true,
          breakpoints: {
            3500: { slidesPerView: 3 },
            1800: { slidesPerView: 2 },
            800: { slidesPerView: 2, autoplay: 5000 },
            639: { slidesPerView: 1 },
          },
        }
      );
    }

    if ($(".innerPortfolioCarousel").length) {
      $(".innerPortfolioCarousel").each(function () {
        var swiperContainer = $(this).find(".swiper-container");
        var innerPortfolioCarousel = new Swiper(swiperContainer, {
          pagination: false,
          slidesPerView: 3,
          paginationClickable: true,
          noSwipingClass: false,
          spaceBetween: 15,
          //slideVisibleClass:"active",
          nextButton: swiperContainer.siblings(".swiper-button-next"),
          prevButton: swiperContainer.siblings(".swiper-button-prev"),
          observer: true,
          observeParents: true,
          loop: true,
          breakpoints: {
            2500: { slidesPerView: 3 },
            1800: { slidesPerView: 3 },
            1440: { slidesPerView: 3, autoplay: 3000, loop: true },
            1169: { slidesPerView: 2 },
            1024: { slidesPerView: 3, autoplay: 3000, loop: true },
            900: { slidesPerView: 2 },
            639: { slidesPerView: 1 },
          },
        });
      });
    }

    if ($(".searchPortfolioCarousel").length) {
      $(".searchPortfolioCarousel").each(function () {
        $(".searchPortfolioCarousel").addClass("sliderDistroy");
        if ($(".searchPortfolioCarousel .swiper-slide").length > 3) {
          $(".searchPortfolioCarousel").removeClass("sliderDistroy");
          var swiperContainer = $(this).find(".swiper-container");
          var innerPortfolioCarousel = new Swiper(swiperContainer, {
            pagination: false,
            slidesPerView: 3,
            paginationClickable: true,
            noSwipingClass: false,
            spaceBetween: 15,
            //slideVisibleClass:"active",
            nextButton: swiperContainer.siblings(".swiper-button-next"),
            prevButton: swiperContainer.siblings(".swiper-button-prev"),
            observer: true,
            observeParents: true,
            loop: true,
            breakpoints: {
              2500: { slidesPerView: 3 },
              1800: { slidesPerView: 3 },
              1440: { slidesPerView: 3, autoplay: 3000, loop: true },
              1169: { slidesPerView: 2 },
              1024: { slidesPerView: 3, autoplay: 3000, loop: true },
              900: { slidesPerView: 2 },
              639: { slidesPerView: 1 },
            },
          });
        }
      });
    }
    // Back to Top function
    if ($("#backtotop").length) {
      $(window).scroll(function () {
        if ($(window).scrollTop() > 120) {
          $("#backtotop").fadeIn("250").css("display", "block");
        } else {
          $("#backtotop").fadeOut("250");
        }
      });
      $("#backtotop").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "200");
        return false;
      });
    }

    // Back to Top function
    if ($("section").length) {
      $(window).on("scroll", function () {
        $("section").each(function () {
          var sectionTop = $(this).offset().top - 300;
          var scroll = $(window).scrollTop();

          if (scroll >= sectionTop) {
            $(this).addClass("activeBlock");
          } else {
            $(".contactUs, .innerContactInfo").removeClass("activeBlock");
          }
        });
      });
    }

    if ($(".desktop").length) {
      if ($(".bannerTechnologyIcon").length) {
        var buttonTopIcon = $(".bannerTechnologyIcon").offset().top - 30;
        $(window).on("scroll", function () {
          var scroll = $(window).scrollTop();
          var buttonTop = $(".aboutTechnology").offset().top;
          if (scroll >= buttonTopIcon) {
            $(".bannerTechnologyIcon").addClass("iconfixed");
          } else {
            $(".bannerTechnologyIcon").removeClass("iconfixed");
          }
        });

        var body = $("html, body");
        $(".bannerTechnologyIconWrap").on("click", function (e) {
          e.preventDefault();
          body.stop().animate({ scrollTop: 0 }, 2000, "swing");
        });
      }
    }

    // Get Focus Inputbox
    if ($(".getFocus").length) {
      $(".getFocus").each(function () {
        $(this)
          .on("focus", function () {
            if ($(this).val() === $(this)[0].defaultValue) {
              $(this).val("");
            }
          })
          .on("blur", function () {
            if ($(this).val() === "") {
              $(this).val($(this)[0].defaultValue);
            }
          });
      });
    }

    // For device checking
    if (isMobile === false) {
    }

    //radioFunciton Show Hide For scheduleCall
    if ($(".requestCallFrom").length) {
      $("#phoneNoRow").show();
      $("#schdulecall_email").addClass("ignore");
      $("#schdulecall_phonecode").customSelect();
      $("#schdulecall_phonecode").trigger("render.customSelect");

      $(".requestCallFrom input.radioFill").on("click", function () {
        var divId = $(this).val();
        if (divId === "phoneNo") {
          $(".requestCallFrom div.hideDiv").hide();
          $(".requestCallFrom #" + divId + "Row").show();
          $("#schdulecall_email").addClass("ignore");
          $("#schdulecall_phone").removeClass("ignore");
          $("#schdulecall_phonecall").removeClass("ignore");
          $("#schdulecall_phonecode").trigger("render.customSelect");
        }
        if (divId === "emailId") {
          $(".requestCallFrom div.hideDiv").hide();
          $("#" + divId + "Row").show();
          $("#schdulecall_phonecall").addClass("ignore");
          $("#schdulecall_phone").addClass("ignore");
          $("#schdulecall_email").removeClass("ignore");
        }
      });
    }

    //radioFunction Show Hide For Courses
    if ($(".courseFrom").length) {
      $("#computerBranchRow").show();
      $("#course_ec").addClass("ignore");
      $("#course_computer").customSelect();
      $("#course_computer").trigger("render.customSelect");

      $(".courseFrom input.radioFill").on("click", function () {
        var divId = $(this).val();
        if (divId === "computerBranch") {
          $(".courseFrom div.hideDiv").hide();
          $(".courseFrom #" + divId + "Row").show();
          $("#course_ec").addClass("ignore");
          $("#course_computer").removeClass("ignore");
          $("#course_computer").trigger("render.customSelect");
        }
        if (divId === "ecBranch") {
          $(".courseFrom div.hideDiv").hide();
          $("#" + divId + "Row").show();
          $("#course_computer").addClass("ignore");
          $("#course_ec").removeClass("ignore");
          $("#course_ec").trigger("render.customSelect");
        }
      });
    }

    //
    if ($(".floatedFormBtn").length) {
      $(".floatedFormBtn").on("click", function (e) {
        e.preventDefault();
        if ($(window).width() < 768) {
          if ($(".floatedForm").hasClass("visiable")) {
            $(".floatedForm").removeClass("popupVisible");
            $(".floatedFormBtn").removeClass("active visiable");
          } else {
            $(".floatedForm").addClass("popupVisible");
            $(".floatedFormBtn").addClass("active visiable");
          }
        } else {
          if ($(".floatedForm").hasClass("visiable")) {
            $(".floatedForm")
              .animate({ right: "-325px" }, { duration: 300 })
              .removeClass("visiable");
            $(".floatedFormBtn").removeClass("active");
          } else {
            $(".floatedForm")
              .animate({ right: "0px" }, { duration: 300 })
              .addClass("visiable");
            $(".floatedFormBtn").addClass("active");
          }
        }
      });

      $(document).bind("mousedown touchstart", function (e) {
        //if (ww < 767) {
        if ($(e.target).closest(".floatedForm").length === 0) {
          $(".floatedForm")
            .animate({ right: "-325px" }, { duration: 300 })
            .removeClass("visiable");
          $(".floatedFormBtn").removeClass("active");
        }
        // This is the preferred method.
        //}
      });
    }

    $(".closePopup").on("click", function () {
      $(this).parents(".floatedForm").removeClass("popupVisible");
      $(".floatedFormBtn").removeClass("active visiable");
    });

    $(".innerBannerPart .commonBtnArrow").removeClass("hashLink");

    //Get a Quote right fixed form
    if ($(".floatedQuoteFormBtn").length) {
      $(".floatedQuoteFormBtn, .innerBannerPart .commonBtnArrow").on(
        "click",
        function (e) {
          e.preventDefault();

          if ($(".floatedQuoteForm").hasClass("visiable")) {
            $(".floatedQuoteForm")
              .animate({ right: "-330px" }, { duration: 200 })
              .removeClass("visiable");
            $(".floatedQuoteFormBtn").removeClass("active");
          } else {
            $(".floatedQuoteForm")
              .animate({ right: "0px" }, { duration: 200 })
              .addClass("visiable");
            $(".floatedQuoteFormBtn").addClass("active");
          }
        }
      );

      $(document).bind("mousedown touchstart", function (e) {
        if ($(".desktop").length) {
          if (
            $(e.target).closest(
              ".floatedQuoteForm, .innerBannerPart .commonBtnArrow"
            ).length === 0
          ) {
            $(".floatedQuoteForm")
              .animate({ right: "-330px" }, { duration: 200 })
              .removeClass("visiable");
            $(".floatedQuoteFormBtn").removeClass("active");
          }
        }
      });
      $(".floatedQuoteFormWrap .close").on("click", function (e) {
        $(".floatedQuoteForm").removeClass("visiable");
        setTimeout(function () {
          $(".floatedQuoteFormBtn").removeClass("active");
        }, 200);
      });
    }

    // Google Map gmap3
    if ($("#gmap").length) {
      var lang = 23.021666;
      var lati = 72.55464;
      var contentString =
        '<div id="content">' +
        "<strong>" +
        "Silver Touch Technologies Limited" +
        "</strong>" +
        '<div id="bodyContent">' +
        "2nd Floor, Saffron Towers," +
        "<br/>" +
        "Near Panchwati Circle," +
        "<br/>" +
        "Ahmedabad, Gujarat 380006" +
        "</div></div>";

      var map = new google.maps.Map(document.getElementById("gmap"), {
        zoom: 15,
        center: new google.maps.LatLng(lang, lati),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      var infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      google.maps.event.addListener(map, "click", function () {
        infowindow.close();
      });
      var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(lang, lati),
      });
      google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
      });
      infowindow.open(map, marker);
    }

    //$('.equalHeights > div').equalHeight();
    setTimeout(function () {
      $(".equalHeights").each(function () {
        $(this).children("div").equalHeight();
      });
    }, 500);

    $(".equalHieghtsDiv").equalHeight();

    //contentshowhide
    if ($(".widthConentBtn").length) {
      $(".widthConentBtn").click(function (e) {
        e.preventDefault();
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          $(this)
            .parents(".hideContentDiv")
            .removeClass("active")
            .animate({ width: "650px" }, 500);
        } else {
          $(".widthConentBtn").removeClass("active");
          $(".hideContentDiv").removeClass("active");
          $(this).addClass("active");
          $(this)
            .parents(".hideContentDiv")
            .addClass("active")
            .animate({ width: "100%" }, 500);
        }
      });
    }
    //csrActivitesDetailWrap
    if ($(".csrActivitesToggleBtn").length) {
      $(".csrActivitesToggleBtn").click(function (e) {
        e.preventDefault();
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          $(this)
            .parents(".csrActivitesSlideWrap")
            .find(".csrActivitesDetailWrap")
            .removeClass("active")
            .animate({ width: "0" }, 500);
        } else {
          $(".csrActivitesToggleBtn").removeClass("active");
          $(".csrActivitesDetailWrap").removeClass("active");
          $(this).addClass("active");
          $(this)
            .parents(".csrActivitesSlideWrap")
            .find(".csrActivitesDetailWrap")
            .addClass("active")
            .animate({ width: "50%" }, 500);
        }
      });
    }
    /* News-Event Page bottom Slider */
    if ($(".eventRhtBlkIns").length) {
      if ($(".eventRhtBlkIns .swiper-slide").length <= 3) {
        $(".eventRhtBlkIns").addClass("scrollDisable");
      }
      var eventOption = {
        pagination: false,
        slidesPerView: 3,
        paginationClickable: true,
        noSwipingClass: false,
        spaceBetween: 0,
        simulateTouch: false,
        nextButton: ".eventNext",
        prevButton: ".eventPrev",
        observer: true,
        loop: false,
        initialSlide: 0,
        breakpoints: {
          2500: { slidesPerView: 3 },
          1800: { slidesPerView: 3 },
          1169: { slidesPerView: 2, simulateTouch: true },
          1024: { slidesPerView: 2, simulateTouch: true },
          767: { slidesPerView: 2, simulateTouch: true },
          530: { slidesPerView: 1, simulateTouch: true },
        },
      };
      var eventRhtBlkIns = new Swiper(
        ".eventRhtBlkIns .swiper-container",
        eventOption
      );

      //$(".yearPanel").hide();
      $(".yearPanel li:first-child a").addClass("active");
      $(".yearPanel li a").on("click", function (e) {
        e.preventDefault();
        var $this = $(this);
        $(".yearPanel li a").removeClass("active");
        $this.addClass("active");
        eventRhtBlkIns.init();
        setTimeout(function () {
          eventRhtBlkIns.init();

          if ($(".eventRhtBlkIns .swiper-slide").length < 4) {
            $(".eventRhtBlkIns").addClass("scrollDisable");
          } else {
            $(".eventRhtBlkIns").removeClass("scrollDisable");
          }
        }, 1000);
      });
    }

    /* Blog Page */
    if ($(".downloadEbook").length) {
      var downloadEbook = new Swiper(".downloadEbook .swiper-container", {
        pagination: false,
        slidesPerView: 1,
        paginationClickable: true,
        noSwipingClass: false,
        spaceBetween: 30,
        //slideVisibleClass:"active",
        nextButton: ".swiper-button-next2",
        prevButton: ".swiper-button-prev2",
        loop: true,
      });
    }

    // industries tabing href loaction
    if ($(".industriesDetailWrap").length) {
      if (window.location.hash) {
        var hash = window.location.href;
        var res = "#" + hash.split("#")[1];
        if ($(res).length) {
          setTimeout(function () {
            $(".tabNavigation a").each(function () {
              if ($(this).attr("href") === res) {
                $(this).trigger("click");
                var targetLink = $("#industriesDetail");
                $("html,body").animate(
                  { scrollTop: $(targetLink).offset().top - 60 },
                  1000
                );
              }
            });
          }, 800);
        }
      }
    }

    // open schedule call with url
    if ($(".topLinks").length) {
      if (window.location.hash) {
        var hash1 = window.location.href;
        var res1 = "#schduleCall" + hash1.split("#schduleCall")[1];
        if ($(res1).length) {
          setTimeout(function () {
            $(".menu-top-menu-container .popup-modal").trigger("click");
          }, 800);
        }
      }
    }

    /* Employees Speak Slider - Career Page - Birjoo */
    if ($(".empSpeakSwiper").length) {
      var empSpeakSwiper = new Swiper(".empSpeakSwiper .swiper-container", {
        pagination: false,
        slidesPerView: 2,
        paginationClickable: true,
        noSwipingClass: false,
        spaceBetween: 0,
        //slideVisibleClass:"active",
        nextButton: ".speakNext",
        prevButton: ".speakPrev",
        loop: true,
      });
    }
    /* Employees Speak Slider - Career Page - Birjoo */
    if ($(".careerEventSwiper").length) {
      var careerEventSwiper = new Swiper(
        ".careerEventSwiper .swiper-container",
        {
          pagination: false,
          slidesPerView: 1,
          paginationClickable: true,
          noSwipingClass: false,
          spaceBetween: 0,
          //slideVisibleClass:"active",
          loop: true,
        }
      );
    }

    /* Meida Kit Page Watch YouTube Slider - Birjoo */
    if ($(".broucherVideo").length) {
      var broucherVideo = new Swiper(".broucherVideo .swiper-container", {
        noSwipingClass: false,
        paginationClickable: true,
        slidesPerView: 1,
        autoplay: false,
        effect: "fade",
        slideVisibleClass: "active",
        nextButton: ".carouselNextBtn",
        prevButton: ".carouselPrevBtn",
        pagination: ".swiper-pagination-counter",
        paginationType: "fraction",
        spaceBetween: 0,
        loop: true,
      });
    }

    /* Meida Kit Page Watch YouTube Slider*/
    if ($(".innerVideoGallery").length) {
      var innerVideoGallery = new Swiper(
        ".innerVideoGallery .swiper-container",
        {
          noSwipingClass: false,
          paginationClickable: true,
          slidesPerView: 1,
          autoplay: false,
          effect: "fade",
          slideVisibleClass: "active",
          nextButton: ".carouselNextBtn",
          prevButton: ".carouselPrevBtn",
          spaceBetween: 0,
          loop: true,
        }
      );
    }

    /* Search Page Related Project Slider - Birjoo */
    if ($(".rltdSrcSlider").length) {
      var rltdSrcSlider = new Swiper(".rltdSrcSlider .swiper-container", {
        pagination: false,
        slidesPerView: 3,
        paginationClickable: true,
        noSwipingClass: false,
        spaceBetween: 30,
        //slideVisibleClass:"active",
        nextButton: ".rltdPrjnext",
        prevButton: ".rltdPrjprev",
        loop: true,
        breakpoints: {
          2500: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1800: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1169: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          530: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      });
    }

    /* Portfoli Page Icon Slider */
    /*if($(".portfoSwiper").length){
                var portfoSwiper = new Swiper('.portfoSwiper .swiper-container', {
                   scrollbar: '.iconScrollbar',
                scrollbarHide: false,
                slidesPerView: 'auto',
                centeredSlides: false,
                spaceBetween:0,
                grabCursor: true
                
            });
        }*/

    if ($(".portfolioTabSlider").length) {
      portfolioSwiper = new Swiper(".portfolioTabSlider .swiper-container", {
        slidesPerView: 3,
        // centeredSlides: true,
        centeredSlides: false,
        spaceBetween: 0,
        loop: false,
        breakpoints: {
          1024: { slidesPerView: 3 },
          767: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        },
      });
      $(window).on("resize", function () {
        var currentActive = 0;
        if ($(".portfIconBlock.active").length) {
          currentActive = $(".portfIconBlock.active")
            .parent()
            .parent()
            .index(0);
        }
        portfolioSwiper.slideTo(currentActive, 1000, false);
        portfolioSwiper.update();
      });
    }

    if ($('input[type="range"]').length) {
      $('input[type="range"]').rangeslider({
        polyfill: true,
        rangeClass: "rangeslider",
        disabledClass: "rangeslider--disabled",
        horizontalClass: "rangeslider--horizontal",
        verticalClass: "rangeslider--vertical",
        fillClass: "rangeslider__fill",
        handleClass: "rangeslider__handle",
        onInit: function () {},
        onSlide: function (position, value) {},
        onSlideEnd: function (position, value) {},
      });
    }

    setTimeout(function () {
      if ($(".fixedErrorMsg").length) {
        $(".fixedErrorMsg").slideDown("slow");
        setTimeout(function () {
          $(".fixedErrorMsg").slideUp();
        }, 5000);
      }
      if ($(".fixedSuccessMsg").length) {
        $(".fixedSuccessMsg").slideDown("slow");
        setTimeout(function () {
          $(".fixedSuccessMsg").slideUp();
        }, 5000);
      }
    }, 500);

    $(document).on("click", ".resetBtn", function (e) {
      e.preventDefault();
      $(this).closest("form")[0].reset();
    });

    if ($(".datepicker").length) {
      $.datepicker.setDefaults({
        showOn: "both",
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        //buttonImage: "images/calendar.png",
        //buttonImageOnly: true,
        shortYearCutoff: 50,
        buttonText: "<span class='sprite calIcon'></span>",
        beforeShow: function (textbox, instance) {
          instance.dpDiv.css({
            marginTop: /*(textbox.offsetHeight)*/ 0 + "px",
            marginLeft: 0 + "px",
          });
        },
      });

      $(".datepicker").datepicker({
        dateFormat: "dd/mm/yy",
        showOn: "both",
        buttonText: "<span class='sprite calIcon'></span>",
        shortYearCutoff: 50,
        //buttonImage: "images/calendar.png",
        //buttonImageOnly: true,
        beforeShow: function (textbox, instance) {
          instance.dpDiv.css({
            marginTop: /*(textbox.offsetHeight)*/ 0 + "px",
            marginLeft: 0 + "px",
          });
        },
      });
    }

    if ($(".datetimepicker").length) {
      $(".datetimepicker").datetimepicker({
        dateFormat: "dd-mm-yy",
        showOn: "both",
        buttonText: "<span class='sprite calIcon'></span>",
        //buttonImage: "images/calendar.png"
        //buttonImageOnly: true,
        beforeShow: function (textbox, instance) {
          instance.dpDiv.css({
            marginTop: /*(textbox.offsetHeight)*/ 15 + "px",
            marginLeft: -13 + "px",
          });
        },
      });
    }

    //servicesBox  imgBg
    if ($(".servicesBox").length) {
      $(".serviceBoxImgBlk").each(function () {
        var imagePath = $(this).find("img").attr("src");
        $(this).css("background-image", "url( " + imagePath + " )");
      });
    }
    //search Homepage
    if ($(".searchIcon1").length) {
      $(".searchIcon1").on("click", function () {
        $(".searchInputWrap").slideDown();
        $(this).parent().addClass("active");
        $(".searchInput input[type=text]").focus();
      });
      $(document).bind("mousedown touchstart", function (e) {
        //if (ww < 767) {
        if (
          $(e.target).closest(".searchInputWrap, .searchBoxWrap").length === 0
        ) {
          $(".searchInputWrap").slideUp();
          $(".searchIcon1").parent().removeClass("active");
        } else {
        }
        //}
      });
    }
    //search Homepage
    if ($(".closeIconBtn").length) {
      $(".closeIconBtn").on("click", function () {
        $(".searchInputWrap").slideUp();
        $(".searchIcon1").parent().removeClass("active");
      });
    }
    //search Homepage
    if ($(".breadCumIocn").length) {
      if ($(".mobile").length) {
        $(document).on("click", ".breadCumIocn", function () {
          $(this).next().slideToggle();
        });
        $(document).bind("mousedown touchstart", function (e) {
          //if (ww < 767) {
          if ($(e.target).closest(".breadCumWrap").length === 0) {
            $(".breadCum").slideUp();
          }
          //}
        });
      }
    }

    //saearch icon
    if ($(".searchIcon").length) {
      $(document).on("click", ".searchIcon", function (e) {
        e.preventDefault();
        if ($(this).hasClass("closed")) {
        } else {
          if (ww < 768) {
            $(this).parents("#wrapper").toggleClass("openSearch");
            $(".searchInputWrap").animate({ height: "toggle" }, 300);
            $(this).toggleClass("closed");
          } else {
            $(".searchInputWrap").animate({ width: "toggle" }, 500);
            $(this).toggleClass("closed");
          }
        }
      });

      $(document).bind("mousedown touchstart", function (e) {
        //if (ww < 767) {
        if ($(e.target).closest(".searchBoxWrap").length === 0) {
          if ($(".searchInputWrap").next().hasClass("closed")) {
            if (ww < 768) {
              $(".searchInputWrap").animate({ height: "toggle" }, 300);
              $("#wrapper").removeClass("openSearch");
              $(".searchIcon").removeClass("closed");
            } else {
              $(".searchInputWrap").animate({ width: "toggle" }, 500);
              $(".searchIcon").removeClass("closed");
            }
          }
        }
        //}
      });
    }
    /********servicesBox Add Class***************/
    if ($(".servicesBox").length) {
      enableHover();
    }

    // Toggle active
    $(document).on("click", ".toogleActive", function (e) {
      e.preventDefault();
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).addClass("inActive");
      } else {
        $(this).removeClass("inActive");
        $(this).addClass("active");
      }
    });

    // Toggle filters
    $(document).on("click", ".toogleFilters a", function (e) {
      e.preventDefault();
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).addClass("inActive");
      } else {
        $(".toogleFilters a").addClass("inActive");
        $(".toogleFilters a").removeClass("active");
        $(this).removeClass("inActive");
        $(this).addClass("active");
      }
    });

    // Message on Cookie Disabled
    $.cookie("cookieWorked", "yes", { path: "/" });
    if ($.cookie("cookieWorked") === "yes") {
    } else {
      if ($("div.jsRequired").length === 0) {
        $("body").prepend(
          '<div class="jsRequired">Cookies are not enabled on your browser. Need to adjust this in your browser security preferences. Please enable cookies for better user experience.</div>'
        );
      }
    }

    //Home page Promo Video

    if ($("#videoBlock").length) {
      var videoPlay = 0;
      $("#introVideo").mediaelementplayer({
        // Configuration
        showPosterWhenEnded: true,
        pluginPath: "wp-content/themes/silvertouch/assets/js/mediaelement/",
        pauseOtherPlayers: true,
        success: function (media) {
          media.addEventListener(
            "ended",
            function () {
              videoPlay = 0;
            },
            false
          );
          // etc.
        },
      });

      $(document).on("click", ".mejs__overlay-play", function () {
        videoPlay = 1;
      });

      Object.defineProperty(HTMLMediaElement.prototype, "playing", {
        get: function () {
          return !!(
            this.currentTime > 0 &&
            !this.paused &&
            !this.ended &&
            this.readyState > 2
          );
        },
      });

      var myElement = document.getElementById("videoBlock");
      var elementWatcher = scrollMonitor.create(myElement);

      elementWatcher.enterViewport(function () {
        if (videoPlay === 1) {
          $("#introVideo_html5").get(0).play();
        }
      });

      elementWatcher.exitViewport(function () {
        if (document.querySelector("video").playing) {
          //$("#introVideo_html5").get(0).play();
          $("#introVideo_html5").get(0).pause();
        }
      });
    }

    $(".customPlayer").mediaelementplayer({
      // Configuration
      showPosterWhenEnded: true,
      pauseOtherPlayers: true,
      success: function (media) {
        /*var videoElement = $("#introVideo_html5").get(0);		
                if (!videoElement.paused) {} */
        // etc.
      },
    });

    /*var value = $(window).width();
          value *= 1;
          var valueHeight = Math.round((value/16)*9);
          $('#videoBox').css('width',value + 'px').css('height',valueHeight +'px');*/

    //Media Kit Page script

    if ($(".triggerSlide").length) {
      $(".triggerSlide").each(function () {
        var $this = $(this);
        $this.find(".triggerBtn").on("click", function (e) {
          e.preventDefault();
          $this.find(".triggerDetail").fadeOut();
          $this.find(".triggerBtn").removeClass("active");
          $(this).addClass("active");
          $(this).siblings(".triggerDetail").fadeIn();
        });
      });
    }

    if ($(".mediaRelationsLeft").length) {
      $(".mediaRelationsLeft li").on("click", function (e) {
        e.preventDefault();
        $(this).addClass("active").siblings().removeClass("active");
        if ($(".mediaRelationsLeft li.so").hasClass("active")) {
          $(".salesBox").css({
            opacity: "1",
            visibility: "visible",
            left: "100%",
            "z-index": "1",
          });
        } else {
          $(".salesBox").removeAttr("style");
        }
        if ($(".mediaRelationsLeft li.ts").hasClass("active")) {
          $(".techBox").css({
            opacity: "1",
            visibility: "visible",
            left: "100%",
            "z-index": "1",
          });
        } else {
          $(".techBox").removeAttr("style");
        }
        if ($(".mediaRelationsLeft li.bd").hasClass("active")) {
          $(".bDBox").css({
            opacity: "1",
            visibility: "visible",
            left: "100%",
            "z-index": "1",
          });
        } else {
          $(".bDBox").removeAttr("style");
        }
      });

      $(".mediaRelationBox .close").on("click", function (e) {
        e.preventDefault();
        $(".mediaRelationBox").removeAttr("style");
        $(".mediaRelationsLeft li").removeClass("active");
      });
      $(".desktop .mediaRelationsLeft li:first").trigger("click");
    }

    //reordering filter script
    if ($(".reorderNav").length) {
      var $filterType = $(".reorderNav [data-filter].active a").data("show");
      var $holder = $(".reorderContent");
      var $data = $holder.clone();
      $(".reorderNav [data-filter] a").on("click", function (e) {
        e.preventDefault();
        var $this = $(this);
        $(".reorderNav [data-filter]").removeClass("active");
        var $filterType = $(this).data("show");
        $this.closest("[data-filter]").addClass("active");

        if ($filterType === "allItems") {
          $filteredData = $data.children("[data-type]");
        } else {
          $filteredData = $data.find("[data-type=" + $filterType + "]");
        }
        $holder.quicksand($filteredData, {
          duration: 800,
          easing: "easeInOutQuad",
        });

        setTimeout(function () {
          animation();
        }, 800);
      });
    }

    // Toggle filters Active
    $(document).on("click", ".activeOnClick a", function (e) {
      e.preventDefault();
      if ($(this).hasClass("active")) {
      } else {
        $(".activeOnClick a").addClass("inActive");
        $(".activeOnClick a").removeClass("active");
        $(this).removeClass("inActive");
        $(this).addClass("active");
      }
    });

    if ($("#selectTechnology").length) {
      $("#selectTechnology").on("change", function () {
        $(".activeOnClick a").addClass("inActive");
        $(".activeOnClick a").removeClass("active");
      });
      $(document).on("click", ".activeOnClick a", function () {
        $("#selectTechnology").prop("selectedIndex", 0);
        $("#selectTechnology").trigger("render.customSelect");
      });
    }

    // Toggle filters Active
    $(document).on("click", ".toogleFiltersActive a", function (e) {
      e.preventDefault();
      if ($(this).hasClass("active")) {
        $(".toogleFiltersActive a").addClass("active");
        $(".toogleFiltersActive a").removeClass("inActive");
        $(this).removeClass("active");
        $(this).addClass("inActive");
      } else {
        $(this).removeClass("inActive");
        $(this).addClass("active");
      }
    });

    if ($(".portfIconBlock").length) {
      var defaultlab = $(".projectsTechTitle").html();
      $(".portfIconBlock [data-label]").on("click", function () {
        if ($(this).parent().hasClass("active")) {
          $(".projectsTechTitle").html(defaultlab);
        } else {
          var label = $(this).data("label");
          $(".projectsTechTitle").html(label);
        }
      });
    }

    $(document).on("click", ".srtByTechBlkBtn [data-label]", function () {
      if ($(this).parent().hasClass("active")) {
        $(".projectsTechTitle").html(defaultlab);
      } else {
        var label = $(this).data("label");
        $(".projectsTechTitle").html(label);
      }
    });

    //reordering filter script for Portfolio
    if ($(".reorderNavFolio").length) {
      var $filterType1 = $(".reorderNavFolio [data-filter].active a").data(
        "show"
      );
      var $holder1 = $(".reorderContentFolio");
      var $data1 = $holder1.clone();
      var $filteredData;

      if (window.location.hash) {
        var hash = window.location.href;
        var res = "#" + hash.split("#")[1];
        if ($(".portfoSwiper [data-filter] a").length) {
          setTimeout(function () {
            $(".portfoSwiper [data-filter] a").each(function () {
              if ($(this).attr("href") === res) {
                $(this).trigger("click");
                var currentActive = 0;
                if ($(".portfolioTabSlider .portfIconBlock.active").length) {
                  currentActive = $(
                    ".portfolioTabSlider .portfIconBlock.active"
                  )
                    .parent()
                    .parent()
                    .index(0);
                }
                portfolioSwiper.slideTo(currentActive, 1000, false);
                portfolioSwiper.update();
              }
            });
          }, 800);
        }
      }

      $(".reorderNavFolio [data-filter] a").on("click", function (e) {
        e.preventDefault();
        var $this = $(this);
        var $thisData = $this.attr("data-show");
        var cloneData =
          ".reorderNavFolio [data-filter] a[data-show=" + $thisData + "]";

        $("html, body").animate({ scrollTop: $(this).offset().top - 30 }, 1000);

        if ($this.closest("[data-filter]").hasClass("active")) {
          $(".reorderNavFolio [data-filter]").removeClass("active");
          $filteredData = $data1.find("[data-type]");
        } else {
          $(".reorderNavFolio [data-filter]").removeClass("active");
          var $filterType1 = $(this).data("show");
          //$this.closest("[data-filter]").addClass('active');
          $(cloneData).closest("[data-filter]").addClass("active");

          if ($filterType1 === "allItems") {
            $filteredData = $data1.children("[data-type]");
          } else {
            $filteredData = $data1.find("[data-type=" + $filterType1 + "]");
          }
        }

        $holder1.quicksand(
          $filteredData,
          {
            duration: 500,
            easing: "easeInOutQuad",
          },
          function () {
            $(".popupFolio").magnificPopup({
              type: "inline",
              preloader: false,
              CloseOnBgClick: true,
              enableEscapeKey: true,
              fixedContentPos: true,
              callbacks: {
                open: function () {
                  //porflofLft.update();
                  var mp = $.magnificPopup.instance,
                    t = $(mp.currItem.el[0]),
                    tid = $(t).attr("href");
                  //alert( t.attr('class') );
                  setTimeout(function () {
                    if (
                      $(tid).find(".mCustomScrollbarPop .mCSB_inside")
                        .length === 0
                    ) {
                      $(tid).find(".mCustomScrollbarPop").mCustomScrollbar();
                    } else {
                      $(tid)
                        .find(".mCustomScrollbarPop")
                        .mCustomScrollbar("update");
                      //$(tid).find(".mCustomScrollbarPop").mCustomScrollbar("stop");
                      //$(tid).find(".mCustomScrollbarPop").mCustomScrollbar("destroy");
                    }
                    // $(".mCustomScrollbar").mCustomScrollbar();alert(1)
                  }, 500);
                },
              },
            });
          }
        );
      });

      if ($(".mCustomScrollbar").length) {
        $(".mCustomScrollbar").mCustomScrollbar({
          scrollInertia: 100,
          scrollButtons: {
            enable: true,
          },
          advanced: {
            updateOnContentResize: true,
            autoExpandHorizontalScroll: true,
          },
        });
      }

      $(document).on("click", ".srtByTechBlkBtn [data-filter] a", function (e) {
        e.preventDefault();
        var $this = $(this);
        var $holder2 = $(".reorderContentFolio");
        var $data2;
        var $filteredData2;

        if (!$(".srtByTechBlkBtn [data-filter] a").hasClass("inActive")) {
          $data2 = $holder.clone();
        } else {
        }

        if ($this.closest("[data-filter]").hasClass("active")) {
          $(".srtByTechBlkBtn [data-filter]").removeClass("active");
          $filteredData2 = $data2.find("[data-tech]");
        } else {
          $(".srtByTechBlkBtn [data-filter]").removeClass("active");
          var $filterType2 = $(this).data("techshow");
          $this.closest("[data-filter]").addClass("active");

          if ($filterType2 === "allItems") {
            $filteredData2 = $data2.children("[data-tech]");
          } else {
            $filteredData2 = $data2.find("[data-tech=" + $filterType2 + "]");
          }
        }

        $holder2.quicksand($filteredData2, {
          duration: 500,
          easing: "easeInOutQuad",
        });
      });
    }

    if ($(".relationList").length) {
      var $this = $(this);
      setTimeout(function () {
        if ($this.siblings("input").is(":checked")) {
          $this.addClass("active");
        } else {
          $this.removeClass("active");
        }
      }, 100);

      $(document).on("click", ".relationList ul li label", function () {
        var $this = $(this);
        setTimeout(function () {
          if ($this.siblings("input").is(":checked")) {
            $this.addClass("active");
          } else {
            $this.removeClass("active");
          }
        }, 200);
      });
    }

    //$(".innerBannerSmall").paroller({ factor: '0.05', type: 'background', direction: 'horizontal' });
    //about us Team filter
    if ($(".teamDetailWrap").length) {
      $(".teamDetailWrap .filterBox").on("click", function (e) {
        e.preventDefault();
        var activeRound = $(this).attr("data-rel");
        if ($(this).parent().hasClass("active")) {
          $(this).parent().removeClass("active").removeClass("inactive");

          $(".teamBoxBg")
            .removeClass("active")
            .removeClass("inactive detailActive");
        } else {
          $(".filterBox").removeClass("active");
          $(".teamBoxBg")
            .removeClass("active")
            .removeClass("inactive detailActive");
          $(".teamBoxBg").addClass("inactive");
          $(this).parent().addClass("active");
          $(".teamDetailWrap")
            .find($("." + activeRound))
            .removeClass("inactive")
            .addClass("active");
        }
      });
    }
    if ($(".boxDetail").length) {
      $(".boxDetail").on("click", function (e) {
        e.preventDefault();
        $(".teamBoxBg").addClass("inactive");
        $(this)
          .parent(".teamBoxBg")
          .removeClass("inactive")
          .addClass("detailActive");
      });
      $(".closeMemDetail").on("click", function (e) {
        e.preventDefault();
        $(".teamBoxBg").removeClass("inactive");
        $(this).parents(".teamBoxBg").removeClass("inactive detailActive");
      });
    }

    if ($(".outsitemapblock ").length) {
      var newchild = $(
        ".outsitemapblock > li:nth-child(4) .insitemapSubblock, .outsitemapblock > li:nth-child(5) .insitemapSubblock, .outsitemapblock  > li:nth-child(6) .insitemapSubblock, .outsitemapblock  > li:nth-child(7) .insitemapSubblock"
      ).clone();
      var footermenu = $(
        ".outsitemapblock.topMenu > li, .outsitemapblock.footerMenu > li"
      ).clone();
      $(".outsitemapblock  > li:nth-child(4)").html(newchild);
      $(".outsitemapblock").append(footermenu);
      $(
        ".outsitemapblock > li:nth-child(5), .outsitemapblock > li:nth-child(6), .outsitemapblock  > li:nth-child(7), .outsitemapblock.topMenu, .outsitemapblock.footerMenu"
      ).remove();
    }

    if ($("#downloadresouce").length) {
      var urlmenu = document.getElementById("downloadresouce");
      urlmenu.onchange = function () {
        //location.href = $("#downloadresouce option:selected").val();
        window.open(this.options[this.selectedIndex].value, "_blank");
      };
    }

    if ($(".leftSideNav").length) {
      $(document).on(
        "click",
        ".leftSideNav .tabNav .r-tabs-tab a",
        function (e) {
          e.preventDefault();
          return false;
        }
      );
    }

    if ($(".mejs__poster-img").length) {
      var posimg = $(".mejs__poster-img");
      var img = new Image();
      img.onload = function () {
        posimg.attr("height", this.height);
        posimg.attr("width", this.width);
      };
      img.src = posimg.attr("src");
    }

    if ($(".desktop").length) {
      $(document).on(
        {
          mouseenter: function () {
            $(this).attr("title", "");
            var textVal = $(this).text();
            if ($(".errorTooltip").length === 0) {
              $("body").append(
                '<div class="errorTooltip"><span>' + textVal + "</span></div>"
              );
              //setTimeout(function(){$(".errorTooltip").fadeIn( "slow");},200)
            } else {
              $(".errorTooltip span").text(textVal);
            }

            var posX = $(this).offset().left - $(".errorTooltip").width();
            var posY = $(this).offset().top - 1;

            $(".errorTooltip").css({ left: posX, top: posY });
          },
          mouseleave: function () {
            $(".errorTooltip").remove();
          },
        },
        "label.error"
      );
    }

    //Pre Footer Hide Show
    $("#footer .footerArwIcon").click(function () {
      if ($("#footer").hasClass("active")) {
        $("#footer").removeClass("active");
        $(this).removeClass("active");
      } else {
        $("#footer").addClass("active");
        $(this).addClass("active");
      }
    });

    $(document).keydown(function (e) {
      // ESCAPE key pressed
      if (e.keyCode === 27) {
        $(".floatedForm").removeClass("popupVisible");

        if ($(".floatedForm").hasClass("visiable")) {
          $(".floatedForm")
            .animate({ right: "-295px" }, { duration: 300 })
            .removeClass("visiable");
          $(".floatedFormBtn").removeClass("active");
        }
      }
    });

    if ($(".cdNavigationWrapper .dropdown a").next()) {
      $(".dropdown > .menuIcon").on("click", function () {
        $(".cdNavTrigger").addClass("rotateRight");

        $(this).parent().addClass("active");
      });
    }
    if ($(".locationSection a.icon").length) {
      $(".locationSection a.icon").on("click", function (e) {
        e.preventDefault();
      });
    }

    if ($("iframe").length) {
      $("iframe").removeAttr("frameborder");
    }
    if ($("select").length) {
      //$("select option").removeAttr("selected").attr("selected")
    }

    var stickyOffset =
      $("#main > section:nth-child(1)").offset().top +
      $("#main > section:nth-child(1)").height();
    var stickyOffsetPls = stickyOffset + 100;

    $(window).scroll(function () {
      var sticky = $("body"),
        scroll = $(window).scrollTop();

      if (scroll >= stickyOffsetPls) {
        if ($("fixedHeader").length === 0) {
          sticky.addClass("fixedHeader");
        }
      } else {
        if (sticky.hasClass("fixedHeader")) {
          sticky.addClass("fixedHeaderBack");
          setTimeout(function () {
            sticky.removeClass("fixedHeader");
            sticky.removeClass("fixedHeaderBack");
          }, 5);
        }
      }

      if ($(".mouseIcon").length) {
        if (scroll >= 130) {
          $(".mouseIcon").fadeOut("slow");
        }
      }
    });

    //customlinksTab
    if ($(".customlinksTab").length) {
      $(document).on("click", ".customLinkNav a", function (e) {
        e.preventDefault();
        $(this)
          .parents(".customlinksTab")
          .find(".customLinkNav a")
          .removeClass("active");
        $(this).addClass("active");
        var tab = $(this).attr("href");
        $(".customTabContainer")
          .find(".customTabContent")
          .not(tab)
          .css("display", "none");
        $(tab).fadeIn();
      });
      $(".customLinkNav").find("a:first").trigger("click").addClass("active");
    }

    if ($(".indusTabMobile").length) {
      $(".indusTabMobile .selectIndustries").click(function () {
        $(this).next().slideToggle();
      });
      $(".indusTabMobile li a").click(function () {
        $(".indusTabMobile .tabNavigation").hide();
      });
    }

    // Form Validation Part

    if ($("#searchform").length) {
      var searchValid = $("#searchform").validate({
        rules: {
          q: {
            required: true,
            searchpattern: true,
            checkmultispace: true,
            minlength: 3,
            maxlength: 80,
          },
        },
        onkeyup: function (element, event) {
          if (event.which === 9 && this.elementValue(element) === "") {
            return;
          } else {
            this.element(element);
          }
        },
        highlight: function (element, errorClass, validClass) {
          $(element)
            .closest("div")
            .addClass(errorClass)
            .removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element)
            .closest("div")
            .addClass(validClass)
            .removeClass(errorClass);
        },
        showErrors: function (map, list) {
          this.defaultShowErrors(); // calls the default function
          // after which we can add our changes
          $("label.error").each(function (index) {
            $(this).attr("title", $(this).text());
            if ($(this).children("span").length === 0) {
              $(this).wrapInner('<span class="errorOut"><i></i><span>');
            }
          });
        },
        messages: { q: { required: "Enter Proper Search Keyword" } },
        submitHandler: function (form) {
          form.submit();
        },
      });

      $(".closeIconBtn").click(function () {
        document.getElementById("searchform").reset();
        searchValid.resetForm();
      });
    }

    if ($("#inquiryform").length) {
      $("#inquiryform button.default-btn").attr("type", "submit");
      var inquiryform = {
        //ignore: ".ignore",
        rules: {
          inquiry_firstname: {
            required: true,
            alphabets: true,
            checkmultispace: true,
            minlength: 3,
            maxlength: 30,
          },
          inquiry_email: { required: true, customemail: true },
          inquiry_lastname: {
            required: true,
            alphabets: true,
            checkmultispace: true,
            minlength: 3,
            maxlength: 30,
          },
          inquiry_email: { required: true, customemail: true },
          inquiry_phonecode: {
            required: {
              depends: function (element) {
                return $(".customSelect").val() == "";
              },
            },
          },
          inquiry_phone: {
            required: true,
            nozerophone: true,
            mobileNewValidator: true,
            minlength: 10,
            maxlength: 25,
          },
          inquiry_services: { required: true },
          inquiry_uploadfile: {
            required: false,
            extension: "txt|pdf|doc|docx|xls|xlsx",
            checkmultiext: true,
            /*extension: "txt|pdf|doc|docx|xls|xlsx",accept: "text/plain,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",*/ minsize: 1,
            maxsize: 3000,
          },
          inquiry_description: {
            required: true,
            checkmultispace: true,
            minlength: 20,
            maxlength: 1000,
          },
          "g-recaptcha-response": {
            required: function () {
              if (grecaptcha.getResponse() === "") {
                return true;
              } else {
                return false;
              }
            },
          },
        },
        onkeyup: function (element, event) {
          if (event.which === 9 && this.elementValue(element) === "") {
            return;
          } else {
            this.element(element);
          }
        },
        highlight: function (element, errorClass, validClass) {
          $(element)
            .closest("div")
            .addClass(errorClass)
            .removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element)
            .closest("div")
            .addClass(validClass)
            .removeClass(errorClass);
        },
        showErrors: function (map, list) {
          this.defaultShowErrors();
          $("label.error").each(function (index) {
            if ($(this).parents(".valid").length) {
              $(this).attr("title", "Valid").text("Valid");
            } else {
              $(this).attr("title", $(this).text());
              if (($(this).children("span").length = 0)) {
                $(this).wrapInner('<span class="errorOut"><i></i><span>');
              }
            }
          });
        },
        //errorPlacement: function(error, element) {
        //error.wrapInner('<span class="errorOut"><span></span></sapn>').insertAfter(element);
        //},
        messages: {
          inquiry_firstname: {
            required: "Please enter your first name",
            alphabets: "Please enter your correct name",
            minlength: jQuery.validator.format(
              "At least {0} characters required"
            ),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} characters"
            ),
          },
          inquiry_lastname: {
            required: "Please enter your last name",
            alphabets: "Please enter your correct name",
            minlength: jQuery.validator.format(
              "At least {0} characters required"
            ),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} characters"
            ),
          },
          inquiry_email: {
            required: "Please enter email address",
            customemail: "Please enter a valid email address",
          },
          inquiry_phonecode: "Please select phonecode",
          inquiry_phone: {
            required: "Please enter your mobile number",
            minlength: jQuery.validator.format("At least {0} digits require."),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} digits"
            ),
          },
          inquiry_services: "Please select service",
          inquiry_uploadfile: {
            accept:
              "Please upload valid project document (PDF, DOC, XLS or Text file)",
          },
          "g-recaptcha-response": "Please verify your response using captcha",
          inquiry_description: {
            required: "Please enter your message",
            minlength: jQuery.validator.format(
              "At least {0} characters required"
            ),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} characters"
            ),
          },
        },
        submitHandler: function (form) {
          $(form).addClass("frm-submit-process");
          form.submit();
        },
      };
      $("#inquiryform").validate(inquiryform);
      for (field in inquiryform.rules) {
        if ($("#" + field).length > 0) {
          $(
            '<label for="' +
              field +
              '" id="' +
              field +
              '-error" class="error" style="display:none;"></label>'
          ).insertAfter("#" + field);
        }
      }
    }

    /*if( $("#quickinquiryform").length){
            
            $("#quickinquiryform button.commonBtn").attr('type','submit');
            var quickinquiryform = {
                //ignore: ".ignore",
                rules: {
                    quick_inquiry_firstname: {required: true,alphabets: true,checkmultispace:true,minlength: 3,maxlength: 30},
                    quick_inquiry_email: {required: true,customemail:true},
                    quick_inquiry_phonecode: {required: {depends: function(element) {return $(".customSelect").val() == '';}}},
                    quick_inquiry_phone: {required: true,nozerophone: true,phoneNewValidator: true,minlength: 10,maxlength: 25},
                    quick_inquiry_description:{required: true,checkmultispace: true,minlength: 20,maxlength: 500},
                    'g-recaptcha-response': {   required: function() {   if(grecaptcha.getResponse() === '') {return true;} else {return false;}}}
                },
                onkeyup: function (element, event) {if (event.which === 9 && this.elementValue(element) === "") {return;} else {this.element(element);}},
                highlight: function(element, errorClass, validClass) {$(element).closest('div').addClass(errorClass).removeClass(validClass);},
                unhighlight: function(element, errorClass, validClass) {$(element).closest('div').addClass(validClass).removeClass(errorClass);},
                showErrors: function (map, list) {this.defaultShowErrors();$('label.error').each(function (index) {if($(this).parents(".valid").length) {$(this).attr("title", "Valid").text("Valid");} else {$(this).attr("title", $(this).text());if ($(this).children("span").length = 0) {$(this).wrapInner('<span class="errorOut"><i></i><span>');}}});
                },
                //errorPlacement: function(error, element) {
                    //error.wrapInner('<span class="errorOut"><span></span></sapn>').insertAfter(element);
                //},
                messages: {
                    quick_inquiry_firstname: {required: "Please enter your full name",alphabets: "Please enter your correct name",minlength: jQuery.validator.format("At least {0} characters required"),maxlength: jQuery.validator.format("You can not insert more then {0} characters")},
                    quick_inquiry_email:{required:"Please enter email address",customemail:"Please enter a valid email address"},
                    quick_inquiry_phonecode: "Please select phonecode",
                    quick_inquiry_phone: {required: "Please enter your phone number",minlength: jQuery.validator.format("At least {0} digits require."),maxlength: jQuery.validator.format("You can not insert more then {0} digits")},            
                    'g-recaptcha-response':"Please verify your response using captcha",
                    quick_inquiry_description: {required: "Please share details about your project requirement",minlength: jQuery.validator.format("At least {0} characters required"),maxlength: jQuery.validator.format("You can not insert more then {0} characters")}
                    },
                submitHandler: function(form) {$(form).addClass('frm-submit-process'); form.submit();}
            };	
            $("#quickinquiryform").validate(quickinquiryform);
            for(field in quickinquiryform.rules){
                if($('#'+field).length > 0){
                    $('<label for="'+field+'" id="'+field+'-error" class="error" style="display:none;"></label>').insertAfter('#'+field);
                }
            }
            
        }*/

    if ($("#requestCallFrom").length) {
      $("#requestCallFrom button.commonBtnArrow").attr("type", "submit");
      var requestCallFrom = {
        //ignore: ".ignore",
        rules: {
          schdulecall_firstname: {
            required: true,
            alphabets: true,
            checkmultispace: true,
            minlength: 3,
            maxlength: 30,
          },
          schdulecall_phonecode: {
            required: {
              depends: function (element) {
                return $(".schdulecall_phonecall").val() == "";
              },
            },
          },
          schdulecall_phone: {
            required: true,
            nozerophone: true,
            phoneNewValidator: true,
            minlength: 10,
            maxlength: 25,
          },
          schdulecall_email: { required: true, customemail: true },
          schdulecall_services: { required: true },
          schdulecall_description: {
            required: true,
            checkmultispace: true,
            minlength: 20,
            maxlength: 500,
          },
          "g-recaptcha-response": {
            required: function () {
              if (grecaptcha.getResponse() === "") {
                return true;
              } else {
                return false;
              }
            },
          },
        },
        onkeyup: function (element, event) {
          if (event.which === 9 && this.elementValue(element) === "") {
            return;
          } else {
            this.element(element);
          }
        },
        highlight: function (element, errorClass, validClass) {
          $(element)
            .closest("div")
            .addClass(errorClass)
            .removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element)
            .closest("div")
            .addClass(validClass)
            .removeClass(errorClass);
        },
        showErrors: function (map, list) {
          this.defaultShowErrors();
          $("label.error").each(function (index) {
            if ($(this).parents(".valid").length) {
              $(this).attr("title", "Valid").text("Valid");
            } else {
              $(this).attr("title", $(this).text());
              if (($(this).children("span").length = 0)) {
                $(this).wrapInner('<span class="errorOut"><i></i><span>');
              }
            }
          });
        },
        //errorPlacement: function(error, element) {
        //error.wrapInner('<span class="errorOut"><span></span></sapn>').insertAfter(element);
        //},
        messages: {
          schdulecall_firstname: {
            required: "Please enter your full name",
            alphabets: "Please enter your correct name",
            minlength: jQuery.validator.format(
              "At least {0} characters required"
            ),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} characters"
            ),
          },
          schdulecall_phonecode: "Please select country code",
          schdulecall_phone: {
            required: "Please enter your phone number",
            minlength: jQuery.validator.format("At least {0} digits require."),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} digits"
            ),
          },
          schdulecall_email: {
            required: "Please enter your email address",
            customemail: "Please enter a valid email address",
          },
          schdulecall_services: "Please select service",
          "g-recaptcha-response": "Please verify your response using captcha",
          schdulecall_description: {
            required: "Please enter your message",
            minlength: jQuery.validator.format(
              "At least {0} characters required"
            ),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} characters"
            ),
          },
        },
        submitHandler: function (form) {
          $(form).addClass("frm-submit-process");
          form.submit();
        },
      };
      var schvalidator = $("#requestCallFrom").validate(requestCallFrom);
      for (field in requestCallFrom.rules) {
        if ($("#" + field).length > 0) {
          $(
            '<label for="' +
              field +
              '" id="' +
              field +
              '-error" class="error" style="display:none;"></label>'
          ).insertAfter("#" + field);
        }
      }

      $("#schduleCall .btnRow .resetBtn").click(function () {
        document.getElementById("requestCallFrom").reset();
        $("#requestCallFrom").removeClass("frm-submit-process");
        schvalidator.resetForm();
      });
      $(document).on("click", ".popup-modal-dismiss", function () {
        document.getElementById("requestCallFrom").reset();
        $("#requestCallFrom").removeClass("frm-submit-process");
        schvalidator.resetForm();
      });

      // Popup click outside form reset error
      $(document).on("click", "#wrapper", function () {
        document.getElementById("requestCallFrom").reset();
        $("#requestCallFrom").removeClass("frm-submit-process");
        schvalidator.resetForm();
      });
    }

    if ($("#getquoteform").length) {
      $("#getquoteform button.arrowBtnSubmit").attr("type", "submit");
      var getquoteform = {
        rules: {
          getquote_firstname: {
            required: true,
            alphabets: true,
            checkmultispace: true,
            minlength: 3,
            maxlength: 30,
          },
          getquote_email: { required: true, customemail: true },
          getquote_phonecode: {
            required: {
              depends: function (element) {
                return $(".customSelect").val() == "";
              },
            },
          },
          getquote_phone: {
            required: true,
            nozerophone: true,
            phoneNewValidator: true,
            minlength: 10,
            maxlength: 25,
          },
          getquote_uploadfile: {
            required: false,
            extension: "txt|pdf|doc|docx|xls|xlsx",
            checkmultiext: true,
            /*accept: "text/plain,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",*/ minsize: 1,
            maxsize: 3000,
          },
          "g-recaptcha-response": {
            required: function () {
              if (grecaptcha.getResponse() === "") {
                return true;
              } else {
                return false;
              }
            },
          },
        },
        onkeyup: function (element, event) {
          if (event.which === 9 && this.elementValue(element) === "") {
            return;
          } else {
            this.element(element);
          }
        },
        highlight: function (element, errorClass, validClass) {
          $(element)
            .closest("div")
            .addClass(errorClass)
            .removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element)
            .closest("div")
            .addClass(validClass)
            .removeClass(errorClass);
        },
        showErrors: function (map, list) {
          this.defaultShowErrors();
          $("label.error").each(function (index) {
            if ($(this).parents(".valid").length) {
              $(this).attr("title", "Valid").text("Valid");
            } else {
              $(this).attr("title", $(this).text());
              if (($(this).children("span").length = 0)) {
                $(this).wrapInner('<span class="errorOut"><i></i><span>');
              }
            }
          });
        },
        //errorPlacement: function(error, element) {
        //error.wrapInner('<span class="errorOut"><span></span></sapn>').insertAfter(element);
        //},
        messages: {
          getquote_firstname: {
            required: "Please enter your full name",
            alphabets: "Please enter your correct name",
            minlength: jQuery.validator.format(
              "At least {0} characters required"
            ),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} characters"
            ),
          },
          getquote_email: {
            required: "Please enter email address",
            customemail: "Please enter a valid email address",
          },
          getquote_phonecode: "Please select country code",
          getquote_phone: {
            required: "Please enter your phone number",
            minlength: jQuery.validator.format("At least {0} digits require."),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} digits"
            ),
          },
          /*getquote_uploadfile: {accept: "Please upload valid project document (PDF, DOC, XLS or Text file)"},*/
          "g-recaptcha-response": "Please verify your response using captcha",
        },
        submitHandler: function (form) {
          $(form).addClass("frm-submit-process");
          form.submit();
        },
      };
      $("#getquoteform").validate(getquoteform);
      for (field in getquoteform.rules) {
        if ($("#" + field).length > 0) {
          $(
            '<label for="' +
              field +
              '" id="' +
              field +
              '-error" class="error" style="display:none;"></label>'
          ).insertAfter("#" + field);
        }
      }
    }

    if ($("#courseFrom").length) {
      $("#courseFrom button.commonBtnArrow").attr("type", "submit");
      var courseFrom = {
        //ignore: ".ignore",
        rules: {
          course_full_name: {
            required: true,
            alphabets: true,
            checkmultispace: true,
            minlength: 3,
            maxlength: 30,
          },
          course_email: { required: true, customemail: true },
          course_phone: {
            required: true,
            phoneNewValidator: true,
            minlength: 10,
            maxlength: 25,
          },
          course_collegename: {
            required: true,
            alphabets: true,
            checkmultispace: true,
            minlength: 3,
            maxlength: 50,
          },
          tech_select_course: { required: true },
          course_description: {
            required: false,
            checkmultispace: true,
            minlength: 20,
            maxlength: 500,
          },
          "g-recaptcha-response": {
            required: function () {
              if (grecaptcha.getResponse() === "") {
                return true;
              } else {
                return false;
              }
            },
          },
        },
        onkeyup: function (element, event) {
          if (event.which === 9 && this.elementValue(element) === "") {
            return;
          } else {
            this.element(element);
          }
        },
        highlight: function (element, errorClass, validClass) {
          $(element)
            .closest("div")
            .addClass(errorClass)
            .removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element)
            .closest("div")
            .addClass(validClass)
            .removeClass(errorClass);
        },
        showErrors: function (map, list) {
          this.defaultShowErrors();
          $("label.error").each(function (index) {
            if ($(this).parents(".valid").length) {
              $(this).attr("title", "Valid").text("Valid");
            } else {
              $(this).attr("title", $(this).text());
              if (($(this).children("span").length = 0)) {
                $(this).wrapInner('<span class="errorOut"><i></i><span>');
              }
            }
          });
        },
        //errorPlacement: function(error, element) {
        //error.wrapInner('<span class="errorOut"><span></span></sapn>').insertAfter(element);
        //},
        messages: {
          course_full_name: {
            required: "Please enter your full name",
            alphabets: "Please enter your correct name",
            minlength: jQuery.validator.format(
              "At least {0} characters required"
            ),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} characters"
            ),
          },
          course_email: {
            required: "Please enter email address",
            customemail: "Please enter a valid email address",
          },
          course_phone: {
            required: "Please enter your phone number",
            minlength: jQuery.validator.format("At least {0} digits require."),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} digits"
            ),
          },
          course_collegename: {
            required: "Please enter your college name",
            alphabets: "Please enter your correct college name",
            minlength: jQuery.validator.format(
              "At least {0} characters required"
            ),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} characters"
            ),
          },
          tech_select_course: "Please select course",
          "g-recaptcha-response": "Please verify your response using captcha",
          course_description: {
            required: "Please enter your message",
            minlength: jQuery.validator.format(
              "At least {0} characters required"
            ),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} characters"
            ),
          },
        },
        submitHandler: function (form) {
          $(form).addClass("frm-submit-process");
          form.submit();
        },
      };
      var schvalidator = $("#courseFrom").validate(courseFrom);
      for (field in courseFrom.rules) {
        if ($("#" + field).length > 0) {
          $(
            '<label for="' +
              field +
              '" id="' +
              field +
              '-error" class="error" style="display:none;"></label>'
          ).insertAfter("#" + field);
        }
      }

      $("#course .btnRow .resetBtn").click(function () {
        document.getElementById("courseFrom").reset();
        $("#courseFrom").removeClass("frm-submit-process");
        schvalidator.resetForm();
      });
      $(document).on("click", ".popup-modal-dismiss", function () {
        document.getElementById("courseFrom").reset();
        $("#courseFrom").removeClass("frm-submit-process");
        schvalidator.resetForm();
      });

      // Popup click outside form reset error
      $(document).on("click", "#wrapper", function () {
        document.getElementById("courseFrom").reset();
        $("#courseFrom").removeClass("frm-submit-process");
        schvalidator.resetForm();
      });
    }

    if ($("#courseppcFrom").length) {
      $("#courseppcFrom button.commonBtnArrow").attr("type", "submit");
      var courseppcFrom = {
        //ignore: ".ignore",
        rules: {
          course_ppc_full_name: {
            required: true,
            alphabets: true,
            checkmultispace: true,
            minlength: 3,
            maxlength: 30,
          },
          course_ppc_email: { required: true, customemail: true },
          course_ppc_phone: {
            required: true,
            phoneNewValidator: true,
            minlength: 10,
            maxlength: 25,
          },
          course_ppc_city: {
            required: true,
            alphabets: true,
            checkmultispace: true,
            minlength: 3,
            maxlength: 30,
          },
          course_ppc_collegename: {
            required: true,
            alphabets: true,
            checkmultispace: true,
            minlength: 3,
            maxlength: 50,
          },
          course_ppc_coursename: { required: true },
          "g-recaptcha-response": {
            required: function () {
              if (grecaptcha.getResponse() === "") {
                return true;
              } else {
                return false;
              }
            },
          },
        },
        onkeyup: function (element, event) {
          if (event.which === 9 && this.elementValue(element) === "") {
            return;
          } else {
            this.element(element);
          }
        },
        highlight: function (element, errorClass, validClass) {
          $(element)
            .closest("div")
            .addClass(errorClass)
            .removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element)
            .closest("div")
            .addClass(validClass)
            .removeClass(errorClass);
        },
        showErrors: function (map, list) {
          this.defaultShowErrors();
          $("label.error").each(function (index) {
            if ($(this).parents(".valid").length) {
              $(this).attr("title", "Valid").text("Valid");
            } else {
              $(this).attr("title", $(this).text());
              if (($(this).children("span").length = 0)) {
                $(this).wrapInner('<span class="errorOut"><i></i><span>');
              }
            }
          });
        },
        //errorPlacement: function(error, element) {
        //error.wrapInner('<span class="errorOut"><span></span></sapn>').insertAfter(element);
        //},
        messages: {
          course_ppc_full_name: {
            required: "Please enter your full name",
            alphabets: "Please enter your correct name",
            minlength: jQuery.validator.format(
              "At least {0} characters required"
            ),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} characters"
            ),
          },
          course_ppc_email: {
            required: "Please enter email address",
            customemail: "Please enter a valid email address",
          },
          course_ppc_phone: {
            required: "Please enter your phone number",
            minlength: jQuery.validator.format("At least {0} digits require."),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} digits"
            ),
          },
          course_ppc_city: {
            required: "Please enter city name",
            alphabets: "Please enter correct city name",
            minlength: jQuery.validator.format(
              "At least {0} characters required"
            ),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} characters"
            ),
          },
          course_ppc_coursename: "Please select course",
          course_ppc_collegename: {
            required: "Please enter your college name",
            alphabets: "Please enter your correct college name",
            minlength: jQuery.validator.format(
              "At least {0} characters required"
            ),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} characters"
            ),
          },
          "g-recaptcha-response": "Please verify your response using captcha",
        },
        submitHandler: function (form) {
          $(form).addClass("frm-submit-process");
          form.submit();
        },
      };
      var schvalidator = $("#courseppcFrom").validate(courseppcFrom);
      for (field in courseppcFrom.rules) {
        if ($("#" + field).length > 0) {
          $(
            '<label for="' +
              field +
              '" id="' +
              field +
              '-error" class="error" style="display:none;"></label>'
          ).insertAfter("#" + field);
        }
      }
    }

    if ($("#getintouchform").length) {
      $("#getintouchform button.arrowBtnSubmit").attr("type", "submit");
      var getintouchform = {
        rules: {
          getintouch_firstname: {
            required: true,
            alphabets: true,
            checkmultispace: true,
            minlength: 3,
            maxlength: 30,
          },
          getintouch_email: { required: true, customemail: true },
          getintouch_phonecode: {
            required: {
              depends: function (element) {
                return $(".customSelect").val() == "";
              },
            },
          },
          getintouch_phone: {
            required: true,
            phoneNewValidator: true,
            minlength: 10,
            maxlength: 25,
          },
          getintouch_description: {
            required: false,
            checkmultispace: true,
            minlength: 20,
            maxlength: 500,
          },
          "g-recaptcha-response": {
            required: function () {
              if (grecaptcha.getResponse() === "") {
                return true;
              } else {
                return false;
              }
            },
          },
        },
        onkeyup: function (element, event) {
          if (event.which === 9 && this.elementValue(element) === "") {
            return;
          } else {
            this.element(element);
          }
        },
        highlight: function (element, errorClass, validClass) {
          $(element)
            .closest("div")
            .addClass(errorClass)
            .removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element)
            .closest("div")
            .addClass(validClass)
            .removeClass(errorClass);
        },
        showErrors: function (map, list) {
          this.defaultShowErrors();
          $("label.error").each(function (index) {
            if ($(this).parents(".valid").length) {
              $(this).attr("title", "Valid").text("Valid");
            } else {
              $(this).attr("title", $(this).text());
              if (($(this).children("span").length = 0)) {
                $(this).wrapInner('<span class="errorOut"><i></i><span>');
              }
            }
          });
        },
        //errorPlacement: function(error, element) {
        //error.wrapInner('<span class="errorOut"><span></span></sapn>').insertAfter(element);
        //},
        messages: {
          getintouch_firstname: {
            required: "Please enter your full name",
            alphabets: "Please enter your correct name",
            minlength: jQuery.validator.format(
              "At least {0} characters required"
            ),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} characters"
            ),
          },
          getintouch_email: {
            required: "Please enter email address",
            customemail: "Please enter a valid email address",
          },
          getintouch_phonecode: "Please select country code",
          getintouch_phone: {
            required: "Please enter your phone number",
            minlength: jQuery.validator.format("At least {0} digits require."),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} digits"
            ),
          },
          getintouch_description: {
            required: "Please enter your description",
            minlength: jQuery.validator.format(
              "At least {0} characters required"
            ),
            maxlength: jQuery.validator.format(
              "You can not insert more then {0} characters"
            ),
          },
          "g-recaptcha-response": "Please verify your response using captcha",
        },
        submitHandler: function (form) {
          $(form).addClass("frm-submit-process");
          form.submit();
        },
      };
      $("#getintouchform").validate(getintouchform);
      for (field in getintouchform.rules) {
        if ($("#" + field).length > 0) {
          $(
            '<label for="' +
              field +
              '" id="' +
              field +
              '-error" class="error" style="display:none;"></label>'
          ).insertAfter("#" + field);
        }
      }
    }

    // Form Validation Part
    if ($(".popupFolio").length) {
      window.fbAsyncInit = function () {
        FB.init({
          appId: "189300565117732", //'1608066909522741',
          app_secret: "ac3094c2f7237fc5349a67b02692be09",
          xfbml: true,
          version: "v2.6",
        });
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
      $(".popupFolio").on("click", function () {
        var id = $(this).attr("href");
        var windowurl = window.location.href;
        var href = id.replace("#", "");
        //var url = windowurl + "%23" + href;
        var url = windowurl;
        var text = $(id).find("h3").text();
        /*if($(".portfolioItemBox .commonCarouselImg").length){
            var img = $(this).find(".commonCarouselImg img").attr("src");
            }
            if($(".portfolioItemBox .portfolioCarouselImg").length){
                var img = $(this).find(".portfolioCarouselImg img").attr("src");
                }*/
        var img =
          "https://www.silvertouch.com/wp-content/themes/silvertouch/assets/images/portfolio-right-img.jpg";
        //alert(img);
        $(".shreThisPro").share({
          url: url, //the url you want to share. default: window.location.href
          title: text, //
          text: text, // text to be tweeted alongside your link, default: your page's meta description
          image: img, // image to be shared (facebook-specific)
          app_id: "189300565117732", //'1608066909522741', // facebook app id for tracking shares. if provided, will use the facebook API
          app_secret: "ac3094c2f7237fc5349a67b02692be09",
          background: "rgba(255, 138, 15,.7)", // background color of the button, default: #e1e1e1
          color: "#fff", // text color of the button
          button_text: "share", // change the text of the button, default: Share
          facebook: {
            name: text,
            link: url,
            image: img,
            //caption: url
          },
          twitter: {
            text: text,
            link: url,
          },
        });
      });
    }

    /*$(window).scroll(function(){
                 var SYS1 = $(".sysIntSttl").offset().top - 100,
                      SYS2 = $(".sysIntSttl").offset().top,
                      SYS3 = $(".sysIntSttl").offset().top + 100,
                      SYS4 = $(".sysIntSttl").offset().top + 200;
                 var scroll = $(window).scrollTop();
                     if (scroll >= SYS1){
                        $(".tabNavigation li:nth-child(1) a").trigger('click');
                    }
                    if (scroll >= SYS2){
                        $(".tabNavigation li:nth-child(2) a").trigger('click');
                    }
                    if (scroll >= SYS3){
                        $(".tabNavigation li:nth-child(3) a").trigger('click');
                    }
                    if (scroll >= SYS4){
                        $(".tabNavigation li:nth-child(4) a").trigger('click');
                    }
            });*/

    /*$(window).scroll(function(){
                $(".tabNavigation li").each(function(){
                var scroll = $(window).scrollTop();	
                 var SYS1 = $(this).offset().top - 250;
                 if (scroll >= SYS1){$(this).find("a").trigger('click');}
                    else {return false;}
                });
            });*/

    //Pre page right arrow
    if ($(".servicesWrap .servicesBox").length > 4) {
      $(".preArrow").addClass("show");
      setTimeout(function () {
        $(".preArrow").addClass("hide");
      }, 5000);
    }

    //Copy RGB color in clipboard
    $(".colorBox").click(function () {
      var $this = $(this);
      var copyText = $this.find(".rgbColorCode")[0];
      var copyTextVal = $this.find(".rgbColorCode").val();
      copyText.select();
      document.execCommand("Copy");
      $(".copiedTooltip").hide();
      $this
        .find(".copiedTooltip")
        .text("Hex: " + copyTextVal + " copied")
        .fadeIn();
      setTimeout(function () {
        $this.find(".copiedTooltip").fadeOut(500);
      }, 2000);
    });

    //home page load poupu

    if ($(".closeLoadPoup").length) {
      $(".closeLoadPoup").on("click", function (e) {
        e.preventDefault();
        $(".pageLoadPopup").removeClass("active");
        $("html, body").css("overflow", "auto");
      });
      $(document).click(function () {
        $(".pageLoadPopup").removeClass("active");
        $("html, body").css("overflow", "auto");
      });
    }

    if ($("#inquiryform").length) {
      $("#inquiryform .animateBdrField input[id=inquiry_uploadrfp]").blur(
        function () {
          var titleval = $(".file-upload-input").attr("title");
          if (titleval == "") {
            $("#inquiry_uploadrfp-error").removeClass("error");
          } else {
            $("#inquiry_uploadrfp-error").addClass("error");
            $("#inquiry_uploadrfp-error").attr("title", "Valid");
          }
        }
      );
    }
  });
  /*================= On Document Load End =================*/

  /*================= On Document Load and Resize Start =================*/
  $(window)
    .on("resize", function () {
      ww = document.body.clientWidth;
      wh = document.body.clientHeight;
      setTimeout(function () {
        $(".vCenter").each(function () {
          $(this).verticalAlign();
        });
      }, 200);
      if ($("body").hasClass("mobilePort")) {
        $("body").removeClass("wob");
      }
      //$('.container').resize(function(){});
      $(".reorderNav [data-filter].active a").trigger("click");
    })
    .trigger("resize");
  /*================= On Document Load and Resize End =================*/

  /*================= On Window Resize Start =================*/
  $(window).bind("resize orientationchange", function () {
    getWidth();
    phoneNo();
    swiperSelectable();
    animation();
    //winHeightBlock();
    $(".vCenter").each(function () {
      $(this).verticalAlign();
    });
    if ($(".serviesContentPart").length) {
      slider();
    }
    if ($(".servicesBox").length) {
      enableHover();
      setTimeout(function () {
        if ($(ww > 1023)) {
          $(".megaMenuWrap").each().removeAttr("style");
        }
      }, 500);
    }
    $(".reorderNav [data-filter].active a").trigger("click");
  });

  /*================= On Window Resize End =================*/

  /*================= On Window Load Start =================*/
  $(window).load(function () {
    //lazyload();
    if ($(".lazyload").length) {
      $(".lazyload").lazyLoadXT({ show: true });
    }

    $(".contactFormSection select#inquiry_phonecode").attr("style", "");

    setTimeout(function () {
      //$('#loading').fadeOut();

      if ($(".custom-file-upload").length) {
        $(".custom-file-upload input[type=file]").each(function () {
          var placeholderT = $(this).attr("data-placeholder");
          $(this)
            .siblings(".file-upload-input")
            .attr("placeholder", placeholderT);

          $(document).on(
            "focus",
            ".custom-file-upload .file-upload-input",
            function () {
              //$(this).siblings(".file-upload-button").trigger("click");
            }
          );
        });

        if (isIEver() == 10) {
          $(document).on("click", ".file-upload-button", function (e) {
            e.preventDefault();
            $(this).siblings(".custom-file-upload-hidden").trigger("click");
          });
        }
      }

      if ($(".focusAnim").length) {
        $(".focusAnim").each(function () {
          $(this).find("input[type=text]").addClass("bdrAnimate");
          $(this).find("input[type=email]").addClass("bdrAnimate");
          $(this).find("input[type=tel]").addClass("bdrAnimate");
          //$(this).find(".file-upload-input").addClass("bdrAnimate");
          $(this).find("textarea").addClass("bdrAnimate");
          $(this).wrapInner('<div class="animateBdrField"></div>');
          $(this)
            .find(".animateBdrField")
            .append('<span class="focus-border"><i></i></span>');
        });
      }
    }, 300);

    setTimeout(function () {
      $("body.home").addClass("pageLoaded");
    }, 500);

    if ($(".splashPage").length) {
      $(".splashPage #q").attr("value", "");
    }
    /* if($(".pageLoadPopup").length){
        //alert(3);	
        setTimeout(function(){
        //var visits = jQuery.cookie('visits') || 0;
        //  visits++;
        //  jQuery.cookie('visits', visits, { expires: 1, path: '/' });
            //	if ( jQuery.cookie('visits') > 1 ) {
                    
            //	}else{
                $(".pageLoadPopup").addClass("active");
        if($(".pageLoadPopup").hasClass("active")){
            $("html, body").css("overflow", "hidden");
        }
        //		}	
        },1000);
        setTimeout(function(){
            if($(".pageLoadPopup").hasClass("active")){
                $(".pageLoadPopup").removeClass("active")
                $("html, body").css("overflow", "auto");
            }
        },10000);
        } */
    if ($(".pageLoadPopup").length) {
      //alert(3);
      setTimeout(function () {
        var visits = jQuery.cookie("visits") || 0;
        visits++;
        jQuery.cookie("visits", visits, { expires: 1, path: "/" });
        if (jQuery.cookie("visits") > 1) {
        } else {
          $(".pageLoadPopup").addClass("active");
          if ($(".pageLoadPopup").hasClass("active")) {
            $("html, body").css("overflow", "hidden");
          }
        }
      }, 2000);
    }
    if ($(".closeLoadPoup").length) {
      $(".closeLoadPoup").on("click", function (e) {
        e.preventDefault();
        $(".pageLoadPopup").removeClass("active");
        $("html, body").css("overflow", "auto");
      });
      $(".popupImg").click(function (e) {
        e.stopPropagation();
      });
      $(document).click(function () {
        $(".pageLoadPopup").removeClass("active");
        $("html, body").css("overflow", "auto");
      });
    }
    if ($(".closeStrip").length) {
      $(".closeStrip").on("click", function (e) {
        e.preventDefault();
        $(".topNewBanner").slideToggle();
      });
    }
  });
  /*================= On Document Load End =================*/

  function getWidth() {
    ww = document.body.clientWidth;
    if (ww > wideScreen) {
      $("body").removeClass("device").addClass("desktop widerDesktop");
    }
    if (ww > mobilePort && ww <= wideScreen) {
      $("body").removeClass("device widerDesktop").addClass("desktop");
    }
    if (ww < ipadView) {
      $("body").removeClass("desktop widerDesktop").addClass("device");
    }
    if (ww <= mobilePort) {
      $("body").removeClass("desktop widerDesktop").addClass("device");
    }
    if (ww > 1024) {
      $("body").removeClass("navigationIsOpen");
    }
    if (ww < 768) {
      $("body").addClass("mobile");
    } else {
      $("body").removeClass("mobile");
    }
    if (ww > 767 && ww < 1025) {
      $("body").addClass("ipad");
    } else {
      $("body").removeClass("ipad");
    }

    if (ww > 1380) {
      $("body").addClass("animationOn");
    } else {
      $("body").removeClass("animationOn");
    }
  }
})(jQuery);

function slider() {
  var mySwiper;
  function initSwiper() {
    var screenWidth = $(window).width();
    if (screenWidth < 1024) {
      setTimeout(function () {
        $(".servicesBox").removeClass("enableHover");
        mySwiper = new Swiper(".serviesContentPart", {
          // pagination: '.swiper-pagination',
          //nextButton: '.swiper-button-next',
          // prevButton: '.swiper-button-prev',
          // effect: slidingEffect,
          grabCursor: false,
          centeredSlides: true,
          slidesPerView: "auto",
          initialSlide: 1,
          loop: true,
          autoplay: false,
          speed: 800,
          paginationClickable: true,
          fade: { crossFade: false },
          watchSlidesVisibility: true,
          keyboardControl: true,
          coverflow: {
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 1.5,
            slideShadows: false,
          },
          breakpoints: {
            // when window width is <= 480px
            479: {
              //centeredSlides: false
            },
          },
        });
      }, 500);
    } else {
      if (screenWidth > 1023) {
        setTimeout(function () {
          if ($(".serviesContentPart .swiper-slide").length < 5) {
            var swiper = new Swiper(".serviesContentPart");
            swiper.destroy();
            $(".serviesContentPart .swiper-wrapper").removeAttr("style");
            $(".serviesContentPart .swiper-slide").removeAttr("style");
            $(".serviesContentPart .swiper-slide-duplicate").remove();
          }
          if ($(".serviesContentPart .swiper-slide").length > 4) {
            $(".servicesBox").addClass("enableHover");
            mySwiper = new Swiper(".serviesContentPart", {
              //pagination: '.swiper-pagination',
              nextButton: ".swiper-button-next",
              prevButton: ".swiper-button-prev",
              grabCursor: false,
              centeredSlides: false,
              slidesPerView: 4,
              initialSlide: 1,
              loop: true,
              autoplay: 7000,
              speed: 800,
              paginationClickable: true,
              fade: { crossFade: false },
              watchSlidesVisibility: true,
              keyboardControl: true,
              coverflow: {
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 1.5,
                slideShadows: false,
              },
              breakpoints: {
                479: {},
              },
            });
            $(".serviesContentPart.swiper-container-horizontal").hover(
              function () {
                mySwiper.stopAutoplay();
              },
              function () {
                mySwiper.startAutoplay();
              }
            );
          }
        }, 500);
      }
    }
  }

  //Swiper plugin initialization
  initSwiper();
}
function enableHover() {
  var div = document.querySelector(".servicesBox");
  div.addEventListener("webkitAnimationEnd", function () {
    $(".servicesBox").each(function () {
      if ($(window).width() < 1024) {
        $(this).removeClass("enableHover");
      } else {
        $(this).addClass("enableHover");
      }
    });
  });
}
function winHeightBlock() {
  var winHeight = $(window).height();
  $(".winHeightBlock").css("height", winHeight + "px");
}

function phoneNo() {
  if ($(".phoneNo").length) {
    if ($(window).width() < 1025) {
      $("li.phoneNo > span").replaceWith(
        '<a href="tel:1-201-299-3668"><span class="phoneNoWarp"><i class="mdi mdi-phone"><span class="hiddenText">Phone</span></i> <span class="phoneText">1-201-299-3668</span></span></a>'
      );
    } else {
      $("li.phoneNo > a").replaceWith(
        '<span class="phoneNoWarp"><i class="mdi mdi-phone"><span class="hiddenText">Phone</span></i> <span class="phoneText">1-201-299-3668</span></span>'
      );
    }
  }
}

function swiperSelectable() {
  if ($(".swipingEnable").length == 0) {
    if ($(".swiper-container").length) {
      $(".swiper-container").each(function () {
        if ($(window).width() < 1025) {
          $(this).removeClass("swiper-no-swiping");
        } else {
          $(this).addClass("swiper-no-swiping");
        }
      });
    }
  }
}

function cloneDiv() {
  if ($(".breadCumWrap").length) {
    $('<a href="#" class="breadCumIocn">Links Breadcum</a>')
      .appendTo(".breadCumWrap")
      .insertBefore(".breadCum");
  }
  if ($(".sectorsAndStory").length) {
    //$(".healthCare").clone().appendTo(".sectorDetailsWrap:first-child").addClass("showMobile");
    //$(".sectorBox.bgImg").clone().appendTo(".sectorDetailsWrap:last-child").addClass("showMobile");
  }
  if ($(".footerSocial").length) {
    $(".footerSocial")
      .clone()
      .appendTo(".footerContentRow")
      .insertBefore(".footerContentRow .container")
      .addClass("showMobile");
  }

  if ($(".bannerTechnologyIcon").length) {
    $(".bannerTechnologyIcon").clone().appendTo("#main");
  }

  if ($(".dropdownList").length) {
    $(".dropdownList > ul")
      .clone()
      .appendTo("body")
      .wrap(
        '<div id="cdNav" class="cdNav"><div class="cdNavigationWrapper"></div></div>'
      );
    $(
      "<a href='https://www.silvertouch.com' class='menuSttlLogo'></a>"
    ).insertBefore(".cdNavigationWrapper");
  }
  if ($(".indusTab").length) {
    $(
      "<div class='indusTabMobile'><span class='selectIndustries'>Select Industries</span><ul class='tabNavigation'></ul></div>"
    ).insertAfter(".botTabNav");
    setTimeout(function () {
      $(".industriesDetailWrap .tabNavigation li")
        .clone()
        .appendTo(".indusTabMobile ul");
    }, 2000);
  }

  if ($(".sectorsAndStory").length) {
    $(".sectorsAndStory").append(
      "<div class='sectorSlider'><div class='swiper-container'><div class='swiper-wrapper'></div></div></div>"
    );
    $(".sectorsAndStory")
      .find(".sectorSlider")
      .insertBefore(".sectorsAndStory .container");
    var cloneSector = $(".sectorDetailsWrap > a").clone();
    $(cloneSector).appendTo(".sectorSlider .swiper-wrapper");
    $(".sectorSlider").find(".bgImg").insertAfter(".sectorSlider .magentoBg");
    $(".sectorSlider a").each(function () {
      $(this).wrap("<div class='swiper-slide'></div>");
    });
    $(".sectorSlider .viewAllSector").parent().addClass("viewAllWrap");
    $(".sectorSlider .viewAllWrap").appendTo(".sectorSlider");
    $(".sectorSlider .viewAllWrap h3 span").append(
      "<span class='arrowSprite icon'></span>"
    );
  }

  if ($(".servicesBlock").length) {
    $(".servicesBlock").append(
      "<div class='servicesMobSlider'><div class='swiper-container'><div class='swiper-wrapper'></div></div></div>"
    );
    $(".servicesBlock")
      .find(".servicesMobSlider")
      .insertBefore(".servicesBlock .container");
    var cloneSector2 = $(".servicesSliderBlock .swiper-slide").clone();
    $(cloneSector2).appendTo(".servicesMobSlider .swiper-wrapper");
    $(".servicesMobSlider .swiper-wrapper")
      .find("img")
      .each(function () {
        $(this).attr("src", $(this).attr("data-src"));
      });
  }

  if ($(".portfolioTabBlock").length) {
    $(".portfolioTabBlock").append(
      "<div class='portfolioTabSlider reorderNavFolio'><div class='swiper-container'><div class='swiper-wrapper'></div></div></div>"
    );
    $(".portfolioTabBlock")
      .find(".portfolioTabSlider")
      .insertBefore(".portfolioTabBlock .container");
    var cloneSectorPortfolio = $(".reorderNavFolio .swiper-slide").clone();
    $(cloneSectorPortfolio).appendTo(".portfolioTabSlider .swiper-wrapper");
  }

  if ($(".ourServices").length) {
    $("<div class='cloneOurServiceText'></div>")
      .append()
      .insertAfter(".servicesSliderBlock");
    $(".paddingContent a.bdrBtn").clone().appendTo(".cloneOurServiceText");
    $(".paddingContent .counterBlock")
      .clone()
      .appendTo(".cloneOurServiceText")
      .insertBefore(".cloneOurServiceText a.bdrBtn");
  }
  if ($(".mobileAppPorfolio").length) {
    $("<div class='mobileShowClone'></div>").appendTo(".mobileAppPorfolio");
    $(".portfolioFilter a.commonBtnArrow").clone().appendTo(".mobileShowClone");
  }
  if ($(".sttlServicesIndSlider").length) {
    $("<div class='mobileIndSliderWrap'></div>").appendTo(
      ".serviceIndSliderWrap"
    );
    $(".mobileIndSliderWrap").append(
      "<div class='mobileIndSlider'><div class='swiper-container'><div class='swiper-wrapper'></div></div></div>"
    );
    var cloneSector1 = $(".sttlServicesIndSlider .indSerives").clone();
    $(".sttlServicesIndSlider .swiper-button-next")
      .clone()
      .appendTo(".mobileIndSliderWrap");
    $(".sttlServicesIndSlider .swiper-button-prev")
      .clone()
      .appendTo(".mobileIndSliderWrap");
    $(cloneSector1).appendTo(".mobileIndSliderWrap .swiper-wrapper");
    $(".mobileIndSlider .indSerives").each(function () {
      $(this).wrap("<div class='swiper-slide equalHeights'></div>");
    });
    $(".mobileIndSlider > .swiper-slide").equalHeight();
  }
  if ($(".innerBannerPart").length) {
    $(".innerBannerPart").addClass("activeBlock");
  }

  if ($(".upparMenu").length) {
    $(
      ".upparMenu ul.d-flex > li:nth-child(1), .upparMenu ul.d-flex > li:nth-child(2)"
    )
      .clone()
      .insertAfter(".cdNavigationWrapper > ul > li:last-child");
    $(".cdNavigationWrapper > ul > li").addClass("dropdown");
  }
  if ($(".commonBtnArrow, .commonBtn").length) {
    $("#wrapper").append(
      '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix><feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend></filter></defs></svg>'
    );
  }
  if ($(".shareBtnWrap").length) {
    $("#wrapper").append(
      '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800"><defs><filter id="goo1"><feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo1" /><feComposite in="SourceGraphic" in2="goo1" operator="atop"/></filter></defs></svg>'
    );
  }
  if ($("#wrapper > svg").length) {
    $("#wrapper > svg").wrapAll('<div class="svgWrapDiv"></div>');
  }
  if ($(".cdMorphDropdown").length) {
    $(".cdNavTrigger.innerWrapper").prepend(
      '<svg x="0px" y="0px" width="54px" height="54px" viewBox="0 0 54 54"><circle fill="transparent" stroke="#656e79" stroke-width="1" cx="27" cy="27" r="25" stroke-dasharray="157 157" stroke-dashoffset="157"></circle></svg>'
    );
    $("#header .cdNavTrigger").prepend(
      '<svg x="0px" y="0px" width="54px" height="54px" viewBox="0 0 54 54"><circle fill="transparent" stroke="#656e79" stroke-width="1" cx="27" cy="27" r="25" stroke-dasharray="157 157" stroke-dashoffset="157"></circle></svg>'
    );
  }

  //Industry Verticals slider content
  if ($(".industryVerticals").length) {
    $(".industryVerticals").append(
      "<div class='industryVerSlider'><div class='swiper-container'><div class='swiper-wrapper'></div></div></div>"
    );
    $(".industryVerticals")
      .find(".industryVerSlider")
      .insertAfter(".industryVerticals .industryVerList");
    var cloneSector1 = $(".industryVerList li a").clone();
    $(cloneSector1).appendTo(".industryVerSlider .swiper-wrapper");
    $(".industryVerSlider a").each(function () {
      $(this).wrap("<div class='swiper-slide'></div>");
    });
  }

  //Our Brand slider content
  if ($(".ourBrands").length) {
    $(".ourBrands").append(
      "<div class='ourBrandSlider'><div class='swiper-container'><div class='swiper-wrapper'></div></div></div>"
    );
    $(".ourBrands")
      .find(".ourBrandSlider")
      .insertAfter(".ourBrands .container");
    var ourBrandsCloneSector = $(".ourBrandsList li .ourBrandItem").clone();
    $(ourBrandsCloneSector).appendTo(".ourBrandSlider .swiper-wrapper");
    $(".ourBrandSlider .ourBrandItem").each(function () {
      $(this).wrap("<div class='swiper-slide'></div>");
    });
  }

  //Alliances slider content
  if ($(".accreditations").length) {
    $(".accreditations").append(
      "<div class='alliancesSlider'><div class='swiper-container'><div class='swiper-wrapper'></div></div></div>"
    );
    $(".accreditations")
      .find(".alliancesSlider")
      .insertAfter(".accreditations .container");
    var accreditationsCloneSector = $(
      ".accreditationsList li .alliancesItem"
    ).clone();
    $(accreditationsCloneSector).appendTo(".alliancesSlider .swiper-wrapper");
    $(".alliancesSlider .alliancesItem").each(function () {
      $(this).wrap("<div class='swiper-slide'></div>");
    });
  }

  //empanelmentsSlider slider content
  if ($(".empanelmentsWrap").length) {
    $(".empanelmentsWrap").append(
      "<div class='empanelmentsSlider'><div class='swiper-container'><div class='swiper-wrapper'></div></div></div>"
    );
    $(".empanelmentsWrap")
      .find(".alliancesSlider")
      .insertAfter(".empanelmentsWrap .container");
    var accreditationsCloneSector = $(
      ".empanelmentsList li .empanelmentsItem"
    ).clone();
    $(accreditationsCloneSector).appendTo(
      ".empanelmentsSlider .swiper-wrapper"
    );
    $(".empanelmentsSlider .empanelmentsItem").each(function () {
      $(this).wrap("<div class='swiper-slide'></div>");
      $(this).addClass("empanelmentBox");
    });
  }

  //Why Silvertouch slider content
  if ($(".whySilvertouch").length) {
    $(".whySilvertouch").append(
      "<div class='whySilvertouchSlider'><div class='swiper-container'><div class='swiper-wrapper'></div></div></div>"
    );
    $(".whySilvertouch")
      .find(".whySilvertouchSlider")
      .insertAfter(".whySilvertouch .container");
    var whySilvertouchCloneSector = $(
      ".homeFactsheetsList li .factSheetBox"
    ).clone();
    $(whySilvertouchCloneSector).appendTo(
      ".whySilvertouchSlider .swiper-wrapper"
    );
    $(".whySilvertouchSlider .factSheetBox").each(function () {
      $(this).wrap("<div class='swiper-slide'></div>");
    });
  }
  //microsoftDevelopment slider content
  if ($(".microsoftFrameBlock").length) {
    $(".microsoftFrameBlock").append(
      "<div class='microTechServicesSlider'><div class='swiper-container'><div class='swiper-wrapper'></div></div></div>"
    );
    $(".microsoftFrameBlock")
      .find(".microTechServicesSlider")
      .insertAfter(".microsoftFrameBlock .centerTitle");
    var whySilvertouchCloneSector = $(
      ".microsoftTechServies  li .iconTextWrap"
    ).clone();
    $(whySilvertouchCloneSector).appendTo(
      ".microTechServicesSlider .swiper-wrapper"
    );
    $(".microTechServicesSlider .iconTextWrap").each(function () {
      $(this).wrap("<div class='swiper-slide'></div>");
    });
  }
  //bigData slider content
  if ($(".bigDataTechLogos").length) {
    $(".bigDataTechLogos").append(
      "<div class='bigDataTechSlider'><div class='swiper-container'><div class='swiper-wrapper'></div></div></div>"
    );
    $(".bigDataTech")
      .find(".bigDataTechSlider")
      .insertAfter(".bigDataTech .container");
    var whySilvertouchCloneSector = $(
      ".bigDataTechLogos .bigDataLogoOuter"
    ).clone();
    $(whySilvertouchCloneSector).appendTo(".bigDataTechSlider .swiper-wrapper");
    $(".bigDataTechSlider .bigDataLogoOuter").each(function () {
      $(this).wrap("<div class='swiper-slide'></div>");
    });
  }
  //digital Transform slider content
  if ($(".digitalTransform4p").length) {
    $(".digitalTransform4p").append(
      "<div class='digitalTransSlider'><div class='swiper-container'><div class='swiper-wrapper'></div></div></div>"
    );
    $(".digitalTransform4p")
      .find(".digitalTransSlider")
      .insertAfter(".digitalTransform4p .container");
    var whySilvertouchCloneSector = $(
      ".digitalTransform4p .dt4PListBox"
    ).clone();
    $(whySilvertouchCloneSector).appendTo(
      ".digitalTransSlider .swiper-wrapper"
    );
    $(".digitalTransSlider .dt4PListBox").each(function () {
      $(this).wrap("<div class='swiper-slide'></div>");
    });
  }
  if ($(".positibiletiesSliderWrap").length) {
    $(".positibiletiesSliderWrap").append(
      "<div class='positibiletiesSliderMob'><div class='swiper-container'><div class='swiper-wrapper'></div></div></div>"
    );
    var whySilvertouchCloneSector = $(
      ".positibiletiesSlider .swiper-slide"
    ).clone();
    $(whySilvertouchCloneSector).appendTo(
      ".positibiletiesSliderMob .swiper-wrapper"
    );
  }

  //Home Enterprise IT Services
  if ($(".enterpriseSerWrap").length) {
    $(".enterpriseSerWrap").append(
      "<div class='enterpriseSerSlider'><div class='swiper-container'><div class='swiper-wrapper'></div><div class='enterpriseSerSlider-swiper-pagination'></div></div></div>"
    );
    $(".enterpriseSerWrap")
      .find(".enterpriseSerSlider")
      .insertAfter(".enterpriseSer");
    var enterpriseSerSliderFn = $(".enterpriseSer .serviceName").clone();
    $(enterpriseSerSliderFn).appendTo(".enterpriseSerSlider .swiper-wrapper");
    $(".enterpriseSerSlider .serviceName").each(function () {
      $(this).wrap("<div class='swiper-slide'></div>");
    });
  }

  //Home Enterprise IT Services
  if ($(".enterSoftSerWrap").length) {
    $(".enterSoftSerWrap").append(
      "<div class='enterSoftSerSlider'><div class='swiper-container'><div class='swiper-wrapper'></div><div class='enterSoftSerSlider-swiper-pagination'></div></div></div>"
    );
    $(".enterSoftSerWrap")
      .find(".enterSoftSerSlider")
      .insertAfter(".enterSoftSer");
    var enterSoftSerSliderFn = $(".enterSoftSer .serviceName").clone();
    $(enterSoftSerSliderFn).appendTo(".enterSoftSerSlider .swiper-wrapper");
    $(".enterSoftSerSlider .serviceName").each(function () {
      $(this).wrap("<div class='swiper-slide'></div>");
    });
  }

  //Museum Slider
  if ($(".museumIndustryList").length) {
    $(".museumIndustryList").append(
      "<div class='industryListSlider'><div class='swiper-container'><div class='swiper-wrapper'></div></div></div>"
    );
    $(".museumManagement")
      .find(".industryListSlider")
      .insertAfter(".museumIndustryList");
    var industryListSlider = $(
      ".museumIndustryList ul li .museumManage"
    ).clone();
    $(industryListSlider).appendTo(".industryListSlider .swiper-wrapper");
    $(".industryListSlider .museumManage").each(function () {
      $(this).wrap("<div class='swiper-slide'></div>");
    });
  }
}

function animation() {
  if ($(".animationOn").length) {
    $(window).paroller({
      //factor: 0.3,            // multiplier for scrolling speed and offset
      type: "background", // background, foreground
      direction: "vertical", // vertical, horizontal, TODO: diagonal
    });
  } else {
    $(".noAnimate").css({
      "background-position": "inherit",
      "-webkit-transform": "translateY(0)",
      "-ms-transform": "translateY(0)",
      "-o-transform": "translateY(0)",
      transform: "translateY(0)",
    });
  }
}

//remove hash in thank you url
function removeLocationHash() {
  var noHashURL = window.location.href.replace(/#.*$/, "");
  window.history.replaceState("", document.title, noHashURL);
}
window.addEventListener("popstate", function (event) {
  removeLocationHash();
});
window.addEventListener("hashchange", function (event) {
  event.preventDefault();
  removeLocationHash();
});
window.addEventListener("load", function () {
  removeLocationHash();
});

// Amee
// Techlab Page Redesign

$(document).ready(function () {
  // Custom-tabs
  $(".tab-nav span").on("click", function () {
    $([$(this).parent()[0], $($(this).data("href"))[0]])
      .addClass("active")
      .siblings(".active")
      .removeClass("active");
  });

  // footer-pics
  var $grid = $(".grid").packery({
    itemSelector: ".grid-item",
    // columnWidth: 250
  });
});

function changeai() {
  //x = document.getElementById("tech_select_course");
  //x.options[x.selectedIndex].text = "Artificial Intelligence & Machine Learning (AI & ML)";
  $("#tech_select_course option:selected").removeAttr("selected");
  $('select[name="tech_select_course"]')
    .find('option[value="YWk="]')
    .attr("selected", true);
  //x.options[x.selectedIndex].value = "YmlnZGF0YQ==";
}
function changerpa() {
  //x = document.getElementById("tech_select_course");
  //x.options[x.selectedIndex].text = "Robotic Process Automation (RPA)";
  $("#tech_select_course option:selected").removeAttr("selected");
  $('select[name="tech_select_course"]')
    .find('option[value="cnBh"]')
    .attr("selected", true);
  //x.options[x.selectedIndex].value = "cnBh";
}
function changeblokchain() {
  //x = document.getElementById("tech_select_course");
  //x.options[x.selectedIndex].text = "Blockchain";
  $("#tech_select_course option:selected").removeAttr("selected");
  $('select[name="tech_select_course"]')
    .find('option[value="YmxvY2tjaGFpbg=="]')
    .attr("selected", true);
  //x.options[x.selectedIndex].value = "YmxvY2tjaGFpbg==";
  //document.getElementById("tech_select_course").options[2].selected=true;
  //var optionToSelect = 'YmxvY2tjaGFpbg==';
  //$('#tech_select_course option:contains(' + optionToSelect + ')').attr('selected', 'selected');
  //x = document.getElementById("tech_select_course");
  //x.options[x.selectedIndex].value = "YmxvY2tjaGFpbg==";
  //$('#tech_select_course option[value="YmxvY2tjaGFpbg=="]').prop("selected", true);
}
function changeiot() {
  //x = document.getElementById("tech_select_course");
  //x.options[x.selectedIndex].text = "Internet of Things (IoT)";
  $("#tech_select_course option:selected").removeAttr("selected");
  $('select[name="tech_select_course"]')
    .find('option[value="aW90"]')
    .attr("selected", true);
  //x.options[x.selectedIndex].value = "aW90";
}
function changebigdata() {
  //x = document.getElementById("tech_select_course");
  //x.options[x.selectedIndex].text = "Big Data & Analytics";
  $("#tech_select_course option:selected").removeAttr("selected");
  $('select[name="tech_select_course"]')
    .find('option[value="YmlnZGF0YQ=="]')
    .attr("selected", true);
  //x.options[x.selectedIndex].value = "YmlnZGF0YQ==";
  //console.log( x.selectedIndex );
}

if ($(".techlabBanner").length) {
  // $(".techlabBanner").append("<div class='swiper-button-next3'>Next</div><div class='swiper-button-prev3'>Prev</div>");
  var techlabBanner = new Swiper(".techlabBanner .swiper-container", {
    pagination: false,
    paginationClickable: true,
    // nextButton: '.swiper-button-next3',
    //       prevButton: '.swiper-button-prev3',
    spaceBetween: 0,
    autoplay: 5000,
    loop: true,
    lazyLoading: true,
    lazyLoadingInPrevNext: true,
    slidesPerView: 1,
    disableOnInteraction: true,
    effect: "fade",
    //lazyLoadingOnTransitionStart:true,
  });

  var mySwiper = document.querySelector(
    ".techlabBanner .swiper-container"
  ).swiper;

  $(".techlabBanner .swiper-container").mouseenter(function () {
    mySwiper.autoplay.stop();
  });

  $(".techlabBanner .swiper-container").mouseleave(function () {
    mySwiper.autoplay.start();
  });
}

if ($(".educationSlider").length) {
  var educationSlider = new Swiper(".educationSlider .swiper-container", {
    pagination: false,
    noSwipingClass: false,
    paginationClickable: true,
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    slidesPerView: 5,
    // spaceBetween: 30,
    speed: 1000,
    autoplay: 5000,
    loop: true,
    breakpoints: {
      1199: {
        slidesPerView: 4,
        loop: true,
      },
      991: {
        slidesPerView: 3,
      },
      767: {
        slidesPerView: 2,
      },
      479: {
        slidesPerView: 1,
        centeredSlides: false,
        spaceBetween: 0,
      },
    },
  });
}

if ($(".marketingVideoSlider").length) {
  var marketingVideoSlider = new Swiper(
    ".marketingVideoSlider .swiper-container",
    {
      pagination: false,
      noSwipingClass: false,
      paginationClickable: true,
      nextButton: ".swiper-button-next-video",
      prevButton: ".swiper-button-prev-video",
      slidesPerView: 3,
      spaceBetween: 30,
      speed: 1000,
      autoplay: false,
      loop: false,
      breakpoints: {
        1199: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 3,
        },
        767: {
          slidesPerView: 2,
        },
        500: {
          slidesPerView: 1,
          centeredSlides: false,
        },
      },
    }
  );
}

if ($(".techlabtesTimonial").length) {
  var techlabtesTimonial = new Swiper(".techlabtesTimonial .swiper-container", {
    pagination: false,
    noSwipingClass: false,
    paginationClickable: true,
    nextButton: ".testi-swiper-button-next",
    prevButton: ".testi-swiper-button-prev",
    slidesPerView: 2,
    // spaceBetween: 30,
    speed: 1000,
    autoplay: 5000,
    loop: true,
    breakpoints: {
      850: {
        slidesPerView: 1,
        centeredSlides: false,
        spaceBetween: 10,
      },
    },
  });
}

if ($(".quotesSectionquotesSection").length) {
  $(".quotesSectionquotesSection .swiper-container").append(
    "<div class='swiper-pagination'></div>"
  );
  var quotesSectionquotesSection = new Swiper(
    ".quotesSectionquotesSection .swiper-container",
    {
      pagination: ".swiper-pagination",
      slidesPerView: 1,
      paginationClickable: true,
      spaceBetween: 30,
      speed: 1000,
      mousewheelControl: false,
      autoplayStopOnLast: false,
      autoplay: 5000,
      loop: true,
    }
  );
}

/* sp1996 - Techlab Form */
if ($("#commonPopupPopupFormn").length) {
  $("#commonPopupPopupFormn button.commonBtnArrow").attr("type", "submit");
  var techlab_applicationform = {
    //ignore: ".ignore",
    rules: {
      tech_user_name: {
        required: true,
        alphabets: true,
        checkmultispace: true,
        minlength: 3,
        maxlength: 30,
      },
      tech_user_email: { required: true, customemail: true },
      //: {required: {depends: function(element) {return $(".customSelect").val() == '';}}},
      tech_college_university: {
        required: true,
        alphabets: true,
        checkmultispace: true,
        minlength: 3,
        maxlength: 30,
      },
      tech_contact_number: {
        required: true,
        phoneNewValidator: true,
        minlength: 10,
        maxlength: 25,
      },
      tech_select_course: { required: true },
      tech_description: {
        required: true,
        checkmultispace: true,
        checkscripttags: true,
        minlength: 20,
        maxlength: 500,
      },
      //'g-recaptcha-response': {   required: function() {   if(grecaptcha.getResponse() === '') {return true;} else {return false;}}}
    },
    onkeyup: function (element, event) {
      if (event.which === 9 && this.elementValue(element) === "") {
        return;
      } else {
        this.element(element);
      }
    },
    highlight: function (element, errorClass, validClass) {
      $(element).closest("div").addClass(errorClass).removeClass(validClass);
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).closest("div").addClass(validClass).removeClass(errorClass);
    },
    showErrors: function (map, list) {
      this.defaultShowErrors();
      $("label.error").each(function (index) {
        if ($(this).parents(".valid").length) {
          $(this).attr("title", "Valid").text("Valid");
        } else {
          $(this).attr("title", $(this).text());
          if (($(this).children("span").length = 0)) {
            $(this).wrapInner('<span class="errorOut"><i></i><span>');
          }
        }
      });
    },
    //errorPlacement: function(error, element) {
    //error.wrapInner('<span class="errorOut"><span></span></sapn>').insertAfter(element);
    //},
    messages: {
      tech_user_name: {
        required: "Please enter your full name",
        alphabets: "Please enter your correct name",
        minlength: jQuery.validator.format("At least {0} characters required"),
        maxlength: jQuery.validator.format(
          "You can not insert more then {0} characters"
        ),
      },
      tech_user_email: {
        required: "Please enter email address",
        customemail: "Please enter a valid email address",
      },
      //quick_inquiry_phonecode: "Please select phonecode",
      tech_college_university: {
        required: "Please enter collage/university name",
        alphabets: "Please enter your correct name",
        minlength: jQuery.validator.format("At least {0} characters required"),
        maxlength: jQuery.validator.format(
          "You can not insert more then {0} characters"
        ),
      },
      tech_contact_number: {
        required: "Please enter your contact number",
        minlength: jQuery.validator.format("At least {0} digits require."),
        maxlength: jQuery.validator.format(
          "You can not insert more then {0} digits"
        ),
      },
      tech_select_course: { required: "Please select your course" },
      //'g-recaptcha-response':"Please verify your response using captcha",
      tech_description: {
        required: "Please share details about your project requirement",
        minlength: jQuery.validator.format("At least {0} characters required"),
        maxlength: jQuery.validator.format(
          "You can not insert more then {0} characters"
        ),
      },
    },
    submitHandler: function (form) {
      $(form).addClass("frm-submit-process");
      form.submit();
    },
  };
  $("#commonPopupPopupFormn").validate(techlab_applicationform);
  for (field in techlab_applicationform.rules) {
    if ($("#" + field).length > 0) {
      $(
        '<label for="' +
          field +
          '" id="' +
          field +
          '-error" class="error" style="display:none;"></label>'
      ).insertAfter("#" + field);
    }
  }
}

$(document).ready(function () {
  wfhofferingslider();
  $(".tabNav li").click(function () {
    wfhofferingslider();
  });
  if ($(".offring-popup-modal").length) {
    $(document).on("click", ".offring-popup-modal", function () {
      tabpopup();
    });
  }
});

function wfhofferingslider() {
  if ($(".silvertouchworkOfferingSlider").length) {
    $(".silvertouchworkOfferingSlider").each(function () {
      var sliderclass = $(this).find(".swiper-container");
      if ($(this).find(".swiper-slide").length > 1) {
        var silvertouchworkOfferingSlider = new Swiper(sliderclass, {
          noSwipingClass: false,
          paginationClickable: true,
          slidesPerView: 1,
          autoplay: 10000,
          slideVisibleClass: "active",
          nextButton: ".offerings-swiper-button-next",
          prevButton: ".offerings-swiper-button-prev",
          spaceBetween: 0,
          loop: true,
          updateOnWindowResize: true,
          preventClicks: false,
          preventClicksPropagation: false,
          touchRatio: 0,
        });
      }
    });
  }
}
function tabpopup() {
  $(".offring-popup-modal").magnificPopup({
    type: "inline",
    preloader: false,
    focus: "#username",
    CloseOnBgClick: true,
    enableEscapeKey: true,
  });
}

$(document).ready(function () {
  // Amee JS start
  scrollNav();

  if (jQuery(".homeMAinBanner").length > 0) {
    // alert(jQuery(".mainBanner .item").length);
    $(".homeMAinBanner.owl-carousel").owlCarousel({
      loop: true,
      nav: true,
      items: 1,
      autoplay: 8000,
      dots: true,
      autoplayHoverPause: true,
      // autoplay:false,
      // autoplayHoverPause:true,
      animateOut: "fadeOut",
    });
  }

  if (jQuery(".rpaHomeBannerSlider").length) {
    $(".rpaHomeBannerSlider.owl-carousel").owlCarousel({
      nav: false,
      items: 4,
      mouseDrag: false,
      margin: 30,
      autoplay: 10000,
      responsive: {
        0: {
          items: 1,
          dots: true,
          loop: true,
        },
        576: {
          items: 2,
          dots: true,
          loop: true,
        },
        800: {
          items: 3,
          dots: true,
          loop: true,
        },
        1024: {
          items: 4,
          loop: false,
        },
      },
    });
  }

  if (jQuery(".homeAllianceBanner").length) {
    $(".homeAllianceBanner.owl-carousel").owlCarousel({
      nav: false,
      items: 7,
      mouseDrag: true,
      margin: 30,
      autoplay: 10000,
      responsive: {
        0: {
          items: 2,
          dots: true,
          loop: true,
        },
        360: {
          items: 3,
          dots: true,
          loop: true,
        },
        800: {
          items: 4,
          dots: true,
          loop: true,
        },
        1024: {
          items: 5,
          dots: true,
          loop: true,
        },
        1200: {
          items: 6,
          loop: true,
        },
      },
    });
  }

  // var mainOwlSlider = $('.mainBanner.owl-carousel');
  //     mainOwlSlider.owlCarousel();
  //     // Listen to owl events:
  //     //mainOwlSlider.on('changed.owl.carousel', function(event) {
  //          mainOwlSlider.on('translated.owl.carousel', function(event) {
  //         if($('.owl-item').hasClass('active')){
  //            $('.owl-item.active').find('.bannerText').find('h1').addClass('animate__zoomIn');
  //            $('.owl-item.active').find('.bannerText').find('.aiBannerLogo').addClass('animate__slideInUp');
  //            $('.owl-item.active').find('.bannerText').find('.default-btn').addClass('fadeInBtn');
  //            $('.owl-item.active').find('.bannerText').css({'visibility': 'visible' , 'opacity' : '1'});
  //            $('.owl-item:not(".active")').find('.bannerText').find('h1').removeClass('animate__zoomIn');
  //            $('.owl-item:not(".active")').find('.bannerText').find('.aiBannerLogo').removeClass('animate__slideInUp');
  //            $('.owl-item:not(".active")').find('.bannerText').find('.default-btn').removeClass('fadeInBtn');
  //            $('.owl-item:not(".active")').find('.bannerText').css({'visibility': 'hidden' , 'opacity' : '0'});
  //         }
  //     });

  $(".confidential p").click(function () {
    $(".mandatoryRule").show();
  });
  $(".closeConfidential").click(function () {
    $(".mandatoryRule").hide();
  });

  /*jQuery('.counter').counterUp({
                    delay: 10,
                    time: 2000
                });*/

  jQuery(".scrollDownnBtn").click(function () {
    jQuery("html, body").animate(
      {
        scrollTop: jQuery("#mainContentScroll").offset().top - 300,
      },
      1000
    );
  });

  jQuery(".bookSeatBtn").click(function () {
    jQuery("html, body").animate(
      {
        scrollTop: jQuery(".techlabBannerForm").offset().top - 300,
      },
      1000
    );
  });

  // WOW Animation
  if ($(window).width() > 767) {
    new WOW().init();
  }
  // PArallex
  jarallax(document.querySelectorAll(".jarallax"));
  $(".jarallax").jarallax({
    speed: 0.5,
    imgWidth: 1366,
    imgHeight: 768,
  });

  // Techlab PPC text animation
  setInterval(function () {
    //loop on every active in the page
    $(".animationText").each(function () {
      //after num of seconds make the first movement
      $(this).addClass("hidden").removeClass("animationText");
      //first movement
      $(this).next().addClass("animationText").removeClass("hidden");
      //check if the last element has active class to repeat the loop again
      if ($(".slidingVertical").children().last().hasClass("animationText")) {
        setTimeout(function () {
          $(".slidingVertical")
            .children()
            .first()
            .removeClass("hidden")
            .addClass("animationText");
        }, 4000); //you must set this time as the same time for setInterval time
      }
    });
  }, 4000); //you can change the time for silder from 2000 to any value you want

  // Text Animation
  $(".onscrollMOveText").paroller();
  // $('.owl-item:not(".active")').find('.bannerText').css({'visibility': 'hidden' , 'opacity' : '0'});

  //file Uplaod
  $("form").on("change", ".file-upload-field", function () {
    $(this)
      .parent(".file-upload-wrapper")
      .attr(
        "data-text",
        $(this)
          .val()
          .replace(/.*(\/|\\)/, "")
      );
  });

  // Technology page tabs
  tabControl();

  if ($(".newBlogSlider .swiper-slide").length) {
    $(".newBlogSlider").append("<div class='swiper-pagination'></div>");
    var technologiesSlider = new Swiper(".newBlogSlider .swiper-container", {
      pagination: ".swiper-pagination",
      slidesPerView: 3,
      paginationClickable: true,
      spaceBetween: 20,
      speed: 1000,
      autoplay: 9000,
      // autoplay:false,
      loop: false,
      breakpoints: {
        800: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
        550: { slidesPerView: 1 },
      },
    });
  }
});

// Technology page tabs

var resizeTimer;
$(window).on("resize", function (e) {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    tabControl();
  }, 250);
});

function tabControl() {
  var tabs = $(".tabbed-content").find(".tabs");
  if (tabs.is(":visible")) {
    tabs.find("a").on("click", function (event) {
      event.preventDefault();
      var target = $(this).attr("href"),
        tabs = $(this).parents(".tabs"),
        buttons = tabs.find("a"),
        item = tabs.parents(".tabbed-content").find(".item");
      buttons.removeClass("active");
      item.removeClass("active");
      $(this).addClass("active");
      $(target).addClass("active");
    });
  } else {
    $(".item").on("click", function () {
      var container = $(this).parents(".tabbed-content"),
        currId = $(this).attr("id"),
        items = container.find(".item");
      container.find(".tabs a").removeClass("active");
      items.removeClass("active");
      $(this).addClass("active");
      container.find('.tabs a[href$="#' + currId + '"]').addClass("active");
    });
  }
}

function scrollNav() {
  $(".innerTitleNew a").click(function () {
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($(this).attr("href")).offset().top - 160,
        },
        300
      );
    return false;
  });
}

//  $(window).on('resize', function () {

// // Amee js Start
//      var mainOwlSlider = $('.mainBanner.owl-carousel');
//         mainOwlSlider.owlCarousel();
//         // Listen to owl events:
//         //mainOwlSlider.on('changed.owl.carousel', function(event) {
//              mainOwlSlider.on('translated.owl.carousel', function(event) {
//             if($('.owl-item').hasClass('active')){
//                $('.owl-item.active').find('.bannerText').find('h1').addClass('animate__zoomIn');
//                $('.owl-item.active').find('.bannerText').find('.aiBannerLogo').addClass('animate__slideInUp');
//                $('.owl-item.active').find('.bannerText').find('.default-btn').addClass('fadeInBtn');
//                $('.owl-item.active').find('.bannerText').css({'visibility': 'visible' , 'opacity' : '1'});
//                $('.owl-item:not(".active")').find('.bannerText').find('h1').removeClass('animate__zoomIn');
//                $('.owl-item:not(".active")').find('.bannerText').find('.aiBannerLogo').removeClass('animate__slideInUp');
//                $('.owl-item:not(".active")').find('.bannerText').find('.default-btn').removeClass('fadeInBtn');
//                $('.owl-item:not(".active")').find('.bannerText').css({'visibility': 'hidden' , 'opacity' : '0'});
//             }
//         });
//  // Amee Js End
//  }).trigger('resize');

// Init Christmas! \o/
$(".snow-canvas").snow();

var cSpeed = 9;
var cWidth = 256;
var cHeight = 45;
var cTotalFrames = 18;
var cFrameWidth = 256;
var cImageSrc =
  "https://www.silvertouch.com/wp-content/themes/silvertouch/assets/xmas/sprites.gif";

var cImageTimeout = false;

function startAnimation() {
  document.getElementById("loaderImage").innerHTML =
    '<canvas id="canvas" width="' +
    cWidth +
    '" height="' +
    cHeight +
    '"><p>Your browser does not support the canvas element.</p></canvas>';

  //FPS = Math.round(100/(maxSpeed+2-speed));
  FPS = Math.round(100 / cSpeed);
  SECONDS_BETWEEN_FRAMES = 1 / FPS;
  g_GameObjectManager = null;
  g_run = genImage;

  g_run.width = cTotalFrames * cFrameWidth;
  genImage.onload = function () {
    cImageTimeout = setTimeout(fun, 0);
  };
  initCanvas();
}

function imageLoader(s, fun) {
  //Pre-loads the sprites image
  clearTimeout(cImageTimeout);
  cImageTimeout = 0;
  genImage = new Image();
  genImage.onload = function () {
    cImageTimeout = setTimeout(fun, 0);
  };
  genImage.onerror = new Function("alert('Could not load the image')");
  genImage.src = s;
}

//The following code starts the animation
new imageLoader(cImageSrc, "startAnimation()");
