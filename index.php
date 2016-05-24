<!DOCTYPE html>
<head>
  <link href='http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css' rel='stylesheet' type='text/css'>
  <!-- <link href='//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.2.0/css/datepicker.min.css' rel='stylesheet' type='text/css'>-->
  <link href='http://cdnjs.cloudflare.com/ajax/libs/bootstrap-switch/1.8/css/bootstrap-switch.css' rel='stylesheet' type='text/css'>
  <!-- <link href='http://davidstutz.github.io/bootstrap-multiselect/css/bootstrap-multiselect.css' rel='stylesheet' type='text/css'>-->
  <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js' type='text/javascript'></script>
  <script src='http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.0/js/bootstrap.min.js' type='text/javascript'></script>
  <!--  <script src='//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.2.0/js/bootstrap-datepicker.min.js' type='text/javascript'></script>-->
  <script src='http://cdnjs.cloudflare.com/ajax/libs/bootstrap-switch/1.8/js/bootstrap-switch.min.js' type='text/javascript'></script>
  <!-- <script src='http://davidstutz.github.io/bootstrap-multiselect/js/bootstrap-multiselect.js' type='text/javascript'></script>-->
  <script src="code.js" type='text/javascript'></script>
</head>
<body>
  <div class='container'>
      <div class='heading'>
        <h2>ProjectKorra Ability Creator - Made by StrangeOne101</h2>
      </div>
      <div class='panel-body'>
        <form class='form-horizontal'>
          
         <div class='row'>
           <div class="col-sm-6" style="border-right: 1px solid rgb(238, 238, 238);">
           	<!-- <h4>Ability Info</h4> -->
           	<div class='form-group'>
           	  <label class="control-label col-sm-3" for="id_move_name">Name</label>
           	  <div class="col-sm-9">
           	    <input class='form-control' id='id_move_name' placeholder='MagicBlast' type='text'>
           	  </div>
          	</div> 
          	<div class='form-group'>
           	  <label class="control-label col-sm-3" for="id_move_author">Author</label>
           	  <div class="col-sm-9">
           	    <input class='form-control' id='id_move_author' placeholder='Notch' type='text'>
           	  </div>
           	</div>
           	<div class='form-group'>
           	  <label class="control-label col-sm-3" for="id_move_version">Version</label>
          	  <div class="col-sm-9">
          	    <input class='form-control' id='id_move_version' placeholder='1.0' value="1.0" type="number" min="0.1" step="0.1">
          	  </div>
          	</div>
          	<div class='form-group'>
           	  <label class="control-label col-sm-3" for="id_move_help">Help Info</label>
           	  <div class="col-sm-9">
           	    <input class='form-control' id='id_move_help' placeholder='Click to fire a beam of magic!' type='text'>
           	  </div>
           	</div>
           	
           	<hr>
           	
           	<!-- <h4>Ability Settings</h4> -->
           	<div class='form-group'>
           	  <label class="control-label col-sm-3" for="id_element">Element</label>
           	  <div class="col-sm-9">
           	    <select class='form-control' id='id_element'>
           	      <option>Air</option>
                  <option>Earth</option>
                  <option>Fire</option>
            	  <option>Water</option>
                  <option>Chi</option>
                  <option>Avatar</option>
           	    </select>
           	  </div>
           	</div>
           	<div class='form-group'>
           	  <label class="control-label col-sm-3" for="id_subelement" id="id_element_option">Subelement</label>
           	  <div class="col-sm-9">
           	    <select class='form-control' id='id_subelement'>
             	  <option value="0">None</option>
             	  <option value="1">Flight</option>
             	  <option value="2">Spiritual Projection</option>
           	    </select>
           	  </div>
           	</div>
           	<div class='form-group'>
           	  <label class="control-label col-sm-3" for="id_cooldown">Cooldown</label>
           	  <div class="col-sm-9">
           	    <input class='form-control' id='id_cooldown' placeholder='Seconds' type='number' min="0" step="1" max="3600" >
        	  </div>
        	</div>
        	<div class='form-group'>
           	  <label class="control-label col-sm-3">Function</label>
           	    <div class="btn-group col-sm-9" data-toggle="buttons" >
           	      <label class="btn btn-default radio-inline-btn active col-sm-3" id="abilityFunction_Move">
           	        <input type="radio" value="1" required="required" checked="checked" onclick="btnSelect(this);">
           	        Move
           	      </label>
           	      <label class="btn btn-default radio-inline-btn col-sm-3" id="abilityFunction_Other" >
           	        <input type="radio" value="2" required="required" disabled="disabled" onclick="btnSelect(this);">
           	        Other
           	      </label>
           	    
           	    <label class="col-sm-offset-1" style="padding-top:6px;color:#AAA;font-weight:normal">More coming soon!</label>
        	</div>
        	</div>
        	
        	<hr>
        	
        	<!-- <h4>Movement</h4> -->
        	<div class='form-group'>
        	  <label class="control-label col-sm-3" for="id_movementtype">Move Start</label>
           	    <div class="btn-group col-sm-9" data-toggle="buttons" id="id_movementtype">
           	      <label class="btn btn-default radio-inline-btn active col-sm-4" id="abilityMovement_Click">
           	        <input type="radio" value="1" required="required" checked="checked">
           	        Click
           	      </label>
           	      <label class="btn btn-default radio-inline-btn col-sm-4" id="abilityMovement_Sneak" >
           	        <input type="radio" value="2" required="required">
           	        Sneak
           	      </label>
           	      <label class="btn btn-default radio-inline-btn col-sm-4" id="abilityMovement_Both" >
           	        <input type="radio" value="3" required="required">
           	        Both
           	      </label>
           	    </div>
        	  </div>
        	<div class='form-group'>
        	  <label class="control-label col-sm-3" for="id_movementtype2">Movement Type</label>
           	  <div class="btn-group col-sm-9" data-toggle="buttons" id="id_movementtype2">
           	    <label class="btn btn-default radio-inline-btn active col-sm-4" id="abilityMovement2_None">
           	      <input type="radio" value="1" required="required">
           	      None
           	    </label>
           	    <label class="btn btn-default radio-inline-btn col-sm-4" id="abilityMovement2_Block" >
           	      <input type="radio" value="2" required="required" checked="checked">
           	      Block
           	    </label>
           	    <label class="btn btn-default radio-inline-btn col-sm-4" id="abilityMovement2_Particles" >
           	      <input type="radio" value="3" required="required">
           	      Particles
           	    </label>
           	  </div>
        	</div>
        	  
        	<div class='form-group'>
           	  <label class="control-label col-sm-3" for="id_movementspeed">Speed (BPS)</label>
           	  <div class="col-sm-9">
           	    <input class='form-control' id='id_movementspeed' placeholder='Blocks per second' type='number' min="0" step="0.5" max="20" value="5">
        	  </div>
        	</div>
        	  
        	<div class='form-group'>
           	  <label class="control-label col-sm-3" for="id_range">Range</label>
           	  <div class="col-sm-9">
           	    <input class='form-control' id='id_range' placeholder='20' type='number' min="0" step="1" max="50" value="20">
        	  </div>
        	</div>
        	
        	<div class='form-group'>
        	  <label class="control-label col-sm-3" for="id_redirect">Redirect</label>
           	  <div class="btn-group col-sm-9" data-toggle="buttons" id="id_redirect">
           	    <label class="btn btn-default radio-inline-btn active col-sm-4" id="abilityRedirect_Never">
           	      <input type="radio" value="1" class="btn line1">
           	      Never
           	    </label>
           	    <label class="btn btn-default radio-inline-btn col-sm-4" id="abilityRedirect_Click" >
           	      <input type="radio" value="2" checked="checked" class="btn line1">
           	      On Click
           	    </label>
           	    <label class="btn btn-default radio-inline-btn col-sm-4" id="abilityRedirect_Sneak" >
           	      <input type="radio" value="3" class="btn line1">
           	      On Sneak
           	    </label>
           	    <label class="btn btn-default radio-inline-btn col-sm-6" id="abilityRedirect_Both" >
           	      <input type="radio" value="4" class="btn line2">
           	      Sneak + Click
           	    </label>
           	    <label class="btn btn-default radio-inline-btn col-sm-6" id="abilityRedirect_Always" >
           	      <input type="radio" value="5" class="btn line2">
           	      Constantly
           	    </label>
           	  </div>
        	</div>
        	
          </div>
            
          <div class="col-sm-6">
          <!-- <h4>Damage</h4> -->
        	<div class='form-group'>
           	  <label class="control-label col-sm-3" for="id_damage">Damage</label>
           	  <div class="col-sm-9">
           	    <input class='form-control' id='id_damage' placeholder='Damage in Hearts' type='number' min="0" step="0.5" max="20" value="1.5">
        	  </div>
        	</div>
        	
        	<div class='form-group'>
           	  <label class="control-label col-sm-3" for="id_maxhits">Max Hits</label>
           	  <div class="col-sm-9">
           	    <input class='form-control' id='id_maxhits' placeholder='1' type='number' min="1" step="1" max="20" value="1">
        	  </div>
        	</div>
        	
        	<div class='form-group'>
           	  <label class="control-label col-sm-3" for="id_deathmessage">Death Message</label>
           	  <div class="col-sm-9">
           	    <input class='form-control' id='id_deathmessage' placeholder="{PLAYER} was murdered by {KILLER} using {ABILITY}" type='text' value="{PLAYER} was murdered by {KILLER} using {ABILITY}">
        	  </div>
        	</div>
        	
        	
        	
          </div>
        </div> <!-- Row end -->
      </div>
    </div>