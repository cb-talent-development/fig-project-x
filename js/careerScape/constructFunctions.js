/*
Transform text in one or two parts
*/
function textTransform(text){
    var length=text.length;
    if(length<config.max_character_line)
        return [text];
    else{
        //cut in two
        var dist=Math.ceil(length/2);
        var content=text.split(" ");
        var part1="";
        var part2="";
        for(var i=0;i<content.length;i++){
            var part=content[i];
            if((part1.length+part.length)<dist){
                part1+=part+" ";
            }
            else{
                part2+=part+" ";
            }
        }
        return [part1,part2];
    }
}
/*
Draw current canvas statically
*/
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    //first add edges
    for(var i=0;i<careerTree.edges.length;i++){
        var edge=careerTree.edges[i];
        if(edge.draw)
            canvasDessinator.addEdge(edge);
    }
    //then add circles
    for(var i=0;i<careerTree.nodes.length;i++){
        var node=careerTree.nodes[i];
        if(node.draw)
            canvasDessinator.addCircle(node);
    }
    //then add text (to avoid circle over text)
    for(var i=0;i<careerTree.nodes.length;i++){
        var node=careerTree.nodes[i];
        if(node.drawText)
            canvasDessinator.addText(node);
    }
    for(var i=0;i<careerTree.rectangles.length;i++){
        var rec=careerTree.rectangles[i];
        if(rec.draw)
            canvasDessinator.addRectangle(rec);
    }
}
function drawRefresh(condition,param){
    if (condition && typeof(condition) === "function") {  
            if(!condition.call(this,param)){
                draw();
            }
    }
}
/*
Control the drawing during the animation
*/
function drawAnimation(){
    var numToDraw=0;
    for(var i=0;i<careerTree.nodes.length;i++){
        var node=careerTree.nodes[i];
        if(node.animeFinish==false){
            numToDraw++;
            break;
        }
    }
    if(numToDraw==0){
        canvas.style.cursor="move";
        window.animationFinish=true;
        clearInterval(window.intervalAnimation);
        return true;
    }
    return false
}
/*
Configuration for the animation
*/
function getConfigAnim(object,type){
    if(type=="edge"){
        return {
                "elem":object,
                "time": window.fractionAnim*config.time_anim,
                "attribute":{"attach":true},
                "bezier":config.bezier
            };
    }
    else if(type=="node"){
        return {
            "elem":object.node2,
            "time": window.fractionAnim*config.time_anim,
            "attribute":{"type":"radius"},
            "bezier":config.bezier
        }
    }
}
/**
Animation functions:
**/
/*
Launch the animation for the tertiary nodes
*/
function animatedTertiary(previousNode){
    var edgesSecondary=[];
    var toDraw=[];
    for(var i=0;i<careerTree.edges.length;i++){
        var edge=careerTree.edges[i];
        if(edge.node1==previousNode){
            edgesSecondary.push(edge);
            toDraw.push(toDraw.length);
        }
    }
    for(var i=0;i<toDraw.length;i++){ 
        //random effect
        var time=Math.floor(Math.random()*(window.fractionAnim*config.time_random));
        setTimeout(function(){
            var index=Math.floor(Math.random()*toDraw.length);
            var toAnime=toDraw[index];
            toDraw.splice(index,1);;
            var edge=edgesSecondary[toAnime];    
            if(edge.draw==false){
                var animate=new Animate(canvasDessinator,getConfigAnim(edge,"edge"))
                var animateCircle=new Animate(canvasDessinator,getConfigAnim(edge,"node"))
                animate.run();
                animateCircle.run();
            }
        },time);
    }
}
/*
Launch the animation for the secondary nodes
*/
function animatedSecondary(){
    var edgesMain=[];
    var toDraw=[];
    for(var i=0;i<careerTree.edges.length;i++){
        var edge=careerTree.edges[i];
        if(edge.node1.type=="main"){
            edgesMain.push(edge);
            toDraw.push(toDraw.length);
        }
    }
    for(var i=0;i<toDraw.length;i++){  
            //random effect
            var time=Math.floor(Math.random()*(window.fractionAnim*config.time_random));
            setTimeout(function(){
                var index=Math.floor(Math.random()*toDraw.length);
                var toAnime=toDraw[index];
                toDraw.splice(index,1);
                var edge=edgesMain[toAnime];                       
                if(edge.draw==false){        
                    var animateEdge=new Animate(canvasDessinator,getConfigAnim(edge,"edge"));
                    var animateRadius=new Animate(canvasDessinator,getConfigAnim(edge,"node"))
                    animateEdge.run();
                    animateRadius.run(animatedTertiary,edge.node2,true);
                }
            },time);
        }
}
/*
Lauch the animation for the main node
*/
function animationMain(){
    //here we launch the animation for the main node
    for(var i=0;i<careerTree.nodes.length;i++){
        var node=careerTree.nodes[i];
        if(node.type=="main"){
            var animate=new Animate(canvasDessinator,
                                {
                                    "elem":node,
                                    "time": window.fractionAnim*config.time_anim,
                                    "attribute":{
                                        "type":"radius",
                                    },
                                    "bezier":config.bezier
                                });
            animate.run(animatedSecondary,node,true);
            break;
        }
        
    }
    //here we launch a thread that will assynchronicly redraw the canvas
    window.intervalAnimation=setInterval(function(){drawRefresh(drawAnimation)},config.draw_refresh);
    
}
/*
Function that control the position of the canvas for the pan effect
*/
function controllPosition(dx,dy){
        //movement of the tree :
    
        //movement to the right
        if(cumulatedPosition.x<=allowableMovement.l && dx>0){
                dx=0;
        }
        //movement to the left
        else if(cumulatedPosition.x>=allowableMovement.r && dx<0){
                dx=0;
        }
        //movement to the bottom
        if(cumulatedPosition.y<=allowableMovement.t && dy>0){
                dy=0;
        }
        //movement to the top
        else if(cumulatedPosition.y>=allowableMovement.b && dy<0){
                dy=0;
        }
        return {'dx':dx,'dy':dy}
}
/*
Return position of the finger/mouse
*/
function getPosition(e){
    var x,y;
     if(window.isTouch){
        x=e.changedTouches[0].pageX;
        y=e.changedTouches[0].pageY;
     }
     else{
        x=e.pageX;
        y=e.pageY;
     }
     return {"x":x,"y":y};
}
/*
Multitouch detection
*/
function multitouchDetection(e){
    if(window.isTouch){
        return e.touches.length;
    }
    return 1;
}
/*
Event called to activate the pan effect
*/
function mouseDown(e){
    e.preventDefault();
    var numFingers=multitouchDetection(e);
    if(window.animationFinish && window.animationZoomFinish && numFingers<=1){
       var d = new Date();
       window.timeDown = d.getTime();
       mouseIsDown=true;
       position=getPosition(e)
       startPositionDown=getPosition(e);
    }
}
/*
Event called when mouse mouve -> handle hover and pan effect
*/
function mouseMove(e){
    //used for touch
    var numFingers=multitouchDetection(e);
    if(window.animationFinish && window.animationZoomFinish && numFingers<=1){
        var newPos=getPosition(e);
        if(mouseIsDown){
            e.preventDefault();
            //block click when clicking on object then drag and drop does not make sense for touch
            if(!window.isTouch)
                blockClick=true;
            var dx=newPos.x-position.x;
            var dy=newPos.y-position.y;
            position=getPosition(e);
            positionControll=controllPosition(dx,dy);
            //if we are not outside the limits, we redraw
            if(positionControll.dx!=0 || positionControll.dy!=0){
                
                cumulatedPosition.x-=positionControll.dx;
                cumulatedPosition.y-=positionControll.dy;
                
                for(var i=0;i<careerTree.nodes.length;i++){
                    careerTree.nodes[i].move(positionControll.dx,positionControll.dy);
                }
                draw();
            }
        }
        else if(!window.isTouch){
            blockClick=false;
            var posX=newPos.x-canvasPos.left;
            var posY=newPos.y-canvasPos.top;
            node=careerTree.checkIfNodeActivated(posX,posY);
            if(node!=false){
                //enter node
                if(node.activated==true){
                    canvas.style.cursor="pointer";
                    nodeOn=node;
                }
                //leave node
                if(node.activated==false){
                     canvas.style.cursor="move";
                     nodeOn=undefined;
                }
                draw();
            }
        }
    }
}
/*
Reinitialize mouse effect
*/
function mouseUp(e){
    var numFingers=multitouchDetection(e);
    if(window.animationFinish && window.animationZoomFinish && numFingers<=1){
        if(mouseIsDown){
            e.preventDefault();
            mouseIsDown=false;
            var d = new Date();
            window.timeUp= d.getTime();
            touchLogic(e);
        } 
    }
}
/*
Touch/click logic
*/
function touchLogic(e){
     var pos=getPosition(e);
     var duration = window.timeUp - window.timeDown;
     var dx=pos.x-startPositionDown.x;
     var dy=pos.y-startPositionDown.y;
     var distance=((dy*dy)+(dx*dx));
     if (duration <= 100 && distance <= 100) {
        // Person tapped their finger (do click/tap stuff here)
        clickEvent(e);
     }
     if (duration > 100 && distance <= 100) {
        // Person pressed their finger (not a quick tap)
        clickEvent(e);
     }
     if (duration <= 100 && distance > 100){/*Person flicked their finger*/}
     if (duration > 100 && distance > 100){/*Person dragged their finger*/}
}
/*
Reinitialize the entire career tree if a node is clicked
*/
function clickEvent(e){
    if(blockClick==false){
       if(!nodeOn){
            var pos=getPosition(e);
            nodeOn=careerTree.checkIfNode(pos.x-canvasPos.left ,pos.y-canvasPos.top); 
       }
       if(nodeOn){
           loadData("data/careerscape.json");
           animationFinish=false;
            //disabled zoom until reconstruction
            //launch animation
            var rectangle={
            "width":canvas.width,
            "height":canvas.height,
            "posx":0,
            "posy":0,
            "color":"white"}
            careerTree.addRec(rectangle);
            var timeFraction=config.fraction_translation;
            var animationRec=new Animate(canvasDessinator,
                                {
                                    "elem":rectangle,
                                    "time":(timeFraction*config.time_anim-config.delay_fade_in),
                                    "attribute":{
                                        "type":"fade",
                                        "mode":"in"
                                    },
                                    "bezier":config.bezierCareerMove
                                });
            animationRec.run();
            var animation=new Animate(canvasDessinator,
                                {
                                    "elem":careerTree,
                                    "time":timeFraction*config.time_anim,
                                    "attribute":{
                                        "type":"move",
                                        "node":nodeOn
                                    },
                                    "bezier":config.linear
                                });
           animation.run(function(){
                animationFinish=true;
           });
           var intervalReload=setInterval(function(){drawRefresh(function(inter){
            if(window.animationFinish){
                clearInterval(inter);
                window.fractionAnim=config.fraction_refresh;
                checkLoaded();
                return true;
            }
            return false;
           },intervalReload)},config.draw_refresh);
        }
    }
}
/**
Color function
**/
/*
Return 0 for small, 1 for medium and 2 for big depending on the fraction value
*/
function returnIndex(fraction){
    if(Math.abs(fraction)<=(1/3))
        return 0;
    else if(Math.abs(fraction)<=(2/3))
        return 1;
    else
        return 2;
}
/*
Return the size index of the node depending on the value observed (salary or stability)
*/
function getIndex(value){   
    if(value>0){
        if(generalType=="salary"){
            var rap=value/extremaInfo.max_salary;
        }
        else if(generalType=="stability"){
            var rap=value/extremaInfo.max_stability;
        }
    }
    else{
        if(generalType=="salary"){
            var rap=value/extremaInfo.min_salary;
        }
        else if(generalType=="stability"){
            var rap=value/extremaInfo.min_stability;
        }
    }
    return returnIndex(rap);
}
/*
Create data for node
*/
function createDataNode(node,index,color){
    return {
        'radius':config.size[index],
        'label':node.title,
        'color':color.fill[index],
        'borderColor':color.border[index],
        'textColor':color.text[index],
        'borderWidth':config.border_width
    }
}
/*
Construct the career tree 
*/
function constructTree(){
    window.careerTree=new CareerTree(canvas.width,canvas.height);
    var value=(window.generalType=="salary")?careers.salary_growth:careers.stability_growth;
    var index=getIndex(value);
    var color=(value>0)?config.color.growth:config.color.decline;
    var mainNode=careerTree.addMainNode(createDataNode(careers,index,color));
    //controll the number of secondary nodes (exactly 5 needed)
    if(careers.nodes.length!=5){
        alert("Error: a wrong number of secondary nodes is present (exactly 5 needed)");
        console.log({"main":mainNode,"nodes":careers.nodes});
        return;
    }
    for(var i=0;i<careers.nodes.length;i++){
        var scndNode=careers.nodes[i];
        var value=(window.generalType=="salary")?scndNode.salary_growth:scndNode.stability_growth;
        var index=getIndex(value);
        var color=(value>0)?config.color.growth:config.color.decline;
        var scndNodeTree=careerTree.addSecondaryNode(mainNode,createDataNode(scndNode,index,color));
        careerTree.addEdge(mainNode,scndNodeTree,"normal");
        //controll the number of secondary nodes (exactly 5 needed)
        if(scndNode.nodes.length!=3){
            alert("Error: a wrong number of tertiary nodes for a secondary node is present(exactly 3 needed)");
            console.log({"Secondary_node":scndNodeTree,"nodes":scndNode.nodes});
            return;
        }
        for(var j=0;j<scndNode.nodes.length;j++){
            var terNode=scndNode.nodes[j];
            var value=(window.generalType=="salary")?terNode.salary_growth:terNode.stability_growth;
            var index=getIndex(value);
            var color=(value>0)?config.color.growth:config.color.decline;
            var terNodeTree=careerTree.addTertiaryNode(scndNodeTree,createDataNode(terNode,index,color));
            careerTree.addEdge(scndNodeTree,terNodeTree,"doted");

        }
        
    }
    //we we compute smalest and greatest x,y position;
    window.dim=careerTree.getDimensions();
    var x=(dim.width-canvas.width)/2;
    var y=(dim.height-canvas.height)/2
    window.allowableMovement={
        "l":-x,
        "r":x,
        "t":-y,
        "b":y
    }
    //compute init canvas position
    careerTree.zoomStep=window.scale;
    careerTree.changeZoom();
    careerTree.changeZoomText();
    computeLimitPan();
    //here the position of the initial balls have been computed now we have to draw them
    animationMain();
    canvas.style.cursor="wait";
};
/*
Initialization function
*/
function initData(){
    /*window.data=undefined;
    window.careersInfo=data;*/
    window.extremaInfo={
        "min_salary":careersInfo.min_salary,
        "max_salary":careersInfo.max_salary,
        "min_stability":careersInfo.min_stability,
        "max_stability":careersInfo.max_stability
    }
    window.careers=careersInfo.main_node;
    window.cumulatedPosition={"x":0,"y":0}
    //global variables used by mouse events
    window.position=undefined;
    window.nodeOn=undefined;
}
/*
*/
function initGlobal(){
    window.animationFinish=false;
    window.animationZoomFinish=true;
    window.blockClick=false;
    window.mouseIsDown=false;
}
/*
Load the json information from a file or url and launch the animation
*/
function loadData(url){
    window.loaded=false;
    $.get(url,function(data){
        $("#json").val(JSON.stringify(data,undefined, 4));
        window.careersInfo=data;
        window.loaded=true;
    }).fail(function() { alert("error, the file "+url+" does not exits"); });

}
/*
Check if data have arrived
*/
function checkLoaded(){
    initGlobal();
    var inter=setInterval(function(){
        if(window.loaded){
            clearInterval(inter);
            initData();
            constructTree();
        }
    },50);
}
/*
Load the json from the textArea and launch the animation
*/
function loadDataFromTextArea(elem){
    var content=JSON.parse(elem.val());
    window.careersInfo=content;
    initData();
    constructTree();
}
/*
Change the type of information to display (salary/stability)
*/
function changeType(value,elem){
    if(window.animationFinish && window.animationZoomFinish){
        window.fractionAnim=1;
        window.generalType=value;
        var buttons=$("."+elem[0].classList[0]);
        for(var i=0;i<buttons.length;i++){
            var button=$(buttons[i]);
            if(button.hasClass("selected"))
                button.removeClass("selected");
        }
        elem.addClass("selected");
        checkLoaded();
    }
}
/*
Init canvas
*/
function initCanvas(){
    resizeCanvas()
    window.scale=1;
    window.currentScale=1;
    //put color in legend
    var legend=$(".legend");
    var growth=legend.find(".growth");
    var decline=legend.find(".decline");
    var bigG=growth.find(".big");
    var mediumG=growth.find(".medium")
    var smallG=growth.find(".small");
    bigG.css("background",config.color.growth.fill[2]);
    bigG.css("borderColor",config.color.growth.border[2]);
    mediumG.css("background",config.color.growth.fill[1]);
    mediumG.css("borderColor",config.color.growth.border[1]);
    smallG.css("background",config.color.growth.fill[0]);
    smallG.css("borderColor",config.color.growth.border[0]);
    var bigD=decline.find(".big");
    var mediumD=decline.find(".medium")
    var smallD=decline.find(".small");
    bigD.css("background",config.color.decline.fill[2]);
    bigD.css("borderColor",config.color.decline.border[2]);
    mediumD.css("background",config.color.decline.fill[1]);
    mediumD.css("borderColor",config.color.decline.border[1]);
    smallD.css("background",config.color.decline.fill[0]);
    smallD.css("borderColor",config.color.decline.border[0]);
}
function resizeElement(){
    var container=$(".canvas-container");
    container.css("width",canvas.width);
    //var selector=$(".selector");
}
/*
Resoze Canvas
*/
function resizeCanvas(){
    canvas.width=Math.min(window.innerWidth,config.width) ;
    canvas.height=config.height;
    resizeElement();
    if(window.careerTree!=undefined){
        draw();
        var mainNode=careerTree.getMainNode();
        var deltay=mainNode.posy-canvas.height/2;
        var deltax=mainNode.posx-canvas.width/2;
        window.careerTree.moveTree(-deltax,-deltay);
        computeLimitPan();
        
    }
}
/**
Zoom function
**/
/*
Compute the movement allowed in the 4 directions for the pan
*/
function computeLimitPan(){
    window.dim=careerTree.getDimensions();
    cumulatedPosition.x=0;
    cumulatedPosition.y=0;
    var l=-(dim.width-canvas.width)/2;
    var r=(dim.width-canvas.width)/2;
    var t=-(dim.height-canvas.height)/2;
    var b=(dim.height-canvas.height)/2;
    window.allowableMovement={
        'l':l,
        'r':r,
        't':t,
        'b':b
    }
}
/*
Control career redrawing
*/
function drawCareer(param){
    if(param.zoomFinish && param.moveFinish && param.textFinish){
        clearInterval(param.intervalCareer);
        window.animationZoomFinish=true;
        computeLimitPan();
        return true;
    }
    window.animationZoomFinish=false;
    return false;
}
/*
Animation for the zoom
*/
function animationCareer(factor,mode){
    window.animationZoomFinish=false;
    var param={
        "zoomFinish":false,
        "moveFinish":false,
        "textFinish":false
    }
    //animate the canvas
    var animation=new Animate(canvasDessinator,
                                {
                                    "elem":careerTree,
                                    "time":config.time_anim,
                                    "attribute":{
                                        "type":"move",
                                        "node":careerTree.getMainNode()
                                    },
                                    "bezier":config.bezierCareerMove
                                });
    animation.run(function(param){
        param.moveFinish=true;
    },param);
    //animatate the zoom
    var animationZoom=new Animate(canvasDessinator,
                                {
                                    "elem":careerTree,
                                    "attribute":{
                                        "type":"zoom",
                                        "mode":mode
                                    },
                                });
    animationZoom.run(function(param){
        param.zoomFinish=true;
    },param);
    //make a fadeIn effect with the new text size
    for(var i=0;i<careerTree.nodes.length;i++){
      var node=careerTree.nodes[i];
      node.size*=factor;
      var animation=new Animate(canvasDessinator,
                                {
                                    "time":config.time_anim,
                                    "elem":node,
                                    "attribute":{
                                        "type":"text"
                                    },
                                    "bezier":config.bezierCareerMove
                                    
                                });
        animation.run(function(param){
            param.textFinish=true;
        },param);  
    }
    param.intervalCareer=setInterval(function(){drawRefresh(drawCareer,param)},config.draw_refresh)
}
/*
Increase zoom and move canvas if needed
*/
function zoomPlus(){
    if(window.scale<=1.3 && window.animationFinish){
        careerTree.zoomStep=config.zoom_step;
        var factor=config.zoom;
        window.scale*=factor;
        animationCareer(factor,"plus");
        if(window.scale>1.3){
            var zoomPlus=$("#zoom_plus");
            zoomPlus.addClass("selected"); 
        }
        var zoomMinus=$("#zoom_minus");
        if(zoomMinus.hasClass("selected")){
            zoomMinus.removeClass("selected");
        }
    }
}
/*
Decrease zoom and move canvas if needed
*/
function zoomMinus(){
    if(window.scale>=0.6 && window.animationFinish){
        careerTree.zoomStep=(1/config.zoom_step);
        var factor=1/config.zoom;
        window.scale*=factor;
        animationCareer(factor,"minus");
        if(window.scale<0.6){
           var zoomMinus=$("#zoom_minus");
           zoomMinus.addClass("selected"); 
        }
        var zoomPlus=$("#zoom_plus");
        if(zoomPlus.hasClass("selected")){
            zoomPlus.removeClass("selected");
        }
            
    }
}