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

