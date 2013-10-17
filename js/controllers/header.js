function HeaderCtr($scope, $http) {
    /*
    Constructor
    */
    $scope.init=function(){
        checkUserInfo($scope,$http);
        //Init eventual effects
        $scope.$on('$viewContentLoaded', function(){
            initEffect();
        });
        
    }
    $scope.init();
};