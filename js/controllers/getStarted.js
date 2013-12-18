function GetStartedCtr($http, $scope){
	alert('1');	
	$scope.previous = function() {
		$scope.actualPage--;
		return false;
	}
	$scope.next = function() {
		$scope.actualPage++;
		return false;
	}
	$scope.init=function(){
		$scope.totalPages = 5;
		$scope.actualPage = 1;
		alert('1');
	}
	$scope.init();
}