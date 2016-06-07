var currentSlot = 0;
var selectedSlot = 0;
var maxSaveSlots = 20;
var acv = 0.2;

var workSaved = false;
var autosave = true;

var splitChar = ":";

var saveSlots = [];

var cookies = {};

function saveCookie(slot) {
	if (slot > maxSaveSlots - 1 || slot < 0) return false;
	
	loadVars();
	
	
	var object = {};
	object["acv"] = acv;
	
	object["name"] = moveName;
	object["author"] = author;
	object["moveversion"] = version;
	object["help"] = help;
	object["element"] = $("#id_element")[0].value;
	object["sub"] = $("#id_subelement")[0].value;
	var i = 0;
	if ($("#abilityMovement2_None").hasClass("active")) i = 1;
	else if ($("#abilityMovement2_Block").hasClass("active")) i = 2;
	else if ($("#abilityMovement2_Particles").hasClass("active")) i = 3;
	object["movetype"] = i;
	if ($("#abilityMovement_Click").hasClass("active")) i = 1;
	else if ($("#abilityMovement_Sneak").hasClass("active")) i = 2;
	else if ($("#abilityMovement_Both").hasClass("active")) i = 3;
	object["movestart"] = i;
	if ($("#sourceNone").hasClass("active")) i = 1;
	else if ($("#sourceClick").hasClass("active")) i = 2;
	else if ($("#sourceShift").hasClass("active")) i = 3;
	object["source"] = i;
	object["speed"] = $("#id_movementspeed")[0].value;
	object["range"] = $("#id_range")[0].value;
	object["cooldown"] = $("#id_cooldown")[0].value;
	if ($("#abilityRedirect_Never").hasClass("active")) i = 1;
	else if ($("#abilityRedirect_Click").hasClass("active")) i = 2;
	else if ($("#abilityRedirect_Sneak").hasClass("active")) i = 3;
	else if ($("#abilityRedirect_Both").hasClass("active")) i = 4;
	else if ($("#abilityRedirect_Always").hasClass("active")) i = 5;
	object["redirect"] = i;
	object["damage"] = $("#id_damage")[0].value;
	object["maxhits"] = $("#id_maxhits")[0].value;
	object["deathmessage"] = $("#id_deathmessage")[0].value;
	object["display"] = $("#id_displayfield")[0].value;
	object["dmgradius"] = $("#id_damageradius")[0].value;
	
	//ACV 0.2
	object["packagename"] = $("#id_packagename")[0].value;
	
	var cookiestring = "{";
	for (var s in object) {
		cookiestring = cookiestring + s + ":\"" + encodeURIComponent(object[s]) + "\",";
	}
	cookiestring = cookiestring.substr(0, cookiestring.length -1) + "}"

	var d = new Date();
    d.setTime(d.getTime() + (365.25*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "slot_" + slot + "=" + cookiestring + "; " + expires;
    document.cookie = "slot_index" + "=" + currentSlot + "; " + expires;
    document.cookie = "autosave" + "=" + autosave + "; " + expires;
	
	return cookiestring;
}


function loadCookie(slot) {
	if (!("slot_" + slot in cookies)) return;
	
	var split = cookies["slot_" + slot].split(",");
	var version = null;
	
	for (var i = 0; i < split.length; i++) {
		var s = split[i];
		
		var key = s.split(splitChar)[0];
		var value = s.split(splitChar)[1];
		value = decodeURIComponent(value);
		value = value.substr(1, value.length - 2);
		
		if (key == "acv") {version = parseFloat(value); continue;}
		
		if (version >= 0.1) {
			if (key == "name") $("#id_move_name")[0].value = value;
			else if (key == "moveversion") $("#id_move_version")[0].value = value;
			else if (key == "author") $("#id_move_author")[0].value = value;
			else if (key == "help") $("#id_move_help")[0].value = value;
			else if (key == "element") $("#id_element")[0].value = value;
			else if (key == "sub") $("#id_subelement")[0].value = value;
			else if (key == "cooldown") $("#id_cooldown")[0].value = value;
			else if (key == "movetype") {
				$(".movementtype-none").each(function() {$(this).removeClass("active");});
				if (value == 1) $("#abilityMovement2_None").addClass("active");
				else if (value == 2) $("#abilityMovement2_Block").addClass("active");
				else if (value == 3) $("#abilityMovement2_Paticles").addClass("active");
			}
			else if (key == "movestart") {
				$(".movementtype-start").each(function() {$(this).removeClass("active");});
				if (value == 1) $("#abilityMovement_Click").addClass("active");
				else if (value == 2) $("#abilityMovement_Sneak").addClass("active");
				else if (value == 3) $("#abilityMovement_Both").addClass("active");
			}
			else if (key == "source") {
				$(".sourceselection").each(function() {$(this).removeClass("active");});
				if (value == 1) $("#sourceNone").addClass("active");
				else if (value == 2) $("#sourceShift").addClass("active");
				else if (value == 3) $("#sourceClick").addClass("active");
			}
			else if (key == "speed") $("#id_movementspeed")[0].value = value;
			else if (key == "range") $("#id_range")[0].value = value;
			else if (key == "redirect") {
				$(".abilityredirect").each(function() {$(this).removeClass("active");});
				if (value == 1) $("#abilityRedirect_Never").addClass("active");
				else if (value == 2) $("#abilityRedirect_Click").addClass("active");
				else if (value == 3) $("#abilityRedirect_Sneak").addClass("active");
				else if (value == 4) $("#abilityRedirect_Both").addClass("active");
				else if (value == 5) $("#abilityRedirect_Always").addClass("active");
			}
			else if (key == "damage") $("#id_damage")[0].value = value;
			else if (key == "maxhits") $("#id_maxhits")[0].value = value;
			else if (key == "deathmessage") $("#id_deathmessage")[0].value = value;
			else if (key == "display") $("#id_displayfield")[0].value = value;
			else if (key == "dmgradius") $("#id_damageradius")[0].value = value;
		} else if (version >= 0.2) {
			if (key == "packagename") $("#id_packagename")[0].value = value;
		}
	}
	
	workSaved = true;
	
	$("input[data-toggle!='modal']").change();
}

$(document).ready(function() {
	loadCookies();
	
	loadCookie(currentSlot);
	
	$("#autosave_btn").click(function() {
		if ($(this).hasClass("btn-success")) {
			$(this).removeClass("btn-success");
			$(this).addClass("btn-danger");
			$(this).attr("value", "Autosave OFF");
			autosave = false;
			
		} else {
			$(this).removeClass("btn-danger");
			$(this).addClass("btn-success");
			$(this).attr("value", "Autosave ON");
			autosave = true;
		}
	});
	
	if (!autosave) $("#autosave_btn").click();
	
	$(".save_slot").hover(function() { //On hover
		//if ($(this).hasClass("activeitem")) return;
		//$(this).attr("style", "border: 1px solid #AAA;background-color: #F0F0F0");
	}, function() { //On hover leave
		//if ($(this).hasClass("activeitem")) return;
		//$(this).removeAttr("style");
	});
	
	$(".save_slot").click(function() { //On hover
		if ($(this).hasClass("activeitem2")) return;
		$(".save_slot").each(function() {
			$(this).removeClass("activeitem2");
		});
		$(this).addClass("activeitem2");
		selectedSlot = parseInt(this.value);
		console.log(this + " | " + this.value);
		
		if (cookies["slot_" + selectedSlot] == null) {
			$("#load_button").removeClass("disabled");
		} else {
			$("#load_button").addClass("disabled");
		}
		
	});
	
	$("#save_button").click(function() {
		currentSlot = selectedSlot;
		saveCookie(selectedSlot);
		$("#save_notification").html("Saved!").fadeOut(800, function() {
			$("#save_notification").html("");
			$("#save_notification").removeAttr("style");
		});
		
		var movename = $("#id_move_name")[0].value;
		var version = $("#id_move_version")[0].value;
		
		if (movename == "") movename = "???";
		if (version == "") version = "???";
		$("#slot_" + currentSlot).html("  " + movename + " v" + version);
		$("#slot_" + currentSlot).parent().addClass("activeitem3")
		$("#save_button").addClass("disabled");
		setTimeout(function() {
			$("#save_button").removeClass("disabled");
		}, 400);
	});
	
	$("#load_button").click(function() {
		if (!workSaved && !confirm("Are you sure you want to load this save? All progress will be lost.")) {
			return;
		}
		
		loadCookie(selectedSlot);
	});
	
	$("#delete_button").click(function() {
		if (!confirm("Are you sure you delete this save? This cannot be undone!")) {
			return;
		}
		
		cookies["slot_" + selectedSlot] = null;
		
		$(".save_slot").next(".save-slot#slot_" + selectedSlot).html("&ltEmpty&gt");
		document.cookie = "slot_" + selectedSlot + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
	});
	
	$("input[data-toggle!='modal']").change(function() {
		workSaved = false;
	});
});

function loadCookies() {
	var split = document.cookie.split(";");
	var finalCookie = null;
	for(var i = 0; i < split.length; i++) {
        var c = split[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c == "") continue;
        console.log(c);
        var key = c.split("=")[0];
        var value = c.split("=")[1];
        if (key == "slot_index") {
        	currentSlot = parseInt(value);
        }
        else if (key == "autosave") {
        	autosave = (value === "true");
        }
        else cookies[key] = value.substr(1, value.length - 2);
    }
	
	for (var i = 0; i < maxSaveSlots - 1; i++) {
		if (!("slot_" + i in cookies)) continue;
		
		var obj = stringToObject(cookies["slot_" + i]);
		var name = obj["name"];
		var version = obj["moveversion"];
		$("#slot_" + i).html("  " + name + " v" + version);
	}
}

function stringToObject(string) {
	var split = string.split(",");
	var obj = {};
	for (var i = 0; i < split.length; i++) {
		var s = split[i];
		
		var key = s.split(splitChar)[0];
		var value = s.split(splitChar)[1];
		value = decodeURIComponent(value.substr(1, value.length - 1));
		obj[key] = value;
	}
	return obj;
}

function getValue(id) {
	if ($("#" + id)[0].value == "") {
		return $("#" + id)[0].placeholder;
	}
	return $("#" + id)[0].value;
}