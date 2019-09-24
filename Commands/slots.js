const Discord = require ("discord.js");

module.exports.run = async (bot, message, args,connection) => {
	//Arrays
	var tiles = ["ERR ",":b:",":fire:",":sparkling_heart:",":joy:",":weary:",":smiling_imp:",":ok_hand:",":clap:",":100:"];
	var arr = [0,0,0,0,0,0,0,0,0];
	var payout = [0,0,0,0,0];
	//Integers
	var po = 0,lines = 0;
	//User input
	var input = args[0];
	
	//============INPUT VALIDATION==============
		if(input == null){
			message.channel.send("No Input.\nuse: **'m!help slots'** to learn more.");
			return;
		}
		if(input < 1 || input > 3){
			message.channel.send("Not a valid play option.\nuse: **'m!help slots'** to learn more.");
			return;
		}
	//=================SETUP====================
	for(var i=0;i<3;i++) //for each wheel
	{
		for(var j=0;j<3;j++) //for each tile w/o replacement 
		{
			var n;
			do{
				n = Math.floor(Math.random() * 9) + 1; 
			}while(arr[0+(i*3)] == n|| arr[1+(i*3)] == n|| arr[2+(i*3)] == n); //checking to make sure no duplicates
			arr[j+(i*3)] = n;
		}
	}
	//=================LINES====================
	if(input == 1)
		lines = 1;
	if(input == 2)
		lines = 3;
	if(input == 3)
		lines = 5;
	//==========================================
	//				   LOGIC
	//==========================================
	var msg1="",msg2="",msg3="",msg4="",msg5="",msg6="",msg7="",msg8="";
	//========PO CHECKS==========
	var x=1,y=4,z=7;
	for(var a=0;a<lines;a++){
		if(arr[x]!=7&&arr[x]!=8&&arr[x]!=9){ //first is face or symbol
			//==========2 FACES OR 2 SYMBOLS WITH A HAND================
 			if(arr[z]==7||arr[z]==8){ 									//hand last and first is a face or symbol
				if(arr[x]==2||arr[x]==3||arr[x]==1){ 					//hand last and first is a symbol 
					if(arr[y]==2||arr[y]==3||arr[y]==1){				//hand last. first and middle are symbols
						payout[a] = 20;
						msg1 = "L" + parseInt(a+1,10) + ": '2 SYMBOLS AND HAND' +20\n";
					}
				}
				if(arr[x]==4||arr[x]==5||arr[x]==6){ 					//hand last and first is a face
					if(arr[y]==4||arr[y]==5||arr[y]==6){				//hand last. first and middle are faces
						payout[a] = 20;
						msg2 = "L" + parseInt(a+1,10) + ": '2 FACES AND HAND' +20\n";
					}
				}
			}
			//============ALL THREE SYMBOLS/FACES======================
			if(arr[x]==1||arr[x]==2||arr[x]==3){ 							//first is symbol 
				if(arr[y]==1||arr[y]==2||arr[y]==3){						//middle is symbol
					if(arr[z]==1||arr[z]==2||arr[z]==3){ 					//and all are symbols
						if(arr[x]!=arr[y]&&arr[x]!=arr[z]&&arr[y]!=arr[z]){	//and all three are different
							msg3 = "L" + parseInt(a+1,10) + ": 'ALL SYMBOLS' +25\n";
							payout[a] = 25;
						}
					}
				}
			}
			if(arr[x]==4||arr[x]==5||arr[x]==6){ 							//first is face 
				if(arr[y]==4||arr[y]==5||arr[y]==6){						//middle is face
					if(arr[z]==4||arr[z]==5||arr[z]==6){ 					//and all are faces
						if(arr[x]!=arr[y]&&arr[x]!=arr[z]&&arr[y]!=arr[z]){	//and all three are different
							msg4 = "L" + parseInt(a+1,10) + ": 'ALL FACES' +25\n";
							payout[a] = 25;
						}
					}	
				}
			}
		}
		else{//========100-FACE-OK AND 100-FIRE/HEART-100===============
			if(arr[z]==7&&arr[x]==9){									//first is a '100' and last is an ok_hand 
				if(arr[y]==4||arr[y]==5||arr[y]==6){					//and middle is a face
					msg5 = "L" + parseInt(a+1,10) + ": '100-FACE-OK' +125\n";
					payout[a] = 125;	
				}
			}
			if(arr[x]==9&&arr[z]==9){									//first and last are '100'
				if(arr[y]==2||arr[y]==3){								//and middle is fire or heart
					msg6 = "L" + parseInt(a+1,10) + ": '100-FIRE/HEART-100' +1000\n";
					payout[a] = 1000;
				}
			}
		}//================3-OF-A-KIND AND JACKPOT======================
		if(arr[x]==arr[y]&&arr[x]==arr[z]){								//three of a kind
			if(arr[x]==9&&arr[y]==9&&arr[z]==9){						//all '100' (jackpot)
				msg7 = "L" + parseInt(a+1,10) + ": 'JACKPOT' +2000\n";
				payout[a] = 2000;
			}
			else{														//three of a kind but not 100
				msg8 = "L" + parseInt(a+1,10) + ": '3-OF-A-KIND' +50\n";
				payout[a] = 50;
			}
		}

		if(a < 1)		//Horizontal Lines 1 and 2_L
		{x++;y++;z++;}
		if(a == 1)		//Horizontal Lines 2_U
		{x=0;y=3;z=6;}
		if(a == 2)		//L-R Diagonal
		{x=0;y=4;z=8;}
		if(a == 3)		//R-L Diagonal
		{x=2;z=6;}

	}
	//============SUMMATION===========
	if(input==1)
		po += payout[1];
	if(input==2)
		po = payout[0] + payout[1] + payout[2];
	if(input==3)
		po = payout[0] + payout[1] + payout[2] + payout[3] + payout[4];
	//=============DISPLAY============
	var mention = message.author.toString();
	
	connection.query(`USE stats`);
	connection.query(`SELECT * FROM credits WHERE id = '${message.author.id}'`, (err,rows) => {
		if(err)throw err;
		let credits = rows[0].credits;
		let inputCredits = 5 * input;
		
		if(inputCredits < credits){
			if(po != 0){
				let sql = `UPDATE credits SET credits = ${credits + po} WHERE id = '${message.author.id}'`;
				connection.query(sql);
				message.channel.send(mention+"\n"+tiles[arr[0]]+tiles[arr[3]]+tiles[arr[6]]+"\n"+
				tiles[arr[1]]+tiles[arr[4]]+tiles[arr[7]]+"\n"+
				tiles[arr[2]]+tiles[arr[5]]+tiles[arr[8]]+"\n"+
				msg1+msg2+msg3+msg4+msg5+msg6+msg7+msg8+"\n"+
				"Credits: "+(credits+po)+"\n");
			}
			else{
				let sql = `UPDATE credits SET credits = ${credits - inputCredits} WHERE id = '${message.author.id}'`;
				connection.query(sql);
				message.channel.send(mention+"\n"+tiles[arr[0]]+tiles[arr[3]]+tiles[arr[6]]+"\n"+
				tiles[arr[1]]+tiles[arr[4]]+tiles[arr[7]]+"\n"+
				tiles[arr[2]]+tiles[arr[5]]+tiles[arr[8]]+"\n"+
				"Sorry! Better luck next time!\n"+
				"Credits: "+(credits-inputCredits)+"\n");
			}
		}
		else
			return message.channel.send("Not enough credits.\nuse: **'m!help slots'** to learn more.");
	});
}

module.exports.help = {
	//name: "example"
	name: "slots"
}