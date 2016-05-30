var SmashSpace = {};

SmashSpace.Boot = function (game){
    
};

SmashSpace.Boot.prototype = {
    
    init: function(){
        
        this.input.maxPointers = 1;
        
        this.stage.disableVisibilityChange = true;     
        
        
        
        if(this.game.device.desktop){
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
        else{
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMAx(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }
        
    },
    
    preload: function (){
        
        this.load.image('loading', 'assets/image/loading.png');
        
    },
    
    create: function (){
    
        this.state.start('Preloader');
    
    }
    
}