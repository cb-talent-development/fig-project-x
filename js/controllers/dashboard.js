function DashboardCtr($scope, $http,pagination,register) {
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
                scrollHorizontal(pages.currentPage,$(class_element));
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
            $scope.register.initInput(data);
	   });
    }
    /*
    Work experiencess
    */
    $scope.loadWorkExperience=function(){
        $http.get("data/json/workexperience.json").success(function(data) {
            $scope.workExperiences=data;
            $scope.register.workExperiences=data;
	   });
    }
    /*
    Eductions    
    */
    $scope.loadEducation=function(){
        $http.get("data/json/education.json").success(function(data) {
            $scope.educations=data; 
            $scope.register.setEducation($scope.educations);
	   });
    }
    /*
    Career Goals
    */
    $scope.loadCareerGoals=function(){
        $http.get("data/json/careergoals.json").success(function(data) {
            $scope.careerGoals=data;
            $scope.register.careerGoals=data;
	   });
    }
    /*
    Skills    
    */
    $scope.loadSkill=function(){
        $http.get("data/json/skills.json").success(function(data) {
            $scope.skills=data; 
            $scope.register.setSkills($scope.skills);
	   });
    }
    /*
    Technology
    */
    $scope.loadTechnologies=function(){
        $http.get("data/json/technologies.json").success(function(data) {
            $scope.technologies=data;
            $scope.register.setTechnologies($scope.technologies);
	   });
    }
    /*
    ADD SKILL/TECH
    */
    $scope.addskillTech=function(type,elem){
        if(type=="skill"){
            $scope.skills.push(elem);
            $scope.register.setSkills($scope.skills);
        }
        else{
            $scope.technologies.push(elem);
            $scope.register.setTechnologies($scope.technologies);
        }
    }
    $scope.addSkill=function(){
        if($scope.inputSkill.show){
            $scope.inputSkill.show=false;
            $scope.addskillTech("skill",{"Name":$scope.inputSkill.value});
        }
        else{
            $scope.inputSkill.show=true;
        }
    }
    $scope.addTech=function(){
        if($scope.inputTechnology.show){
            $scope.inputTechnology.show=false;
            $scope.addskillTech("technology",{"Name":$scope.inputTechnology.value});

        }
        else{
            $scope.inputTechnology.show=true;
        }
    }
    /*
        Constructor
    */
    $scope.init=function(){
        init($scope,register);
        $scope.paths=[{
            "txt":" Dashboard",
            "color":"black"
        }];
        //Loading part
        $scope.loadInfo();
        $scope.loadJob();
        $scope.loadSaved();
        $scope.loadEducation();
        $scope.loadWorkExperience();
        $scope.loadSkill();
        $scope.loadInfo();
        $scope.loadTechnologies();
        $scope.loadCareerGoals();
        //page
        
        $scope.page="dashboard";
        //Message
        $scope.jobResulstTitle="Latest Job for You";
        $scope.savedContentTitle="Saved Content";  
        
        $scope.inputSkill=input();
        $scope.inputTechnology=input();
        
        //Init eventual effects
        $scope.$on('$includeContentLoaded', function(){
            initEffect();
            checkCursorPosition(".resume",".icon-cursor-red","vertical",true);
        });
        
        
    }
    $scope.init();
};