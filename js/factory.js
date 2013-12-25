var module = angular.module('factory', []);
module.factory('register',['$http',function($http) {
    function register(scope){
        this.scope=scope;
        this.init();
    }
    register.prototype.init=function(){
        //list to display (if too long, should be loaded on the server)
        this.lists={
            'salaries':["$25,000-$50,000","$50,000-$75,000","$75,000-$100,000","$125,000-$150,000"],
            'companies':["McKinsey","Bain","BCG","Fig"],
            'messageStep':["THE BASICS","JOB PHASE","OCCUPATION","EDUCATION","SKILLS & ABILITIES"],
            'ages':["18-25 Years Old","26-30 Years Old","31-35 Years Old"],
            'institutions':["College","Upper High School","Formation"],
            'states':["IL","NY","NJ"],
            'jobTitles':["Public Relations Specialist","Sales Manager","Mcdonald Manager","Donut Seller"],
            'schools':["Harvard","Princeton","MIT"],
            'degrees':["Master Degree","Bacheloper Degree","Phd"],
            'employements':['Full-Time Employement','Part-Time Employement','Independant'],
            'industries':['IT','Chemistry','Finance','Energy']
        }
        //user info
        
        this.userInfo={
            'job':{
                'name':input(),
                'corrected':"",
                'isCorrected':true,
                'phase':""
            },
            'school':{
                'name':input(),
                'corrected':'',
                'isCorrected':true,
                'institutionType':input("Type of Institution"),
                'degreeType':input("Degree Type")
            },
            'email':input(),
            'firstName':input(),
            'lastName':input(),
            'password':input(),
            'confirmPassword':input(),
            'gender':input(),
            'salary':input("Choose Your Salary"),
            'age':input("Select Age Range"),
            'company':input("Choose Your Company"),
            'address':{
                'street':input(),
                'zipcode':input(),
                'state':input("State"),
                'apt':input(),
                'city':input()
                
            },
            'skills':{
                'selected':[],
                'saved':[],
                'list':config.skillsList,
                'state':{
                    'completed':false
                }
            },
            'technologies':{
                'selected':[],
                'saved':[],
                'list':config.technologiesList,
                'state':{
                    'completed':false
                }
            },
            'goals':{
                "employement":input("Choose Employement Type"),
                "desired":input(),
                "industry":input("Choose Industry"),
                'state':{
                    'completed':false
                }
            }
            
        }
        this.user='none';
        console.log(this);
    }
    /*
    Save function that does everything
    */
    register.prototype.save=function(){
        //HUGE FUNCTION
        //skills
        //TODO: save skills
        //we do that to avoid creating a new object
        this.userInfo.skills.saved.replace(this.userInfo.skills.selected);
        //technologies
        //TODO: save tech
        this.userInfo.technologies.saved.replace(this.userInfo.technologies.selected);
        console.log(this.scope);
        //goals
        //...
        
        //change user Info so that the changing can be seen 
        //...
        //call api server and once the response is get: this.user=response.user + scope.user=user(only ok for the general data)
        //recontruct user
        //...
        if(this.user!='none'){
           disparition($('.dashboard-popup')); 
        }
        else{
            alert("Make sure that you have filled everything...");
        }
    }
    //Input initialisation
    register.prototype.initInput=function(user){
        console.log("INIT INPUT");
        this.user=user;
        if(user && user != 'none'){
        //address
            this.userInfo.address.state.value=this.user.State;
            this.userInfo.address.zipcode.value=this.user.Zipcode;
            //gender
            this.userInfo.gender.value=this.user.Gender;
            //job
            this.userInfo.job.name.value=this.user.JobTitle;
            //salary
            this.userInfo.salary.value=this.user.Income;
            //...
            this.userInfo.firstName.value=this.user.FirstName;
            this.userInfo.lastName.value=this.user.LastName;
            this.userInfo.email.value=this.user.Mail;
            //this.user.Mail="lol@lol.com";
        }
    }
    /*
    Check Job Title
    */
    register.prototype.checkJobTitle=function(){        
        if(this.userInfo.job.name.value.length>=5){
            //...
            this.userInfo.job.name.error=true;
            this.userInfo.job.isCorrected=false;
            this.userInfo.job.corrected=this.lists.jobTitles[0];
        }
    }
    register.prototype.checkSchool=function(){
        if(this.userInfo.school.name.value.length>=5){
            //...
            this.userInfo.school.name.error=true;
            this.userInfo.school.isCorrected=false;
            this.userInfo.school.corrected=this.lists.schools[0];
        }
    }
    /*
    Setter
    */
    register.prototype.setJobPhase=function(phase){
        this.userInfo.job.phase=phase;
        if(this.user){
            this.user.JobPhase=phase;
        }
    }
    register.prototype.setSchool=function(id){
        this.userInfo.school.corrected=this.lists.schools[id];
        this.userInfo.school.name.value=this.userInfo.school.corrected;
        this.userInfo.school.isCorrected=true;
    }
    register.prototype.setJobTitle=function(id){
        this.userInfo.job.corrected=this.lists.jobTitles[id];
        this.userInfo.job.name.value=this.userInfo.job.corrected;
        this.userInfo.job.isCorrected=true;
    }
    /*
    Educations    
    */
    register.prototype.setEducation=function(educations){
        this.educations=educations;
        this.userInfo.school.institutionType.value=this.educations[0].Institution;
        this.userInfo.school.degreeType.value=this.educations[0].Type;
        this.userInfo.school.name.value=this.educations[0].Place;
    }
    /*
    Skills    
    */
    register.prototype.setSkills=function(skills){
        this.userInfo.skills.saved=skills;
        for(var i=0;i<this.userInfo.skills.saved.length;i++){
            this.userInfo.skills.selected.push(this.userInfo.skills.saved[i]);
            for(var j=0;j<this.userInfo.skills.list.length;j++){
                if(this.userInfo.skills.saved[i]["id"]=this.userInfo.skills.list[j]["id"]){
                    this.userInfo.skills.list[j].checked=true;
                    break;
                }
            }
        }
    }
    /*
    Technology
    */
    register.prototype.setTechnologies=function(technologies){
        this.userInfo.technologies.saved=technologies;
        for(var i=0;i<this.userInfo.technologies.saved.length;i++){
            this.userInfo.technologies.selected.push(this.userInfo.technologies.saved[i]);
            for(var j=0;j<this.userInfo.technologies.list.length;j++){
                if(this.userInfo.technologies.saved[i]["id"]==this.userInfo.technologies.list[j]["id"]){
                    this.userInfo.technologies.list[j].checked=true;
                    break;
                }
            }
        }
    }
    register.prototype.addskillTech=function(type,elem){
        if(type=="skill"){
            this.userInfo.skills.saved.push(elem);
            this.userInfo.skills.selected.push(elem);
        }
        else{
            this.userInfo.technologies.saved.push(elem);
            this.userInfo.technologies.selected.push(elem);
        }
    }
    
    //add remove element into selected skills/technologies
    //we need three lists: 1) to show, 2)the saved one 3)the choosen one
    register.prototype.selectRemoveTech=function(id){
        var elem=this.userInfo.technologies.list.getById(id);
        index=this.userInfo.technologies.selected.indexOfObject(elem);
        if(index>-1){
            //already selected
            this.userInfo.technologies.selected.splice(index, 1);
        }
        else{
            this.userInfo.technologies.selected.push(elem);
        }
        (this.userInfo.technologies.selected.length>0)?this.userInfo.technologies.state.completed=true:this.userInfo.technologies.state.completed=false;
    }
    register.prototype.selectRemoveSkills=function(id){
        var elem=this.userInfo.skills.list.getById(id);
        index=this.userInfo.skills.selected.indexOfObject(elem);
        if(index>-1){
            //already selected
            this.userInfo.skills.selected.splice(index, 1);
        }
        else{
            this.userInfo.skills.selected.push(elem);
        }
        (this.userInfo.skills.selected.length>0)?this.userInfo.skills.state.completed=true:this.userInfo.skills.state.completed=false;
    }
    register.prototype.facebookConnect=function(){
        alert("facebook connect !");
    }
    register.prototype.googleConnect=function(){
        alert("google connect !");
    }
    return register;
}]);

