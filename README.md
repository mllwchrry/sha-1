# SHA-1

This is a custom implementation of SHA-1 algorithm using JS.

SHA-1 (Secure Hash Algorithm 1) is a hash function which takes an 
input and produces a 160-bit (20-byte) hash value known as a message digest – typically rendered as 40 hexadecimal digits.

One iteration (80 rounds in total) within the SHA-1 compression function:
![image](https://github.com/mllwchrry/sha-1/assets/72436706/9be3b54f-7890-484e-ac29-d29a8005d13d)


<span style="color: #c42b2b;">*Using SHA-1 for cryptographic purposes is not recommended due to known vulnerabilities. SHA-1 is no longer considered secure for applications that require resistance to collision attacks, and it's generally advised to use stronger and more secure hash functions like SHA-256 or SHA-3.*</span>

## Usage

```javascript
console.log(sha1('SHA-1 Test'))
// result: 4a56ca178a1e4c58f5fa9250a38422751eca3a8b
```


## Comparison Test

It checks whether the results of this custom implementation are the same as the js-sha1 ones.

Tests are in the comparison_test.js file:

<img width="571" alt="Screenshot 2023-11-08 at 20 31 10" src="https://github.com/mllwchrry/sha-1/assets/72436706/80cf5c52-392b-437c-9ac6-d6b5b4198263">

## Performance comparison
The results of the time metrics showed that the custom implementation 
is much slower and needs to be optimized. But it is still fast enough 
to perform simple hashes.

Comparisons are in the time-comparison.js file:
<img width="192" alt="Screenshot 2023-11-08 at 20 08 41" src="https://github.com/mllwchrry/sha-1/assets/72436706/65c4bf95-f6c9-4acd-ac38-c760015499a9">


## Project Setup

### Install dependencies
```sh
npm install
```

### Run tests


```sh
npx mocha test.js
```
