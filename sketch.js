var START=0;
var PLAY=1;
var OVER=3;
var gameState=START;

var starImg,bgImg,bg2Img;
var star, starBody;
var block1,block2,overImg;
//create variable for fairy sprite and fairyImg
var fairy,fairyAnimation;
var gameSound,gameOverSound;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starNight.png");
	bg2Img =loadImage("images/game start.jpg");
	overImg = loadImage("images/game over.png");
	youWinImg = loadImage("images/you win.jpg");
	//load animation for fairy here
	fairyAnimation = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	gameSound =loadSound("sound/JoyMusic.mp3");
	gameOverSound = loadSound("sound/game-lose-2.mp3");
}

function setup() {
	createCanvas(800, 650);

	//write code to play fairyVoice sound
    gameSound.play();
    
	//create fairy sprite and add animation for fairy
    fairy=createSprite(140,500);
	fairy.addAnimation("fairy",fairyAnimation);
	fairy.scale=0.2;

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;
    
	block1=createSprite(356,460,50,40);
	block1.visible=false;
	block2=createSprite(430,460,10000,10000);
	block2.visible=false;
	

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);

}


function draw() {
  if(gameState==START){
	background(bg2Img);
    fairy.visible=false;
	star.visible=false;
	if(mousePressedOver(block2)){
		gameState=PLAY;
		block2.width=50;
		block2.height=40;
		gameSound.play(); 
	}
  }
  
  if(gameState==PLAY){
  background(bgImg);
  fairy.visible=true;
  star.visible=true;
  star.x= starBody.position.x 
  star.y= starBody.position.y 

  keyPressed();
  console.log(fairy.x);
  //write code to stop star in the hand of fairy
  if(star.y>465 && starBody.position.y>450 && fairy.x===555){
    Matter.Body.setStatic(starBody,true);
    background(youWinImg);
  }
  if(star.y>780 && starBody.position.y>780){
	gameState=OVER;
	gameOverSound.play();
  }
 }
   if(gameState==OVER){
    background(overImg);
	fairy.visible=false;
	gameSound.stop();
	if(mousePressedOver(block1)){
		background(bgImg);
		star.y=30;
		starBody.position.y=30;
		Matter.Body.setStatic(starBody,true);
		gameSound.play();
		fairy.visible=true;
		fairy.x=140;
		gameState=PLAY;
	} 
	if(mousePressedOver(block2)){
		background(bgImg);
		fairy.visible=true;
	}
 
}
  drawSprites();
  if(gameState==START){
  textSize(30);
  text("TAP TO BEGIN!",300,560);
  }
}

function keyPressed() {

	if (keyCode === DOWN_ARROW ) {
		Matter.Body.setStatic(starBody,false); 
	}   

	//writw code to move fairy left and right
	if(keyDown(LEFT_ARROW)){
		fairy.x=fairy.x-5;
	}
	if(keyDown(RIGHT_ARROW)){
		fairy.x=fairy.x+5;
	}
}
     
