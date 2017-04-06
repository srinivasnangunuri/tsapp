var app = angular.module('myApp', []);
app.controller('mainCtrl', function($scope,$http) {

   //initialize model directive variables

   $scope.showSaveCancel = function(show){
     $scope.showCancelButton = show;
     $scope.showSaveButton = show;
     if(show) {
       $scope.showEditLink = false;
       $scope.disablePhone = false;
       $scope.disableEmail = false;
       $scope.disableSlackName = false;
       $scope.disableBio = false;
       $scope.disableSaveButton = true;
     }
     else {
       $scope.disablePhone = true;
       $scope.disableEmail = true;
       $scope.disableSlackName = true;
       $scope.disableBio = true;
       $scope.showEditLink = true;
   }
   }
   $scope.enableSave = function(enable){
     if(enable === "touched") $scope.disableSaveButton = false;
   };

   $scope.saveForm = function() {
     if($scope.infoForm.email.$invalid) {
       alert("Form is invalid. Please correct Errors");
       return;
     } else {
       var userPost = {
				email : $scope.user.email,
				slackName : $scope.user.slackName,
				phone : $scope.user.phone
		};

		var res = $http.post("http://localhost:3000/users/save/"+$scope.user.id, userPost);
		res.success(function(data, status, headers, config) {
			console.log("Post Success");
      alert("Success:: The form was Submitted");
		});
		res.error(function(data, status, headers, config) {
			alert( "Error in Posting data. Please try again - "+status);
		});
  }
};

   $scope.showSaveCancel(false);

 //GET the user info
   $http.get("http://localhost:3000/users/1")
    .then(function(response) {
      var user = response.data[0];
      $scope.user = {
       id: user.id,
       firstName : user.first_name,
       lastName : user.last_name,
       bio: user.bio,
       phone: user.phone,
       slackName: user.slack_name,
       email: user.email
     };

     //watch for user.bio length
     $scope.$watch("user.bio", function(oldValue,newValue) {
      var remainingBio =  570-newValue.length;
      $scope.remainingBioCharMessage = remainingBio >= 0 ? "You are "+Math.abs(remainingBio)+" characters below the maximum" : "You are "+Math.abs(remainingBio)+" characters above the maximum";
      if(remainingBio < 0) {
        $scope.disableSaveButton = true;
      }
    });
    });


});
