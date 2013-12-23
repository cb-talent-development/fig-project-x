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
    $scope.init=function(){
        checkUserInfo($scope,$http);
        //Init eventual effects
        $scope.$on('$viewContentLoaded', function(){
            initEffect();
        });
        
    }
    $scope.init();
};