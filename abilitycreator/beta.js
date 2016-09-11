acversion = "Beta 1.1.3"
	
	
/**Returns the subelements in a list depending on the index of the element passed. Air is 0, 
 * Earth is 1, Fire is 2, Water is 3, Chi is 4 and Avatar is 5*/
function getSubs(elementValue) {
	if (elementValue == "0") return ["None", "Flight", "Spiritual Projection"];
	if (elementValue == "1") return ["None", "Sand", "Metal", "Lava"];
	if (elementValue == "2") return ["None", "Lightning", "Combustion"];
	if (elementValue == "3") return ["None", "Ice", "Plant", "Blood", "Healing"];
	if (elementValue == "4") return ["None"];
	if (elementValue == "5") return ["Yes", "No"];
	return null;
}



/**Adds an event to either the step list or the collision list. Arguments are: 
 * listType - The type of list it should be added to. "step" or "collision"
 * type - Should be a type enum
 * text - What the event should display for text
 * value - Data of the event
 * */

function addEvent(listtype, type, text, value) {
	var element = null;
	if (listtype == "step") {
		element = $("#step_events");
	} else if (listtype == "collision") {
		element = $("#collision_events");
	}
	
	if (element != null) {
		element.append("<li class='' event-type='" + listtype + "' script-type='" + type + "' event-value='" + value + "'><div class='col-lg-6'><span>" + text + "</span></div><div class='col-lg-6' style='float: right'><div class='btn btn-primary event-edit-btn'>Edit</div> <div class='btn btn-default moveable'><i class='glyphicon glyphicon-move'>" +
				"</i></div></div></li>");
		return element.children().get(element.children().length - 1);
		
	} else {
		alert("Error: Event created with invalid event type! Must be 'step' or 'collision'!");
		return null;
	}
}
