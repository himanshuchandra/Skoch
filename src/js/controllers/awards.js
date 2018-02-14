'use strict';

angular.module('app')
  .controller('AwardsCtrl', function ($scope, awards) {

    $scope.awards = {
      listMsg: '',

      allAwards: [],
      newName:'',
      newMsg:'',

      selected:'',
      editName:'',
      editMsg:''
    };

    $scope.getAwards = function () {
      $scope.awards.listMsg = '';
      var promise = awards.getAwards();
      promise.then(function (data) {
        console.log(data);
        if(data.status === 'success' || data.status === 200){
          $scope.awards.allAwards = data.data;
        }
        else{
          $scope.awards.listMsg = 'Error loading awards!';
        }
        
      }
        , function (error) {
          $scope.awards.listMsg = 'Error loading awards!';
        })
    };

    $scope.createAward = function () {
      $scope.awards.newMsg = '';
      if($scope.awards.newName.trim().length>0){
        var obj = {
          name:$scope.awards.newName
        }
        var promise = awards.createAward(obj);
        promise.then(function (data) {
          console.log(data);
          // if(data.status === 'success' || data.status === 200){
            // $scope.awards.newMsg = data.message;
            $scope.awards.allAwards = data.data;
            $('#createAwardPop').modal('hide');
          // }
          // else{
          //   $scope.awards.newMsg = 'Error creating award!';
          // }
          
        }
          , function (error) {
            $scope.awards.newMsg = 'Error creating award!';
          })
      }
      else{
        $scope.awards.newMsg = 'Enter a name first!';
      }
    };

    $scope.saveName = function () {
      $scope.awards.editMsg = '';
      if($scope.awards.editName.trim().length>0){
        var obj = {
          name:$scope.awards.editName
        }
        var promise = awards.saveName(obj,$scope.awards.selected);
        promise.then(function (data) {
          console.log(data);
          // if(data.status === 'success' || data.status === 200){
            // $scope.awards.editMsg = data.message;
            // $scope.awards.allAwards = data.data;
            var index = $scope.awards.allAwards.findIndex(x => x._id === $scope.awards.selected);
            $scope.awards.allAwards[index] = data.data;
            $('#editAwardPop').modal('hide');
            $scope.awards.selected = '';
          // }
          // else{
          //   $scope.awards.editMsg = 'Error creating award!';
          // }
          
        }
          , function (error) {
            $scope.awards.editMsg = 'Error creating award!';
          })
      }
      else{
        $scope.awards.editMsg = 'Enter a name first!';
      }
    };

    $scope.getAwards();

    $scope.editAward = function(id,name){
      $scope.awards.selected = id;
      $scope.awards.editName = name;
    };

    $scope.refresh = function(){
      $scope.getAwards();
    };

  });
