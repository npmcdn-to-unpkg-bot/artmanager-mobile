// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('artmanager', [
  'ionic', 
  'controllers.appController',
  'controllers.loginController',
  'controllers.dashboardController',
  'controllers.userController',
  'controllers.providerController',
  'services.loginService',
  'services.utilService',
  'ionic-material', 
  'ionMdInput'
  ]);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if(window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  if(window.StatusBar) {
    StatusBar.styleDefault();
  }
});
});

app.config(function ($urlRouterProvider, $stateProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);

  var stateProvider =  $stateProvider;

  stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  });

  stateProvider.state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  });
  stateProvider.state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardCtrl'
      }
    }
  });  
  stateProvider.state('app.createUser', {
    url: '/createUser',
    views: {
      'menuContent': {
        templateUrl: 'templates/form-user.html',
        controller: 'UserCtrl'
      }
    }
  });
  stateProvider.state('app.createProvider', {
    url: '/createProvider',
    views: {
      'menuContent': {
        templateUrl: 'templates/form-provider.html',
        controller: 'ProviderCtrl'
      }
    }
  });
    
  $urlRouterProvider.otherwise('/app/login');
});
