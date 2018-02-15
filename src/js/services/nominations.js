
angular.module('app')
.factory('nominations', function ($http,$q,callurl) {

    var object = {

      fetchActive:function(){
        var defer = $q.defer();
        $http.get(callurl+'/activeNomination')
        .then(function(data){
             defer.resolve(data);
         },function(error){
             defer.reject(error);
         })
          return defer.promise;
      },
      fetchArchived:function(){
        var defer = $q.defer();
        $http.get(callurl+'/archiveNomination')
        .then(function(data){
             defer.resolve(data);
         },function(error){
             defer.reject(error);
         })
          return defer.promise;
      },
      getNominees:function(id,type){
        var defer = $q.defer();
        // $http.get(callurl+'/nominations/' + id + '/' + type)
        $http.get(callurl+'/nominees')
        .then(function(data){
             defer.resolve(data);
         },function(error){
             defer.reject(error);
         })
          return defer.promise;
      },
      changeStatus:function(id,obj){
        var defer = $q.defer();
        // $http.post(callurl+'/nominations/' + id,obj)
        $http.get(callurl+'/newnominee')
        .then(function(data){
             defer.resolve(data);
         },function(error){
             defer.reject(error);
         })
          return defer.promise;
      }

  };
  return object;

});
