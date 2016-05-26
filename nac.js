/*******************************************************
			Init
*******************************************************/
l = function(what) {return document.getElementById(what);}

Game = {};

Game.canvas;
Game.canvas2d;

Game.offsetX = 0;
Game.offsetY = 0;

Game.offsetBorder = 12;

Game.mouseX = 0;
Game.mouseY = 0;

Game.winsX = 0;                
Game.winsO = 0;                
               		           //      |      |
Game.draws = 0;                //   0  |   1  |  2
                	           //--------------------
Game.whosTurn = "X";           //      |      |
                               //   3  |   4  |  5
Game.slots = [];               //--------------------
                               //      |      |
Game.shadowSlot = -1;          //   6  |   7  |  8

Game.alert = "";

Game.alertTimer;
Game.resetTimer;

Game.layout = 0;

Game.Slot = function(id, x, y) {
	this.id = id;	
	this.x = x + Game.offsetX + Game.offsetBorder;
	this.y = y + Game.offsetY + Game.offsetBorder;
	this.filled = false;
	this.content = "";
	return this;
}

Game.slots[0] = new Game.Slot(0,0,0);
Game.slots[1] = new Game.Slot(1,65,0);
Game.slots[2] = new Game.Slot(2,130,0);
Game.slots[3] = new Game.Slot(3,0,65);
Game.slots[4] = new Game.Slot(4,65,65);
Game.slots[5] = new Game.Slot(5,130,65);
Game.slots[6] = new Game.Slot(6,0,130);
Game.slots[7] = new Game.Slot(7,65,130);
Game.slots[8] = new Game.Slot(8,130,130);

Game.Init = function() {
	//init stuff here

	Game.canvas = l("canvas");
	Game.canvas2d = Game.canvas.getContext('2d');
	
	Game.canvas.width = window.innerWidth-16;
	Game.canvas.height = window.innerHeight-16;
}



/******************************************************
		      Functions
******************************************************/

Game.Click = function() {
	if (Game.alertTimer != NaN) {
		Game.alertTimer = NaN;
	}

	Game.Draw();
	for (var i = 0; i < 9; i++) {
		if ((Game.IsMouseWithin(Game.slots[i].x,Game.slots[i].y,Game.slots[i].x + 64,Game.slots[i].y + 64)) && !Game.slots[i].filled) {
			Game.SlotClick(Game.slots[i]);
			break;
		}
	}

	if (Game.IsMouseWithin(32+Game.offsetX+Game.offsetBorder, 64*3 + 16+128+Game.offsetY+Game.offsetBorder, 128+36+Game.offsetX+Game.offsetBorder, 64*3 + 36+128+Game.offsetY+Game.offsetBorder)) {
		var c = window.confirm("Are you sure you want to reset the game?");
		if (c) {
			Game.HardReset();
		}
	}
	
}

Game.Release = function() {

}

Game.CreateGhost = function(slot) {
	var createdGhost = false;
	for (var i = 0; i < 9; i++) {
		if ((Game.IsMouseWithin(Game.slots[i].x,Game.slots[i].y,Game.slots[i].x + 64,Game.slots[i].y + 64)) && !Game.slots[i].filled) {
			Game.shadowSlot = i;
			createdGhost = true;
			break;
		}
	}

	if (!createdGhost) {
		Game.shadowSlot = -1;
	}
}

Game.SlotClick = function(slot) {
	slot.filled = true;             		//      |      |
	slot.content = Game.whosTurn;			//   0  |   1  |  2
	if (Game.whosTurn == "X") {			//--------------------
		Game.whosTurn = "O";			//      |      |
	}						//   3  |   4  |  5
	else						//--------------------
	{						//      |      |
		Game.whosTurn = "X";   			//   6  |   7  |  8
	}                               		
        Game.Draw();
	Game.Draw();      						
	Game.CalculateWin();
}

Game.Reset = function() {
	Game.resetTimer = setTimeout(function() {
		for (var i = 0; i < 9; i++) {
		Game.slots[i].filled = false;
		Game.slots[i].content = "";
	}
	Game.Draw();
	}, 1200);
}

