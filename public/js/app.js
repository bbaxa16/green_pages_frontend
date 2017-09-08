const app = angular.module('green-pages', []);

//////////////////
//USERS controller
/////////////////

app.controller('userController', ['$http', function($http){
  this.message = 'puff, puff, pass';
  const controller = this;
  this.loginDisplay = false;
  this.registerDisplay = false;
  // this.logged = true;
  this.url = 'http://localhost:3000';
  //Functions to change displays on the DOM
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
      console.log(response);
      if(response.data.status == 401){
      this.error = 'Unauthorized';
      } else {
      this.logged = true;
      this.users = response.data;
      }
    }.bind(this));
  }
  this.login = function(userJWT){
    $http({
      method: 'POST',
      url: this.url + '/users/login',
      data: { user: { username: userJWT.username, password: userJWT.password }},
    }).then(function(response){
      this.user = response.data.user;
      this.token = response.data.token;
      localStorage.setItem('token', JSON.stringify(response.data.token));
      console.log(localStorage.token);
      console.log(response);
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
}]);
