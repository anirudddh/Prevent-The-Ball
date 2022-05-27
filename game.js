var backgroundColorComp,controlpiecetop,controlpiecebottom,controlpieceleft,controlpieceright;
var gameball;
var scorebox;
var tick;
var buzz;
var score=0;
function startGame() {
    tick = new sound("ballbounce.mp3");
    buzz = new sound("buzzer.mp3");
    backgroundColorComp = new component(800,600,"#C6F0E8",0,0);
    controlpiecetop = new component(80,5,"#5F343C",260,0);
    controlpiecebottom = new component(80,5,"#5F343C",260,595);
    controlpieceleft= new component(5,80,"#5F343C",0,260);
    controlpieceright= new component(5,80,"#5F343C",795,260);
    scorebox= new component("30px", "Consolas", "black", 320, 40, "text");
    gameball = new comp(10,"#CAD6D3",250+Math.floor(Math.random() * 300),200+Math.floor(Math.random() * 200));
    myGameArea.start();
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
          })
          window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false; 
          })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}
function comp(radius,color,x,y){
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.speedX=1;
    this.speedY=-1;
    this.color = color;
    this.update = function(){
        ctx1=myGameArea.context;
        ctx1.beginPath();
        ctx1.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        ctx1.strokeStyle="black";
        ctx1.stroke();
        ctx1.fillStyle = this.color;
        ctx1.fill();
    }
}
function component(width, height,color, x, y,type) {
    this.type= type;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        if(this.type == "text")
        {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else{
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);}
    }
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}
function updateGameArea() {
    myGameArea.clear();
    gameball.x+=gameball.speedX;
    gameball.y+=gameball.speedY;
    if (myGameArea.keys && myGameArea.keys[37]) 
    {if(gameball.speedY>0)
        controlpiecebottom.x-=(4+score);
     else
        controlpiecetop.x-=(4+score);
    }
    if (myGameArea.keys && myGameArea.keys[39]) 
    {if(gameball.speedY>0)
        controlpiecebottom.x+=(4+score);
     else
        controlpiecetop.x+=(4+score);
    }
    if (myGameArea.keys && myGameArea.keys[38]) 
    {if(gameball.speedX<0)
        controlpieceleft.y-=(4+score);
     else
        controlpieceright.y-=(4+score);
    }
    if (myGameArea.keys && myGameArea.keys[40]) 
    {if(gameball.speedX<0)
        controlpieceleft.y+=(4+score);
     else
        controlpieceright.y+=(4+score);
    }
    if(controlpiecetop.x<0)
    controlpiecetop.x=0;
    if(controlpiecetop.x>myGameArea.canvas.width-controlpiecetop.width)
    controlpiecetop.x=myGameArea.canvas.width-controlpiecetop.width;
    if(controlpiecebottom.x<0)
    controlpiecebottom.x=0;
    if(controlpiecebottom.x>myGameArea.canvas.width-controlpiecebottom.width)
    controlpiecebottom.x=myGameArea.canvas.width-controlpiecebottom.width;
    if(controlpieceleft.y<0)
    controlpieceleft.y=0;
    if(controlpieceleft.y>myGameArea.canvas.height-controlpieceleft.height)
    controlpieceleft.y=myGameArea.canvas.height-controlpieceleft.height;
    if(controlpieceright.y<0)
    controlpieceright.y=0;
    if(controlpieceright.y>myGameArea.canvas.height-controlpieceright.height)
    controlpieceright.y=myGameArea.canvas.height-controlpieceright.height;
    if(gameball.x<=controlpieceleft.width+gameball.radius && gameball.y >=controlpieceleft.y && gameball.y <=controlpieceleft.y+controlpieceleft.height)
       {gameball.speedX*=-1;gameball.speedX+=0.5;score++;tick.play();}
    else if(gameball.x<=controlpieceleft.width+gameball.radius)
       {playOver();}   
    if(gameball.x>=myGameArea.canvas.width - controlpieceright.width-gameball.radius && gameball.y >=controlpieceright.y && gameball.y <=controlpieceright.y+controlpieceright.height)
       {gameball.speedX*=-1;gameball.speedX-=0.5;score++;tick.play();}
    else if(gameball.x>=myGameArea.canvas.width - controlpieceright.width-gameball.radius){
        playOver();
    }   
    if(gameball.y<=controlpiecetop.height+gameball.radius && gameball.x >=controlpiecetop.x && gameball.x <=controlpiecetop.x+controlpiecetop.width)
       {gameball.speedY*=-1;gameball.speedY+=0.5;score++;tick.play();}
    else if(gameball.y<=controlpiecetop.height+gameball.radius){
        playOver();
    }   
    if(gameball.y>=myGameArea.canvas.height - controlpiecebottom.height-gameball.radius && gameball.x >=controlpiecebottom.x && gameball.x <=controlpiecebottom.x+controlpiecebottom.width)
       {gameball.speedY*=-1;gameball.speedY-=0.5;score++;tick.play();}
    else if(gameball.y>=myGameArea.canvas.height - controlpiecebottom.height-gameball.radius){
        playOver();
    }
    scorebox.text="Score: "+score;
    backgroundColorComp.update();
    scorebox.update();   
    controlpiecetop.update();
    controlpiecebottom.update();
    controlpieceleft.update();
    controlpieceright.update();
    gameball.update();
}
function playOver(){
    console.log("playover");
    buzz.play();
    myGameArea.stop();
    backgroundColorComp.color="#EC897B";
    backgroundColorComp.update();
}
    /*var playingAgain=document.getElementById("playAgain");
    playingAgain.style.display = "block";
    playingAgain.addEventListener("click",newPlay());

}
function newPlay(){
    document.getElementById("playAgain").style.display= "none";
    myGameArea.clear();
    myGameArea.start();
}*/