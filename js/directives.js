var dir = angular.module('CareerDirectives', []);

dir.directive('photoLarge', function() {
	return {
		restrict: 'A',
		templateUrl: 'partials/A-photo-large.html',
		scope: {
			articleA: '='
		}
	};
});

dir.directive('photoSmall', function() {
	return {
		restrict: 'A',
		templateUrl: 'partials/A-photo-small.html',
		scope: {
			articleA: '='
		}
	};
});

dir.directive('nophoto', function() {
	return {
		restrict: 'A',
		templateUrl: 'partials/A-nophoto.html',
		scope: {
			articleA: '='
		}
	};
});

dir.directive('tempI', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'partials/I.html',
		scope: {
			articleI: '='
		}
	};
});

dir.directive('tempV', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'partials/V.html',
		scope: {
			articleV: '='
		}
	};
});

dir.directive('tempP', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'partials/P-2-3.html',
		scope: {
			articleV: '='
		}
	};
});

dir.directive('select',[function(){
    return{
        link: function (scope, element, attrs,controller) {
            scope.value=attrs.value;
            scope.elem=attrs.elem;
            var content=scope.$eval(scope.value);
            element.text(content);
            element.click(function(e){
                var parent=scope.$parent;
                parent.$apply(function(){
                    parent[scope.elem]=content;
                });
            });
        }
    }
}]);

dir.directive('comment', ['$compile', '$http', '$templateCache', function($compile, $http, $templateCache) {
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
}]);

dir.directive('steps', function(){
	return{
		restrict: 'E',
		replace: true,
        transclude: true,
		template: '<div class="steps"><span id="etape"></span></div>',
		scope: {
                nbrSteps:'=',
				firstConnect:'='
        },
		link: function(attrs){
			for(var i = attrs.nbrSteps; i>0 && attrs.firstConnect; i--){
				$('#etape').prepend("<span class='icon-step-"+i+"'>Step "+i+"</span>");
			}
			return true;
		}
	};
});
