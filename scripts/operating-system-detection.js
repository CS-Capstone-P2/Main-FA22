/*
 * Filename: operating-system-detection.js
 * Documented by: Gabe Roy
 *
 * Description:
 * This JavaScript code snippet is designed to detect the user's
 *  operating system (OS) based on their browser's user agent string
 *  and update the text and href of a download button accordingly. 
 * It supports the detection of Mac, Windows, and Linux operating systems.
 * In addition, the code provides a function to cycle through the available 
 * operating systems, allowing the user to manually change the displayed OS on the download button.
 */


// Get the user agent string from the browser.
let userAgent = navigator.userAgent;
// Initialize an object to store the detected OS details.
let osDetails = {
  name: 'base',
  icon: 'fa-question-circle'
};

// Set OS details based on the user agent string.
if (userAgent.includes('Macintosh')) {
    setOSMac();
}

if (userAgent.includes('Windows')) {
    setOSWindows();
}

if (userAgent.includes('Linux')) {
    setOSLinux();
}

// Update the download button with the detected OS details.
updateOsDownloadButton(osDetails);


/**
 * Update the download button text and href with the provided OS details.
 * param {Object} osDetails - An object containing the OS name and icon.
 */
function updateOsDownloadButton(osDetails) {
  let buttonText = document.querySelector('.btn-download-os').innerHTML;
  let n = buttonText.split(" ");
  let lastWord = n[n.length - 1];
  let secondlastWord = n[n.length - 2];
  let href = "base";
  if(secondlastWord == "for" && (lastWord == "Windows" || lastWord == "Linux" || lastWord == "Mac"))
  {
    buttonText = buttonText
        .replace("for", "")
        .replace(lastWord, "");
    href = lastWord;
  }
  document.querySelector('.btn-download-os').innerHTML = buttonText + ' for ' + osDetails.name;
  changeHref(document.querySelector('.btn-download-os').id, document.querySelector('.btn-download-os').parentElement.id, href);
}


/**
 * Set the OS details for Windows.
 */
function setOSWindows()
{
    osDetails.name = 'Windows';
    osDetails.icon = 'fa-windows';
}


/**
 * Set the OS details for Linux.
 */
function setOSLinux()
{
    osDetails.name = 'Linux';
    osDetails.icon = 'fa-linux';
}


/**
 * Set the OS details for Mac.
 */
function setOSMac()
{
    osDetails.name = 'Mac';
    osDetails.icon = 'fa-apple';
}

/**
 * Cycle through the available OS options and update the download button.
 */
function cycleSelectedOS()
{
    if(osDetails.name == "Windows"){
        setOSMac();
    }
    else if(osDetails.name == "Mac"){
        setOSLinux();
    }
    else{
        setOSWindows();
    }
    updateOsDownloadButton(osDetails);
}