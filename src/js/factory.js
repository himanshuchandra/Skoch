
angular.module('app')
  .factory('index', function ($http,$q,callurl) {

      var object = {

    //     needReload:true,
    //     loaded:false,
    //     loggedIn:false,
    //     userData:{},

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

    //     sendActivationLink:function(){
    //       var defer = $q.defer();
    //       $http.post(requrl+'/sendActivationLink')
    //       .then(function(data){
    //            defer.resolve(data);
    //        },function(error){
    //            defer.reject(error);
    //        })
    //         return defer.promise;
    //     },

    //     logout:function(){
    //       var defer = $q.defer();
    //       $http.post(requrl+'/logout')
    //       .then(function(data){
    //            defer.resolve(data);
    //        },function(error){
    //            defer.reject(error);
    //        })
    //         return defer.promise;
    //     }

    };
    return object;

  });
