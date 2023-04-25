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
            templateUrl: './html/nyeremeny.html',
            controller: "nyeremenyController",
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
          })
          .state('kosar', {
            url: '/kosar',
            templateUrl: './html/kosar.html',
            controller: 'kosarController',
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

        // Globális változók beállítása
        $rootScope.user = null;
        $rootScope.bejelentkezve = false;
        $rootScope.cart = [];

        // Oldalfrissítés esetén a 'home' state-re navigálás
        $transitions.onStart({}, function (transition) {
          if (transition.from().name === '' && transition.to().name !== 'home') {
            return transition.router.stateService.target('home');
          }
        });

      }
    ])
    .controller("nyeremenyController", [
      "$scope",
      "$http",
      function ($scope, $http) {
        $scope.sikerult = false;
        $scope.email = "";
        $scope.valasz1 = "";
        $scope.valasz2 = "";
        $scope.valasz3 = "";
        $scope.valasz4 = "";
        $scope.eredmeny = "";
        $scope.ertekelo = function () {
          let hiba = 4;

          if ($scope.valasz1 == "" || $scope.valasz2 == "" || $scope.valasz3 == "" || $scope.valasz4 == "") {
            $scope.eredmeny = "Töltse ki az összes mezőt az értékelés előtt!"
          }
          else {
            hiba += ($scope.valasz1 === "kezi" || $scope.valasz1 === "rovid" || $scope.valasz1 === "ferfi") ? -1 : 1;
            hiba += ($scope.valasz1 === "hamvasito") ? 1 : -1;

            $scope.eredmeny = (hiba === 0) ? "Jól választottál! Add le a válaszod hogy felkerülj a nyereményjátékra!" : hiba + ' hibás választ adtál meg! Próbáld meg újra!';
            $scope.sikerult = (hiba === 0);
          }
        };
        $scope.mentes = function () {
          if ($scope.sikerult) {
            $http({
              url: './php/get.php',
              method: 'POST',
              data: {
                db: 'barbershop',
                query: 'INSERT INTO `nyeremeny` (email, valasz1, valasz2, valasz3, valasz4) VALUES (?, ?, ?, ?, ?)',
                params: [$scope.email, $scope.valasz1, $scope.valasz2, $scope.valasz3, $scope.valasz4]
              }
            }).then(function () {
              alert("Köszönjük a részvételt!");
              $state.go("")
            }).catch(function () {
              alert("Hiba történt az adatok felvezéteskor! Próbálja újra később!")
            });
          }
          else {
            alert("Hibás válaszok! Próbálja meg újra!");
          }
        }
      }
    ])
    .controller("kosarController", [
      "$scope",
      "http",
      "$rootScope",
      "$state",
      function ($scope, http, $rootScope, $state) {
        $scope.currentUser = $rootScope.user.felhaszid;
        $scope.kosarFeltoltes = function () {
          let rendelesek = [];
          for (let i = 0; i < $rootScope.cart.length; i++) {
            let item = {
              termekid: $rootScope.cart[i].termekid,
              dbszam: $rootScope.cart[i].dbszam,
              fizetesmod: 'Utánvét',
              felhaszid: $scope.currentUser,
              datum: moment().format('YYYY-MM-DD HH:mm:ss')
            };
            rendelesek.push(item);
          }
          http
            .request({
              method: "POST",
              url: "./php/kosar.php",
              data: {
                products: rendelesek,
                fizetesmod: 'Utánvét',
                felhaszid: $scope.currentUser,
                total: $rootScope.total,
                datum: moment().format('YYYY-MM-DD HH:mm:ss')
              },
            })
            .then(function (data) {
              alert(data);
              $state.go("home");
            })
            .catch(function (error) {
              alert("Hiba! Kérjük próbálja meg a rendelést később!")
              $state.go("home");
            });
        };
}])
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
      "$rootScope",
      "$scope",
      "http",
      function ($rootScope, $scope, http) {
        $scope.searchTerm = '';
        $scope.cardHeight = 0;
        $scope.handleCartClick = function () {
          if (!$rootScope.bejelentkezve) {
            alert("A rendeléshez jelentkezzen be!");
          }
        };

        http
          .request({
            url: "./php/termekek.php",
            method: "POST",
          })
          .then(data => {
            $scope.data = data;
            $scope.filteredData = data;
            $scope.cardHeight = angular.element('.termekek').height();
            $scope.$applyAsync();
          })
          .catch((e) => console.log(e));
        $scope.search = function () {
          let term = $scope.searchTerm.toLowerCase();
          $scope.filteredData = $scope.data.filter(function (card) {
            let name = card.megnev.toLowerCase();
            return name.indexOf(term) > -1;
          });
        };
        // üzenet megjelenítése, ha nincs találat
        $scope.noResults = function () {
          return $scope.searchTerm.length > 0 && $scope.filteredData.length === 0;
        };
        $scope.toCart = (termek) => {
          if ($rootScope.bejelentkezve) {
            // Megkeressük, hogy van-e már ilyen termék a kosárban
            const existingItemIndex = $rootScope.cart.findIndex(item => item.termekid === termek.termekid);

            if (existingItemIndex !== -1) {
              // Ha van már ilyen termék a kosárban, akkor csak növeljük a darabszámot
              $rootScope.cart[existingItemIndex].dbszam++;
            } else {
              // Ha nincs még ilyen termék a kosárban, akkor hozzáadjuk új elemként
              $rootScope.cart.push({ ...termek, dbszam: 1 });
            }
            $rootScope.total = $rootScope.cart.reduce((sum, item) => sum + item.ar * item.dbszam, 0);
          }
          else {
            alert("Kérjük a rendeléshez jelentkezzen be!");
          }
        }
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
          $("#bejelentkezKijelentkezModalLabel").text("Kijelentkezve!");
          $(".modal-body").text("Sikeresen kijelentkezett!");
          $("#bejelentkezKijelentkezModal").modal("show");
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
                $("#bejelentkezKijelentkezModalLabel").text("Bejelentkezve!");
                $(".modal-body").text("Sikeresen bejelentkezett!");
                $("#bejelentkezKijelentkezModal").modal("show");
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
              let date = new Date($scope.selectedDate);
              let dayOfWeek = date.getDay();
              $scope.isSunday = function () {
                let date = new Date($scope.selectedDate);
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
          let selectedDateTime = new Date($scope.selectedDate + 'T' + $scope.selectedTime + ':00');

          // Format the selected date and time as a string
          let selectedDateTimeString = $scope.selectedDate + 'T' + $scope.selectedTime + ':00';

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
