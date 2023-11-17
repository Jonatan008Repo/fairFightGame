var boot=function(game){};
boot.prototype={
	preload:function(){	
		this.game.load.atlas('menu', 'assets/menuF.png','assets/menuF.json'); 	
		this.game.load.image("bgL","assets/fondo3.png");
		// this.game.load.image('loadingBG','assets/logo-back.png')
	},
	create:function(){
		this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally=true;
		this.scale.setScreenSize();
		this.game.state.start("Preload");
		this.game.world.setBounds(0,0,683,384);
	}
}
