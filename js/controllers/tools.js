/*
Tools controller
*/
function ToolCtr($scope, $http,$routeParams,pagination,register) {
    
    /*
    Page Click
    */
    $scope.pageClick=function(page,type,class_element){
        if(!lock){
            if(page<=$scope.pageJobs.pages.length && page>0){
                $scope.pageJobs.currentPage=page;
                scrollHorizontal($scope.pageJobs.currentPage,$(class_element));
            }
            else{}
        }
    }
	$scope.pageClickTemp=function(page,type,class_element){
        if(!lock){
            if(page<=$scope.pageTemplate.pages.length && page>0){
                $scope.pageTemplate.currentPage=page;
                scrollHorizontal($scope.pageTemplate.currentPage,$(class_element));
            }
            else{}
        }
    }
	
	$scope.pageClickResume=function(page,type,class_element){
        if(!lock){
            if(page<=$scope.pageResume.pages.length && page>0){
                $scope.pageResume.currentPage=page;
                scrollHorizontal($scope.pageResume.currentPage,$(class_element));
            }
            else{}
        }
    }
    /*
    Constructor
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
    };
    $scope.loadOccupations=function(){
        if($scope.occupations.length==0){
            $http.get("data/json/occupations.json").success(function(data) {
                // Job recommandation
                $scope.occupations=data.occupations;
                $scope.occupation_checkbox=[];
	       });
        }
    }
    $scope.loadIndustries=function(){
        if($scope.industries.length==0){
            $http.get("data/json/industries.json").success(function(data) {
                // Job recommandation
                $scope.industries=data.industries;
	       });
        }
    }
	$scope.loadTemplates = function(){
		$http.get("data/json/templates.json").success(function(data) {
           // Job recommandation
            $scope.userTemplates=data;
			$scope.pageTemplate=new pagination();
            $scope.pageTemplate.limit=5;
            $scope.pageTemplate.totalElem=data.length;
            $scope.pageTemplate.computePages();
	   });
	}
    $scope.saveIndustry=function(industry){
        $scope.industryId=industry.id;
        $scope.savedIndustry=industry.Name;
    }
    $scope.loadHelp=function(name){
        $http.get("data/json/help-"+name+".json").success(function(data) {
                // Job recommandation
                $scope.help=data;
	    });
    }
	$scope.loadResumeHero=function(){
        if($scope.resumeHero.length==0){
            $http.get("data/json/resume-hero.json").success(function(data) {
                // Job recommandation
                $scope.resumeHero=data;
				$scope.pageResume=new pagination();
				$scope.pageResume.limit=5;
				$scope.pageResume.totalElem=data.length;
				$scope.pageResume.computePages();
	       });
        }
    }
    /*
    Saved search
    */
    $scope.save_search=function(){
        console.log("Search Name : "+$scope.input_saved_search+", Have to save : "+$scope.savedIndustry);
        console.log($scope.occupation_checkbox);
    }
    /*
    Constructor
    */
    $scope.init=function(){
        init($scope,register);
        var name=$routeParams.toolName;
        $scope.help={};
        $scope.loadHelp(name);
        $scope.occupations=[];
		$scope.resumeHero=[];
        $scope.industries=[];
        $scope.input_saved_search="";
        if(name=="career-scape"){
            $scope.txt="Career Scape";
            $scope.template="partials/tools/careerScape.html";
            $scope.title={"part1":"Career","part2":"Scape"};
            $scope.logo="icon-careerscape-small";
            $scope.logo_saved="icon-careerscape-saved-big";
			$scope.specialClass="career-scape";
        }
        else if(name=="locally-grown"){
            $scope.txt="Locally Grown";
            $scope.template="partials/tools/locallyGrown.html";
            $scope.title={"part1":"Locally","part2":"Grown"};
            $scope.logo="icon-localygrown-small";
            $scope.logo_saved="icon-locallygrown-saved-big";
			$scope.specialClass="locally-grown";

        }
        /*else if(name=="jobinality"){
            $scope.txt="Jobinality";
            $scope.template="partials/tools/jobinality.html";
            $scope.title={"part1":"Job","part2":"inality"};
            $scope.logo="icon-jobinality-small";
            $scope.logo_saved="icon-jobinality-saved";

        }*/
        else if(name=="resume-hero"){
            $scope.txt="Resume Hero";
            $scope.template="partials/tools/resumeHero.html";
            $scope.title={"part1":"Resume","part2":"Hero"};
            $scope.logo="icon-resumeHero-small";
            $scope.logo_saved="icon-resumeHero-saved-big";
			$scope.specialClass="resume-hero";
        }
        $scope.paths=[{
            "txt":"Career Tools /",
            "color":"grey"
        },
        {
            "txt":$scope.txt,
            "color":"black"
        }];
        $scope.savedIndustry="Choose an Industry";
        checkUserInfo($scope,$http);
        $scope.jobResulstTitle="Job for You:";
		$scope.resumeHeroTitle="My Resumes, ";
        $scope.loadJob();
        $scope.loadIndustries();
        $scope.loadOccupations();
		$scope.loadTemplates();
        $scope.loadResumeHero();
    }
    $scope.init();
    $scope.$on('$includeContentLoaded', function(){
        initEffect();
        
    });
};
/*
Career Scape controller
*/
function CareerScapeCtr($scope, $http){
    /*
    Constructor
    */
    $scope.init=function(){
        //get canvas and context  
        window.canvas = document.getElementById('canvas');
        window.context = canvas.getContext('2d');
        //launch the construction
        initCanvas();
        window.canvasDessinator=new CanvasDessinator(canvas,context);
        window.onresize=resizeCanvas;
        //global variables
        window.generalType="salary";
        window.fractionAnim=1;
        window.startPositionDown={'x':0,'y':0};
        if('ontouchstart' in document) {
            window.isTouch=true;
        }
        else
            window.isTouch=false;
        //event to handle the pan effect
        //1) mouse
        canvas.addEventListener("mousedown",mouseDown);
        window.addEventListener("mousemove",mouseMove);
        window.addEventListener("mouseup",mouseUp);
        //2) touch
        canvas.addEventListener("touchstart",mouseDown,false);
        window.addEventListener("touchmove",mouseMove,false);
        window.addEventListener("touchend",mouseUp,false); 
        //load data and launch animation when loaded
        loadData("data/careerscape.json"); 
        //$scope.$parent.loadJob($scope);
        checkLoaded(); 
    }
    $scope.init();
}
/*
Locally Grown
*/
function LocallyGrownCtr($scope, $http){
    /*
    Constructor
    */
    $scope.init=function(){
        window.map = L.mapbox.map('map','nico924.map-44thu1zv').setView([40.714623,-74.006605],8);  
        window.dataJson=L.geoJson(null, {
                        style: style,
                        onEachFeature: onFeature
        }).addTo(map);
        map.scrollWheelZoom.removeHooks();
        /*if mode counties
        loadData("data/counties2.json");//*/

    }
    $scope.init();
    
    
}
/*
Jobinality
*/
function JobinalityCtr($scope, $http){
    /*
    Constructor
    */
    $scope.init=function(){
        //...
    }
    $scope.init();
    
    
}
/*
Jobinality
*/
function ResumeHeroCtr($scope, $http, pagination, getStarted){
    /*
    Constructor
    */
	//Select the current Resume
	$scope.selectResume = function(resume){
		$scope.currentResume.Class="";
		$scope.currentResume = resume;
		$scope.currentResume.Class="selected";
		$scope.sections = $scope.currentResume.Data;
		$scope.getStarted.initInput(resume.ResumeInfo, user);
		return false;
	}	
	
	//Delete the current selected Resume
	$scope.removeItem = function(){
		var i = $scope.currentResume.Id;
		if(i==0){
			alert('Cannot delete the last resume left');
		}
		else {
			for(var j = i; j < $scope.resumeHero.length; j++){
				$scope.resumeHero[j].Id = $scope.resumeHero[j].Id - 1;
			}
			$scope.resumeHero.splice(i, 1);
			if(i==$scope.resumeHero.length){i--;}
			$scope.currentResume = $scope.resumeHero[i]; //Select automatically the next resume
			$scope.currentResume.Class="selected";
			$scope.sections = $scope.currentResume.Data;
			$scope.pageResume.totalElem=$scope.resumeHero.length;
			$scope.pageResume.computePages();
			disparition($('.delete-resume')); //Close pop-up
		}
	}
	
	//Add a new edited section in the current selected resume
	$scope.saveSection = function () {
		var content = $('.textarea').val();
		$scope.currentResume.Data.push({
			'Title':$scope.newSectionTitle,
			'Content':content
	   });
	   disparition($('.add-section')); //close pop-up
	}
	/*
	*/
	
	$scope.loadInfo=function(){
        $http.get("data/json/user-full.json").success(function(data) {
            $scope.user=data;
	   });
    }
	
	$scope.getStartedPage = function(n){
		apparition($('.get-started-resume'));
        movePopup($('.get-started-resume'),n,true);
	}
	
	$scope.editSection = function(){
		alert('edit');
	}
	
	$scope.createResume=function(){
		var newResume = {
			"Id":"5",
			"Title":"Title",
			"Type":"Type",
			"Level":"Level",
			"Class":"",
			"ResumeInfo":{
				"Job":{
					"Title":"",
					"Company":"",
					"Location":"",
					"StartDate":{
						"Month":"",
						"Year":""
					},
					"EndDate":{
						"Month":"",
						"Year":""
					},
					"Description":"",
					"State":{
						"Completed":"false"
					}
				},
				"Education":{
					"Type":{
						"Name":"",
						"Corrected":"false"
					},
					"Specialization":"",
					"Institution":"",
					"Location":"",
					"DateGraduated":{
						"Month":"",
						"Year":""
					},
					"State":{
						"Completed":"false"
					}
				},
				"Skills":{
					"Skills":["false", "false", "false", "false", "false", "false"],
					"State":{
						"Completed":"false"
					}
				},
				"Award":{
					"Title":"",
					"AwardDate":{
						"Month":"",
						"Year":""
					},
					"State":{
						"Completed":"false"
					}
				},
				"TechnologicalSkills":{
					"Description":"",
					"State":{
						"Completed":"false"
					}
				},
				"Volunteer":{
					"Description":"",
					"State":{
						"Completed":"false"
					}
				},
				"ContactInfo":{
					"Name":"",
					"LastName":"",
					"FirstName":"",
					"Mail":"",
					"Phone":"",
					"Mobile":"",
					"Address":{
						"State":"",
						"City":"",
						"Zipcode":"",
						"Street":""
					},
					"State":{
						"Completed":"false"
					}
				}
			},
			"Data":[]
		}
		var id = $scope.resumeHero.length;
		newResume.Id = id;
		$scope.resumeHero.push(newResume);
		$scope.selectResume(newResume);
		$scope.currentResume=newResume;
		$scope.pageResume.totalElem=$scope.resumeHero.length;
		$scope.pageResume.computePages();
		apparition($('.get-started-resume'));
	}
	
	$scope.saveGetStarted=function(){
		$scope.getStarted.save();
		$scope.currentResume.ResumeInfo = $scope.getStarted.resume;
	}
	
	
    $scope.init=function(){
		if(!$scope.resumeHero[0]){
			$http.get("data/json/resume-hero.json").success(function(data) {
                // Job recommandation
                $scope.resumeHero=data;
				$scope.pageResume=new pagination();
				$scope.pageResume.limit=5;
				$scope.pageResume.totalElem=data.length;
				$scope.pageResume.computePages();
				initGetStarted($scope,getStarted);
				$scope.currentResume=$scope.resumeHero[0];
				$scope.currentResume.Class="selected";
				$scope.sections = $scope.currentResume.Data;
				$scope.getStarted.initInput($scope.currentResume.ResumeInfo);
	       });
		}
		if($scope.resumeHero[0]){
			initGetStarted($scope,getStarted, $scope.user);
			$scope.currentResume = $scope.resumeHero[0];
			$scope.currentResume.Class="selected";
			$scope.sections = $scope.currentResume.Data;
			$scope.getStarted.initInput($scope.currentResume.ResumeInfo, user);
		}
		$scope.exportType="PDF";
		$scope.changeType="PDF";
		$scope.loadInfo();
    }
    $scope.init();
}