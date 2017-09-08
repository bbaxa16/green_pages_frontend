const app = angular.module('green-pages', []);


app.controller('mainController', ['$http', function(http){
  this.message = 'puff, puff, pass';
  
}]);
