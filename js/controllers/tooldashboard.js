function ToolDashBoardCtr($scope, $http) {
    /*
    Constructor
    */
    $scope.init=function(){
        checkUserInfo($scope,$http);
        $scope.paths=[{
            "txt":" Career Tools",
            "color":"black"
        }]
        //Init eventual effects
        $scope.$on('$includeContentLoaded', function(){
            initEffect();
        });
        
    }
    $scope.init();
};