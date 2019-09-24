const Discord = require ("discord.js");

module.exports.run = async (bot, message, args, connection) => {
let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
connection.query(`USE stats`);
connection.query(`SELECT * FROM credits WHERE id = '${target.id}'`,(err,rows) => {
	if(err) throw err;
	let credits = rows[0].credits;
	if(rows[0] == null) return message.channel.send("This user has no credits on record.");
	message.channel.send(credits);
	});
}	

module.exports.help = {
	name: "credits"	
}
/*
	let coinEmbed = new Discord.RichEmbed()
		.setAuthor(message.author.username)
		.setColor("#ddf9d9")
		.addField("✨", uCoins);
*/
/*

	if(!coins[message.author.id]){		//set coins if no coins
		coins[message.author.id] = {
			coins: 0
		};
	}
	
	let uCoins = coins[message.author.id].coins;
	let coinEmbed = new Discord.RichEmbed()
		.setAuthor(message.author.username)
		.setColor("#ddf9d9")
		.addField("✨", uCoins);	
		
	message.channel.send(coinEmbed).then(msg => {msg.delete(2000)}) 
*/