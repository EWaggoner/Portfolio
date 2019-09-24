const Discord = require ("discord.js");

module.exports.run = async (bot, message, args) => {
	//Input Validation
	if(args[0] == null){ //exit if no other args
		message.channel.send("You need to include a command.\nex: '**m!help shop**'\nwill send you a direct message containing the information on the shop command.");
		return;
	}
	var cmd = args.shift().toUpperCase();
	var opInfo = "All user input (your input) is denoted by the '<' and '>' operators.\n**Do not include these operators in your command.**\n\n";
	var cmdOpts = " ", annotations = " ", info = " ";
	var tab = "\n              ";
	//===============COMMANDS===============
	if(cmd == "HELP"){
		info = "‘m!help <Command>’	: Sends the player a direct message containing command information.\n\n"+
		"<Command> options:\n"+
			   "     'achievements'\n"+
			   "     'buy'\n"+
			   "	 'cardinfo'\n"+
			   "     'coinflip'\n"+
			   "     'credits'\n"+
			   "     'duel'\n"+
			   "     'sell'\n"+
			   "     'shop'\n"+
			   "     'slots'\n"+
			   "     'tradeup'\n";
	}
	if(cmd == "DUEL"){
		info = "\n'm!duel <DuelType> <UserMention> <Bet>  : Sends a duel request to another player.\n\n";
		cmdOpts = "<DuelType> options:\n"+
			   "     'D'  : 'Default'. Sends a duel request to a player. Duel Restriction[1]: all cards in both"+tab+"player's inventories.  Bet payout[2] is 1:1. No cards are lost. \n"+
			   "     'C'  : 'Common'. Sends a common duel request to a player. Duel Restriction[1]: all"+tab+"cards in both player's inventories that are common cards.  Bet payout[2] is 1:1."+tab+"No cards are lost. \n"+
			   "     'U'  : 'Uncommon'. Sends a uncommon duel request to a player. Duel Restriction[1]:"+tab+"all cards in both player's inventories that are uncommon cards.  Bet payout[2] is"+tab+"1:1. No cards are lost. \n"+
			   "     'R'  : 'Rare'. Sends a rare duel request to a player. Duel Restriction[1]: all cards in both"+tab+"player's inventories that are rare cards.  Bet payout[2] is 1:1. No cards are lost. \n"+
			   "     'S'  : 'Secret Rare'. Sends a secret rare duel request to a player. Duel Restriction[1]: all"+tab+"cards in both player's inventories that are secret rare cards.  Bet payout[2] is 2:1."+tab+"No cards are lost. \n"+
			   "     'X'  : 'Double'. Sends a duel request to a player. Bot selects 2 cards from each player."+tab+"The highest sum wins. Duel Restriction[1]: all cards in both player's inventories."+tab+"Bet payout[2] is 2:1. No cards are lost. \n"+
			   "     'F'  : 'For Keeps'. Sends a duel request to a player. Duel Restriction[1]: all cards in both"+tab+"player's inventories that are not secret rares.  Bet payout[2] is 3:1. Both cards go"+tab+"to the winner. \n\n"+
			   "<UserMention>: In the format of '@Username' , where Username is the player that you would like to duel.\n"+
			   "<Bet>: A whole number less than or equal to the amount of credits you own. If you or the player you are requesting to duel does not have that many credits, the duel request times out.";
		annotations ="[1]: 'Duel Restriction': The range of cards that the duel takes place in. For example, the Duel Restriction of a 'Common duel' is __ONLY__ common cards.\n"+
					 "[2]: 'Bet Payout': The amount of credits that goes to the winner of a duel based on the ratio of the duel. For example, the winner of a 'For Keeps' duel wins the sum of both bets times 3.\n\n";
	}
	if(cmd == "CREDITS"){
		info = "'m!credits'  : Sends the player a message containing their credit balance";
	}
	if(cmd == "SLOTS"){
		info = "'m!slots <Input>'  : Starts a game of Meme Emoji slots. Input is the amount of lines the player would like to play.\n\n";
		cmdOpts = "<Input> options:\n"+
				"     '1'  : '1 Line'. This input allows the player to play the middle horizontal line.\n"+
				"     '2'  : '3 Lines'. This input allows the player to play all of the horizontal lines.\n"+
				"     '3'  : '5 Lines'. This input allows the player to play the horizontal lines and\n      the 2 diagonal lines.\n\n";
		annotations = "Ways to Win:\n"+
			    "     'JACKPOT'  :  2x Random Secret Rares OR 2000 Credits\n"+
				"     '100-FIRE\HEART-100'  :  1x Random Secret Rare OR 1000 Credits\n"+
				"     '100-FACE-OK' :  1x Holographic Rare OR 125 Credits\n"+
				"     'THREE-OF-A-KIND  :  1x Holographic Uncommon OR 50 Credits\n"+
				"     'ALL FACES/SYMBOLS  :  1x Holographic Common OR 25 Credits\n"+
				"     '2 FACES/SYMBOLS-HAND' :  20 Credits\n\n";
	}
	

	//Sending DM to player with command info	
	if(info != " "){
		message.channel.send("I've sent you a Direct Message(s) containing the help information.");
		if(opInfo.length + info.length + cmdOpts.length + annotations.length < 2000){
			message.author.send(opInfo+info+annotations+cmdOpts)
		}
		else{
			message.author.send(opInfo + info + annotations);
			message.author.send(cmdOpts);
		}
	}
}		

module.exports.help = {
	name: "help"
}