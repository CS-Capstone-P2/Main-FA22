var vidLinkUpdaterRunning = false;

async function vidLinkUpdater(currentOSstringId, osSpecificVidId, lastState="optional")
{
    if(vidLinkUpdaterRunning)
    {
        return lastState;
    }

    vidLinkUpdaterRunning = true;
    let os = getOSinElementString(currentOSstringId);

    if(os == lastState)
    {
        return os;
    }

    let linkToUpdate = document.getElementById(osSpecificVidId);
    let links = getChildNodeById(linkToUpdate.parentElement, "os-specific-links");
    let newlink = getChildNodeById(links, os);
    console.log(newlink.src);
    
    let iframe = getChildNodeById(linkToUpdate, "iframe");
    iframe.src = newlink.src;
    vidLinkUpdaterRunning = false;
    return os;
}

function getChildNodeById(parent, id)
{
    let n = parent.childNodes;
    for(i = 0; i < n.length; i++)
    {
        if(n[i].id == id)
        {
            return n[i];
        }
    }
    return null;
}

function getOSinElementString(elementId)
{
    let text = document.getElementById(elementId).innerHTML;
    let n = text.split(" ");
    let os = "Default";
    for(i = 0; i < n.length; i++)
    {
        if(n[i].toLowerCase() == "windows")
        {
            os = "Windows";
        }
        else if(n[i].toLowerCase() == "linux")
        {
            os = "Linux";
        }
        else if(n[i].toLowerCase() == "mac")
        {
            os = "Mac";
        }
    }
    return os;
}