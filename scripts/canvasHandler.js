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
        var img = new WebImage(diagramImg);
        println("test");
        var ratio =  img.height / img.width;
        //var ratio = 1;
        //img.setSize(200, 200);
        img.setPosition(img.width, img.height);
        add(img);
    }

    function sendMessage(imgSrc, message){

    }

    //End of Program
    if (typeof start === 'function') {
        start();
    }
};