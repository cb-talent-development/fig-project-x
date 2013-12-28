function HeaderCtr($scope, $http) {
    /*
    Constructor
    */
    $scope.openDashboard=function(){
        if($scope.user=='none'){
            //no user -> no dashboard
            alert("no user");
            apparition($('.dashboard-popup'));
        }
        else{
            window.location.href="#/dashboard";
        }
    }
	$scope.openResumeHero=function(){
		alert('lool');
        if($scope.user=='none'){
            //no user -> no resumeHero
            alert("no user");
            apparition($('.get-started-resume'));
        }
        else{
            window.location.href="#/Career Tools/Resume Hero";
        }
    }
    $scope.init=function(){
        checkUserInfo($scope,$http);
        //Init eventual effects
        $scope.$on('$viewContentLoaded', function(){
            initEffect();
        });
        
    }
    $scope.init();
};