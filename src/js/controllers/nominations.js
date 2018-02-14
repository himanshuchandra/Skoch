'use strict';

angular.module('app')
  .controller('NominationsCtrl', function ($scope, nominations) {
    $scope.nominations = {
      active:[],
      archived:[]
    };
    $scope.getArchivedNominations = ()=>{
      let promise = nominations.fetchArchived();
      promise.then((data)=>{
        if(data.status === 'success' || data.status === 200){
          $scope.nominations.archived = data.data;
        }
        else{
          $scope.errorMsg = data.message;
        }
      },(err)=>{
         $scope.errorMsg = "Error Loading Archived Nominations";
      })
    };

    

    $scope.getActiveNominations = ()=>{
      let promise = nominations.fetchActive();
      promise.then((data)=>{
        if(data.status === 'success' || data.status === 200){
          console.log(data.data);
          $scope.nominations.active = data.data;
        }
        else{
          $scope.errorMsg = data.message;
        }
      },(err)=>{
         $scope.errorMsg = "Error Loading Active Nominations";
      })
    };
$scope.getActiveNominations();
  });
