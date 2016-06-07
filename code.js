


function btnSelect(element) {
	$(".radio-inline-btn").each(function() {
		$(this).removeClass("btn-primary");
		$(this).addClass("btn-default");
	});
	$(element).removeClass("btn-default");
	$(element).addClass("btn-primary");
}

var error = "border-color: #b94a48;-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);background-color:#FF6666 "

var particles = ["smoke", "hearts", "explode", "largeexplode", "hugeexplosion", "fireworkSpark", "bubble", "splash", "wake", "suspended", "depthsuspend", "crit", "magicCrit", "largesmoke", "spell", "instantSpell", "mobSpell", "mobSpellAmbient", "witchMagic", "dripWater", "dripLava", "angryVillager", "happyVillager", "townaura", "note", "portal", "enchantmenttable", "flame", "lava", "footstep", "reddust", "snowballpoof", "slime", "barrier", "cloud", "snowshovel", "droplet", "take"];
var warnParticles = ["endRod", "dragonbreath", "damageIndicator", "sweepAttack"];
var customParticles = ["iconcrack", "blockcrack", "blockdust"];	



function getSubs(elementValue) {
	if (elementValue == "0") return ["None", "Flight", "Spiritual Projection"];
	if (elementValue == "1") return ["None", "Sand", "Metal", "Lava"];
	if (elementValue == "2") return ["None", "Lightning", "Combustion"];
	if (elementValue == "3") return ["None", "Ice", "Plant", "Blood", "Healing"];
	if (elementValue == "4") return ["None"];
	if (elementValue == "5") return ["Yes", "No"];
	return null;
}

function saveDisplay() {
	if ($("#block_none").hasClass("active")) {
		if ($("#particles_other").hasClass("active")) {
			$("#id_displayfield")[0].value = "particle="+ $("#id_particlecount")[0].value + "," + $("#id_particlescustom")[0].value;
		} else {
			var v = "";
			$("#particlesgroup").children("label").each(function() {
				if ($(this).hasClass("active")) {
					v = $(this).children("input")[0].value;
				}
			});
			$("#id_displayfield")[0].value = "particle="+ v + "," + $("#id_particlecount")[0].value;
		}
	} else if ($("#block_earthbending").hasClass("active")) {
		
	} else if ($("#block_waterbending").hasClass("active")) {
		
	} else if ($("#block_other").hasClass("active")) {
		console.log("Heyyyy");
		var v = "";
		$("#blockother_select").children("label").each(function() {
			if ($(this).hasClass("active")) {
				v = $(this).children("input")[0].value;
			}
		});
		$("#id_displayfield")[0].value = "block=" + v;
	}
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
	
	$(".trigger-click").mouseup(function() {
		if ($(".trigger-click.active").length > 1) {
			$(".trigger-click.active").each(function() {
				$(this).attr("style", error);
			});
		}
	});
	
	$(".trigger-sneak").mouseup(function() {
		if ($(".trigger-sneak.active").length > 1) {
			$(".trigger-sneak.active").each(function() {
				$(this).attr("style", error);
			});
		}
	});
	
	$(".trigger-click, .trigger-sneak").mouseup(function() {
		if ($(".trigger-sneak.active").length <= 1) {
			$(".trigger-sneak").removeAttr("style");
		}
		if ($(".trigger-click.active").length <= 1) {
			$(".trigger-click").removeAttr("style");
		}
	});
	
	$("#id_displayfield").change(function() {
		if ($(this).value == "") { 
			$(this).parent().addClass("has-error");
			$(this).next("span").attr("title", "Cannot be empty! Please use the editor to fill.");
		}
	});
	
	//Disables the paticles names field when the 'other particle' button isn't selected
	$("#particles_other").click(function() {
		$("#id_particlescustom").removeAttr("disabled");
	});
	
	$(".btn-particles").click(function() {
		$("#id_particlescustom").attr("disabled", "disabled");
	});
	
	//Changes the hidden content based on the display option selected
	$("#block_none").mouseup(function() {
		$(".section_display").each(function() {
			$(this).addClass("hidden");
		});
		$("#section_particles").removeClass("hidden");
	});
	
	$("#block_waterbending").mouseup(function() {
		$(".section_display").each(function() {
			$(this).addClass("hidden");
		});
		$("#section_waterbending").removeClass("hidden");
	});
	
	$("#block_earthbending").mouseup(function() {
		$(".section_display").each(function() {
			$(this).addClass("hidden");
		});
		$("#section_earthbending").removeClass("hidden");
	});
	
	$("#block_other").mouseup(function() {
		$(".section_display").each(function() {
			$(this).addClass("hidden");
		});
		$("#section_blocks_").removeClass("hidden");
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
	
	$("#id_particlescustom").change(function() {
		var b = 2;
		if ($("#id_particlescustom")[0].value != "") {
			for (var p in particles) {
				if ($("#id_particlescustom")[0].value == particles[p]) {
					b = 0;
					break;
				}
			}
			for (var p in warnParticles) {
				if ($("#id_particlescustom")[0].value == warnParticles[p]) {
					b = 1;
					break;
				}
			}
			for (var p in customParticles) {
				if ($("#id_particlescustom")[0].value == customParticles[p]) {
					b = 0;
					break;
				}
			}
		}
		
		
		if (b == 2) {
			$("#id_particlescustom").parent().addClass("has-error");
			$("#id_particlescustom").attr("title", "Invalid particle name!")
		}
		else if (b == 1) {
			$("#id_particlescustom").parent().addClass("has-warning");
			$("#id_particlescustom").attr("title", "Particle requires MC 1.9")
		}
		else {
			$("#id_particlescustom").parent().removeClass("has-error");
			$("#id_particlescustom").parent().removeClass("has-warning");
			$("#id_particlescustom").removeAttr("title");
		}
	});
	
	$(".no-whitespace").focusout(function() {
		if ($(this).val().indexOf(" ") > -1) {
			$(this).parent().addClass("has-error");
			$(this).next("span").addClass("glyphicon-remove");
			$(this).next("span").attr("data-orginal-title", "Cannot be empty!");
		}
	});
	
	$(".not-empty").focusout(function() {
		if ($(this).val() == "") {
			$(this).parent().addClass("has-error");
			$(this).next("span").addClass("glyphicon-remove");
			$(this).next("span").attr("data-orginal-title", "Cannot be empty!");
		}
	});
	
	$(".not-empty, .no-whitespace").focusout(function() {
		if ($(this).val() == "") return;
		if ($(this).val().indexOf(" ") > -1) return;
		$(this).parent().removeClass("has-error");
		$(this).next("span").removeClass("glyphicon-remove");
		$(this).next("span").removeAttr("data-orginal-title");
	});

	
	$('[data-toggle="tooltip"]').tooltip(); 
	 $("span").tooltip({
		   placement: "right"
		   }); 
});


	