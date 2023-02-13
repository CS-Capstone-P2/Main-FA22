/*This Javascript Caesar Shift script is originally created by Evan Hahn, who provided it 
to be used for both commerical and non-commerical usage. The GitHub that provided this code can be
followed by this link (https://gist.github.com/EvanHahn/2587465).

As quoted on his comment section in the code: "Anyone is free to copy, modify, publish, use, compile, 
sell, or distribute this software, either in source code form or as a compiled binary, for any
purpose, commercial or non-commercial, and by any means."

There were minor changes to the inital code that made it to the final product, most notably the 
inclusion of a number encryption (Hahn's cipher was originally meant for ASCII characters for the sake
of simplifying the encryption and decryption process).
*/

var cShift = function (str, amount) {
  //NOTE: and console.log() used were for me to keep track on what was happening,
  //they do not affect the code nor the user's experience
  var output = "";
  console.log("Amount: ", amount);
  let k = parseInt(amount); //to ensure that amount is considered a number and not a string

  if (k < 0) {
    return cShift(str, k + 26);
  }

  // Go through each character
  for (var i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    console.log("C: ", c);

    if (c.match(/[a-z]/i)) {
      var code = str.charCodeAt(i);
      console.log("Code: ", code);
      // Uppercase letters
      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + k) % 26) + 65);
      }
      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        c = String.fromCharCode(((code - 97 + k) % 26) + 97);
        //console.log("New C: ", c);
      }
    } else if (c.match(/[0-9]/i)) {
      var num = parseInt(c);
      console.log("num: ", num);
      c = num + k;
      console.log("c: ", c);
    }
    output += c;
  }
  return output;
};


/*
Zach Wilson & Sean Martin Code Below from old caesar shift animation to use for the overall diagram page
*/

var diagramShiftAnimation = async function(shiftKey, speed, cipherTableId) {
  //console.log("Total Time the shift animation will take: " + (shiftKey*26*3*speed) + "ms");
  const table = document.getElementById(cipherTableId); //get the cipher table
  let dir = 1; // if the key is positive we need it to move to the right 1 each time
  if (shiftKey < 0) // check if the amount is negative and if it is account for that so the logic doesnt break
  {
    shiftKey = shiftKey * -1; //make the amount positive in order to not break the following for-loop
    dir = -1; //make the direction we are shifting negative since that is what was inputed
  }

  //Also as a note I think the following line of code (Line 51) will need to be uncommented unless we are going to put limits on how big the shift is going to be
      //Or Else we are going to run into an issue of this loop taking a rediculously long time.
  shiftKey = shiftKey % 26; //This should simplify the amount of times the anim loops to the effective distance based on the amount inputed [NOT CONFIDENT THO]

  for (var j = 1; j <= shiftKey; j++) //loop through the amount of times in order to 1 by 1 shift the eniter cipher
  {
    for (var i = 1, cell; cell = table.rows[1].cells[i]; i++) //iterate through the cells in the cipher row [row 0 plain-text / row 1 cipher-text]
    {
      table.rows[1].cells[i].style.background = "green";
      await sleep(speed);
      table.rows[1].cells[i].innerHTML = cShift(table.rows[1].cells[i].innerHTML, dir); //shift the current letter in the correct direction according to the dir var
      await sleep(speed);
      table.rows[1].cells[i].style.background = null;
      await sleep(speed);
    }
  }
};

var sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

