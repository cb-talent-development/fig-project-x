var phone = false;
	
function toggleToPhoneMode(){
	$('#col2').before('<div id="col1" class="col-sm-12 col-6"></div>');
	$('#col1').html($('#col3').html());
	$('#col3').remove();
	phone = true;
}

function toggleToPcMode(){
	$('#col2').after('<div id="col3" class="col-sm-12 col-6"></div>');
	$('#col3').html($('#col1').html());
	$('#col1').remove();
	phone = false;
}

if($(window).width() < 768 && !phone){
	toggleToPhoneMode();
} else if($(window).width() > 768 && phone){
	toggleToPcMode();
}