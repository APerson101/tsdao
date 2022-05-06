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
const client = sdk_1.Client.forTestnet();
client.setOperator(myAccountIdString, myPrivateKeyString);
const keyString = process.env.NEW_ACCOUNT_ID_1;
const pkSting = process.env.MY_PRIVATE_KEY_1;
const keyId = sdk_1.PrivateKey.fromString(pkSting);
var fileID;
var topicID;
// must renew every quarter
function createTopic() {
    return __awaiter(this, void 0, void 0, function* () {
        const topicTxn = new sdk_1.TopicCreateTransaction();
        const executed = yield topicTxn.execute(client);
        topicID = (yield executed.getReceipt(client)).topicId;
        console.log(`Newly created topic id is: ${topicID}`);
    });
}
function getMessge() {
    return __awaiter(this, void 0, void 0, function* () {
        new sdk_1.TopicMessageQuery({ topicId: topicID }).setStartTime(0).subscribe(client, (msg, error) => {
            console.log("ERROR WHILE TRYING TO RETRIEVE MESSAGE");
        }, (message) => {
            var dd = Buffer.from(message.contents).toString();
            console.log(`message gotten from topic is : ${dd}`);
        });
    });
}
function addMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const topicmsgg = yield new sdk_1.TopicMessageSubmitTransaction({
            topicId: topicID, message: "Hello World"
        })
            .execute(client);
        console.log(`status of message is: ${(yield topicmsgg.getReceipt(client)).status}`);
    });
}
function deleteTopic() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Topic deletion is : ${(yield (yield new sdk_1.TopicDeleteTransaction({ topicId: topicID }).execute(client)).getReceipt(client)).status} `);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createTopic();
        yield addMessage();
        yield addMessage();
        yield getMessge();
        yield deleteTopic();
        yield getMessge();
    });
}
main().catch((error) => {
    console.log(error);
    process.exit(1);
});
//# sourceMappingURL=consensus.js.map