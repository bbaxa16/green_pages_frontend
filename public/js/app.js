const app = angular.module('green-pages', []);

//////////////////
//USERS controller
/////////////////

app.controller('userController', ['$http', function($http){
  const controller = this;
  this.loginDisplay = false;
  this.registerDisplay = false;
  this.userDisplay = false;
  this.editDisplay = false;
  this.url = 'http://localhost:3000';
  //Functions to change displays on the DOM
  this.addToFavorites = function(user_id){
    $http({
      method: 'POST',
      url: this.url + '/ledgers/'
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      },
      data: {
        user_id: controller.currentUser,
        strain_id:
        qty: 1
      }
    }).then(function(response){
      console.log('this is the response', response)
    }, function(err){
      console.log(err)
    })
  }
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
    this.setUser(this.id);
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
      this.password = localStorage.password.replace(/"/g,"")
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
      localStorage.setItem('password', JSON.stringify(response.data.user.password));
      localStorage.setItem('id', JSON.stringify(response.data.user.id));
      this.loginDisplay = false;
      this.getUsers();
      console.log('this is the token', localStorage.token);
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
        password: this.updatedUser.password,
        favorites: [this.strain] }}
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
  // this.getUsers();
  // this.setUser(this.id);
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
  this.getCurrentStrain = function(strain_id){
    $http({
      method: 'GET',
      url: this.url + '/strains/' + strain_id
    }).then(function(response){
      console.log('this is the response', response);
    }, function(err){
      console.log('error', err);
    })
  }
  this.getStrains();
  }])
