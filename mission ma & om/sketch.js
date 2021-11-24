var p1,p2,asteroid1,asteroid2,asteroid3;
var blast,blastImage,space,spaceImage;
var spaceShip,spaceShipImage, laserImage;
var shoot = 0;
var score = 0;
var laser,asteroidGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = play;
var endline,canvas;
var button;
function preload() {
  spaceImage = loadImage("space.png");
  spaceShipImage = loadAnimation("spaceship.png");
  laserImage = loadImage("laser.png");
  asteroid1 = loadImage("as1.png");
  asteroid2 = loadImage("as2.png");
  asteroid3 = loadImage("as3.png");
  blastImage = loadImage("blast.png");
  explasionImage = loadImage("blast.png");
  explosionSound = loadSound("explosion.mp3");
  laserSound = loadSound("laser sound.mp3");
  collidedImage= loadAnimation("b1.png","b2.png","b3.png","b4.png","b5.png","b6.png","b7.png","b8.png","b9.png","b10.png","b11.png","b12.png");
bgSound= loadSound("bg11.mp3")
restartImg = loadImage("reset.png");
}

function setup() {  
  canvas = createCanvas(displayWidth, displayHeight);
  bgSound.loop();
  space = createSprite(width/2,height/2,width,height);
  space.addImage(spaceImage);
  space.velocityY = (5 + score/10);

  spaceShip = createSprite(width/2,height-100);
  spaceShip.addAnimation("ship",spaceShipImage);
  spaceShip.addAnimation("collided",collidedImage);
  spaceShip.scale = 0.5;

  button = createSprite(width/2-300,height/2-300,10,10)
  button.addImage(restartImg)
  button.visible = false;
  
  p1 = createSprite(random(width/2-500,width/2+500));
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;
  
  asteroidGroup = new Group;
  laserGroup = new Group;
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}

function draw() {
  background(0);

  if(gameState === play) {
    // console.log(frameCount);
    
    if(space.y > 800) {
      space.y = 300;
    }
    if(spaceShip.isTouching(asteroidGroup) || asteroidGroup.isTouching(endline)){
      spaceShip.changeAnimation("collided",collidedImage)
     spaceShip.scale = 3
     gameState = end
     
    }
    shoot = shoot - 1;

    if(keyDown("space") && shoot < 460) {
      laser = createSprite(spaceShip.x,spaceShip.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8; 
      laser.scale = 0.7;
      laserGroup.add(laser);
      laserSound.play();
      //console.log(laser.x);
      shoot = laser.y;
    }  

    if(keyDown("right") && spaceShip.x < 1400) {
      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(asteroidGroup.isTouching(p2) || asteroidGroup.isTouching(p1)) {
      asteroidGroup.destroyEach();
      var blast = createSprite(spaceShip.x,spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      spaceShip.destroy();
     
    }
    
    if(asteroidGroup.isTouching(laserGroup)) {
      asteroidGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 1;
    }

    asteroids();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score,210,60)
    
   
  }
  else if(gameState === end) {
    space.velocityY = 0;
    stroke("yellow");
    fill("#ff5400");
    textSize(40);
    text("GAME OVER!",canvas.width/2-400,canvas.height/2);
    text("The asteroids destroyed the planet",canvas.width/2-400,canvas.height/2+100);
    text("Your final score:"+score,canvas.width/2-400,canvas.height/2+200);
   button.visible = true;
   if(mousePressedOver(button)){
     reset();
   }
  
    
  }
  


  if(gameState === instruction) {
    stroke("white");
    fill("orange");
    textFont("trebuchetMS")
    textSize(50);
    text("------𝓢𝓹𝓪𝓬𝓮 𝔀𝓪𝓻𝓻𝓲𝓸𝓻------",canvas.width/2-300,canvas.height/2-300);
   stroke("#ff00aa")
   fill("#ff00aa")
     textSize(50);
    text("------𝐸𝓃𝒿𝑜𝓎 𝓉𝒽𝑒 𝑔𝒶𝓂𝑒------",canvas.width/2-300,canvas.height-100);
    stroke("yellow");
    fill("yellow");
    textSize(35);
    textFont("Apple Chancery");

   
    text("  You are a space fighter.",canvas.width/2-375,canvas.height/2-100);
    text("press 'space' to shoot.",canvas.width/2-370,canvas.height/2-50);
 
    text("  use right and left arrows to move.",canvas.width/2-400,canvas.height/2+3);
    stroke("red");
    fill("red");
    textSize(50);
    text("  press 'enter' to start game ",canvas.width/2-250,canvas.height/2+120);
    stroke("#2cdddd");
    fill("#2cdddd");
    textSize(40);
    text(" Some asteroids are coming towords Earth.",canvas.width/2-300, canvas.height/2 - 200);
    if(keyDown("enter")) {
      gameState = play;
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }
  }
}

function asteroids() {
  if(frameCount % 110 === 0) {
  
    var asteroid = createSprite(Math.round(random(50,1350)),-20);
    asteroid.velocityY = (6 + score/10);
    asteroid.lifetime = 200;
    asteroid.scale = random(0.4,0.5);
    //asteroid.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: asteroid.addImage(asteroid1);
          
              break;
      case 2: asteroid.addImage(asteroid2);
            
              break;
      case 3: asteroid.addImage(asteroid3);
             
      default: break;
    }
    
    //console.log(asteroid.x);
    asteroidGroup.add(asteroid);
  }
}
function reset (){
gameState = play 
asteroidGroup.destroyEach();
spaceShip.changeAnimation()
}