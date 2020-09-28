//Create variables here
var Dog;
var dogImg;
var happyDog;
var foodStock;
var foods;
var database;
var input1;
var input2;
var play;
var bar;
var barImg;
var main;
var mainImg;
var start;
var startImg;
var currentDate;
var currentTime;
var currentHour;
var milk = 20;
var gameOver;
var gameOverImg;
var fedTime;
var lastFed;
var foodObj;
var readGameState;
var gameState;
var g1 = "main";
var bedroom, garden, washroom, b1, ga1, w1;
var sleep, playD, doctor, vaccinate, bathe, lazy, back;
var vCard, vCardImg,lazyDImg, clinic, clinicImg;
var t1, t2, t3, t4, t5, t6;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  mainImg = loadImage("main.png");
  startImg = loadImage("start.png");
  gameOverImg = loadImage("img5.jpg");
  barImg = loadImage("img.png");
  bedroom = loadImage("Bed Room.png");
  garden = loadImage("Garden.png");
  washroom = loadImage("Wash Room.png");
  vCardImg = loadImage("dogVaccination.png");
  lazyDImg = loadImage("Lazy.png");
  clinicImg = loadImage("Vaccination.jpg");
  t1 = loadImage("1.jpg");
  t2 = loadImage("2.jpg");
  t3 = loadImage("3.jpg");
  t4 = loadImage("4.jpg");
  t5 = loadImage("5.jpg");
  t6 = loadImage("6.jpg");
  t7 = loadImage("7.jpg");

}

function setup() {
  createCanvas(800, 800);
  
  Dog = createSprite(430,555,20,20);
  Dog.addImage(dogImg);
  Dog.scale = 0.33;
  Dog.visible = true;

  b1 = createSprite(400,400,800,800);
  b1.addImage(bedroom);
  b1.visible = false;

  ga1 = createSprite(400,400,800,800);
  ga1.addImage(garden);
  ga1.visible = false;

  w1 = createSprite(400,400,800,800);
  w1.addImage(washroom);
  w1.visible = false;

  vCard = createSprite(400,400,800,800);
  vCard.addImage(vCardImg);
  vCard.visible = false;
  vCard.scale = 0.8;

  clinic = createSprite(400,400,800,800);
  clinic.addImage(clinicImg);
  clinic.visible = false;
  clinic.scale = 0.6;


  main = createSprite(400,400,800,800);
  main.addImage(mainImg);
  main.visible = true;

  start = createSprite(410,610,70,100);
  start.addImage(startImg);
  start.visible = true;

  gameOver = createSprite(400,400,800,800);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 1.5;


  foodObj = new Food(foods, lastFed);

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val()
  });

  readGameState = database.ref('gameState');
  readGameState.on("value",function(data){
    gameState = data.val()
  });

  feed = createButton("Feed The Dog");
  feed.position(400,725);
  feed.mousePressed(feedDog);
  feed.hide();

  addFood = createButton("Add Food");
  addFood.position(400,765);
  addFood.mousePressed(addFoods);
  addFood.hide();

  sleep = createButton("Put Your Pet To Sleep");
  sleep.position(400,685);
  sleep.mousePressed(bedroomSleep);
  sleep.hide();

  playD = createButton("Play With Your Pet");
  playD.position(400,645);
  playD.mousePressed(playGarden);
  playD.hide();

  doctor = createButton("Go For Vaccination");
  doctor.position(400,605);
  doctor.mousePressed(goClinic);
  doctor.hide();

  vaccinate = createButton("Vaccination Card");
  vaccinate.position(400,565);
  vaccinate.mousePressed(seeCard);
  vaccinate.hide();
  
  bathe = createButton("Bathe Your Pet");
  bathe.position(400,525);
  bathe.mousePressed(bath);
  bathe.hide();

  lazy = createButton("Lazy Time");
  lazy.position(400,485);
  lazy.mousePressed(timePass);
  lazy.hide();

  back = createButton("Back To Home Page");
  back.position(700,795);
  back.mousePressed(backNormal);
  back.hide();

}
  
  


function draw() {  

  background(46,139, 87);

  time();
  
  if(mousePressedOver(start)){
    main.visible = false;
    start.visible = false;
    g1="play";   
  }

  talk();

 drawSprites();

  if(g1 === "play"){

  foodObj.display();

  addFood.show();
  feed.show();
  doctor.show();
  lazy.show();
  vaccinate.show();
  playD.show();
  sleep.show();
  bathe.show();

  //add styles here
  fill(255,255,0);

  textSize(25)
  text("Time:  "+ currentTime,560,200);

  textSize(25)
  text("Date:  "+ currentDate,560,160);

  textSize(25)
  text("Current Milk Stock:  "+ milk,20,150);

  textSize(25)
  text("litres",290,150);

  textSize(20)
  text("Requests From Your Pet will be displayed Below after Regular Intervals.",50,30);

  textSize(25)
  text("List of Things You Can Do With Your Pet",40,350);

  textSize(25);
  if(lastFed>=12){
  text("Last Fed :  "+ lastFed%12 + " "+ "PM",300,400);
  }else if(lastFed == 0){
  text("Last Fed : 12 PM",300,400);
  }else{
  text("Last Fed :  "+ lastFed +" "+"AM",300,400);  
  }

}
}
function writeStock(x){
   
  if(x<=0){
    x=0;
  }else{
    x = x - 1;
  }

  database.ref("/").update({
    Food : x
});

console.log(x);

}
function readStock(data){
 foods = data.val();
}
function writeTime(){
  database.ref("/").update({
    FeedTime : currentHour
});
}

