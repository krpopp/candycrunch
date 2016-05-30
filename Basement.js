
//Creates a new Phaser Game
//You might want to check here to understand the basics of Phaser: http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game


SmashSpace.Basement = function (game){
    
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

SmashSpace.Basement.prototype = {
 
    create: function (){
        
        var basement = this;
    
        basement.createdTiles = basement.add.group();
        
        basement.upArrows = basement.add.button(850, 300, 'upArrows', basement.changeStateUps, this, 2, 0, 1);
        
         basement.levels = basement.add.button(350, 600, 'levels', basement.menuSelss, this, 2, 0, 1);
        
        var redBask = basement.add.sprite(50, 100, 'redBask');
        var greenBask = basement.add.sprite(600, 100, 'greenBask');
        var blueBask = basement.add.sprite(50, 400, 'blueBask');
        var yellowBask = basement.add.sprite(600, 400, 'yellowBask');
        
//        for (var i = 0; i < 5; i++){
//            basement.aNewTile = basement.create(basement.world.randomX, basement.world.randomY, 'red');
//            basement.physics.p2.enable(aNewTile);
//            basement.aNewTile.body.setCircle(40);
//            basement.aNewTile.inputEnabled = true;
//            basement.aNewTile.events.onInputDown.add(onClick, aNewTile);
//            basement.aNewTile.events.onInputUp.add(unClick, aNewTile);
//        }
//        
//        for (var i = 0; i < 5; i++){
//            basement.aNewTile = basement.create(basement.world.randomX, basement.world.randomY, 'blue');
//            basement.physics.p2.enable(aNewTile);
//            basement.aNewTile.body.setCircle(40);
//            basement.aNewTile.inputEnabled = true;
//            basement.aNewTile.events.onInputDown.add(onClick, aNewTile);
//            basement.aNewTile.events.onInputUp.add(unClick, aNewTile);
//        }
//        
//        for (var i = 0; i < 5; i++){
//            basement.aNewTile = basement.create(basement.world.randomX, basement.world.randomY, 'green');
//            basement.physics.p2.enable(aNewTile);
//            basement.aNewTile.body.setCircle(40);
//            basement.aNewTile.inputEnabled = true;
//            basement.aNewTile.events.onInputDown.add(onClick, aNewTile);
//            basement.aNewTile.events.onInputUp.add(unClick, aNewTile);
//        }
//        
//        for (var i = 0; i < 5; i++){
//            basement.aNewTile = basement.create(basement.world.randomX, basement.world.randomY, 'yellow');
//            basement.physics.p2.enable(aNewTile);
//            basement.aNewTile.body.setCircle(40);
//            basement.aNewTile.inputEnabled = true;
//            basement.aNewTile.events.onInputDown.add(onClickBottomTwo, aNewTile);
//            basement.aNewTile.events.onInputUp.add(unClickBottomTwo, aNewTile);
//        }
        
        var redBox = basement.colliders(80, 200, 360, 200, 220, 300);
        var greenBox = basement.colliders(630, 200, 910, 200, 770, 300);
        var blueBox = basement.colliders(80, 500, 360, 500, 220, 600);
        var yellowBox = basement.colliders(630, 500, 910, 500, 770, 600);
        
    },
    
     changeStateUps: function (){
        this.state.start('GroundFloor');
    },

    update: function (){
        var basement = this;
        if (basement.movedItem != null && basement.isClicking){
            basement.movedItem.body.x = game.input.x;
            basement.movedItem.body.y = game.input.y;
        } 
    },
    
    menuSelss: function(){
      this.state.start('MainMenu');  
    },

    onClickBottomTwo: function (item){
        var basement = this;
        basement.isClicking = true;
        console.log(basement.isClicking);
        console.log("Item: "+ item);
        basement.movedItem = item;
    },

    unClickBottomTwo: function (item){
        var basement = this;
        basement.isClicking = false;
        basement.movedItem = null;
        console.log(basement.isClicking);
    },

    colliders: function(lPosX, lPosY, rPosX, rPosY, bPosX, bPosY){
        var basement = this;
        
        var leftSide = basement.add.sprite(lPosX, lPosY, null);
        leftSide.renderable = false;
        basement.physics.p2.enable(leftSide);
        leftSide.body.setRectangle(10, 180);
        leftSide.body.static = true;
        //leftSide.body.debug = true;
        
        var rightSide = basement.add.sprite(rPosX, rPosY, null);
        rightSide.renderable = false;
        basement.physics.p2.enable(rightSide);
        rightSide.body.setRectangle(10, 180);
        rightSide.body.static = true;
        //rightSide.body.debug = true;
        
        var downSide = basement.add.sprite(bPosX, bPosY, null);
        downSide.renderable = false;
        basement.physics.p2.enable(downSide);
        downSide.body.setRectangle(300, 10);
        downSide.body.static = true;
        //downSide.body.debug = true;
    },
        
};
