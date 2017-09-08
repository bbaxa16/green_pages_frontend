const app = angular.module('green-pages', []);

//////////////////
//USERS controller
/////////////////

app.controller('userController', ['$http', function(http){
  this.message = 'puff, puff, pass';
  this.loginDisplay = false;
  this.registerDisplay = false;
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
  this.register = function(userRegister){
    $http({
      method: 'POST',
      url: this.url + '/users/register',
      data: { user: {
        username: userRegister.username,
        password: userRegister.password
      }},
    }).then(function(response) {
      console.log(response);
    })
  }
  this.login = function(userJWT){
    console.log(userJWT);
    $http({
      method: 'POST',
      url: this.url + '/users/login',
      data: { user: { username: userJWT.username, password: userJWT.password }},
    }).then(function(response){
      console.log(response);
      this.user = response.data.user;
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }.bind(this));
  }
  this.logout = function(){
    localStorage.clear('token');
    location.reload();
    console.log('successful logout');
  }

}]);
