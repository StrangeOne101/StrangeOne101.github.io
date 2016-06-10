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
});


