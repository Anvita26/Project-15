var backgroundImage, arrowImage, bowImage, red_balloonImage, green_balloonImage, pink_balloonImage, blue_balloonImage;
var scene, bow, arrow;
var score=0;
var red_group, blue_group, green_group , pink_group , arrow_group;
var gameState = "start";
var red, blue, green, pink, arrow;

function preload(){
  backgroundImage = loadImage("BowArrowBack.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
}

function setup(){
  createCanvas(480, 320);
  
  //creating background
  scene = createSprite(240,160,480,320);
  scene.addImage(backgroundImage);
    
  // creating bow to shoot arrow
  bow = createSprite(465,160,20,50);
  bow.addImage(bowImage); 
      
  red_group = new Group();
  blue_group = new Group();
  green_group = new Group();
  pink_group = new Group();
  arrow_group = new Group();
}

function draw() {

  drawSprites();

  switch(gameState){
    case "start":
      fill("crimson");
      textSize(20);
      text("Press Space Key to Start the Game...",70,160);
      if (keyDown("space")) gameState = "play";
      break;
    case "play":
      fill("white");
      textSize(15);
      text("Click left button of mouse to release arrow...",90,300);
      //continous scrolling of background
      scene.velocityX = -3; 
      if (scene.x < 0) scene.x = scene.width/2;
      //moving bow with mouse
      bow.y = World.mouseY;
      // release arrow when mouse left click is pressed
      if (mouseDown("leftButton")) createArrow();
      //creating continous enemies
      var select_balloon = Math.round(random(1,4));
      if (World.frameCount % 100 == 0) {
        if (select_balloon == 1) redBalloon();
        else if (select_balloon == 2) greenBalloon();
        else if (select_balloon == 3) blueBalloon();
        else pinkBalloon();
      }
      // Destroy Ballon when arrow touches baloon
      if(arrow_group.isTouching(red_group)) {
        arrow_group.destroyEach();
        red_group.destroyEach();
        score = score + 5 ;
      }
      if(arrow_group.isTouching(blue_group))  {
        arrow_group.destroyEach();
        blue_group.destroyEach();
        score = score + 10 ;
      }
      if(arrow_group.isTouching(green_group)){
        arrow_group.destroyEach();
        green_group.destroyEach();
        score = score + 3 ;
      }
      if(arrow_group.isTouching(pink_group)){
        arrow_group.destroyEach();
        pink_group.destroyEach();
        score = score + 1 ;
      }

  }
  textSize(20);
  fill("crimson");
  text("Score = "+ score, 20,30);
}


// Creating  arrows for bow
function createArrow() {
  arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 460;
  arrow.y=bow.y;
  arrow.velocityX = -5;
  arrow.lifetime = 100;
  arrow.scale = 0.3 ;
  arrow_group.add(arrow);
}

function redBalloon() {
  red = createSprite(0,Math.round(random(20, 300)), 10, 10);
  red.addImage(red_balloonImage);
  red.setCollider("circle", 0, 0, 0.5);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.08;
  red_group.add(red);
}

function blueBalloon() {
  blue = createSprite(0,Math.round(random(20, 300)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.setCollider("circle", 0, 0, 0.5);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.08;
  blue_group.add(blue);
}

function greenBalloon() {
  green = createSprite(0,Math.round(random(20, 300)), 10, 10);
  green.addImage(green_balloonImage);
  green.setCollider("circle", 0, 0, 0.5);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.08;
  green_group.add(green);
}

function pinkBalloon() {
  pink = createSprite(0,Math.round(random(20, 300)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.setCollider("circle", 0, 0, 0.5);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 0.9;
  pink_group.add(pink);
}
