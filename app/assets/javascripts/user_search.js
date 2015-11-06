$.UserSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find("input");
  this.$list = this.$el.find(".users");

  this.$input.on("input", this.search.bind(this));
  // ...
};

$.UserSearch.prototype.search = function (e) {
  var queryString = this.$input.val();
  var urlString = "http://localhost:3000/users/search";
  $.ajax( {
    url: urlString,
    dataType: 'json',
    type: 'GET',
    data: {query: queryString},
    success: this.success.bind(this),
    error: function (data) {
      debugger;
    }
  } );
};

$.UserSearch.prototype.success = function (data) {
  debugger;
  this.renderResults(data);
};

$.UserSearch.prototype.renderResults = function (data) {
  this.$list.empty();

  data.forEach(function(user) {
    var urlString = "http://localhost:3000/users/" + user.id;
    var $button = $('<button class=\"follow-toggle\"></button>');

    var followStateStr;
    if (user.followed === true) {
      followStateStr = "followed";
    } else {
      followStateStr = "unfollowed";
    }

    $button.followToggle({
      userId: user.id,
      followState: followStateStr
    });

    var $li = $('<li><a href=\"'+ urlString + '\">'+ user.username + '</a></li>');
    $li.append($button);
    this.$list.append($li);
  }.bind(this));
};

$.fn.userSearch = function () {
  return this.each(function () {
    new $.UserSearch(this);
  });
};

$(function () {
  $("div.users-search").userSearch();
});
