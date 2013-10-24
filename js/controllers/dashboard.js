function DashboardCtr($scope, $http,pagination) {
    
    /*
    Check Job Title
    */
    $scope.checkJobTitle=function(){        
        console.log($scope.jobTitle);
        if($scope.jobTitle.length>=5){
            //...
            $scope.showErrorJob=true;
            $scope.correction="not-done";
            $scope.jobTitles=["Public Relations Specialist","Sales Manager","Mcdonald Manager","Donut Seller"];
            $scope.jobTitleCorrected=$scope.jobTitles[0];
        }
    }
    /*
    CUSTOM SELECT
    */
    $scope.setSalary=function(id){
        $scope.salaryValue=$scope.salaries[id];
    }
    $scope.setCompany=function(id){
        $scope.companyName=$scope.companies[id];
    }
    $scope.setJobTitle=function(id){
        $scope.jobTitleCorrected=$scope.jobTitles[id];
        $scope.jobTitle=$scope.jobTitleCorrected;
        $scope.correction="done";
    }
    $scope.setAge=function(id){
        $scope.selectedAge=$scope.ages[id];
    }
    $scope.setState=function(id){
        $scope.selectedState=$scope.states[id];
    }
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
            $scope.saves=data;
            $scope.pageSaved=new pagination();
            $scope.pageSaved.limit=5;
            $scope.pageSaved.totalElem=data.length;
            $scope.pageSaved.computePages();
	   });
    }
    /*
    Work experiencess
    */
    $scope.loadInfo=function(){
        $http.get("data/json/user-full.json").success(function(data) {
            $scope.user=data;
	   });
    }
    /*
    Work experiencess
    */
    $scope.loadWorkExperience=function(){
        $http.get("data/json/workexperience.json").success(function(data) {
            $scope.workExperiences=data;
	   });
    }
    /*
    Eductions    
    */
    $scope.loadEducation=function(){
        $http.get("data/json/education.json").success(function(data) {
            $scope.educations=data; 
	   });
    }
    /*
    Career Goals
    */
    $scope.loadCareerGoals=function(){
        $http.get("data/json/careergoals.json").success(function(data) {
            $scope.careerGoals=data;
	   });
    }
    /*
    Skills    
    */
    $scope.loadSkill=function(){
        $http.get("data/json/skills.json").success(function(data) {
            $scope.skills=data; 
	   });
    }
    /*
    Technology
    */
    $scope.loadTechnologies=function(){
        $http.get("data/json/technologies.json").success(function(data) {
            $scope.technologies=data;
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
        $scope.loadInfo();
        $scope.loadJob();
        $scope.loadSaved();
        $scope.loadEducation();
        $scope.loadWorkExperience();
        $scope.loadSkill();
        $scope.loadInfo();
        $scope.loadTechnologies();
        $scope.loadCareerGoals();
        $scope.page="dashboard";
        $scope.jobResulstTitle="Latest Job for You";
        $scope.savedContentTitle="Saved Content";
        $scope.selectedAge="Select Age Range";
        $scope.selectedState="State";
        //Part job title
        $scope.jobTitle="";
        $scope.salaryValue="Enter your Current Salary";
        $scope.salaries=["$25,000-$35,000","$45,000-$50,000"];
        $scope.showErrorJob=false;
        $scope.companyName="Enter Company Name"
        //companues
        $scope.companies=["McKinsey","Bain","BCG","Fig"];
        //states
        $scope.states=["IL","NY","NJ"];
        //ages
        $scope.ages=["18-25 Years Old","26-30 Years Old","31-35 Years Old"];
        //Init eventual effects
        $scope.$on('$includeContentLoaded', function(){
            initEffect();
            var jobPhases=$(".phase");
            if(jobPhases){
                for(var i=0;i<jobPhases.length;i++){
                    if($(jobPhases[i]).hasClass("selected")){
                        moveCursor($(jobPhases[i]),$('.icon-cursor-red'),true);
                    }
                }
            }
        });
        
        
    }
    $scope.init();
};