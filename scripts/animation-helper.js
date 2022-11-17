function changeSenderImage()
{
var img = document.getElementById("senderimage");
img.src="images/Sender-After.jpg";

document.getElementById("step2").style = "display:all";

return false;
}

function changePacketImage()
{
var img = document.getElementById("packetimage");
img.src="images/Packet-After.jpg";

document.getElementById("step2").style = "display:none";
document.getElementById("step3").style = "display:all";


return false;
}

function changeRecipientImage()
{
var img = document.getElementById("recipientimage");
img.src="images/Recipient-After.jpg";

document.getElementById("step3").style = "display:none";

return false;
}
 
   