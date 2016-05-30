var saveStuff = this;

var savedGFGrid;

var gridHasSaved = false;

var myInt;

var ballsInt;

var hasAnimated = false;

var visitedL2 = false;

var premadeBalls = 30;

var finalBallNum = 0;

function saveGFGrid(tileGrid){
    savedGFGrid = tileGrid;
    console.log(savedGFGrid);
}

function saveInt(savedInt){
    myInt = savedInt;
}

function saveColorBalls(ballInt){
    ballsInt = ballInt;
    visitedL2 = true;
}
