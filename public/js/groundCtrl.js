angular.module('groundCtrl', [])
.controller('groundCtrl', ["$scope","$http","$location","$rootScope",'$route',function(scope,http,location,rootScope,route) {
 		scope.allData=[];
      	var count=0;
		rootScope.hideit=false;
		rootScope.allData=[];
		//console.log(cookieStore.get("adminToken"));
		scope.seeMore=true;

		//check is serch box is empty then call list Restful API else call serch Restful APi
			http({
								method:'GET',
								url:'http://localhost:3000/users'})
								//data:{"token":cookieStore.get("adminToken"),"activate":!x.activate,"vendorID":x.vendorID}})
					            .success(function (response) {
							
												//console.log("success in authentication");
												//console.log(JSON.stringify(response));
												scope.allData = response;
												rootScope.allData=scope.allData;
												console.log(scope.allData);
											
										},function errorCallback(response){
										//	console.log("Check your Internet Connection");
											scope.error=response.message;

								});


				scope.deletefun=function(phone){
					scope.phone=phone;
					console.log(scope.phone);
					scope.message="";
					http({
								method:'post',
								url:'http://localhost:3000/deleteapi',
								data:{"phone":scope.phone}})
					            .success(function (response) {
					            	scope.message="data Deleted";
					            	route.reload()

				}),function errorCallback(response){
					console.log(error);
				};
			}
		scope.editfun=function(phone){
				scope.phone=phone;
				console.log(scope.phone);
				scope.findData=[];
				rootScope.findData=[];
				http({
								method:'post',
								url:'http://localhost:3000/findapi',
								data:{"phone":scope.phone}})
					            .success(function (response) {
					            	scope.findData=response;
					            	rootScope.findData=scope.findData;
      console.log(JSON.stringify(scope.findData));			
      	}),function errorCallback(response){
					console.log(error);
				};

			}


			scope.updatefun=function(){
				var name=scope.groundname1;
				var contact=scope.contact;
				var address=scope.address;
				var location1=scope.location1;
				var location2=scope.location2;
				console.log(location);
				scope.updateData=[];
				rootScope.updateData=[];
				var groundtype=scope.groundtype;
				console.log(groundtype);
				console.log(contact);
				http({
								method:'post',
								url:'http://localhost:3000/updateapi',
								data:{"groundname":name,"contact":contact,"address":
								address,"location":location,"groundtype":groundtype,"location1":location1,"location2":location2}})
					            .success(function (response) {
					            	scope.updateData=response.data;
					            	rootScope.updateData=scope.updateData;
					            	 console.log(JSON.stringify(response));
					            	route.reload();
     			
      	}),function errorCallback(response){
					console.log(error);
				};
			}

}]);