Game.HardReset = function() {
	Game.winsX = 0;
	Game.winsO = 0;
	Game.draws = 0;
	Game.SetAlert("Game Reset!");
	for (var i = 0; i < 9; i++) {
		Game.slots[i].filled = false;
		Game.slots[i].content = "";
	}
	Game.Draw();
}

Game.Win = function(who) {
	if (who == "X") {
		Game.winsX++;
	} else {
  		Game.winsO++;
	}
	Game.Reset();
	Game.SetAlert(who + "'s won!");
}

Game.SetAlert = function(what) {
	Game.alert = what;

	Game.alertTimer = setTimeout(function() {
		Game.alert = "";
	}, 1200);
}

Game.SwitchTurn = function() {
	if (Game.whosTurn == "X") {
		Game.whosTurn = "O";
	} else {
		Game.whosTurn = "X";
	}
}

/*****************************************************
			Math
*****************************************************/

Game.IsMouseWithin = function(x1, y1, x2, y2) {
	if (Game.mouseX > x1 && Game.mouseY > y1 && Game.mouseX < x2 && Game.mouseY < y2) {
		return true;
	}
	else
	{
		return false;
	}
}

Game.CalculateWin = function() {
	var hasWon = false;
	var runTwice = 0;
	var a = "X";
	while(runTwice < 2) {
		if (Game.slots[0].content == a && Game.slots[1].content == a && Game.slots[2].content == a) {Game.Win(a);hasWon = true;}
		if (Game.slots[3].content == a && Game.slots[4].content == a && Game.slots[5].content == a) {Game.Win(a);hasWon = true;}
		if (Game.slots[6].content == a && Game.slots[7].content == a && Game.slots[8].content == a) {Game.Win(a);hasWon = true;}
		
		if (Game.slots[0].content == a && Game.slots[3].content == a && Game.slots[6].content == a) {Game.Win(a);hasWon = true;}
		if (Game.slots[1].content == a && Game.slots[4].content == a && Game.slots[7].content == a) {Game.Win(a);hasWon = true;}
		if (Game.slots[2].content == a && Game.slots[5].content == a && Game.slots[8].content == a) {Game.Win(a);hasWon = true;}
		
		if (Game.slots[0].content == a && Game.slots[4].content == a && Game.slots[8].content == a) {Game.Win(a);hasWon = true;}
		if (Game.slots[2].content == a && Game.slots[4].content == a && Game.slots[6].content == a) {Game.Win(a);hasWon = true;}
	runTwice++;
	if (a == "X") a = "O";
	}

	if (!hasWon) {
		var totalFilled = 0;
		for (var i = 0; i < 9; i++) {
			if (Game.slots[i].filled) {totalFilled++;}
		}
		if (totalFilled >= 9) {
			Game.SetAlert("It's a draw!");
			Game.draws++;
			Game.Reset();
		} //else = nothing
		
	}
}


/*****************************************************
                       Drawing
*****************************************************/

Game.DrawLine = function(x1, y1, x2, y2, thickness) {
	var ctx=Game.canvas2d;
	ctx.moveTo(x1+Game.offsetX+Game.offsetBorder,y1+Game.offsetY+Game.offsetBorder);
	ctx.lineTo(x2+Game.offsetX+Game.offsetBorder,y2+Game.offsetY+Game.offsetBorder);
	ctx.lineWidth = thickness || 1;
	ctx.stroke();
}

Game.DrawOutlinedRectangle = function(x1, y1, x2, y2, colorOutline, colorFilled) {
	Game.canvas2d.fillStyle=colorOutline;
	Game.canvas2d.fillRect(x1+Game.offsetX+Game.offsetBorder,y1+Game.offsetY+Game.offsetBorder,x2-x1,y2-y1);
	Game.canvas2d.fillStyle=colorFilled;
	Game.canvas2d.fillRect(x1+1+Game.offsetX+Game.offsetBorder,y1+1+Game.offsetY+Game.offsetBorder,x2-x1-2,y2-y1-2);
	Game.canvas2d.fillStyle = '#000000';  
}

