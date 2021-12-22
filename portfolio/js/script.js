//filtering
let web = true;
let product = true;
let info = true;

$(document).ready(function () {
  // on button click
  $("button").click(function () {
    // retrieve the button value
    var target = $(this).attr("value");
    web = product = info = false;
    // examine all li elements
    $("#works td").each(function () {
      $(this).animate({
        "opacity": 0.3
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
    // switching booleans for hover
    if (target == "all") {
      web,
      product,
      info = true;
    }
    else if (target == "web") {
      web = true;
    } else if (target == "product") {
      product = true;
    } else if (target == "info") {
      info = true;
    }
    console.log({
      target,
      web,
      product,
      info
    });
  });
});

/*
//image hover
$(document).ready(function () {

  var duration = 300;

  var $works = $('#works td');
  $works.mouseenter(function () {
    $(this).animate({
      width: '+=40px'
    }, duration);
    $(this).animate({
      "opacity": 1
    }, 300);
  });

  $works.mouseleave(function () {
    $(this).animate({
      width: '-=40px'
    }, duration);

  if ($(this).hasClass(web) && web == false) {

    $(this).animate({
      "opacity": 0.3
    }, 300);
  }
});
*/

$(document).ready(function () {

  var original_opacity = $($works).css("opacity");

  $(this).find('a img').hover(
    function () {
      /* 
        fadeTo(), the 1st argument is fading duration	
      */
      $(this).stop().fadeTo(300, 1);
    },
    function () {
      $(this).stop().fadeTo(300, original_opacity);
    }
    );
});

//smooth scroll
$(document).ready(function () {

  $("a[href*=#]:not([href=#])").click(function () {

    var target = $($(this).attr("href")).offset().top;

    //target -= 70;     //scroll offset

    if ($(this).attr("id*") == "work") {
      $("html, body").animate({
        scrollTop: $("contents")
      }, 500);
    }

    $("html, body").animate({
      scrollTop: target
    }, 500);

    return false;
  });
});

// show & hide tabs
$(function () {
  // hide all but #work1
  $('#contents > div[id != "work1"]').hide();

  // click on tab
  $("a").click(function () {
    // 一度全てのコンテンツを非表示にする
    $("#contents > div").hide();

    // 選択されたコンテンツを再表示する
    $($(this).attr("href")).show();

    // 現在のcurrentクラスを削除
    $(".current").removeClass("current");

    // 選択されたタブ（自分自身）にcurrentクラスを追加
    $(this).addClass("current");

    return false;
  });
});