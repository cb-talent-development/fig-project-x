function ToolDashBoardCtr($scope, $http,register) {
    $scope.openResumeHero=function(){
        if($scope.user=='none'){
            //no user -> no resumeHero
            alert("no user");
            apparition($('.get-started-resume'));
        }
        else{
            window.location.href="#/Career Tools/Resume Hero";
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