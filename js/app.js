;(function(window, angular) {

  'use strict';

  // Application module
  angular.module('app', ['ui.router', 'app.common'])

  /* Application config */
  .config([
    '$stateProvider', 
    '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: './html/home.html'
        })
        .state('rolunk', {
          url: '/rolunk',
          templateUrl: './html/rolunk.html'
        })
        .state('foglalas', {
          url: '/foglalas',
          templateUrl: './html/foglalas.html'
        })
        .state('arlista', {
          url: '/arlista',
          templateUrl: './html/ar.html',
          controller:"arkontroller"

        })
        .state('termekek', {
          url: '/termekek',
          templateUrl: './html/termek.html',
          controller:"termekkontroller"
        })
        .state('nyeremeny', {
          url: '/nyeremeny',
          templateUrl: './html/nyeremeny.html'
        })
        .state('login', {
          url: '/login',
          templateUrl: './html/login.html'
        })
        .state('register', {
          url: '/register',
          templateUrl: './html/register.html',
          controller:"registerController"
        });
      
      $urlRouterProvider.otherwise('/');
    }

    
  ])
  
  //
  .controller("arkontroller", [
    "$scope", 
    "http", 
    function ($scope, http) {
      http
        .request({
          url: "./php/get.php", 
          method: "POST", 
          data: {
            db: "barbershop",
            query: "SELECT * FROM `stilus`", 
            isAssoc: true, 
          },
        })
        .then(data => {
          $scope.data = data;
          $scope.$applyAsync();
        })
        .catch((e) => console.log(e)); 
    }
  ]) 

  .controller("termekkontroller", [
    "$scope", 
    "http", 
    function ($scope, http) {
      http
        .request({
          url: "./php/get.php", 
          method: "POST", 
          data: {
            db: "barbershop",
            query: "SELECT * FROM `termekek`", 
            isAssoc: true, 
          },
        })
        .then(data => {
          $scope.data = data;
          $scope.$applyAsync();
        })
        .catch((e) => console.log(e)); 
    }
  ])

  // Registration
  .controller("registerController", [
    "$scope", 
    "http", 
    "$state",
    function ($scope, http, $state) {
      $scope.model =  {
        nev: null,
        telszam: null,
        email: null,
        jelszo: null,
        lakcim: null
      };

      $scope.register = function () {
        http.request({
          url: "./php/register.php", 
          method: "POST", 
          data: $scope.model
        })
        .then(data => {
          
        })
      }
      $scope.dismiss = function () {
        $state.go("login");
      }
    }
  ]);
  

  
  
})(window, angular);

function nav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}