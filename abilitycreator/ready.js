var myCodeMirror;

var e;

$(document).ready(function() {
	
	$("#globalVersion").text(acversion.toUpperCase());
	
	/*$("#id_element").change(function() {
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
	});*/
	
	$('[data-toggle="tooltip"]').tooltip(); 
	$('[rel="tooltip"]').tooltip(); 
	$("span").tooltip({
		   placement: "bottom"
	 }); 
	 $("#step_events").sortable({
		 
		 // Only make the .panel-heading child elements support dragging.
	    // Omit this to make then entire <li>...</li> draggable.
	     handle: '.moveable', 
	     /*update: function() {
	    	 $('.panel', $("#step_events")).each(function(index, elem) {
	         	var $listItem = $(elem),
	            newIndex = $listItem.index();

	                    
	         });
	     },*/
	     axis: 'y',
	     cursor: 'move',
	    containment: '#step_events',
	 });
	$('.element-selector').mouseup(function() {
		$(".element-selected").children("img").attr("src", $(this).children("img").attr("src"));
		$(".element-selected").children("span").text($(this).children("input").attr("title"));
		
		var val = $(this).children("input").attr("value");
		if (val == "5") {
			$("#id_subelement").html('<option value="0">Yes</option><option value="1">No</option>');
			$("#id_element_option").html("Require Avatar");
		} else {
			var s = "";
			for (var i = 0; i < getSubs(val).length; i += 1) {
				s = s + "<option value=\"" + i + "\">" + getSubs(val)[i] + "</option>";
			}
			$("#id_subelement").html(s);
			$("#id_element_option").html("Subelement");
		}
	});
	
	$(".event-btn").mouseup(function(obj) {
		var scriptType = $(this).attr("script-type");
		if (scriptType != null) {
			var event = EventType.getEventType(scriptType);
			if (event != null) {
				lastUsedEventElement = null;
				lastUsedScriptType = scriptType;
				lastUsedEventType = $(this).attr("event-type").toLowerCase();
				event.edit("");
			}
		}
	});
	
	$(document).on("click", ".event-edit-btn", function(obj) {
		var scriptType = $(this).parent().parent().attr("script-type");
		console.log("Attr: " + scriptType + " | " + $(this).parent())
		if (scriptType != null) {
			var event = EventType.getEventType(scriptType);
			if (event != null && $(this).parent().parent().get(0).hasAttribute("event-value")) {
				lastUsedEventElement = $(this).parent().parent();
				lastUsedScriptType = scriptType;
				lastUsedEventType = $(this).parent().parent().attr("event-type").toLowerCase();
				event.edit($(this).parent().parent().attr("event-value"));
				
			}
		}
	});
	
	$(document).on("click", ".event-del-btn", function(obj) {
		var scriptType = $(this).parent().parent().attr("script-type");
		if (scriptType != null) {
			var event = EventType.getEventType(scriptType);
			if (event != null) {
				lastUsedEventElement = $(this).parent().parent();
				lastUsedScriptType = scriptType;
				lastUsedEventType = $(this).parent().parent().attr("event-type").toLowerCase();
				$("#step-del-dialog").dialog("open");
			} else {
				alert("Error: Cannot delete incomplete element!")
			}
		}
	});
	
	$(".event-save-btn").mouseup(function(obj) {
		var scriptType = $(this).attr("script-type");
		if (scriptType != null) {
			var event = EventType.getEventType(scriptType);
			if (event != null) {
				if (lastUsedEventElement == null) {
					lastUsedEventElement = addEvent(lastUsedEventType, lastUsedScriptType, "", "");
					
				}
				event.save(lastUsedEventElement);
			}
		}
	});
	
	$("#step-del-dialog").dialog({
		autoOpen: false,
		resizable: false,
	    height: "auto",
	    width: 400,
	    modal: true,
	    buttons: {
	        "Confirm": function() {
	        	$(this).dialog("close");
	        	if (lastUsedEventElement != null) {
	        		lastUsedEventElement.remove();
	        		
	        		if ($("#step_events").children().length == 0) {
	        			$("#step_events").append("<li id='step_event_empty' style='background-color: #eee'>Empty :(</li>");
	        		}
	        	} else {
	        		alert("Error: Cannot delete null!");
	        	}
	        },
	        Cancel: function() {
	        	$(this).dialog("close");
	        }
	    }
	});
	
	$("#event_cooldown_type").change(function() {
		var v = $("#event_cooldown_type")[0].value;
		if (v == "1") {
			$("#event_cooldown_div").removeClass("hidden")
		} else {
			$("#event_cooldown_div").addClass("hidden")
		}
	});
	
	/**Particles Modal**/
	
	$("#modal_particles_typetoggle_pk").click(function() {
		$("#event_particle_pk_div").removeClass("hidden");
		$("#event_particle_vanilla_div").addClass("hidden");
	});
	
	$("#modal_particles_typetoggle_vanilla").click(function() {
		$("#event_particle_vanilla_div").removeClass("hidden");
		$("#event_particle_pk_div").addClass("hidden");
	});
	
	$('.particle-selector-pk').mouseup(function() {
		$("#particles-selected-pk").children("img").attr("src", $(this).children("img").attr("src"));
		$("#particles-selected-pk").children("span").text($(this).children("input").attr("title"));
	});
	
	$('#particle_vanilla_selected').change(function() {
		var selected = $("#particle_vanilla_selected").children().get(this.value);
		console.log("Testing! Bananananananas! " + selected);
		$("#particles-selected-vanilla").children("img").attr("src", $(selected).attr("img"));
		$("#particles-selected-vanilla").children("span").text($(selected).text());
		var px = $(selected).text().length;
		px = px > 12 ? "22px" : (px > 10 ? "24px" : "28px");
		$("#particles-selected-vanilla").children("span").attr("style", "font-family: inherit; font-weight: 100; font-size: " + px);
	});
	
	/*var myCodeMirror = CodeMirror($("#java-editor")[0], {
		  value: "//Run a custom script. This runs in the 'progress()' method so you can still use objects like 'player' and 'bPlayer'",
		  mode:  "java"
		});*/
	
	$("#event_if_condition").change(function() {
		var index = $("#event_if_condition")[0].selectedIndex;
		e = this;
		var ifvalue = this.options[index].getAttribute("if-value");
		var split1 = ifvalue.split(":")[0];
		var split2 = ifvalue.split(":")[1];
		$("#event_if_select_div").addClass("hidden");
		$("#event_if_field_div").addClass("hidden");
		if (split1 == "field") {
			$("#event_if_field_div").removeClass("hidden");
			$("#event_if_field").text(split2);
		} else if (split1 == "select") {
			$("#event_if_select_div").removeClass("hidden");
			var splits = split2.split("|");
			var s = "";
			for (var s1 in splits) {
				s = s + "<option value='" + s1 + "' >" + splits[s1] + "</option>" + "\n";
			}
			$("#event_if_select_value")[0].innerHTML = s;
		} else if (split1 == "selectfield") {
			$("#event_if_select_div").removeClass("hidden");
			$("#event_if_field_div").removeClass("hidden");
			var fieldText = split2.split("||")[1];
			var splits = split2.split("||")[0].split("|");
			var s = "";
			for (var s1 in splits) {
				s = s + "<option value='" + s1 + "' >" + splits[s1] + "</option>" + "\n";
			}
			$("#event_if_select_value")[0].innerHTML = s;
			$("#event_if_field").text(fieldText);
		}
		console.log(ifvalue);
	});
	
	//Force update
	$("#event_if_condition").change();
	
	myCodeMirror = CodeMirror.fromTextArea($("#java-editor")[0], {
		lineNumbers: true,
	    mode: "text/x-java",
	    indentWithTabs: true,
	    lineWrapping: true,
	});
	myCodeMirror.refresh();
	
	$("#particle_spawnCount").change(function() {
		var count = $("#particle_spawnCount")[0].value;
		if (count == "1") {
			$("#particle_spawnRadiusGroup").addClass("hidden");
			$("#particle_spawnVelocityGroup").removeClass("hidden");
			$("#particle_spawnSpeedGroup").removeClass("hidden");
		} else {
			$("#particle_spawnRadiusGroup").removeClass("hidden");
			$("#particle_spawnVelocityGroup").addClass("hidden");
			$("#particle_spawnSpeedGroup").addClass("hidden");
		}
	});
	
	$("#particle_vanilla_selected").change(function() {
		var option = $($("#particle_vanilla_selected")[0].selectedOptions[0]);
		console.log(option.attr("req"));
		
		if ($("#particle_vanilla_selected")[0].selectedIndex == 5) {
			$("#particle_spawnCount")[0].value = 1;
			$("#particle_spawnCount").change();
			$("#particle_spawnVelX").attr("disabled", true);
			$("#particle_spawnVelY").attr("disabled", true);
			$("#particle_spawnVelZ").attr("disabled", true);
		} else {
			$("#particle_spawnVelX").removeAttr("disabled");
			$("#particle_spawnVelY").removeAttr("disabled");
			$("#particle_spawnVelZ").removeAttr("disabled");
		}
		if (typeof option.attr("req") !== typeof undefined) {
			if (option.attr("req") == "color") {
				$("#particle_colorGroup").removeClass("hidden");
			} else {
				$("#particle_colorGroup").addClass("hidden");
			}
			
			if (option.attr("req") == "item") {
				$("#particle_blockGroup").removeClass("hidden");
				$("#particle_material").removeClass("spigot-blocks");
				$("#particle_material").addClass("spigot-item");
				updateSpigotFields();
			} else if (option.attr("req") == "block"){
				$("#particle_blockGroup").removeClass("hidden");
				$("#particle_material").removeClass("spigot-items");
				$("#particle_material").addClass("spigot-blocks");
				updateSpigotFields();
			} else {
				$("#particle_blockGroup").addClass("hidden");
				$("#particle_material").removeClass("spigot-items");
				$("#particle_material").removeClass("spigot-blocks");
			}
		}  else {
			$("#particle_colorGroup").addClass("hidden");
			$("#particle_blockGroup").addClass("hidden");
		}
	});
	
	updateSpigotFields();
	
});

