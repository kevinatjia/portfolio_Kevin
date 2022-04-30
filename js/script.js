//parallax
$(document).ready(function () {
  // init controller
  var controller = new ScrollMagic.Controller();

  var $window = $(window);
  var winW = $window.width();
  var winH = $window.height();

  var $cover = $('#js-cover');
  var $section01 = $('#js-section01');
  var scene01 = null;

  var sceneResetFlg = false;

  /** イベント付与 **/
  $window.on('load', loadEvent);
  $window.on('resize', resizeEvent);

  /** load時に呼び出す関数 **/
  function loadEvent() {
    resizeEvent(); //load時に1度だけresizeEventを呼ぶ
  }


  /** resize時に呼び出す関数 **/
  function resizeEvent() {
    winW = $window.width(); //windowの横幅を取得、グローバルに格納
    winH = $window.height(); //windowの縦幅を取得、グローバルに格納

    $section01.css({
      'height': winH
    }); //section01の縦幅をwindowに合わせる

    if (sceneResetFlg) {
      scene01.destroy(true);
    }

    /** section01 **/
    scene01 = new ScrollMagic.Scene({
        triggerElement: "#js-section01",
        triggerHook: 'onCenter',
        duration: (winH / 2)
      })
      .offset(winH / 2)
      .on('progress', function (e) {
        var prog = e.progress;
        $cover.css({
          transform: 'translate(' + -(prog * 100) + 'px,' + prog * (winH / 2) + 'px)',
          opacity: 1 - prog
        });
      })
      //.setClassToggle($pageList.eq(0), "current") 
      //.addIndicators({name:'section01'}) // add indicators (requires plugin)
      .addTo(controller);

    sceneResetFlg = true;
  }
});


//categories slider
$(document).ready(function () {
  const slider = document.querySelector('#categories');
  let mouseDown = false;
  let startX, scrollLeft;

  let startDragging = function (e) {
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };
  let stopDragging = function () {
    mouseDown = false;
  };

  slider.addEventListener('mousemove', (e) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;
    slider.scrollLeft = scrollLeft - scroll;
  });

  // Add the event listeners
  slider.addEventListener('mousedown', startDragging, false);
  slider.addEventListener('mouseup', stopDragging, false);
  slider.addEventListener('mouseleave', stopDragging, false);
});


//categories highlight
$(document).ready(function () {
  // on button click
  $("#categories button").click(function () {
    // retrieve the button value
    var target = $(this).attr("value");
    web = product = planning = info = other = false;
    // examine all li elements
    $("#works td").each(function () {

      $(this).animate({
        "opacity": 0.1
      }, 300, function () {

        // フィルタリングの条件を満たしているか
        if ($(this).hasClass(target) || target == "all") {
          // 条件を満たしている場合は再表示
          // $(this).show();
          $(this).animate({
            "opacity": 1
          }, 300);
        }
      });
    });

    $("#categories button").each(function () {
      $(this).css("color", "var(--secondary-color)");

      if ($(this).hasClass(target)) {
        $(this).css("color", "var(--tertiary-color)");
      }
    });
  });
});


// hover effect
$(document).ready(function () {

  var $works = $('#works td');
  var $caption = $('#works td a');
  var original_opacity;

  $works.hover(
    function () {
      original_opacity = $(this).css("opacity");
      // fadeTo(), the 1st argument is fading duration, 2nd is opacity value
      $(this).stop().fadeTo(300, 1);
    },
    function () {
      $(this).stop().fadeTo(200, original_opacity);
      //$(this).animate({
      //  "transform": scaleX(1)
      //}, 300);
    }
  );

  $caption.filter(':nth-child(1)')
    .on('mouseover', function () {
      $(this).find('strong').stop(true).animate({
        opacity: 1
      }, duration);
    })
    .on('mouseout', function () {
      $(this).find('strong').stop(true).animate({
        opacity: 0
      }, duration);
    });
});


// show & hide tabs
$(function () {
  // hide all but #work1
  $('#contents > div[id != "work1"]').hide();
  $('#contents > #highlight div[id != "highlight1"]').hide();

  // click on tab
  $("#works a").click(function () {
    // 一度全てのコンテンツを非表示にする
    $("#contents > div").hide();
    $("#contents > #highlight div").hide();

    //get clicked id value
    var id = $(this).attr("href"); //get the id of the clicked button
    var end = id.slice(-1); //get last character from id
    $(`div[id$=${end}]`).show(); //match the div with id ends with the character and show

    // 選択されたコンテンツを再表示する
    $($(this).attr("href")).show();

    // 現在のcurrentクラスを削除
    $(".current").removeClass("current");

    // 選択されたタブ（自分自身）にcurrentクラスを追加
    $(this).addClass("current");

    return false;
  });
});


//smooth scroll to section
$(document).ready(function () {

  $("a[href*=#]:not([href=#]), div[href*=#]:not([href=#]), button[href*=#]:not([href=#])").click(function () {

    var target = $($(this).attr("href")).offset().top;

    if ($(this).is("button")) {
      //scroll offset
      target -= 18;
    }

    $("html, body").animate({
      scrollTop: target
    }, 500);

    return false;
  });
});


//header styling on scroll
$(window).on("scroll", function () {
  //change when scroll is past cover image height - offset
  var windowHeight = window.innerHeight * 0.88 - 22;

  if ($(this).scrollTop() > windowHeight) {
    //change colors
    //$(".header").css("background-color", "var(--main-color)");
    $(".header a").css("color", "var(--tertiary-color)");
    $(".header a").css("text-shadow", "-1px -1px 0 var(--main-color), 1px -1px 0 var(--main-color), -1px 1px 0 var(--main-color), 1px 1px 0 var(--main-color)")
    //hover color
    $(".header a").hover(function () {
      $(this).css("color", "var(--accent-color)");
    }, function () {
      $(this).css("color", "var(--tertiary-color)");
    });
    //change colors back when scroll is <500 again
  } else {
    //$(".header").css("background", "transparent");
    $(".header a").css("color", "var(--main-color)");
    $(".header a").css("text-shadow", "none")
    //hover color
    $(".header a").hover(function () {
      $(this).css("color", "var(--accent-color)");
    }, function () {
      $(this).css("color", "var(--main-color)");
    });
  }
});

//collapsible work description
$(document).ready(function () {
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
});