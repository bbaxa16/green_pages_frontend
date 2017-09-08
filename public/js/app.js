const app = angular.module('green-pages', []);


app.controller('userController', ['$http', function(http){
  this.message = 'puff, puff, pass';
  this.loginDisplay = false;
  this.registerDisplay = false;

}]);
