<!DOCTYPE HTML>
<html lang="en-US">
	<head>
		<script>var qf = "<?php if(isset($_GET['quid']))print $_GET['quid'];?>";</script>
		<meta charset="UTF-8">
		<title>Fair fight game</title>
		<script src="js/phaser.min.js"></script>	
		<script src="src/boot.js"></script>	
		<script src="src/preload.js"></script>
		<script src="src/menu.js"></script>
		<script src="src/select.js"></script>
		<script src="src/thegame.js"></script>	
		<script src="src/gameover.js"></script>	
	</head>
	<body>
		<script>
			(function(){
				var game = new Phaser.Game(683,384,Phaser.AUTO,"game");
				game.state.add("Boot", boot);
				game.state.add("Preload", preload);
				game.state.add("Menu", menu);
				game.state.add("Select",select);				
				game.state.add("theGame",thegame);				
				game.state.add("GameOver", gameOver); 
				// game.state.add("Credits", credits);
				game.state.start("Boot");			
			})();
		</script>
	</body>
</html>