var diagramEncryptAnimation = async function(speed, cipherTableId, messageTableId, decrypt=false)
{
  const messageTable = document.getElementById(messageTableId);
  const cipherTable = document.getElementById(cipherTableId);
  
  //differentiate between encrypt and decrypt
  const messageTableRow = 0;
  let searchRow = 0;
  let oppositeRow = 1;
  if(decrypt)
  {
    searchRow = 1;
    oppositeRow = 0;
  }

  //console.log("here1");
  for(var i = 0, cell; cell = messageTable.rows[messageTableRow].cells[i]; i++) // for each element in message table
  {
    //console.log("here2");
    messageTable.rows[messageTableRow].cells[i].style.background = "green"; //set the current cell to green highlight
    await sleep(speed);
    
    for(var j = 0, cell; cell = cipherTable.rows[searchRow].cells[j]; j++) // search the cipher table for the corrisponding letter
    {
      //console.log("here3");
      if (j == 0){continue;} // if it is on an index that is part of the key
      cipherTable.rows[searchRow].cells[j].style.background = "green"; //set the current cipher table cell to green highlight
      await sleep(speed);
      if(cipherTable.rows[searchRow].cells[j].innerHTML == messageTable.rows[messageTableRow].cells[i].innerHTML) // if the two letters are equal
      {
        cipherTable.rows[oppositeRow].cells[j].style.background = "green"; //highlight the cell under the current cipher table cell green
        await sleep(speed);
        cipherTable.rows[searchRow].cells[j].style.background = null; //un-highlight the upper cell
        await sleep(speed);
        messageTable.rows[messageTableRow].cells[i].innerHTML = cipherTable.rows[oppositeRow].cells[j].innerHTML; //set the message cell to the cipher text
        await sleep(speed);
        cipherTable.rows[oppositeRow].cells[j].style.background = null; // unhighlight the cipher table cell
        break; // break out to move onto the next message table cell
      }
      else{
        cipherTable.rows[searchRow].cells[j].style.background = null;
      }
      await sleep(speed);
    }
    //unhighlight current letter and move on
    messageTable.rows[messageTableRow].cells[i].style.background = null;
    await sleep(speed);
  }
  //console.log("here4");
};

var diagramGenerateTable = async function(plainStr, cipherTableId) 
{
  await clearTable(cipherTableId);
  // creates a <table> element and a <tbody> element
  plainStr = tableSanitization(plainStr);
  const tbl = document.getElementById(cipherTableId); //gets the table existing in the HTML based off the id we assigned the table (HardCoded)
  const tblBody = document.createElement("tbody"); //creating a body element for the table that we will attach at the end of the function after it has been filled out

  // creating all cells
  for (let i = 1; i <= 2; i++) {
      // creates a table row
      const row = document.createElement("tr");

      for (let j = 0; j <= plainStr.length; j++) {
          //gets the value to put into celltext
          var c = plainStr[j - 1];

          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          const cell = document.createElement("td");
          let cellText;
          if(j==0){ //This is a check to see if we are currently in the label column
              if(i==1) //check for the row that we are on and put in the appropriate label accordingly
              {
                  cellText = document.createTextNode(`Plain`);
              }
              else{
                  cellText = document.createTextNode(`Cipher`);
              }
          }
          else{  //otherwise we are using the appropriate default lettering
              cellText = document.createTextNode(`${c}`);
          }
          //append the child node to the cell
          cell.appendChild(cellText);
          //append the cell to the row
          row.appendChild(cell);
      }

      // add the row to the end of the table body
      tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body> [NOT NEEDED SINCE WE ARE NOT GENERATING A TABLE IN THIS METHOD JUST EDITING AN EXISTING TABLE]
          //document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2' [not sure but this might be getting overwritten by the css sytle]
  tbl.setAttribute("border", "2");
};

var tableSanitization = function(inputStr)
{
  temp = "";
  for(var i = 0; i < inputStr.length; i++)
  {
    let bfound = false;
    for(var j = 0; j < temp.length; j++)
    {
      if(temp[j] == inputStr[i])
      {
        bfound = true;
      }
    }

    if(bfound)
    {
      temp += inputStr[i];
    }
  }
  return temp;
};

var clearTable = async function (tableId)
{
  var bodyRef = document.getElementById(tableId).getElementsByTagName('tbody')[0];
  if(bodyRef != null)
  {
    bodyRef.remove();
  }
};


var populateTextTable = async function(message, tableId){
  await clearTable(tableId);
  const messageTable = document.getElementById(tableId);
  
  //first generate the message tables
  const tblBody = document.createElement("tbody"); //creating a body element for the table that we will attach at the end of the function after it has been filled out
  const row = document.createElement("tr");

  for (let j = 0; j < message.length; j++) 
  {
    // Create a <td> element and a text node, make the text
    // node the contents of the <td>, and put the <td> at
    // the end of the table row
    const cell = document.createElement("td");
    const cellText = document.createTextNode(`${message[j]}`);
    //append the child node to the cell
    cell.appendChild(cellText);
    //append the cell to the row
    row.appendChild(cell);
  }

  // add the row to the end of the table body
  tblBody.appendChild(row);


  // put the <tbody> in the <table>
  messageTable.appendChild(tblBody);
  // appends <table> into <body> [NOT NEEDED SINCE WE ARE NOT GENERATING A TABLE IN THIS METHOD JUST EDITING AN EXISTING TABLE]
          //document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2' [not sure but this might be getting overwritten by the css sytle]
  //messageTable.setAttribute("border", "2");
}
