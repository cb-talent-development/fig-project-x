function toggleEffectLarge(event){
    if(event!=undefined){
        event.stopPropagation();
    }
    // If closed, close the others and open it
    var subMenu=$(this).find(".subMenu").first();
    if (!subMenu.is(':visible')) {
		$(this).addClass("open");
        subMenu.slideDown(config.timeAnim);
        return false;
    }
	// If already open, close it
    else {
        subMenu.slideUp(config.timeAnim, function () { 
            $(this).parent().removeClass("open") }
        );
        // Don't follow the link
        return false;
    }
}

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
	
	var toggleMenuLarge=$(".toggleMenuLarge");
	toggleMenuLarge.unbind('click');
	toggleMenuLarge.click(toggleEffectLarge);
	
	if(checkIfModeTwoColumns()){
		$('li.movable').hide();
	}
	$('.nav-menu .subMenu').hide();
}