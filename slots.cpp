#include <iostream>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>
using namespace std;

int Random(int);
int main ()
{
	int credits = 1000;
	int po, arr[9], payout[5]={0},lines,inputCredits,input;
	srand(time(NULL));
	do{ //User input validation
		cout << "\n\n===== WELCOME TO MEME-MOJI SLOTS! =====" << endl;
		cout << "Please input one of the options below:" << endl;
		cout << "'1' : plays the 1 line\n'2' : plays the 1 and 2 lines\n'3' : plays the 1,2 and 3 lines" << endl; */
		cin >> input;
		if(input < 1 || input > 3){
			cout << "Not a valid response. Please try again.\r" << endl;
			continue;
		}
		inputCredits = 5 *input;
		if(inputCredits > credits){
			cout << "You do not have enough credits for that option.";
			continue;
		}
	}while( input < 1 || input > 3 || inputCredits > credits);
	
	//=========SETUP============
	for(int i=0;i<3;i++) //for each wheel
	{
		for(int j=0;j<3;j++) //for each tile w/o replacement 
		{
			int n;
			do{
				n = Random(9);
			}while(arr[0+(i*3)] == n|| arr[1+(i*3)] == n|| arr[2+(i*3)] == n); //checking to make sure no duplicates
			arr[j+(i*3)] = n;
		}
	}
	//==========LINES============
	if(input == 1 || input == 2)
		lines = 3;
	if(input == 3)
		lines = 5;
	//========PO CHECKS==========
	int x=0,y=3,z=6;
	for(int a=0;a<lines;a++){
		if(arr[x]!=7&&arr[x]!=8&&arr[x]!=9){ //first is face or symbol
			//==========2 FACES OR 2 SYMBOLS WITH A HAND================
 			if(arr[z]==7||arr[z]==8){ 									//hand last and first is a face or symbol
				if(arr[x]==2||arr[x]==3||arr[x]==1){ 					//hand last and first is a symbol 
					if(arr[y]==2||arr[y]==3||arr[y]==1){				//hand last. first and middle are symbols
						payout[a] = 20;
						cout << "Line " << a+1 << ": '2 SYMBOLS AND HAND' +20 credits" <<endl;
					}
				}
				if(arr[x]==4||arr[x]==5||arr[x]==6){ 					//hand last and first is a face
					if(arr[y]==4||arr[y]==5||arr[y]==6){				//hand last. first and middle are faces
						payout[a] = 20;
						cout << "Line " << a+1 << ": '2 FACES AND HAND' +20 credits" <<endl;
					}
				}
			}
			//============ALL THREE SYMBOLS/FACES======================
			if(arr[x]==1||arr[x]==2||arr[x]==3){ 							//first is symbol 
				if(arr[y]==1||arr[y]==2||arr[y]==3){						//middle is symbol
					if(arr[z]==1||arr[z]==2||arr[z]==3){ 					//and all are symbols
						if(arr[x]!=arr[y]&&arr[x]!=arr[z]&&arr[y]!=arr[z]){	//and all three are different
							cout << "Line " << a+1 << ": 'ALL SYMBOLS' +25 credits" <<endl;
							payout[a] = 25;
						}
					}
				}
			}
			if(arr[x]==4||arr[x]==5||arr[x]==6){ 							//first is face 
				if(arr[y]==4||arr[y]==5||arr[y]==6){						//middle is face
					if(arr[z]==4||arr[z]==5||arr[z]==6){ 					//and all are faces
						if(arr[x]!=arr[y]&&arr[x]!=arr[z]&&arr[y]!=arr[z]){	//and all three are different
							cout << "Line " << a+1 << ": 'ALL FACES' +25 credits" <<endl;
							payout[a] = 25;
						}
					}	
				}
			}
		}
		else{//========100-FACE-OK AND 100-FIRE/HEART-100===============
			if(arr[z]==7&&arr[x]==9){									//first is a '100' and last is an ok_hand 
				if(arr[y]==4||arr[y]==5||arr[y]==6){					//and middle is a face
					cout << "Line " << a+1 << ": '100-FACE-OK' +125 credits" <<endl;
					payout[a] = 125;	
				}
			}
			if(arr[x]==9&&arr[z]==9){									//first and last are '100'
				if(arr[y]==2||arr[y]==3){								//and middle is fire or heart
					cout << "Line " << a+1 << ": '100-FIRE/HEART-100' +1000 credits" <<endl;
					payout[a] = 1000;
				}
			}
		}//================3-OF-A-KIND AND JACKPOT======================
		if(arr[x]==arr[y]&&arr[x]==arr[z]){								//three of a kind
			if(arr[x]==9&&arr[y]==9&&arr[z]==9){						//all '100' (jackpot)
				cout << "Line " << a+1 << ": 'JACKPOT' +2000 credits" <<endl;
				payout[a] = 2000;
			}
			else{														//three of a kind but not 100
				cout << "Line " << a+1 << ": '3-OF-A-KIND' +50 credits" <<endl;
				payout[a] = 50;
			}
		}

		if(a < 2)		//Horizontal Lines
		{x++;y++;z++;}	
		if(a == 2)		//L-R Diagonal
		{x=0;y=4;}
		if(a == 3)		//R-L Diagonal
		{x=2;z=6;}

	}
	cout << endl;
	//========DISPLAY=============
 	for(int k=0;k<3;k++)  
	{
		cout << arr[k] << " " << arr[k+3] << " " << arr[k+6] << endl;
		k-6;
	}
	cout << endl; 

	//summation
	if(input==1)
		po += payout[1];
	if(input==2)
		po = payout[0] + payout[1] + payout[2];
	if(input==3)
		po = payout[0] + payout[1] + payout[2] + payout[3] + payout[4];
	//output
	if(po != 0)
	{
		credits += inputCredits;
		credits += po;
	}
	else{
		cout << "Sorry! Better luck next time!" << endl;
		credits -= inputCredits;
	}
	cout << "Credits:" << credits << endl;
}

