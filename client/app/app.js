angular.module('PU', [
  'ngRoute',
  'ngAnimate',
  'PU.demoHome',
  'PU.demoPoolPage',
  'PU.demoUserHistory',
  'PU.demoCreatePool',
  'PU.demoStart'
  ])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'demo/demoStart/demoStart.html',
    controller: 'DemoStartController'
  })
  .when('/home', {
    templateUrl: 'demo/demoHome/demoHome.html',
    controller: 'DemoHomeController'
  })
  .when('/pools/:poolId', {
    templateUrl: 'demo/demoPoolPage/demoPoolPage.html',
    controller: 'DemoPoolPageController'
  })
  .when('/users/:userUid', {
    templateUrl: 'demo/demoUserHistory/demoUserHistory.html',
    controller: 'DemoUserHistoryController'
  })
  .when('/createPool', {
    templateUrl: 'demo/demoCreatePool/demoCreatePool.html',
    controller: 'DemoCreatePoolController'
  })
  .otherwise({
    redirectTo: '/'
  });
})

.directive('loading', function() {
  return {
    templateUrl: 'directives/loading.html'
  };
})

// .directive('header', function() {
//   var controller = function($scope, $location, $http, CurrentUser) {
//     var path = $location.path();
//     $scope.nicknames = {
//       'a4fa408de847': 'Patty Cakes',
//       '90b72025841d': 'Gilby',
//       "ab2bc0473a48": 'Kitty',
//       "8534c57b54f4": 'Waltisha',
//       "bfc5a48d77ae": 'Russian Man',
//       '2a97b80a545a': 'Jam Jam',
//       '3a9137d82c2b': 'Ez'
//     };

//     $scope.hideMyPools = path === '/'; // NB: these routes might change
//     $scope.hideCreatePool = path === '/createPool';
//     $scope.currentUser;

//     var init = (function()
//      {
//       CurrentUser.get()
//       .then(function(user) {
//         if(!user) {
//           $location.path('/signin');
//         } else {
//           $scope.currentUser = user;
//           $scope.hideHist = path === `/users/${user.uid}`;
//           console.log("In header, currentUser: ", $scope.currentUser);
//         }
//       });
//     }());

//     $scope.seeMyPools = function() {
//       $location.path('/');
//     };

//     $scope.goToCreatePool = function() {
//       $location.path('/createPool');
//     };

//     $scope.signOut = function() {
//       CurrentUser.signOut();
//     };

//     $scope.goToMyHistory = function() {
//       $location.path(`/users/${$scope.currentUser.uid}`);
//     };
//   };

//   return {
//     controller: controller,
//     templateUrl: 'directives/header.html'
//   };
// })

.directive('demoheader', function() {
  var controller = function($scope, $location) {
    var path = $location.path();
    $scope.hideMyPools = path === '/home'; // NB: these routes might change
    $scope.hideCreatePool = path === '/createPool';
    $scope.currentUser;
    var init = (function() {
        $scope.currentUser = window.currentUser;
        $scope.hideHist = path === `/users/${currentUser.uid}`;
      }())

    $scope.seeMyPools = function() {
      $location.path('/home');
    };

    $scope.goToCreatePool = function() {
      $location.path('/createPool');
    };

    $scope.signOut = function() {
      $location.path('/');
    };

    $scope.goToMyHistory = function() {
      $location.path(`/users/${$scope.currentUser.uid}`);
    };
  }

  return {
    controller: controller,
    templateUrl: 'directives/header.html'
  }
})
// .run();
