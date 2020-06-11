$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-room__message-list__message-index" data-message-id=${message.id}>
          <div class="chat-room__message-list__message-index__set">
            <div class="chat-room__message-list__message-index__set__name">
              ${message.user_name}
            </div>
            <div class="chat-room__message-list__message-index__set__time">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-room__message-list__message-index__mess">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="chat-room__message-list__message-index" data-message-id=${message.id}>
        <div class="chat-room__message-list__message-index__set">
          <div class="chat-room__message-list__message-index__set__name">
            ${message.user_name}
          </div>
          <div class="chat-room__message-list__message-index__set__time">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-room__message-list__message-index__mess">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.chat-room__message-form__contents').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-room__message-list').append(html);
      $('.chat-room__message-list').animate({ scrollTop: $('.chat-room__message-list')[0].scrollHeight});
      $('.chat-room__message-form__contents')[0].reset();
      $('.form__submitbtn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.form__submitbtn').prop("disabled", false);
    });
  });
});