Game.Draw = function() {
	Game.canvas.width = window.innerWidth-16;
	Game.canvas.height = window.innerHeight-16;

	//Border
	if (Game.layout == 0) {
		Game.canvas2d.fillStyle="#000000";
		Game.canvas2d.fillRect(0+Game.offsetX,0+Game.offsetY,128+64+32,64*3 + 128 + 48+12);
		Game.canvas2d.fillStyle="#FFFFFF";
		Game.canvas2d.fillRect(1+Game.offsetX,1+Game.offsetY,128+64+32-2,64*3 + 128 + 48+12-2);
	}
	else {
		Game.canvas2d.fillStyle="#000000";
		Game.canvas2d.fillRect(0+Game.offsetX,0+Game.offsetY,64*3 + 256 + 48+12,128+64+32);
		Game.canvas2d.fillStyle="#FFFFFF";
		Game.canvas2d.fillRect(1+Game.offsetX,1+Game.offsetY,64*3 + 256 + 48+12-2,128+64+32-2);
	}
	Game.canvas2d.fillStyle = "#000000";

	//lines on grid
	Game.DrawLine(64, 0, 64, 64*3+2, 1);
	Game.DrawLine(64*2+1, 0, 64*2+1, 64*3+2, 1);
	Game.DrawLine(0, 64, 64*3+2, 64, 1);
	Game.DrawLine(0, 64*2+1, 64*3+2, 64*2+1, 1);

	for (var j = 0; j < 9; j++) {
		if (Game.slots[j].filled) { //Draw X or O in slot if nessasery
			Game.canvas2d.font="30px Arial";
			Game.canvas2d.fillText(Game.slots[j].content,Game.slots[j].x + 20,Game.slots[j].y + 42);
		}
		else if (Game.shadowSlot == j) { //Draw ghost X or O at mouse
			Game.canvas2d.font="30px Arial";
			Game.canvas2d.fillStyle = "#CCCCCC";
			Game.canvas2d.fillText(Game.whosTurn,Game.slots[j].x + 20,Game.slots[j].y + 42);
			Game.canvas2d.fillStyle = "#000000";
		}
	}

	//Reset Button
	Game.DrawOutlinedRectangle(32, 64*3 + 16+128, 128+36, 64*3 + 36+128, "#000000", "#FCFFDE");
	Game.canvas2d.font="14px Arial";
	Game.canvas2d.fillText("Reset Game",32 + 28 + Game.offsetX + Game.offsetBorder,64*3 + 16 + 16 + 128 + Game.offsetY + Game.offsetBorder);
	//Game.canvas2d.fillText("Reset Game",64*3 + 12 + 16 + 128 + Game.offsetX + Game.offsetBorder,32 + 24 + Game.offsetY + Game.offsetBorder);

	//Scoreboard
	Game.canvas2d.font="26px Arial";
	Game.canvas2d.fillText("X's Wins: "+Game.winsX,32 + 4+Game.offsetX+Game.offsetBorder,64*3 + 36 + 32+Game.offsetY+Game.offsetBorder);
	Game.canvas2d.fillText("O's Wins: "+Game.winsO,32 + 4+Game.offsetX+Game.offsetBorder,64*3 + 36 + 64+Game.offsetY+Game.offsetBorder);
	Game.canvas2d.fillText("Draws: "+Game.draws,32 + 4+Game.offsetX+Game.offsetBorder,64*3 + 36 + 96+Game.offsetY+Game.offsetBorder);

	//Alerts
	Game.canvas2d.font="36px Arial";
	Game.canvas2d.textAlign = 'center';
	Game.canvas2d.fillText(Game.alert,((64*3)/2)+Game.offsetX+Game.offsetBorder,64*3 + 12 + 26+Game.offsetY+Game.offsetBorder);
	
}


/***********************************************
	        Window Functions
***********************************************/

window.onmousemove = function(e) {
	Game.mouseX = e.pageX;
	Game.mouseY = e.pageY;

	Game.CreateGhost();
}

window.onload = function() {
	Game.Init();
	setInterval(function() {
		Game.Draw();
	}, 50);
	Game.Draw();
};
