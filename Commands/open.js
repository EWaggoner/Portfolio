const Discord = require ("discord.js");
var mysql = require('mysql');
module.exports.run = async (bot, message, args,connection) => {
	var set = args[0];
	if(set == null){ //Catches a null argument
		message.channel.send("Invalid Set Input.\nuse: **'m!help open'** to learn more.");
		return;
	}
	var set = args.shift().toUpperCase();
	if(set != "1ED"){ //Current sets available for open
		message.channel.send("Invalid Set Input.\nuse: **'m!help open'** to learn more.");
		return;
	}
	//======================================================================
	var	arr = [], count=0;
	var	uid = encrypt(message.author.id);
	var mention = message.author.toString();
	var HOLO = getHolo();
	console.log("\n");
	//Get Random============================================================
	
	
	function randCardNo(i) {
		return new Promise(resolve => {
			let card = {ed: set.toUpperCase(),n1: 0,n2: 0,rarity:"RARITY",name:"NAME",holo: 0,qty: 0};
			let holo=0,qty=0;
			if(i <= 3){max = 40; min = 1;}//0,1,2,3
			if(i > 3 && i < 6){max = 70; min = 41;} //4-5
			if(i == 6 && HOLO != 7){max = 90;min = 71};
			if(i == 6 && HOLO == 7){max = 100;min = 91};
			var n = Math.floor(Math.random()*(max-min+1)+min);
			card.n1 = n;
			if(i == HOLO){
				holo = 1;
			}
			if(i==6 && HOLO != 7){ 
				card.n1=n;
				if(HOLO == 6)
					holo=1;
			}
			if(i==6 && HOLO == 7){ //Secret Rare
				card.n1 = n; holo=1;
			}
			count +=1;
			//Gets Card info=================
			function getCardInfo(connection,n){
				return new Promise((resolve,reject) => {
					connection.query(`USE x`);
					let sql = `SELECT * FROM ${set} WHERE n1 = ${n}`;
					connection.query(sql,function(err,result){
					if (err) reject(err);
						card.n1 = result[0].n1
						card.n2 = result[0].n2
						card.rarity = result[0].rarity
						card.name = result[0].name
						card.power = result[0].power
						if(holo == 1){
							card.qty = 0;
							card.holo = 1;
							var type = "HOLO"
						}else{
							card.qty = 1;
							card.holo = 0;
							var type = "qty";
						}
					//===========================================================
						function saveToInv(connection,n){
							return new Promise((resolve,reject) => {
								connection.query(`USE users`);
								let sql = `insert into ${uid} (edition,n1,n2,rarity,name,power,qty,holo) values ("${set}",${card.n1},${card.n2},"${card.rarity}","${card.name}",${card.power},${card.qty},${card.holo}) on duplicate key update ${type} = ${type} + 1`;
								connection.query(sql,function(err,result){
									if (err) reject(err);
									let shiny = "";
									console.log("SAVED");
									if(type == "HOLO")
										shiny = "HOLO"
									message.channel.send(mention+" +1 "+shiny+" {"+card.ed+"} "+card.n1+"/"+card.n2+" "+card.rarity+" '"+card.name+"' ").then(msg => {msg.delete(4000)});
									resolve(card);
								});
							});
						};
						saveToInv(connection,n).then((info)=>console.log()); 
					//Save to inventory================================
						resolve(card);
					});
				});
			};
			getCardInfo(connection,n).then((info)=>console.log(info));//info //message.channel.send
			//================================
			resolve(arr[i]=card);
		});
		
	}
	//Async Call==================
	async function asyncCall(){
		while(count < 7)
			randCardNo(count);//.then((info)=>console.log());//info
	}
	if(count < 7)
		asyncCall();
	//=====================================
}

//=================================================================================================
//											FUNCTIONS
//=================================================================================================
function getHolo(){
	//In a Case: (5 Booster boxes of 12) = 60 packs , 420 cards, (HC: 15, HUC: 10, HR: 5, SR: 1)
		var isHolo = -1;
		for(var i=0; i<4;i++){ //Commons
			if(isHolo == -1){
				var n = Math.floor(Math.random() * 20) + 1; //23.7%
				if(n == 20){ 
					isHolo = i+1;
				}
			}	
		}	
		for(var i=0; i<2;i++){ //Uncommons
			if(isHolo == -1){
				var n = Math.floor(Math.random() * 12) + 1; //16%
				if(n == 12)
					isHolo = 4 + i;
			}	
		}
		if(isHolo == -1){ //Rare/Secret Rare
			var n = Math.floor(Math.random() * 12) + 1;
			if(n == 12){
				var q = Math.floor(Math.random() * 5) + 1;
				isHolo = 6; //HR 7.2%
				if(q == 5){
					isHolo = 7; //S 1.65%
				}				
			}
		}
	return isHolo;
}
function encrypt(id){ //to get inventory of player (MYSQL doesn't like int tables)
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
	uid = ((""+digits).split(",")).join('');
	return uid;
}

module.exports.help = {
	name: "open"	
}