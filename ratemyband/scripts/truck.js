(function(window) {
  console.log("USING truck.js");
  "use strict";
  var App = window.App || {};

  function Truck(truckId, db) {
    console.log("calling Truck constructor");
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function(order) {
    console.log("calling Truck.createOrder()");
    //console.log("Adding order for " + order.emailAddress);
    this.db.add(order.emailAddress, order);
  };

  Truck.prototype.deliverOrder = function(customerId) {
    console.log("calling Truck.deliverOrder()");
    //console.log("Delivering order for " + customerId);
    this.db.remove(customerId);
  };

  Truck.prototype.printOrders = function() {
    console.log("calling Truck.printOrders()");
    var customerIdArray = Object.keys(this.db.getAll());
    console.log("Truck # " + this.truckId + " has pending orders:");
    customerIdArray.forEach(function(id) {
      console.log(this.db.get(id));
    }.bind(this));
  };

  App.Truck = Truck;
  window.App = App;

})(window);
