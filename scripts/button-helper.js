/*
 * Zach Wilson
 * 1/25/23
 * This script is for functions to help expand the capabilities of buttons
 */

function toggleVisibility(divId, buttonId=null, onlyHideButton=true)
{
    var exampleDiv = document.getElementById(divId);
    var button;
    if(buttonId != null)
    {
        button = document.getElementById(buttonId);
    }
                
    if(exampleDiv.style.visibility == "hidden") {
        exampleDiv.style.visibility = "visible";
        if(buttonId != null) 
        { 
            if(onlyHideButton)
            {
                button.style.visibility = "hidden"; 
            }
            else
            {
                button.style.display = "none"; 
            }
        }
    } 
    else 
    {
        exampleDiv.style.visibility = "hidden";
    }
}

async function runShiftAsyncButton(divId, shiftKey, speed, message, buttonId=null, onlyHideButton=true)
{
    if (message.trim() == "") //Halts the function and creates an alert if the message consists only of spaces.
    {
        alert("User has only entered spaces!");
        return -1;
    }
    var exampleDiv = document.getElementById(divId);
    var button;
    if(buttonId != null)
    {
        button = document.getElementById(buttonId);
    }
                
    
    if(buttonId != null) 
    { 
        if(onlyHideButton)
        {
            button.style.visibility = "hidden";
        }
        else
        {
            button.style.display = "none"; 
        }
    }
    await shiftAnimation(shiftKey, speed);
    await clearTable("messageTable");
    await populateMessageTable(message); // message needs to be sanitized
    await encryptAnimation(speed);
    exampleDiv.style.visibility = "visible";
}