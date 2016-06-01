
//Creates a new Phaser Game
//You might want to check here to understand the basics of Phaser: http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game
SmashSpace.LevelThree = function (game){
    
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

SmashSpace.LevelThree.prototype = {
    
    create: function (){

        var levelThree = this;
        
        levelThree.shake = new Phaser.Plugin.Shake(levelThree);
        game.plugins.add(levelThree.shake);
        
        levelThree.switchSound = levelThree.add.audio('switch');
        levelThree.beltSound = levelThree.add.audio('beltSound');
        
        levelThree.tileInt = 0;
        levelThree.hasCreated = false;
        
        var backGround = levelThree.add.sprite(0, 0, 'l3BG');      
        levelThree.topLayer = levelThree.add.sprite(-20, 0, 'l3pipes');
        
        var switcher = levelThree.add.button(20, 340, 'switch', levelThree.givePlain, this, 2, 0, 1);
        var switcher = levelThree.add.button(550, 70, 'switch', levelThree.sendAway, this, 2, 0, 1);
        
        levelThree.belt = levelThree.add.sprite(270, 90, 'beltSheet');
        levelThree.funnel = levelThree.add.sprite(0, 0, 'l3funnel');
      
        var move = levelThree.belt.animations.add('move');
        
        levelThree.downArrow = levelThree.add.button(750, 500, 'l3arrow', levelThree.changesStateDown, this, 2, 0, 1);
    
    
    },
    
    menusSel: function(){
        this.state.start('MainMenu');
    },
    
    givePlain: function(){
        var levelThree = this;
        levelThree.switchSound.play();
        if(!levelThree.hasCreated){
            levelThree.shake.shake(20, levelThree.topLayer);
            levelThree.game.time.events.add(200, function(){
                levelThree.topLayer.position.x = 0;
                levelThree.topLayer.position.y = 0;
            });
            levelThree.hasCreated = true;
            levelThree.firstCreated = true;
            levelThree.tile = levelThree.add.sprite(310, 460, 'blankBall');
            levelThree.tileInt++;
        }
    },
    
    
    sendAway: function(){
        var levelThree = this;
        levelThree.switchSound.play();
        if(levelThree.firstCreated){
            levelThree.beltSound.play();
            levelThree.belt.animations.play('move', 10, true);
            levelThree.shake.shake(60, levelThree.belt);
            levelThree.game.time.events.add(200, function(){
                levelThree.belt.position.x = 270;
                levelThree.belt.position.y = 90;
            });
            levelThree.world.bringToTop(levelThree.funnel);
            levelThree.add.tween(levelThree.tile).to( { x: 790 }, 700, Phaser.Easing.Linear.None, true);
            levelThree.add.tween(levelThree.tile).to( { y: 50 }, 700, Phaser.Easing.Linear.None, true);
            levelThree.time.events.add(Phaser.Timer.SECOND, levelThree.deleteTheTile, this);
            levelThree.stopCreate = true;
        }
    },
    
    deleteTheTile:function(){
        var levelThree = this;
        if(levelThree.stopCreate){
            levelThree.belt.animations.stop('move');
            saveInt(levelThree.tileInt);
            levelThree.tile.destroy();
            levelThree.hasCreated = false;
            levelThree.stopCreate = false;
        }

    },
    
    changesStateDown: function (){
        this.state.start('LevelTwo');
    },

};

