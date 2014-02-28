function FirstConnectCtr($scope, $http ,pagination) {

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
	$scope.showHeader= function(){
        showHeader();
	}
	$scope.hideHeader= function(){
        hideHeader();
	}
	
	$scope.closeFirstConnect= function(){
        closeFirstConnectShowHeader();
	}
	$scope.hideFirstConnect= function(){
        hideFirstConnect();
	}
	
	$scope.chooseHeader = function() {
		if($scope.firstConnection){
			$scope.hideHeader();
		}
		else{
			$scope.hideFirstConnect();
		}
	}
	
	$scope.chooseHeader();
	$scope.loadPages();
    $scope.init=function(){
        //init();
    }
};