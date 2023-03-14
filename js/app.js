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
          templateUrl: './html/login.html',
          controller:"loginController"
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
  
      // Űrlap validáció
      $scope.register = function () {

        // Form validation
        if (!$scope.model.nev || !$scope.model.email || !$scope.model.telszam || !$scope.model.jelszo || !$scope.model.lakcim) {
          // Failed validation - show error message
          $("#sikertelen .modal-body").text("Kérjük, töltse ki az összes mezőt!");
          $("#sikertelen").modal("show");
          return;
        }
    
        // Email and phone number validation
        if (!validateEmail($scope.model.email)) {
          $("#sikertelen .modal-body").text("Kérjük, adjon meg egy érvényes email címet!");
          $("#sikertelen").modal("show");
          return;
        }

        if (!validatePhoneNumber($scope.model.telszam)) {
          $("#sikertelen .modal-body").text("Kérjük, adjon meg egy érvényes telefonszámot!");
          $("#sikertelen").modal("show");
          return;
        }

        http.request({
          url: "./php/register.php", 
          method: "POST", 
          data: $scope.model
        })
        .then(data => {
          if (data && data.error) {
            // If email already exists, show error message
            $("#sikertelen .modal-body").text("Hiba: Már létezik ilyen felhasználó ezzel az e-mail címmel!");
            $("#sikertelen").modal("show");
          } else {
            // Registration successful - show success message and navigate to login page
            $("#siker").modal("show");
            $state.go("login");
          }
        })
        .catch(error => {
          // Registration failed - show error message
          $("#sikertelen .modal-body").text(error);
          $("#sikertelen").modal("show");
        });
      };
        
      // Email validation function
      function validateEmail(email) {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
      }
      
      // Phone number validation function
      function validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^\+?\d{8,}$/;
        return phoneRegex.test(phoneNumber);
      }
    }
  ])
  
  
  //
  .controller("loginController", [
    "$scope", 
    "http", 
    function ($scope, http) {

      $scope.model =  {
        email: null,
        jelszo: null
      };

      $scope.login = function() {
        http
          .request({
            url: "./php/login.php", 
            method: "POST", 
            data: $scope.model
          })
          .then(data => {
            $scope.data = data;
            $scope.$applyAsync();
          })
          .catch((e) => {
            console.log(e)
          });
      };
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