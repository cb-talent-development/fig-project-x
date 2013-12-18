function DashboardCtr($scope, $http,pagination) {
    /*
    Save function
    */
    $scope.save=function(){
        checkCursorPosition('.resume','.icon-cursor-red','vertical',true);
        //...
        console.log("save");
    }
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
    Setter
    */
    $scope.setJobPhase=function(phase){
        $scope.user.JobPhase=phase;
    }
    $scope.setJobTitle=function(id){
        $scope.jobTitleCorrected=$scope.jobTitles[id];
        $scope.jobTitle=$scope.jobTitleCorrected;
        $scope.correction="done";
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
            $scope.initInput();
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

    //Input initialisation
    $scope.initInput=function(){
        $scope.selectedAge="Select Age Range";
        $scope.selectedState=$scope.user.State;
        $scope.gender=$scope.user.Gender;
        $scope.zipcode=$scope.user.Zipcode;
        $scope.jobTitle=$scope.user.JobTitle;
        $scope.salaryValue=$scope.user.Income;
    }
    //Add Skill/technology
    $scope.sendSkillTech=function(url,input,values,name){
        input.show=false;
        if(input.value!=""){
                values.push({"Name":input.value});
                input.value="";
                //TODO:...
                $http.post(url,{name:input.value})
                .success(function(data){
                    console.log(data);
                })
                .error(function(data){
                    console.log(data);
                });
        }
    }
    
    $scope.addSkill=function(){
        console.log($scope.inputSkill);
        if($scope.inputSkill.show){
            var url="test";
            $scope.sendSkillTech(url,$scope.inputSkill,$scope.skills,"skill");
        }
        else{
            $scope.inputSkill.show=true;
        }
    }
    $scope.addTech=function(){
        console.log($scope.inputTechnology);
        if($scope.inputTechnology.show){
            var url="test";
            $scope.sendSkillTech(url,$scope.inputTechnology,$scope.technologies,"technology");
        }
        else{
            $scope.inputTechnology.show=true;
        }
    }
    /*
        Constructor
    */
    $scope.init=function(){
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
        //Part job title
        $scope.salaries=["$25,000-$50,000","$50,000-$75,000","$75,000-$100,000","$125,000-$150,000"];
        $scope.showErrorJob=false;
        $scope.companyName="Enter Company Name"
        
        //companues
        $scope.companies=["McKinsey","Bain","BCG","Fig"];
        //states
        $scope.states=["IL","NY","NJ"];
        //ages
        
        $scope.ages=["18-25 Years Old","26-30 Years Old","31-35 Years Old"];
        //skill/technology
        $scope.inputSkill=input();
        $scope.inputTechnology=input();
        console.log($scope.inputSkill);
        //Init eventual effects
        $scope.$on('$includeContentLoaded', function(){
            initEffect();
            checkCursorPosition(".resume",".icon-cursor-red","vertical",true);
        });
        
        
    }
    $scope.init();
};