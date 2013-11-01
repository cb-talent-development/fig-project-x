function FirstConnectCtr($scope, $http ,pagination) {
	/*
    Page Click
    */
    $scope.pageClick=function(page,class_element){
        if(!lock){
            var pages = $scope.pageFirstConnect;
 
            if(page<=pages.pages.length && page>0){
                pages.currentPage=page;
                scrollHorizontal(pages.currentPage,$(class_element));
            }
            else{}
        }
    }
    /*
    Job for You
    */
    $scope.loadPages=function(){
        $http.get("data/json/first-connect.json").success(function(data) {
           // Job recommandation
            $scope.firstConnect=data;
			
            $scope.pageFirstConnect=new pagination();
            $scope.pageFirstConnect.limit=1;			
            $scope.pageFirstConnect.totalElem=data.length;
            $scope.pageFirstConnect.computePages();
	   });
    }
	
	$scope.loadPages();
};