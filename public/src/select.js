var select = function(game){
	var selectPersonje1;
	var selectPersonje2;
	var myCharacter;
	var ok;
	var playGame;
	var per1S,per2S;
}

select.prototype = {
	
	create: function(){
		var bgS=this.game.add.sprite(0,0,'bgS');
		var Obj=this.game.add.sprite(0,0,'selectImg');
		
		selectPersonje1=this.game.add.sprite(this.game.world.centerX,this.game.world.centerY+50,'redHood','redhoodGoSelect');
		selectPersonje1.anchor.setTo(.5);
		selectPersonje1.scale.setTo(.7);
		
		selectPersonje2=this.game.add.sprite(this.game.world.centerX,this.game.world.centerY+50,'wolf','wolfGoSelect');
		selectPersonje2.anchor.setTo(.5);
		selectPersonje2.scale.setTo(.7);
		
		selectPersonje1.visible=false;
		selectPersonje2.visible=true;	
		// console.log(selectPersonje1+" "+selectPersonje2);
		
		per1S=this.game.add.button(160,238,'redHood',this.change,this);		
		per1S.frameName='redhoodSelect';
		per1S.anchor.setTo(.5);
		per1S.scale.setTo(.7);
		per1S.input.useHandCursor = true;	
		
		per1S.onInputOver.add(function(){
			per1S.scale.setTo(.8);
		},this);	
		per1S.onInputOut.add(function(){
			per1S.scale.setTo(.7);
		},this);			
		
		per2S=this.game.add.button(540,223,'wolf',this.change,this);		
		per2S.frameName='wolfSelect';
		per2S.anchor.setTo(.5);
		per2S.scale.setTo(1.2);		
		per2S.input.useHandCursor = true;	
		per2S.onInputOver.add(function(){
			per2S.scale.setTo(1.3);
		},this);	
		per2S.onInputOut.add(function(){
			per2S.scale.setTo(1.2);
		},this);	
		
		//BOTON PLAY
		
		playGame=this.game.add.button(550,this.game.world.centerY+150,'menu',this.playTheGame,this);
		playGame.frameName = 'play-1';
		playGame.anchor.set(.5);		
		playGame.scale.setTo(.4);
		playGame.visible=false;
		playGame.onInputOver.add(function(){
			playGame.frameName = 'play-2';
			playGame.scale.setTo(.9);			
		}, this);		
		playGame.onInputOut.add(function(){
			playGame.frameName = 'play-1';
			playGame.scale.setTo(.4);			
		}, this);		
		playGame.onInputUp.add(function(){
			playGame.frameName = 'play-3';
			playGame.scale.setTo(.9);			
		}, this);
		
		
		//ok
		ok=this.game.add.button(this.game.world.centerX,this.game.world.centerY+150,'gameImg',this.okAction,this);
		ok.frameName='ok';
		ok.anchor.setTo(.5);
		ok.scale.setTo(.4);	
		ok.visible=false;
		ok.onInputOver.add(function(){
			ok.scale.setTo(.5);
		},this);	
		ok.onInputOut.add(function(){
			ok.scale.setTo(.4);
		},this);	
		ok.onInputUp.add(function(){				
			ok.frameName='ok2';
			ok.scale.setTo(.4);
		},this);	
		
	},
	okAction:function(){
		console.log("ok")
		playGame.visible=true;
		selectPersonje1.scale.setTo(1);
		selectPersonje2.scale.setTo(1);
		selectPersonje1.y=selectPersonje2.y=this.game.world.centerY+30;
		per2S.enableInput=false;
		per1S.enableInput =false;		
		
		per2S.onInputOver.add(function(){
			per2S.scale.setTo(1.2);				
		},this);	
		per1S.onInputOver.add(function(){
			per1S.scale.setTo(.7);
		},this);				
	},
	change:function(e){
		ok.visible=true;
		console.log(e.key);
		myCharacter=e.key	
		if(selectPersonje2.visible==true && e.key=="redHood"){
			selectPersonje1.visible=true;
			selectPersonje2.visible=false;	
			myCharacter=e.key
			}else if(selectPersonje1.visible==true && e.key=="wolf"){
			selectPersonje1.visible=false;
			selectPersonje2.visible=true;				
		}
		console.log(myCharacter);
	},
	playTheGame:function(){
		// console.log("play");
		this.game.state.start("theGame",true,false,myCharacter);		
	}	
}