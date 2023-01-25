var caesarShift = function (str, amount) {
    // Wrap the amount
    if (amount < 0) {
      return caesarShift(str, amount + 26);
    }
  
    // Make an output variable
    var output = "";
  
    // Go through each character
    for (var i = 0; i < str.length; i++) {
      // Get the character we'll be appending
      var c = str[i];
  
      // If it's a letter...
      if (c.match(/[a-z]/i)) {
        // Get its code
        var code = str.charCodeAt(i);
  
        // Uppercase letters
        if (code >= 65 && code <= 90) {
          c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
        }
  
        // Lowercase letters
        else if (code >= 97 && code <= 122) {
          c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }
      }
  
      // Append
      output += c;
    }
  
    // All done!
    return output;
  };

  var shiftAnimation = async function(amount, speed) {
    console.log("Total Time the shift animation will take: " + (amount*26*3*speed) + "ms");
    const table = document.getElementById("cipherTable"); //get the cipher table
    let dir = 1; // if the key is positive we need it to move to the right 1 each time
    if (amount < 0) // check if the amount is negative and if it is account for that so the logic doesnt break
    {
      amount = amount * -1; //make the amount positive in order to not break the following for-loop
      dir = -1; //make the direction we are shifting negative since that is what was inputed
    }

    //Also as a note I think the following line of code (Line 51) will need to be uncommented unless we are going to put limits on how big the shift is going to be
        //Or Else we are going to run into an issue of this loop taking a rediculously long time.
    amount = amount % 26; //This should simplify the amount of times the anim loops to the effective distance based on the amount inputed [NOT CONFIDENT THO]

    for (var j = 1; j <= amount; j++) //loop through the amount of times in order to 1 by 1 shift the eniter cipher
    {
      for (var i = 1, cell; cell = table.rows[1].cells[i]; i++) //iterate through the cells in the cipher row [row 0 plain-text / row 1 cipher-text]
      {
        table.rows[1].cells[i].style.background = "green";
        await sleep(speed);
        table.rows[1].cells[i].innerHTML = caesarShift(table.rows[1].cells[i].innerHTML, dir); //shift the current letter in the correct direction according to the dir var
        await sleep(speed);
        table.rows[1].cells[i].style.background = null;
        await sleep(speed);
      }
    }
  };

  //This is a sleep function used above with => await sleep(ms); and can only be used in async functions
  var sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };