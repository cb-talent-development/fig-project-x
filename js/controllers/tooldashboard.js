function ToolDashBoardCtr($scope, $http,register) {
    $scope.openResumeHero=function(){
        if($scope.user=='none'){
            //no user -> no resumeHero
            alert("no user");
            apparition($('.dashboard-popup'));
        }
        else{
            window.location.href="#/tools/resume-hero";
        }
    }
	/*
    Constructor
    */
    $scope.init=function(){
        init($scope,register);
        checkUserInfo($scope,$http);
        $scope.paths=[{
            "txt":"Career Tools",
            "color":"black"
        }]
        //Init eventual effects
        $scope.$on('$includeContentLoaded', function(){
            initEffect();
        });
        
    }
    $scope.init();
};