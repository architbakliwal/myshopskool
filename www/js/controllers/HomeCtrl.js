app.controller('HomeCtrl', function($scope, $stateParams, ionicMaterialInk, Auth, $state) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            // console.log(user);
            $scope.user = user.email;
        } else {
            // No user is signed in.
            // console.log("no signed in");
            $scope.user = "";
        }
    });

    var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/plus.login');

    $scope.google_login = function() {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
        }).catch(function(error) {
            console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    };

});
