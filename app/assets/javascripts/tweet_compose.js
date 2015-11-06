$.TweetCompose = function (el) {
  this.$el = $(el);
  this.$feed = $("#feed");
  this.$el.on("submit", this.submit.bind(this));
};

$.TweetCompose.prototype.submit = function (e) {
  e.preventDefault();
  var object = this.$el.serializeJSON();
  this.$el.find(":input").prop("disabled", true);

  $.ajax({
    url: "/tweets",
    type: "POST",
    dataType: 'json',
    data: object,
    success: this.success.bind(this),
    error: function (data) {
      this.$el.find(":input").prop("disabled", false);
      debugger;
    }
  });
};

$.TweetCompose.prototype.success = function (data) {
  this.render(data);
  this.clearInput();
  this.$el.find(":input").prop("disabled", false);
};

$.TweetCompose.prototype.render = function (data) {
  var result = data.content;
  result += "-- <a href=\"/users/" + data.user.id + "\">" + data.user.username;
  result += "</a> -- " + data.created_at;

  var userList = function (data) {
    var result = "";
    data.mentions.forEach(function (el) {
      result += "<li><a href=\"/users/" + el.user_id + "\">" + el.user.username + "</a></li>";
    });
    return result;
  };

  if (data.mentions.length > 0) {
    var html = "<ul>" + userList(data) + "</ul>";
    result += html;
  }
  var $li = $("<li></li>").html(result);
  this.$feed.prepend($li);
};

$.TweetCompose.prototype.clearInput = function () {

};


$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};

$(function () {
  $("form.tweet-compose").tweetCompose();
});
