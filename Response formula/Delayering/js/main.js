;$(function(){
		var sidebar = $('#sidebar'),
			mask = $('.mask'),
			backButton = $('.back-to-top'),
			side_trigger = $('.side-trigger');

			function showSidebar(){
					mask.fadeIn('slow');
					//sidebar.animate({'right': 0});  两种方法
					sidebar.css({'right':0,'background':'rgba(0,0,0,0.8)'});
			};
			function hideSidebar(){
				mask.fadeOut('slow');
				sidebar.css('right',-sidebar.width());
			}

			side_trigger.on('click',showSidebar);
			mask.on('click',hideSidebar);

			backButton.on('click',function(){
				$('html,body').animate({scrollTop:0},800);
				
			});

			$(window).on('scroll',function(){
				//console.log(this);
				if($(window).scrollTop() > $(window).height()){
					backButton.fadeIn();
				}
				else{
					backButton.fadeOut();
				}
			});


			$(window).trigger('scroll');

})