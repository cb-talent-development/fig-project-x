function DashboardCtr($scope, $http,pagination,register) {
    /*
    Save function
    */
    /*$scope.save=function(){
        checkCursorPosition('.resume','.icon-cursor-red','vertical',true);
        //...
        console.log("save");
    }*/
    //
    //Check Job Title
    //
   /* $scope.checkJobTitle=function(){        
        console.log($scope.jobTitle);
        if($scope.jobTitle.length>=5){
            //...
            $scope.showErrorJob=true;
            $scope.correctionJob="not-done";
            $scope.jobTitles=["Public Relations Specialist","Sales Manager","Mcdonald Manager","Donut Seller"];
            $scope.jobTitleCorrected=$scope.jobTitles[0];
        }
    }
    $scope.checkSchool=function(){
         if($scope.schoolName.length>=3){
            //...
            $scope.showErrorSchool=true;
            $scope.correctionSchool="not-done";
            $scope.schools=["Harvard","Princeton","MIT"];
            $scope.schoolCorrected=$scope.schools[0];
        }
    }
    //
    //Setter
    //
    $scope.setJobPhase=function(phase){
        $scope.user.JobPhase=phase;
    }
    $scope.setSchool=function(id){
        $scope.schoolCorrected=$scope.schools[id];
        $scope.schoolName=$scope.schoolCorrected;
        $scope.correctionSchool="done";
    }
    $scope.setJobTitle=function(id){
        $scope.jobTitleCorrected=$scope.jobTitles[id];
        $scope.jobTitle=$scope.jobTitleCorrected;
        $scope.correctionJob="done";
    }
    */
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
            $scope.register.initInput(user);
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
            console.log(data);
            $scope.register.setTechnologies($scope.technologies);
	   });
    }
    /*
    //Input initialisation
    $scope.initInput=function(){
        $scope.selectedAge="Select Age Range";
        $scope.selectedState=$scope.user.State;
        $scope.gender=$scope.user.Gender;
        $scope.zipcode=$scope.user.Zipcode;
        $scope.jobTitle=$scope.user.JobTitle;
        $scope.salaryValue=$scope.user.Income;
    }*/
    //*//
    //Add Skill/technology
    $scope.sendSkillTech=function(url,input,name){
        input.show=false;
        if(input.value!=""){
                $scope.register.addskillTech(name,{"Name":input.value});
                input.value="";
                //TODO:...
                $http.post(url,{name:input.value})
                .success(function(data){
                    console.log(data);
                    //use callback to add it to the skillsSelected
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
            $scope.sendSkillTech(url,$scope.inputSkill,"skill");
        }
        else{
            $scope.inputSkill.show=true;
        }
    }
    $scope.addTech=function(){
        console.log($scope.inputTechnology);
        if($scope.inputTechnology.show){
            var url="test";
            $scope.sendSkillTech(url,$scope.inputTechnology,"technology");
        }
        else{
            $scope.inputTechnology.show=true;
        }
    }
    /*
    //add remove element into selected skills/technologies
    //we need three lists: 1) to show, 2)the saved one 3)the choosen one
    $scope.selectRemoveTech=function(id){
        var elem=$scope.technologiesList.getById(id);
        index=$scope.technologiesSelected.indexOfObject(elem);
        if(index>-1){
            //already selected
            $scope.technologiesSelected.splice(index, 1);
        }
        else{
            $scope.technologiesSelected.push(elem);
        }
        ($scope.technologiesSelected.length>0)?$scope.technologyState.completed=true:$scope.technologyState.completed=false;
    }
    $scope.selectRemoveSkills=function(id){
        var elem=$scope.skillsList.getById(id);
        index=$scope.skillsSelected.indexOfObject(elem);
        if(index>-1){
            //already selected
            $scope.skillsSelected.splice(index, 1);
        }
        else{
            $scope.skillsSelected.push(elem);
        }
        ($scope.skillsSelected.length>0)?$scope.skillState.completed=true:$scope.skillState.completed=false;
    }
    ////////////////////////////////////////
    // Save function that does everything //
    ////////////////////////////////////////
    $scope.save=function(){
        //HUGE FUNCTION
        //skills
        //TODO: save skills
        $scope.skills=$scope.skillsSelected;
        //technologies
        //TODO: save tech
        $scope.technologies=$scope.technologiesSelected;
        
        //goals
        //...
    }*/
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
        $scope.register=new register($scope);
        
        $scope.page="dashboard";
        //Message
        $scope.jobResulstTitle="Latest Job for You";
        $scope.savedContentTitle="Saved Content";  
        
        $scope.inputSkill=input();
        $scope.inputTechnology=input();
        /*
        //Part job title
        $scope.salaries=["$25,000-$50,000","$50,000-$75,000","$75,000-$100,000","$125,000-$150,000"];
        $scope.showErrorJob=false;
        $scope.companyName="Enter Company Name"
        
        //companues
        $scope.companies=["McKinsey","Bain","BCG","Fig"];
        //states
        $scope.states=["IL","NY","NJ"];
        //degrees
        $scope.degrees=["Master Degree","Bacheloper Degree","Phd"]
        //institution
        $scope.institutions=["College","Upper High School","Formation"];
        //ages
        //messages step=
        $scope.messageStep=["THE BASICS","JOB PHASE","OCCUPATION","EDUCATION","SKILLS & ABILITIES"];
        $scope.ages=["18-25 Years Old","26-30 Years Old","31-35 Years Old"];
        //skill/technology
        $scope.inputSkill=input();
        $scope.inputTechnology=input();
        //state
        $scope.skillState={'completed':false};
        $scope.technologyState={'completed':false};
        $scope.goalState={'completed':false};
        
        $scope.skillsList=config.skillsList;
        $scope.skillsSelected=[];
        $scope.technologiesSelected=[];
        $scope.technologiesList=config.technologiesList;
        
        $scope.goalsInput={
            "employement":input(),
            "desired":input(),
            "industry":input()
        }*/
        //Init eventual effects
        $scope.$on('$includeContentLoaded', function(){
            initEffect();
            checkCursorPosition(".resume",".icon-cursor-red","vertical",true);
        });
        
        
    }
    $scope.init();
};