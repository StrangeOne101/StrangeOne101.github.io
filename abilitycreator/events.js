instances = [];
lastUsedEventType = "";
lastUsedScriptType = "";
lastUsedEventElement = "";

class EventType {
	
	constructor(UUID, name, classname, options) {
		this.name = name;
		this.classname = classname;
		this.canEdit = true;
		this.canMove = true;
		if (typeof options !== "undefined") {
			
			
			if (typeof options.edit !== "undefined") {
				this.canEdit = options.edit;
				console.log(options.edit);
			}
			if (typeof options.move !== "undefined") {
				this.canMove = options.move;
				console.log(options.move);
			}
		}
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
	
	/**Method to save event to the element passed.*/
	save(element) {
		
	}
	
	/**Method to edit event from the data passed.*/
	edit(data) {
		lastUsedEventElement = addEvent(lastUsedEventType, lastUsedScriptType, "", "");
		this.save(lastUsedEventElement);
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

Events.REMOVE = new EventType(2, "Remove", "Remove", {edit: false});
Events.REMOVE.save = function(element) {
	if (element == null) return;
	$(element).attr("event-value", "");
	$(element).children("div").children("span").text("Remove Ability");
}

Events.COOLDOWN = new EventType(3, "Cooldown", "Cooldown");
Events.COOLDOWN.save = function(element) {
	if (element == null) return;
	
	var value = "";
	if ($("#event_cooldown_type")[0].value == 1) {
		value = $("#event_cooldown_custom")[0].value;
	}
	
	$(element).attr("event-value", value);
	$(element).children("div").children("span").text("Apply Cooldown (" + ($("#event_cooldown_type")[0].value == 0 ? "Default" : "Custom") + ")");
	
}

Events.COOLDOWN.edit = function(data) {
	$('#modal_event_cooldown').modal('show');
	if (data == null || data == "") {
		$("#event_cooldown_type")[0].value = 0;
		$("#event_cooldown_div").addClass("hidden");
		$("#event_cooldown_custom")[0].value = "";
	} else {
		$("#event_cooldown_type")[0].value = 1;
		$("#event_cooldown_div").removeClass("hidden")
		$("#event_cooldown_custom")[0].value = data;
	}
}

Events.PARTICLES = new EventType(4, "Particles", "Particles");
Events.PARTICLES.edit = function(data) {
	$('#modal_event_particles').modal('show');
	
	
}
Events.PARTICLES.save = new function(element) {
	//Format: "XYZ|A|B|C|D|E|F
	//X = P or V
	//Y = index of particle selected
	//Z = Spawn location value. 0 or 1
	//A = Spawn count
	//B = Spawn radius
	//C = Speed
	//D = Velocity
	//E = Color
	//F = Material
	
	var data = $("#modal_particles_typetoggle_pk").hasClass("active") ? "P" : "V"; //Add P or V
	
	if ($("#modal_particles_typetoggle_pk").hasClass("active")) { 
		//If it's vanilla, loop through all of the possible particles and get the active one
		$("#particle_select_PK").children("label").each(function() {
			if ($(this).hasClass("active")) { //If it's active, put the ID of it in the data
				data = data + $(this).children("input")[0]
			}
		});
	} else {
		data = data + $("#particle_vanilla_selected")[0].value;
	}
	
	data = data + $("#particle_spawnloc")[0].value; //Add the spawn location
	data = data + "|"; //First split
	data = data + $("#particle_spawnCount")[0].value; //Add the spawn count
	data = data + "|"; //Second split
	data = data + $("#particle_spawnRadius")[0].value; //Add the spawn radius
	data = data + "|"; //Third split 
	data = data + $("#particle_spawnSpeed")[0].value; //Spawn speed particle_spawnVelX
	data = data + "|"; //4th split and velocity bellow
	data = data + $("#particle_spawnVelX")[0].value + "/" + $("#particle_spawnVelY")[0].value + "/" + $("#particle_spawnVelZ")[0].value;
	data = data + "|"; //5th split 
	data = data + $("#particle_color")[0].value; //Particle color
	data = data + "|"; //6th split 
	data = data + $("#particle_material")[0].value; //Particle material
	
	
	
	$(element).attr("event-value", data);
	$(element).children("div").children("span").text("Spawn Particles (" + ($("#event_cooldown_type")[0].value == 0 ? "Default" : "Custom") + ")");
};

Events.SOUND = new EventType(5, "Play Sound", "Play Sound");


Events.IF = new EventType(6, "If", "If condition...");
Events.IF.edit = function(data) {
	$('#modal_event_if').modal('show');
}