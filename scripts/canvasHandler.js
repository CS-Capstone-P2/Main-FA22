var canvas;
var context;
var cwidth;
var cheight;

window.onload = function (){
    canvas = document.getElementById("cvs");
    context = canvas.getContext("2d");
    const img = new Image();
    cwidth = canvas.width;
    cheight = canvas.height;
    img.onload = () => {
        context.drawImage(img, 0 , 0);
    };
    img.src = "../images/AB_arrow.png";
}

var changeImage = function(src){
    context.clearRect(0, 0, cwidth, cheight);
    const img = new Image();
    img.onload = () => {
        context.drawImage(img, 0 , 0);
    };
    img.src = src;
}

var draw = function(src){

}


$(function()
{
    context = canvas.getContext("2d");

    setInterval("animate()", 30);
    textDirection = "right";
    textXpos = 5;
});


function animate(){
    var metrics = context.measureText(text);
    var textWidth = metrics.width;
    
    var speed = 10;
    
    if (textDirection == "right") {
    if (textXpos > 490 - textWidth) {
            speed = 0;
        }
        textXpos += speed;

        
    }
    else {
        textXpos -= 10;

        if (textXpos < 10) {
            textDirection = "right";
        }                    
    }

    context.font = '20px _sans';
    context.fillStyle = '#FF0000';
    context.textBaseline = 'top';
    context.fillText( text, textXpos, 180);
}

var dtext = "";

var drawText = function(text){
    dtext = text;
}