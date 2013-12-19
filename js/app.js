angular.module('CareerBuilder', ['ngSanitize','CareerDirectives','factory']). 
	config(['$routeProvider', function($routeProvider) { 
	$routeProvider.
		when('/advice-resources', {templateUrl: 'partials/main.html',controller:HomePageCtr}).
		when('/posts/:postId', {templateUrl:'partials/post.html',controller:PostCtr}).
        when('/tools-dashboard',{templateUrl:'partials/tools-dashboard.html',controller:ToolDashBoardCtr}).
        when('/tools/:toolName', {templateUrl:'partials/tools/tool.html',controller:ToolCtr}).
        when('/dashboard', {templateUrl:'partials/dashboard.html',controller:DashboardCtr}).
        when('/dashboard/saved', {templateUrl:'partials/saved.html',controller:SavedContentCtr}).

		otherwise({redirectTo: '/advice-resources'});
	}]).run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
       //also call all the other configuration
       prepareWindow();
	});
}).directive('onKeyup', function() {
            return function(scope, element, attributs) {
            scope.safeApply = function(fn) {
              var phase = this.$root.$$phase;
              if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                  fn();
                }
              } else {
                this.$apply(fn);
              }
            };
            var keyupFn = scope.$eval(attributs.onKeyup);
            element.bind("keyup", function(event) {
                scope.safeApply(function() {
                    keyupFn.call(scope, event.which);
                });
            });
        };
    }).directive('onKeydown', function() {
            return function(scope, element, attributs) {
            scope.safeApply = function(fn) {
              var phase = this.$root.$$phase;
              if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                  fn();
                }
              } else {
                this.$apply(fn);
              }
            };
            var keyupFn = scope.$eval(attributs.onKeydown);
            element.bind("keydown", function(event) {
                scope.safeApply(function() {
                    keyupFn.call(scope, event.which);
                });
            });
        };
    }).factory('pagination', function () {
            function page(){
                this.currentPage=1;
                this.pages=[1];
                this.limit=5;
                this.totalElem=0;
            };
            page.prototype.computePages=function(){
                this.pages = range(1,Math.ceil(this.totalElem/this.limit));
            }
            return page;
        });