module.factory('getStarted',['$http',function($http) {
    function getStarted(scope){
        this.scope=scope;
        this.init();
    }
    getStarted.prototype.init=function(){
        //list to display (if too long, should be loaded on the server)
        this.lists={
            'states':["Australia","Belgium","Dutchland","France","United Kingdoms","USA"],
			'docTypes':["Microsoft Word", "PDF", "PowerPoint"],
			'diplomas':["Primaire", "Secondaire", "Universitaire"],
			'months':["January", "February", "March", "April", "May", "Juny", "July", "August", "September", "November", "December"],
			'years':["2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990", "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", "1981", "1980", "1979", "1978", "1977", "1976", "1975", "1974", "1973", "1972", "1971", "1970"],
			'templates':["Reference", "Traditional", "Functional"]
        }
        //user info
        
        this.userInfo={
			'phone':input(),
			'mobile':input(),
            'job':{
                'title':{
					'name':input(),
					'corrected':"",
					'isCorrected':true,
					'phase':""
				},
                'company':{
					'name':input(),
					'corrected':"",
					'isCorrected':true,
					'phase':""
				},
                'location':input(),
                'startDate':{
					'month':input("Month"),
					'year':input("Year")
				},
                'endDate':{
					'month':input("Month"),
					'year':input("Year")
				},
				'description':input()
            },
            'education':{
                'type':{
					'name':input("Diploma"),
					'corrected':'',
					'isCorrected':true,
					'phase':''
				},
                'design':'',
                'isCorrected':true,
                'institution':input("Institution"),
                'location':input(),
                'dateGraduated':{
					'month':input("Month"),
					'year':input("Year")
				}
            },
            'email':input(),
            'firstName':input(),
            'lastName':input(),
            'address':{
                'street':input(),
                'zipcode':input(),
                'state':input("State"),
                'apt':input(),
                'city':input()
                
            },
            'skills':{
                'selected':[],
                'saved':[],
                'list':config.skillsList,
                'state':{
                    'completed':false
                }
            },
			'award':{
				'title':input(),
				'date':{
					'month':input("Month"),
					'year':input("Year")
				}
			},
			'technicalSkills':input(),
			'volunteer':input()            
        }
        this.user='none';
        console.log(this);
    }
    /*
    Save function that does everything
    */
    getStarted.prototype.save=function(){
        //HUGE FUNCTION
        //skills
        //TODO: save skills
        //we do that to avoid creating a new object
        this.userInfo.skills.saved.replace(this.userInfo.skills.selected);

        console.log(this.scope);

        if(this.user!='none'){
           disparition($('.get-started-resume')); 
        }
        else{
            alert("Make sure that you have filled everything...");
        }
    }
    //Input initialisation
    getStarted.prototype.initInput=function(user){
        console.log("INIT INPUT");
        this.user=user;
        if(user && user != 'none'){
        //address
            this.userInfo.address.state.value=this.user.State;
            this.userInfo.address.zipcode.value=this.user.Zipcode;
            //gender
            this.userInfo.gender.value=this.user.Gender;
            //job
            this.userInfo.job.name.value=this.user.JobTitle;
            //salary
            this.userInfo.salary.value=this.user.Income;
            //...
            this.userInfo.firstName.value=this.user.FirstName;
            this.userInfo.lastName.value=this.user.LastName;
            this.userInfo.email.value=this.user.Mail;
            //this.user.Mail="lol@lol.com";
        }
    }
    return getStarted;
}]);

