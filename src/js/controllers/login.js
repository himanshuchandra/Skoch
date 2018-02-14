'use strict';

angular.module('app')
  .controller('LoginCtrl', function ($scope, login) {

    $scope.message = '';
    $scope.authenticate = function () {
      $scope.message = '';
      if ($scope.username.trim().length > 0 && $scope.password.trim().length>0) {
        var obj = {
          username: 'admin@skoch.in',
          password: '12345',
        }
        var promise = login.authenticate(obj);
        promise.then(function (data) {
          console.log(data);
        }
          , function (error) {
            console.log(error);
          })
      }
      else{
        $scope.message = "Enter valid username and password!";
      }
    };



  });
