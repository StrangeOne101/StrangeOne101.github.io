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
	$('#modal_event_explosion').modal('show');
	
	if (data != null && data != "") {
		var radius = data.substr(0, data.length - 2);
		$("#modal_explosion_radius")[0].value = radius;
		
		if (data.substr(data.length - 2, 1) == "T") {
			$("#modal_explosion_db_true").addClass("active");
			$("#modal_explosion_db_false").removeClass("active");
		} else {
			$("#modal_explosion_db_false").addClass("active");
			$("#modal_explosion_db_true").removeClass("active");
		}
		
		if (data.substr(data.length - 1, 1) == "T") {
			$("#modal_explosion_cf_true").addClass("active");
			$("#modal_explosion_cf_false").removeClass("active");
		} else {
			$("#modal_explosion_cf_false").addClass("active");
			$("#modal_explosion_cf_true").removeClass("active");
		}
	} else { //Restore defaults
		$("#modal_explosion_db_true").addClass("active");
		$("#modal_explosion_db_false").removeClass("active");
		
		$("#modal_explosion_cf_false").addClass("active");
		$("#modal_explosion_cf_true").removeClass("active");
		
		$("#modal_explosion_radius")[0].value = "";
	}
};
Events.EXPLOSION.save = function(element) {
	if (element == null) return;
	var value = $("#modal_explosion_radius")[0].value;
	
	value = value + ($("#modal_explosion_db_true").hasClass("active") ? "T" : "F");
	value = value + ($("#modal_explosion_cf_true").hasClass("active") ? "T" : "F");
	
	$(element).attr("event-value", value);
	$(element).children("div").children("span").text("Create Explosion (with a radius of " + $("#modal_explosion_radius")[0].value + " blocks)");
}

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