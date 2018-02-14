
angular.module('app')
.factory('awards', function ($http,$q,callurl) {

    var object = {

      getAwards:function(){
        var defer = $q.defer();
        $http.get(callurl+'/awards')
        .then(function(data){
             defer.resolve(data);
         },function(error){
             defer.reject(error);
         })
          return defer.promise;
      },

      createAward:function(obj){
        var defer = $q.defer();
        $http.get(callurl+'/nawards')
        // $http.post(callurl+'/awards',obj)
        .then(function(data){
             defer.resolve(data);
         },function(error){
             defer.reject(error);
         })
          return defer.promise;
      },

      saveName:function(obj,id){
        var defer = $q.defer();
        $http.get(callurl+'/eaward')
        // $http.post(callurl+'/awards/'+id,obj)
        .then(function(data){
             defer.resolve(data);
         },function(error){
             defer.reject(error);
         })
          return defer.promise;
      },

  };
  return object;

});