function updateSpigotFields() {
	$("select.spigot-materials").each(function() {
		var s = "";
		var blocks = Materials.getBlocks();
		for (var i in blocks) {
			s = s + "<option value=\"" + blocks[i] + "\">" + blocks[i] + "</option>\n"; 
		}
		
		var s1 = "";
		var items = Materials.getItems();
		for (var i in items) {
			s1 = s1 + "<option value=\"" + items[i] + "\">" + items[i] + "</option>\n"; 
		}
		
		this.innerHTML = "<option></option><optgroup label=\"Blocks\">" + s + "</optgroup>" + "<optgroup label=\"Items\">" + s1 + "</optgroup>";
	});
	
	$("select.spigot-materials").select2({
		placeholder: "STONE",
		allowClear: true
	});
	
	$("select.spigot-blocks").each(function() {
		var s = "";
		var blocks = Materials.getBlocks();
		for (var i in blocks) {
			s = s + "<option value=\"" + blocks[i] + "\">" + blocks[i] + "</option>\n"; 
		}
		this.innerHTML = "<option></option><optgroup label=\"Blocks\">" + s + "</optgroup>";
	});
	
	$("select.spigot-blocks").select2();
	
	$("select.spigot-items").each(function() {
		var s = "";
		var items = Materials.getItems();
		for (var i in items) {
			s = s + "<option value=\"" + items[i] + "\">" + items[i] + "</option>\n"; 
		}
		this.innerHTML = "<option></option><optgroup label=\"Items\">" + s + "</optgroup>";
	});
	
	$("select.spigot-items").select2();
	
	
	$("select.spigot-sounds").each(function() {
		var s = "";
		for (var i in Materials.keys()) {
			s = s + "<option value=\"" + Sounds.keys()[i] + "\">" + Sounds.keys()[i] + "</option>\n"; 
		}
		this.innerHTML = s;
	});
	
	$("select.spigot-sounds").select2();
}