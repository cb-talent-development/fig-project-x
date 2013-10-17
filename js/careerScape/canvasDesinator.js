/*
Class that add elements (nodes and eges) in the canvas
*/
function CanvasDessinator(canvas,ctx){
    this.canvas=canvas;
    this.context=ctx;
    if(window.scale==undefined){
        window.scale=1;
    }
};
/*
Add a rectange to the canvas (no border for now)
*/
CanvasDessinator.prototype.addRectangle=function(data){
    this.context.beginPath();
    this.context.globalAlpha=data.opacity;
    this.context.rect(data.posx,data.posy,data.width,data.height);
    this.context.fillStyle = data.color;
    this.context.fill();
    this.context.closePath();
    this.context.globalAlpha=1;
}
/*
Add a circle to the canvas (data has to be a node object)
*/
CanvasDessinator.prototype.addCircle=function(data){
      this.context.beginPath();
      this.context.arc(data.currentPosx, data.currentPosy,data.currentRadius, 0, 2 * Math.PI, false);
      this.context.fillStyle = data.color;
      //fill opacity control
      if(data.activated==true)
          this.context.globalAlpha=data.opacityOver;
      else
          this.context.globalAlpha=data.opacity;
    
      this.context.fill();
      if(data.borderWidth>0){
        this.context.lineWidth = data.borderWidth;
        this.context.strokeStyle = data.borderColor;
        //opacity control border
        if(data.activated==true)
              this.context.globalAlpha=data.opacityOver;
        else
              this.context.globalAlpha=data.opacityBorder;
        this.context.stroke();
      }
      this.context.globalAlpha=data.opacity;
      this.context.closePath();
      //add white filter above the tertiary node
      if(data.type=="tertiary" && data.activated==false){
        var copy=new Node(data,{
            "posx":data.currentPosx,
            "posy":data.currentPosy
        });
        copy.activated=false
        copy.type=undefined;
        copy.color="white";
        copy.borderWidth=0;
        copy.currentRadius=data.currentRadius+3*data.borderWidth/5;
        copy.borderColor="white";
        copy.opacity=config.opacity_filter;
        this.addCircle(copy);
      }

};
/*
Add an edge to the canvos (edge is an edge object)
*/
CanvasDessinator.prototype.addEdge=function(edge){
    edge.computePosition(edge.currentDist);
    this.context.beginPath();
    this.context.lineWidth = edge.lineWidth;
    this.context.strokeStyle = "#888888";
    this.context.globalAlpha=edge.edgeOpacity;
    if(this.context.getLineDash){
        if(edge.type=="doted" && config.doted){
            this.context.setLineDash([config.doted_line,config.doted_space])
        }
    }
    this.context.moveTo(edge.pos1.x,edge.pos1.y);
    this.context.lineTo(edge.pos2.x,edge.pos2.y);
    this.context.stroke();
    this.context.closePath();
    if(this.context.getLineDash)
        this.context.setLineDash([]);
    //reinit opacity
    this.context.globalAlpha=1.0;


}
/*
Add the label of a node to the canves (data has to be a node)
*/
CanvasDessinator.prototype.addText=function(data){
      var text=textTransform(data.label);
      this.context.fillStyle = data.textColor;
      if(data.activated)
        this.context.globalAlpha=data.opacityOver
      else
        this.context.globalAlpha=data.currentTextOpacity;
      this.context.font=data.size+"px "+config["canvas-font"];
      this.context.textAlign = 'center';
      if(text.length==1){
        this.context.fillText(text[0], data.posx, data.posy+data.size/4);
      }
      else{
          // cut in two
        this.context.fillText(text[0], data.posx, data.posy-data.size/4);
        this.context.fillText(text[1], data.posx, data.posy+3*data.size/4);

      }
      this.context.globalAlpha=1.0;

}
