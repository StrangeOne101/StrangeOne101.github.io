function download(filename, text) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);
        pom.click();
}

var moveName;
var version;
var help;
var shift = false;
var click = true;
var element = "Avatar";
var range = 3;
var damage = 5;
var maxhits = 3;
var author;
var cooldown = 12000;
var damageradius = 0.6;
var speed = 0.6;
var redirect = 0;
var movementType = 0;

var listenerString = 'package com.strangewebac.abilities;\n\nimport org.bukkit.event.EventHandler;\nimport org.bukkit.event.Listener;\nimport org.bukkit.event.player.PlayerAnimationEvent;\nimport org.bukkit.event.player.PlayerToggleSneakEvent;\n\nimport com.projectkorra.projectkorra.BendingPlayer;\nimport com.projectkorra.projectkorra.ability.CoreAbility;\n\npublic class _Listener implements Listener \n{	\n	@EventHandler\n	public void onSneak(PlayerToggleSneakEvent e)\n	{\n		if (!e.isSneaking()) return;\n		if (BloodRip.isShift && !BloodRip.isClick) {\n			BendingPlayer bPlayer = BendingPlayer.getBendingPlayer(e.getPlayer());\n			if (bPlayer == null) return;\n			if (bPlayer.canBend(CoreAbility.getAbility("BloodRip"))) {\n				new BloodRip(e.getPlayer());\n			}\n		}\n	}\n	\n	@EventHandler\n	public void onClick(PlayerAnimationEvent e) {\n		if (BloodRip.isClick && (!BloodRip.isShift || e.getPlayer().isSneaking())) {\n			BendingPlayer bPlayer = BendingPlayer.getBendingPlayer(e.getPlayer());\n			if (bPlayer == null) return;\n			if (bPlayer.canBend(CoreAbility.getAbility("BloodRip"))) {\n				new BloodRip(e.getPlayer());\n			}\n		}\n	}\n}\n';
var abilityString = 'package com.strangewebac.abilities;\n\nimport java.util.List;\nimport java.util.Random;\n\nimport java.util.logging.Level;\n\nimport org.bukkit.Location;\nimport org.bukkit.entity.Entity;\nimport org.bukkit.entity.LivingEntity;\nimport org.bukkit.entity.Player;\nimport org.bukkit.util.Vector;\n\nimport com.projectkorra.projectkorra.GeneralMethods;\nimport com.projectkorra.projectkorra.ProjectKorra;\nimport com.projectkorra.projectkorra.ability.AddonAbility;\nimport com.projectkorra.projectkorra.ability.{ELEMENT}Ability;\nimport com.projectkorra.projectkorra.configuration.ConfigManager;\nimport com.projectkorra.projectkorra.util.DamageHandler;\n\npublic class {ABILITY} extends {ELEMENT}Ability implements AddonAbility\n{	\n	public static double RANGE = {RANGE};\n	public static long COOLDOWN = {COOLDOWN}L;\n	public static double MAXHITS = {MAXHITS};\n	public static double DAMAGE = {DAMAGE};\n	public static double DAMAGERADIUS = {DAMAGERADIUS};\n	public static double MOVESPEED = {SPEED};\n	\n	public static boolean isClick = {CLICK};\n	public static boolean isShift = {SHIFT};\n\n	public static Random random = new Random();\n	\n	public Location startLoc;\n	public int hits = 0;\n	public Vector direction;\n	public Location loc;\n	\n	public {ABILITY}(Player player)\n	{\n		super(player);\n		\n		if (!bPlayer.canBend(this)) {\n			remove();\n			return;\n		}\n		\n		this.startLoc = player.getLocation();\n		this.direction = player.getEyeLocation().getDirection().normalize();\n		this.loc = player.getLocation();\n		\n		start();\n	}\n	\n	@Override\n	public void progress() \n	{	\n		if (this.getLocation().distance(this.startLoc) > RANGE) {\n			remove();\n			bPlayer.addCooldown(this);\n			return;\n		}\n		\n		if (!bPlayer.canBend(this)) {\n			remove();\n			return;\n		}\n		\n		this.loc.add(direction);\n		\n		List<Entity> entities = GeneralMethods.getEntitiesAroundPoint(getLocation(), DAMAGERADIUS);\n		for (Entity e : entities) {\n			if (e instanceof LivingEntity && e.getEntityId() != player.getEntityId()) {\n				hits++;\n				DamageHandler.damageEntity(e, DAMAGE, this);\n				if (hits >= MAXHITS) {\n					bPlayer.addCooldown(this);\n					remove();\n					return;\n				}\n			}\n		}\n		\n		return;\n	}	\n\n	@Override\n	public long getCooldown() {\n		return COOLDOWN;\n	}\n\n	@Override\n	public String getName() \n	{\n		return "{ABILITY}";\n	}\n\n	@Override\n	public boolean isHarmlessAbility() \n	{\n		return false;\n	}\n\n	@Override\n	public boolean isSneakAbility() {\n		return isShift;\n	}\n\n	@Override\n	public String getAuthor() {\n		return "{AUTHOR}";\n	}\n\n	@Override\n	public String getVersion() \n	{\n		return "{VERSION}";\n	}\n\n	@Override\n	public void load() {\n		ProjectKorra.plugin.getServer().getPluginManager().registerEvents(new _Listener(), ProjectKorra.plugin);\n		\n		ProjectKorra.plugin.getLogger().log(Level.INFO, getName() + " v" + getVersion() + " by " + getAuthor() + " loaded (created by StrangeOne101\'s Ability Creator)!");\n		\n		//ConfigManager.languageConfig.get().addDefault("Abilities.Water.BloodRip.DeathMessage", "{victim} was purged by {attacker}\'s {ability}");\n		\n		ConfigManager.languageConfig.save();\n	}\n\n	@Override\n	public void stop() {\n		\n	}\n	\n	@Override\n	public String getDescription() {\n		return "{HELP}";\n	}\n\n	@Override\n	public Location getLocation() {\n		return loc;\n	}\n	\n}';
var avatarFunction = '\n    @Override\n    public boolean requireAvatar() {\n        return false;\n    }\n';

