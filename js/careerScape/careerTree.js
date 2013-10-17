/*
Class CareerTree: Construct the career three with node and edges
*/
function CareerTree(width,height){
    //objects of the nodes
    this.animeFinish=true;
    this.nodes=new Array();
    this.edges=new Array();
    this.rectangles=new Array();
    this.width=width;
    this.height=height;
    //Value used for the pan effect
    this.outsideRange=30;
    this.class="tree";
    this.currentAngleSecondary=0;
    //degrees between the secondary nodes (72 degrees for pentagone)
    this.stepAngleSecondary=1.25663706;
    //degrees between tertiary nodes (41 degrees to avoid overlapping)
    this.stepAngleTertiary=0.715024504;
    //begining of tertiary angle (not at 0) (-step angle tertiary°)
    this.beginTertiary=-this.stepAngleTertiary;
    this.zoomStep=1;
    this.deltaX=0;
    this.deltaY=0;
};
/*
Add an edge to the career tree
*/
CareerTree.prototype.addEdge=function(node1,node2,type){
    this.edges.push(new Edge(node1,node2,type));
}
/*
Add an edge to the career tree
*/
CareerTree.prototype.addRec=function(data){
    data.class="rectangle";
    this.rectangles.push(data);
}
/*
Check if user if on a Node (used for web)
*/
CareerTree.prototype.checkIfNodeActivated=function(posX,posY){
    for(var i=0;i<this.nodes.length;i++){
        var node=this.nodes[i];
        var dist=((posX-node.currentPosx)*(posX-node.currentPosx)+(posY-node.currentPosy)*(posY-node.currentPosy));
        var radius=node.radius+3*node.borderWidth/5;
        radius*=radius;
        //enter the node
        if(node.activated==false && (dist<radius) && posX>0 && posX<canvas.width && posY>0 && posY<canvas.height){
            node.activated=true;
            return node;
        }
        //leaving the node
        else if((dist>=radius || posX<0 || posX>canvas.width || posY<0 || posY>canvas.height) && node.activated==true){
            node.activated=false;
            return node;
        }
    }
    return false;
}
/*
Check if user click on a Node (used for touch)
*/
CareerTree.prototype.checkIfNode=function(posX,posY){
    for(var i=0;i<this.nodes.length;i++){
        var node=this.nodes[i];
        var dist=((posX-node.currentPosx)*(posX-node.currentPosx)+(posY-node.currentPosy)*(posY-node.currentPosy));
        var radius=node.radius+3*node.borderWidth/5;
        radius*=radius;
        if(dist<radius){
            return node;
        }
    }
    return false;
}
/*
Add a genaral node to the career tree 
*/
CareerTree.prototype.addNode=function(father,data,type,addInfo){
    var posX=Math.sin(father.currentAngle)*father.distNext;
    var posY=-Math.cos(father.currentAngle)*father.distNext;
    father.currentAngle+=father.stepAngle;
    posX=father.posx+posX;
    posY=father.posy+posY;  
    var node=new Node(data,{'posx':posX,'posy':posY},type,addInfo);
    this.nodes.push(node);
    return node;
}
/*
Add the main node to the career tree
*/
CareerTree.prototype.addMainNode=function(data){
    var node=new Node(data,
                             {
                                 'posx':this.width/2,
                                 'posy':this.height/2
                             },
                             "main",
                             {
                                'distNext':config.size[2]*2.8,
                                'noise':false,
                                'stepAngle':this.stepAngleSecondary
                             }
 );
 this.nodes.push(node);
 return node;
};
/*
Get the dimensions of the career tree (used for pan)
*/
CareerTree.prototype.getDimensions=function(){
    var minX=this.width;
    var minY=this.height;
    var maxX=0;
    var maxY=0;
    for(var i=0;i<this.nodes.length;i++){
        var node=this.nodes[i];
        //x
        if((node.posx-node.radius-node.borderWidth)<minX){
            minX=(node.posx-node.radius-node.borderWidth);
        }
        if((node.posx+node.radius+node.borderWidth)>maxX){
            maxX=(node.posx+node.radius+node.borderWidth)
        }
        //y
        if((node.posy-node.radius-node.borderWidth)<minY){
            minY=(node.posy-node.radius-node.borderWidth);
        }
        if((node.posy+node.radius+node.borderWidth)>maxY){
            maxY=(node.posy+node.radius+node.borderWidth)
        }
    }
    minX=minX-this.outsideRange*1.5;
    maxX=maxX+this.outsideRange*1.5;
    minY=minY-this.outsideRange*2;
    maxY=maxY+this.outsideRange;
    return {
        "width":(maxX-minX),
        "height":(maxY-minY)
    }
}
/*
Add a secondary node to the career tree
*/
CareerTree.prototype.addSecondaryNode=function(mainNode,data){
    //noise effects
    var rand1=(-1+Math.floor(Math.random()*3))*Math.PI/180;
    var rand2=(-1+Math.floor(Math.random()*3))*Math.PI/180;

    return this.addNode(mainNode,
                  data,
                  "secondary",
                   {
                       'distNext':config.size[2]*3.3,
                       'noise':true,
                       'stepAngle':this.stepAngleTertiary+rand1,
                       'currentAngle':this.beginTertiary+mainNode.currentAngle+rand2
                   }
    );
};
/*
Return the main node
*/
CareerTree.prototype.getMainNode=function(){
  for(var i=0;i<this.nodes.length;i++){
      var node=this.nodes[i];
      if(node.type=="main"){
        return node;
      }
  }
}
/*
Find a node by its label and eventually its type
*/
CareerTree.prototype.findNodeByTitle=function(label,type){
      for(var i=0;this.nodes.length;i++){
          var node=this.nodes[i];
          if(node.label==label){
            if(type!=undefined){
                if(node.type==type){
                    return node;
                }
            }
            else
                return node;
          }
      }
}
/*
Add a tertiary node to the career tree
*/
CareerTree.prototype.addTertiaryNode=function(secondaryNode,data){
    return this.addNode(secondaryNode,
                  data,
                  "tertiary"
    );
};
/**
Change zoom of elements
**/
/*
All nodes
*/
CareerTree.prototype.changeZoom=function(){
    //compute new dimensions
    var delta=this.getMainNode().getDeltaZoom(this.zoomStep);
    for(var i=0;i<this.nodes.length;i++){
        var node=this.nodes[i];
        node.computeDimensions(this.zoomStep,delta.x,delta.y);
    }
}
/*
The text size
*/
CareerTree.prototype.changeZoomText=function(){
    for(var i=0;i<this.nodes.length;i++){
        var node=this.nodes[i];
        node.size*=this.zoomStep
    }
}
/**
Move the tree
**/
CareerTree.prototype.moveTree=function(currentDeltaX,currentDeltaY){
    var mainNode=careerTree.getMainNode();
    for(var i=0;i<careerTree.nodes.length;i++){
        var node=careerTree.nodes[i];
        node.move(currentDeltaX,currentDeltaY);
    }
}
