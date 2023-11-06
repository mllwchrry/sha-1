function sha1_rounds(block) {
    let w = [];
    let a = 0x67452301;
    let b = 0xEFCDAB89;
    let c = 0x98BADCFE;
    let d = 0x10325476;
    let e = 0xC3D2E1F0;

    let prev_a, prev_b, prev_c, prev_d, prev_e;

    for (let i = 0; i < block.length; i += 16) {
        [prev_a, prev_b, prev_c, prev_d, prev_e] = [a, b, c, d, e];

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

            e = d;
            d = c;
            c = circularLeftShift(b, 30);
            b = a;
            a = sum;
        }

        a = add(a, prev_a);
        b = add(b, prev_b);
        c = add(c, prev_c);
        d = add(d, prev_d);
        e = add(e, prev_e);
    }

    return [a, b, c, d, e];

}


function circularLeftShift(n, k) {
    return (n << k) | (n >>> (32 - k));
}

function add(x, y) {
    let l = (x & 0xFFFF) + (y & 0xFFFF),
        h = (x >> 16) + (y >> 16) + (l >> 16);
    return (h << 16) | (l & 0xFFFF);
}

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

function kFromT(t) {
    return t <= 19 ? 0x5A827999 : t <= 39 ? 0x6ED9EBA1 : t <= 59 ? 0x8F1BBCDC : 0xCA62C1D6;
}

function pad() {

}
// 00111111010011110101111101101111
// 3f4f5f6f