var gameScreenWidth = 700;
var gridSize = 10;

var cellCount = gameScreenWidth/gridSize;
var gameBoard = [];

function setup() {
  var cnv = createCanvas(gameScreenWidth+1, gameScreenWidth+1);
  cnv.parent('game');
  for(var k = 0; k < 2; k++){
    gameBoard[k] = [];
    for(var i = 0; i < cellCount+10; i++){
      gameBoard[k][i] = [];
      for(var j = 0; j < cellCount+10; j++){
        gameBoard[k][i][j] = 0;
      }
    }
  }

  document.getElementById('defaultCanvas0').addEventListener('contextmenu', function(e) {
    if (e.button == 2) {
      e.preventDefault();
    }
  });
}
var showNextStep = true;
function draw() {
  input();
  if (keyIsPressed === true) {
    if(keyCode === 32){
      tick();
    }
    if(keyCode === BACKSPACE){
    	for(var k = 0; k < 2; k++){
        gameBoard[k] = [];
        for(var i = 0; i < cellCount+10; i++){
          gameBoard[k][i] = [];
          for(var j = 0; j < cellCount+10; j++){
            gameBoard[k][i][j] = 0;
          }
        }
      }
    }
    if(key === "["){
      gameBoard[0] = [];
      for(var i = 0; i < cellCount+10; i++){
        gameBoard[0][i] = [];
        for(var j = 0; j < cellCount+10; j++){
          gameBoard[0][i][j] = 0;
        }
      }
    }
    if(key === "]"){
      gameBoard[1] = [];
      for(var i = 0; i < cellCount+10; i++){
        gameBoard[1][i] = [];
        for(var j = 0; j < cellCount+10; j++){
          gameBoard[1][i][j] = 0;
        }
      }
    }
    if(keyCode === RIGHT_ARROW){
    	if(showNextStep){
        showNextStep = false;
        tick();
      }
    }
  }
  else{
    showNextStep = true;
  }
  render();
}

var lastLeft = [-1, -1];
var lastRight = [-1, -1]
function input(){
  if (mouseIsPressed) {
    let mX = Math.floor(mouseX/gridSize)+5;
    let mY = Math.floor(mouseY/gridSize)+5;
    if (mouseButton === LEFT) {
      if (JSON.stringify([mX, mY]) !== JSON.stringify(lastLeft)){
        if(mX>0 && mX<cellCount && mY>0 && mY<cellCount){
          gameBoard[0][mX][mY] = gameBoard[0][mX][mY]? 0 : 1;
          lastLeft = [mX, mY];
        }
      }
    }
    if (mouseButton === RIGHT) {
      if (JSON.stringify([mX, mY]) !== JSON.stringify(lastRight)){
        if(mX>0 && mX<cellCount && mY>0 && mY<cellCount){
          gameBoard[1][mX][mY] = gameBoard[1][mX][mY]? 0 : 1;
          lastRight = [mX, mY];
        }
      }
    }
  }else{
    lastLeft = [-1, -1];
    lastRight = [-1, -1];
  }
}


function getState(d, x, y){
	let nei = 0;
  let state = gameBoard[d][x][y];
  if(x>0&&y>0){
    nei += gameBoard[d][x-1][y-1];
  }
  if(y>0){
    nei += gameBoard[d][x][y-1];
  }
  if(x<cellCount-1&&y>0){
    nei += gameBoard[d][x+1][y-1];
  }
  if(x>0){
    nei += gameBoard[d][x-1][y];
  }
  if(x<cellCount-1){
    nei += gameBoard[d][x+1][y];
  }
  if(x>0&&y<cellCount-1){
    nei += gameBoard[d][x-1][y+1];
  }
  if(y<cellCount-1){
    nei += gameBoard[d][x][y+1];
  }
  if(x<cellCount-1&&y<cellCount-1){
    nei += gameBoard[d][x+1][y+1];
  }

  if(state == 0 && nei == 3){
    state = 1;
  }
  if(nei <= 1 || nei >=4){
    state = 0;
  }
  return state;
}

function tick(){
  let newGameBoard = [];
  for(var k = 0; k < 2; k++){
    newGameBoard[k] = [];
    for(var i = 0; i < cellCount+10; i++){
      newGameBoard[k][i] = [];
      for(var j = 0; j < cellCount+10; j++){
        newGameBoard[k][i][j] = getState(k, i, j);
      }
    }
  }

  gameBoard = newGameBoard;
}

function render(){
  background(150);
  stroke(50);
  for(var i = 0; i < cellCount; i++){
    for(var j = 0; j < cellCount; j++){
      let fVal = "#";
      if(gameBoard[0][i+5][j+5]){
        fVal += "FF";
      }else{
        fVal += "00";
      }
      if(gameBoard[1][i+5][j+5]){
        if(fVal == "#FF"){
        	fVal += "FF";
        }else{
          fVal += "99";
        }
      }else{
        fVal += "00";
      }
      fVal += "00";
      fill(fVal)
			rect(i*gridSize, j*gridSize, gridSize, gridSize);
    }
  }
}
