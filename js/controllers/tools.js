/*
Tools controller
*/
function ToolCtr($scope, $http,$routeParams,pagination) {
    
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
	       });
        }
    }
    $scope.init=function(){
        var name=$routeParams.toolName;
        $scope.help={};
        $scope.loadHelp(name);
        $scope.occupations=[];
		$scope.resumeHero=[];
        $scope.industries=[];
        if(name=="career-scape"){
            $scope.txt="Career Scape";
            $scope.template="partials/tools/careerScape.html";
            $scope.title={"part1":"Career","part2":"Scape"};
            $scope.logo="icon-careerscape-small";
        }
        else if(name=="locally-grown"){
            $scope.txt="Locally Grown";
            $scope.template="partials/tools/locallyGrown.html";
            $scope.title={"part1":"Locally","part2":"Grown"};
            $scope.logo="icon-localygrown-small";

        }
        else if(name=="jobinality"){
            $scope.txt="Jobinality";
            $scope.template="partials/tools/jobinality.html";
            $scope.title={"part1":"Job","part2":"inality"};
            $scope.logo="icon-jobinality-small";

        }
        else if(name=="resume-pro"){
            $scope.txt="Resume Pro";
            $scope.template="partials/tools/resumePro.html";
            $scope.title={"part1":"Resume","part2":"Pro"};
            $scope.logo="icon-resumePro-small";
        }
        $scope.paths=[{
            "txt":" Career Tools /",
            "color":"grey"
        },
        {
            "txt":" "+$scope.txt,
            "color":"black"
        }];
        $scope.savedIndustry="Choose an Industry";
        checkUserInfo($scope,$http);
        $scope.jobResulstTitle="Job for You:";
		$scope.resumeHeroTitle="My Resumes, ";
        $scope.loadJob();
        $scope.loadIndustries();
        $scope.loadOccupations();
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
        window.canvasPos=canvas.getBoundingClientRect();
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
function ResumeHeroCtr($scope, $http){
    /*
    Constructor
    */
	
	//Select the current Resume
	$scope.selectResume = function(resume){
		$scope.currentResume.Class="";
		$scope.currentResume = resume;
		$scope.currentResume.Class="selected";
		$scope.sections = $scope.currentResume.Data;
		return false;
	}	
	
	//Delete the current selected Resume
	$scope.removeItem = function(){
		var i = $scope.currentResume.Id;
		for(var j = i; j < $scope.resumeHero.length; j++){
			$scope.resumeHero[j].Id = $scope.resumeHero[j].Id - 1;
		}
		$scope.resumeHero.splice(i, 1);
		$scope.currentResume = $scope.resumeHero[i]; //Select automatically the next resume
		$scope.currentResume.Class="selected";
		$scope.sections = $scope.currentResume.Data;
		disparition($('.delete-resume')); //Close pop-up
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
    $scope.previous = function() {
		if($scope.actualPage > 1){
			$scope.actualPage--;
			if($scope.actualPage == '1'){
				$('#previous-button').addClass('inactive');
			}else if($scope.actualPage == '4'){
				$('#next-button').removeClass('inactive');
			}
		}
		return false;
	}
	$scope.next = function() {
		if($scope.actualPage < 5){
			$scope.actualPage++;
			if($scope.actualPage == '5'){
				$('#next-button').addClass('inactive');
			}else if($scope.actualPage == '2'){
				$('#previous-button').removeClass('inactive');
			}
		}
		return false;
	}
	/*
	*/
	$scope.changeType = function(otherElem,thisElem){
		var other = $('#'+otherElem);
		var elem = $('#'+thisElem);
		if(other.hasClass("selected")){
			other.removeClass("selected");
			elem.addClass("selected");
		}
	}
    $scope.init=function(){
		if($scope.resumeHero[0]){
			$scope.currentResume = $scope.resumeHero[0];
			$scope.currentResume.Class="selected";
			$scope.sections = $scope.currentResume.Data;
		}else{
			$scope.resumeHero[0] = null; //a finir
		}
		$scope.totalPages = 5;
		$scope.actualPage = 1;
		$('#previous-button').addClass('inactive');
		apparition($('.get-started-resume'));
    }
    $scope.init();
}