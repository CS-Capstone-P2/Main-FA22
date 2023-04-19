/*
 * Filename: encoding-helper.js
 * Documented by: Gabe Roy
 *
 * Description:
 * This file contains utility functions for converting between different
 * encoding formats, such as PEM, Base64, and ArrayBuffer. These functions
 * are helpful when working with encryption and encoding tasks.
 */

/**
 * Converts a PEM-formatted string to a Base64 string.
 *
 * @param {string} value - The PEM-formatted string.
 * @param {string} label - The label for the PEM format (e.g., "PRIVATE KEY").
 * @returns {string} The resulting Base64 string.
 */

var pemToBase64String = function (value, label) {
    var lines = value.split("\n");
    var base64String = "";

    for (var i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("-----")) continue;
        base64String += lines[i];
    }

    return base64String;
};

/**
 * Converts a Base64 string to an ArrayBuffer.
 *
 * @param {string} value - The Base64 string.
 * @returns {ArrayBuffer} The resulting ArrayBuffer.
 */

var base64StringToArrayBuffer = function (value) {
    var byteString = atob(value);
    var byteArray = new Uint8Array(byteString.length); 

    for (var i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
    }

    return byteArray.buffer;
};

/**
 * Converts a Base64 string to a PEM-formatted string.
 *
 * @param {string} value - The Base64 string.
 * @param {string} label - The label for the PEM format (e.g., "PRIVATE KEY").
 * @returns {string} The resulting PEM-formatted string.
 */

var base64StringToPem = function (value, label) {
    var pem = "-----BEGIN {0}-----\n".replace("{0}", label);

    for (var i = 0; i < value.length; i += 64) {
        pem += value.substr(i, 64) + "\n";
    }

    pem += "-----END {0}-----\n".replace("{0}", label);

    return pem;
};

/**
 * Converts an ArrayBuffer to a Base64 string.
 *
 * @param {ArrayBuffer} value - The ArrayBuffer.
 * @returns {string} The resulting Base64 string.
 */

var arrayBufferToBase64String = function (value) {
    var byteArray = new Uint8Array(value);
    var byteString = "";

    for (var i = 0; i < byteArray.byteLength; i++) {
        byteString += String.fromCharCode(byteArray[i]);
    }

    return btoa(byteString);
};

/**
 * Converts a PEM-formatted string to an ArrayBuffer.
 *
 * @param {string} value - The PEM-formatted string.
 * @returns {ArrayBuffer} The resulting ArrayBuffer.
 */

var pemToArrayBuffer = function (value) {
    return base64StringToArrayBuffer(pemToBase64String(value));
};

/**
 * Converts an ArrayBuffer to a PEM-formatted string.
 *
 * @param {ArrayBuffer} value - The ArrayBuffer.
 * @param {string} label - The label for the PEM format (e.g., "PRIVATE KEY").
 * @returns {string} The resulting PEM-formatted string.
 */

var arrayBufferToPem = function (value, label) {
    return base64StringToPem(arrayBufferToBase64String(value), label);
};
