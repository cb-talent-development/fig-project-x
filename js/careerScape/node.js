/*
Class Node: represent one node of the career tree
*/
function Node(data,position,type,addInfo){
    this.class="node";
    //parameter determining if the object has to be drawn or not (used for the animation)
    this.draw=false;
    //true when the animation is finished
    this.animeFinish=false;
    //parameter determining if the attached label has to be drawn or not (used for the animation)
    this.drawText=false;
    //true if user is on the node
    this.activated=false;
    //controll the opacity of the node    
    this.opacity=1;
    this.opacityBorder=1;
    //internal info
    this.type=type;
    if(data!=undefined){
        this.radius=(data.radius==undefined)?10:data.radius;
        this.label=(data.label==undefined)?"undefined":data.label;
        this.color=(data.color==undefined)?"blue":data.color;
        this.borderColor=(data.borderColor==undefined)?"black":data.borderColor;
        this.textColor=(data.textColor==undefined)?"black":data.textColor;
        this.borderWidth=(data.borderWidth==undefined)?5:data.borderWidth;

    }
    //position information
    if(position!=undefined){
        this.posx=(position.posx==undefined)?10:position.posx;
        this.posy=(position.posy==undefined)?10:position.posy;
    }
    //for animation
    this.currentPosx=this.posx;
    this.currentPosy=this.posy;
    //information to add new node to the considered one in the career tree
    if(addInfo!=undefined){
        this.distNext=(addInfo.distNext==undefined)?10:addInfo.distNext;
        this.noise=(addInfo.noise==undefined)?false:addInfo.noise;
        this.stepAngle=(addInfo.stepAngle==undefined)?0:addInfo.stepAngle;
        this.currentAngle=(addInfo.currentAngle==undefined)?0:addInfo.currentAngle;
    }
    if(config!=undefined){
         //Opacity of the text when user is on the node
        this.opacityOver=config.opacity_over;
        //special opacity for the tertiary node
        if(this.type=="tertiary"){
            this.textOpacity=config.opacity_text_tertiary;
        }else
            this.textOpacity=1.0;
        
    }
    else{
       this.opacityOver=1.0; 
        this.textOpacity=1.0;

    }
    //font size controll
    if(this.type=="main"){
        this.size=config.font_size_main;
      }
      else if(this.type=="secondary"){
        this.size=config.font_size_secondary;
      }
      else{
        this.size=config.font_size_tertiary;
    }
    //for animation
    this.currentRadius=0;
    //for the text animation
    this.currentTextOpacity=0;

}
/*
Change the position of a node
*/
Node.prototype.move=function(addX,addY){
    this.posx+=addX;
    this.posy+=addY;
    this.currentPosx+=addX;
    this.currentPosy+=addY;
}
/*
Get the displacement provocked by the zoom
*/
Node.prototype.getDeltaZoom=function(scale){
    var deltaX=this.posx*scale-this.posx;
    var deltaY=this.posy*scale-this.posy;
    return {
        'x':deltaX,
        'y':deltaY
    };    
}
/*
Compute the new internal parameters
*/
Node.prototype.computeDimensions=function(scale,deltaX,deltaY){
    //scaling position
    this.posx=this.posx*scale-deltaX;
    this.posy=this.posy*scale-deltaY;
    this.currentPosx=this.currentPosx*scale-deltaX;
    this.currentPosy=this.currentPosy*scale-deltaY;
    //scaling size
    this.currentRadius*=scale;
    this.radius*=scale;
    this.borderWidth*=scale;
}

