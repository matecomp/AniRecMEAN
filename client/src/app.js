import angular from 'angular'
import 'angular-ui-router'

angular.module('animeRecommender', ["ui.router"])

    .config(($stateProvider, $urlRouterProvider) => {
      $urlRouterProvider.otherwise('/animes');

      $stateProvider
      .state('animes', {
        url:'/animes',
        templateUrl: 'animes/animes-nav.html',
        resolve: {
            animesService: function($http) {
                return $http.get('/animes');
            }
        },
        controller: function(animesService) {
            this.animes = animesService.data;
        },
        controllerAs: 'animesCtrl'
      })
      .state('animes.genre', {
        url: '/:animeId',
        templateUrl: 'animes/animes-genre.html',
        resolve: {
            animeService: function($http, $stateParams) {
                return $http.get(`/animes/${$stateParams.animeId}`);
            }
        },
        controller: function(animeService) {
            this.anime = animeService.data;
        },
        controllerAs: 'genreCtrl'
      })
    })