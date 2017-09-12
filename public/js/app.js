const app = angular.module('green-pages', []);

//////////////////
//USERS controller
/////////////////

app.controller('userController', ['$http', function($http){
  const controller = this;
  this.loginDisplay = false;
  this.registerDisplay = false;
  this.userDisplay = true;
  this.editDisplay = false;
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
      if(response.data.status == 401){
      this.error = 'Unauthorized';
      } else {
      this.logged = true;
      this.username = localStorage.username.replace(/"/g,"")
      this.id = localStorage.id.replace(/"/g,"")
      //console.log(localStorage.token);
      console.log(response.data);
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
      localStorage.setItem('id', JSON.stringify(response.data.user.id));
      this.loginDisplay = false;
      this.getUsers();
    }.bind(this));
  }
  this.setUser = function(id){
    console.log('set user being ran');
    $http({
      method: 'GET',
      url: this.url + '/users/' + id,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(response){
      console.log('this is the setuser response');
      this.currentUser = response.data
      console.log(this.currentUser);
    }, function(err){
      console.log(err);
    })
    }
  this.logout = function(){
    localStorage.clear('token');
    location.reload();
    console.log('successful logout');
    this.logged = false;
  }
  this.update = function(id){
    //this.setUser(this.id);
    console.log('update route');
    $http({
      method: 'PUT',
      url: this.url + '/users/' + id,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      },
      data: { user: {
        username: this.updatedUser.username,
        password: this.updatedUser.password }}
    }).then(function(response){
      console.log('good put route');
      console.log(response);
      controller.getUsers();
    }, function(err){
      console.log('ERROR =======');
      console.log(err);
      console.log(controller.currentUser);
    })
  }
  this.delete = function(id){
    $http({
      method: 'DELETE',
      url: this.url + '/users/' + id,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(response){
      console.log(response);
      controller.logout();
    }, function(err){
      console.log(err);
    })
  }
  this.test = function(){
    console.log('current user is: ' + this.currentUser);
  }
  this.getUsers();
  this.test();
}]);




//strains controller
app.controller('strainController', ['$http', function($http){
this.url = 'http://localhost:3000';
const controller = this;
this.getStrains = function(){
  $http({
    method: 'GET',
    url: this.url + '/strains'
  }).then(function(response){
    controller.weed = response.data;
  }, function(err){
    console.log(err);
  })
}
this.getStrains();
}])
