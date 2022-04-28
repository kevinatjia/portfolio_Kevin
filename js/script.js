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
  $("button").click(function () {
    // retrieve the button value
    var target = $(this).attr("value");
    web = product = planning = info = other = false;
    // examine all li elements
    $("#works td").each(function () {
      $(this).animate({
        "opacity": 0.25
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
    var end = id.slice(-1);      //get last character from id
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

  $("a[href*=#]:not([href=#]), div[href*=#]:not([href=#])").click(function () {

    var target = $($(this).attr("href")).offset().top;

    //target -= 0;     //scroll offset

    $("html, body").animate({
      scrollTop: target
    }, 500);

    return false;
  });
});


//header styling on scroll
$(window).on("scroll", function () {
  //change when scroll is past cover image height - offset
  var windowHeight = window.innerHeight * 0.88 - 32;

  if ($(this).scrollTop() > windowHeight) {
    //change colors
    //$(".header").css("background-color", "var(--main-color)");
    $(".header a").css("color", "var(--tertiary-color)");
    //hover color
    $(".header a").hover(function() {
      $(this).css("color", "var(--accent-color)");
    }, function() {
      $(this).css("color", "var(--tertiary-color)");
    });
  //change colors back when scroll is <500 again
  } else {
    $(".header").css("background", "transparent");
    $(".header a").css("color", "var(--main-color)");
    //hover color
    $(".header a").hover(function() {
      $(this).css("color", "var(--accent-color)");
    }, function() {
      $(this).css("color", "var(--main-color)");
    });
  }
});