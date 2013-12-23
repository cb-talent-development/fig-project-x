function PostCtr($scope,$http,$routeParams,register){
    /*
    load an post from url
    */
    $scope.loadPost=function(url){
        //USE ID !!!
        $http.get("data/json/post.json").success(function(data) {
            postPretreatment(data,"big-");
            $scope.post=data;
            $scope.paths=[{
                "txt":" Advice & Resource",
                "color":"black"
            },
            {
                "txt":$scope.post.Categories[0].Name,
                "color":"grey"
            }]
	   });	
    };
    $scope.loadRelated=function(url){
        //USE ID !!!
        $http.get("data/json/post-related.json").success(function(data) {
            $scope.related=data.Posts;
            for(var i=0;i<$scope.related.length;i++){
                var post=$scope.related[i];
                postPretreatment(post);
                post.Template=3;
                $scope.related[i]=post;
            }
            
	   });	
    };
    $scope.treatmentComments=function(){
        for(var i=0;i<$scope.comments.length;i++){
            var comment=$scope.comments[i];
            comment.input="";
            if(!comment.isNew)
                comment.display="block";
            for(var j=0;j<comment.Replies.length;j++){
                var subComment=comment.Replies[j];
                subComment.padding="";
                subComment.firstBorder="";
                subComment.secondBorder="";
                subComment.input="";
                if(!subComment.isNew)
                    subComment.display="block";
                if(j==comment.Replies.length-1){
                    subComment.padding+="no-padding-bottom";
                }
                if(subComment.Replies.length==0){
                    subComment.secondBorder="no-second-bar"
                     if(j!=comment.Replies.length-1){
                        subComment.firstBorder="no-first-bar"
                     }
                }
                else{
                    for(var k=0;k<subComment.Replies.length;k++){
                        var subSubComment=subComment.Replies[k];
                        if(!subSubComment.isNew)
                            subSubComment.display="block";
                        subSubComment.padding="";
                        subSubComment.input="";
                        if(k==subComment.Replies.length-1){
                            subSubComment.padding+="no-padding-bottom";
                        }
                    }
                }
            }
        }
    };
    $scope.loadComments=function(url){
        //USE ID !!!
        $http.get("data/json/post-comments.json").success(function(data) {
            $scope.comments=data.Comments;
            $scope.treatmentComments();
        });	
    };
    /*
    Comment function
    */
    $scope.addComment=function(input,id){
        $http.get("data/json/new-comment.json",{
            "input":input,
            "User":$scope.user
        }).success(function(data){
            //console.log(data);
            //random id for now
            var newId=Math.floor((Math.random()*100)+100);
            data.Content=input;
            data.id=newId;
            data.isNew=true;
            data.display="none";
            if(id){
                var find=false;
                for(var i=0;i<$scope.comments.length;i++){
                    var comment=$scope.comments[i];
                    if(comment.id==id){
                        find=true;
                        data.Replies=[];
                        comment.Replies.push(data);
                        break;
                    }
                    for(var j=0;j<comment.Replies.length;j++){
                        var subComment=comment.Replies[j];
                        if(subComment.id==id){
                            find=true;
                            subComment.Replies.push(data);
                            break;
                        }
                        for(var k=0;k<subComment.Replies.length;k++){
                            var subSubComment=subComment.Replies[k];
                            if(subSubComment.id==id){
                                find=true;
                                subComment.Replies.push(data);
                                break;
                            }
                        }
                        if(find)
                            break;
                    }
                    if(find)
                        break;
                 }
                 $scope.treatmentComments();
            }else{
                data.Replies=[];
                $scope.comments.push(data);
            }
            var inter=setInterval(function(){
                var newComment=$("#comment_"+newId);
                if(newComment!=undefined){
                    newComment.hide();
                    newComment.slideDown(500);
                    var deltaTop=newComment.position().top-window.innerHeight/2-(window.scrollY);
                   // window.scrollTo(window.scrollX,$scope.actualPosition);
                    $('html, body').animate({scrollTop:window.scrollY+deltaTop}, 400);
                    //window.scrollTo(window.scrollX,window.scrollY+deltaTop);
                    clearInterval(inter);
                }
            },10);

        });
    }
    $scope.openReply=function(comment){
        if(comment.Replies==undefined){
            if(comment.input=="")
                comment.input="@"+comment.User.Name;
        }
    }
    $scope.reply=function(comment){
        var input=comment.input;
        if(input.length>0){
            var id=comment.id;
            $scope.actualPosition=$("#comment_"+id).find('.new-comment').first().position().top;
            console.log($scope.actualPosition);
            $scope.addComment(input,id);
        }
    }
    $scope.newComment=function(){
         $scope.addComment($scope.inputComment);
    }
    /*
    Constructor
    */
    $scope.init=function(){ 
        init($scope,register);
        $scope.inputComment="";
        $scope.actualPosition=0;

        $scope.postId=$routeParams.postId;
        //USE POSTID
        //load post info
        $scope.loadPost();
        checkUserInfo($scope,$http);
        $scope.loadRelated();
        $scope.loadComments();
        //Init eventual effects
        $scope.$on('$viewContentLoaded', function(){
            initEffect();
        });
        
    }
    $scope.init();
}