
angular.module('app')
.factory('nominations', function ($http,$q,callurl) {

    var object = {

      fetchActive:function(){
        var defer = $q.defer();
        $http.get(callurl+'/activeNomintion')
        .then(function(data){
             defer.resolve(data);
         },function(error){
             defer.reject(error);
         })
          return defer.promise;
      },
      fetchArchived:function(){
        var defer = $q.defer();
        $http.get(callurl+'/nominationcall/archived')
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
