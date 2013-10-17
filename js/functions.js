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
Allow responsivity
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
        homeScope.$apply(function(){
            homeScope.modeTwo=true;
            homeScope.computeElements();
        });
    }
    //if mode three column has to be called but has not already been called
    else if(!checkModeTwoColumns && modeTwoColumns){
        modeTwoColumns=false;
        var homeScope=angular.element('#home').scope();
        homeScope.$apply(function(){
            homeScope.modeTwo=false;
            homeScope.computeElements();
        });
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
function getZoomPicture(media,template,mode){
    if(template==1){
        return (Math.max());
    }
    else if(template==2){
        return (Math.max());
    }
    else{
        return (Math.max());
    }
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
        $http.get("data/json/user.json").success(function(data){
            if(data){
                window.user=data;
            }else{
                window.user="none";
            }
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
Post pretreatment
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
Fake placeholder
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
Reply functions 
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
        subMenu.slideDown(config.timeAnim,function () { 
            $(this).parent().removeClass("open") }
        );
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
function scrollVertical(page,container){
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
}
function disparition(elem){
    section=elem.find(".section");
    section.animate({top: '-1000px'},400,function(){
       section.css("display","none");
       elem.fadeOut(200);             
    });
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
function selectEffect(elem){
    var content=elem.html();
    console.log(elem);
    while(!elem.hasClass("select")){
        elem=elem.parent();
    }
    elem.find(".title").html(content);
}
/*
Init doucment 
*/
function init(){
}
/*
Document initialisation
*/
$(document).ready( function () {
	 init();
     initMaxime();
     window.lock=false;
});