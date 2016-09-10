acversion = "Beta 1.1.2"
	
	
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

class EventType {
	
	constructor(UUID, name, classname) {
		this.name = name;
		this.classname = classname;
	}
	
	/**Get EventType from name*/
	static getEventType(name) {
		for (var i in instances) {
			if (instances[i].name.toLowerCase() == name.toLowerCase()) {
				return instances[i];
			}
		}
		return null;
	}
	
	/**Method to edit event from the data passed.*/
	edit(data) {
		
	}
	
	/**Method to save event to the element passed.*/
	save(element) {
		
	}
	
}

/**Adds an event to either the step list or the collision list. Arguments are: 
 * listType - The type of list it should be added to. "step" or "collision"
 * type - Should be a type enum
 * text - What the event should display for text
 * value - Data of the event
 * */

function addEvent(listtype, type, text, value) {

}
