$('.carousel').carousel()

$('.scrollbtn').on('click', function(){
	var element = $(this)
	var anchor = $(this).attr('href').replace(/#/g, '')

	var target = $('[data-anchor="'+anchor+'"]')
	$('html,body').animate({scrollTop: target[0].getBoundingClientRect().top+pageYOffset-50}, 1000);

	console.log(anchor, target)
})