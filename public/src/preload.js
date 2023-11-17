var preload = function(game){}

preload.prototype = {
	preload: function(){
		var bgL=this.game.add.sprite(0,0,'bgL');
		var load=this.game.add.sprite(this.game.world.centerX, this.game.world.centerY-110,'menu','loading');
		load.anchor.setTo(0.5);		
		var loadingBar1=this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'menu','bar');	
		loadingBar1.anchor.set(.5);
		loadingBar1.scale.set(.7);		
		var loadingBar2=this.game.add.image(this.game.world.centerX, this.game.world.centerY,'menu','bar2');	
		loadingBar2.anchor.set(.5);
		loadingBar2.scale.set(1.3,1.1);	
		this.load.setPreloadSprite(loadingBar2);	
		
		this.game.load.atlas('wolf','assets/wolf.png','assets/wolf.json');
		this.game.load.atlas('redHood','assets/redHood.png','assets/redHood.json');
		this.game.load.atlas('gameImg','assets/gameArray.png','assets/gameArray.json');
		this.game.load.image("bg1","assets/fondo.png");
		this.game.load.image("bgS","assets/fondo3.png");
		this.game.load.image("bgm","assets/fondo1.png");
		this.game.load.image("selectImg","assets/objSelectP.png");		
		this.game.load.image("bmd","assets/mxd.png");
		this.game.load.image("caja","assets/caja.png");
		this.game.load.image("tabla","assets/tabla.png");
		this.game.load.image("cadena","assets/cadenas.png");
		this.game.load.image("dark","assets/dark.png");
		this.game.load.image("verde","assets/verde2.png");
		this.game.load.image("inst","assets/instru.png");
		
		
		
		
		
		
		
	},	
	create: function(){
		// this.game.state.start("Select");
		this.game.state.start("Menu");		
	}
}