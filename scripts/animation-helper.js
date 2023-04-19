/*
 * Filename: animation-helper.js
 * Documented by: Gabe Roy
 *
 * Description:
 * This file contains functions to change images and display styles
 * in a step-by-step animation sequence, involving a sender, packet,
 * and recipient.
 */

/**
 * Change the sender image and reveal the next step in the animation.
 *
 * Changes the image for the sender to a new image and sets the display
 * property of the element with the "step2" ID to "all" to reveal the
 * next step in the animation.
 *
 * @returns {boolean} false is to prevent default behavior.
 */

function changeSenderImage()
{
var img = document.getElementById("senderimage");
img.src="images/Sender-After.jpg";

document.getElementById("step2").style = "display:all";

return false;
}

/**
 * Change the packet image and update the visibility of animation steps.
 *
 * Changes the image for the packet to a new image, hides the current step
 * with the "step2" ID, and reveals the next step with the "step3" ID in
 * the animation.
 *
 * @returns {boolean} false is to prevent default behavior.
 */

function changePacketImage()
{
var img = document.getElementById("packetimage");
img.src="images/Packet-After.jpg";

document.getElementById("step2").style = "display:none";
document.getElementById("step3").style = "display:all";


return false;
}

/**
 * Change the recipient image and hide the current step in the animation.
 *
 * Changes the image for the recipient to a new image and sets the display
 * property of the element with the "step3" ID to "none" to hide the
 * current step in the animation.
 *
 * @returns {boolean} false is to prevent default behavior.
 */

function changeRecipientImage()
{
var img = document.getElementById("recipientimage");
img.src="images/Recipient-After.jpg";

document.getElementById("step3").style = "display:none";

return false;
}