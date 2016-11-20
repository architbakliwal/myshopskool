// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('shopskool', ['ionic', "firebase", 'ionic-material'])

.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .factory("Auth", ["$firebaseAuth",
        function($firebaseAuth) {
            return $firebaseAuth();
        }
    ])

.config(function($stateProvider, $urlRouterProvider) {
    console.log("setting config");
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // State to represent Login View
        .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: "Login"

    })


    // setup an abstract state for the tabs directive
    .state('signup', {
        url: "/signup",
        templateUrl: "templates/signup.html",
        controller: "Signup"

    })

    // Each tab has its own nav history stack:

    .state('db_connect', {
        url: '/db_connect',
        templateUrl: "templates/db_connect.html",
        controller: "DB_connect"
    });



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/signup');

})

.controller("DB_connect", ["$scope", "Auth", '$state',
    function($scope, Auth, $state) {
      
        var surname = firebase.database().ref("/greens/1/Surname/");
        surname.on('value', function(snapshot) {
            $scope.surname = snapshot.val();
        });


        $scope.submit_db = function() {
            $refpath = $scope.dbForm.ref.$modelValue;
            $data1 = $scope.dbForm.data1.$modelValue;
            $data2 = $scope.dbForm.data2.$modelValue;
            $data3 = $scope.dbForm.data3.$modelValue;

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
            firebase.database().ref().update({ "/greens/1/Surname/": "hello" })
                .then(function() {
                    alert("Data Updated");
                })
                .catch(function(error) {
                    alert(error.message);
                });
        };
        //go to first tab
        $scope.signup = function() {
            $state.go('signup');
        };
        //go to db tab
        $scope.login = function() {
            $state.go('login');
        };

    }
])


.controller("Login", ["$scope", "Auth", '$state',
    function($scope, Auth, $state) {

        //go to first tab
        $scope.signup = function() {
            $state.go('signup');
        };
        //go to db tab
        $scope.db_connect = function() {
            $state.go('db_connect');
        };
        $scope.signout = function() {
            firebase.auth().signOut().then(function() {
                    alert("Signed out successfully");
                })
                .catch(function(error) {

                    alert(error.message);
                });
        };

        $scope.getuser = function() {

            //get current user if signed in
            var user = firebase.auth().currentUser;

            if (user) {
                //show user id on screen if signed in
                $scope.user = {
                    id: 'User ID: ' + user.uid
                };
            } else {
                $scope.user = {
                    id: 'no user signed in'
                };
            }


        };

        $scope.login = function() {

            $signin_email = $scope.userloginForm.email.$modelValue;
            $signin_password = $scope.userloginForm.password.$modelValue;

            // sign in
            Auth.$signInWithEmailAndPassword($signin_email, $signin_password)
                .then(function(firebaseUser) {
                    //$scope.message = "User created with uid: " + firebaseUser.uid;
                    alert(firebaseUser.email + " logged in successfully!");
                }).catch(function(error) {

                    alert(error.message);
                    //$scope.error = error;
                });


        };



    }
])

.controller("Signup", ["$scope", "Auth", '$state',
    function($scope, Auth, $state) {


        $scope.login = function() {
            $state.go('login');
        };
        //go to db tab
        $scope.db_connect = function() {
            $state.go('db_connect');
        };

        $scope.createUser = function() {
            $scope.message = null;
            $scope.error = null;

            //get users email and password from ui
            $email_str = $scope.userForm.email.$modelValue;
            $password_str = $scope.userForm.password.$modelValue;

            // Create a new user
            Auth.$createUserWithEmailAndPassword($email_str, $password_str)
                .then(function(firebaseUser) {
                    $scope.message = "User created with uid: " + firebaseUser.uid;
                }).catch(function(error) {
                    $scope.error = error;
                });
        };

        $scope.deleteUser = function() {
            $scope.message = null;
            $scope.error = null;

            // Delete the currently signed-in user
            Auth.$deleteUser().then(function() {
                $scope.message = "User deleted";
            }).catch(function(error) {
                $scope.error = error;
            });
        };
    }
]);
