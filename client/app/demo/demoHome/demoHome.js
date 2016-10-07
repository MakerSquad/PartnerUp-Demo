angular.module('PU.demoHome', [])

.controller('DemoHomeController', function ($scope, $location, $route) {

$scope.goToCreatePool = function(){
  $location.path('/createPool')
}

$scope.goToPool = function(pool){
  $location.path(`/pools/${pool.id}`);
}

$scope.deletePool = function(pool){
  if(pool.role === 'fellow' || pool.role === 'instructor' || pool.role === 'memberAdmin' ){
    if(confirm('Do you want to delete this pool, once delete its gone forever?')){
      window.pools.splice(window.pools.indexOf(pool), 1);
      $route.reload;
    }
  }
  else{
    alert("you are not an admin, you may not delete this pool")
  }
}

 var init = (function(){ //function that runs on load; it'll call all the fns to set up the page
    $scope.loading = true;
    new Clipboard('.clipyclip');
    if(!window.currentUser){
      $location.path('/');
      return;      
    }

    $scope.currentUser = window.currentUser; //where we store the current user's information 
    $scope.pools = window.pools; //where we store the total amout of pools from the owner
    $scope.loading = false;
  }())
})