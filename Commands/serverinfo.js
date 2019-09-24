const Discord = require ("discord.js");

module.exports.run = async (bot, message, args) => {
		let sIcon = message.guild.iconURL;
		let serverEmbed = new Discord.RichEmbed()
		.setDescription("Server Information")
		.setColor("#724c6e")
		.setThumbnail(sIcon)
		.addField("Server Name", message.guild.name)
		.addField("Created On", message.guild.createdAt)
		.addField("You Joined", message.member.joinedAt)
		.addField("Total Members", message.guild.memberCount);
		return message.channel.send(serverEmbed);	
}

module.exports.help = {
	name: "serverinfo"	
}