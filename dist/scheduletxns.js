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
// private key: a4a0857be50b1a5b0661a791a20ea92feb33692b03e6cc17438904beb4e81027, public key: 08e9fa3af1711d813d9f4f034cb748b5759c8fc1c102e450165a05d20294f2a2
// private key: dbd0ba225e2145178e92e5216e0840bd994897331871f0e05b28ca93fd7249d2, public key: be5880b3af24bd8e621157381c24d7b10b3126d4a1953feaac85f39e0f7bb1b4
// private key: 674944bd13d755d2044ba7773f907aff3cc2c5ddb32f46da5185f5a085d11535, public key: 68bd7ab000a3318abc17881cacd87ca8fc6c559ca966a3f348826ee265c6bdc4
// New private key: 04df7112d8489876972e74db912aaf5bfe6904b75ee70bc6ef2b5e5b921790b6 Account id: 0.0.34399606
var scheduleId = sdk_1.ScheduleId.fromString('0.0.34399660');
const my_pk2 = sdk_1.PrivateKey.fromString("a4a0857be50b1a5b0661a791a20ea92feb33692b03e6cc17438904beb4e81027");
const my_pk3 = sdk_1.PrivateKey.fromString("dbd0ba225e2145178e92e5216e0840bd994897331871f0e05b28ca93fd7249d2");
function createScheduledTxn() {
    return __awaiter(this, void 0, void 0, function* () {
        const txn = new sdk_1.TransferTransaction()
            .addHbarTransfer(new_AccountID, new sdk_1.Hbar(-1))
            .addHbarTransfer(my_AccountID, new sdk_1.Hbar(1))
            .setNodeAccountIds([new sdk_1.AccountId(3)]);
        const scheduled = new sdk_1.ScheduleCreateTransaction()
            .setScheduledTransaction(txn);
        scheduleId = (yield (yield scheduled.execute(client)).getReceipt(client)).scheduleId;
        console.log(`new scheduled txn created with id: ${scheduleId}`);
    });
}
function signSchedultedTxn() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const signed = new sdk_1.ScheduleSignTransaction().setScheduleId(scheduleId)
                .freezeWith(client)
                .sign(my_pk3);
            console.log(`Signed a scheduled txn with status: ${(yield (yield (yield signed).execute(client)).getReceipt(client)).status}`);
        }
        catch (error) {
            console.log("OMO THIS IS THE ERORR OHH!!");
            console.log(error);
        }
    });
}
function deleteScheduledTxn() {
    return __awaiter(this, void 0, void 0, function* () {
        const tobedeleted = new sdk_1.ScheduleDeleteTransaction()
            .setScheduleId(scheduleId)
            .freezeWith(client)
            .sign(my_pk);
        console.log(`Scheduled Txn to be deleted id: ${(yield (yield (yield tobedeleted).execute(client)).getReceipt(client)).status}`);
    });
}
function queryScheduleDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const t = new sdk_1.ScheduleInfoQuery()
            .setScheduleId(scheduleId);
        const info = yield t.execute(client);
        console.log(`Signers are: ${info.signers}`);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // await createScheduledTxn();
        // await queryScheduleDetails();
        yield signSchedultedTxn();
        // await createScheduledTxn();
        // await deleteScheduledTxn();
    });
}
main().catch((error) => {
    console.log(error);
    process.exit(1);
});
//# sourceMappingURL=scheduletxns.js.map