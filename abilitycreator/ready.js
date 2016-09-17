var myCodeMirror;

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
		$("#element-selected").children("img").attr("src", $(this).children("img").attr("src"));
		$("#element-selected").children("span").text($(this).children("input").attr("title"));
		
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
	
	$('.particle-selector-vanilla').mouseup(function() {
		$("#particles-selected-vanilla").children("img").attr("src", $(this).children("img").attr("src"));
		$("#particles-selected-vanilla").children("span").text($(this).children("input").attr("title"));
	});
	
	/*var myCodeMirror = CodeMirror($("#java-editor")[0], {
		  value: "//Run a custom script. This runs in the 'progress()' method so you can still use objects like 'player' and 'bPlayer'",
		  mode:  "java"
		});*/
	
	myCodeMirror = CodeMirror.fromTextArea($("#java-editor")[0], {
		lineNumbers: true,
	    mode: "text/x-java",
	    indentWithTabs: true,
	    lineWrapping: true,
	});
	myCodeMirror.refresh();
	
});