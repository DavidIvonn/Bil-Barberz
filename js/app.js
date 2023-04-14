; (function (window, angular) {

  'use strict';

  // Application module
  angular.module('app', ['ui.router', 'app.common'])

    /* Application config */
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

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
            templateUrl: './html/foglalas.html',
            controller: "idopontController"
          })
          .state('arlista', {
            url: '/arlista',
            templateUrl: './html/ar.html',
            controller: "arController"
          })
          .state('termekek', {
            url: '/termekek',
            templateUrl: './html/termek.html',
            controller: "termekController"
          })
          .state('nyeremeny', {
            url: '/nyeremeny',
            templateUrl: './html/nyeremeny.html'
          })
          .state('login', {
            url: '/login',
            templateUrl: './html/login.html',
            controller: "loginController"
          })
          .state('register', {
            url: '/register',
            templateUrl: './html/register.html',
            controller: "registerController"
          });

        $urlRouterProvider.otherwise('/');
      }
    ])

    //app run
    .run([
      "$rootScope",
      "$transitions",
      "$timeout",
      "http",
      function ($rootScope, $transitions, $timeout, http) {

        // Set global variables
        $rootScope.user = null;
        $rootScope.bejelentkezve = false;

      }
    ])

    //
    .controller("arController", [
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

    .controller("termekController", [
      "$scope",
      "http",
      function ($scope, http) {
        $scope.searchTerm = '';
        $scope.cardHeight = 0;

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
            $scope.filteredData = data;
            $scope.cardHeight = angular.element('.termekek').height();
            $scope.$applyAsync();
          })
          .catch((e) => console.log(e));

        // kereső függvény
        $scope.search = function () {
          var term = $scope.searchTerm.toLowerCase();
          $scope.filteredData = $scope.data.filter(function (card) {
            var name = card.megnev.toLowerCase();
            return name.indexOf(term) > -1;
          });
        };

        // üzenet megjelenítése, ha nincs találat
        $scope.noResults = function () {
          return $scope.searchTerm.length > 0 && $scope.filteredData.length === 0;
        };

      },
    ])


    .controller("registerController", [
      "$scope",
      "http",
      "$state",
      function ($scope, http, $state) {
        $scope.model = {
          nev: null,
          telszam: null,
          email: null,
          jelszo: null,
          lakcim: null
        };

        // Űrlap validáció
        $scope.register = function () {

          // Form validation
          if (!$scope.model.nev ||
            !$scope.model.email ||
            !$scope.model.telszam ||
            !$scope.model.jelszo ||
            !$scope.model.lakcim) {
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
      "$rootScope",
      "$state",
      function ($scope, http, $rootScope, $state) {

        $scope.model = {
          email: null,
          jelszo: null
        };

        $rootScope.kijelentkezes = function () {
          $rootScope.bejelentkezve = false;
          $rootScope.user = null;
          $rootScope.$applyAsync();
          $("#reservationModalLabel").text("Kijelentkezve!");
          $(".modal-body").text("Sikeresen kijelentkezett!");
          $("#reservationModal").modal("show");
          $state.go("home")
        }

        $scope.login = function () {
          http
            .request({
              url: "./php/login.php",
              method: "POST",
              data: $scope.model
            })
            .then(data => {
              if (data.length) {
                $rootScope.user = data[0];
                console.log($rootScope.user);
                $rootScope.bejelentkezve = true;
                $rootScope.$applyAsync();
                $("#reservationModalLabel").text("Bejelentkezve!");
                $(".modal-body").text("Sikeresen bejelentkezett!");
                $("#reservationModal").modal("show");
                $state.go("home")

              } else {
                $scope.model = {
                  email: null,
                  jelszo: null
                };
                $scope.data = null; -
                  $scope.$applyAsync();
                $("#sikertelenbejentkez").modal("show");
              }
            })
            .catch((e) => {
              console.log(e)
            });
        }
      }
    ])


    .controller("idopontController", [
      "$scope",
      "http",
      "$rootScope",
      "$state",
      function ($scope, http, $rootScope, $state) {
        // if (!$rootScope.bejelentkezve) {
        //   alert('Be kell jelentkezned a foglaláshoz!');
        //   $state.go("login");
        // }
        // Make an HTTP POST request to retrieve data from the server
        http.request({
          url: "./php/get.php",
          method: "POST",
          data: {
            db: "barbershop",
            query: "SELECT megnev from stilus",
            isAssoc: true,
          },
        })
          .then(data => {
            $scope.data = data;
            $scope.$applyAsync();
            $scope.updateValidTimes = function () {
              // get the day of the week for the selected date
              var date = new Date($scope.selectedDate);
              var dayOfWeek = date.getDay();
              $scope.isSunday = function () {
                var date = new Date($scope.selectedDate);
                return date.getDay() === 0;
              };

              // set the valid times for the selected day
              $scope.validTimes = [];

              switch (dayOfWeek) {
                case 1: // Monday
                  $scope.validTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
                  break;
                case 2: // Tuesday
                  $scope.validTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
                  break;
                case 3: // Wednesday
                  $scope.validTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
                  break;
                case 4: // Thursday
                  $scope.validTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
                  break;
                case 5: // Friday
                  $scope.validTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
                  break;
                case 6: // Saturday
                  $scope.validTimes = ['09:00', '10:00', '11:00', '12:00', '13:00'];
                  break;
                default: // Sunday or invalid date
                  $scope.validTimes = ['Vasárnap zárva vagyunk!'];
              }
            };
          })
          .catch((e) => console.log(e));

        $scope.submitForm = function () {
          // Create a new Date object with the selected date and time
          var selectedDateTime = new Date($scope.selectedDate + 'T' + $scope.selectedTime + ':00');

          // Format the selected date and time as a string
          var selectedDateTimeString = $scope.selectedDate + 'T' + $scope.selectedTime + ':00';

          // Make an HTTP POST request to insert the booking into the database
          http.request({
            url: './php/foglalas.php',
            method: 'POST',
            data: {
              idopontid: null, // The database should automatically assign an ID to the new booking
              idopont: selectedDateTimeString,
              megjegyzes: $scope.comment,
              felhasznaloid: $rootScope.user.felhaszid,
              telszam: $scope.phoneNumber
            }
          })
            .then(function (response) {
              // Handle the response from the server
              console.log(response);
              console.log(data)
            })
            .catch(function (error) {
              // Handle any errors that occurred during the request
              console.log(error.data);
              console.error(error);
            });
        };


      }]);



})(window, angular);
