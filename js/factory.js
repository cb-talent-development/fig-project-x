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
        
        this.resumeInfo={
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
				'description':input(),
				'state':{
					'completed':false
				}
            },
            'education':{
                'type':{
					'name':input("Diploma"),
					'corrected':'',
					'isCorrected':true,
					'phase':''
				},
				'specialization':input(),
                'institution':input(),
                'location':input(),
                'dateGraduated':{
					'month':input("Month"),
					'year':input("Year")
				},
				'state':{
					'completed':false
				}
            },
			'contactInfo':{
				'name':input(),
				'email':input(),
				'firstName':input(),
				'lastName':input(),
				'address':{
					'street':input(),
					'zipCode':input(),
					'state':input('State'),
					'apt':input(),
					'city':input()
				},
				'phone':input(''),
				'mobile':input(''),
				'state':{
					'completed':false
				}
			},
            'skills':{
                'selected':[],
                'saved':[],
				'list':config.heroSkillsList,
                'state':{
                    'completed':false
                }
            },
			'award':{
				'title':input(),
				'awardDate':{
					'month':input("Month"),
					'year':input("Year")
				},
				'state':{
					'completed':false
				}
			},
			'technologicalSkills':{
				'description':input(),
				'state':{
					'completed':false
				}
			},
			'volunteer':{
				'description':input(),
				'state':{
					'completed':false
				}
			}
        }
        this.resume='none';
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
		
		this.resume.ContactInfo.Name = this.resumeInfo.contactInfo.name.value;
		this.resume.ContactInfo.FirstName=this.resumeInfo.contactInfo.firstName.value;
		this.resume.ContactInfo.LastName=this.resumeInfo.contactInfo.lastName.value;
		this.resume.ContactInfo.Mail=this.resumeInfo.contactInfo.email.value;
		this.resume.ContactInfo.Phone=this.resumeInfo.contactInfo.phone.value;
		this.resume.ContactInfo.Mobile=this.resumeInfo.contactInfo.mobile.value;
		//address
		this.resume.ContactInfo.Address.State=this.resumeInfo.contactInfo.address.state.value;
		this.resume.ContactInfo.Address.Zipcode=this.resumeInfo.contactInfo.address.zipCode.value;
		this.resume.ContactInfo.Address.City=this.resumeInfo.contactInfo.address.city.value;
		this.resume.ContactInfo.Address.Apt=this.resumeInfo.contactInfo.address.apt.value;
		this.resume.ContactInfo.Address.Street=this.resumeInfo.contactInfo.address.street.value;
		this.resume.ContactInfo.State.Completed=this.resumeInfo.contactInfo.state.completed;
		//job
		this.resume.Job.Title=this.resumeInfo.job.title.name.value;
		this.resume.Job.Company=this.resumeInfo.job.company.name.value;
		this.resume.Job.Location=this.resumeInfo.job.location.value;
		this.resume.Job.StartDate.Month=this.resumeInfo.job.startDate.month.value;
		this.resume.Job.StartDate.Year=this.resumeInfo.job.startDate.year.value;
		this.resume.Job.EndDate.Month=this.resumeInfo.job.endDate.month.value;
		this.resume.Job.EndDate.Year=this.resumeInfo.job.endDate.year.value;
		this.resume.Job.Description=this.resumeInfo.job.description.value;
		this.resume.Job.State.Completed=this.resumeInfo.job.state.completed;
		//education
		this.resume.Education.Type.Name=this.resumeInfo.education.type.name.value;
		this.resume.Education.Specialization=this.resumeInfo.education.specialization.value;
		this.resume.Education.Institution=this.resumeInfo.education.institution.value;
		this.resume.Education.Location=this.resumeInfo.education.location.value;
		this.resume.Education.DateGraduated.Month=this.resumeInfo.education.dateGraduated.month.value;
		this.resume.Education.DateGraduated.Year=this.resumeInfo.education.dateGraduated.year.value;
		this.resume.Education.State.Completed=this.resumeInfo.education.state.completed;
		//skills
		this.resume.Skills.State.Completed=this.resumeInfo.skills.state.completed;
        this.resumeInfo.skills.saved.replace(this.resumeInfo.skills.selected);
		this.resume.Skills.Skills=this.resumeInfo.skills.saved;
		//award
		this.resume.Award.Title=this.resumeInfo.award.title.value;
		this.resume.Award.AwardDate.Month=this.resumeInfo.award.awardDate.month.value;
		this.resume.Award.AwardDate.Year=this.resumeInfo.award.awardDate.year.value;
		this.resume.Award.State.Completed=this.resumeInfo.award.state.completed;
		//technological skills
		this.resume.TechnologicalSkills.Description=this.resumeInfo.technologicalSkills.description.value;
		this.resume.TechnologicalSkills.State.Completed=this.resumeInfo.technologicalSkills.state.completed;
		//Volunteer, publication & affiliation
		this.resume.Volunteer.Description=this.resumeInfo.volunteer.description.value;
		this.resume.Volunteer.State.Completed=this.resumeInfo.volunteer.state.completed;

        console.log(this.scope);

        if(this.resume!='none'){
           disparition($('.get-started-resume')); 
        }
        else{
            alert("Make sure that you have filled everything...");
        }
    }
	getStarted.prototype.setSkills=function(list){
		for(var i=0; i<6; i++){
			if(list[i] == 'true'){
				var elem = $('#hero-skills-'+i+'');
				elem.addClass("selected");
			}
		}
	}
    //Input initialisation
    getStarted.prototype.initInput=function(resume){
        console.log("INIT INPUT");
        this.resume=resume;
        if(resume && resume != 'none'){
			this.resumeInfo.contactInfo.name.value=this.resume.ContactInfo.Name;
			this.resumeInfo.contactInfo.firstName.value=this.resume.ContactInfo.FirstName;
            this.resumeInfo.contactInfo.lastName.value=this.resume.ContactInfo.LastName;
            this.resumeInfo.contactInfo.email.value=this.resume.ContactInfo.Mail;
			this.resumeInfo.contactInfo.phone.value=this.resume.ContactInfo.Phone;
			this.resumeInfo.contactInfo.mobile.value=this.resume.ContactInfo.Mobile;
			//address
            this.resumeInfo.contactInfo.address.state.value=this.resume.ContactInfo.Address.State;
            this.resumeInfo.contactInfo.address.zipCode.value=this.resume.ContactInfo.Address.Zipcode;
			this.resumeInfo.contactInfo.address.city.value=this.resume.ContactInfo.Address.City;
			this.resumeInfo.contactInfo.address.apt.value=this.resume.ContactInfo.Address.Apt;
			this.resumeInfo.contactInfo.address.street.value=this.resume.ContactInfo.Address.Street;
			this.resumeInfo.contactInfo.state.completed=this.resume.ContactInfo.State.Completed;
			console.log(this.resume.ContactInfo.State.Completed);
            //job
            this.resumeInfo.job.title.name.value=this.resume.Job.Title;
            this.resumeInfo.job.company.name.value=this.resume.Job.Company;
            this.resumeInfo.job.location.value=this.resume.Job.Location;
            this.resumeInfo.job.startDate.month.value=this.resume.Job.StartDate.Month;
            this.resumeInfo.job.startDate.year.value=this.resume.Job.StartDate.Year;
            this.resumeInfo.job.endDate.month.value=this.resume.Job.EndDate.Month;
            this.resumeInfo.job.endDate.year.value=this.resume.Job.EndDate.Year;
            this.resumeInfo.job.description.value=this.resume.Job.Description;
			this.resumeInfo.job.state.completed=this.resume.Job.State.Completed;
			//education
			this.resumeInfo.education.type.name.value=this.resume.Education.Type.Name;
			this.resumeInfo.education.specialization.value=this.resume.Education.Specialization;
			this.resumeInfo.education.institution.value=this.resume.Education.Institution;
			this.resumeInfo.education.location.value=this.resume.Education.Location;
			this.resumeInfo.education.dateGraduated.month.value=this.resume.Education.DateGraduated.Month;
			this.resumeInfo.education.dateGraduated.year.value=this.resume.Education.DateGraduated.Year;
			this.resumeInfo.education.state.completed=this.resume.Education.State.Completed;
			//skills
			this.resumeInfo.skills.selected=this.resume.Skills.Skills;
			this.resumeInfo.skills.saved=this.resume.Skills.Skills;
			this.resumeInfo.skills.state.completed=this.resume.Skills.State.Completed;
			this.setSkills(this.resumeInfo.skills.selected);
			//award
			this.resumeInfo.award.title.value=this.resume.Award.Title;
			this.resumeInfo.award.awardDate.month.value=this.resume.Award.AwardDate.Month;
			this.resumeInfo.award.awardDate.year.value=this.resume.Award.AwardDate.Year;
			this.resumeInfo.award.state.completed=this.resume.Award.State.Completed;
			//technological skills
			this.resumeInfo.technologicalSkills.description.value=this.resume.TechnologicalSkills.Description;
			this.resumeInfo.technologicalSkills.state.completed=this.resume.TechnologicalSkills.State.Completed;
			//Volunteer, publication & affiliation
			this.resumeInfo.volunteer.description.value=this.resume.Volunteer.Description;
			this.resumeInfo.volunteer.state.completed=this.resume.Volunteer.State.Completed;
        }
    }
	getStarted.prototype.checkContactInfo=function(){
        if(this.resumeInfo.contactInfo.firstName.value==''){this.resumeInfo.contactInfo.state.completed=false;}
		else if(this.resumeInfo.contactInfo.lastName.value==''){this.resumeInfo.contactInfo.state.completed=false;}
		else if(this.resumeInfo.contactInfo.email.value==''){this.resumeInfo.contactInfo.state.completed=false;}
		else if(this.resumeInfo.contactInfo.address.street.value==''){this.resumeInfo.contactInfo.state.completed=false;}
		//Optional input
		//else if(this.resumeInfo.contactInfo.address.apt.value==''){this.resumeInfo.contactInfo.state.completed=false;}
		else if(this.resumeInfo.contactInfo.address.city.value==''){this.resumeInfo.contactInfo.state.completed=false;}
		else if(this.resumeInfo.contactInfo.address.state.value=='State'){this.resumeInfo.contactInfo.state.completed=false;}
		else if(this.resumeInfo.contactInfo.address.zipCode.value==''){this.resumeInfo.contactInfo.state.completed=false;}
		else if(this.resumeInfo.contactInfo.phone.value==''){this.resumeInfo.contactInfo.state.completed=false;}
		else if(this.resumeInfo.contactInfo.mobile.value==''){this.resumeInfo.contactInfo.state.completed=false;}
		else{this.resumeInfo.contactInfo.state.completed=true;}
		this.resumeInfo.contactInfo.name.value = this.resumeInfo.contactInfo.firstName.value + ' ' + this.resumeInfo.contactInfo.lastName.value;
    }
	getStarted.prototype.checkWork=function(){
        if(this.resumeInfo.job.title.name.value==''){this.resumeInfo.job.state.completed=false;}
		else if(this.resumeInfo.job.company.name.value==''){this.resumeInfo.job.state.completed=false;}
		else if(this.resumeInfo.job.location.value==''){this.resumeInfo.job.state.completed=false;}
		else if(this.resumeInfo.job.startDate.month.value=='Month'){this.resumeInfo.job.state.completed=false;}
		else if(this.resumeInfo.job.startDate.year.value=='Year'){this.resumeInfo.job.state.completed=false;}
		else if(this.resumeInfo.job.endDate.month.value=='Month'){this.resumeInfo.job.state.completed=false;}
		else if(this.resumeInfo.job.endDate.year.value=='Year'){this.resumeInfo.job.state.completed=false;}
		else if(this.resumeInfo.job.description.value==''){this.resumeInfo.job.state.completed=false;}
		else{this.resumeInfo.job.state.completed=true;}
    }
	getStarted.prototype.checkEducation=function(){
		if(this.resumeInfo.education.type.name.value=='Diploma'){this.resumeInfo.education.state.completed=false;}
		else if(this.resumeInfo.education.specialization.value==''){this.resumeInfo.education.state.completed=false;}
		else if(this.resumeInfo.education.institution.value==''){this.resumeInfo.education.state.completed=false;}
		else if(this.resumeInfo.education.location.value==''){this.resumeInfo.education.state.completed=false; alert(4);}
		else if(this.resumeInfo.education.dateGraduated.month.value=='Month'){this.resumeInfo.education.state.completed=false;}
		else if(this.resumeInfo.education.dateGraduated.year.value=='Year'){this.resumeInfo.education.state.completed=false;}
		else{this.resumeInfo.education.state.completed=true;}
	}
	getStarted.prototype.checkAward=function(){
		if(this.resumeInfo.award.title.value==''){this.resumeInfo.award.state.completed=false;}
		else if(this.resumeInfo.award.awardDate.month.value=='Month'){this.resumeInfo.award.state.completed=false;}
		else if(this.resumeInfo.award.awardDate.year.value=='Year'){this.resumeInfo.award.state.completed=false;}
		else{this.resumeInfo.award.state.completed=true;}
	}
	getStarted.prototype.checkTechnologicalSkills=function(){
		if(this.resumeInfo.technologicalSkills.description.value==''){this.resumeInfo.technologicalSkills.state.completed=false;}
		else{this.resumeInfo.technologicalSkills.state.completed=true;}
	}
	getStarted.prototype.checkVolunteer=function(){
		if(this.resumeInfo.volunteer.description.value==''){this.resumeInfo.volunteer.state.completed=false;}
		else{this.resumeInfo.volunteer.state.completed=true;}
	}
	getStarted.prototype.changeSkill=function(id){
		var elem = $('#hero-skills-'+id);
		if(elem.hasClass("selected")){
			elem.removeClass("selected");
		}else{
			elem.addClass("selected");
		}
		if(this.resumeInfo.skills.selected[id]){this.resumeInfo.skills.selected[id]=false;}
		else{this.resumeInfo.skills.selected[id]=true;}
		this.resumeInfo.skills.state.completed=true;
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