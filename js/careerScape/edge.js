/*
Class Edge: represent one edge between two node in the career tree
*/
function Edge(node1,node2,type){
    this.class="edge";
    //parameter determining if the object has to be drawn or not (used for the animation)
    this.draw=false
    //true when the animation is finished
    this.animeFinish=false;
    //fraction that adjust the position of the edge and the attached node to avoid overlapping
    this.rappBW=0.2;
    this.rappDist=Math.min(0.85*window.scale,1);
    //internal information
    this.node1=node1;
    this.node2=node2;
    this.type=type;
    this.lineWidth=config.line_width;
    //compute total length of the edge
    var dist=Math.sqrt(((this.node2.posy-this.node1.posy)*(this.node2.posy-this.node1.posy))+((this.node2.posx-this.node1.posx)*(this.node2.posx-this.node1.posx)));
    dist-=(this.node1.radius+this.node1.borderWidth+this.node2.borderWidth);
    this.length=dist;
    //
    this.currentDist=this.length;
    if(this.node2.type=="tertiary")
        this.edgeOpacity=config.opacity_edge_tertiary;
    else
        this.edgeOpacity=1.0;
    //angle part

    //0: top, bottom
    //1 : left to the parent node
    //2 : right to the parent node
    if(this.node2.posx<this.node1.posx)
            this.orientation=1
    else if(this.node2.posx>this.node1.posx)
            this.orientation=2    
    if(this.node2.posx==this.node1.posx){
        this.orientation=1;
        this.rappDist;
        if(this.node2.posy>this.node1.posy){
            this.cos=0;
            this.sin=-1;
        }
        else{
            this.cos=0;
            this.sin=1;
        }
    }
    else{
        var slope=(this.node1.posy-this.node2.posy)/(this.node1.posx-this.node2.posx);
        var angle=Math.atan(slope);
        this.cos=Math.cos(angle)
        this.sin=Math.sin(angle)
    }
    if(this.orientation==1){
        this.sign=1;
    }
     else if(this.orientation==2){
        this.sign=-1;
    }
    //shif the position of the beginning of the edge
    var distx1,disty1; 
    this.computePosition(0);
      
}
/*
Compute the position of the extremities of the edge and the attached node (used for animation)
*/
Edge.prototype.computePosition=function(dist){
    if(this.orientation==1){
        distx1=-(this.node1.currentRadius+this.rappBW*this.node1.borderWidth)*this.cos;
        disty1=-(this.node1.currentRadius+this.rappBW*this.node1.borderWidth)*this.sin;
        distx2=(this.rappDist*dist)*this.cos;
        disty2=(this.rappDist*dist)*this.sin;
    }
    else if(this.orientation==2){
        distx1=(this.node1.currentRadius+this.rappBW*this.node1.borderWidth)*this.cos;
        disty1=(this.node1.currentRadius+this.rappBW*this.node1.borderWidth)*this.sin;
        distx2=-(this.rappDist*dist)*this.cos;
        disty2=-(this.rappDist*dist)*this.sin;
    }
    this.pos1={
        "x":this.node1.posx+distx1,
        "y":this.node1.posy+disty1
    }
    this.pos2={
        "x":this.node2.posx+distx2+(this.sign*(this.node2.currentRadius+this.rappBW*this.node2.borderWidth)*this.cos),
        "y":this.node2.posy+disty2+(this.sign*(this.node2.currentRadius+this.rappBW*this.node2.borderWidth)*this.sin)
    }
    //position of the attached node
    this.posAttach={
        "x":this.node2.posx+distx2,
        "y":this.node2.posy+disty2
    }
}
/*
Scaling effect
*/
Edge.prototype.computeDimensions=function(scale){
    //scaling size
    this.lineWidth*=scale;
    this.lineWidth=Math.round(this.lineWidth*2)/2;
}