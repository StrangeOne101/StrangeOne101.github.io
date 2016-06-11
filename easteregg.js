var clicked = 0;

$(document).ready(function() {
	var date = new Date();
	var text = $('#iamstrange').html();
	if (date.getMonth() == 0 && date.getDate() == 21) {
		text = "Happy Birthday, Strange!";
	} else if (date.getMonth() == 11 && date.getDate() == 25) {
		text = 'Ho ho ho, Merry Christmas!';
	} else if (date.getMonth() == 3 && date.getDate() == 16) {
		text = 'Where did the eggs go?';
	} else if (Math.random() < 0.15) {
		text = 'Yes, I am VERY strange ;)';
	}
	if (text != $('#iamstrange').html()) {
		$('#iamstrange').html(text);
	}
	
	$(".header-logo").children("img").click(function() {
		clicked++;
		setTimeout(function() {if (clicked > 0) clicked--;}, 3000);
		
		if (clicked >= 2) {
			clicked = 0;
			$(this).fadeOut(1000, function() {
				$(this).fadeIn(1000);
			})
			/*if ($(this).attr("party") != null) {
				$(this).removeAttr("party");
			} else {
				$(this).attr("party", "true");
				var t = $(this);
				setInterval(function() {
					if (t.attr("party") != null) {
						var e = $("p,body,div,span,li,a")[parseInt($("p,body,div,span,li,a").length * Math.random())];
						var r = Math.random();
						var colors = ["#FF0000", "#FFB0B0", "#FF8000", "#FFFF00", "#00FF00", "#00FF80", "#2A2AFF", "#FF00FF"];
						var color = colors[parseInt(colors.length * Math.random())];
						if (r <= 0.65) {
							$(e).attr("style", "color: " + color);
						} else if (r <= 95) {
							$(e).attr("style", "background-color: " + color);
						} else {
							$(e).attr("style", "font-weight: bold");
						}
					}
				}, 100);
			}*/
			
		}
	});
	
});


