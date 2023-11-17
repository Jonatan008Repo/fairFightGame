var gameOver = function(game){
	var score, max,myCharacter;
	var personje;
}
gameOver.prototype = {
	init: function(s,sw, m,c){
		score = s;
		scoreW=sw
		max = m;
		myCharacter=c;
	},
	create: function(){
		console.log(myCharacter);
		var bg =this.game.add.sprite(0,0,'bg1');	
		var  label=this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'gameImg');
		label.anchor.setTo(.5);
		label.scale.setTo(.8);
		if(score/max>=.5 && scoreW<3){
			personje=this.game.add.sprite(150,this.game.world.centerY,myCharacter,myCharacter+'Win');
			personje.anchor.setTo(.5);
			personje.scale.setTo(1.2);	
			label.frameName='win';			
		}
		else if(scoreW==3){
			personje=this.game.add.sprite(550,this.game.world.centerY,myCharacter,myCharacter+'Lose');
			personje.anchor.setTo(.5);
			personje.scale.setTo(1.2);			
			label.frameName='lose';
			
		}		
		if(myCharacter=="wolf"){
			personje.x=550;
			label.x=label.x-100;
		}
		else{			
			personje.x=150;		
			label.x=label.x+100;
		}		
		var again = this.game.add.button(450,340,'gameImg',this.playTheGame,this);
		again.frameName='again';
		again.anchor.set(.5);
		again.scale.setTo(.6);
		
		again.onInputOver.add(function(){
			again.frameName = 'again3';
			again.scale.setTo(.3);
		}, this);		
		again.onInputOut.add(function(){
			again.frameName = 'again';
			again.scale.setTo(.6);
			}, this);		
		again.onInputUp.add(function(){
		again.frameName = 'again2';
		again.scale.setTo(.7);
		}, this);	
		
		var bmd = this.game.add.button(this.game.world.width - 10, 10,"bmd",this.bmWebsite,this);
		bmd.anchor.setTo(1,0);
		bmd.scale.set(.4);	
	},
	playTheGame: function(){
		location.reload();
	},
	bmWebsite: function(){
		window.open('http://grupoeditorialmx.com/','_blank');
	}
}