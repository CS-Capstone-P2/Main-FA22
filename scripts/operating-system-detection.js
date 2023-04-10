let userAgent = navigator.userAgent;
let osDetails = {
  name: 'base',
  icon: 'fa-question-circle'
};

if (userAgent.includes('Macintosh')) {
    setOSMac();
}

if (userAgent.includes('Windows')) {
    setOSWindows();
}

if (userAgent.includes('Linux')) {
    setOSLinux();
}
updateOsDownloadButton(osDetails);


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

function setOSWindows()
{
    osDetails.name = 'Windows';
    osDetails.icon = 'fa-windows';
}

function setOSLinux()
{
    osDetails.name = 'Linux';
    osDetails.icon = 'fa-linux';
}

function setOSMac()
{
    osDetails.name = 'Mac';
    osDetails.icon = 'fa-apple';
}

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