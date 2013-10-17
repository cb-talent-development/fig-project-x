function HomePageCtr($scope, $http) {
    /*
    Function that organise the data of one week to be able to create three columns of any form
    */
    $scope.threeColumns=function(week,firstWeek){
            var date=new Date(week[0].PublicationDate);
            date.setHours(date.getHours()+((6-date.getDay())*24));
            var weeks_res={};
            var columns=[];
            var col0=[];
            var colx1=[],
                colx2=[],
                colx3=[];
            for(var j=0;j<week.length;j++){
                var post=week[j];
                postPretreatment(post);
                if(post.Template!=1){
                    if(post.Posx==0)
                        colx1.push(post);
                    else if(post.Posx==1)
                        colx2.push(post);
                    else
                        colx3.push(post);
                }
                if((post.Template==1 && colx1.length>0) || (j==week.length-1) ){
                    //class only represent the style of the column containing the different element 
                       columns.push({
                            'class':'col-type-2',
                            'data':colx1
                           });
                       columns.push({
                            'class':'col-type-2',
                            'data':colx2
                           }); 
                       columns.push({
                            'class':'col-type-2',
                            'data':colx3
                           });
                       colx1=[];
                       colx2=[];
                       colx3=[];
                }
                if(post.Template=="1"){
                    col0.push(post);
                    columns.push({
                            'class':'col-type-1',
                            'data':col0
                           });
                    col0=[];
                }
            }
            if(firstWeek)
			     weeks_res.visibility="invisible";
            else
			     weeks_res.visibility="visible";
            weeks_res.columns=columns;
            var datum="WEEK OF "+monthNames[date.getMonth()].toUpperCase()+" "+date.getDate()+"<sup class='sup_week'>RD</sup> "+date.getFullYear();
            weeks_res.date=datum;
            return weeks_res;
    };
    /*
    Function that organise the data of one week to be able to create two columns of any form
    */
    $scope.twoColumns=function(week,firstWeek){
        var weeks_res={};
        var columns=[];
        for(var j=0;j<week.length;j++){
            var post=week[j];
            postPretreatment(post);
            var colContent=[];
			if(post.Template!=1){
				// if template 2 or 3 just push in the column
				colContent.push(post);
				columns.push({
					'class':'col-type-3',
					'data':colContent
				});
				colContent = [];
			}
			else{
				//if template 1 push it in a colunm (supposed empty) which directly goes in the column array
				colContent.push(post);
				columns.push({
					'class':'col-type-1',
					'data':colContent
				});
				colContent = [];
			}
        }
        if(firstWeek)
			 weeks_res.visibility="invisible";
        else
             weeks_res.visibility="visible";
        weeks_res.columns=columns;
        return weeks_res;
    }
    /*
    Organise the datas of all the week to be displayed
    */
    $scope.computeElements=function(){
        $scope.weeks=[];
        for(var i=0;i<$scope.week_elements.length;i++){
            var week=$scope.week_elements[i];
            //first: sort the array according to their x and y position
            week.Posts.sort(sortArticles);
            if(i==0)
                first=true;
            else
                first=false;
            if(!$scope.modeTwo)
                $scope.weeks.push($scope.threeColumns(week.Posts,first))
            else
                $scope.weeks.push($scope.twoColumns(week.Posts,first))
        }
    }
    /*
    Add weeks containing posts to the homepage
    */
    $scope.addElements=function(week_elements){
        if(week_elements.length==0){
            $scope.showMoreClass="invisible";
        }
        else{
            for(var i=0;i<week_elements.length;i++){
                var week=week_elements[i];
                $scope.week_elements.push(week);
            }
        }
    }
    /*
    Function caller when more data are requested
    */
    $scope.loadMore=function(){
        //... progress
        $scope.load("data/json/posts.json");
        //...
    }
    /*
    load from url
    */
    $scope.load=function(url){
        $http.get(url).success(function(data) {
        //once the datas have been retrieved, they are reorganized in columns
            //external function (check window width)
            $scope.modeTwo=checkIfModeTwoColumns();
            if(data.Homepage!=undefined && data.Homepage.Weeks!=undefined){
                $scope.addElements(data.Homepage.Weeks);
                $scope.computeElements();
            }
            else
                $scope.showMoreClass="invisible";
	   });	
    }
    /*
    Button action
    */
    $scope.action=function(){
        console.log("-> action <-");
        alert("here drop down Max! (console for line number)");
    }
    /*
    Constructor
    */
    $scope.init=function(){
        //Init at three columns
        $scope.modeTwo=false;
        $scope.inputSearch="";
        //All the weeks
        $scope.week_elements=[];
        $scope.showMoreClass="visible";
        //week to display (two possibilities (2 or 3 columns)
        $scope.weeks=[]; 
        checkUserInfo($scope,$http);
        $scope.paths=[{
            "txt":" Advice & Resources",
            "color":"black"
        }]
        $scope.load('data/json/posts.json');
        $scope.$on('$includeContentLoaded', function(){
            initEffect();
        });
    }
    $scope.init();    
};