int Random(int topEnd)
{	 return rand() %topEnd + 1;  }

//arr[j+(i*3)] = j+(i*3);
/*
	int x=0,y=3,z=6;
	for(int a=0;a<lines;a++){
		if(arr[x]!=7&&arr[x]!=8&&arr[x]!=9){ //first is face or symbol
			//==========2 FACES OR 2 SYMBOLS WITH A HAND================
 			if(arr[z]==7||arr[z]==8){ 									//hand last and first is a face or symbol
				if(arr[x]==2||arr[x]==3||arr[x]==1){ 					//hand last and first is a symbol 
					if(arr[y]==2||arr[y]==3||arr[y]==1){				//hand last. first and middle are symbols
						payout[a] = 20;
						cout << "Line " << a+1 << " 2 SYMBOLS AND HAND\nPAYOUT: +20 credits" <<endl;
					}
				}
				if(arr[x]==4||arr[x]==5||arr[x]==6){ 					//hand last and first is a face
					if(arr[y]==4||arr[y]==5||arr[y]==6){				//hand last. first and middle are faces
						payout[a] = 20;
						cout << "Line " << a+1 << " 2 FACES AND HAND\nPAYOUT: +20 credits" <<endl;
					}
				}
			}
			//============ALL THREE SYMBOLS/FACES======================
			if(arr[x]==1||arr[x]==2||arr[x]==3){ 							//first is symbol 
				if(arr[y]==1||arr[y]==2||arr[y]==3){						//middle is symbol
					if(arr[z]==1||arr[z]==2||arr[z]==3){ 					//and all are symbols
						if(arr[x]!=arr[y]&&arr[x]!=arr[z]&&arr[y]!=arr[z]){	//and all three are different
							cout << "Line " << a+1 << " ALL SYMBOLS\nPAYOUT: +25 credits" <<endl;
							payout[a] = 25;
						}
					}
				}
			}
			if(arr[x]==4||arr[x]==5||arr[x]==6){ 							//first is face 
				if(arr[y]==4||arr[y]==5||arr[y]==6){						//middle is face
					if(arr[z]==4||arr[z]==5||arr[z]==6){ 					//and all are faces
						if(arr[x]!=arr[y]&&arr[x]!=arr[z]&&arr[y]!=arr[z]){	//and all three are different
							cout << "Line " << a+1 << " ALL FACES\nPAYOUT: +25 credits" <<endl;
							payout[a] = 25;
						}
					}	
				}
			}
		}
		else{//========100-FACE-OK AND 100-FIRE/HEART-100===============
			if(arr[z]==7&&arr[x]==9){									//first is a '100' and last is an ok_hand 
				if(arr[y]==4||arr[y]==5||arr[y]==6){					//and middle is a face
					cout << "Line " << a+1 << " 100-FACE-OK\nPAYOUT: +125 credits" <<endl;
					payout[a] = 125;	
				}
			}
			if(arr[x]==9&&arr[z]==9){									//first and last are '100'
				if(arr[y]==2||arr[y]==3){								//and middle is fire or heart
					cout << "Line " << a+1 << " 100-FIRE/HEART-100\nPAYOUT: +1000 credits" <<endl;
					payout[a] = 1000;
				}
			}
		}//================3-OF-A-KIND AND JACKPOT======================
		if(arr[x]==arr[y]&&arr[x]==arr[z]){								//three of a kind
			if(arr[x]==9&&arr[y]==9&&arr[z]==9){						//all '100' (jackpot)
				cout << "Line " << a+1 << " JACKPOT\nPAYOUT: +2000 credits" <<endl;
				payout[a] = 2000;
			}
			else{														//three of a kind but not 100
				cout << "Line " << a+1 << " 3-OF-A-KIND\nPAYOUT: +50 credits" <<endl;
				payout[a] = 50;
			}
		}

		if(a < 2)
		{x++;y++;z++;}//increments through the horizontal lines
		if(a == 2)
		{x=0;y=4;}
		if(a == 3)
		{x=2;z=6;}

	}
*/