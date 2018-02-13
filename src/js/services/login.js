
angular.module('app')
.factory('login', function ($http,$q,callurl) {

    var object = {

      authenticate:function(obj){
        var defer = $q.defer();
        $http.post(callurl+'/authenticate',obj)
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
