const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope, rope2, rope3;
var fruit_con;

var bg_img;
var food;
var rabbit;
var rabbitblinking, rabbitsad, rabbiteating;
var bgm;
var cuttingsound;
var eatingsound;
var sadnoises;
var air;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  rabbitblinking = loadAnimation("blink_1.png", "blink_1.png", "blink_1.png", "blink_1.png", "blink_2.png", "blink_3.png");
  rabbitsad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  rabbiteating = loadAnimation("Rabbit-01.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");

  bgm = loadSound("sound1.mp3");
  cuttingsound = loadSound("Cutting Through Foliage.mp3");
  eatingsound = loadSound("eating_sound.mp3");
  sadnoises = loadSound("sad.wav");
  air = loadSound("air.wav");

  rabbitblinking.playing = true;
  rabbiteating.playing = true;
  rabbitsad.playing = true;

  rabbiteating.looping = false;
  rabbitsad.looping = false;
  bgm.looping = true;
}
function setup() 
{

  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  bunny = createSprite(120, 570, 100, 100);
  bunny.addImage(rabbit);
  bunny.scale = .3;
  
  rope = new Rope(7,{x:245,y:30});
  rope2 = new Rope(3,{x:430,y:200});
  rope3 = new Rope(10,{x:100, y:50});

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

 
  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);

  button = createImg("cut_button.png");
  button.position(220, 30);
  button.size(50, 50);

  button2 = createImg("cut_button.png");
  button2.position(400, 200);
  button2.size(50, 50);

  button3 = createImg("cut_button.png");
  button3.position(85, 50);
  button3.size(50, 50);
  
  
  /*airbutton = createImg("balloon.png");
  airbutton.position(10, 220);
  airbutton.size(140, 140);*/

  mutebutton = createImg("mute.png");
  mutebutton.position(440, 10);
  mutebutton.size(50, 50);

  rabbitblinking.frameDelay = 10;
  rabbiteating.frameDelay = 20;
  rabbitsad.frameDelay = 20;

  bunny.addAnimation("parpadeo", rabbitblinking);
  bunny.addAnimation("comiendo", rabbiteating);
  bunny.addAnimation("triste", rabbitsad);
  
  bunny.changeAnimation("parpadeo");
  
  bgm.play();
  bgm.setVolume(.4);
  sadnoises.setVolume(2);
  eatingsound.setVolume(2);
}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,490,690);
  
  
  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  //ground.show();
  
  button.mouseClicked(drop);
  button2.mouseClicked(drop2);
  button3.mouseClicked(drop3);
  //airbutton.mouseClicked(aire);
  mutebutton.mouseClicked(mute);

  if (fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  } 
  if (collision(fruit, bunny) === true ){
  bunny.changeAnimation("comiendo");
  if (bgm.isPlaying()){
  eatingsound.play();
   }
  }
  
  if(fruit!=null && fruit.position.y>=650){
  fruit = null;  
  bunny.changeAnimation("triste");
  if (bgm.isPlaying()){
    sadnoises.play();
    }
  }

  collision(fruit, bunny);
  drawSprites();
 
}

function drop()
{
  if (bgm.isPlaying() && !cuttingsound.isPlaying()){
  cuttingsound.play();
  } else {
  cuttingsound.stop();
  }
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function drop2()
{
  if (bgm.isPlaying() && !cuttingsound.isPlaying()){
  cuttingsound.play();
  } else {
  cuttingsound.stop();
  }
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
}

function drop3()
{
  if (bgm.isPlaying() && !cuttingsound.isPlaying()){
  cuttingsound.play();
  } else {
  cuttingsound.stop();
  }
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;
}
function collision(body, sprite) 
{
  if (body !=null)
  {
    var distance = dist
    (
    body.position.x,body.position.y,
    sprite.position.x,sprite.position.y
    );
    console.log(distance);
    if (distance <= 60){
    World.remove(engine.world,fruit);
    fruit = null;
    return true
    } else {
      return false;
    }
  }
  
}
/*function aire(){
  if (bgm.isPlaying()){
  air.play();
  } else {
  air.stop();  
  }
  
  Matter.Body.applyForce
  (
  fruit, 
  {
  x: 0, 
  y: 0
  },
  {
  x: .01, 
  y: 0
  }
  )
}*/
function mute(){
  if (bgm.isPlaying()){
  bgm.stop();
  } else {
  bgm.play();
  }
  
}