async function time(){
  var response = await fetch ("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var dateTime  = responseJSON.datetime;
  var t = dateTime.slice(11,19);
  var d = dateTime.slice(0,10);
  var h = dateTime.slice(11,13);

  currentDate = d;
  currentTime = t;
  currentHour = h;

}
function addFoods(){
  g1 = "play";
  Dog.visible = true;
  b1.visible = false;
  ga1.visible = false;
  w1.visible = false;
  vCard.visible = false;
  clinic.visible = false;
  foods++;
  milk++;
  foodObj.foodStock++;
  database.ref("/").update({
    Food : foods
});

}
function feedDog(){
  g1 = "play";
  Dog.visible = true;
  b1.visible = false;
  ga1.visible = false;
  w1.visible = false;
  vCard.visible = false;
  clinic.visible = false;
  writeStock(foods);
  foodObj.foodStock--;
  milk = milk-1;
  Dog.addImage(happyDog);
  writeTime();
  

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()

});

}

function bedroomSleep(){
  b1.visible = true;
  Dog.visible = false;
  g1 = "bed";
  update("Sleeping");
  foodObj.visible = false;
  back.show();
  ga1.visible = false;
  w1.visible = false;
  vCard.visible = false;
  clinic.visible = false;
  addFood.hide();
  feed.hide();
  doctor.hide();
  lazy.hide();
  vaccinate.hide();
  playD.hide();
  sleep.hide();
  bathe.hide();
}
function playGarden(){
  ga1.visible = true;
  Dog.visible = false;
  g1 = "playTime";
  update("Playing");
  foodObj.visible = false;
  back.show();
  b1.visible = false;
  w1.visible = false;
  vCard.visible = false;
  clinic.visible = false;
  addFood.hide();
  feed.hide();
  doctor.hide();
  lazy.hide();
  vaccinate.hide();
  playD.hide();
  sleep.hide();
  bathe.hide();
}
function bath(){
  w1.visible = true;
  Dog.visible = false;
  g1 = "Bathing";
  update("Bathing");
  foodObj.visible = false;
  back.show();
  ga1.visible = false;
  b1.visible = false;
  vCard.visible = false;
  clinic.visible = false;
  addFood.hide();
  feed.hide();
  doctor.hide();
  lazy.hide();
  vaccinate.hide();
  playD.hide();
  sleep.hide();
  bathe.hide();
}
function goClinic(){
  b1.visible = false;
  Dog.visible = false;
  g1 = "WentVaccination";
  update("Went For Vaccination");
  foodObj.visible = false;
  back.show();
  ga1.visible = false;
  w1.visible = false;
  vCard.visible = false;
  clinic.visible = true;
  addFood.hide();
  feed.hide();
  doctor.hide();
  lazy.hide();
  vaccinate.hide();
  playD.hide();
  sleep.hide();
  bathe.hide();
}
function seeCard(){
  ga1.visible = false;
  Dog.visible = false;
  g1 = "Check";
  update("Checking Vaccination Card");
  foodObj.visible = false;
  back.show();
  b1.visible = false;
  w1.visible = false;
  vCard.visible = true;
  clinic.visible = false;
  addFood.hide();
  feed.hide();
  doctor.hide();
  lazy.hide();
  vaccinate.hide();
  playD.hide();
  sleep.hide();
  bathe.hide();
}
function timePass(){
  Dog.addImage(lazyDImg);
  update("Lazy Pet");
  g1 = "play";
  Dog.visible = true;
  b1.visible = false;
  ga1.visible = false;
  w1.visible = false;
  vCard.visible = false;
  clinic.visible = false;
}





function update(state){
  database.ref("/").update({
    gameState : state
});
}
function backNormal(){
   g1 = "play";
   Dog.visible = true;
   Dog.addImage(dogImg);
   b1.visible = false;
   ga1.visible = false;
   w1.visible = false;
   vCard.visible = false;
   clinic.visible = false;
   back.hide();
}

function talk()
{
  if(frameCount % 350 === 0) {
  
    var text = createSprite(800,80,10,40);
    text.velocityX = -5;

    var rand = Math.round(random(1,7));
    switch(rand) {
      case 1: text.addImage(t1);
              break;
      case 2: text.addImage(t2);
              break;
      case 3: text.addImage(t3);
              break;
      case 4: text.addImage(t4);
              break;
      case 5: text.addImage(t5);
              break;
      case 6: text.addImage(t6);
              break;
      case 7: text.addImage(t7);
              break;
      default: break;
    }
}
}
