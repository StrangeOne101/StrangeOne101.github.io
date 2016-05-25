function btnSelect(element) {
	$(".radio-inline-btn").each(function() {
		$(this).removeClass("btn-primary");
		$(this).addClass("btn-default");
	});
	$(element).removeClass("btn-default");
	$(element).addClass("btn-primary");
}

function getSubs(elementValue) {
	if (elementValue == "0") return ["None", "Flight", "Spiritual Projection"];
	if (elementValue == "1") return ["None", "Sand", "Metal", "Lava"];
	if (elementValue == "2") return ["None", "Lightning", "Combustion"];
	if (elementValue == "3") return ["None", "Ice", "Plant", "Blood", "Healing"];
	if (elementValue == "4") return ["None"];
	if (elementValue == "5") return ["Yes", "No"];
	return null;
	
}

function getCodeElement(elementValue, subValue) {
	if (elementValue == "0") return ["Air", "Flight", "Spiritual"][subValue];
	if (elementValue == "1") return ["Earth", "Sand", "Metal", "Lava"][subValue];
	if (elementValue == "2") return ["Fire", "Lightning", "Combustion"][subValue];
	if (elementValue == "3") return ["Water", "Ice", "Plant", "Blood", "Healing"][subValue];
	if (elementValue == "4") return "Chi";
	if (elementValue == "5") return "Avatar";
	return null;
}

function getSub(elementValue, subValue) {
	if (elementValue == "0") return ["None", "Flight", "Spiritual Projection"][subValue];
	if (elementValue == "1") return ["None", "Sand", "Metal", "Lava"][subValue];
	if (elementValue == "2") return ["None", "Lightning", "Combustion"][subValue];
	if (elementValue == "3") return ["None", "Ice", "Plant", "Blood", "Healing"][subValue];
	if (elementValue == "4") return ["None"];
	if (elementValue == "5") return "None";
	return "None";
}


$(document).ready(function() {
	$('.line1').click(function() {
		  $('.line2').checked('reset');
		  
	});
		
	$(".line2").click(function() {
		  $(".line1").checked('reset');
	});
	
	$(".movementtype-move").click(function() {
		$("#section_movement").removeClass("hidden");
		$("#section_nonmovement").addClass("hidden");
		$(".sourceselection").removeClass("disabled");
	});
	
	$(".movementtype-none").click(function() {
		$("#section_nonmovement").removeClass("hidden");
		$("#section_movement").addClass("hidden");
		$(".sourceselection").addClass("disabled");
	});
	
	$(".trigger-click").click(function() {
		if ($(".trigger-click.active").length > 1) {
			$(".trigger-click.active").each(function() {
				$(this).addClass("has-error");
			});
		} else {
			$(".trigger-click").removeClass("has-error");
		}
	});
	
	$(".trigger-sneak").click(function() {
		if ($(".trigger-sneak.active").length > 1) {
			$(".trigger-sneak.active").each(function() {
				$(this).addClass("has-error");
			});
		} else {
			$(".trigger-sneak").removeClass("has-error");
		}
	});
	
	$("#id_element").change(function() {
		var v = $("#id_element")[0].value;
		if (v == "5") {
			$("#id_subelement").html('<option value="0">Yes</option><option value="1">No</option>');
			$("#id_element_option").html("Require Avatar");
		} else {
			var s = "";
			for (var i = 0; i < getSubs(v).length; i += 1) {
				s = s + "<option value=\"" + i + "\">" + getSubs(v)[i] + "</option>";
			}
			$("#id_subelement").html(s);
			$("#id_element_option").html("Subelement");
		}
	});
	
	$(".no-whitespace").focusout(function() {
		if ($(this).val().indexOf(" ") > -1) {
			$(this).parent().addClass("has-error");
			$(this).parent().next("span").addClass("glyphicon-remove");
			$(this).parent().next("span").addClass("form-control-feedback");
			$(this).parent().next("span").removeClass("hidden");
			//$(this).addClass("miniminitooltop");
			//$(this).attr("data-toggle", "tooltip");
			//$(this).attr("data-placement", "down");
			$(this).attr("title", "Cannot have a whitespace character!");
			
		}
	});
	
	$(".not-empty").focusout(function() {
		if ($(this).val() == "") {
			$(this).parent().addClass("has-error");
			$(this).next("span").addClass("glyphicon-remove");
			$(this).next("span").addClass("form-control-feedback");
			$(this).next("span").removeClass("hidden");
			//$(this).addClass("miniminitooltop");
			//$(this).attr("data-toggle", "tooltip");
			//$(this).attr("data-placement", "down");
			$(this).attr("title", "Cannot be empty!");;
		}
	});
	
	$(".not-empty, .no-whitespace").focusout(function() {
		if ($(this).val() == "") return;
		if ($(this).val().indexOf(" ") > -1) return;
		$(this).parent().removeClass("has-error");
		$(this).removeClass("glyphicon-remove");
		$(this).removeClass("form-control-feedback");
		$(this).parent().next("span").addClass("hidden");
		
		//$(this).removeClass("miniminitooltip");
		//$(this).removeAttr("data-toggle");
		//$(this).removeAttr("data-placement");
		$(this).removeAttr("title");
	});
	
	$('[data-toggle="tooltip"]').tooltip(); 
});


	