//Global Variables
var ground,backGround,monkey,monkeyLoad,backGroundLoad,score,banana,bananaLoad,obstacle,obstacleLoad;


function preload(){
  backGroundLoad = loadImage("jungle.jpg");
  monkeyLoad=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png", "Monkey_10.png");
  bananaLoad=loadImage("Banana.png");
  obstacleLoad=loadImage("stone.png");
}


function setup() {
  createCanvas(500,600);
  backGround= createSprite(300,300);
  backGround.addImage("backGround",backGroundLoad);
  backGround.x=backGround.width/2;
  monkey=createSprite(100,500);
  monkey.addAnimation("monkey",monkeyLoad);
  monkey.scale=0.1;
  ground=createSprite(250,540,500,1);
  ground.visible=false;
  score=0;
  
  bGroup = new Group();
  oGroup = new Group();
}


function draw(){
 background(255);
  if(backGround.x<0){
      backGround.x=backGround.width/2;
  }
  console.log(monkey.y);
  if(keyDown("space")&&monkey.y>490){
    monkey.velocityY=-15;
  }
  switch(score){
    case 10: monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14;
      break;
    case 30: monkey.scale=0.16;
      break;
    case 40: monkey.scale=0.18;
      break;
    default:break;
  }
  if(oGroup.isTouching(monkey)){
    score=0;
    oGroup.destroyEach();
  }
  if(bGroup.isTouching(monkey)){
    score=score+2;
    bGroup.destroyEach();
    monkey.scale=0.1;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  backGround.velocityX=-4;
  bananaSpawn();
  obstacleSpawn();
  createEdgeSprites();
  monkey.collide(ground);
  drawSprites();
  stroke("white");
  fill("white");
  textSize(24);
  text("Score: "+score,200,50);
}

function bananaSpawn(){
  if(frameCount%80===0){
    banana = createSprite(500,200);
    banana.addAnimation("banana",bananaLoad);
    banana.velocityX=-5;
    banana.lifetime=100;
    banana.scale=0.06;
    banana.y=Math.round(random(300,400));
    bGroup.add(banana);
  }
}

function obstacleSpawn(){
  if(frameCount%300===0){
    obstacle=createSprite(500,500);
    obstacle.addImage("obstacle",obstacleLoad);
    obstacle.velocityX=-4.5;
    obstacle.scale=0.13;
    obstacle.lifetime=100; 
    oGroup.add(obstacle);
  }
}