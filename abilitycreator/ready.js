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
	     handle: '.glyphicon-resize-vertical', 
	     /*update: function() {
	    	 $('.panel', $("#step_events")).each(function(index, elem) {
	         	var $listItem = $(elem),
	            newIndex = $listItem.index();

	                    
	         });
	     },*/
	     axis: 'y',
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
	
});