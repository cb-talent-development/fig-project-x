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
		$('.menu-buttons').slideDown('normal');
		$('#header').slideDown('normal');
	}
	$scope.hideHeader= function(){
		$('.menu-buttons').hide();
		$('#header').hide();
	}
	
	$scope.closeFirstConnect= function(){
		$('.first-connect').fadeOut('normal','linear', function(){
			$scope.showHeader();
		});
	}
	$scope.hideFirstConnect= function(){
		$('.first-connect').hide();
	}
	
	$scope.chooseHeader = function() {
		if($scope.firstConnection && !checkIfModeTwoColumns()){
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