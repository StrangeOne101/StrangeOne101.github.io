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
	
	if (data != null && data != "") {
		var text = atob(data);
		myCodeMirror.setValue(text.replace("\\n", "\n"));
	} else {
		myCodeMirror.setValue("//Run a custom script. This runs in the 'progress()' method so you can still use objects like 'player' and 'bPlayer'\n//Remember that this is in the progress() method so method creation will throw errors.\n");
	}
	//myCodeMirror.save();
	
	setTimeout(function() {
		myCodeMirror.refresh(); //Refresh after 200ms due to timing issues
	}, 200);
};

Events.SCRIPT.save = function(element) {
	$('#modal_event_script').modal('hide');
	if (element != null) {
		var text = btoa(myCodeMirror.getValue());
		$(element).attr("event-value", text);
		$(element).children("div").children("span").text("Run Java Code (" + myCodeMirror.getValue().split("\n").length + " lines)");
	}
	myCodeMirror.setValue("");
	myCodeMirror.save();
};