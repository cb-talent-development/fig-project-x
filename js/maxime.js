function initMaxime(){
    /*
    Header effect
    */
    $("span#menu-button").click( function() {
        if(checkIfModeTwoColumns())
			var subMenu=$('li.movable');
        else
			var subMenu=$('.nav-menu .subMenu');
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
    });
	
	if(checkIfModeTwoColumns()){
		$('li.movable').hide();
	}
	$('.nav-menu .subMenu').hide();
}