var boxsiz = 25;
var row = 20;
var colum = 20;
var board;
var context;
var veloX=0;
var veloY=0;

var snakebody =[];

window.onload = ()=>{
    board = document.querySelector("#board");
    board.height = row * boxsiz;
    board.width= colum * boxsiz;
    context = board.getContext("2d");   
    place_food();
    document.addEventListener("keyup",changedir);
    setInterval(Update,90);
}

function changedir(e){
    if(e.code == "ArrowUp" && veloY !=2){
        veloX = 0;
        veloY =-2;
    }
    else if(e.code == "ArrowDown" && veloY !=-2){
        veloX =0;
        veloY =2;
    }
    else  if(e.code == "ArrowLeft" && veloX !=2){
        veloX =-2;
        veloY =0;
    }
    else if(e.code == "ArrowRight" && veloX !=-2){
        veloX =2;
        veloY =0;
    }
    else if(e.code == "Space"){
        veloX=0;
        veloY=0;
    }
}
var score = document.querySelector(".score");
var scval =1;
var sanaX = boxsiz*5;
var sanaY = boxsiz*5;
var foodX = boxsiz*10;
var foodY = boxsiz*10;

const Update = ()=>{
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);
    
    context.fillStyle = "blue";
    context.fillRect(foodX,foodY,boxsiz,boxsiz);

    context.fillStyle = "red";
    sanaX += veloX * boxsiz/2;
    sanaY += veloY * boxsiz/2;
    context.fillRect(sanaX,sanaY,boxsiz,boxsiz);

    if(sanaX == foodX && sanaY == foodY){
        score.innerHTML = scval++;
        snakebody.push(foodX,foodY);
        place_food();
    }

    
    for(var i = snakebody.length-1;i>=0;i--){
        snakebody[i]= snakebody[i-1];
    }
    if(snakebody.length){
        snakebody[0]=[sanaX,sanaY];
    }

    for(var i = 0;i<snakebody.length;i++){
        context.fillRect(snakebody[i][0],snakebody[i][1],boxsiz,boxsiz)
    }
}

function place_food(){
    foodX = Math.floor(Math.random()* colum)*boxsiz;
    foodY = Math.floor(Math.random()* row)*boxsiz;
}