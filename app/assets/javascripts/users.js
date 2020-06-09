
$(function() {
  function  appenduser(user){
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">"${user.name}"</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;
    $("#UserSearchResult").append(html)
  }
  function  appendnouser(){
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>
                `;
    $("#UserSearchResult").append(html)

  }
  function addMember(name, id) {
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${name}</p>
                  <input name="group[user_ids][]" type="hidden" value="${id}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>
                `;
    $(".ChatMembers").append(html);
  }




  $("#UserSearch__field").on("keyup", function() {
    let input = $("#UserSearch__field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#UserSearchResult").empty();
      //emptyメソッドで一度検索結果を空にする
      if (users.length !== 0) {
        //usersの数が0じゃなかったら繰り返す
        users.forEach(function(user){
        //配列オブジェクト１つ１つに対する処理
          appenduser(user);
        })
      
      }else{
        appendnouser();
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });
  $("#UserSearchResult").on("click", ".ChatMember__add", function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addMember(userName, userId);
  });
  $(".ChatMembers").on("click", ".ChatMember__remove", function() {
    $(this).parent().remove();
  });
});