module.factory('formData',function(){
    function formData($scope){
        this.$scope=$scope;
        if(!window.FormData){
            alert("Your browser does not support FormData, try to update it");
        }
        else{
            this.form=new FormData();
        }
    }
    formData.prototype.setData=function(datas){
        for(data in datas){
            if(typeof datas[data]==='object'){
                console.log(datas[data]);
                if(datas[data].length !=undefined){
                    console.log("array");
                    if(datas[data].length>0){
                        for(var i=0;i<datas[data].length;i++){
                            var elem=datas[data][i];
                            for(key in elem){
                                this.form.append(data+"["+i+"]["+key+"]",elem[key]);
                            }
                        }
                    }
                }
                else{
                    console.log("json");
                   for(key in datas[data]){
                        this.form.append(data+"["+key+"]",datas[data][key]);
                    } 
                }
            }
            else{
                this.form.append(data,datas[data]);
            }
        }
    }
    formData.prototype.setFile=function(files){
        //var files=fileInput[0].files;
        if(files.length!=0){
            this.form.append('file',files[0]);
        }    
    }
    formData.prototype.send=function(url,callback,progressFunction){
        var xhr = new XMLHttpRequest();
        xhr.open('POST',url); 
        progress={};
        var self=this;
        xhr.onload = function() {
                if (callback && typeof(callback) === "function") {  
                    self.$scope.$apply(function(){
                        console.log(xhr.response);
                        callback.call(this,JSON.parse(xhr.response));
                    });
                }
        };
        xhr.upload.onprogress = function(e) {
                progress.value = e.loaded;
                progress.max = e.total;
                console.log(progress);
                if (progressFunction && typeof(progressFunction) === "function") {
                    self.$scope.$apply(function(){
                        progressFunction.call(this,progress);
                    });
                }
        };
        xhr.send(this.form);

    }
    return  formData;
});