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
  
  var shiftAnimation = async function(shiftKey, speed) 
  {
    clearTable("cipherTable");
    generateCipherTable();

    //console.log("Total Time the shift animation will take: " + (shiftKey*26*3*speed) + "ms");
    const table = document.getElementById("cipherTable"); //get the cipher table
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
      if(j < 4)
      {
        if(j > 1)
        {
          // Insert a row at the end of table
          const newRow = document.createElement("tr");
          var indexToCopy = j - 1;
          var differentLabel = "Shift Key ";

          for(var i = 0, cell; cell = table.rows[indexToCopy].cells[i]; i++)
          {
            const new_cell = document.createElement("td");
            const cellText = document.createTextNode(`${table.rows[indexToCopy].cells[i].innerHTML}`);
            new_cell.appendChild(cellText);
            newRow.appendChild(new_cell);
          }

          if(differentLabel != "")
          {
            newRow.cells[0].innerHTML = differentLabel;
          }
          table.tBodies[0].appendChild(newRow);
        }

        for (var i = 0, cell; cell = table.rows[j].cells[i]; i++) //iterate through the cells in the cipher row [row 0 plain-text / row 1 cipher-text]
        {
          if(i == 0)
          {
            table.rows[j].cells[i].innerHTML += j;
          }else{
            table.rows[j].cells[i].style.background = "green";
            await sleep(speed);
            table.rows[j].cells[i].innerHTML = caesarShift(table.rows[j].cells[i].innerHTML, dir); //shift the current letter in the correct direction according to the dir var
            await sleep(speed);
            table.rows[j].cells[i].style.background = null;
            await sleep(speed);
          }
        }
      }
      else{
        //add row with the verical elipse = table.rows[1].cells[4].innerHTML = "⋮";
        if(j == 4)
        {
          {
            //add elipse
            const row = document.createElement("tr");
            {
              const cell = document.createElement("td");
              const cellText = document.createTextNode(`⋮`);
              //append the child node to the cell
              cell.appendChild(cellText);
              //append the cell to the row
              row.appendChild(cell);
            }
            for (var z = 0; z < 26; z++)
            {
              const cell = document.createElement("td");
              const cellText = document.createTextNode(`⋮`);
              //append the child node to the cell
              cell.appendChild(cellText);
              //append the cell to the row
              row.appendChild(cell);
            }
            
            table.tBodies[0].appendChild(row);
          }

          //create a copy row
          const newRow = document.createElement("tr");
          var indexToCopy = j - 1;
          var differentLabel = "Shift Key ";

          for(var i = 0, cell; cell = table.rows[indexToCopy].cells[i]; i++)
          {
            const new_cell = document.createElement("td");
            const cellText = document.createTextNode(`${table.rows[indexToCopy].cells[i].innerHTML}`);
            new_cell.appendChild(cellText);
            newRow.appendChild(new_cell);
          }

          if(differentLabel != "")
          {
            newRow.cells[0].innerHTML = differentLabel + shiftKey;
          }
          table.tBodies[0].appendChild(newRow);
        }
        //finish the rest of the cipher table
        for (var i = 1, cell; cell = table.rows[5].cells[i]; i++) //iterate through the cells in the cipher row [row 0 plain-text / row 1 cipher-text]
        {
          table.rows[5].cells[i].style.background = "green";
          await sleep(speed);
          table.rows[5].cells[i].innerHTML = caesarShift(table.rows[5].cells[i].innerHTML, dir); //shift the current letter in the correct direction according to the dir var
          await sleep(speed);
          table.rows[5].cells[i].style.background = null;
          await sleep(speed);
        }
      }
    }
  };

  //This is a sleep function used above with => await sleep(ms); and can only be used in async functions
  var sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  var encryptAnimation = async function(speed, decrypt=false)
  {
    const messageTable = document.getElementById("messageTable");
    const cipherTable = document.getElementById("cipherTable");
    
    //differentiate between encrypt and decrypt
    const messageTableRow = 0;
    let searchRow = 0;
    let oppositeRow = cipherTable.rows.length - 1;
    if(decrypt)
    {
      searchRow = cipherTable.rows.length - 1;
      oppositeRow = 0;
    }

    //console.log("here1");
    for(var i = 0, cell; cell = messageTable.rows[messageTableRow].cells[i]; i++) // for each element in message table
    {
      //if the character is a non-letter, skip and continue
      if(messageTable.rows[messageTableRow].cells[i].innerHTML.charCodeAt(0) <= 64 || messageTable.rows[messageTableRow].cells[i].innerHTML.charCodeAt(0) >= 123 || (messageTable.rows[messageTableRow].cells[i].innerHTML.charCodeAt(0) >= 91 && messageTable.rows[messageTableRow].cells[i].innerHTML.charCodeAt(0) <= 96))
      {
        continue;
      }
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
          let temp = searchRow;
          let direction = -1;
          if(searchRow > oppositeRow) {direction = 1; }

          while(temp != oppositeRow)
          {
            cipherTable.rows[temp - direction].cells[j].style.background = "green"; //highlight the cell under the current cipher table cell green
            await sleep(speed);
            cipherTable.rows[temp].cells[j].style.background = null; //un-highlight the upper cell
            await sleep(speed);
            temp -= direction;
          }
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
  }

  var populateMessageTable = async function(message){
    await clearTable("messageTable");
    const messageTable = document.getElementById("messageTable");
    
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

  var clearTable = async function (tableId)
  {
    var bodyRef = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    if(bodyRef != null)
    {
      bodyRef.remove();
    }
  }

  var generateCipherTable = async function () 
  {
    // creates a <table> element and a <tbody> element
    const plainStr = new String("ABCDEFGHIJKLMNOPQRSTUVWXYZ"); // all the characters that we used to fill in the table to make this more readable
    const tbl = document.getElementById("cipherTable"); //gets the table existing in the HTML based off the id we assigned the table (HardCoded)
    const tblBody = document.createElement("tbody"); //creating a body element for the table that we will attach at the end of the function after it has been filled out

    // creating all cells
    for (let i = 1; i <= 2; i++) {
        // creates a table row
        const row = document.createElement("tr");

        for (let j = 0; j < 27; j++) {
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
                    cellText = document.createTextNode(`Shift Key `);
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
}