import angular from 'angular'
import uiRouter from '@uirouter/angularjs'


angular.module('animeRecommender', [uiRouter]);

angular.module('animeRecommender')
    .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html'
    })
    .state('animes', {
        url:'/animes',
        templateUrl: 'templates/animes-nav.html',
        resolve: {
            animesService: function($http) {
                return $http.get('api/animes-list');
            }
        },
        controller: function(animesService) {
            this.animes = animesService.data;
        },
        controllerAs: 'animesCtrl'
    })
    .state('animes.genre', {
        url: '/:animeId',
        templateUrl: 'templates/animes-genre.html',
        resolve: {
            animeService: function($http, $stateParams) {
                return $http.get(`api/animes-list/${$stateParams.animeId}`);
            }
        },
        controller: function(animeService) {
            this.anime = animeService.data[0];
            this.anime.genre = this.anime.genre.split(', ');
            
        },
        controllerAs: 'genreCtrl'
    })
    })
    .filter('capitalize', function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
            }
    })
    .controller('loginCtrl', function() {
        this.login = function() {
            let email = this.email;
            let password = this.password;
            if(email === 'admin@admin.com' && password === 'admin'){
                alert('Porra!');
            }else{
                alert('Email ou Senha inválidos');
            }
        };
    })
    .directive('loginBtn', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/login-btn.html'
        };
    });
