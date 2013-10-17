/*
Class Animate that handle animation
*/
function Animate(canvasDessinator,data,refresh){
    //internal parameters
    this.callback=undefined;
    this.callbackCalled=false;
    this.canvasDessinator=canvasDessinator;
    this.stepInterval=(refresh==undefined)?config.anim_refresh:refresh;
    this.inter=undefined;
    this.currentTime=0;
    this.previousBezierValue=0;
    //
    if(data.bezier!=undefined)
        this.bezier=new KeySpline(data.bezier[0],data.bezier[1],data.bezier[2],data.bezier[3]);
    //data should contains an object of class edge node or career tree, an attribute to move, the time to animate and that's it
    this.time=data.time;
    this.elem=data.elem;
    //attribut: 
    //edge: attach parameter to attach a node to the end of the edge and draw it
    //circle: type (radius or text and in that case draw to true or false)
    //careertree : { type:zoom,move}
    this.attribute=data.attribute;

}
/*
Run the animation with callback (eventually) 
fastCallback is used to call the callback before the end of the animation
*/
Animate.prototype.run=function(callback,param,fastCallback){
    //set the draw parameter to true (element has to be draw now)
    this.param=param;
    this.elem.draw=true;
    this.callback=callback;
    this.fastCallback=fastCallback;
    var t=this;
    if(this.attribute.type !=undefined && this.attribute.type=="fade"){
        this.inter = setInterval(function(){t.fadeEffect(t.attribute.mode)}, this.stepInterval);
    }
    else if(this.elem.class=="node"){
        //compute step opacity
        var step=this.time/this.stepInterval;
        this.elem.stepOpacityText=this.elem.textOpacity/step;
        if(this.attribute.type=="radius"){
            this.inter = setInterval(function(){t.radiusAnimation()}, this.stepInterval);
        }
        else if(this.attribute.type=="text"){
            this.elem.currentTextOpacity=0;
            this.inter = setInterval(function(){t.textAnimation()}, this.stepInterval);
        }
        else{
            console.log("error in parameters given to the animation");
        }
    }
    else if(this.elem.class=="edge"){
        if(this.attribute.attach==true)
            this.elem.node2.draw=true;
        this.inter = setInterval(function(){t.edgeAnimation()}, this.stepInterval);
    }
    else if(this.elem.class=="tree"){
        if(this.attribute.type=="zoom"){
            this.inter = setInterval(function(){t.careerZoomAnimation()}, this.stepInterval);
        }
        else if(this.attribute.type=="move"){
            this.inter = setInterval(function(){t.careerMovementAnimation()}, this.stepInterval);
        }
    }
    else
        console.log(this.elem);
}
Animate.prototype.fadeEffect=function(type){
     if(this.currentTime>=this.time){
        clearInterval(this.inter);
        //call the callback if given
         if (this.callback && typeof(this.callback) === "function") {  
            this.callback.call(this);
        }
        this.elem.animeFinish=true;
    }
    else{ 
        this.currentTime+=this.stepInterval;
        var percent=this.currentTime/this.time;
        percent=this.bezier.get(percent);
        var opacity=0;
        if(type=="in")
            opacity=percent;
        else
            opacity=1-percent;
        this.elem.opacity=opacity;
    }
}
/*
Animation for an edge (length variation)
*/
Animate.prototype.edgeAnimation=function(){
    //animation is finished
    if(this.currentTime>=this.time){
        clearInterval(this.inter);
        //call the callback if given
         if (this.callback && typeof(this.callback) === "function") {  
            this.callback.call(this,this.param);
        }
        this.elem.animeFinish=true;
    }
    else{ 
        this.currentTime+=this.stepInterval;
        var percent=this.currentTime/this.time;
        percent=this.bezier.get(percent);
        var dist=(1-percent)*this.elem.length;
        this.elem.currentDist=dist;
        if(this.attribute.attach==true){
            this.elem.node2.currentPosx=this.elem.posAttach.x; 
            this.elem.node2.currentPosy=this.elem.posAttach.y;   
        }
    }
}
/*
Animation for text (fade in effect)
*/
Animate.prototype.textAnimation=function(){
        //animation is finished
     if(this.currentTime>=this.time){
            clearInterval(this.inter);
            //in case of callback given and if the callback has not been called already
            if(!this.fastCallback){
                if (this.callback && typeof(this.callback) === "function") {  
                    this.callback.call(this,this.param);
                }
            }
            this.elem.animeFinish=true;
    }
    else{
        this.currentTime+=this.stepInterval;
        this.elem.currentTextOpacity+=this.elem.stepOpacityText;
        this.elem.currentTextOpacity=Math.min(1,this.elem.currentTextOpacity);
    }
}
/*
Animation for a node (radiys variation)
*/
Animate.prototype.radiusAnimation=function(){
    //animation is finished
    if(this.currentTime>=this.time){
        clearInterval(this.inter);
        this.elem.currentRadius=this.elem.radius;
        var t=this;
        //add the text to the node
        this.elem.drawText=true;
        this.currentTime=0;
        this.time*=1/2;
        this.elem.stepOpacityText*=2;
        this.inter = setInterval(function(){t.textAnimation()}, this.stepInterval);
    }
    else{
        this.currentTime+=this.stepInterval;
        var percent=this.currentTime/this.time;
        var bezierValue=this.bezier.get(percent);
        //call the callback when the bezier decrease
        if(bezierValue<this.previousBezierValue && this.callbackCalled==false){
            this.callbackCalled=true;
            if(this.fastCallback){
                if(this.callback && typeof(this.callback) === "function") {  
                    this.callback.call(this,this.param);
                }
            }
        }
        this.previousBezierValue=bezierValue;
        var dist=bezierValue*this.elem.radius;
        this.elem.currentRadius=dist;
    }
}
/*
Zoom with animation the entire career tree 
*/
Animate.prototype.careerZoomAnimation=function(){
    if((this.attribute.mode=="plus" && window.currentScale>=window.scale) || (this.attribute.mode=="minus" && window.currentScale<=window.scale)){
        clearInterval(this.inter);
        if (this.callback && typeof(this.callback) === "function") {  
            this.callback.call(this,this.param);
        }
    }
    else{
        window.currentScale*=this.elem.zoomStep;
        this.elem.changeZoom();
    }
}
/*
Make the entire career tree move
*/
Animate.prototype.careerMovementAnimation=function(){
    if(this.currentTime>=this.time){
        clearInterval(this.inter);
        if (this.callback && typeof(this.callback) === "function") {  
            this.callback.call(this,this.param);
        }
        this.elem.animeFinish=true;
    }
    else{
        this.currentTime+=this.stepInterval;
        var percent=this.currentTime/this.time;
        var bezierValue=this.bezier.get(percent);
        var deltay=this.attribute.node.posy-canvas.height/2;
        var deltax=this.attribute.node.posx-canvas.width/2;
        this.elem.moveTree(-bezierValue*deltax,-bezierValue*deltay);
    }
}