$(function(){
  // ボタンを選択
  $("button").click(function(){
    // value属性の値を取得
    var target = $(this).attr("value");

    // 全てのli要素を調べる
    $("#list li").each(function(){
      // 一度全て非表示にする
      $(this).animate({"opacity" : 0}, 300, function(){
        $(this).hide();

        // フィルタリングの条件を満たしているか
        if($(this).hasClass(target) || target == "all"){
          // 条件を満たしている場合は再表示
          $(this).show();
          $(this).animate({"opacity" : 1}, 300);
        }
      });
    });
  });
});
