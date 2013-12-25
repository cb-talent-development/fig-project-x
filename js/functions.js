/*
equivalent to range function in python
*/
function range (low, high, step) {
  var matrix = [];
  var inival, endval, plus;
  var walker = step || 1;
  var chars = false;

  if (!isNaN(low) && !isNaN(high)) {
    inival = low;
    endval = high;
  } else if (isNaN(low) && isNaN(high)) {
    chars = true;
    inival = low.charCodeAt(0);
    endval = high.charCodeAt(0);
  } else {
    inival = (isNaN(low) ? 0 : low);
    endval = (isNaN(high) ? 0 : high);
  }

  plus = ((inival > endval) ? false : true);
  if (plus) {
    while (inival <= endval) {
      matrix.push(((chars) ? String.fromCharCode(inival) : inival));
      inival += walker;
    }
  } else {
    while (inival >= endval) {
      matrix.push(((chars) ? String.fromCharCode(inival) : inival));
      inival -= walker;
    }
  }

  return matrix;
}
Array.prototype.indexOfObject=function(elem,index){
    for(var i=0;i<this.length;i++){
        var current=this[i];
        if(elem[(index)?index:"id"]==current[(index)?index:"id"]){
            return i;
        }
    }
    return -1;
}
Array.prototype.getById=function(value,index){
    for(var i=0;i<this.length;i++){
        var current=this[i];
        if(current[(index)?index:"id"]==value){
            return current;
        }
    }
    return -1;
}
Array.prototype.replace=function(newArray){
    this.splice(0,this.length);
    //array is empty now
    for(var i=0;i<newArray.length;i++){
        this.push(newArray[i]);
    }
}
//Variable for the months
var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

/*
Function to sort the articles according to their position in x,y
position are like this:
  ---x--->
|
y
|
v
*/
function sortArticles(article1, article2){
    if(article1.posy<article2.posy)
        return -1;
    else if(article1.posy>article2.posy)
        return 1;
    else{
        if(article1.posx<article2.posx)
            return -1;
        else if(article1.posx>article2.posx)
            return 1;
        else
            return 0;
    }
}
/*
Allow responsivity for homePage
*/
function prepareWindow(){
    window.onresize=resizeHandling;
}

