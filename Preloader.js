SmashSpace.Preloader = function (game){
    
    this.background = null;
    this.preloadBar = null;
    
    this.ready = false;
    
};



SmashSpace.Preloader.prototype = {
    
    preload: function(){
        
        this.stage.backgroundColor = "ffffff";
        
        var sprite = game.add.sprite(250, 250, 'loading');
        sprite.alpha = 0;
        var tween = game.add.tween(sprite).to( { alpha: 1 }, 1000, "Linear", true, 0, -1);
        tween.yoyo(true, 1000);
        
        this.load.spritesheet('switch', 'assets/image/switch.png', 85, 265);
        
        this.load.image('title', 'assets/image/main.png');
        this.load.image('start', 'assets/image/start.png');
        this.load.image('menuBG', 'assets/image/menuBG.png');
        
        //color picker
        this.load.image('red', 'assets/image/red_sprite.png');
        this.load.image('green', 'assets/image/green_sprite.png');
        this.load.image('blue', 'assets/image/blue_sprite.png');
        this.load.image('yellow', 'assets/image/yellow_sprite.png');
        
        this.load.image('blankBall', 'assets/image/base_sprite.png');
   
        //level3
        this.load.image('l3belt', 'assets/image/level3Belt.png');
        this.load.image('l3BG', 'assets/image/level3BG.png');
        this.load.image('l3pipes', 'assets/image/level3Pipes.png');
        this.load.image('l3funnel', 'assets/image/funnel.png');
        this.load.image('l3arrow', 'assets/image/colorbutt2.png');
        this.load.spritesheet('beltSheet', 'assets/image/beltSheet.png', 630, 612)
        
        //level2
        this.load.image('l2BG', 'assets/image/level2BG.png');
        //this.load.image('l2pipes', 'assets/image/level2Pipes.png');
        this.load.image('handl1', 'assets/image/level2Handle1.png');
        this.load.image('handl2', 'assets/image/level2Handle2.png');
        this.load.image('handl3', 'assets/image/level2Handle3.png');
        this.load.image('handl4', 'assets/image/level2Handle4.png');
        this.load.image('l2funnel', 'assets/image/l2funnel.png');
        this.load.image('l2arrow1', 'assets/image/productionbutt.png');
        this.load.image('l2arrow2', 'assets/image/sortingbut.png');
        this.load.image('l2bigPipe', 'assets/image/bigPipe.png');
        this.load.image('l2slide', 'assets/image/slide.png');
        this.load.image('l2colorPipe', 'assets/image/colorPipes.png');
        this.load.spritesheet('handleTurn', 'assets/image/handleTurn.png', 50, 50);
        this.load.spritesheet('horiBelt', 'assets/image/horiBelt.png', 528, 94);
        
        //level1
        this.load.image('l1BG', 'assets/image/level1BG.png');
        this.load.image('l1arrow1', 'assets/image/colorbutt1.png');
        this.load.image('l1arrow2', 'assets/image/gamebutt.png');
        this.load.image('l1pipe', 'assets/image/level1Pipe.png');
        this.load.image('l1clear', 'assets/image/level1ClearPipe.png');
    
        this.load.image('gamearrow', 'assets/image/gamebut.png');
        
        //game level
        this.load.image('gameSky', 'assets/image/gameBG.png');
        this.load.image('grass1', 'assets/image/grass1.png');
        this.load.image('grass2', 'assets/image/grass2.png');
        this.load.image('grass3', 'assets/image/grass3.png');
        this.load.image('cloud1', 'assets/image/cloud1.png');
        this.load.image('cloud2', 'assets/image/cloud2.png');
        this.load.image('yellowBack', 'assets/image/yellowBack.png');
        this.load.image('yellowBar', 'assets/image/barYellow.png');
        this.load.image('topPipe', 'assets/image/toppipe.png');
        this.load.image('horiPipe', 'assets/image/horiPipe.png');
        this.load.image('sideWall', 'assets/image/sideWall.png');
        this.load.image('emptyBar', 'assets/image/emptyBar.png');
        this.load.image('emptyGrid', 'assets/image/emptyGrid.png');
        this.load.image('powerBar', 'assets/image/powerbar.png');
        this.load.image('door', 'assets/image/door.png');
        this.load.image('UIbottom', 'assets/image/UIbottom.png');
        this.load.image('topBar', 'assets/image/topBar.png');
        this.load.spritesheet('button', 'assets/image/button.png', 243, 103);
        this.load.image('scoreBack', 'assets/image/scoreBack.png');
        
        this.load.image('pause', 'assets/image/pause.png');
        this.load.image('tut', 'assets/image/how.png');
        this.load.image('options', 'assets/image/options.png');
        this.load.image('progress', 'assets/image/progress.png');
        this.load.image('pauseScreen', 'assets/image/pauseScreen.png');
        this.load.image('howToPlay', 'assets/image/howtoplay.png');
        this.load.image('plus', 'assets/image/plus.png');
        this.load.image('minus', 'assets/image/minus.png');
        this.load.image('volume', 'assets/image/volume.png');
        this.load.spritesheet('smallButt', 'assets/image/smallbutt.png', 121, 103);
        this.load.image('exOut', 'assets/image/exout.png');
        
        this.load.image('ySparkle', 'assets/image/yellowSparkle.png');
        this.load.image('gSparkle', 'assets/image/greenSparkle.png');
        this.load.image('bSparkle', 'assets/image/blueSparkle.png');
        this.load.image('pSparkle', 'assets/image/pinkSparkle.png');

        this.load.image('pipeCloud', 'assets/image/pipeCloud.png');
        this.load.image('smolPipeCloud', 'assets/image/smolPipeCloud.png');
        
        this.load.image('pinkDrop',  'assets/image/pinkDrop.png');
        this.load.image('greenDrop', 'assets/image/greenDrop.png');
        this.load.image('blueDrop', 'assets/image/blueDrop.png');
        this.load.image('yellowDrop', 'assets/image/yellowDrop.png');

        
        //audio
        this.load.audio('drop', 'assets/sound/drop.wav');
        this.load.audio('crunch', 'assets/sound/crunch.wav');
        this.load.audio('whoosh', 'assets/sound/whoosh.wav');
        this.load.audio('click', 'assets/sound/click.wav');
        this.load.audio('music', 'assets/sound/music.wav');
        this.load.audio('squirt', 'assets/sound/squirt.wav');
        this.load.audio('switch', 'assets/sound/switch.wav');
        this.load.audio('mechanical', 'assets/sound/mechanical.wav');
        this.load.audio('beltSound', 'assets/sound/otherBeltSound.wav');
        this.load.audio('roomTone', 'assets/sound/roomtone.wav');
        

    }, 
    
    
    create: function(){        
        this.ready = true;
        this.state.start('MainMenu');
    }
    
};