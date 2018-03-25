(function(window) {
  "use strict";

  var App = window.App || {};
  var $ = window.jQuery;

  function UserInfoCheckList(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error("could not find element with selector: " + selector);
    }
  }

  function UserInfoText(username) {
    var $paragraph = $("<p></p>", {
      "data-user-logged-in": "username"
    });
    var description = "Logged in as: " + username;
    $paragraph.append(description);
    this.$element = $paragraph;
  }

  UserInfoCheckList.prototype.removeModalText = function() {
    this.$element
      .find("[data-user-logged-in=\"username\"]")
      .remove();
    console.log("Removing current logged in user");
  };

  UserInfoCheckList.prototype.addUserInfoText = function(titleAndName) {
    this.removeModalText();
    var rowElement = new UserInfoText(titleAndName);
    console.log("Adding current logged in user");
    this.$element.append(rowElement.$element);
  };

  App.UserInfoCheckList = UserInfoCheckList;
  window.App = App;
})(window);
