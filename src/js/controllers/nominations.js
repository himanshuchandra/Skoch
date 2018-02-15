'use strict';

angular.module('app')
  .controller('NominationsCtrl', function ($scope, nominations, $state, $stateParams) {
    $scope.nominations = {
      active: [],
      archived: []
    };

    $scope.nominees = {
      msg:'',
      allNominees:[]
    };
    $scope.nominationStatus = 'active';
    $scope.getArchivedNominations = () => {
      $scope.nominationStatus = 'archive';
      $scope.isAllSelected_arch = false;
      let promise = nominations.fetchArchived();
      promise.then((data) => {
        if (data.status === 'success' || data.status === 200) {
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].isSelected = false;
          }

          $scope.nominations.archived = data.data;

        }
        else {
          $scope.errorMsg = data.message;
        }
      }, (err) => {
        $scope.errorMsg = "Error Loading Archived Nominations";
      })
    };



    $scope.getActiveNominations = () => {
      $scope.isAllSelected = false;
      let promise = nominations.fetchActive();
      promise.then((data) => {
        if (data.status === 'success' || data.status === 200) {
          console.log(data.data);
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].isSelected = false;
          }
          $scope.nominations.active = data.data;
          console.log($scope.nominations.active);
        }
        else {
          $scope.errorMsg = data.message;
        }
      }, (err) => {
        $scope.errorMsg = "Error Loading Active Nominations";
      })
    };

    $scope.refresh = function () {
      $scope.getActiveNominations();
      $scope.getArchivedNominations();
    };

    $scope.toggleAll = function (status) {
      if (status == 'active') {
        var toggleStatus = $scope.isAllSelected;
        angular.forEach($scope.nominations.active, function (itm) { itm.isSelected = toggleStatus; });
      }
      else if (status == 'archive') {
        var toggleStatus1 = $scope.isAllSelected_arch;
        angular.forEach($scope.nominations.archived, function (itm1) { itm1.isSelected = toggleStatus1; });
      }
    }

    $scope.ActiveNomination = () => {
      $scope.nominationStatus = 'active';
      $scope.getActiveNominations();
    }


    $scope.sortThis =function(array){
      for (var i = 0;i<array.length;i++){
        if(array[i].is_approved){
          array[i].status = 'Approved';
          array[i].status2 = 'Reject';
          array[i].status3 = 'Delete';
        }
        else if(array[i].is_rejected){
          array[i].status = 'Rejected';
          array[i].status2 = 'Approve';
          array[i].status3 = 'Delete';
        }
        else if(array[i].is_deleted){
          array[i].status = 'Deleted';
          array[i].status2 = 'Approve';
          array[i].status3 = 'Reject';
        }
        else{
          array[i].status = 'Approve';
          array[i].status2 = 'Reject';
          array[i].status3 = 'Delete';
        }
      }
      return array;
    }
    $scope.getNominees = function(type){
      $scope.nominees.msg = '';
      var promise = nominations.getNominees($state.params.id,type);
      promise.then(function (data) {
        console.log(data);
        if(data.status === 'success' || data.status === 200){
          var array = $scope.sortThis(data.data);
          $scope.nominees.allNominees = array;
        }
        else{
          $scope.nominees.msg = 'Error loading nominees!';
        }
        
      }
        , function (error) {
          $scope.nominees.msg = 'Error loading nominees!';
        })
    };

    $scope.changeStatus = function(action,i){
      var obj=$scope.nominees.allNominees[i];
      switch(action){
        case 'Approve':obj.is_approved = true;break;
        case 'Reject':obj.is_rejected = true;break;
        case 'Delete':obj.is_deleted = true;break;
      }
      var promise = nominations.changeStatus($state.params.id,obj);
      promise.then(function (data) {
        console.log(data);
        if(data.status === 'success' || data.status === 200){
          var array = $scope.sortThis([data.data]);          
          $scope.nominees.allNominees[i] = array[0];
        }
        else{
          // $scope.nominees.msg = 'Error loading nominees!';
        }
        
      }
        , function (error) {
          // $scope.nominees.msg = 'Error loading nominees!';
        })
    };
    

    $scope.viewNominee = function(id){
      $state.transitionTo('app.nominee', {id:id});
    };

    if($state.current.url==='/nominee'){
      if($state.params.id){
        $scope.getNominees('submitted');
      }
      else{
        $state.transitionTo('app.nominations');
      }
    }
    else{
      $scope.getActiveNominations();
    }
  });
