var app = angular.module('myApp', []);
app.controller('mainCtrl', function($scope,$http,$window) {

   //initialize model directive variables/ business data

   $scope.includeMobileTemplate = false;
   var screenWidth = $window.innerWidth;

   if (screenWidth <= 320){ // considering 320pxX480px as standard screen dimensions for smart mobile phones
    $scope.includeMobileTemplate = true;
   }

   $scope.showMobileOrDesktopFields = function(showSave) {
     if(showSave){
          $scope.showStateDiv = false;
          $scope.showSlackDiv = true;
     }else{
       if(!$scope.includeMobileTemplate)  {

         $scope.showSlackDiv = false;
         $scope.showStateDiv = true;
       } else {
         $scope.showSlackDiv = true;
         $scope.showStateDiv = false;
       }
     }
   }

   $scope.showSaveCancel = function(showSave){
     $scope.showCancelButton = showSave;
     $scope.showSaveButton = showSave;
     if(showSave) {
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
       $scope.disableState = true;
       $scope.showEditLink = true;
   }
       $scope.showMobileOrDesktopFields(showSave);
   }

   $scope.states = [{ name: "New York", id: 1 }, { name: "Texas", id: 2 }];
   $scope.bioMaxLength = 570;

   $scope.enableSave = function(enable){
     if(enable === "touched") $scope.disableSaveButton = false;
   };

   $scope.saveForm = function() {
     if($scope.infoForm.email.$invalid) {
       alert("Form is invalid. Please correct Errors");
       return;
     } else {
       var userPost = {
        //state  : input.state,
        email : $scope.user.email,
				slackName : $scope.user.slackName,
				phone : $scope.user.phone,
        bio : $scope.user.bio
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
       email: user.email,
       state  : user.state
     };


      //watch for user.bio length
     $scope.$watch("user.bio", function(oldValue,newValue) {
       $scope.remainingBio =  $scope.bioMaxLength-$scope.user.bio.length;
       if($scope.remainingBio < 0) {
        $scope.disableSaveButton = true;
        $scope.bioOverflow = true;
      }
    });
    });


});
