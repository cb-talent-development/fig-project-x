function SavedContentCtr($scope, $http,register,pagination) {
    /*
    Saved Content
    */
    $scope.loadSaved=function(){
        $http.get("data/json/saved.json").success(function(data) {
            $scope.saves=data;
            $scope.pageSaved=new pagination();
            $scope.pageSaved.limit=5;
            $scope.pageSaved.totalElem=data.length;
            $scope.pageSaved.computePages();
	   });
    }
    $scope.deleteSaved=function(elem){
        alert(JSON.stringify(elem));
        //...
    }
    /*
    Constructor
    */
    $scope.init=function(){
        init($scope,register);
        checkUserInfo($scope,$http);
        $scope.loadSaved();
        $scope.page="dashboard";
        $scope.paths=[{
                "txt":"Dashboard /",
                "color":"black"
            },
            {
                "txt":"Saved Content",
                "color":"black"
            }]
        //Init eventual effects
        $scope.$on('$viewContentLoaded', function(){
            initEffect();
        });
        
    }
    $scope.init();
};