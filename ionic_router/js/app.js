//选项卡切换模块
angular.module('myApp1', ['ionic','myApp1.controllers'])//注入controllers必须以myApp.controllers方式注入


.config(function($stateProvider, $urlRouterProvider) {


    $stateProvider.state('tab', {
	    url: "/tab",
	    abstract:true,
	    templateUrl: "templates/tabs.html"
	})



  .state('tab.homepage', {
    url: '/homepage',
    views:{
        'homepage':{
            templateUrl: "templates/homepage.html",
            controller:'tab1Controller'

        }

    }

  })
  .state('tab.cuisine', {
      url: '/cuisine',
      views:{
          'cuisine':{
              templateUrl: "templates/cuisine.html",
              controller:'tab2Controller'
          }

      }

  })
  

  .state('tab.content1', {
      url: '/content1/:id',
      views:{
          'homepage':{
              templateUrl: "templates/homepage_content1.html",
              controller:'content1Controller'
          }

      }

  })
  .state('tab.content2', {
      url: '/content2/:e_id',
      views:{
          'cuisine':{
              templateUrl: "templates/homepage_content2.html",
              controller:'contentsController'
          }

      }

  })
  .state('tab.search', {
      url: '/search',
      views:{
          'search':{
              templateUrl: "templates/search.html",
              controller:'tab3Controller'
          }

      }

  })
  .state('tab.content3', {
      url: '/content3/:search',
      views:{
          'search':{
              templateUrl: "templates/serche_content1.html",
              controller:'content3Controller'
          }

      }

  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/homepage');

});
