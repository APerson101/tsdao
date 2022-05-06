"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("@hashgraph/sdk");
const monet_1 = require("monet");
function verifyKey(enteredText) {
    // PublicKey.fromString(enteredText);
    return monet_1.Either.fromTry(() => sdk_1.PublicKey.fromString(enteredText));
}
class InvalidKey extends Error {
    constructor() {
        super("Invalid Key Entered");
    }
}
verifyKey('dfsdfer').cata(() => { console.log("Wrong key enterted"); }, (pk) => console.log('correct key entered'));
//# sourceMappingURL=unittest.js.map