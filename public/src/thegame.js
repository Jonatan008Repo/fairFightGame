var thegame=function(game){
	var myCharacter,CharacterEnemy;
	var bgF;
	var barLifeRH,barLifeW;
	var barIndLifeRH,barIndLifeW;
	var Personje1,Personje2;
	var caja;
	var ansa;
	var ansb;
	var feedRightOrWrong;
	var wolfAtackSelect,redHoodAtack;
	var dark;
	var decremento;
	var decremento1;
	quest = [];
	currPlayer = 1;
	maxQuestions = 6;
	ansQuestions = 0;
	score = [0,0,0];
	scoreWrong  = [0,0,0];
	info = {"numAnswerBox":2,"type":"option"};
}
thegame.prototype={
	
	init:function(s){
		myCharacter=s;
	},		
	preload:function(){
		if(qf!=""){
			this.game.load.text('questions', '../quest/'+qf+'.json');			
		} 
		else {
			this.game.load.text('questions', 'src/questions.json');			
		}	
	},
	create:function(){
		// console.log(myCharacter);		
		this.myCharacterPlayer();
		bgF=this.game.add.sprite(0,0,'bg1');	
		var questions = JSON.parse(this.game.cache.getText('questions'));
		for(var i = 0; i < questions.questions.length; i++){
			quest.push(questions.questions[i]);
		}
		var questStyle = { font: "25px Arial", fill: "#FFFFFF", align: "center"};
		var questText = this.game.add.text(0, 0, 'Question', questStyle);
		var ansaStyle = { font: "50px Arial", fill: "#ffffff", align: "center" };
		var ansaText = this.game.add.text(0, -15, 'Answer A', ansaStyle);
		var ansbStyle = { font: "50px Arial", fill: "#ffffff", align: "center" };
		var ansbText = this.game.add.text(0, 0, 'Answer B', ansbStyle);
		
		barLifeRH=this.game.add.sprite(10,10,'gameImg','barraVida1');
		barLifeW=this.game.add.sprite(420,10,'gameImg','barraVida2');
		barLifeRH.scale.setTo(1.25);
		barLifeW.scale.setTo(1.25);
		
		barIndLifeRH=this.game.add.sprite(10,9,'verde');		
		barIndLifeW=this.game.add.sprite(20,9,'gameImg','verde');
		barIndLifeRH.scale.setTo(.17,.15);
		barIndLifeW.scale.setTo(.17,.15);
		// console.log(barIndLifeRH);		
		decremento=.17;
		decremento1=.17;
		barLifeRH.addChild(barIndLifeRH);
		barLifeW.addChild(barIndLifeW);
		
		Personje1=this.game.add.sprite(150,this.game.world.centerY,'redHood','redhoodGoSelect');
		Personje1.anchor.setTo(.5);
		Personje1.scale.setTo(1.2);
		
		Personje2=this.game.add.sprite(550,this.game.world.centerY,'wolf','wolfGoSelect');
		Personje2.anchor.setTo(.5);
		Personje2.scale.setTo(1.2);
		
		vs = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'gameImg','vs')
		vs.anchor.setTo(.5);
		vs.scale.setTo(0);
		var tween1=this.game.add.tween(vs.scale).to({x:.5,y:.5}, 500, Phaser.Easing.Elastic.In, true,500);
		tween1.onComplete.addOnce(function(){
			var tween2 = this.game.add.tween(vs.scale).to({x:0,y:0}, 500, Phaser.Easing.Elastic.In, true,1000);
			tween2.onComplete.addOnce(function(){
				this.preguntar();
			}, this);
		}, this);		
		
		var pasto=this.game.add.sprite(0,245,'gameImg','pasto');
		pasto.scale.setTo(1,1.6);
		
		caja = this.game.add.sprite(0, 0,'caja');
		caja.visible=false
		caja.scale.setTo(.8);
		caja.anchor.setTo(.5);
		caja.addChild(questText);		
		questText.wordWrap = true;
		questText.anchor.setTo(.5)
		questText.wordWrapWidth = caja.width;
		
		ansa = this.game.add.sprite(0, 0,"tabla");
		ansa.visible=false
		ansa.scale.set(.4);
		ansa.anchor.setTo(.5);
		ansa.inputEnabled = true;
		ansa.input.useHandCursor = true;		
		ansa.addChild(ansaText);
		ansaText.wordWrap = true;
		ansaText.anchor.set(0.5);
		ansaText.wordWrapWidth = ansa.width - 20;
		
		ansb = this.game.add.sprite(0,0,"tabla");
		ansb.visible=false
		ansb.scale.set(.4);
		ansb.anchor.set(0.5);
		ansb.inputEnabled = true;
		ansb.input.useHandCursor = true;
		ansb.addChild(ansbText);
		ansbText.anchor.set(0.5);		
		ansbText.wordWrap = true;
		ansbText.wordWrapWidth = ansa.width - 20;	
		
		feedRightOrWrong = this.game.add.sprite(0,0,'gameImg','paloma');
		feedRightOrWrong.anchor.set(.5);
		feedRightOrWrong.visible = false;
		
		dark=this.game.add.sprite(0,0,'dark');
		dark.alpha=.5;
		dark.visible=false;
		
		redHoodAtack=this.game.add.sprite(Personje1.x,Personje1.y,'redHood','redhoodAtack');
		wolfAtack=this.game.add.sprite(Personje2.x,Personje2.y,'wolf','wolfAtackSelect');
		redHoodAtack.anchor.setTo(.5);
		wolfAtack.anchor.setTo(.5);
		redHoodAtack.scale.set(.4);
		wolfAtack.scale.set(.4);
		redHoodAtack.visible=false;
		wolfAtack.visible=false;
		
		var bmd = this.game.add.button(this.game.world.centerX, 10,"bmd",this.bmWebsite,this);
		bmd.anchor.setTo(.5,0);
		bmd.scale.set(.4);		
		
	},
	preguntar: function(){
		currQuest = this.game.rnd.integerInRange(0, quest.length-1);
		currQuestWrong = this.game.rnd.integerInRange(0, quest.length-1);	
		
		if(quest[currQuest].answers.length > info.numAnswerBox){
			
			caja.children[0].text = quest[currQuest].question;
			var tempAnsArr = [];
			for(i = 0;i<quest[currQuest].answers.length;i++){
				if(quest[currQuest].answers[i].correct){
					tempAnsArr.push(quest[currQuest].answers[i]);
					quest[currQuest].answers.splice(i,1);
				}
			}
			
			var selected = -1;
			for(i = 0;i < info.numAnswerBox-1;i++){
				selected = this.game.rnd.integerInRange(0, quest[currQuest].answers.length-1);
				tempAnsArr.push(quest[currQuest].answers[selected]);
				quest[currQuest].answers.splice(selected,1);
			}
			tempAnsArr = this.shuffle(tempAnsArr);
			
			ansa.children[0].text = tempAnsArr[0].text;
			ansb.children[0].text = tempAnsArr[1].text;
			ansa.correct = tempAnsArr[0].correct;
			ansb.correct = tempAnsArr[1].correct;
			
			} else if(quest[currQuest].answers.length == 2){
			
			caja.children[0].text = quest[currQuest].question;
			ansa.children[0].text = quest[currQuest].answers[0].text;
			ansb.children[0].text = quest[currQuest].answers[1].text;
			ansa.correct = quest[currQuest].answers[0].correct;
			ansb.correct = quest[currQuest].answers[1].correct;			
		}	
		
		ansa.y = -100;
		ansa.x = 200;
		ansb.y = -100;
		ansb.x = 500;
		caja.y = -100;
		caja.x = this.game.world.centerX;
		ansa.visible=true;
		ansb.visible=true;
		caja.visible=true;
		
		var cajaTweenIn = this.game.add.tween(caja);
		cajaTweenIn.to(	{y:150},500,Phaser.Easing.Bounce.Out,true,1000);
		cajaTweenIn.start();
		
		var answaTweenIn = this.game.add.tween(ansa);
		answaTweenIn.to({y:320},500,Phaser.Easing.Bounce.Out,true,1000);
		answaTweenIn.start();
		
		var answbTweenIn = this.game.add.tween(ansb);
		answbTweenIn.to({y:320},500,Phaser.Easing.Bounce.Out,true,1000);
		answbTweenIn.start();
		
		ansa.events.onInputDown.add(this.responder, this);
		ansb.events.onInputDown.add(this.responder, this);
		ansa.enableInput = true;
		ansb.enableInput = true; 
		
	},
	myCharacterPlayer:function(){
		if(myCharacter=="wolf"){
			CharacterEnemy="redHood";			
		}
		else if(myCharacter=="redHood"){
			CharacterEnemy="wolf";			
		}
		console.log(CharacterEnemy)
	},	
	responder:function(ans){	
		console.log("contestando");
		
		if(ansa.enableInput == true && ansb.enableInput == true){
			ansa.enableInput = false;
			ansb.enableInput = false;
			
			if(ans.correct){
				quest.splice(currQuest, 1);
				score[currPlayer]++;
				feedRightOrWrong.frameName="paloma"		
			}	
			else{
				quest.splice(currQuestWrong, 1);
				scoreWrong[currPlayer]++;				
				feedRightOrWrong.frameName='equis';	
			}	
			
			feedRightOrWrong.x = ans.x;
			feedRightOrWrong.y = ans.y;
			feedRightOrWrong.scale.setTo(0);
			feedRightOrWrong.visible = true;
			feedRightOrWrong.alpha = 1;
			
			var feedTweenIn = this.game.add.tween(feedRightOrWrong.scale);
			feedTweenIn.to({ x: 1, y: 1 },300,Phaser.Easing.Circular.In);
			var feedTweenOut = this.game.add.tween(feedRightOrWrong);
			feedTweenOut.to({ alpha: 0 },150,Phaser.Easing.Circular.In);
			feedTweenIn.chain(feedTweenOut);
			feedTweenOut.onComplete.add(function(){
				caja.visible=false;
				ansa.visible = false;
				ansb.visible = false;
				
				console.log(score+' '+scoreWrong);
				if(ans.correct){					
					this.lifeHurt("correct");						
				}
				else{
					this.lifeHurt("Wrong");
				}
				// if(score[currPlayer] >=10 || scoreWrong[currPlayer] >= 3 ){	
				// // this.gam.time.events.add(Phaser.Timer.SECOND * 2, this.togameOver, this);
				// this.game.state.start("GameOver",true, false, score[currPlayer], maxQuestions);
				// }
			},this);
			feedTweenIn.start();			
		}
	},
	togameOver: function(){
		console.log("adios");
		// this.game.state.start("GameOver",true, false, score[currPlayer], maxQuestions);
	},
	wolfGoAtack:function(){
		dark.visible=true;
		wolfAtack.x=700;			
		wolfAtack.visible=true;
		var tweenWolfGoAtack=this.game.add.tween(wolfAtack).to( { x: Personje2.x }, 1000, Phaser.Easing.Bounce.Out, true,100);
		var tweenWolfGoAtack1=this.game.add.tween(wolfAtack.scale).to( { x:1.5,y:1.5 }, 1000, Phaser.Easing.Bounce.Out, true);
		tweenWolfGoAtack.onComplete.add(function(){
			var tweenWolfGoAtackOut=this.game.add.tween(wolfAtack).to( { x: -400}, 800,Phaser.Easing.Circular.Out,true);
			tweenWolfGoAtackOut.onComplete.add(function(){
				dark.visible=false;
				if(score[currPlayer] >=7|| scoreWrong[currPlayer] >= 3 ){	
					// this.gam.time.events.add(Phaser.Timer.SECOND * 2, this.togameOver, this);
					this.game.state.start("GameOver",true, false, score[currPlayer],  scoreWrong[currPlayer] ,maxQuestions,myCharacter);
				}
				else{
					this.preguntar();
				}
			},this)
		},this);	
		
		
	},
	redHoodGoAtack:function(){
		dark.visible=true;
		redHoodAtack.x=-100;			
		redHoodAtack.visible=true;
		var tweenredHoodGoAtack=this.game.add.tween(redHoodAtack).to( { x: Personje1.x }, 1000, Phaser.Easing.Bounce.Out, true,100);
		var tweenredHoodGoAtack1=this.game.add.tween(redHoodAtack.scale).to( { x:1.7,y:1.7 }, 1000, Phaser.Easing.Bounce.Out, true);
		tweenredHoodGoAtack.onComplete.add(function(){
			var tweenredHoodGoAtackOut=this.game.add.tween(redHoodAtack).to( { x: 900}, 800,Phaser.Easing.Circular.Out,true);
			tweenredHoodGoAtackOut.onComplete.add(function(){
				dark.visible=false;				
				if(score[currPlayer] >=7 || scoreWrong[currPlayer] >= 3 ){	
					// this.gam.time.events.add(Phaser.Timer.SECOND * 2, this.togameOver, this);
					this.game.state.start("GameOver",true, false, score[currPlayer], scoreWrong[currPlayer] , maxQuestions,myCharacter);
				}
				else{
					this.preguntar();
				}
			},this)
		},this);
		
	},
	lifeHurt:function(chpS){	
		if(chpS=="correct"){			
			
			if(CharacterEnemy=="redHood"){
				this.wolfGoAtack();
				console.log(barIndLifeRH);
				decremento=decremento-.0242;
				console.log(decremento);
				barIndLifeRH.scale.setTo(decremento,.15);
				console.log(barIndLifeRH.x);
				// barIndLifeRH.x=barIndLifeRH.x-70;
			}
			else{
				this.redHoodGoAtack();
				decremento=decremento-.0242;
				barIndLifeW.scale.setTo(decremento,.15);
				barIndLifeW.x=barIndLifeW.x+20;
			}
		}
		else if(chpS=="Wrong"){
			if(myCharacter=="redHood"){
				this.wolfGoAtack();		
				decremento1=decremento1-.0566;
				barIndLifeRH.scale.setTo(decremento1,.15);
				console.log(barIndLifeRH.x);
				// barIndLifeRH.x=barIndLifeRH.x-70;
			}
			else{			
				this.redHoodGoAtack();	
				decremento1=decremento1-.0566;
				barIndLifeW.scale.setTo(decremento1,.15);
				barIndLifeW.x=barIndLifeW.x+56;
			}
		}
	},
	bmWebsite:function(){
		window.open('http://grupoeditorialmx.com/','_blank');
	},
	shuffle: function (array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
	}
	
}
