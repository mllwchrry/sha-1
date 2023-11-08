const assert = require('chai').assert;

const sha1_js = require('js-sha1');
const sha1_custom = require('./sha-1');

describe('SHA-1 Comparison', function () {
    it('should produce the same hash as js-sha1 for a given string', function () {
        const input = 'Testing custom SHA-1!';
        const customHash = sha1_custom(input);
        const jsSha1Hash = sha1_js(input);

        assert.equal(customHash, jsSha1Hash, 'Hashes do not match');
    });

    it('should handle an empty string', function () {
        const input = '';
        const customHash = sha1_custom(input);
        const jsSha1Hash = sha1_js(input);

        assert.equal(customHash, jsSha1Hash, 'Hashes do not match');
    });

    it('should handle a large string', function () {
        const input = 'a4b'.repeat(100000); // Create a string with 100,000 'a' characters
        const customHash = sha1_custom(input);
        const jsSha1Hash = sha1_js(input);

        assert.equal(customHash, jsSha1Hash, 'Hashes do not match');
    });
});