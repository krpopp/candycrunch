
//Creates a new Phaser Game
//You might want to check here to understand the basics of Phaser: http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game

SmashSpace.LevelTwo = function (game){
    
    this.game;
    this.add;
    this.camera;
    this.cache;
    this.input;
    this.load; 
    this.math; 
    this.sound;
    this.stage;
    this.time;
    this.tweens; 
    this.state; 
    this.world; 
    this.particles; 
    this.physics;  
    this.rnd;   
  
};

SmashSpace.LevelTwo.prototype = {

    create: function (){
    
        var levelTwo = this;
    
        levelTwo.shake = new Phaser.Plugin.Shake(levelTwo);
        game.plugins.add(levelTwo.shake);
        
        levelTwo.switchSound = levelTwo.add.audio('switch');
        levelTwo.beltSound = levelTwo.add.audio('mechanical');
        levelTwo.canColor = false;
        
        levelTwo.colorInt;
        levelTwo.blankBalls = 0;
        
        levelTwo.squirt = levelTwo.add.audio('squirt');
        
        if(!visitedL2){
            levelTwo.coloredBalls = 0;
        }
        //console.log(myInt);
    
        levelTwo.blankBalls = myInt;
        
        levelTwo.backGround = levelTwo.add.sprite(0, 0, 'l2BG');
        //var pipes = levelTwo.add.sprite(0, 0, 'l2pipes');
        
        levelTwo.l2colorPipe = levelTwo.add.sprite(0, 0, 'l2colorPipe');
        levelTwo.l2bigPipe = levelTwo.add.sprite(0, 0, 'l2bigPipe');
        levelTwo.l2slide = levelTwo.add.sprite(0, 0, 'l2slide');
        
        levelTwo.l2funnel = levelTwo.add.sprite(0, 0, 'l2funnel');
   
        levelTwo.redPicker = levelTwo.add.sprite(542, 7, 'handleTurn');
        levelTwo.greenPicker = levelTwo.add.sprite(222, 10, 'handleTurn');
        levelTwo.bluePicker = levelTwo.add.sprite(47, 10, 'handleTurn');
        levelTwo.yellowPicker = levelTwo.add.sprite(387, 8, 'handleTurn');
        
        var turnRed = levelTwo.redPicker.animations.add('turn');
        var turnGreen = levelTwo.greenPicker.animations.add('turn');
        var turnBlue = levelTwo.bluePicker.animations.add('turn');
        var turnYellow = levelTwo.yellowPicker.animations.add('turn');
    
        levelTwo.tiles = levelTwo.add.group();
        var picker = levelTwo.add.group();
    
        
         
 
    // levelTwo.levels = levelTwo.add.button(350, 600, 'levels', levelTwo.menuSels, this, 2, 0, 1);
        picker.add(levelTwo.redPicker, levelTwo.greenPicker, levelTwo.bluePicker, levelTwo.yellowPicker);
        
        levelTwo.tileType = [
            'red',
            'green',
            'blue',
            'yellow',
            'blankBall'
        ];
    
        var seed = Date.now();
        random = new Phaser.RandomDataGenerator([seed]);
    
      //Choose a random tile to add
        var tileToAdd = levelTwo.tileType[random.integerInRange(4, levelTwo.tileType.length - 1)]; 
 
        //var tileToAdd = levelTwo.add.sprite(350, 300, 'blankBall');
        
    //Add the tile at the correct x position, but add it to the top of the game (so we can slide it in)
        if(myInt > 0){
            levelTwo.tile = levelTwo.tiles.create(-200, 0, tileToAdd);
        }
                 
          levelTwo.belt = levelTwo.add.sprite(470, 550, 'horiBelt');
//        levelTwo.belt.anchor.setTo(.5, 1);
//        levelTwo.belt.scale.x = -1;
          var move = levelTwo.belt.animations.add('move');
        
//        var bigPipe = levelTwo.add.sprite(10, 550, 'bigPipe');
//        bigPipe.anchor.setTo(.5, 1);
//        bigPipe.scale.x = -1;
//        var anotherPipe = levelTwo.add.sprite(500, 300, 'bigPipe');
        
        var switcher = levelTwo.add.button(900, 70, 'switch', levelTwo.beginAgain, this, 2, 0, 1);
        
//        var two = levelTwo.add.sprite(510, 200, 'two');
//        var one = levelTwo.add.sprite(100, 200, 'one');

        

   
        levelTwo.redPicker.inputEnabled = true;
        levelTwo.redPicker.input.priorityID = 1;
        levelTwo.redPicker.input.useHandCursor = true;
        levelTwo.redPicker.events.onInputDown.add(levelTwo.pickRedColor, this);
    
        levelTwo.greenPicker.inputEnabled = true;
        levelTwo.greenPicker.input.priorityID = 1;
        levelTwo.greenPicker.input.useHandCursor = true;
        levelTwo.greenPicker.events.onInputDown.add(levelTwo.pickGreenColor, this);
    
        levelTwo.bluePicker.inputEnabled = true;
        levelTwo.bluePicker.input.priorityID = 1;
        levelTwo.bluePicker.input.useHandCursor = true;
        levelTwo.bluePicker.events.onInputDown.add(levelTwo.pickBlueColor, this);
    
        levelTwo.yellowPicker.inputEnabled = true;
        levelTwo.yellowPicker.input.priorityID = 1;
        levelTwo.yellowPicker.input.useHandCursor = true;
        levelTwo.yellowPicker.events.onInputDown.add(levelTwo.pickYellowColor, this);
        
        
        if(myInt > 0){
                 levelTwo.slideTween = levelTwo.add.tween(levelTwo.tile);
        levelTwo.slideTween.to({x:[0, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 650], y: [150, 300, 350, 360, 370, 380, 390, 380, 370, 360, 350, 480]}, 1000, "Linear");
        levelTwo.slideTween.start();  
        levelTwo.slideTween.onComplete.add(levelTwo.setColorBool, this);
            levelTwo.world.sendToBack(levelTwo.belt);
            levelTwo.world.sendToBack(levelTwo.backGround);
        }
        
        
        
        levelTwo.upArrow = levelTwo.add.button(50, 550, 'l2arrow1', levelTwo.changedStateUps, this, 2, 0, 1);
        levelTwo.downArrow = levelTwo.add.button(630, 100, 'l2arrow2', levelTwo.changedStateDowns, this, 2, 0, 1);
        
        game.world.bringToTop(levelTwo.upArrow);
        game.world.bringToTop(levelTwo.downArrow);
        game.world.bringToTop(levelTwo.l2funnel);

        
    },
    
    //create ball function
    //calls when LevelOne Switch is flipped
    
    //send colored ball function
    //when switch is flipped
    //add a colored ball to an array in LevelOne
    //and called a function to add it to the array
    
    stopAll: function(){
        var levelTwo = this;
         levelTwo.belt.animations.stop('move');
    },
    
    menuSels: function(){
      this.state.start('MainMenu');  
    },
    
    changedStateUps: function (){
                var levelTwo = this;

        this.state.start('LevelThree');
        myInt = levelTwo.blankBalls;
        saveColorBalls(levelTwo.coloredBalls);
    },
    
    changedStateDowns: function (){
        var levelTwo = this;
        this.state.start('LevelOne');
        myInt = levelTwo.blankBalls;
        saveColorBalls(levelTwo.coloredBalls);
        levelTwo.coloredBalls = 0;
    },

    pickRedColor: function (){
        var levelTwo = this;
        if(levelTwo.canColor){
        levelTwo.redPicker.animations.play('turn', 10, true);
        levelTwo.shake.shake(20, levelTwo.l2bigPipe);
        levelTwo.game.time.events.add(200, function(){
                levelTwo.l2bigPipe.position.x = 0;
                levelTwo.l2bigPipe.position.y = 0;
        });
        levelTwo.time.events.add(Phaser.Timer.SECOND, levelTwo.stopTurning, this);
        levelTwo.newColor = 'red';
        levelTwo.colorInt = 0;
        var emitter = game.add.emitter(690, 450);
        emitter.width = 100;
        emitter.makeParticles('pinkDrop');
        emitter.minParticleSpeed.set(0, 300);
        emitter.maxParticleSpeed.set(0, 800);
        emitter.setRotation(0,0);
        emitter.gravity = 200;
        emitter.start(true, 800, null, 50);
        levelTwo.changeColor();
        }

    },

    pickGreenColor: function (){
        var levelTwo = this;
        if(levelTwo.canColor){
        levelTwo.greenPicker.animations.play('turn', 10, true);
        levelTwo.shake.shake(20, levelTwo.l2bigPipe);
                    levelTwo.game.time.events.add(200, function(){
                levelTwo.l2bigPipe.position.x = 0;
                levelTwo.l2bigPipe.position.y = 0;
        });
        levelTwo.time.events.add(Phaser.Timer.SECOND, levelTwo.stopTurning, this);
        levelTwo.newColor = 'green';
        levelTwo.colorInt = 1;
        var emitter = game.add.emitter(690, 450);
        emitter.width = 100;
        emitter.makeParticles('greenDrop');
        emitter.minParticleSpeed.set(0, 300);
        emitter.maxParticleSpeed.set(0, 800);
        emitter.setRotation(0,0);
        emitter.gravity = 200;
        emitter.start(true, 800, null, 50);
        levelTwo.changeColor();
        }
    },

    pickBlueColor: function (){
        var levelTwo = this;
        if(levelTwo.canColor){
        levelTwo.bluePicker.animations.play('turn', 10, true);
        levelTwo.shake.shake(20, levelTwo.l2bigPipe);
                    levelTwo.game.time.events.add(200, function(){
                levelTwo.l2bigPipe.position.x = 0;
                levelTwo.l2bigPipe.position.y = 0;
        });
        levelTwo.time.events.add(Phaser.Timer.SECOND, levelTwo.stopTurning, this);
        levelTwo.newColor = 'blue';
        levelTwo.colorInt = 2;
         var emitter = game.add.emitter(690, 450);
        emitter.width = 100;
        emitter.makeParticles('blueDrop');
        emitter.minParticleSpeed.set(0, 300);
        emitter.maxParticleSpeed.set(0, 800);
        emitter.setRotation(0,0);
        emitter.gravity = 200;
        emitter.start(true, 800, null, 50);
        levelTwo.changeColor();
        }
    },

    pickYellowColor: function (){
        var levelTwo = this;
        if(levelTwo.canColor){
        levelTwo.shake.shake(10, levelTwo.l2bigPipe);
                    levelTwo.game.time.events.add(200, function(){
                levelTwo.l2bigPipe.position.x = 0;
                levelTwo.l2bigPipe.position.y = 0;
        });
        levelTwo.yellowPicker.animations.play('turn', 10, true);
        levelTwo.time.events.add(Phaser.Timer.SECOND, levelTwo.stopTurning, this);
        levelTwo.newColor = 'yellow';
        levelTwo.colorInt = 3;
        var emitter = game.add.emitter(690, 450);
        emitter.width = 100;
        emitter.makeParticles('yellowDrop');
        emitter.minParticleSpeed.set(0, 300);
        emitter.maxParticleSpeed.set(0, 800);
        emitter.setRotation(0,0);
        emitter.gravity = 200;
        emitter.start(true, 800, null, 50);
        levelTwo.changeColor();
        }
    },

    changeColor: function (){
       
        var levelTwo = this;
        levelTwo.squirt.play();
//    tiles.remove(tile);
//    var tileToAdd = tileType[0];
//    tile = tiles.create(game.width/2, game.height/2, tileToAdd);
//    tile.inputEnabled = true;
//    tile.input.priorityID = 1;
//    tile.input.useHandCursor = true;
//    tile.events.onInputDown.add(changeColor, this);
        if(levelTwo.newColor != null){
        
        levelTwo.tile.key = levelTwo.newColor;
        levelTwo.tile.loadTexture(levelTwo.newColor, 0);
        //levelTwo.time.events.add(Phaser.Timer.SECOND * 4, levelTwo.beginAgain, this);
        }
      
    },
    
    stopTurning: function(){
        var levelTwo = this;
        levelTwo.redPicker.animations.stop('turn');
        levelTwo.bluePicker.animations.stop('turn');
        levelTwo.greenPicker.animations.stop('turn');
        levelTwo.yellowPicker.animations.stop('turn');
    },
    
     beginAgain: function(){
         var levelTwo = this;
         levelTwo.switchSound.play();
         if(levelTwo.tile.key != 'blankBall' && levelTwo.tile != null){
             levelTwo.canColor = false;
        levelTwo.world.sendToBack(levelTwo.belt);
        levelTwo.world.sendToBack(levelTwo.backGround);
        levelTwo.belt.animations.play('move', 20, true);
        levelTwo.shake.shake(20, levelTwo.belt);
                     levelTwo.game.time.events.add(200, function(){
                levelTwo.l2bigPipe.position.x = 0;
                levelTwo.l2bigPipe.position.y = 0;
        });
        levelTwo.add.tween(levelTwo.tile).to( { x: 1000 }, 2000, Phaser.Easing.Back.Out, true);
        levelTwo.blankBalls--;
        levelTwo.time.events.add(Phaser.Timer.SECOND, levelTwo.nowStop, this);
        levelTwo.coloredBalls++;
        //console.log(levelTwo.coloredBalls);
        localStorage.setItem('myTile' + levelTwo.coloredBalls, JSON.stringify(levelTwo.colorInt));
        //console.log(JSON.parse(localStorage.getItem('myTile' + levelTwo.coloredBalls)));
        levelTwo.tile = null;
        levelTwo.beltSound.play();
         }
    },
    
    setColorBool: function(){
        var levelTwo = this;
        levelTwo.canColor = true;
    },
    
    nowStop: function(){
        var levelTwo = this;
        if(levelTwo.blankBalls >= 1){
        var tileToAdd = levelTwo.tileType[random.integerInRange(4, levelTwo.tileType.length - 1)];
        levelTwo.tile = levelTwo.tiles.create(-300, 100, tileToAdd);
       
        levelTwo.slideTween = levelTwo.add.tween(levelTwo.tile);
        levelTwo.slideTween.to({x:[0, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 650], y: [150, 300, 350, 360, 370, 380, 390, 380, 370, 360, 350, 480]}, 1000, "Linear");
        levelTwo.slideTween.start();    
        levelTwo.slideTween.onComplete.add(levelTwo.setColorBool, this);
            
        }
                game.world.bringToTop(levelTwo.l2funnel);

        levelTwo.time.events.add(Phaser.Timer.SECOND, levelTwo.nowReallyStop, this);
    },
    
    nowReallyStop: function(){
        var levelTwo = this;
        levelTwo.belt.animations.stop('move');

}

}
