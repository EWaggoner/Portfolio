const Discord = require ("discord.js");

module.exports.run = async (bot, message, args) => {
		let bIcon = bot.user.displayAvatarURL;
		let botEmbed = new Discord.RichEmbed()
		.setDescription("Bot Information")
		.setColor("#724c6e")
		.setThumbnail(bIcon)
		.addField("Bot Name", bot.user.username)
		.addField("Created On", bot.user.createdAt);
		return message.channel.send(botEmbed);
}

module.exports.help = {
	name: "botinfo"	
}