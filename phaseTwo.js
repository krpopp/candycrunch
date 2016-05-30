
//Creates a new Phaser Game
//You might want to check here to understand the basics of Phaser: http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game

                    
    var physicsScript = this;
 
    var physicsTiles = [];
    var tileGroup;

    var finishedGrabbing = false;
    var runGrabTiles = false;

    var isClicking = false;
    var movedItem;

    var cursor;

    var hasCreatedPhysics = false;

    var hasCreatedPhaseTwo = false;

    var onPhaseTwo = false;

    function grabTiles(){  
        if (runGrabTiles == false){
  //          currentPhase = PHASE_TWO;
            console.log("it run");
            for(var i = 0; i < tileGrid.length; i++){
                var tempArr = tileGrid[i];
                for (var j = 0; j < tempArr.length; j++){
                    physicsTiles.push(tempArr[j]);
                    console.log(physicsTiles.length);
                    finishedGrabbing = true;
                    runGrabTiles = true;
                }
            }     
        }
    }
    
    function createPhaseTwo(){
        if(!hasCreatedPhaseTwo){
        tileGroup = game.add.group();
        cursor = game.input.keyboard.createCursorKeys();
            hasCreatedPhaseTwo = true;
        }
    }

    function phaseTwoUpdate(){
        if(onPhaseTwo){
        if (finishedGrabbing == true){
           givePhysics();
        }
       // game.input.onDown.add(pleaseWork, this);
        
//        if(isClicking == true){
//            tile.body.x = game.input.x;
//            tile.body.y = game.input.y;
//            
//        }
//        if(cursor.up.isDown){
//            onClick();
//            console.log("good job");
//        }
         if (movedItem != null && isClicking){
            movedItem.body.x = game.input.x;
            movedItem.body.y = game.input.y;
        } 
        }
    }

    function givePhysics(){
      for(var i = 0; i < physicsTiles.length; i++){
          var tileDrag = physicsTiles[i];
          tileGroup.add(tileDrag);
          game.physics.p2.enable(tileDrag);
          //tileDrag.body.debug = true;
          tileDrag.body.setCircle(40);
          tileDrag.inputEnabled = true;
          tileDrag.events.onInputDown.add(onClick, tileDrag);
          tileDrag.events.onInputUp.add(unClick, tileDrag);
          finishedGrabbing = false;
        }
    }



    function onClick(item){
        if(onPhaseTwo){
        isClicking = true;
        console.log(isClicking);
        console.log("Item: "+ item);
        movedItem = item;
        }
    }

    function unClick(item){
        if(onPhaseTwo){
        isClicking = false;
        movedItem = null;
        console.log(isClicking);
        }
    }

   