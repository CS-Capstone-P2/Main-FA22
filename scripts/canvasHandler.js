window.onload = function() {
    var diagramImg = "../images/AB_arrow_right.png";
    var width;
    var height;
    var centerWidth = width /2;
    var centerHeight = height /2;

    // Your code goes here
    function start(){
        removeAll();
        width = getWidth();
        height = getHeight();
        var img = new WebImage(diagramImg);
        println("test");
        var imgHeight =  (img.height / img.width) * width;
        println(imgHeight);
        //var ratio = 1;
        //img.setSize(200, 200);
        img.setSize(width, imgHeight);
        img.setPosition(width, imgHeight);
        add(img);
    }

    function sendMessage(imgSrc, message){

    }

    //End of Program
    if (typeof start === 'function') {
        start();
    }
};