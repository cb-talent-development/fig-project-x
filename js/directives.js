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
        scope:{
            elem: '=',
            value: '='
        },
        link: function (scope, element, attrs,controller) {
            //scope.value=attrs.value;
            //scope.elem=attrs.elem;
            //console.log(scope);
            //var content=scope.$eval(scope.value);
            element.text(scope.value);
            element.click(function(e){
                scope.$apply(function(scope){
                    scope.elem=scope.value;
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
    var template='<div class="steps"><span class="etape"></span></div>';
	return{
		restrict: 'E',
		replace: true,
        transclude: true,
		template: template,
		scope: {
                nbrSteps:'=',
				firstConnect:'=',
                message:'='
        },
		link: function(scope, element, attrs){
            var message,string;
            if(attrs.message){
                message=scope.message;
            }
			for(var i = attrs.nbrSteps; i>0 && attrs.firstConnect; i--){
                if(message){
                    string=message[i-1];
                }
                else{
                    string="Step "+i;
                }
				element.find(".etape").prepend("<div class='icon-step-"+i+"'><span>"+string+"</span></div>");
			}
		}
	};
});
