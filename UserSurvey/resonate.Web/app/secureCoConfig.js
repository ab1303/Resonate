angular
    .module('resonateApp')
    .config(['$stateProvider', '$urlRouterProvider', 'usSpinnerConfigProvider',
        function config($stateProvider, $urlRouterProvider, usSpinnerConfigProvider) {

            usSpinnerConfigProvider.setTheme('bigBlue', { color: 'blue', radius: 20 });
            usSpinnerConfigProvider.setTheme('smallBlue', { color: '#18a689', radius: 6 });
            usSpinnerConfigProvider.setTheme('smallRed', { color: 'red', radius: 6 });



            // Routing Setup 

            $urlRouterProvider.otherwise('/about');

            $stateProvider
                .state('about', {
                    url: '/about',
                    component: 'resonateAbout'
                })
                .state('cheques', {
                    url: '/cheques',
                    component: 'resonateCheques'
                })
            ;



        }])
    .run(['$rootScope', '$window', function ($rootScope, $window) {



    }]);
