(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-coffee-order=\"form\"]";
  var CHECKLIST_SELECTOR = "[data-coffee-order=\"checklist\"]";
  //var SERVER_URL = "http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders";
  var SERVER_URL = "http://localhost:2403/user-comments";
  var App = window.App;
  var Truck = App.Truck;
  //var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck("ncc-1701", remoteDS);
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);

//display comments on page reloads
  remoteDS.getAll(function(response){
    var CheckList = App.CheckList;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    var i = response.length;

    var numUpvotes = 0;
    var numDownvotes = 0;

//count the number of votes in database
    for(var j = 0; j < i; j++) {
      checkList.addRow(response[j]);
      if(response[j].vote == "upvote") numUpvotes++;
      if(response[j].vote == "downvote") numDownvotes++;
      //console.log("up/down: " + numUpvotes + " " + numDownvotes);
    }
  });


  formHandler.addSubmitHandler(function(data) {
    myTruck.createOrder(data);
    checkList.addRow(data);
  });
  formHandler.addInputHandler(Validation.isCompanyEmail);
})(window);
