angular.module('userCtrl', [])
.controller('userCtrl', ["$scope","$http","$location","$rootScope",'$route',function(scope,http,location,rootScope,route) {
 		scope.allData=[];
      	var count=0;
		scope.login=function(name,pass){
            var name=scope.username;
            var password=scope.password;          
http({
                                method:'post',
                                url:'http://localhost:3000/login',
                                data:{"name":name,"password":password}})
                                .success(function (response) {
                                    scope.allData=response;
                                    console.log(scope.allData);
                                    location.path('/admin');

                }),function errorCallback(response){
                    console.log(error);
                };
        }

}]);