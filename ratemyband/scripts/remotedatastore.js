(function(window) {
  "use strict";
  console.log("USING remotedatastore.js");
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    console.log("calling RemoteDataStore constructor");
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    console.log("calling RemoteDataStore.add()");
    $.post(this.serverUrl, val);
  };
  RemoteDataStore.prototype.getAll = function(cb) {
    console.log("calling RemoteDataStore.getAll()");
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);

      cb(serverResponse);
    });
  };
  RemoteDataStore.prototype.get = function(key, cb) {
    console.log("calling RemoteDataStore.get()");
    $.get(this.serverUrl + "?emailAddress=" + key, function(serverResponse) {
      console.log(serverResponse[0]);
      cb(serverResponse);
    });
  };
  RemoteDataStore.prototype.remove = function(key) {
    console.log("calling RemoteDataStore.remove()");
    $.get(this.serverUrl + "?username=" + key, function(serverResponse) {
      var myID = (serverResponse[0].id);

      console.log(this.serverUrl);
      //$.ajax("http://localhost:2403/coffeeorders" + "/" + myID, {
      $.ajax(this.serverUrl + "/" + myID, {
        type: "DELETE"
      }, function() {
        //console.log(this.serverUrl);
      });
    }.bind(this));
  };
  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