var abilityFunctions = {};
abilityFunctions["constructor"] = "public %abilityname%(Player player){super(player);\nif (!bPlayer.canBend(this)) {remove();return;}\nthis.startLoc = player.getLocation();this.direction = player.getEyeLocation().getDirection().normalize();this.loc = player.getLocation();this.oldLoc = this.loc.getBlock();\nstart();}"
abilityFunctions["methods"] = '@Override\npublic long getCooldown() {return %cooldown%L;}\n@Override\npublic String getName() {return "%abilityname%";}\n@Override\npublic boolean isHarmlessAbility() {return false;}\n@Override\npublic boolean isSneakAbility() {return isShift;}\n@Override\npublic String getAuthor() {return "%author%";}\n@Override\npublic String getVersion() {return "%version%";}\n@Override\npublic void load() {ProjectKorra.plugin.getServer().getPluginManager().registerEvents(this, ProjectKorra.plugin);\nProjectKorra.plugin.getLogger().log(Level.INFO, getName() + " v" + getVersion() + " by " + getAuthor() + " loaded (created by StrangeOne101\'s Ability Creator)!");\nString element = getElement().getName();if (getElement() instanceof SubElement) {element = ((SubElement)getElement()).getParentElement().getName();}ConfigManager.languageConfig.get().addDefault("Abilities." + element + ".%abilityname%.DeathMessage", "%deathmessage%");\nConfigManager.languageConfig.save();}\n@Override\npublic void stop() {}\n@Override\npublic String getDescription() {return "%help%";}\n@Override\npublic Location getLocation() {return loc;}';
abilityFunctions["fields"] = 'public static double RANGE = %range%;public static double MAXHITS = %maxhits%;public static double DAMAGE = %damage%;public static double DAMAGERADIUS = %damageradius%;public static double MOVESPEED = %speed%;\npublic static float PARTICLESPEED;public static int PARTICLEAMOUNT;\npublic static boolean isClick = %click%;public static boolean isShift = %shift%;\npublic static Random random = new Random();\npublic Block oldLoc;public MaterialData oldData;public List<MaterialData> newDatas = new ArrayList<MaterialData>();public int i = 0;public boolean particles = %particleboolean%;\npublic Location startLoc;public int hits = 0;public Vector direction;public Location loc;';

