app.controller('GreensCtrl', function($scope, $stateParams, $ionicPopup, $timeout, ionicMaterialInk, Auth, $state) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    $scope.ref = "/greens";
    $scope.app = {};
    $scope.student = {};

    var student = firebase.database().ref("/greens/1/");
    student.on('value', function(snapshot) {
        // console.log(snapshot.val());
        $scope.student = snapshot.val();
    });

    $scope.submit_db = function() {
        $refpath = $scope.ref;
        // firebase.database();

        //write data to db with current user
        firebase.database().ref($refpath).set({
                "1": { "rollno": 1, "lastname": "Annarkar", "firstname": "Shravni", "fathername": "Dinesh", "sets": 1, "shirtsize": 10, "halfpantsize": 0, "skirtsize": 22, "totalpayable": 750, "totalpaid": 100, "balance": "" }
            }).then(function() {
                $scope.showPopup("Success!!", "Data Submitted");
            })
            .catch(function(error) {
                $scope.showPopup("Error!!", error.message);
            });
    };

    $scope.update_db = function() {
        var student = $scope.student;
        firebase.database().ref().update({ "/greens/1/": student })
            .then(function() {
                $scope.showPopup("Success!!", "Data Updated");
            })
            .catch(function(error) {
                $scope.showPopup("Error!!", error.message);
            });
    };

    $scope.add_amt = function() {
        console.log($scope.app.addamt);
        $scope.student.totalpaid = parseInt(parseInt($scope.student.totalpaid, 10) + parseInt($scope.app.addamt, 10), 10);
        $scope.student.balance = parseInt(parseInt($scope.student.totalpayable, 10) - parseInt($scope.student.totalpaid, 10), 10);
        console.log($scope.student);
        $scope.update_db();
    };

    $scope.showPopup = function(title, message) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: message
        });

        $timeout(function() {
            //ionic.material.ink.displayEffect();
            ionicMaterialInk.displayEffect();
        }, 0);
    };
});
