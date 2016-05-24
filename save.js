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
	download(moveName + ".java", finalString);
	
	download("_Listener" + ".java", listenerString.replace(/BloodRip/g, moveName));
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

$(document).ready(function() {
	moveName = $("#id_move_name")[0].placeholder;
	version = $("#id_move_author")[0].placeholder;
	help = $("#id_move_help")[0].placeholder;
	author = $("#id_move_author")[0].placeholder;
});

