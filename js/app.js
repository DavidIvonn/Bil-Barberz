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
        .state('blog', {
          url: '/blog',
          templateUrl: './html/blog.html'
        })
        .state('contact', {
          url: '/contact',
          templateUrl: './html/contact.html'
        })
        .state('ar', {
          url: '/ar',
          templateUrl: './html/ar.html',
          controller:"arkontroller"

        })
        .state('termek', {
          url: '/termek',
          templateUrl: './html/termek.html'
        })
        .state('nyeremeny', {
          url: '/nyeremeny',
          templateUrl: './html/nyeremeny.html'
        })
        .state('login', {
          url: '/login',
          templateUrl: './html/login.html'
        });
      
      $urlRouterProvider.otherwise('/');
    }
  ])

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
    },
  ]);
  
})(window, angular);