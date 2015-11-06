$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id") || options.userId;
  this.followState = this.$el.data("initial-follow-state") || options.followState;
  this.$el.on("click", this.handleClick.bind(this));
  this.render();
};

$.FollowToggle.prototype.render = function () {
  var text;
  if (this.followState === 'unfollowed') {
    text = 'Follow!';
    this.$el.prop("disabled", false);
  } else if (this.followState === 'followed') {
    text = "Unfollow!";
    this.$el.prop("disabled", false);
  } else {
    text = this.followState + "!";
    this.$el.prop("disabled", true);
  }
  this.$el.html(text);
};

$.FollowToggle.prototype.toggleFollowState = function () {
  if (this.followState === "unfollowing") {
    this.followState = "unfollowed";
  } else if (this.followState === "following") {
    this.followState = "followed";
  }
};

$.FollowToggle.prototype.handleClick = function (e) {
  e.preventDefault();
  var method;

  if (this.followState === "unfollowed") {
    method = "POST";
    this.followState = "following";
  }
  else {
    method = "DELETE";
    this.followState = "unfollowing";
  }

  this.render();

  var url = "http://localhost:3000/users/" + this.userId + "/follow";
  $.ajax( {
    type : method,
    url: url,
    dataType: 'json',
    success: this.success.bind(this),
    error: function (data) {
      // debugger;
    }
  });
};

$.FollowToggle.prototype.success = function (data) {
  this.toggleFollowState();
  this.render();
};

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
