function ToolDashBoardCtr($scope, $http,register) {
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