/*
 * Filename: os-link-updater.js
 * Documented by: Gabe Roy
 *
 * Description:
 * The purpose of this JavaScript code is to update an embedded 
 * video's source link based on the user's detected operating system (OS).
 * The code listens for changes in the OS and updates the video link accordingly by 
 * replacing the source of an iframe element. It provides utility functions to get a 
 * child node of a parent element by its ID and to get the OS string from an element's innerHTML.
 */


// Initialize a variable to check if the video link updater is currently running.
var vidLinkUpdaterRunning = false;


/**
 * Update the video link according to the user's detected operating system.
 * param {string} currentOSstringId - The ID of the element containing the current OS string.
 * param {string} osSpecificVidId - The ID of the element containing the OS-specific video.
 * param {string} [lastState="optional"] - The last state of the OS.
 * return {Promise<string>} - The detected OS.
 */
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

/**
 * Get a child node of a parent element by its ID.
 * param {Object} parent - The parent element.
 * param {string} id - The ID of the child node to be retrieved.
 * return {Object|null} - The child node if found, or null if not found.
 */

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

/**
 * Get the operating system string from an element's innerHTML.
 * param {string} elementId - The ID of the element containing the operating system string.
 * return {string} - The detected operating system string.
 */

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