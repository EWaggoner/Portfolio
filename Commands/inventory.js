const Discord = require ("discord.js");
var mysql = require('mysql');

module.exports.run = async (bot, message, args,connection) => {
	//m!inventory set 1ed
	var sortby = args[0];
	var input = args[1];
	var order = args[2];
	if( sortby == null || input == null){ //checks to see if there are arguments passed
		message.channel.send("Invalid Argument Input.\nuse: **'m!help inventory'** to learn more.");
		return;
	}
	var sortby = args.shift().toUpperCase(), input = args.shift().toUpperCase(); //Shift to upper
	if(sortby != "EDITION" && sortby != "N1" && sortby != "N2" && sortby != "RARITY" && sortby != "NAME" && sortby != "POWER" && sortby != "HOLO"){ //different sort commands
		message.channel.send("Invalid Sort Input.\nuse: **'m!help inventory'** to learn more.");
		return;
	}
	if(input != "1ED" && input != "C" && input != "U" && input != "R" && input != "S" && input < 1 || input > 100){ // add more here when adding sets
		message.channel.send("Invalid Input Type.\nuse: **'m!help inventory'** to learn more.");
		return;
	}
	//===============================================
	var uid = encrypt(message.author.id);
	//===============================================
	//					COMMANDS
	//===============================================
	
	connection.query(`USE users`);
	let sql = `SELECT * FROM ${uid} WHERE ${sortby} = "${input}"`;
	
	connection.query(sql,function(err,result){
		if(err) throw err;
			Object.keys(result).forEach(function(key) {
				var row = result[key];
				if(row.n1 < 10){
					var spacer = "00";
					if(row.name.length < 13)
						var tab = "\t\t";
					if(row.name.length <= 4)
						var tab = "\t\t\t";
					if(row.name.length >= 13)
						var tab = "\t";
				}if(row.n1 <= 99 && row.n1 >= 10){
					var spacer = "0";
					if(row.name.length < 13)
						var tab = "\t\t";
					if(row.name.length <= 4)
						var tab = "\t\t\t";
					if(row.name.length >= 13)
						var tab = "\t";
				}if(row.n1 > 99){
					var spacer = "";
					if(row.name.length < 13)
						var tab = "\t\t";
					if(row.name.length <= 4)
						var tab = "\t\t\t";
					if(row.name.length >= 13)
						var tab = "\t";
				}
			message.channel.send(row.edition +" | "+spacer+row.n1+"/"+row.n2+" | "+row.rarity+" | "+row.name+tab+"| "+row.power);
			});
			
	});
	//=====================================
	/* connection.query(sql,function(err,result){
		if(err) throw err;
			Object.keys(result).forEach(function(key) {
				function firstFunction(callback){
					var row = result[key];
					if(row.n1 < 10){
						var spacer = "00";
						if(row.name.length < 13)
							var tab = "\t\t";
						if(row.name.length <= 4)
							var tab = "\t\t\t";
						if(row.name.length >= 13)
							var tab = "\t";
					}if(row.n1 <= 99 && row.n1 >= 10){
						var spacer = "0";
						if(row.name.length < 13)
							var tab = "\t\t";
						if(row.name.length <= 4)
							var tab = "\t\t\t";
						if(row.name.length >= 13)
							var tab = "\t";
					}if(row.n1 > 99){
						var spacer = "";
						if(row.name.length < 13)
							var tab = "\t\t";
						if(row.name.length <= 4)
							var tab = "\t\t\t";
						if(row.name.length >= 13)
							var tab = "\t";
					}
				}
			message.channel.send(row.edition +" | "+spacer+row.n1+"/"+row.n2+" | "+row.rarity+" | "+row.name+tab+"| "+row.power);
			});
			
	}); */
	
	
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
module.exports.help = {
	name: "inventory"	
}
/* setTimeout(function(){
	for(var i=0;i<5;i++){
		var input = Math.floor(Math.random() * (max-min+1)+min) ;
		message.channel.send(input+"\n");
	}},(1*1000)); 
*/
//select count(*) from 1ed where rarity != "S";
//SELECT t.n1, t.name FROM 1ed AS t JOIN (SELECT ROUND(RAND() * (SELECT MAX(n1) FROM 1ed)) AS n1) AS x WHERE t.n1 >= x.n1 and x.n1 <=90 LIMIT 1; //without secret rare
//SELECT t.n1, t.name FROM 1ed AS t JOIN (SELECT ROUND(RAND() * (${max}-${min})+1) AS n1) AS x WHERE t.n1 >= x.n1 LIMIT 1;
//insert into ${ida} (entry,edition,n1,n2,rarity,name,power,holo,qty) values (${entry},"${set}", ${n1},${n2},"${rarity}","${name}",${power},${holo},${qty});
//SELECT t.n1,t.n2,t.rarity,t.name,t.power FROM ${set} AS t JOIN (SELECT ROUND(RAND() * (${max}-${min})+1) AS n1) AS x WHERE t.n1 >= x.n1 LIMIT 1
//SELECT t.n1,t.n2,t.rarity,t.name,t.power FROM ${set} AS t JOIN (SELECT ROUND(RAND() * ((SELECT MAX(n1) FROM ${set})-(SELECT MAX(n1) FROM ${set}))+1) AS n1) AS x WHERE t.n1 >= x.n1 LIMIT 1
/*
//WORKING RAND FROM SET
	var input = Math.floor(Math.random() * (max-min+1)+min) ;
	//========================================
	var card = {ed: "c",n1: 0,n2: 0,rarity: "c",name: "c",holo: 0,qty: 0};
	
	var ida = encrypt(message.author.id);
	connection.query(`USE x`);
	//t.edition,,t.holo,t.qty
	var sql = mysql.format(`SELECT t.n1,t.n2,t.rarity,t.name,t.power FROM ${set} AS t JOIN (SELECT ROUND(RAND() * (${max}-${min})+1) AS n1) AS x WHERE t.n1 >= x.n1 LIMIT 1`);
	var connection = connection.query(sql, function(err,rows) {
		if(err)throw err;
		var editon,n1,n2,rarity,name,power,holo;
			//card.ed = rows[0].edition;
			card.n1 = rows[0].n1;
			card.n2 = rows[0].n2;
			card.rarity = rows[0].rarity;
			card.name = rows[0].name;
			card.power = rows[0].power;
			card.holo = rows[0].holo;
			card.qty = rows[0].qty;
			message.channel.send(card.n1+"/"+card.n2+" "+card.rarity+" "+card.name+" "+card.power);
			//message.channel.send(card.ed +"| "+card.n1+"/"+card.n2+" "+card.rarity+" "+card.name+" "+card.power+" "+card.holo);
			
	});
*/
/*
//WORKING RAND FROM USER INVENTORY
	//=====Gets random card from inventory with duel restriction
	var ida = encrypt(message.author.id);
	var DR = "S";
	connection.query(`USE users`);
	var sql = mysql.format(`SELECT t.entry,t.edition,t.holo,t.qty,t.n1,t.n2,t.rarity,t.name,t.power FROM ${ida} AS t JOIN (SELECT ROUND(RAND() * ((SELECT MAX(entry) FROM ${ida})-(SELECT MIN(entry) FROM ${ida}))+1) AS entry) AS x WHERE t.entry >= x.entry AND t.rarity != "${DR}" LIMIT 1`); //AND t.rarity != "S"
	var connection = connection.query(sql, function(err,rows) {
		if(err)throw err;
		var editon,n1,n2,rarity,name,power,holo;
			card.ed = rows[0].edition;
			card.n1 = rows[0].n1;
			card.n2 = rows[0].n2;
			card.rarity = rows[0].rarity;
			card.name = rows[0].name;
			card.power = rows[0].power;
			card.holo = rows[0].holo;
			card.qty = rows[0].qty;
			message.channel.send(card.ed +"| "+card.n1+"/"+card.n2+" "+card.rarity+" "+card.name+" "+card.power+" "+card.holo+" "+card.qty);
	});
*/