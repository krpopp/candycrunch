
//Creates a new Phaser Game
//You might want to check here to understand the basics of Phaser: http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game
     
    var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

//    const PHASE_ONE = 50;
//    const PHASE_TWO = 60;
//    const PHASE_THREE = 70;
//    const PHASE_FOUR = 80;
//    const PHASE_NONE = 40;
//    const PHASE_NTWO = 30;

    var currentPhase = 50;

    var upArrow;
    var downArrow;
    

  function preload () { 
    game.load.spritesheet('upArrows', 'assets/image/arrow_button.png', 100, 100);
    game.load.spritesheet('downArrows', 'assets/image/arrow_button_down.png', 100, 100);
      
    
    preloadPhaseOne();
    //preloadBottomTwo();
    preloadTopOne();
    colorsPreload();
    preloadBombs();
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.refresh();
  }

  function create () {
      cursor = game.input.keyboard.createCursorKeys();

     
      
      game.physics.startSystem(Phaser.Physics.P2JS);
      game.physics.p2.gravity.y = 100;
     // currentPhase = 50;
      
  }

  function update(){
      if(currentPhase == 50){ 
          isCreated = false;
          hasCreated = false;
          hasCreatedBombs = false;
          hasCreatedColors = false;
          //hasCreatedPhaseOne = false;
          hasCreatedPhaseTwo = false;
          hasCreatedPhysics = false;
          onPhaseTwo = false;
          finishedGrabbing = false;
          runGrabTiles = false;
          createPhaseOne();
          updatePhaseOne();
      }
      if(currentPhase == 60){
          isCreated = false;
          //hasCreated = false;
          hasCreatedBombs = false;
          hasCreatedColors = false;
          hasCreatedPhaseOne = false;
          hasCreatedPhaseTwo = false;
          hasCreatedPhysics = false;
          onPhaseTwo = false;
          createTopOne();
          updateTopOne();
      }
      if(currentPhase == 70){
          isCreated = false;
          hasCreated = false;
          hasCreatedBombs = false;
          //hasCreatedColors = false;
          hasCreatedPhaseOne = false;
          hasCreatedPhaseTwo = false;
          hasCreatedPhysics = false;
          onPhaseTwo = false;
          colorsCreate();
      }
      if(currentPhase == 80){
          isCreated = false;
          hasCreated = false;
          //hasCreatedBombs = false;
          hasCreatedColors = false;
          hasCreatedPhaseOne = false;
          hasCreatedPhaseTwo = false;
          hasCreatedPhysics = false;
          onPhaseTwo = false;
          createBombs();
      }
//      if(currentPhase == 40){
//          isCreated = false;
//          hasCreated = false;
//          hasCreatedBombs = false;
//          hasCreatedColors = false;
//          hasCreatedPhaseOne = false;
//          hasCreatedPhaseTwo = false;
//          //hasCreatedPhysics = false;
//          onPhaseTwo = true;
//          createPhaseTwo();
//          grabTiles();
//          phaseTwoUpdate(); 
//      }
      if(currentPhase == 30){
          //isCreated = false;
          hasCreated = false;
          hasCreatedBombs = false;
          hasCreatedColors = false;
          hasCreatedPhaseOne = false;
          hasCreatedPhaseTwo = false;
          hasCreatedPhysics = false;
          onPhaseTwo = false;
          createBottomTwo();
          updateBottomTwo();
      }
//      if(cursor.up.isDown){
//          currentPhase = 3;
//      }
  }

  function addPhase(){
      currentPhase += 10;
      console.log(currentPhase);
  }

  function subPhase(){
      currentPhase -= 10;
      console.log(currentPhase);


  }

  function render(){

  }
