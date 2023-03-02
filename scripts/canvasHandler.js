window.onload = function() {
    var diagramImg = "../images/AB_arrow_right.png";
    var width;
    var height;
    var centerWidth = width /2;
    var centerHeight = height /2;

    // Your code goes here
    function start(){
        width = getWidth();
        height = getHeight();
        var img = new WebImage("../images/AB_arrow_right.png");
        println(test);
        //var ratio =  img.height / img.width;
        var ratio = 1;
        img.setSize(width, width * ratio);
        img.setPosition(0, 0);
    }

    function sendMessage(imgSrc, message){

    }

    //End of Program
    if (typeof start === 'function') {
        start();
    }
};