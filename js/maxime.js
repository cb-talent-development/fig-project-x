function initMaxime(){
    /*
    Header effect
    */
    $("span#menu-button").click( function() {
        if(checkIfModeTwoColumns()){
            if ($("li.movable:visible").length != 0){
                $("li.movable").slideUp("normal");
            }
            else{
                $("li.movable").slideDown("normal");
            }
            return false;
        }else{
            //ADD EFFECT HERE
        }
    });
}