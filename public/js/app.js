const app = angular.module('green-pages', []);

//////////////////
//USERS controller
/////////////////

app.controller('userController', ['$http', function($http){
  this.message = 'puff, puff, pass';
  const controller = this;
  this.token = '';
  this.username = localStorage.username.replace(/"/g,"")
  this.loginDisplay = false;
  this.registerDisplay = false;
  this.userDisplay = false;
  this.editDisplay = false;
  // this.logged = true;
  this.url = 'http://localhost:3000';
  //Functions to change displays on the DOM
  this.phoneHome = function(){
    this.userDisplay = false;
  }
  this.toggleRegister = function(){
    if(this.loginDisplay) {
    }
    else {
      this.registerDisplay = !this.registerDisplay;
    }
  }
  this.toggleLogin = function(){
    if(this.registerDisplay){
    }
    else {
      this.loginDisplay = !this.loginDisplay;
    }
  }
  this.toggleUser = function(){
    this.userDisplay = !this.userDisplay;
    this.getUsers();
  }
  this.toggleEdit = function(){
    this.editDisplay = !this.editDisplay
    this.getUsers();
  }
  //AJAX REQUESTS
  this.register = function(userRegister){
    $http({
      method: 'POST',
      url: this.url + '/users/',
      data: { user: {
        username: userRegister.username,
        password: userRegister.password
      }},
    }).then(function(response) {
      console.log(response);
    })
  }
  this.getUsers = function(){
    $http({
      url: this.url + '/users',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(response){
      //console.log(response);
      if(response.data.status == 401){
      this.error = 'Unauthorized';
      } else {
      this.logged = true;
      }
    }.bind(this));
  }
  this.login = function(userJWT){
    $http({
      method: 'POST',
      url: this.url + '/users/login',
      data: { user: { username: userJWT.username, password: userJWT.password }},
    }).then(function(response){
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('username', JSON.stringify(response.data.user.username));
      this.loginDisplay = false;
      this.token = localStorage.token
      this.getUsers();
    }.bind(this));
  }
  this.logout = function(){
    localStorage.clear('token');
    location.reload();
    console.log('successful logout');
    this.logged = false;
  }
  this.update = function(id){
    $http({
      method: 'PUT',
      url: this.url + '/users/' + id,
      data: this.updatedUser
    }).then(function(response){
      console.log(response);
    }, function(err){
      console.log(err);
    })
  }
  this.delete = function(id){
    $http({
      method: 'DELETE',
      url: this.url + '/users/' + id
    }).then(function(response){
      console.log(response);
      controller.logout();
    }, function(err){
      console.log(err);
    })
  }
  this.getUsers();
  //created infinite loop
  // $(()=>{
  //   if(window.location.reload()){
  //     controller.getUsers();
  //     console.log('success reload');
  //   }
  // });

  //call function right away
  //this.getUsers();

  //didn't work
  //window.onload = this.getUsers()

  //didn't work
  //window.onbeforeunload = this.getUsers()
}]);
