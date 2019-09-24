//const Discord = require ("discord.js");
//var mysql = require('mysql');
//module.exports.run = async (bot, message, args,connection) => {
//var n = Math.floor(Math.random() * 9) + 1;
#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>
using namespace std;

int main()
{	
		float total=0,HC=0,HUC=0,HR=0,SR=0;
		srand(time(NULL));
		//In a Case: (5 Booster boxes of 12) = 60 packs , 420 cards, (HC: 15, HUC: 10, HR: 5, SR: 1)
		for(int i=0;i<90;i++){	
			int isHolo =-1;
			for(int i=0; i<4;i++){ //Commons
				if(isHolo == -1){
					int n = rand() % 20 + 1; //20%
					if(n == 20){ 
						HC++;
						isHolo = i+1;
					}
				}	
			}	
			for(int i=0; i<2;i++){ //Uncommons
				if(isHolo == -1){
					int n = rand() % 12 + 1; //12%
					if(n == 12){
						HUC++;
						isHolo = 4 + i;
					}
				}	
			}
			if(isHolo == -1){ //Rare/Secret Rare
				int n = rand() % 12 + 1;
				if(n == 12){
					int q = rand() % 5 + 1;
					if(q == 4){
						SR++;
						isHolo = 8; //S 1%
					}
					HR++;
					isHolo = 7; //HR 6%			
				}
			}
			total++;
			sleep(1);
			cout << total << ": " << isHolo << "  ";
		}
		cout << endl << endl << "HC: " << HC << endl << "HUC: " << HUC << endl << "HR: " << HR << endl << "SR: " << SR << endl;
		cout << endl <<  HC/total << " " << HUC/total << " " << HR/total << " " << SR/total << endl;
	return 0;
}	
	
	
	





//}
//module.exports.help = {
//	name: "open"	
//}
//message.channel.send(isHolo)
