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
			var subMenu=$('.nav-menu.subMenu');
		if (!subMenu.is(':visible')) {
			subMenu.slideDown(config.timeAnim,function () { 
				$(this).parent().removeClass("open") }
			);
			$('.icon-menu-white').addClass('icon-menu-orange').removeClass('icon-menu-white');
			return false;
		}
		// If closed, close the others and open it
		else {
			subMenu.slideUp(config.timeAnim, function () { 
				$(this).parent().removeClass("open") }
			);
			$('.icon-menu-orange').addClass('icon-menu-white').removeClass('icon-menu-orange');
			// Don't follow the link
			return false;
		}
    });
	
	$("a:contains('Bold')").replaceWith('<a id="bold-button" class="btn" data-wysihtml5-command="bold" title="CTRL+B" href="javascript:;" unselectable="on">Bold</a>');
	$("a:contains('Italic')").replaceWith('<a id="italic-button" class="btn" data-wysihtml5-command="italic" title="CTRL+B" href="javascript:;" unselectable="on">Italic</a>');
	$("a:contains('Underline')").replaceWith('<a id="underline-button" class="btn" data-wysihtml5-command="underline" title="CTRL+B" href="javascript:;" unselectable="on">Underline</a>');
	
	
	var toggleMenuLarge=$(".toggleMenuLarge");
	toggleMenuLarge.unbind('click');
	toggleMenuLarge.click(toggleEffectLarge);
	
	if(checkIfModeTwoColumns()){
		$('li.movable').hide();
	}
	$('.nav-menu .subMenu').hide();
}