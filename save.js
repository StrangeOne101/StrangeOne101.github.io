var currentSlot = 0;
var acv = 0.1;

var splitChar = ":";

var saveSlots = [];

function saveCookie(slot) {
	if (slot > 19 || slot < 0) return false;
	
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
	
	if (currentSlot == slot) {
		object["default"] = true;
	}
	
	var cookiestring = "{";
	for (var s in object) {
		cookiestring = cookiestring + s + ":\"" + object[s] + "\",";
	}
	cookiestring = cookiestring.substr(0, cookiestring.length -1) + "}"

	var d = new Date();
    d.setTime(d.getTime() + (365.25*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "slot_" + slot + "=" + cookiestring + "; " + expires;
	
	return cookiestring;
}


function readCookie(slot) {
	var cookies = document.cookie.split(";");
	var finalCookie = null;
	for(var i = 0; i < cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf("slot_" + slot) == 0) {
            finalCookie = c.substring(("slot_" + slot).length, c.length);
            break;
        }
    }
	if (finalCookie == null) return false;
	var split = finalCookie.split(",");
	var version = null;
	for (var i = 0; i < split.length; i++) {
		var s = split[i];
		
		var key = s.split(splitChar)[0];
		var value = s.split(splitChar)[1];
		
		if (key == "acv") {version = parseFloat(value); continue;}
		
		if (version >= 0.1) {
			
		}
		
	}
}