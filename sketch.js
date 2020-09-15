
var monkey , monkey_running
var banana ,bananaImage, obstacles, obstacleImage
var fruitGroup, obstacleGroup,banana
var score,ground,spawnBananas,spawnObstacles,obstaclesGroup
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisibleGround;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
   bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
   
}



function setup() {
  createCanvas(600, 600);
  ground = createSprite(300,500,100000,10);
    ground.x = ground.width /2;

  
  monkey = createSprite(80,500,20,50);
  monkey.addAnimation("running", monkey_running);
    monkey.scale = 0.15;
  
  invisibleGround = createSprite(300,505,2000000,50);
      invisibleGround.scale = 0.15;
  invisibleGround.visible=false;
  
  
  fruitGroup = new Group();
  obstaclesGroup = new Group();
   score=0;
}


function draw() {
background(180);
  monkey.collide(invisibleGround);
  text("Score:"+score,500,100);
   
  if(gameState === PLAY){
        ground.velocityX = -6
         spawnBananas();
    spawnobstacles();
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -12;
      
    }
    
    
    monkey.velocityY = monkey.velocityY + 0.8
  
   if(fruitGroup.isTouching(monkey)){
     score=score+1;
     fruitGroup.destroyEach();
   }
      
    
    if(obstaclesGroup.isTouching(monkey)){
        
      monkey.velocityY=-9; 
      gameState=END;
      
    }
   
  }
   else if (gameState === END) {
         
      ground.velocityX = 0;
      monkey.velocityY = 0
         
    obstaclesGroup.setLifetimeEach(-1);
   fruitGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     fruitGroup.setVelocityXEach(0);
         }
  
  
  
  drawSprites();

  
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
     banana = createSprite(600,450,40,10);
    banana.x = Math.round(random(500,600));
     banana.y = Math.round(random(200,450));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -4;
    
        banana.lifetime = 300;
    
      // banana.depth = banana.depth;
  //  monkey.depth = monkey.depth + 1;
 
   fruitGroup.add(banana);
    }
}

function spawnobstacles() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
     obstacles = createSprite(600,490,40,10);
    obstacles.x = Math.round(random(500,600));
    obstacles.addImage(obstaceImage);
    obstacles.scale = .1;
    obstacles.velocityX = -5;
    
        obstacles.lifetime = 300;
    
     
    //adding cloud to the group
   obstaclesGroup.add(obstacles);
    }
}






