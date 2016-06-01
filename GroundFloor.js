
//Creates a new Phaser Game
//You might want to check here to understand the basics of Phaser: http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game

SmashSpace.GroundFloor = function (game){
    
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

SmashSpace.GroundFloor.prototype = {

    //var cursor;
   // var isPressed = false;
    
    create: function () {
        
    var me = this;
        
        
    
    me.shake = new Phaser.Plugin.Shake(me);
    game.plugins.add(me.shake);    
        
    me.dropSound = me.add.audio('drop');
    me.crunchSound = me.add.audio('crunch');
    me.whooshSound = me.add.audio('whoosh');
    me.clickSound = me.add.audio('click');
        
    me.music = me.add.audio('music');
    me.music.play();
    me.music.loopFull(0.6);
        
    me.gridTotal = 1;
    me.tileNum = 0;
    //me.juicy = me.game.plugins.add(Phaser.Plugin.Juicy);
        
    me.world.setBounds(-500, -500, 1920, 1920);
    me.game.stage.backgroundColor = "ffffff";
        
    me.BG = me.add.sprite(-315, -200, 'gameSky');  
    me.cloud1 = me.add.sprite(-480, -100,'cloud1');
    me.cloud2 = me.add.sprite(-780, -200,'cloud2');       
    me.grass2 = me.add.sprite(-480, 0, 'grass3');    
    me.grass3 = me.add.sprite(240, 0, 'grass3');  
    me.grass1 = me.add.sprite(-315, -150, 'grass1');  
    me.scoreBack = me.add.sprite(400, 190, 'scoreBack');
        
    var style = {fill: "#ffffff"};
    me.score = 0;
    me.scoreText = game.add.text(465, 263, '0  0  0  ' + me.score, style);     
        
    me.yellowBar = me.add.sprite(-225, -10, 'yellowBar');      
    me.horiPipe1 = me.add.sprite(-100, 50, 'horiPipe');   
    me.horiPipe2 = me.add.sprite(-100, 150, 'horiPipe');   
    me.horiPipe3 = me.add.sprite(-100, 250, 'horiPipe');       
    me.yellowBack = me.add.sprite(-38, -70, 'yellowBack');      
    me.topPipe = me.add.sprite(-180, -75, 'topPipe');
    me.emptyGrid = me.add.sprite(-30, -18, 'emptyGrid');
    me.emptyBar = me.add.sprite(-218, 42, 'emptyBar');
    me.powerBar = me.add.sprite(-166, 435, 'powerBar');
    me.sign = me.add.sprite(590, 250, 'sign');
    me.door = me.add.sprite(590, 310, 'door'); 
    me.UIbottom = me.add.sprite(-315, 465, 'UIbottom');
    me.pauseButt = me.add.button(-240, 470, 'button', me.pause, this, 1, 0, 2);
    me.pauseWords = me.add.sprite(-240, 470, 'pause');
    me.aboutButt = me.add.button(60, 470, 'button', me.tut, this, 1, 0, 2);
    me.tutWords = me.add.sprite(60, 470, 'tut');
    me.optionsButt = me.add.button(360, 470, 'button', me.options, this, 1, 0, 2);
    me.optionsWords = me.add.sprite(360, 470, 'options');

    me.topBar = me.add.sprite(0, -130, 'topBar');   
        
        
    me.door = me.add.button(590, 310, 'door', me.changeStateUp, this, 2, 0, 1);
        
    me.tileType = [
        'red',
        'green',
        'blue',
        'yellow'
    ];
         
    me.powerBar.anchor.setTo(0.5, 1);    
        
    //Keep track of the users score
    me.score = 0;
 
    //Keep track of the tiles the user is trying to swap (if any)
    me.activeTile1 = null;
    me.activeTile2 = null;
 
    //Controls whether the player can make a move or not
    me.canMove = false;
 
    //Grab the weigh and height of the tiles (assumes same size for all tiles)
    me.tileWidth = me.game.cache.getImage('blue').width;
    me.tileHeight = me.game.cache.getImage('blue').height;
 
    //This will hold all of the tile sprites
    me.tiles = me.game.add.group();
 
    //Initialise tile grid, this array will hold the positions of the tiles
    //Create whatever shape you'd like
    me.tileGrid = [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null]
    ];
        
    me.startGrid = [0, 1, 0, 2, 3, 2, 2, 3, 1, 0, 1, 0, 0, 2, 3, 3, 3, 2, 1, 0, 0, 2, 3, 2, 0];
    me.startTileNum = 0;
 
    //Create a random data generator to use later
    var seed = Date.now();
    me.random = new Phaser.RandomDataGenerator([seed]);

    if(!gridHasSaved){
        me.initFirstTiles();
    } else if(gridHasSaved){
        me.initTiles();
    }

        
    me.centerPoint = me.add.sprite(185, 220, null);
    me.centerPoint.renderable = false;
        
    me.cloudMove1();
    me.time.events.add(Phaser.Timer.SECOND *4, me.cloudMove2, this); 
        
        
    me.powerBarInt = 1;          
    me.cropRect = new Phaser.Rectangle(0,0,me.powerBar.width,0);       
    me.powerBar.crop(me.cropRect); 
    
       // me.result = "";

   // me.gradNewTiles();

  },
    
    pause: function(){
        var me = this;
        game.paused = true;
        var pauseScreen = me.add.sprite(-315, -140, 'pauseScreen');
        pauseScreen.inputEnabled = true;
        game.input.onDown.add(unpause, self);
        function unpause(event){
            //console.log("in");
            game.paused = false;
            pauseScreen.destroy();
        };
    },

    
    tut: function(){
        var me = this;
        var pauseScreen = me.add.sprite(-315, -140, 'howToPlay');
        pauseScreen.inputEnabled = true;
        game.input.onDown.add(unpause, self);
        function unpause(event){
            //console.log("in");
            game.paused = false;
            pauseScreen.destroy();
        };
    },
    
    options: function(){
        var me = this;
        var pauseScreen = me.add.sprite(-315, -140, 'volume');
        var downButt = me.add.button(-80, 110, 'smallButt', me.decreaseVol, this, 1, 0, 2);
        var upButt = me.add.button(360, 110, 'smallButt', me.increaseVol, this, 1, 0, 2);
        var minus = me.add.sprite(-36, 148, 'minus');
        var plus = me.add.sprite(398, 140, 'plus');
        var exOut = me.add.button(-260, -130, 'exOut', unpause, this);
        function unpause(event){
            console.log("in");
            game.paused = false;
            pauseScreen.destroy();
            downButt.destroy();
            upButt.destroy();
            minus.destroy();
            plus.destroy();
            exOut.destroy();
        };

    },
    
    increaseVol: function(){
        var me = this;
        if(me.music.volume < 1){
            console.log(me.music.volume);
            me.music.volume += 0.1;
        }
    },
    
    decreaseVol: function(){
        var me = this;
        if(me.music.volume > 0){
            console.log(me.music.volume);
            me.music.volume -= 0.1;
        }
    },
    
    menuSel: function(){
        this.state.start('MainMenu');
    },
    
       cloudMove1: function(){
        var me = this;
        var tweenLength = [20000, 22000, 24000, 14000];
        var cloud1Tween = me.game.add.tween(me.cloud1).to({x:900}, me.game.rnd.pick(tweenLength), Phaser.Easing.Linear.In, true);
        cloud1Tween.onComplete.add(me.cloud1Respawn, this);
    },
    
    cloudMove2: function(){
        var me = this;
        var tweenLength = [22000, 240000, 22000, 14000];
        var cloud2Tween = me.game.add.tween(me.cloud2).to({x:900}, me.game.rnd.pick(tweenLength), Phaser.Easing.Linear.In, true);
        cloud2Tween.onComplete.add(me.cloud2Respawn, this);
    },
    
    cloud1Respawn: function(){
        var me = this;
        me.cloud1.position.x = -700;
        me.cloudMove1();
    },
    
    cloud2Respawn: function(){
        var me = this;
        me.cloud2.position.x = -700;
        me.cloudMove2();
    },

   initTiles: function(){
       
    var me = this;
       
       
    //Loop through each column in the grid
    for(var i = 0; i < me.tileGrid.length; i++){
 
        //Loop through each position in a specific column, starting from the top
        for(var j = 0; j < me.tileGrid.length; j++){
            //console.log("i is " + i);
            //console.log("j is " + j);
            //Add the tile to the game at this grid position
           // var tile = me.addTile(i, j);
            
               if (me.tileGrid[i][j] == null){
            
                    var tile = me.addTile(i,j);
                    me.tileGrid[i][j] = tile;

                    }         
            }
        }

 
    me.game.time.events.add(600, function(){
        me.extraFillTile();
    });
       
       
       
    //Once the tiles are ready, check for any matches on the grid
    me.game.time.events.add(800, function(){
        me.checkMatch();
    });
  },

    
    initFirstTiles: function(){
       
    var me = this;
       
       
    //Loop through each column in the grid
    for(var i = 0; i < me.tileGrid.length; i++){
 
        //Loop through each position in a specific column, starting from the top
        for(var j = 0; j < me.tileGrid.length; j++){
            //console.log("i is " + i);
            //console.log("j is " + j);
            //Add the tile to the game at this grid position
           // var tile = me.addTile(i, j);
            
               if (me.tileGrid[i][j] == null){
            
                    var tile = me.addfirstTile(i,j);
                    me.tileGrid[i][j] = tile;

                    }         
            }
        }

 
    me.game.time.events.add(600, function(){
        me.extraFillTile();
    });
       
       
       
    //Once the tiles are ready, check for any matches on the grid
    me.game.time.events.add(800, function(){
        me.checkMatch();
    });
  },
    
    addTile: function(x, y){
    
        var me = this;

        if(gridHasSaved){
            //console.log("startover");
            me.savedTile = JSON.parse(localStorage.getItem('gridTile' + me.gridTotal));
            //me.savedTile = parseInt(me.result[me.gridTotal]);
            me.gridTotal++;
            if(me.savedTile == 4){
                if(premadeBalls <= 0 && finalBallNum > 0){
                    
                }else{
                    var tileToAdd = null;
                }
            } else{
                var tileToAdd = me.tileType[me.savedTile];
                var tile = me.tiles.create((x * me.tileWidth) + me.tileWidth / 2, 0, tileToAdd);
                tile.position.y = (y*me.tileHeight+(me.tileHeight/2));
                tile.anchor.setTo(0.5, 0.5);
                tile.inputEnabled = true;
                tile.tileType = tileToAdd;
                tile.events.onInputDown.add(me.tileDown, this);
                return tile;
            }
        }else{
            //Choose a random tile to add
            var tileToAdd = me.tileType[me.random.integerInRange(0, me.tileType.length - 1)]; 
            var tile = me.tiles.create((x * me.tileWidth) + me.tileWidth / 2, 0, tileToAdd);
            me.dropTween = me.game.add.tween(tile).to({y:y*me.tileHeight+(me.tileHeight/2)}, me.random.integerInRange(400, 500), Phaser.Easing.Bounce.Out, true);      
            me.dropTween.onComplete.add(function () {
                me.dropSound.play();
            });  
            tile.anchor.setTo(0.5, 0.5);
            tile.inputEnabled = true;
            tile.tileType = tileToAdd;
            tile.events.onInputDown.add(me.tileDown, this);
            return tile;

        }
    
  },
    
    addfirstTile: function(x, y){
      var me = this;
            var tileToAdd = me.tileType[me.startGrid[me.startTileNum]]; 
            me.startTileNum++;
            var tile = me.tiles.create((x * me.tileWidth) + me.tileWidth / 2, 0, tileToAdd);
            me.dropTween = me.game.add.tween(tile).to({y:y*me.tileHeight+(me.tileHeight/2)}, me.random.integerInRange(400, 500), Phaser.Easing.Bounce.Out, true);      
            me.dropTween.onComplete.add(function () {
                me.dropSound.play();
            });  
            tile.anchor.setTo(0.5, 0.5);
            tile.inputEnabled = true;
            tile.tileType = tileToAdd;
            tile.events.onInputDown.add(me.tileDown, this);
            return tile;
    },
    
        addNewTile: function(x,y){
        var me = this;
        if(finalBallNum > 0){
            //console.log(finalBallNum);
            me.newTile = JSON.parse(localStorage.getItem('finishedTile' + finalBallNum));
            //console.log(parseInt(me.result.charAt(me.finalBallNum)));
            //me.newTile = parseInt(me.result.charAt(me.finalBallNum - 1));
            finalBallNum--;
            console.log(me.newTile);
            var tileToAdd = me.tileType[me.newTile];
            var tile = me.tiles.create((x * me.tileWidth) + me.tileWidth / 2, 0, tileToAdd);
            me.dropTween = me.game.add.tween(tile).to({y:y*me.tileHeight+(me.tileHeight/2)}, me.random.integerInRange(400, 500), Phaser.Easing.Bounce.Out, true);      
//                    me.dropTween.onComplete.add(function () {
//                        me.dropSound.play();
//                    });
            tile.position.y = (y*me.tileHeight+(me.tileHeight/2));
                    //Set the tiles anchor point to the center
            tile.anchor.setTo(0.5, 0.5);
            //Enable input on the tile
            tile.inputEnabled = true;
            tile.tileType = tileToAdd;
            tile.events.onInputDown.add(me.tileDown, this);
 
            return tile;
        } else {
            var tile = null;
        }
    
    },
    

    saveGameGrid: function(){
        var me = this;
        gridHasSaved = true;
        for(var i = 0; i < me.tileGrid.length; i++){
 
        //Loop through each position in a specific column, starting from the top
        for(var j = 0; j < me.tileGrid.length; j++){
 
            //Add the tile to the game at this grid position
            var tile = me.tileGrid[i][j];
            var colorInt = 0;
            me.tileNum++;

           if(me.tileGrid[i][j] != null){
            if(me.tileGrid[i][j].tileType == 'red'){
                colorInt = 0;
            }
            if(me.tileGrid[i][j].tileType == 'green'){
                colorInt =1;
            }
            if(me.tileGrid[i][j].tileType == 'blue'){
                colorInt = 2;
            }
            if(me.tileGrid[i][j].tileType == 'yellow'){
                colorInt = 3;
            }
           } else if(me.tileGrid[i][j] == null){
               colorInt = 4;
           }
        
            //console.log(colorInt);
            localStorage.setItem('gridTile' + me.tileNum, JSON.stringify(colorInt))
        }
            
        }
    },
    
    onFinisihDrop: function(){
        var me = this;
        me.dropSound.play();
    },
    
    changeStateUp: function (){
        var me = this;
        //console.log(me.tileGrid);
            me.saveGameGrid();
        me.music.stop();
        this.state.start('LevelOne');
    
//    var xmlhttp;
//    if (window.XMLHttpRequest)
//      {
//      // code for IE7+, Firefox, Chrome, Opera, Safari
//      xmlhttp=new XMLHttpRequest();
//      }
//    else
//      {
//      // code for IE6, IE5
//      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//      }
//
////    xmlhttp.onreadystatechange=function()
////      {
////      if (xmlhttp.readyState==4 && xmlhttp.status==200)
////        {
////        document.getElementById("mytextfiledic").innerHTML=xmlhttp.responseText;
////        }
////      }
//
//    xmlhttp.open("GET","afp://phaser.magnet.tsoa.nyu.edu/common/data/test.txt",true);
//        
//    xmlhttp.onreadystatechange = function() {
//
//        if( xmlhttp.readyState == 4 ) {
//
//            if( xmlhttp.status >= 200 && xmlhttp.status<300 || xmlhttp.status == 304  ) {
//                //your text file is downloaded into xhr.responseText
//                console.log( xmlhttp.responseText.split('\n') );// there you have your array.
//            }
//
//        }
//
//    }        
//        
//        
//        
//    xmlhttp.send();     
        

    },
    
    changeStateDown: function (){
        this.state.start('Basement');
    },
    

    tileDown: function(tile, pointer){
        
        var me = this;
        if(me.canMove){
        me.clickSound.play();
        if(me.activeTile1 != null){
            //console.log("in");
            me.canMove = false;
            me.activeTile2 = tile;
            me.add.tween(me.activeTile1.scale).to({x:1.5, y:1.5}, 10, Phaser.Easing.Bounce.Out, true);
            me.time.events.add(Phaser.Timer.SECOND *0.1, me.downSize2, this);
            //Swap the two active tiles
            me.swapTiles();
            //After the swap has occurred, check the grid for any matches
            me.game.time.events.add(500, function(){
                me.checkMatch();
            });
        }
    //Keep track of where the user originally clicked
        if(me.activeTile1 == null){
            me.activeTile1 = tile;
            //console.log(tile);
            me.startPosX = (tile.x - me.tileWidth/2) / me.tileWidth;
            me.startPosY = (tile.y - me.tileHeight/2) / me.tileHeight;
            me.add.tween(me.activeTile1.scale).to({x:1.5, y:1.5}, 10, Phaser.Easing.Bounce.Out, true);
            me.time.events.add(Phaser.Timer.SECOND *0.1, me.downSize, this);
        }
        }
    },
    
downSize: function(){
    var me = this;
    me.add.tween(me.activeTile1.scale).to({x:1, y:1}, 100, Phaser.Easing.Linear.None, true);
},
downSize2: function(){
    var me = this;
    me.add.tween(me.activeTile2.scale).to({x:1, y:1}, 100, Phaser.Easing.Linear.None, true);
},

update: function(){

    var me = this;
    
    me.game.camera.follow(me.centerPoint);

    if(me.powerBar.height == 373){
        //me.score++;
        me.scoreText.text = '0  0  0  1';
    }
    
    if(me.gridTotal >= 26 && gridHasSaved){
       // console.log("grid total " + me.gridTotal);
        //console.log("switch gridhassaved");
        gridHasSaved = false;
    }
    
  },

   swapTiles: function(){
       
    var me = this;
      
    //If there are two active tiles, swap their positions
    if(me.activeTile1 && me.activeTile2){
                         me.whooshSound.play();

        var tile1Pos = {x:(me.activeTile1.x - me.tileWidth / 2) / me.tileWidth, y:(me.activeTile1.y - me.tileHeight / 2) / me.tileHeight};
        var tile2Pos = {x:(me.activeTile2.x - me.tileWidth / 2) / me.tileWidth, y:(me.activeTile2.y - me.tileHeight / 2) / me.tileHeight};
 
        //Swap them in our "theoretical" grid
        me.tileGrid[tile1Pos.x][tile1Pos.y] = me.activeTile2;
        me.tileGrid[tile2Pos.x][tile2Pos.y] = me.activeTile1;
 
        //Actually move them on the screen
        me.game.add.tween(me.activeTile1).to({x:tile2Pos.x * me.tileWidth + (me.tileWidth/2), y:tile2Pos.y * me.tileHeight + (me.tileHeight/2)}, 200, Phaser.Easing.Linear.In, true);
        me.game.add.tween(me.activeTile2).to({x:tile1Pos.x * me.tileWidth + (me.tileWidth/2), y:tile1Pos.y * me.tileHeight + (me.tileHeight/2)}, 200, Phaser.Easing.Linear.In, true);
        
        me.activeTile1 = me.tileGrid[tile1Pos.x][tile1Pos.y];
        me.activeTile2 = me.tileGrid[tile2Pos.x][tile2Pos.y];
 
    }
  
  },

   checkMatch: function(){
       
    var me = this;
    //Call the getMatches function to check for spots where there is
    //a run of three or more tiles in a row
    var matches = me.getMatches(me.tileGrid);
 
    //If there are matches, remove them
    if(matches.length > 0){
        
        
        //remove them
         //me.time.events.add(Phaser.Timer.SECOND * 0.8, me.removeTileGroup(matches), this);
//        me.removeTileGroup(matches);
        me.game.time.events.add(80, function(){
           me.removeTileGroup(matches);
        });
 
        //Move the tiles currently on the board into their new positions
         //me.time.events.add(Phaser.Timer.SECOND * 0.8,  me.resetTile, this);
//       me.resetTile();
         me.game.time.events.add(300, function(){
           me.resetTile();
        });
 
        //Fill the board with new tiles wherever there is an empty spot
        // me.time.events.add(Phaser.Timer.SECOND * 0.8, me.fillTile, this);
        //me.fillTile();
        me.game.time.events.add(300, function(){
           me.fillTile();
        });
        
        //Trigger the tileUp event to reset the active tiles
        me.game.time.events.add(500, function(){
            me.tileUp();
        });
 
        //Check again to see if the repositioning of tiles caused any new matches
        me.game.time.events.add(600, function(){
            me.checkMatch();
        });
 
    }
    else {

        //No match so just swap the tiles back to their original position and reset
        me.swapTiles();
        me.game.time.events.add(500, function(){
            me.tileUp();
            me.canMove = true;
        });
    }
    

  },

   tileUp: function(){
       
    var me = this;
       
  	//Reset the active tiles
    me.activeTile1 = null;
    me.activeTile2 = null;
      
  },

   getMatches: function(tileGrid){
    var matches = [];
    var groups = [];
 
    //Check for horizontal matches
    for (var i = 0; i < tileGrid.length; i++)
    {
        var tempArr = tileGrid[i];
        groups = [];
        for (var j = 0; j < tempArr.length; j++)
        {
            if(j < tempArr.length - 2)
                if (tileGrid[i][j] && tileGrid[i][j + 1] && tileGrid[i][j + 2])
                {
                    if (tileGrid[i][j].tileType == tileGrid[i][j+1].tileType && tileGrid[i][j+1].tileType == tileGrid[i][j+2].tileType ||
                        tileGrid[i][j].tileType == tileGrid[i][j+1].tileType && tileGrid[i][j+2].key == 'bomb' ||
                        tileGrid[i][j].tileType == tileGrid[i][j+2].tileType && tileGrid[i][j + 1].key == 'bomb' ||
                        tileGrid[i][j].key == 'bomb' && tileGrid[i][j+1].tileType == tileGrid[i][j+2].tileType
                       )
                    {
                        if (groups.length > 0)
                        {
                            if (groups.indexOf(tileGrid[i][j]) == -1)
                            {
                                matches.push(groups);
                                groups = [];
                            }
                        }
 
                        if (groups.indexOf(tileGrid[i][j]) == -1)
                        {
                            groups.push(tileGrid[i][j]);
                        }
                        if (groups.indexOf(tileGrid[i][j+1]) == -1)
                        {
                            groups.push(tileGrid[i][j+1]);
                        }
                        if (groups.indexOf(tileGrid[i][j+2]) == -1)
                        {
                            groups.push(tileGrid[i][j+2]);
                        }
                    }
                }
        }

        if(groups.length > 0) matches.push(groups);
    }
 
    //Check for vertical matches
    for (j = 0; j < tileGrid.length; j++)
    {
        var tempArr = tileGrid[j];
        groups = [];
        for (i = 0; i < tempArr.length; i++)
        {
            if(i < tempArr.length - 2)
                if (tileGrid[i][j] && tileGrid[i+1][j] && tileGrid[i+2][j])
                {
                    if (tileGrid[i][j].tileType == tileGrid[i+1][j].tileType && tileGrid[i+1][j].tileType == tileGrid[i+2][j].tileType ||
                        tileGrid[i][j].tileType == tileGrid[i+1][j].tileType && tileGrid[i+2][j].key == 'bomb' ||
                        tileGrid[i][j].tileType == tileGrid[i+2][j].tileType && tileGrid[i+1][j].key == 'bomb' ||
                        tileGrid[i][j].key == 'bomb' && tileGrid[i+1][j].tileType == tileGrid[i+2][j].tileType
                       )
                    {
                        if (groups.length > 0)
                        {
                            if (groups.indexOf(tileGrid[i][j]) == -1)
                            {
                                matches.push(groups);
                                groups = [];
                            }
                        }
 
                        if (groups.indexOf(tileGrid[i][j]) == -1)
                        {
                            groups.push(tileGrid[i][j]);
                        }
                        if (groups.indexOf(tileGrid[i+1][j]) == -1)
                        {
                            groups.push(tileGrid[i+1][j]);
                        }
                        if (groups.indexOf(tileGrid[i+2][j]) == -1)
                        {
                            groups.push(tileGrid[i+2][j]);
                        }
                    }
                }
        }
        if(groups.length > 0) matches.push(groups);
    }
 
    return matches;
      
  },


   getTilePos: function(tileGrid, tile){
	var pos = {x:-1, y:-1};
 
    //Find the position of a specific tile in the grid
    for(var i = 0; i < tileGrid.length ; i++)
    {

        for(var j = 0; j < tileGrid[i].length; j++)
        {
            //There is a match at this position so return the grid coords
            if(tile == tileGrid[i][j])
            {
                pos.x = i;
                pos.y = j;
                break;
            }
        }
    }
 
    return pos;
      
  },

   resetTile: function(){
       
    var me = this;
       
    //Loop through each column starting from the left
    for (var i = 0; i < me.tileGrid.length; i++)
    {
 
        //Loop through each tile in column from bottom to top
        for (var j = me.tileGrid[i].length - 1; j > 0; j--)
        {
 
            //If this space is blank, but the one above it is not, move the one above down
            if(me.tileGrid[i][j] == null && me.tileGrid[i][j-1] != null)
            {
                //Move the tile above down one
                var tempTile = me.tileGrid[i][j-1];
                me.tileGrid[i][j] = tempTile;
                me.tileGrid[i][j-1] = null;
 
                me.fallDownTween = me.game.add.tween(tempTile).to({y:(me.tileHeight*j)+(me.tileHeight/2)}, 500, Phaser.Easing.Bounce.Out, true);

                    me.particleDrop((i + .4) * 90, (j + .2) * 105);

                me.fallDownTween.onComplete.add(function () {
                        me.dropSound.play();
                });  
 
                //The positions have changed so start this process again from the bottom
                //NOTE: This is not set to me.tileGrid[i].length - 1 because it will immediately be decremented as
                //we are at the end of the loop.
                j = me.tileGrid[i].length;
            }
        }
    }
    
  },
    
    particleDrop: function(x, y){
        var me = this;
        var emitter = game.add.emitter(x, y);
        emitter.width = 50;
        emitter.makeParticles('smolPipeCloud');
        emitter.minParticleSpeed.set(-60, -40);
        emitter.maxParticleSpeed.set(60, 40);
        emitter.setRotation(0,0);
        emitter.gravity = -200;
        emitter.start(true, 500, null, 10);
    },
    

   fillTile: function(){
       
    var me = this;

     if(premadeBalls >= 0){
    //Check for blank spaces in the grid and add new tiles at that position
    for(var i = 0; i < me.tileGrid.length; i++){
 
        for(var j = 0; j < me.tileGrid.length; j++){
 
            if (me.tileGrid[i][j] == null)
            {
                //Found a blank spot so lets add animate a tile there
                var tile = me.addTile(i, j);
                //And also update our "theoretical" grid
                me.tileGrid[i][j] = tile;
            }
 
        }
    }
   }
      // console.log(premadeBalls);
       console.log(finalBallNum);
    if(premadeBalls <= 0 && finalBallNum > 0){
           // console.log("HEY");

        for(var i = 0; i < me.tileGrid.length; i++){
 
            for(var j = 0; j < me.tileGrid.length; j++){
 
                if (me.tileGrid[i][j] == null)
                {
                    
                    var tile = me.addNewTile(i,j);
                    me.tileGrid[i][j] = tile;
                    
                    }
            }
        }
    }
  },
    
    extraFillTile: function(){
      var me = this;
      if(premadeBalls <= 0 && finalBallNum > 0){
            console.log("HEY");

        for(var i = 4; i > -1; i--){
 
            for(var j = 4; j > -1; j--){
 
                if (me.tileGrid[i][j] == null)
                {
                    
                    var tile = me.addNewTile(i,j);
                    me.tileGrid[i][j] = tile;
                    
                    }
            }
        }
    }
    },
    
   removeTileGroup: function(matches){
       
    var me = this;
    //Loop through all the matches and remove the associated tiles
    for(var i = 0; i < matches.length; i++){
        var tempArr = matches[i];
 
        for(var j = 0; j < tempArr.length; j++){
         me.sendSparkles();

            var tile = tempArr[j];
            //Find where this tile lives in the theoretical grid
            var tilePos = me.getTilePos(me.tileGrid, tile);
            
            if(tile.key == 'bomb'){
               me.bombArea(tile);
            }
 
            
            
            //Remove the tile from the screen
           shrinkTween = me.add.tween(tile.scale).to({x:0.0, y:0.0}, 100, Phaser.Easing.Linear.None, true);

            
            
          shrinkTween.onComplete.add(function () {
                me.crunchSound.play();
                me.tiles.remove(tile);
          });  
             premadeBalls--;
 
            //Remove the tile from the theoretical grid
            if(tilePos.x != -1 && tilePos.y != -1){
                me.tileGrid[tilePos.x][tilePos.y] = null;
            }
 
        }
    }

  },
    
  sendSparkles: function(){
      var me = this;
      me.powerBarInt+=1;
      var powerTween = game.add.tween(me.cropRect).to({height:me.powerBarInt}, 3000, Phaser.Easing.Bounce.Out, false, 1, 0);
      powerTween.start();    
      me.powerBar.updateCrop();
      me.sparkleGroup = game.add.group();
      me.cloudGroup = game.add.group();
      var yStartArray = [50, 60, 70, 150, 160, 170, 250, 260, 270];
      var tweenLength = [250, 300, 350, 400];
      var tweenLength2 = [600, 700, 1000, 1300];
      var sparkleStartArray = ['ySparkle', 'pSparkle', 'bSparkle', 'gSparkle'];
      me.sparkleGroup.create(0, me.game.rnd.pick(yStartArray), me.game.rnd.pick(sparkleStartArray)); 
      me.cloudGroup.create(-180, -30, 'pipeCloud');
      var squeezeTween = me.add.tween(me.yellowBar.scale).to({x:0.8}, 100, Phaser.Easing.Linear.None, true);
      me.add.tween(me.emptyBar.scale).to({x:0.8}, 100, Phaser.Easing.Linear.None, true);
      me.add.tween(me.topPipe.scale).to({x:0.8}, 100, Phaser.Easing.Linear.None, true);
      me.add.tween(me.powerBar.scale).to({x:0.8}, 100, Phaser.Easing.Linear.None, true);
      me.add.tween(me.horiPipe1.scale).to({y:0.8}, 100, Phaser.Easing.Linear.None, true);
      me.add.tween(me.horiPipe2.scale).to({y:0.8}, 100, Phaser.Easing.Linear.None, true);
      me.add.tween(me.horiPipe3.scale).to({y:0.8}, 100, Phaser.Easing.Linear.None, true);
      squeezeTween.onComplete.add(function () {        
              me.add.tween(me.yellowBar.scale).to({x:1}, 50, Phaser.Easing.Linear.None, true); 
              me.add.tween(me.emptyBar.scale).to({x:1}, 50, Phaser.Easing.Linear.None, true);
              me.add.tween(me.powerBar.scale).to({x:1}, 50, Phaser.Easing.Linear.None, true);
              me.add.tween(me.horiPipe1.scale).to({y:1}, 100, Phaser.Easing.Linear.None, true);
              me.add.tween(me.horiPipe2.scale).to({y:1}, 100, Phaser.Easing.Linear.None, true);
              me.add.tween(me.horiPipe3.scale).to({y:1}, 100, Phaser.Easing.Linear.None, true);
              me.add.tween(me.topPipe.scale).to({x:1}, 100, Phaser.Easing.Linear.None, true);
          });  
      this.world.sendToBack(me.sparkleGroup); 
      this.world.sendToBack(me.cloudGroup); 
      this.world.sendToBack(me.yellowBar);
      this.world.sendToBack(me.grass1); 
      this.world.sendToBack(me.grass2);
      this.world.sendToBack(me.grass3);
      this.world.sendToBack(me.cloud2);
      this.world.sendToBack(me.cloud1);
      this.world.sendToBack(me.BG); 
      me.sparkleGroup.forEach(function(sprite) {        
          var sparkTween = me.game.add.tween(sprite).to({x:-100}, me.game.rnd.pick(tweenLength), Phaser.Easing.Linear.In, true);
          sparkTween.onComplete.add(function () {        
              sprite.destroy();    
          });    
      });
      me.cloudGroup.forEach(function(sprite) {        
          var pipeCloudTween = me.game.add.tween(sprite).to({y:-300}, me.game.rnd.pick(tweenLength2), Phaser.Easing.Linear.In, true);
          var pipeBiggerTween = me.add.tween(sprite.scale).to({x:1.5, y:1.5}, 10, Phaser.Easing.Linear.None, true);
          pipeCloudTween.onComplete.add(function () {        
              sprite.destroy();    
          });    
      });
  },
    


};

 
