// The main sha-1 function
module.exports = function sha1(message) {
    return blocksToHex(sha1_rounds(pad(message)));
}

// This function takes a message and pads it to meet SHA-1 block size requirements
// It returns an array of 32-bit blocks representing the padded message
function pad(message) {
    // length of the input message in chars
    const len = message.length;

    // number of blocks required for padding
    const blockAmount = Math.ceil((len + 8) / 64);

    // initialize an array to store 32-bit blocks, with each block containing 16 words
    const blocks = new Array(blockAmount * 16).fill(0);

    for (let i = 0; i < len; i++) {
        // calculate the index of the block and word where the character should be stored
        const blockIndex = Math.floor(i / 4);
        const wordIndex = (i % 4) * 8;

        // set the bits in the block to the character's ASCII code
        blocks[blockIndex] |= message.charCodeAt(i) << (24 - wordIndex);
    }

    // append 1 bit
    blocks[Math.floor(len / 4)] |= 0x80 << (24 - (len % 4) * 8); // Add the 0x80 bit to the end of the message

    // append the length of the original message
    blocks[blockAmount * 16 - 1] = len * 8; // Append the message length in bits to the last block

    return blocks;
}

// This function converts an array of 32-bit blocks into a hexadecimal string
function blocksToHex(blocks) {
    let hex = '';
    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        if (block < 0)
            block = 0xFFFFFFFF + block + 1;

        hex += block.toString(16);
    }
    if (hex.length !== 40)
        hex = hex.padStart(40, "0")

    return hex;
}

/**
 * Perform the SHA-1 hashing rounds on a block of data.
 *
 * @param {Array} block - An array of 32-bit words representing the data block.
 * @returns {Array} An array of five 32-bit words representing the SHA-1 hash.
 */
function sha1_rounds(block) {

    // initialize variables with initial hash values
    let w = [];
    let a = 0x67452301;
    let b = 0xEFCDAB89;
    let c = 0x98BADCFE;
    let d = 0x10325476;
    let e = 0xC3D2E1F0;

    // variables to store the previous values of a, b, c, d, and e for the current block
    let prev_a, prev_b, prev_c, prev_d, prev_e;

    // process the input block in chunks of 512 bits (16 32-bit words)
    for (let i = 0; i < block.length; i += 16) {

        // store the previous values of a, b, c, d, and e for this chunk
        [prev_a, prev_b, prev_c, prev_d, prev_e] = [a, b, c, d, e];

        // perform 80 rounds of computation for each chunk
        for (let t = 0; t < 80; t++) {
            w[t] = t < 16 ? block[i + t] :
                circularLeftShift(w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16], 1);

            let sum = add(
                add(
                    circularLeftShift(a, 5), fFromT(t, b, c, d)
                ),
                add(
                    add(e, w[t]), kFromT(t)
                )
            );

            // update variables for the next round
            e = d;
            d = c;
            c = circularLeftShift(b, 30);
            b = a;
            a = sum;
        }

        // update the values with the values from the previous block
        a = add(a, prev_a);
        b = add(b, prev_b);
        c = add(c, prev_c);
        d = add(d, prev_d);
        e = add(e, prev_e);
    }

    return [a, b, c, d, e];

}

// This function performs a circular left shift operation on a 32-bit number
function circularLeftShift(n, k) {
    return (n << k) | (n >>> (32 - k));
}

// This function adds two 32-bit numbers with overflow handling
function add(x, y) {
    let l = (x & 0xFFFF) + (y & 0xFFFF),
        h = (x >> 16) + (y >> 16) + (l >> 16);
    return (h << 16) | (l & 0xFFFF);
}

// This function calculates the 'f' value for a specific round 't' and other block variables
function fFromT(t, b, c, d) {
    let f;
    if (t >= 0 && t <= 19)
        f = (b & c) | ((~b) & d);
    else if (t >= 20 && t <= 39)
        f = b ^ c ^ d;
    else if (t >= 40 && t <= 59)
        f = (b & c) | (b & d) | (c & d);
    else if (t >= 60 && t <= 79)
        f = b ^ c ^ d;

    return f;
}

// This function calculates the 'k' value for a specific round 't'
function kFromT(t) {
    return t <= 19 ? 0x5A827999 : t <= 39 ? 0x6ED9EBA1 : t <= 59 ? 0x8F1BBCDC : 0xCA62C1D6;
}
