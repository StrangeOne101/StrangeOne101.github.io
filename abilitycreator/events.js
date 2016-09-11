instances = [];
lastUsedEventType = "";
lastUsedScriptType = "";
lastUsedEventElement = "";

class EventType {
	
	constructor(UUID, name, classname) {
		this.name = name;
		this.classname = classname;
		instances.push(this);
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

Events = {};

Events.EXPLOSION = new EventType(0, "Explosion", "Explosion");
Events.EXPLOSION.edit = function(data) {
	
};

Events.SCRIPT = new EventType(1, "Script", "Script");
Events.SCRIPT.edit = function(data) {
	$('#modal_event_script').modal('show');
	myCodeMirror.refresh();
	if (data != null && data != "") {
		var text = atob(data);
		$("#java-editor")[0].innerHTML = data.replace("\\n", "\n");
	}
};

Events.SCRIPT.save = function(element) {
	$('#modal_event_script').modal('hide');
	if (element != null) {
		var text = btoa($("#java-editor")[0].innerHTML);
		$(element).attr("event-value", text);
		$(element).children("div").children("span").text("Run Java Script (" + $("#java-editor")[0].innerHTML.split("\n").length + " lines)");
	}
	$("#java-editor")[0].innerHTML = "";
};