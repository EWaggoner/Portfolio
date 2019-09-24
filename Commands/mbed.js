const Discord = require ("discord.js");

module.exports.run = async (bot, message, args) => {
	var mention = message.author.toString();
	var c1="COMMON",c2="COMMON",c3="COMMON",c4="COMMON",uc1="UNCOMMON",uc2="UNCOMMON",rareslot="Rare",r="RARE";
	var pack = "1st Edition", plus = "\n+1 : ";
	//message.channel.send({files:["./pack-open.gif"]}).then(msg => {msg.delete(2000)});
	message.channel.send({files:["./pack-open.gif"]}).then(msg => {msg.delete(2000)});
	setTimeout(function(){message.channel.send(mention+"\n"+pack +" Pack Opened!"+plus+c1+plus+c2+plus+c3+plus+c4+plus+uc1+plus+uc2+"\n"+rareslot+": "+r+"\n").then(msg=>{msg.delete(5000)})},4500);

}

module.exports.help = {
	name: "mbed"	
}
/*
async function f(){
		let promise = new Promise((resolve,reject)=>{setTimeout(() => resolve("done!"),1000)}); //message.channel.send({files:["./pack-open.gif"]}).then(msg => {msg.delete(2000)})

		let result = await promise;
		console.log(result);
	}
	f();
*/
//message.channel.send(mention+"\n"+"```DEFAULT```"+"\n"+"```brainfuck quote```"+"\n"+"```CSS Green```"+"\n"+"```yaml Cyan```"+"\n"+"```md Blue```"+"\n"+"```fix yellow```"+"\n"+"```glsl orange```"+"\n"+"```diff red```");