function getParticleDisplay() {
	var particlename = $("#id_displayfield")[0].value.split("=")[1].split(",")[0];
	var amount = $("#id_displayfield")[0].value.split("=")[1].split(",")[1];
	
	var speed = 0;
	if ($("#id_displayfield")[0].value.split("=")[1].split(",").length >= 3) speed = $("#id_displayfield")[0].value.split("=")[2].split(",")[1];
	var range = getValue("id_damageradius");
	
	if (particlename == "pk_firebending") {
		return "            com.projectkorra.projectkorra.ability.FireAbility.playFirebendingParticles(loc, " + amount + ", " + range + ", " + range + ", " + range + ");";
	} else if (particlename == "pk_airbending") {
		return "            com.projectkorra.projectkorra.ability.AirAbility.playAirbendingParticles(loc, " + amount + ", " + range + ", " + range + ", " + range + ");";
	} else if (particlename == "reddust" || particlename == "spell") {
		var r, g, b;
		if (speed.startsWith("#")) speed = speed.substring(1, speed.length - 1);
		else if (speed.startsWith("0x")) speed = speed.substring(2, speed.length - 1);
		else {
			speed = "000000";
		}
		r = parseInt(speed.substring(0, 2), 16);
		g = parseInt(speed.substring(2, 4), 16);
		b = parseInt(speed.substring(4, 6), 16);
		return "            for (int i = 0; i < " + amount + "; i++) {\n                ParticleEffect.RED_DUST.display(" + r + ", " + g + ", " + b + ", 0.004F, 0, this.loc.clone().add(Math.random() * " + range + " * 2 - " + range + ", Math.random() * " + range + " * 2 - " + range + ", Math.random() * " + range + " * 2 - " + range + "), 256);\n            }";
	} else {
		return '            ParticleEffect.fromName("' + particleName + '").display(' + range + ', ' + range + ', ' + range + ', ' + speed + ', ' + amount + ', this.loc, 256);';
	}
	
	
	
}

function save() {
	
	var finalString = abilityString.replace(/{ABILITY}/g, moveName);
	finalString = finalString.replace(/{VERSION}/g, version);
	finalString = finalString.replace(/{HELP}/g, help);
	finalString = finalString.replace(/{SHIFT}/g, shift);
	finalString = finalString.replace(/{CLICK}/g, click);
	finalString = finalString.replace(/{AUTHOR}/g, author);
	finalString = finalString.replace(/{COOLDOWN}/g, cooldown);
	finalString = finalString.replace(/{DAMAGERADIUS}/g, damageradius);
	finalString = finalString.replace(/{SPEED}/g, speed);
	finalString = finalString.replace(/{ELEMENT}/g, element);
	finalString = finalString.replace(/{DAMAGE}/g, damage);
	finalString = finalString.replace(/{RANGE}/g, range);
	finalString = finalString.replace(/{MAXHITS}/g, maxhits);
	
	if ($("#id_displayfield")[0].value.startswith("particle=")) {
		finalString = finalString.replace(/{DISPLAY}/g, getParticleDisplay());
	} else {
		finalString = finalString.replace(/{DISPLAY}/g, "");
	}
	download(moveName + ".java", finalString);
	
	download("_Listener" + ".java", listenerString.replace(/BloodRip/g, moveName));
}

function genClass() {
	var clazz = "package com.strangewebac.abilities;\n\n";
	if (abilityFunctions["imports"] != null) {
		clazz = clazz + abilityFunctions["imports"];
	}
	clazz = clazz + "\n\npublic class " + moveName + " extends " + element + "Ability implements AddonAbility, Listener\n{\n\n";
	clazz = clazz + genMethod(abilityFunctions["fields"]) + "\n\n";
	clazz = clazz + genMethod(abilityFunctions["constructor"]) + "\n\n";
	clazz = clazz + genMethod(abilityFunctions["methods"]) + "\n\n";
	clazz = clazz + "\n}";
	
	clazz = clazz.replace("%movename%", moveName);
	clazz = clazz.replace("%author%", author);
	clazz = clazz.replace("%version%", version);
	clazz = clazz.replace("%help%", help);
	clazz = clazz.replace("%cooldown%", cooldown);
	clazz = clazz.replace("%element%", element);
	clazz = clazz.replace("%shift%", shift);
	clazz = clazz.replace("%click%", click);
	clazz = clazz.replace("%speed%", speed);
	clazz = clazz.replace("%range%", range);
	clazz = clazz.replace("%damage%", damage);
	clazz = clazz.replace("%maxhits%", maxhits);
	return clazz;
}

