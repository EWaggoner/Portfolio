const Discord = require ("discord.js");

module.exports.run = async (bot, message, args) => {
		//Input Validation
		var type = args[0];
		if( type == null) //exit if no other args
			return;
		var mention = args[2];
		if(message.mentions.users.first().id == 526120536376606721){
			message.channel.send(message.author.toString() + ", I'm sorry.\nBots cannot participate in duels.");
			return;
		}
		var bet = parseInt(args[1],10);
		if(bet <= 0 || !(Number.isInteger(bet)) || mention == null) //Handles bet less than 0 or missing and no mention error
				return;
		var orgMSGAuthor = message.author.username;
		var typeOfDuel = args.shift().toUpperCase();
		var payoutRatio = 1;
				
 		if(typeOfDuel == "D" || typeOfDuel == "X" || typeOfDuel == "H" || typeOfDuel == "F" || typeOfDuel == "C" || typeOfDuel == "U" || typeOfDuel == "R" || typeOfDuel == "S"){
			//if(message.mentions.users.first().id === message.author.id) //Handles Self-battle
			//{
			//	message.channel.send(message.author.toString() + ", I'm sorry. You cannot challenge yourself.\nTo learn more about dueling: '**m!help duel**'");
			//	return;
			//}
			switch(typeOfDuel) {
				case "D":
						var tDuel = "DEFAULT       ";
						break;
				case "C":
						var tDuel = "COMMON        ";
						break;
				case "U":
						var tDuel = "UNCOMMON      ";
						break;
				case "R":
						var tDuel = "RARE          ";
						break;
				case "S":
						var tDuel = "SECRET RARE   ";
						payoutRatio = 2;
						break;
				case "X":
						var tDuel = "DOUBLE        ";
						payoutRatio = 2;
						break;
				case "F":
						var tDuel = "FOR KEEPS     ";
						payoutRatio = 3;
						break;
				case "H":
						var tDuel = "HOLO ONLY     ";
						payoutRatio = 3;
						break;
			}
			message.channel.send(mention + "\n" + message.author.username + " has challenged you to a duel!\n" + "__**TYPE**:__ " + tDuel + " __**BET**:__ " + bet + "\nUse: '**duel accept**' or '**duel decline**'.\nTo learn more about dueling: '**m!help duel**'");
		
			//==========WAITING FOR REPONSE=============
  			const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.mentions.users.first().id, { max: 1, time: 10000 });
			collector.on('collect', message => {
				if (message.content.toLowerCase() == "accept" || message.content.toLowerCase() == "a" || message.content.toLowerCase() == "duel accept") {
					message.channel.send( message.author.username + " accepted " + orgMSGAuthor + "'s duel request.");
					//Accept Code
				} else if (message.content.toLowerCase() == "decline" || message.content.toLowerCase() == "d" || message.content.toLowerCase() == "duel decline") {
					message.channel.send( message.author.username + " declined " + orgMSGAuthor + "'s duel request.");
					return;
				}
			});
		} 
}

module.exports.help = {
	name: "duel"	
}