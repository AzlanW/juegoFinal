var canvas;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

let engine;
let world;

var bg_img;
var avion,dragon;
var avionAnimation,dragonImg;
var attack,attackGroup,attackImg;

var ground;
var gameState = "play";
var gameOver, wintext;

var miaumiaulife = 160;
var attack;

var ltime = 180;

function preload()
{
  bg_img = loadImage('./assets/background.png');
  avionAnimation = loadAnimation("./assets/avion.png","./assets/avion2.png","./assets/avion3.png","./assets/avion4.png","./assets/avion5.png","./assets/avion6.png","./assets/avion7.png","./assets/avion8.png");
  dragonImg = loadImage("./assets/dragon.png");
  attackImg = loadImage("./assets/attack.png");
  gameOverImg = loadImage("./assets/Game Over.png");
  wintextImg = loadImage("./assets/ganastes.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  avion = createSprite(windowWidth/7,300,20,20);
  avion.addAnimation("avion",avionAnimation);
  avion.scale = 1.1;
  dragon = createSprite(width-140,height/2-40,20,20);
  dragon.addImage("dragon",dragonImg);
  dragon.scale=0.4;

  attackGroup = new Group();
  
  ground = new Ground(width/2,height-200,width,1);
  ball1 = new Obstacle(windowWidth/4,110,40,40);
  rope1 = new Rope(ball1.body,{x:windowWidth/4-100,y:0});
  ball2 = new Obstacle(windowWidth/2-100,150,40,40);
  rope2 = new Rope(ball2.body,{x:windowWidth/2-200,y:0});
  ball3 = new Obstacle(windowWidth/2+windowWidth/4,110,40,40);
  rope3 = new Rope(ball3.body,{x:windowWidth/2+windowWidth/4-100,y:0});
  ball4 = new Obstacle(windowWidth/2+windowWidth/8-50,90,40,40);
  rope4 = new Rope(ball4.body,{x:windowWidth/2+windowWidth/8-150,y:0});

  dragon.setCollider("rectangle",0,0,dragon.width,dragon.height);
  dragon.debug = true
}


function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  Engine.update(engine);
  ground.show();
  ball1.display();
  rope1.display();
  ball2.display();
  rope2.display();
  ball3.display();
  rope3.display();
  ball4.display();
  rope4.display();

  var invisibleBlock = createSprite(windowWidth/2,windowHeight-140,windowWidth,10)
  invisibleBlock.visible = false;
  avion.collide(invisibleBlock);
  var invisibleBlock2 = createSprite(windowWidth/2,30,windowWidth,10)
  invisibleBlock2.visible = false;
  avion.collide(invisibleBlock2);
  var invisibleBlock3 = createSprite(width/2,height-200,width,1)
  invisibleBlock3.visible = false;
  avion.collide(invisibleBlock3);
  
  edges = createEdgeSprites();
  avion.collide(edges);
  
  if (gameState === "play")
  {
    if (keyDown("UP_ARROW"))
    {
      avion.y = avion.y-5;
    }
    if (keyDown("RIGHT_ARROW"))
    {
      avion.x = avion.x+5;
    }
    if (keyDown("LEFT_ARROW"))
    {
      avion.x = avion.x -5; 
    }
    if (keyDown("DOWN_ARROW"))
    {
      avion.y = avion.y +5; 
    }
    spawnAttack();
    doglife();    
    limitTime();

    if(attackGroup.isTouching(dragon) && miaumiaulife >= 0)
    {
      miaumiaulife -= 20;
      attackGroup.remove(attack);
      attack.lifetime = 1;

      setTimeout(() => {
        rope1.break();
      }, 2250);

      setTimeout(() => {
        rope2.break();
      }, 5000);

      setTimeout(() => {
        rope3.break();
      }, 10000);

      setTimeout(() => {
        rope4.break();
      }, 8000);
    }

    if(miaumiaulife === 0)
    {
      gameState = "Win";
    }

    if (dist(ball1.body.position.x,ball1.body.position.y,avion.x,avion.y) <= 80)
    {
      gameState = "Over";
    }
    if (dist(ball2.body.position.x,ball2.body.position.y,avion.x,avion.y) <= 80)
    {
      gameState = "Over";
    }
    if (dist(ball3.body.position.x,ball3.body.position.y,avion.x,avion.y) <= 80)
    {
      gameState = "Over";
    }
    if (dist(ball4.body.position.x,ball4.body.position.y,avion.x,avion.y) <= 80)
    {
      gameState = "Over";
    }
  }
  drawSprites();
  
  if (gameState === "Win")
  {
    image(bg_img,0,0,width,height);
    //push();
    //imageMode(CENTER);
    //image(wintextImg,width/2,height/2,200,100);
    //pop();
    win();
  }
  if (gameState === "Over")
  {
    avion.remove();
    image(bg_img,0,0,width,height);
    //push();
    //imageMode(CENTER);
    //image(gameOverImg,width/2,height/2,200,100);
    //pop();
    gameOver();
  }
}

function spawnAttack()
{
  if (frameCount%150 === 0)
  {
    attack = createSprite();
    attack.y = avion.y;
    attack.x = avion.x;
    attack.addImage(attackImg);
    attack.scale=1.5;
    attack.velocityX = 7;
    attack.lifetime = 150;
    attack.setCollider("rectangle",0,0,attack.width,attack.height);
    attack.debug = true
    attackGroup.add(attack);
    
  }
}

function doglife()
{
  fill("white");
  rect(width-220,height/2-170,160,15);
  fill("#f50057");
  rect(width-220,height/2-170,miaumiaulife,15);
  noStroke();
}

function limitTime()
{
  text("Tiempo: "+ ltime, 200,50);

  if (frameCount%10 === 0)
  {
    ltime -= 1;
  }

  if (ltime <= 0)
  {
    gameState = "Over"
  }
}

function gameOver() 
{
  swal(
    {
      title: `¡Fin del juego!`,
      text: "¡Gracias por jugar!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Jugar de nuevo"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function win() 
{
  swal(
    {
      title: `¡Felicidades!`,
      text: "¡Gracias por jugar!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Siguiente nivel"
    },function() {
      window.location = "https://azlanw.github.io/Juego-que-se-juega/";
  });
}