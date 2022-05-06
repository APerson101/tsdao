"use strict";
// This is to test sending a file to the hedera things
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
const client = sdk_1.Client.forTestnet();
client.setOperator(myAccountIdString, myPrivateKeyString);
const keyString = process.env.NEW_ACCOUNT_ID_1;
const pkSting = process.env.MY_PRIVATE_KEY_1;
const keyId = sdk_1.PrivateKey.fromString(pkSting);
var fileID;
function StorefileToGraph() {
    return __awaiter(this, void 0, void 0, function* () {
        const file = new sdk_1.FileCreateTransaction()
            .setKeys([keyId.publicKey])
            .setContents("Test content")
            .setMaxTransactionFee(new sdk_1.Hbar(2))
            .freezeWith(client);
        const signedTx = yield file.sign(sdk_1.PrivateKey.fromString(pkSting));
        const executed = yield signedTx.execute(client);
        const receipt = yield executed.getReceipt(client);
        console.log(`new file id is: ${receipt.fileId}`);
        fileID = receipt.fileId;
    });
}
function AppendToFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const file = new sdk_1.FileAppendTransaction()
            .setFileId(fileID)
            .setMaxTransactionFee(new sdk_1.Hbar(2))
            .setContents("Added content")
            .freezeWith(client);
        const receipt = yield (yield (yield file.sign(sdk_1.PrivateKey.fromString(pkSting))).execute(client)).getReceipt(client);
        console.log(`The new receipt is : ${receipt.status}`);
    });
}
function GetContent() {
    return __awaiter(this, void 0, void 0, function* () {
        const file = new sdk_1.FileContentsQuery()
            .setFileId(fileID);
        const values = (yield file.execute(client)).toString();
        console.log(`The content of the file is : ${values}`);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield StorefileToGraph();
        yield GetContent();
        yield AppendToFile();
        yield GetContent();
    });
}
main().catch((erro) => {
    console.error(erro);
    process.exit(1);
});
//# sourceMappingURL=file.js.map