var modeTwoColumns=false;
function checkIfModeTwoColumns(){
   if(window.innerWidth<=768){
        return true;
   }
   return false;
}
function resizeHandling(){
    //alert("resize");
    var checkModeTwoColumns=checkIfModeTwoColumns();
    //if mode two column has to be called but has not already been called
    if(checkModeTwoColumns && !modeTwoColumns){
        modeTwoColumns=true;
        var homeScope=angular.element('#home').scope();
        if(homeScope){
            homeScope.$apply(function(){
                homeScope.modeTwo=true;
                homeScope.computeElements();
            });
        }
		$('li.movable').hide();
    }
    //if mode three column has to be called but has not already been called
    else if(!checkModeTwoColumns && modeTwoColumns){
        modeTwoColumns=false;
        var homeScope=angular.element('#home').scope();
        if(homeScope){
            homeScope.$apply(function(){
                homeScope.modeTwo=false;
                homeScope.computeElements();
            });
        }
		$('li.movable').show();
    }
}
//function that match the category of an article to a class
function getClassByCategory(article){
    if(article.Category.css == "salarynegotiation")
        return "red-1";
    else if(article.Category.css == "interview")
        return "orange-1";
    else if(article.Category.css == "socialmedia")
        return "green-1";
    else if(article.Category.css == "findthejob")
        return "blue-1";
    else if(article.Category.css == "news&trends")
        return "pink-1";
    else if(article.Category.css == "coverletters")
        return "orange-3";
}
//function that match the category of an article to a class
function getClassById(id){
    if(id == 1)
        return "green-1";
    else if(id == 2)
        return "green-2";
    else if(id == 3)
        return "green-3";
    else if(id == 4)
        return "green-4";
    else if(id == "5")
        return "orange-1";
    else if(id == "6")
        return "orange-2";
    else if(id == "7")
        return "orange-3";
    else if(id == "8")
        return "orange-4";
    else if(id == "9")
        return "orange-5";
    else if(id == "10")
        return "blue-1";
    else if(id == "11")
        return "blue-2";
    else if(id == "12")
        return "blue-3";
    else if(id == "13")
        return "blue-4";
    else if(id == "14")
        return "blue-5";
    else if(id == "15")
        return "blue-6";
    else if(id == "16")
        return "red-1";
    else if(id == "17")
        return "red-2";
    else if(id == "18")
        return "red-3";
    else if(id == "19")
        return "pink-1";
    else if(id == "20")
        return "pink-2";
    else if(id == "21")
        return "pink-3";
    else
        return "red-4";
}
function input(value){
    if(!value)
        value="";
    return {
        'required':false,
        'error':false,
        'value':value,
        'show':false
    };
}
/*
General search function
*/
function search(input){
    var val=input.val();
    console.log("->SEARCH<-");
    alert("Search value: "+val);
}
/*
General function that handle user caching
*/
function checkUserInfo($scope,$http){
    if(window.user==undefined || window.user==null || window.user.Url==undefined){
        //call api me
        $http.get("data/json/user-full.json").success(function(data){
            if(data){
                window.user=data;
            }else{
                window.user="none";
            }
            window.user="none";
            $scope.user=window.user;
        }).error(function(data, status, headers, config) {
            window.user="none";
            $scope.user=window.user;
        });
    }
    else{
        $scope.user=window.user;
    }
}
/*
Post pretreatment of posts
*/
function postPretreatment(post,string){
            if(!string){
                string="";
            }
            post.size="";
            if(post.Template!=1)
                post.size="-little";
            /*star part*/
            post.Category={
                'css':post.Categories[0].Name.replace(' ','').toLowerCase(),
                'Name':post.Categories[0].Name
            }
            post.classColor=getClassByCategory(post);
            if(post.Rating){
                post.stars=[];
                for(var i=0;i<post.Rating;i++){
                    post.stars.push({
                        "class":"icon-star-"+string+post.classColor
                    });
                }
                for(var i=post.stars.length;i<5;i++){
                    post.stars.push({
                        "class":"icon-star-disabled"
                    });
                }
            }
            if(!post.Media || post.Media.Url == ""){
						post.pictured = "not-pictured";
            }
            else						
                post.pictured = "pictured";
            post.url_template = "partials/home/"+post.Type.substring(0,1).toUpperCase()+".html";

}
/*
Fake placeholder (allow custom placeholder)
*/
function fakePlaceholder(elem){
    if(elem.val().length>0){
        var placeholder=elem.parent().find(".placeholder").first();
        if(placeholder.css("display")=="block"){
            placeholder.css("display","none");
        }
    }else{
        var placeholder=elem.parent().find(".placeholder").first();
        if(placeholder.css("display")=="none"){
            placeholder.css("display","block");
        }
    }
}
/*
Reply functions (for comments)
*/
function openReply(elem){
    var parent=elem.parent();
    var closeReply=parent.find('.closeReply').first();
    if(!lock && closeReply.css("display")=="none"){
        lock=true;
        var startX=elem.position().left;
        //fadeIn close
        closeReply.fadeIn(config.timeAnim,function(){});
        var endX=elem.position().left;
        var deltaX=endX-startX;
        elem.css("left","-"+deltaX+"px");
        //movement reply
        elem.animate({
            "left":"+="+deltaX
            },config.timeAnim);
        elem.parent().find('.new-comment').first().slideDown(config.timeAnim,function(){
            lock=false;
        });
    }
}
/*
Close Reply
*/
function closeReply(elem){
    var parent=elem.parent();
    var reply=parent.find(".reply").first();
    if(!lock){
        lock=true;
        var posX=reply.position().left;
        var deltaX=posX-elem.position().left;
        //fadeOut close
        elem.fadeOut(config.timeAnim,function(){});
        //movement reply
        reply.animate({
            "left":"-="+deltaX
            },config.timeAnim,function(){
        });
        elem.parent().find('.new-comment').first().slideUp(config.timeAnim,function(){
            reply.css("left","auto"); 
            lock=false;
        });
    }
}
/*
toggle effect
*/
function simpleToggleEffect(event){
    if(event!=undefined){
        event.stopPropagation();
    }
    // If already open, close it
    var subMenu=$(this).find(".subMenu").first();
    if (!subMenu.is(':visible')) {
        subMenu.slideDown(config.timeAnim,function () { 
            $(this).parent().removeClass("open") }
        );
        return false;
    }
}
function toggleEffect(event){
    if(event!=undefined){
        event.stopPropagation();
    }
    // If already open, close it
    var subMenu=$(this).find(".subMenu").first();
    if (!subMenu.is(':visible')) {
		subMenu.parent().addClass("open")
        subMenu.slideDown(config.timeAnim);
        return false;
    }
    // If closed, close the others and open it
    else {
        subMenu.slideUp(config.timeAnim, function () { 
            $(this).parent().removeClass("open") }
        );
        // Don't follow the link
        return false;
    }
}
function simpleSlideEffect(button,elem){
    if(!button.hasClass("selected")){
        button.addClass("selected");
    }
    else{
        button.removeClass("selected");
    }
    if (!elem.is(':visible')) {
        elem.slideDown(config.timeAnim);
    }
    // If closed, close the others and open it
    else {
        elem.slideUp(config.timeAnim);
    }
}
function slideEffect(button,elem,height,textOpen,textClose){
    if(!button.hasClass("selected")){
        button.addClass("selected");
    }
    else{
        button.removeClass("selected");
    }
    //slide down
    if (!elem.is(':visible')) {
        elem.css('display','block');
        elem.animate({'opacity':'+=1.0','height':height+'px'},config.timeAnim);
        if(textOpen)
            button.find("span").text(textOpen);
       // elem.slideDown(config.timeAnim);
    }
    // If closed, close the others and open it
    else {
        elem.animate({'opacity':'-=1.5','height':'0px'},config.timeAnim,function(){
            elem.css('display','none');
        });
        if(textClose)
            button.find("span").text(textClose);
    }
}
/*
Cancel effects
*/
function cancelToggle(){
    var subMenu=$(".subMenu:visible");
    subMenu.slideUp(config.timeAnim, function () { 
        $(this).parent().removeClass("open") }
    );
    return false;
}
function cancelEffects(){
    cancelToggle();
}
var lock=false;
function unlock(){
    lock=false;
}
/*
Scroll Horizontal + activate ball indicating the step
*/
function scrollHorizontal(page,container){
    if(!lock){
        lock=true;
        var pages=container.find(".pages");
        var elem=container.find(".scrollable-content");
        var scroll=(page-1)*elem.width();
        elem.animate({'scrollLeft':scroll},1.5*config.timeAnim,function(){
            lock=false;
            if(pages){
                var balls=pages.children();
                for(var i=0;i<balls.length;i++){
                    var ball=$(balls[i]);
                    if(i+1==page)
                        ball.addClass("activated");
                    else if(ball.hasClass("activated")){
                            ball.removeClass("activated");
                    }
                }
            }
        });
    }
}
/*
Make an ELement appears from the top
*/
function apparition(elem){
    elem.css("display","block");
    section=elem.find(".section");
    section.css('top','-1000px')
    section.css("display","block");
    section.animate({top: '0px'},400);
    scrollTo($(".dialog"))
}
function disparition(elem){
    section=elem.find(".section");
    section.animate({top: '-1000px'},400,function(){
       section.css("display","none");
       elem.fadeOut(200);             
    });
    $("html, body").css('overflow','scroll');

}
/*
Functions move cursor
*/
/*
Vertical
*/
function moveCursor(elem,cursor,first){
    if(!lock){
        if(!elem.hasClass("selected") || first){
            lock=true;
            $(elem.parent()).find(".selected").removeClass("selected");
            elem.addClass("selected");
            var dist=elem.position().top+(elem.height()/2)-cursor.position().top-cursor.height()/2;
            cursor.animate({'top':"+="+dist},config.time_anim,unlock)
        }
     }
}
/*
Horizontal
*/
function moveCursorHorizontal(elem,cursor,fast){
    if(!lock){
        if(!elem.hasClass("selected") || fast){
            lock=true;
            $(elem.parent()).find(".selected").removeClass("selected");
            elem.addClass("selected");
            var dist=elem.offset().left+(elem.width()/2)-cursor.offset().left-cursor.width()/2;
            if(fast){
                var pos=cursor.position().left+dist+"px";
                cursor.css('left',pos);
                unlock();
            }else{
                cursor.animate({'left':"+="+dist},config.time_anim,unlock)
            }
        }
     }
}
/*
Set cursor at the right position
*/
function checkCursorPosition(parent,cursor,orientation,boolean){
    var jobPhases=$(parent+" .phase");
    if(jobPhases){
        for(var i=0;i<jobPhases.length;i++){
            if($(jobPhases[i]).hasClass("selected")){
                if(orientation=="vertical"){
                    moveCursor($(jobPhases[i]),$(cursor),boolean);
                }
                else{
                    moveCursorHorizontal($(jobPhases[i]),$(cursor),boolean);
                }
            }
        }
    }
}
/*
Move popup
*/
function movePopup(container,step,fast){
    if(!lock){
            lock=true;
            var elem=container.find(".scrollable-content");
            var scroll=(step-1)*elem.width();
            //fast allow to go directly to the right position without animation
            if(fast){
                elem.scrollLeft(scroll);
                unlock();
            }
            else{
                elem.animate({'scrollLeft':scroll},1.5*config.timeAnim,unlock);
            }
     }
}
/*
Init all the effects
*/
function initEffect(){
    var htmlBody=$("html, body");
    var toggleMenu=$(".toggleMenu");
    var toggleMenuSimple=$(".toggleMenuSimple");
    htmlBody.unbind('click');
    toggleMenu.unbind('click');
    toggleMenuSimple.unbind('click');
    htmlBody.click(cancelEffects);
    toggleMenu.click(toggleEffect);  
    toggleMenuSimple.click(simpleToggleEffect); 
    
    //Initialization maxime
    initMaxime()

}
/*
Preview Picture
*/
//preview
function createPreview(file,preview){
        var reader = new FileReader();
        reader.onload = function() {
            preview.css('background-image','url('+this.result+')');             
        };
         
        reader.readAsDataURL(file);
}
var allowedTypes = ['png', 'jpg', 'jpeg', 'gif'];
function showPreview(files,preview){
    hasChanged=true;
    if(window.File && window.FileList && window.FileReader){
        console.log(files);
        if(files!=undefined){
            for(var i=0;i<files.length;i++){
                var file=files[i];
                
                var imgType = file.name.split('.');
                imgType = imgType[imgType.length - 1];
                imgType=imgType.toLowerCase();
                if(allowedTypes.indexOf(imgType) != -1) {
                    createPreview(file,preview);
                }
                else{
                    alert("wrong format");
                }
            }
        }
    }
    else{
        alert("Preview and upload picture not yet supported for this browser, try to update your browser");
    }
}
/*
Facebook POST
*/
function postToFeed(url,description,title,picture) {
        var obj = {
          method: 'feed',
          link: url,
          picture: picture,
          name: title,
          caption: '',
          description: description
        };

        function callback(response) {
			console.log("posted");

        }

        FB.ui(obj, callback);
}
/*
Scroll top + open login
*/
function scrollTo(elem,fast){
    if(fast)
        time=0;
    else
        time=config.timeAnim;
    if(elem){
        $("body,html").animate({  
                scrollTop:elem.offset().top-70 
        },time);  
    }
}
/*
Initialisation
*/
function init($scope,register){
    if(!window.register && !document.register){
        $scope.register=new register($scope);
        window.register=$scope.register;
        document.register=window.register
    }
    else if(window.register){
        $scope.register=window.register;
    }
    else if(document.register){
        $scope.register=document.register;
    }
    //console.log($scope.register);
}
function initGetStarted($scope,getStarted){
    if(!window.getStarted && !document.getStarted){
        $scope.getStarted=new getStarted($scope);
        window.getStarted=$scope.getStarted;
        document.getStarted=window.getStarted
    }
    else if(window.getStarted){
        $scope.getStarted=window.getStarted;
    }
    else if(document.getStarted){
        $scope.getStarted=document.getStarted;
    }
    //console.log($scope.getStarted);
}
