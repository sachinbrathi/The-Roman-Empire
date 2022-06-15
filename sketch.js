var playerImg,playerShootingImg,heart1Img,heart2Img,heart3Img,bgImg,zombieImg
var score=0,life=3,bullets=50,gameState="play"

function preload() {
 playerImg=loadImage("assets/player.png")
 playerShootingImg=loadImage("assets/player2.png")
heart1Img=loadImage("assets/heart_1.png")
heart2Img=loadImage("assets/heart_2.png")
heart3Img=loadImage("assets/heart_3.png")
bgImg=loadImage("assets/bg.jpeg")
zombieImg=loadImage("assets/zombie.png")
explosionSound=loadSound("assets/explosion.mp3")
loseSound=loadSound("assets/lose.mp3")
winSound=loadSound("assets/win.mp3")
}

function setup(){
    var canvas=createCanvas(windowWidth,windowHeight);
    bg=createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
    bg.addImage(bgImg)
    bg.scale=1.1
    player=createSprite(displayWidth-1150,displayHeight-300,50,50)
    player.addImage(playerImg)
    player.scale=0.3
    heart1=createSprite(displayWidth-150,40,20,20)
    heart1.addImage(heart1Img)
    heart1.scale=0.3
    heart1.visibility=false
    heart2=createSprite(displayWidth-150,40,20,20)
    heart2.addImage(heart2Img)
    heart2.scale=0.3
    heart2.visibility=false
    heart3=createSprite(displayWidth-150,40,20,20)
    heart3.addImage(heart3Img)
    heart3.scale=0.3
    heart3.visibility=true
    zombiegroup=new Group()
    bulletgroup=new Group()
    explosionSound.loop();
    loseSound.loop();
    winSound.loop();
}

function draw(){
    background(0);
    if(gameState==="play"){
        if(keyDown("down")){player.y=player.y+30}
        if(keyDown("up")){player.y=player.y-30}
        if(keyWentDown("space")){
            bullet=createSprite(displayWidth-1150,player.y-30,20,10)
            player.addImage(playerShootingImg)
            bullet.velocityX=20
            bullets=bullets-1
        bulletgroup.add(bullet)   
        }
        else if(keyWentUp("space")){player.addImage(playerImg)}
        spawnzombie()
        if (life===0){
            gameState="lost"
        }
        if (score===100){
            gameState="won"
        }
        if (bullets===0){
            gameState="bullet"
        }
        if (zombiegroup.isTouching (bulletgroup)){
            for (let index = 0; index < zombiegroup.length; index++) {
                if(zombiegroup[index].isTouching(bulletgroup)){
                    zombiegroup[index].destroy()
                    bulletgroup.destroyEach()
                    score=score+1
                }
                
            }
        }
        if (zombiegroup.isTouching (player)){
            for (let index = 0; index < zombiegroup.length; index++) {
                if(zombiegroup[index].isTouching(player)){
                    zombiegroup[index].destroy()
                    life=life-1
                }
                
            }
        }
        if (life===3){
            heart3.visible=true
            heart2.visible=false
            heart1.visible=false
        }
        if (life===2){
            heart3.visible=false
            heart2.visible=true
            heart1.visible=false
        }
        if (life===1){
            heart3.visible=false
            heart2.visible=false
            heart1.visible=true
        }
    }
    drawSprites()
    if (gameState==="lost"){
        textSize(100)
        fill("red")
        text("You Lost",400,400)
        player.destroy()
        zombiegroup.destroyEach()
    }
    else if (gameState==="won"){
        textSize(100)
        fill("red")
        text("You won",400,400)
        player.destroy()
        zombiegroup.destroyEach()
    }
    else if (gameState==="bullet"){
        textSize(100)
        fill("red")
        text("You ran out of bullets",400,400)
        player.destroy()
        zombiegroup.destroyEach()
    }
    textSize(20)
    fill("blue")
    text("score: "+score,displayWidth-200,displayHeight/2-220) 
    text("lives: "+life,displayWidth-200,displayHeight/2-250) 
    text("bullets: "+bullets,displayWidth-200,displayHeight/2-280) 

   
     
     
}

function spawnzombie(){
    if(frameCount%50===0){
        zombie=createSprite(random(500,1200),random(100,500),30,30)
        zombie.addImage(zombieImg)
        zombie.scale=0.15
        zombie.velocityX=-3
        zombie.lifetime=400
    zombiegroup.add(zombie)
    }
   
}

