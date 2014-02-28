angular.module('CareerBuilder', ['ngSanitize','ngRoute','CareerDirectives','factory']). 
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
});