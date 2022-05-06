"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("@hashgraph/sdk");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const myAccountIdString = process.env.MY_ACCOUNT_ID;
const myPrivateKeyString = process.env.MY_PRIVATE_KEY;
const my_AccountID = sdk_1.AccountId.fromString(myAccountIdString);
const my_pk = sdk_1.PrivateKey.fromString(myPrivateKeyString);
const newAccountIdString = process.env.NEW_ACCOUNT_ID_1;
const new_AccountID = sdk_1.AccountId.fromString(newAccountIdString);
const new_privateKey_string = process.env.MY_PRIVATE_KEY_1;
const new_acc_pk = sdk_1.PrivateKey.fromString(new_privateKey_string);
// const client = Client.forTestnet();
// client.setOperator(new_AccountID, new_acc_pk);
const client = sdk_1.Client.forTestnet();
client.setOperator(my_AccountID, my_pk);
function tokenCreation() {
    return __awaiter(this, void 0, void 0, function* () {
        const tkn = yield new sdk_1.TokenCreateTransaction()
            .setTokenName("BABAYEGA")
            .setTokenSymbol("BYG")
            .setTokenType(sdk_1.TokenType.FungibleCommon)
            .setDecimals(2)
            .setInitialSupply(10000)
            .setTreasuryAccountId(new_AccountID)
            .setSupplyType(sdk_1.TokenSupplyType.Infinite)
            .setSupplyKey(new_acc_pk.publicKey)
            .freezeWith(client)
            .sign(new_acc_pk);
        const tkn1 = yield tkn.execute(client);
        console.log(`new token created with id: ${(yield tkn1.getReceipt(client)).tokenId} `);
    });
}
/// Otherwise acc wont be able to send or receive token
function AssociateAccWithtoken() {
    return __awaiter(this, void 0, void 0, function* () {
        //associate multisig accs with token
        (yield new sdk_1.TokenAssociateTransaction()
            .setAccountId(acc1)
            .freezeWith(client)
            .sign(acc1_pk)).execute(client);
        (yield new sdk_1.TokenAssociateTransaction()
            .setAccountId(acc2)
            .freezeWith(client)
            .sign(acc2_pk)).execute(client);
    });
}
var acc1;
var acc1_pk = sdk_1.PrivateKey.fromString("dbd0ba225e2145178e92e5216e0840bd994897331871f0e05b28ca93fd7249d2");
var acc2_pk = sdk_1.PrivateKey.fromString("a4a0857be50b1a5b0661a791a20ea92feb33692b03e6cc17438904beb4e81027");
var acc2;
function createAcc() {
    return __awaiter(this, void 0, void 0, function* () {
        const tt = new sdk_1.AccountCreateTransaction()
            .setKey(sdk_1.PublicKey.fromString("08e9fa3af1711d813d9f4f034cb748b5759c8fc1c102e450165a05d20294f2a2"))
            .setInitialBalance(new sdk_1.Hbar(10))
            .execute(client);
        acc2 = (yield (yield tt).getReceipt(client)).accountId;
        console.log(`${acc2}`);
        const ttt = new sdk_1.AccountCreateTransaction()
            .setKey(sdk_1.PublicKey.fromString("be5880b3af24bd8e621157381c24d7b10b3126d4a1953feaac85f39e0f7bb1b4"))
            .setInitialBalance(new sdk_1.Hbar(10))
            .execute(client);
        acc1 = (yield (yield ttt).getReceipt(client)).accountId;
        console.log(`${acc1}`);
    });
}
function TransferTokenFromTreasury() {
    return __awaiter(this, void 0, void 0, function* () {
        // treasury is  multisig though
    });
}
//# sourceMappingURL=fungibletoken.js.map