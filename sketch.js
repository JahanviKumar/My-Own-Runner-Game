var tower, towerImage;

var door, doorImage, doorsGroup;

var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;

var gameState = "play";


function preload(){

towerImage = loadImage("tower.png");
doorImage = loadImage("door.png")    
ghostImg = loadImage("ghost-standing.png");
spookySound = loadSound("spooky.wav");
}

function setup(){
    createCanvas(600,600);
    spookySound.loop();
tower=createSprite(300,300);
tower.addImage(towerImage)
tower.velocityY=1;

doorsGroup=new Group();

invisibleBlockGroup = new Group();


ghost = createSprite(200,200,50,50);
ghost.scale = 0.3;
ghost.addImage("ghost", ghostImg);

}

function draw(){
background(0);

if (gameState==="play"){

    if (keyDown("left_arrow")){
        ghost.x=ghost.x-3;
    }
    if(keyDown("right_arrow")){
        ghost.x = ghost.x + 3;
      }
      
      if(keyDown("space")){
        ghost.velocityY = -2;
      }
    
      ghost.velocityY = ghost.velocityY + 0.8;
      
      if(tower.y > 400)
      {
        tower.y = 300
      }
    
  
    }
  
if (doorsGroup.isTouching(ghost))
{
doorGroup.destroyEach();
}


if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    doorsGroup.destroyEach();
    invisibleBlockGroup.destroyEach();

    gameState="end";
}

if(gameState==="end")
{
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)

}



    spawnDoors();


    drawSprites();
}





function spawnDoors(){
    if (frameCount % 240 === 0) {
        var door = createSprite(200,-50);
        door.x = Math.round(random(120,400));
        door.addImage(doorImage);
        door.velocityY = 1;
        
         //assign lifetime to the variable
        door.lifetime = 800;
       doorsGroup.add(door);

      
        ghost.depth=door.depth;
        ghost.depth +=1;  
      
    }


        if (frameCount % 220 === 0) {
            var invisibleBlock = createSprite(200,15);
            invisibleBlock.x = Math.round(random(120,400));
        invisibleBlock.width = 50;
        invisibleBlock.height = 2;
        
        invisibleBlock.velocityY = 1;
        invisibleBlock.lifetime = 800;
        invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);

    }


}
