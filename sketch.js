var bg,bgImg;
var player;
var obstacle;
var obstaclegroup;
var score =0;
var num;
var gameState = "play"

function preload(){
  bgImg = loadImage("assets/bg.jpg")
  playerImg = loadAnimation("assets/aeroplane.png")
  obstacleImg1 = loadImage("assets/obstacle.png")
  obstacleImg2 = loadImage("assets/helicopter.png")
  blastImg = loadAnimation("assets/blast.png")
  explosion = loadSound("assets/explosion.mp3")
  music = loadSound("assets/music.mp3")
}
function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(width/2,height/2,width,height);
  bg.addImage(bgImg)
  bg.scale=1.9
  bg.velocityX=-1

  player = createSprite(160,100);
  player.addAnimation("player",playerImg)
  player.addAnimation("blast",blastImg)
  player.scale = 0.5

  player.setCollider("rectangle",0,0,480,150)

  obstaclegroup = new Group();
  bulletgroup = new Group();
}

function draw() {
  background(0); 

if(gameState==="play"){

  if (!music.isPlaying()) {
    music.play();
    music.setVolume(0.1);
  }

  edges = createEdgeSprites()
player.bounceOff(edges)

  if(bg.x<width/2-85){
   bg.x=width/2
  }
  if (keyDown("up")) {
    player.y=player.y-12;
  }
  if (keyDown("down")) {
    player.y=player.y+12;
  }
  obstacles()
  
  for(var i=0;i< obstaclegroup.length;i++){
  if(obstaclegroup.isTouching(bulletgroup)){
       obstaclegroup.get(i).destroy()
       bulletgroup.destroyEach()
       score=score+5
      }
    }
  
   
if(obstaclegroup.isTouching(player)){
  gameState = "end"
  explosion.play()
 
}


 if(keyDown("space")){
   bullet = createSprite(player.x+100,player.y,20,10)
   bullet.velocityX = 10
   bulletgroup.add(bullet)
   player.depth = bullet.depth
   player.depth = player.depth+1
   bullet.lifetime = width/10
 } 

}
    
if(gameState==="end"){
  obstaclegroup.setVelocityXEach(0)
  obstaclegroup.destroyEach();
  player.changeAnimation("blast",blastImg)
  player.scale = 0.4
  player.velocityY = 0
   bg.velocityX = 0
}

drawSprites();
textSize(30)
fill("red")
stroke("black")
strokeWeight(1.5)
text("Score : "+score,width/2,35)

text("Press SPACE to shoot bullets",80,35)
}
function  obstacles(){
  if(frameCount%80===0){
    obstacle = createSprite(width-20,random(100,height/2))
    num = Math.round(random(1,2))
    if(num ===1){
      obstacle.addImage(obstacleImg1)
      obstacle.scale =0.3
    }
    else if(num ===2){
      obstacle.addImage(obstacleImg2)
      obstacle.scale =0.55
    }
  
    obstacle.velocityX = -(18+2*score/10)
    obstacle.lifetime = 600
    obstaclegroup.add( obstacle);
  }
}