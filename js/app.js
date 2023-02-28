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
        ;
      
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
        .then((data) => {
          $scope.order = data; 
          $scope.$applyAsync(); 
          $scope.filter = null; 
          $scope.orderFilter = (event) => {
            let element = event.currentTarget;
            $scope.filter = element.id; 
            $scope.$applyAsync(); 
          };
        })
        .catch((e) => console.log(e)); 
    },
  ]);
  
})(window, angular);

$stateProvider.state('login', {
  url: '/login',
  templateUrl: 'login.html',
  controller: 'LoginController'
})
.state('register', {
  url: '/register',
  templateUrl: 'register.html',
  controller: 'RegisterController'
});



// AJAX kérés küldése az adatok lekéréséhez
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // A JSON adatok parse-olása
      var stilusok = JSON.parse(xhr.responseText);

      // A termékek listájának lekérése a HTML-ből
      var stilusList = document.getElementById('stilus-list');

      // A termékek hozzáadása a HTML sablonhoz
      stilusok.forEach(function(stilus) {
        var card = document.createElement('div');
        card.className = 'col-sm-6 col-md-4 col-lg-3';
        card.innerHTML = `
        <div class="card">
          <img src="${stilus.kep}" class="card-img-top" alt="${stilus.ar}">
          <div class="card-body">
            <h5 class="card-title">${stilus.megnev}</h5>
            <p class="card-text">${stilus.leiras}</p>
            <a href="#" class="btn btn-primary">Buy now</a>
          </div>
        </div>
      `;
      stilusList.appendChild(card);
    });
  }
};
xhr.open('GET', 'arlista.php', true);
xhr.send();


       
const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top");
const pageProgressBar = document.querySelector(".progress-bar");

const scrollContainer = () => {
  return document.documentElement || document.body;
};

const goToTop = () => {
  document.body.scrollIntoView({
    behavior: "smooth"
  });
};

document.addEventListener("scroll", () => {
  console.log("Scroll Height: ", scrollContainer().scrollHeight);
  console.log("Client Height: ", scrollContainer().clientHeight);

  const scrolledPercentage =
    (scrollContainer().scrollTop /
      (scrollContainer().scrollHeight - scrollContainer().clientHeight)) *
    100;

  pageProgressBar.style.width = `${scrolledPercentage}%`;

  if (scrollContainer().scrollTop > showOnPx) {
    backToTopButton.classList.remove("hidden");
  } else {
    backToTopButton.classList.add("hidden");
  }
});

backToTopButton.addEventListener("click", goToTop);
