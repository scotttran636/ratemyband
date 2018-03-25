(function(window) {
  "use strict";
  console.log("USING checklist.js");

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    console.log("Calling CheckList constructor");
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  CheckList.prototype.addClickHandler = function(fn) {
    console.log("Calling CheckList.addClickHandler()");
    this.$element.on("click", "input", function(event) {
      var email = event.target.value;
      this.removeRow(email);
      fn(email);
    }.bind(this));
  };

  CheckList.prototype.addRow = function(coffeeOrder) {
    console.log("Calling CheckList.addRow()");
    this.removeRow(coffeeOrder.emailAddress);
    var rowElement = new Row(coffeeOrder);
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function(email) {
    console.log("Calling CheckList.removeRow()");
    this.$element
      .find("[value=\"" + email + "\"]")
      .closest("[data-coffee-order=\"checkbox\"]")
      .remove();
  };

  function Row(coffeeOrder) {
    console.log("Calling Row Constructor()");
    var $div = $("<div></div>", {
      "data-coffee-order": "checkbox",
      "class": "checkbox"
    });

    var $label = $("<label></label>");

    /*
    var $checkbox = $("<input></input>", {
      type: "checkbox",
      value: coffeeOrder.emailAddress
    }); */



    var description = "<font color=\"gray\"> <i> \"" + coffeeOrder.comment + "\"</i></font><br />";
    /*if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + " ";
    } */
    description += "<p>-" + coffeeOrder.username + "<br />";
    //description += coffeeOrder.recommendation + "<br />";
    //description += "rating: " + coffeeOrder.rating + "<br />";

    //  $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
