'use strict';

angular.module('app')
  .controller('NominationsCtrl', function ($scope, nominations) {
    $scope.nominations = {
      active:[],
      archived:[]
    };
    $scope.nominationStatus = 'active';
    $scope.getArchivedNominations = ()=>{
      $scope.nominationStatus = 'archive';
      $scope.isAllSelected_arch = false;
      let promise = nominations.fetchArchived();
      promise.then((data)=>{
        if(data.status === 'success' || data.status === 200){
          for(let i=0;i<data.data.length;i++){
            data.data[i].isSelected = false;
          }
         
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
      $scope.isAllSelected = false;
      let promise = nominations.fetchActive();
      promise.then((data)=>{
        if(data.status === 'success' || data.status === 200){
          console.log(data.data);
          for(let i=0;i<data.data.length;i++){
            data.data[i].isSelected = false;
          }
          $scope.nominations.active = data.data;
          console.log($scope.nominations.active);
        }
        else{
          $scope.errorMsg = data.message;
        }
      },(err)=>{
         $scope.errorMsg = "Error Loading Active Nominations";
      })
    };

    $scope.refresh = function(){
      $scope.getActiveNominations();
      $scope.getArchivedNominations();
    };

    $scope.toggleAll = function(status) {
     if(status=='active'){
     var toggleStatus = $scope.isAllSelected;
     angular.forEach($scope.nominations.active, function(itm){ itm.isSelected = toggleStatus; });
    }
    else if(status=='archive'){
      var toggleStatus1 = $scope.isAllSelected_arch;
      angular.forEach($scope.nominations.archived, function(itm1){ itm1.isSelected = toggleStatus1; });
    }
  }

  $scope.ActiveNomination = ()=>{
    $scope.nominationStatus = 'active';
    $scope.getActiveNominations();
  }


$scope.getActiveNominations();
  });
