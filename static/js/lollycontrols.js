var vlolly = {};
vlolly.count = 6;
vlolly.thislolly = 3; // tweak the lolly count because I'm going to add some snazzy new lollies, but I don't want to change people's choices.
vlolly.lollyWidth = 400;

$(document).ready(function(){
	
	$('#make').live('click', function(){					
		$('#intro').remove();
		var msg = $('p.message');
		var input = $("<label for='message'>Your message:</label><textarea name='message' id='message' class='edit'>"+ msg.html() +"</textarea>");
		msg.html(input);
		toggleControls();
		input.select();
		return false;
	});

	$('#done').live('click', function(){					
		var msg = $('p.message');
		var input = $('textarea', msg);
		msg.html(input.val());
		toggleControls();
		return false;
	});
	
	$('#nextlolly').live('click', function(){
		$(this).blur();
		vlolly.thislolly += 1;
		if (vlolly.thislolly >= vlolly.count) {
			vlolly.thislolly = 3;
		};
		var x = vlolly.lollyWidth * (vlolly.thislolly - 3) * -1;
		$('#lolly').stop().animate({backgroundPosition: '-=30px', opacity:0}, 200, function(){
			$('#lolly').
				removeClass().
				addClass('lolly_'+ vlolly.thislolly).
				css({backgroundPosition: x+50+'px' }).
				animate({backgroundPosition: x+'px', opacity:1}, 300);
		});
		return false;
	});
	
	$('#craft').live('click', function(){					
		$('#controls').html('<span class="busy">...hang on a mo. I\'m just making you a link to that lolly.</span>');
		$.post("/mint", { message: $('p.message').html(), lolly: $('#lolly').attr('class') }, function(data){
			$('#controls').html(data);
		});
		return false;
	});
	
});


function toggleControls() {
	var controls = $('#controls');
	if(controls.hasClass('edit')) {
		var btns = "<a href='/make' id='make'>That's not quite right. Let me tweak it.</a> <a href='/craft' id='craft'>Perfect! Give me a link to this lolly.</a>";				
	} else {
		var btns = "<a href='/nextlolly' id='nextlolly'>That's not the lolly. Show me another!</a> <a href='/done' id='done'>All done.</a>";
	}
	$('#controls').html(btns).toggleClass('edit');
}
