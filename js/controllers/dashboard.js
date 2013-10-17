function DashboardCtr($scope, $http,pagination) {
    /*
    Page Click
    */
    $scope.pageClick=function(page,type,class_element){
        if(!lock){
            var pages;
            if(type=="jobs"){
                pages=$scope.pageJobs;
            }
            else{
                pages=$scope.pageSaved;
            }
            if(page<=pages.pages.length && page>0){
                pages.currentPage=page;
                scrollVertical(pages.currentPage,$(class_element));
            }
            else{}
        }
    }
    /*
    Job for You
    */
    $scope.loadJob=function(){
        $http.get("data/json/jobs.json").success(function(data) {
           // Job recommandation
            $scope.jobs=data; 
            $scope.pageJobs=new pagination();
            $scope.pageJobs.limit=5;
            $scope.pageJobs.totalElem=data.length;
            $scope.pageJobs.computePages();
	   });
    }
    
    /*
    Saved Content
    */
    $scope.loadSaved=function(){
        $http.get("data/json/saved.json").success(function(data) {
           // Job recommandation
            $scope.saves=data;
            $scope.pageSaved=new pagination();
            $scope.pageSaved.limit=5;
            $scope.pageSaved.totalElem=data.length;
            $scope.pageSaved.computePages();
	   });
    }
    /*
    Constructor
    */
    
    $scope.init=function(){
        checkUserInfo($scope,$http);
        $scope.paths=[{
            "txt":" Dashboard",
            "color":"black"
        }];
        $scope.loadJob();
        $scope.loadSaved();
        $scope.jobResulstTitle="Latest Job for You";
        $scope.savedContentTitle="Saved Content";
        //Init eventual effects
        $scope.$on('$includeContentLoaded', function(){
            initEffect();
        });
        
        
    }
    $scope.init();
};