function loadVars() {
	moveName = $("#id_move_name")[0].value;
	author = $("#id_move_author")[0].value;
	version = $("#id_move_version")[0].value;
	help = $("#id_move_help")[0].value;
	cooldown = parseFloat($("#id_cooldown")[0].value) * 1000;
	element = getCodeElement($("#id_element")[0].value, $("#id_subelement")[0].value);
	shift = $("#abilityMovement_Shift").hasClass("active") || $("#abilityMovement_Both").hasClass("active");
	click = $("#abilityMovement_Click").hasClass("active") || $("#abilityMovement_Both").hasClass("active");
	speed = parseFloat($("#id_movementspeed")[0].value) / 20;
	range = parseFloat($("#id_range")[0].value);
	damage = parseFloat($("#id_damage")[0].value) / 2;
	maxhits = parseFloat($("#id_maxhits")[0].value) / 2;
}

function genMethod(methodstring) {
	var s = "\t";
	var indentation = 0;
	var newline = false;
	var split = methodstring.replace("\\n", "\n").split("");
	for (var i in split) {
		var char = split[i];
		if (char == "}") {
			indentation--;
		}
		if (newline || char == "\n") {
			var nl = "\n"
			if (char == "\n") {
				if (newline) nl = nl + nl;
				char = "";
			}
			s = s + nl + getIndentation(indentation) + char;
			newline = false;
		} else {
			s = s + char;
		}
		
		if (char == "{") {
			indentation++;
		}
		
		if (char == "{" || char == "}" || char == ";") {
			newline = true;
		}
		
	}
	return s;
}

function getIndentation(indent) {
	var s = "";
	for (var i = 0; i < indent + 1; i++) {
		s = "\t" + s;
	}
	return s;
}


function canExport() {
	var b = true;
	$("input.required").each(function() {
		if (!b) return;
		if (this.value == "") b = false;
		if ($(this).parent().hasClass("has-error")) b = false;
	});
	if (!b) return false;
	$("input.not-empty").each(function() {
		if (this.value == "") b = false;
	});
	if (!b) return false;
	$("input.no-whitespace").each(function() {
		if (!b) return;
		if (this.value.indexOf(" ") > -1) b = false;
	});
	if (!b) return false;
	$("input[type='number]'").each(function() {
		if (!b) return;
		if (isNaN(parseFloat(this.value))) b = false;
	});
	return b;
}

function forceUpdate() {
	$("input").focusout();
}

function getValue(id) {
	if ($("#" + id)[0].value == "") {
		return $("#" + id)[0].placeholder;
	}
	return $("#" + id)[0].value;
}

$(document).ready(function() {
	moveName = $("#id_move_name")[0].placeholder;
	version = $("#id_move_author")[0].placeholder;
	help = $("#id_move_help")[0].placeholder;
	author = $("#id_move_author")[0].placeholder;
	
	$("input[data-toggle!='modal']").change(function() {
		if (!canExport()) {
			$("#export_error").html("You must complete all forms in order to export!");
			forceUpdate();
		} else {
			$("#export_error").html("");
		}
		
		if ($("#export_checkbox")[0].checked && canExport()) {
			$(".download-files").removeClass("disabled");
		} else {
			$(".download-files").addClass("disabled");
		}
	});
	
	$("#download_listener").click(function() {
		if (!canExport() || !$("#export_checkbox")[0].checked) {
			alert("You cannot download this until you have agreed to the terms and have filled out the form!");
		} else {
			
		}
	});
	
	$("#download_ability").click(function() {
		if (!canExport() || !$("#export_checkbox")[0].checked) {
			alert("You cannot download this until you have agreed to the terms and have filled out the form!");
		}
	});
	
	$("#download_test").click(function() {
		if (!canExport() || !$("#export_checkbox")[0].checked) {
			alert("You cannot download this until you have agreed to the terms and have filled out the form!");
		} else {
			loadVars();
			download(moveName + ".java", genClass());
		}
	});
});

