(function(window) {
  "use strict";
  console.log("USING main.js");

  var FORM_SELECTOR_COMMENTS = "[data-coffee-order=\"form\"]";
  var FORM_SELECTOR_LOGIN_MODAL = "[data-signin=\"form\"]";

  var CHECKLIST_SELECTOR = "[data-coffee-order=\"checklist\"]";
  var USERINFO_SELECTOR = "[data-user-info=\"display-username\"]";

  var SERVER_URL_COMMENTS = "http://localhost:2403/user-comments";
  var SERVER_URL_LOGIN = "http://localhost:2403/users/login";

  var App = window.App;
  var $ = window.jQuery;
  var Truck = App.Truck;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var CheckList = App.CheckList;
  var UserInfoCheckList = App.UserInfoCheckList;

  var remoteDSComments = new RemoteDataStore(SERVER_URL_COMMENTS);
  var remoteDSLogin = new RemoteDataStore(SERVER_URL_LOGIN);

  var myTruckComments = new Truck("ncc-1701", remoteDSComments);
  var myTruckLogin = new Truck("users", remoteDSLogin);

  window.myTruckComments = myTruckComments;
  window.myTruckLogin = myTruckLogin;

  var checkListComments = new CheckList(CHECKLIST_SELECTOR);
  var userInfoCheckList = new UserInfoCheckList(USERINFO_SELECTOR);

  //checkListComments.addClickHandler(myTruckComments.deliverOrder.bind(myTruckComments));

  var formHandlerComments = new FormHandler(FORM_SELECTOR_COMMENTS);
  var formHandlerLoginModal = new FormHandler(FORM_SELECTOR_LOGIN_MODAL);

  //display comments on page reloads
  remoteDSComments.getAll(function(response){
    var CheckList = App.CheckList;
    var checkListComments = new CheckList(CHECKLIST_SELECTOR);
    var i = response.length;

    var numUpvotes = 0;
    var numDownvotes = 0;

    //count the number of votes in database
    for(var j = 0; j < i; j++) {
      checkListComments.addRow(response[j]);
      if(response[j].vote == "upvote") numUpvotes++;
      if(response[j].vote == "downvote") numDownvotes++;
      console.log("up/down: " + numUpvotes + " " + numDownvotes);
    }
  });

  formHandlerComments.addSubmitHandler(function(data) {
    console.log("calling formHandlerComments.addSubmitHandler() inside main.js");
    myTruckComments.createOrder(data);
    checkListComments.addRow(data);
  });

  //Login Button Click Handler
  document.getElementById("LoginButton").addEventListener("click", function(){
    console.log("You clicked the login button!");
    $("#login-modal").modal();
  });

  formHandlerLoginModal.addSubmitHandler(function(data) {
    //event.preventDefault();
    console.log("calling formHandlerLoginModal.addSubmitHandler() inside main.js");
    console.log("data from modal login form is: ")
    console.log(data);
    /*
    myTruckLogin.createOrder(data);
    //checkListUserInfo.addRow(data);
    dpd.users.me(function(result, error) {
      console.log("dpd.users.me result is: " + result);
    });
    */

    //LOGGING IN
    $.ajax({
      url: "http://localhost:2403/users/login",
      type: "POST",
      data: {username: data.username, password: data.password},
      cache: false,
      xhrFields:{
        withCredentials: true
      },
      success: function(data) {
        console.log(data);
      },
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    });
  });

  //WHO AM I
  $.ajax({
    url: "http://localhost:2403/users/me",
    type: "GET",
    cache: false,
    xhrFields:{
      withCredentials: true
    },
    success: function(result) {
      console.log("This is the result of who am I: ");
      console.log(result.username);
      userInfoCheckList.addUserInfoText(result.username);
    },
    error: function(xhr) {
      console.log(xhr.responseText);
    }
  });

})(window);
