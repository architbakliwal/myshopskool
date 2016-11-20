app.controller('HomeCtrl', function($scope, $stateParams, ionicMaterialInk, Auth, $state) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log(user);
            $scope.user = user.email;
        } else {
            // No user is signed in.
            console.log("no signed in");
        }
    });

    $scope.ref = "/greens";

    var surname = firebase.database().ref("/greens/1/Surname/");
    surname.on('value', function(snapshot) {
        $scope.surname = snapshot.val();
    });

    var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/plus.login');


    $scope.submit_db = function() {
        $refpath = $scope.ref;
        // firebase.database();

        //write data to db with current user
        firebase.database().ref($refpath).set({
                "1": { "GR No": 4307, "Surname": "Aher", "Student Name": "Arpita", "Father's Name": "Vilas", "Sets": 1, "Adv": 795, "Receipt book 5": 73, "Total": 795, "Balance": 0, "Paid on 20-06-2016": 0 },
                "24": { "GR No": 4331, "Surname": "Aher", "Student Name": "Gaurav", "Father's Name": "Mukesh", "Sets": 2, "Adv": 700, "Receipt book 5": 83, "Total": 1320, "Balance": 620, "Paid on 20-06-2016": 620 },
                "2": { "GR No": 4308, "Surname": "Alhat", "Student Name": "Madhuri", "Father's Name": "Shankar", "Sets": 1, "Adv": 500, "Receipt book 5": 13.50, "Total": 795, "Balance": 295, "Paid on 20-06-2016": 0 },
                "3": { "GR No": 4309, "Surname": "Amare", "Student Name": "Kashish", "Father's Name": "Suresh", "Sets": 2, "Adv": 700, "Receipt book 5": 3, "Total": 1320, "Balance": 620, "Paid on 20-06-2016": 0 },
                "25": { "GR No": 4332, "Surname": "Ambekar", "Student Name": "Sarthak", "Father's Name": "Vivek", "Sets": 2, "Adv": 800, "Receipt book 5": 15, "Total": 1320, "Balance": 520, "Paid on 20-06-2016": 520 },
                "26": { "GR No": 4333, "Surname": "Bakale", "Student Name": "Chaitanya", "Father's Name": "Avinash", "Sets": 2, "Adv": 1320, "Receipt book 5": 71, "Total": 1320, "Balance": 0, "Paid on 20-06-2016": 0 },
                "4": { "GR No": 4310, "Surname": "Bhardwaj", "Student Name": "Rashi", "Father's Name": "Ketan", "Sets": 0, "Adv": 0, "Receipt book 5": 0, "Total": 270, "Balance": 270, "Paid on 20-06-2016": 0 },
                "5": { "GR No": 4312, "Surname": "Bhosle", "Student Name": "Shreya", "Father's Name": "Dhanraj", "Sets": 1, "Adv": 795, "Receipt book 5": 13.59, "Total": 795, "Balance": 0, "Paid on 20-06-2016": 0 },
                "6": { "GR No": 4313, "Surname": "Chowdhary", "Student Name": "Bhoomi", "Father's Name": "Tejram", "Sets": 1, "Adv": 795, "Receipt book 5": 76, "Total": 795, "Balance": 0, "Paid on 20-06-2016": 0 },
                "27": { "GR No": 4335, "Surname": "Dandawate", "Student Name": "Rishi", "Father's Name": "Ganesh", "Sets": 2, "Adv": 1000, "Receipt book 5": 37, "Total": 1320, "Balance": 320, "Paid on 20-06-2016": 320 }
            }).then(function() {
                alert("Data submitted");
            })
            .catch(function(error) {
                alert(error.message);
            });
    };

    $scope.update_db = function() {
        var surname = $scope.surname;
        firebase.database().ref().update({ "/greens/1/Surname/": surname })
            .then(function() {
                alert("Data Updated");
            })
            .catch(function(error) {
                alert(error.message);
            });
    };

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
