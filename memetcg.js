const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const config = require("./config.json");
var mysql = require("mysql");
bot.commands = new Discord.Collection();

//select * from 1ed where n1 = id;

bot.on("ready",async () => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setActivity("DANK MEMES", {type: "WATCHING"});
});

const fs = require("fs");
fs.readdir("./Commands/", (err,files) => {
	if(err) console.log(err);
	
	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0){
		console.log("Could not find commands");
		return;
	}
	
	jsfile.forEach((f,i) => {
		let props = require (`./Commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name,props)
	});
});
//=======================CONNECTION TO DATABASE============================
var connection = mysql.createConnection({
	host: config.serverHost,
	user: config.serverUser,
	password: config.serverPass
});

connection.connect(function(err) {
	if(err)throw err;
	console.log("Connected to Database.\n");
});
console.log("\n\n\n");

//=========================================================================
bot.on('message', async message => {
	
	let prefix = config.prefix;
	if (message.author.bot || message.channel.type === "dm")	//makes sure it doesn't activate for anything else
	  return;
	  
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	let commandfile = bot.commands.get(cmd.slice(prefix.length));
	
	if(commandfile) commandfile.run(bot,message,args,connection);

	//=======================================================================
	//=======ENCRYPTION
	var ida = encrypt(message.author.id);
	connection.query(`USE users`);
	var sql = mysql.format(`CREATE TABLE IF NOT EXISTS ${ida} (edition varchar(5) not null, n1 int not null, n2 int not null,
							rarity varchar(15) not null,name varchar(50) not null, power int not null, qty int not null, holo int not null,
							constraint ID primary key (edition,name))`);
	connection.query(sql, function(err,rows) {
		if(err)throw err;
	});
	//=======CURRENCY
	connection.query(`USE stats`);
	connection.query(`SELECT * FROM credits WHERE id = '${message.author.id}'`, (err,rows) => {
		if(err)throw err;
	
		let sql;
		if(message.content[1] != "!"){
			if(rows.length < 1){
				connection.query(`USE stats`);
				sql = `INSERT INTO credits (id,credits) VALUES ('${message.author.id}',${generateCredits()})`;
			} else { //they already are in the database
				connection.query(`USE stats`);
				let credits = rows[0].credits;
				sql = `UPDATE credits SET credits = ${credits + generateCredits()} WHERE id = '${message.author.id}'`; //${credits + generateCredits()} where 0 is 
			}
			connection.query(sql);
		}
	});	 
	//=======================================================================

});

bot.login(config.token);

//==========================FUNCTIONS======================================
function generateCredits(){
	return Math.floor(Math.random() * (5-1 +1))+1 ; 			//random 1 to 5 coins on every message	
}
function encrypt(id){
	var digits = (""+id).split("");
	for(var i = 0; i<18;i++){
		if(digits[i] == "0")
			digits[i] = "A";
		if(digits[i] == "1")
			digits[i] = "B";
		if(digits[i] == "2")
			digits[i] = "C";
		if(digits[i] == "3")
			digits[i] = "D";
		if(digits[i] == "4")
			digits[i] = "E";
		if(digits[i] == "5")
			digits[i] = "F";
		if(digits[i] == "6")
			digits[i] = "G";
		if(digits[i] == "7")
			digits[i] = "H";
		if(digits[i] == "8")
			digits[i] = "I";
		if(digits[i] == "9")
			digits[i] = "J";
	}
	ida = ((""+digits).split(",")).join('');
	return ida;
}
