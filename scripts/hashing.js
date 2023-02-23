var concatination = function(S, M){
    const concat = [S, M];
    return concat;
}

var hashingFunction = function(arr){
    var temp = "";
    for(let i = 0; i < arr.length; i++)
    {
        temp += arr[i].toString();
    }
    let hash = parseInt(temp) % 13;
    arr[0] = hash;
    return arr;
}

var reverseHash = function(S, arr){ 
    let obtainedHash = arr[0];
    arr[0] = S;
    arr = hashingFunction(arr);
    return arr[0] == obtainedHash;
}
