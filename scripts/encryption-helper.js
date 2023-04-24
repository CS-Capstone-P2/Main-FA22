
/*
 * Filename: encryption-helper.js
 * Documented by: Gabe Roy
 *
 * Description:
 * This file contains utility functions for asymmetric RSA and symmetric AES
 * encryption and decryption. These functions use the Web Crypto API to
 * perform cryptographic operations.
 */


// RSA configuration
var rsaAlgorithm = {
    name: "RSA-OAEP",
    modulusLength: 2048,
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: { name: "SHA-256" }
};


// AES configuration
var aesAlgorithm = {
    name: "AES-GCM",
    length: 256
};

// AES IV length
var aesIVLength = 12;


/**
 * Generate RSA public and private keys.
 *
 * returns {Promise<Object>} A Promise that resolves to an object containing
 *                            ArrayBuffer representations of the generated public
 *                            and private keys.
 */
var generateRsaKeys = function () {
    return crypto.subtle.generateKey(rsaAlgorithm,
        /* extractable: */ true, /* keyUsages: */ ["wrapKey", "unwrapKey"])
        .catch(function (error) { throw "Error generating keys."; })
        .then(function (rsaKey) {
            var exportPublicKey = crypto.subtle.exportKey("spki", rsaKey.publicKey)
                .catch(function (error) { throw "Error exporting public key."; });
            var exportPrivateKey = crypto.subtle.exportKey("pkcs8", rsaKey.privateKey)
                .catch(function (error) { throw "Error exporting private key."; });

            return Promise.all([exportPublicKey, exportPrivateKey])
                .then(function (keys) { return { publicKeyBuffer: keys[0], privateKeyBuffer: keys[1] }; });
        });
};


/**
 * Encrypt data using RSA and AES algorithms.
 *
 * param {ArrayBuffer} data - The data to be encrypted.
 * param {ArrayBuffer} rsaPublicKeyBuffer - The RSA public key to encrypt the symmetric AES key.
 * returns {Promise<ArrayBuffer>} A Promise that resolves to the encrypted data.
 */
var rsaEncrypt = function (data, rsaPublicKeyBuffer) {
    var importRsaPublicKey = crypto.subtle.importKey("spki", rsaPublicKeyBuffer, rsaAlgorithm,
        /* extractable: */ false, /* keyUsages: */ ["wrapKey"])
        .catch(function (error) { throw "Error importing public key."; });
    var generateAesKey = crypto.subtle.generateKey(aesAlgorithm,
        /* extractable: */ true, /* keyUsages: */ ["encrypt"])
        .catch(function (error) { throw "Error generating symmetric key."; });

    return Promise.all([importRsaPublicKey, generateAesKey])
        .then(function (keys) {
            var rsaPublicKey = keys[0], aesKey = keys[1];
            var aesIV = crypto.getRandomValues(new Uint8Array(aesIVLength));
            var initializedAesAlgorithm = Object.assign({ iv: aesIV }, aesAlgorithm);

            var wrapAesKey = crypto.subtle.wrapKey("raw", aesKey, rsaPublicKey, rsaAlgorithm)
                .catch(function (error) { throw "Error encrypting symmetric key."; });
            var encryptData = crypto.subtle.encrypt(initializedAesAlgorithm, aesKey, data)
                .catch(function (error) { throw "Error encrypting data."; });

            return Promise.all([wrapAesKey, encryptData])
                .then(function (buffers) {
                    var wrappedAesKey = new Uint8Array(buffers[0]), encryptedData = new Uint8Array(buffers[1]);
                    var encryptionState = new Uint8Array(wrappedAesKey.length + aesIV.length + encryptedData.length);
                    encryptionState.set(wrappedAesKey, 0);
                    encryptionState.set(aesIV, wrappedAesKey.length);
                    encryptionState.set(encryptedData, wrappedAesKey.length + aesIV.length);
                    return encryptionState.buffer;
                });
        });
};


/**
 * Decrypt data using RSA and AES algorithms.
 *
 * param {ArrayBuffer} data - The encrypted data.
 * param {ArrayBuffer} rsaPrivateKeyBuffer - The RSA private key to decrypt the symmetric AES key.
 * returns {Promise<ArrayBuffer>} A Promise that resolves to the decrypted data.
 */
var rsaDecrypt = function (data, rsaPrivateKeyBuffer) {
    return crypto.subtle.importKey("pkcs8", rsaPrivateKeyBuffer, rsaAlgorithm,
        /* extractable: */ false, /* keyUsages: */ ["unwrapKey"])
        .catch(function (error) { throw "Error importing private key."; })
        .then(function (rsaKey) {
            var wrappedAesKeyLength = rsaAlgorithm.modulusLength / 8;
            var wrappedAesKey = new Uint8Array(data.slice(0, wrappedAesKeyLength));
            var aesIV = new Uint8Array(data.slice(wrappedAesKeyLength, wrappedAesKeyLength + aesIVLength));
            var initializedaesAlgorithm = Object.assign({ iv: aesIV }, aesAlgorithm);

            return crypto.subtle.unwrapKey("raw", wrappedAesKey, rsaKey, rsaAlgorithm, initializedaesAlgorithm,
                /* extractable: */ false, /* keyUsages: */ ["decrypt"])
                .catch(function (error) { throw "Error decrypting symmetric key." })
                .then (function (aesKey) {
                    var encryptedData = new Uint8Array(data.slice(wrappedAesKeyLength + aesIVLength));

                    return crypto.subtle.decrypt(initializedaesAlgorithm, aesKey, encryptedData)
                        .catch(function (error) { throw "Error decrypting data." });
                });
        });
};
