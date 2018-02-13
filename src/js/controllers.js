'use strict';

angular.module('app')
  .controller('IndexCtrl', function ($scope, index, $location, $transitions) {

    // $scope.message = 'sdcds';

    $scope.redirect = function () {
      if ($location.path() === '/login' || $location.path() === '/404' || $location.path() === '/500') {
        $scope.hideLayout = true;
      }
      else{
        $scope.hideLayout = false;
      }
    //   if (webindex.loaded === true && webindex.loggedIn === true) {
    //     if ($location.path() === '/login' || $location.path() === '/signup') {
    //       $location.path('/');
    //     }
    //   }
    //   else if (webindex.loaded === true && webindex.loggedIn != true) {
    //     if ($location.path() === '/profile') {
    //       $location.path('/login');
    //     }
    //   }
    };


    // $rootScope.$on('$stateChangeSuccess', 
    // function(event, toState, toParams, fromState, fromParams){     

    // })

    $transitions.onSuccess({ to: 'app.**' }, function(trans) {
      $scope.redirect(); 
    });

    // $scope.loginStatus = "Login/SignUp";
    // $scope.ActivationStatus = true;
    // $scope.LoginButton = false;
    // $scope.SignupButton = false;
    // $scope.ProfileButton = true;
    // $scope.LogoutButton = true;

    // $scope.ActivationMessage = undefined;

    $scope.authenticate = function () {
      var obj={
        username:'admin@skoch.in',
        password:'12345',
      }
      var promise = index.authenticate(obj);
      promise.then(function (data) {
        console.log(data);
      }
      ,function(error){
        console.log(error);
      })
    };
    $scope.authenticate();
    $scope.redirect();
    // $scope.$watch(function () { return webindex.needReload }, function (newValue, oldValue) {
    //   if (webindex.needReload === true) {
    //     $scope.loadData();
    //   }
    // }, true);


  });
