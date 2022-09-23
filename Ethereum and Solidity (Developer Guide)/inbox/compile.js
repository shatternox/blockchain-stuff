const path = require('path');
const fs = require('fs');
const solc = require('solc');

// __dirname itu return current working directory path
// JANGAN PAKE require('./contracts/Inbox.sol') KARENA AKAN DIEKSEKUSI OLEH NODE SEBAGAI JS PADAHAL BUKAN JS
// Ambil path contractnya
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

// Ambil isi dari file contractnya, dengan encoding utf8
const source = fs.readFileSync(inboxPath, 'utf8')

// Yang angka itu, jumlah contract yg mau dicompile, ya cuma 1
// node compile.js
// console.log(solc.compile(source, 1)); >> INI PENTING BUAT ISINYA, KITA AMBIL BAGIAN .contracts[':Inbox'] AJA KARENA ITU YG PENTING
// interface: >> Itu ABI nya
module.exports = solc.compile(source, 1).contracts[":Inbox"];












