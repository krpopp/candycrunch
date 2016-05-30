
//Creates a new Phaser Game
//You might want to check here to understand the basics of Phaser: http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game
                      
SmashSpace.LevelOne = function(game){
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

SmashSpace.LevelOne.prototype = {

//var pipeScript = this;

//var hasCreated = false;
 
    create: function() {
      
        var levelOne = this;
                
        levelOne.shake = new Phaser.Plugin.Shake(levelOne);
        game.plugins.add(levelOne.shake);
        
            levelOne.world.setBounds(-500, -500, 1920, 1920);
            levelOne.finishedBalls = 0;
            
            levelOne.finishedBalls = ballsInt;
            levelOne.gridballs = ballsInt;

        levelOne.backGround = levelOne.add.sprite(-235, -160, 'l1BG');
        
        levelOne.switchSound = levelOne.add.audio('switch');
        levelOne.beltSound = levelOne.add.audio('mechanical');
        levelOne.roomTone = levelOne.add.audio('roomTone');
        levelOne.roomTone.play();
        levelOne.roomTone.loopFull(0.6);
        
        levelOne.belt5 = levelOne.add.sprite(320, 30, 'horiBelt');
        levelOne.belt5.anchor.setTo(.5, .5);
        levelOne.belt5.scale.x = -1;
        levelOne.belt5.angle += -15;        
        levelOne.belt5.animations.add('move');

        
        levelOne.belt4 = levelOne.add.sprite(300, 160, 'horiBelt');
        levelOne.belt4.anchor.setTo(.5, .5);
        levelOne.belt4.angle += 15;
        levelOne.belt4.animations.add('move');
        

        levelOne.belt3 = levelOne.add.sprite(320, 280, 'horiBelt');
        levelOne.belt3.anchor.setTo(.5, .5);
        levelOne.belt3.scale.x = -1;
        levelOne.belt3.angle += -15;
        levelOne.belt3.animations.add('move');

        
        levelOne.belt2 = levelOne.add.sprite(300, 400, 'horiBelt');
        levelOne.belt2.anchor.setTo(.5, .5);
        levelOne.belt2.angle += 15;
        levelOne.belt2.animations.add('move');
        
        levelOne.belt1 = levelOne.add.sprite(300, 520, 'horiBelt');
        levelOne.belt1.anchor.setTo(.5, 1);
        levelOne.belt1.scale.x = -1;
        levelOne.belt1.animations.add('move');
        

        levelOne.clearPipe = levelOne.add.sprite(-265, -160, 'l1clear');
        levelOne.pipe = levelOne.add.sprite(-255, -160, 'l1pipe');
        
        
        var switcher = levelOne.add.button(650, 0, 'switch', levelOne.goAway, this, 2, 0, 1);
 
    //Declare assets that will be used as tilesTopOne
        levelOne.tileTypeTopOne = [
            'red',
            'green',
            'blue',
            'yellow' 
        ];
 
 
    //Keep track of the tilesTopOne the user is trying to swap (if any)
        levelOne.activeTile1TopOne = null;
        levelOne.activeTile2TopOne = null;
 
    //Controls whether the player can make a move or not
        levelOne.canMoveTopOne = false;
 
    //Grab the weigh and height of the tilesTopOne (assumes same size for all tilesTopOne)
        levelOne.tileWidthTopOne = levelOne.game.cache.getImage('blue').width/1.1;
        levelOne.tileHeightTopOne = levelOne.game.cache.getImage('blue').height;
 
    //This will hold all of the tile sprites
        levelOne.tilesTopOne = levelOne.game.add.group();
        
        levelOne.tileXPos = [2, 3, 4, 5, 4.5, 3.5, 2.5, 1.5, 1.5, 2.5, 3.5, 4.5, 5.5, 5.5, 4.5, 3.5, 2.5, 1.5, 1.5, 2.5, 3.5, 4.5, 5.5];
        levelOne.tileYPos = [4.3, 4.3, 4.3, 4.3, 3.8, 3.5, 3.2, 2.9, 2.6, 2.3, 2, 1.7, 1.4, 1.1, 0.8, 0.5, 0.2, 0, -0.3, -0.6, -0.9, -1.2, -1.5];
        
        levelOne.allTiles = game.add.group();
 
    //Create a random data generator to use later
        var seedTopeOne = Date.now();
        levelOne.random = new Phaser.RandomDataGenerator([seedTopeOne]);

        if(levelOne.finishedBalls > 0){
            levelOne.initTileTopOne();
        }

    //hasCreated = true;
    //  }
        
         levelOne.centerPoint = levelOne.add.sprite(265, 200, null);
        levelOne.centerPoint.renderable = false;
      
    levelOne.upArrow = levelOne.add.button(-200, 480, 'l1arrow1', levelOne.changedStateUp, this, 2, 0, 1);
    levelOne.downArrow = levelOne.add.button(600, 250, 'l1arrow2', levelOne.changedStateDown, this, 2, 0, 1);

  },
    
    //add a candy function
    //calls when switch is pulled in LevelTwo
    
    
    goAway: function(){
        var levelOne = this;
        levelOne.switchSound.play();
        for(var i = 0; i < levelOne.gridballs; i++){
//            var tempArr = i;
//        //Loop through each position in a specific column, starting from the top
//            for(var j = 0; j < levelOne.gridballs; j++){
            finalBallNum++;
            var colorInt;
            if(levelOne.allTiles.children[i].tileTypeTopOne == 'red'){
                colorInt = 0;
            }
            if(levelOne.allTiles.children[i].tileTypeTopOne == 'green'){
                colorInt =1;
            }
            if(levelOne.allTiles.children[i].tileTypeTopOne == 'blue'){
                colorInt = 2;
            }
            if(levelOne.allTiles.children[i].tileTypeTopOne == 'yellow'){
                colorInt = 3;
            }
           console.log(colorInt);
   
            localStorage.setItem('finishedTile' + finalBallNum, JSON.stringify(colorInt));
            var justMade = JSON.parse(localStorage.getItem('myTile' + finalBallNum));
            delete(justMade);
//            var tile = tempArr[j];
            levelOne.add.tween(levelOne.allTiles.children[i]).to( { y: 700 }, 4000, Phaser.Easing.Linear.Out, true);
            levelOne.finishedBalls--;
           // ballsInt--;
            levelOne.belt1.animations.play('move', 20, true);
            levelOne.shake.shake(20, levelOne.belt1);
            levelOne.game.time.events.add(200, function(){
                levelOne.belt1.position.x = 300;
                levelOne.belt1.position.y = 520;
            });
            levelOne.belt2.animations.play('move', 20, true);
            levelOne.shake.shake(20, levelOne.belt2);
            levelOne.game.time.events.add(200, function(){
                levelOne.belt2.position.x = 300;
                levelOne.belt2.position.y = 400;
            });
            levelOne.belt3.animations.play('move', 20, true);
            levelOne.shake.shake(20, levelOne.belt3);
            levelOne.game.time.events.add(200, function(){
                levelOne.belt3.position.x = 320;
                levelOne.belt3.position.y = 280;
            });
            levelOne.belt4.animations.play('move', 20, true);
            levelOne.shake.shake(20, levelOne.belt4);
            levelOne.game.time.events.add(200, function(){
                levelOne.belt4.position.x = 300;
                levelOne.belt4.position.y = 160;
            });
            levelOne.belt5.animations.play('move', 20, true);
            levelOne.shake.shake(20, levelOne.belt5);
                levelOne.game.time.events.add(200, function(){
                levelOne.belt5.position.x = 320;
                levelOne.belt5.position.y = 30;
            });
            levelOne.tween = levelOne.add.tween(levelOne.allTiles.children[i]);
            if(levelOne.allTiles.children[i].position.y > 400){
                levelOne.tween.to({x:[500, 120, 500, 120, 500, 500], y: [400, 280, 150, 0, -100, -200]}, 3000 - (i * 200), "Linear");
            }
            if(levelOne.allTiles.children[i].position.y > 300 && levelOne.allTiles.children[i].position.y <= 400){
                levelOne.tween.to({x:[120, 500, 120, 500, 500], y: [280, 150, 0, -100, -200]}, 3000 - (i * 200), "Linear");
            }
            if(levelOne.allTiles.children[i].position.y > 200 && levelOne.allTiles.children[i].position.y <= 300){
                levelOne.tween.to({x:[500, 120, 500, 500], y: [150, 0, -100, -200]}, 3000 - (i * 200), "Linear");
            }
            if(levelOne.allTiles.children[i].position.y > 100 && levelOne.allTiles.children[i].position.y <= 200){
                levelOne.tween.to({x:[120, 500, 500], y: [0, -100, -200]}, 3000 - (i * 200), "Linear");
            }
            if(levelOne.allTiles.children[i].position.y > 0 && levelOne.allTiles.children[i].position.y <= 100){
                levelOne.tween.to({x:[500, 500], y: [-100, -200]}, 3000 - (i * 200), "Linear");
            }
            if(levelOne.allTiles.children[i].position.y > -100 && levelOne.allTiles.children[i].position.y <= 0){
                levelOne.tween.to({x:[500], y: [-200]}, 3000 - (i * 200), "Linear");
            }

            levelOne.tween.start();
            levelOne.tween.onComplete.add(function () {
            levelOne.belt1.animations.play('move', 20, true);
                levelOne.belt1.animations.stop('move');
                levelOne.belt2.animations.stop('move');
                levelOne.belt3.animations.stop('move');
                levelOne.belt4.animations.stop('move');
                levelOne.belt5.animations.stop('move');
            });  
            }
            levelOne.beltSound.play();
            ballsInt = 0;

    
        
        
         //   levelOne.finishedBalls = 0;
        //    myInt = 0;
          //  finalBallNum = 0;

        
    },
    
    deleteTiles: function(){
        var levelOne = this;
        
           for(var i = 0; i < levelOne.gridballs; i++){
//            var tempArr = i;
//        //Loop through each position in a specific column, starting from the top
//            for(var j = 0; j < levelOne.gridballs; j++){
//            var tile = tempArr[j];
             levelOne.allTiles.children[i].destroy();
            }
        
       
       // levelOne.initTileTopOne();

    },
    
    
    menusSels: function(){
      this.state.start('MainMenu');  
    },
    
     changedStateUp: function (){
        this.state.start('LevelTwo');
    },
    
    changedStateDown: function (){
        var levelOne = this;
        levelOne.roomTone.stop();
        this.state.start('GroundFloor');  
    },

   initTileTopOne: function (){
    
    var levelOne = this;
       
        //Loop through each column in the grid
        for(var i = 1; i <= ballsInt; i++){
            console.log("num of balls " + levelOne.finishedBalls);
            var tile = levelOne.addTileTopOne(levelOne.tileXPos[i], levelOne.tileYPos[i]);
            console.log("tile is " + tile);
 
    }
 
    //Once the tilesTopOne are ready, check for any matches on the grid
    levelOne.game.time.events.add(600, function(){
        levelOne.checkMatchTopOne();
    });
  },

    addTileTopOne: function (x, y){
 
        var levelOne = this;
       // for(var i = 0; i < levelOne.finishedBalls;i++){  
            //console.log("K is " + levelOne.forInt);
            levelOne.savedTile = JSON.parse(localStorage.getItem('myTile' + levelOne.finishedBalls));
            //console.log("my tile is " + JSON.parse(localStorage.getItem('myTile' + levelOne.finishedBalls)));
            levelOne.finishedBalls--;
            //console.log("now there are " + levelOne.finishedBalls + "balls");
       // }
        //if(levelOne.savedTile == null){
//        tileToAdd = levelOne.tileTypeTopOne[levelOne.random.integerInRange(0, levelOne.tileTypeTopOne.length - 1)]; 
        //} else {
        var tileToAdd = levelOne.tileTypeTopOne[levelOne.savedTile];
        //}
        
    //Choose a random tile to add
    //var tileToAdd = levelOne.tileTypeTopOne[levelOne.random.integerInRange(0, levelOne.tileTypeTopOne.length - 1)]; 
 
    //Add the tile at the correct x position, but add it to the top of the game (so we can slide it in)
        var tile = levelOne.tilesTopOne.create(0, (y * levelOne.tileHeightTopOne) + levelOne.tileHeightTopOne / 2, tileToAdd);
        console.log(tile.position.y);
    //Animate the tile into the correct vertical position
        levelOne.game.add.tween(tile).to({x:x*levelOne.tileWidthTopOne+(levelOne.tileWidthTopOne/2)}, 500, Phaser.Easing.Linear.In, true)
 
    //Set the tilesTopOne anchor point to the center
        tile.anchor.setTo(0.5, 0.5);
 
    //Enable input on the tile
        tile.inputEnabled = true;
 
    //Keep track of the type of tile that was added
        tile.tileTypeTopOne = tileToAdd;
 
    //Trigger the tileDownTopOne function whenever the user clicks or taps on this tile
        tile.events.onInputDown.add(levelOne.tileDownTopOne, levelOne);
        
        levelOne.allTiles.add(tile);
        
        levelOne.arrageTiles(tile);
        
        return tile;
    
  },
    
  arrageTiles: function(aTile){
      var levelOne = this;
  //    levelOne.world.bringToTop(levelOne.backGround);
      for(var i = 0; i <= levelOne.allTiles; i++){
      //levelOne.world.sendToBack(levelOne.allTiles.childrin[i]);
      }
  },

  tileDownTopOne: function(tile, pointer){
      
        var levelOne = this;
      
        //console.log(tile);
        //console.log("tileDownTopOne ran");
    //Keep track of where the user originally clicked
        if(levelOne.canMoveTopOne){
            levelOne.activeTile1TopOne = tile;
            levelOne.startPosX = (tile.x - levelOne.tileWidthTopOne/2) / levelOne.tileWidthTopOne;
            levelOne.startPosY = (tile.y - levelOne.tileHeightTopOne/2) / levelOne.tileHeightTopOne;

        }

    },

  update: function(){

    var levelOne = this;

    //The user is currently dragging from a tile, so let's see if they have dragged
    //over the top of an adjacent tile
    if(levelOne.activeTile1TopOne && !levelOne.activeTile2TopOne){
 
        //Get the location of where the pointer is currently
        var hoverX = levelOne.game.input.x-265;
        var hoverY = levelOne.game.input.y-200;
 
        //Figure out what position on the grid that translates to
        var hoverPosX = Math.floor(hoverX/levelOne.tileWidthTopOne);
        var hoverPosY = Math.floor(hoverY/levelOne.tileHeightTopOne);
 
        //See if the user had dragged over to another position on the grid
        var difX = (hoverPosX - levelOne.startPosX);
        var difY = (hoverPosY - levelOne.startPosY);
 
        //Make sure we are within the bounds of the grid
        if(!(hoverPosY > levelOne.tileGridTopOne[0].length - 1 || hoverPosY < 0) && !(hoverPosX > levelOne.tileGridTopOne.length - 1 || hoverPosX < 0)){
        console.log("x:" + hoverX);
        console.log("y" + hoverY);
            //If the user has dragged an entire tilesTopOne width or height in the x or y direction
            //trigger a tile swap
            if((Math.abs(difY) == 1 && difX == 0) || (Math.abs(difX) == 1 && difY ==0)){
 
                //Prevent the player from making more moves whilst checking is in progress
                levelOne.canMoveTopOne = false;
 
                //Set the second active tile (the one where the user dragged to)
                levelOne.activeTile2TopOne = levelOne.tileGridTopOne[hoverPosX][hoverPosY];
 
                //Swap the two active tilesTopOne
                levelOne.swaptilesTopOne();
 
                //After the swap has occurred, check the grid for any matches
                levelOne.game.time.events.add(500, function(){
                    levelOne.checkMatchTopOne();
                });
            }
 
        }
 
    }
      
          levelOne.game.camera.follow(levelOne.centerPoint);

    
  },

  swaptilesTopOne: function (){
      
    var levelOne = this;
      
    //If there are two active tilesTopOne, swap their positions
    if(levelOne.activeTile1TopOne && levelOne.activeTile2TopOne){
 
        var tile1Pos = {x:(levelOne.activeTile1TopOne.x - levelOne.tileWidthTopOne / 2) / levelOne.tileWidthTopOne, y:(levelOne.activeTile1TopOne.y - levelOne.tileHeightTopOne / 2) / levelOne.tileHeightTopOne};
        var tile2Pos = {x:(levelOne.activeTile2TopOne.x - levelOne.tileWidthTopOne / 2) / levelOne.tileWidthTopOne, y:(levelOne.activeTile2TopOne.y - levelOne.tileHeightTopOne / 2) / levelOne.tileHeightTopOne};
 
        //Swap them in our "theoretical" grid
        levelOne.tileGridTopOne[tile1Pos.x][tile1Pos.y] = levelOne.activeTile2TopOne;
        levelOne.tileGridTopOne[tile2Pos.x][tile2Pos.y] = levelOne.activeTile1TopOne;
 
        //Actually move them on the screen
        levelOne.add.tween(levelOne.activeTile1TopOne).to({x:tile2Pos.x * levelOne.tileWidthTopOne + (levelOne.tileWidthTopOne/2), y:tile2Pos.y * levelOne.tileHeightTopOne + (levelOne.tileHeightTopOne/2)}, 200, Phaser.Easing.Linear.In, true);
        levelOne.add.tween(levelOne.activeTile2TopOne).to({x:tile1Pos.x * levelOne.tileWidthTopOne + (levelOne.tileWidthTopOne/2), y:tile1Pos.y * levelOne.tileHeightTopOne + (levelOne.tileHeightTopOne/2)}, 200, Phaser.Easing.Linear.In, true);
 
        levelOne.activeTile1TopOne = levelOne.tileGridTopOne[tile1Pos.x][tile1Pos.y];
        levelOne.activeTile2TopOne = levelOne.tileGridTopOne[tile2Pos.x][tile2Pos.y];
 
    }
  

      
  },

  checkMatchTopOne: function (){
    
        var levelOne = this;
      
        levelOne.time.events.add(500, function(){
            levelOne.tileUpTopOne();
            levelOne.canMoveTopOne = true;
        });
  },
    

  tileUpTopOne: function (){
      
    var levelOne = this;
      
  	//Reset the active tilesTopOne
      levelOne.activeTile1TopOne = null;
        levelOne.activeTile2TopOne = null;
  }
};