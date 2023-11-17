var menu= function(game){}

menu.prototype={
	
	create:function(){
		
		var loadingBackGraund=this.game.add.sprite(0,0,'bgm');		
		
		var popup = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY-40, 'inst');		 
		popup.alpha = 0.95;
		popup.anchor.set(0.5);		
		popup.scale.set(0);
		
		var playGame=this.game.add.button(550,330,'menu',this.playTheGame,this);
		playGame.frameName = 'play-1';
		playGame.anchor.set(.5);		
		playGame.scale.setTo(.4);
		playGame.onInputOver.add(function(){
			playGame.frameName = 'play-3';
			playGame.scale.setTo(.7);			
		}, this);
		
		playGame.onInputOut.add(function(){
			playGame.frameName = 'play-1';
			playGame.scale.setTo(.4);		
		}, this);
		
		playGame.onInputUp.add(function(){
			playGame.frameName = 'play-2';
			playGame.scale.setTo(.4);			
		}, this);
		var closeButton = this.game.add.button(-30, 100, 'menu',
		function(){
			// console.log("salir");
			tween = this.game.add.tween(popup.scale).to( { x:0, y: 0}, 500, Phaser.Easing.Elastic.In, true);
		},this	);
		closeButton.frameName='ok-1';
		closeButton.scale.set(.5);
		closeButton.onInputOver.add(function(){
			closeButton.frameName = 'ok-2';			
			closeButton.scale.setTo(.6);
		},this);		
		closeButton.onInputOut.add(function(){
			closeButton.frameName = 'ok-1';
			closeButton.scale.setTo(.5);			
		}, this);	
		closeButton.onInputUp.add(function(){
			closeButton.frameName = 'ok-3';
			closeButton.scale.setTo(.6);			
		}, this);		
		popup.addChild(closeButton);		
		var bmd=this.game.add.button(10,10,'bmd',this.bmWebsite,this);		
		bmd.scale.set(.5);
		
		var howGame=this.game.add.button(150,330,'menu',
		function(){			
			tween = this.game.add.tween(popup.scale).to( { x: .8, y: .8 }, 1000, Phaser.Easing.Elastic.Out, true);		 
		},
		this);
		howGame.frameName='how-2';
		howGame.anchor.set(.5);
		howGame.scale.setTo(.8);	
		howGame.onInputOver.add(function(){
			
			howGame.frameName='how-1';
			howGame.scale.set(.3);			
		},this)
		howGame.onInputOut.add(function(){
			
			howGame.frameName='how-2';
			howGame.scale.set(.8);			
		},this)
		howGame.onInputUp.add(function(){		
			howGame.frameName = 'how-3';
			howGame.scale.setTo(.3);			
			}, this);
		
		
	},	
	bmWebsite:function(){
		window.open('http://grupoeditorialmx.com/','_blank');
	},
	playTheGame:function(){	
		this.game.state.start("Select");
	},	
}