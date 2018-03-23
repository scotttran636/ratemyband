(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }
  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val);
  };
  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);

      cb(serverResponse);
    });
  };
  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + "?emailAddress=" + key, function(serverResponse) {
      console.log(serverResponse[0]);
      cb(serverResponse);
    });
  };
  RemoteDataStore.prototype.remove = function(key) {
    $.get(this.serverUrl + "?username=" + key, function(serverResponse) {
      var myID = (serverResponse[0].id);

      console.log(this.serverUrl);
      //$.ajax("http://localhost:2403/coffeeorders" + "/" + myID, {
      $.ajax(this.serverUrl + "/" + myID, {
        type: "DELETE"
      }, function() {
        console.log(this.serverUrl);
      });
    }.bind(this));
  };
  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
