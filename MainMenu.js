SmashSpace.MainMenu = function (game){
    this.gFloorButt = null;
    this.l1Butt = null;
    this.l2butt = null;
    this.l3butt = null;
    this.baseButt = null;
};

SmashSpace.MainMenu.prototype = {
    
    create: function(){
        this.stage.backgroundColor = "ffffff";
        
        var menuBG = game.add.sprite(0, 0, 'menuBG');
        menuBG.alpha = 0;
        game.add.tween(menuBG).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        var title = game.add.sprite(250, 200, 'title');
        var button = game.add.button(350, 430, 'button', this.groundFloor, this, 1, 0, 2);
        var start = game.add.sprite(417, 460, 'start');
  
    },
    
    update: function (){
        
        
    },
    
    groundFloor: function (pointer){
        
        this.state.start('GroundFloor');
        
    },
    
    
};