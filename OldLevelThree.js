
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
        
        var conPipe = levelThree.add.sprite(660, 470, 'conPipe2');

        var sidePipe = levelThree.add.sprite(870, 630, 'sidePipe');
        
        levelThree.platform = levelThree.add.sprite(400, 350, 'flaps');
        var drop = levelThree.platform.animations.add('drop');
        //var brownPowder = levelThree.add.sprite(600, 400, 'brownPowder');
        //var yellowPowder = levelThree.add.sprite(150, 400, 'yellowPowder');
        var piper = levelThree.add.sprite(470, -40, 'piper');
        levelThree.belt = levelThree.add.sprite(400, 580, 'belt');
        var move = levelThree.belt.animations.add('move');
        
        var bigPipe = levelThree.add.sprite(600, 410, 'bigPipe');
        
        
        var switcher = levelThree.add.button(100, 100, 'switch', levelThree.spitBomb, this, 2, 0, 1);
        var otherSwitcher = levelThree.add.button(800, 100, 'switch', levelThree.takeBomb, this, 2, 0, 1);
        
        var one = levelThree.add.sprite(110, 250, 'one');
        var two = levelThree.add.sprite(810, 250, 'two');
        
        
          levelThree.downArrow = levelThree.add.button(850, 500, 'upArrows', levelThree.changesStateDown, this, 2, 0, 1);
         //levelThree.levels = levelThree.add.button(350, 600, 'levels', levelThree.menusSel, this, 2, 0, 1);
    
    },
    
    menusSel: function(){
        this.state.start('MainMenu');
    },

    spitBomb: function (){
        
        var levelThree = this;
        
       // bombCount++;
        if(levelThree.bombAnim == null){
        levelThree.bombAnim = levelThree.add.sprite(470, 175, 'bombAnim');
        var spit = levelThree.bombAnim.animations.add('spit');
        levelThree.bombAnim.animations.play('spit', 20, false);
        levelThree.world.sendToBack(levelThree.bombAnim);
        }
    },
    
    changesStateDown: function (){
        this.state.start('LevelTwo');
    },

    takeBomb: function (){
        var levelThree = this;
        levelThree.platform.animations.play('drop', 20, false);
        levelThree.add.tween(levelThree.bombAnim).to({y: 405}, 4000, Phaser.Easing.Bounce.Out, true);
        levelThree.time.events.add(Phaser.Timer.SECOND * 4, levelThree.moveAway, this);
       // levelThree.bombAnim.destroy();
    },
    
    moveAway: function(){
        var levelThree = this;
        levelThree.belt.animations.play('move', 20, true);
        levelThree.add.tween(levelThree.bombAnim).to({x: 700}, 4000, Phaser.Easing.Bounce.Out, true);
        levelThree.time.events.add(Phaser.Timer.SECOND * 4, levelThree.stopAll, this);
    },
    
    stopAll: function(){
        var levelThree = this;
        levelThree.goBomb = levelThree.add.sprite(700, 550, 'bombAnim');
        levelThree.world.sendToBack(levelThree.goBomb);
        levelThree.goBomb.frame = 16;
        levelThree.add.tween(levelThree.goBomb).to({x: 1000}, 4000, Phaser.Easing.Linear.Out, true);
        levelThree.belt.animations.stop('move');
        levelThree.platform.frame = 0;
        levelThree.bombAnim.destroy();
        levelThree.bombAnim = null;
    }
    

};

