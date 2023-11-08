const sha1_js = require('js-sha1');
const sha1_custom = require('./sha-1');


console.log(`Test 1: one char`)

console.time('CustomSHA1');
sha1_custom('a');
console.timeEnd('CustomSHA1');

console.time('jsSHA1');
sha1_js('a');
console.timeEnd('jsSHA1');

console.log('----------------')

console.log(`Test 2: one word`)

console.time('CustomSHA1');
sha1_custom('test');
console.timeEnd('CustomSHA1');

console.time('jsSHA1');
sha1_js('test');
console.timeEnd('jsSHA1');

console.log('----------------')

console.log(`Test 3: short sentence`)

console.time('CustomSHA1');
sha1_custom('Hello World!');
console.timeEnd('CustomSHA1');

console.time('jsSHA1');
sha1_js('Hello World!');
console.timeEnd('jsSHA1');

console.log('----------------')

console.log(`Test 4: long sentence`)

console.time('CustomSHA1');
sha1_custom('In cryptography, SHA-1 (Secure Hash Algorithm 1) is a hash function which takes an input and produces a 160-bit (20-byte) hash value known as a message digest – typically rendered as 40 hexadecimal digits.');
console.timeEnd('CustomSHA1');

console.time('jsSHA1');
sha1_js('In cryptography, SHA-1 (Secure Hash Algorithm 1) is a hash function which takes an input and produces a 160-bit (20-byte) hash value known as a message digest – typically rendered as 40 hexadecimal digits.');
console.timeEnd('jsSHA1');

console.log('----------------')

console.log(`Test 5: 40000 chars`)

console.time('CustomSHA1');
sha1_custom(''.padStart(10000, '4a5b'));
console.timeEnd('CustomSHA1');

console.time('jsSHA1');
sha1_js(''.padStart(10000, '4a5b'));
console.timeEnd('jsSHA1');