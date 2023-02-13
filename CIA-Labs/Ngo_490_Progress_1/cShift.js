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
