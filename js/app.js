angular.module('CareerBuilder', ['ngSanitize']). 
	config(['$routeProvider', function($routeProvider) { 
	$routeProvider.
		when('/advice-resources', {templateUrl: 'partials/main.html',controller:HomePageCtr}).
		when('/posts/:postId', {templateUrl:'partials/post.html',controller:PostCtr}).
        when('/tools-dashboard',{templateUrl:'partials/tools-dashboard.html',controller:ToolDashBoardCtr}).
        when('/tools/:toolName', {templateUrl:'partials/tools/tool.html',controller:ToolCtr}).
        when('/dashboard', {templateUrl:'partials/dashboard.html',controller:DashboardCtr}).

		otherwise({redirectTo: '/advice-resources'});
	}]).run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
       //also call all the other configuration
       prepareWindow();
	});
}).directive('comment', ['$compile', '$http', '$templateCache', function($compile, $http, $templateCache) {
    
        var getTemplate = function() {
            var templateUrl = 'partials/comment.html',
            templateLoader = $http.get(templateUrl, {cache: $templateCache});
            return templateLoader;

        }

        var linker = function(scope, element, attrs) {

            var loader = getTemplate();
            //put html
            var promise = loader.success(function(html) {
                element.html(html);
                element.replaceWith($compile(element.html())(scope));
            });
        }

        return {
            restrict: 'E',
            scope: {
                comment:'=',
                user:'='
            },
            link: linker
        };
    }]).factory('pagination', function () {
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