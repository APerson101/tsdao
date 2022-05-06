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
const abi_1 = require("@ethersproject/abi");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
dotenv.config();
var receivers = [];
var timestamps = [];
var values = [];
var paymentTypes = [];
var descriptions = [];
var transactionID;
let abiInterface;
const my_AccountID = sdk_1.AccountId.fromString(process.env.MY_ACCOUNT_ID);
const my_pk = sdk_1.PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const sender_acc_id = sdk_1.AccountId.fromString(process.env.TEST_2);
const sender_private_key = sdk_1.PrivateKey.fromString(process.env.privateKeytest);
const receiver_acc_id = sdk_1.AccountId.fromString(process.env.NEW_ACCOUNT_ID_7);
const receiver_private_key = sdk_1.PrivateKey.fromString(process.env.MY_PRIVATE_KEY_7);
const client = sdk_1.Client.forTestnet();
client.setOperator(my_AccountID, my_pk);
// const client2 = Client.forTestnet();
// client2.setOperator(sender_acc_id, sender_private_key);
var contractID = sdk_1.ContractId.fromString('0.0.34406142');
function deployContract() {
    return __awaiter(this, void 0, void 0, function* () {
        // send info- retrieve info -updateInfo
        const bytecode = process.env.bytecode;
        contractID = (yield (yield new sdk_1.ContractCreateFlow()
            .setBytecode(bytecode)
            .setGas(300000)
            .execute(client)).getReceipt(client)).contractId;
        console.log(`Newly deployed contract is: ${contractID}`);
    });
}
function createTransaction() {
    return __awaiter(this, void 0, void 0, function* () {
        const txn = yield new sdk_1.TransferTransaction()
            .setMaxTransactionFee(new sdk_1.Hbar(20))
            .addHbarTransfer(sender_acc_id, new sdk_1.Hbar(-0.05))
            .addHbarTransfer(receiver_acc_id, new sdk_1.Hbar(0.05))
            .freezeWith(client)
            .sign(sender_private_key);
        const exectuedTxn = (yield txn.execute(client));
        transactionID = exectuedTxn.transactionId;
        const receipt = yield exectuedTxn.getReceipt(client);
        console.log(`Transfer status is : ${(receipt).status}`);
        receivers.push(`${receiver_acc_id.toSolidityAddress()}`);
        values.push(0.05);
        paymentTypes.push("Individual");
        descriptions.push("Transaction of type: 1 receiver");
        timestamps.push(transactionID.validStart.toDate().toUTCString());
        timestamps.push("hello dear");
        timestamps.push("It's me");
    });
}
function sendInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const functioncall = new sdk_1.ContractExecuteTransaction()
            .setContractId(contractID)
            .setGas(500000)
            .setFunction('addDebitTransaction', new sdk_1.ContractFunctionParameters()
            .addAddressArray(receivers)
            .addStringArray(timestamps)
            .addUint256Array(values)
            .addStringArray(paymentTypes)
            .addStringArray(descriptions)
            .addString(transactionID.toString()));
        console.log(`sending in the following: ${receivers[0]},${timestamps[0]}, ${values[0]}, ${paymentTypes[0]}, ${descriptions[0]}, ${transactionID.toString()} `);
        console.log(`function call is: ${(yield (yield functioncall.execute(client)).getReceipt(client)).status}`);
    });
}
/**
 * what are you doing
 */
function retriveInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../contracts/contractabi.json'), 'utf-8'));
        abiInterface = new abi_1.Interface(abi);
        const query = new sdk_1.ContractExecuteTransaction()
            .setContractId(contractID)
            // .setQueryPayment(new Hbar(3))
            .setGas(200000)
            .setFunction('getDebit', new sdk_1.ContractFunctionParameters()
            .addString(transactionID.toString()));
        console.log("Finding info for", transactionID.toString());
        const st = yield query.execute(client);
        const tt = yield st.getRecord(client);
        let results = abiInterface.decodeFunctionResult('getDebit', tt.contractFunctionResult.bytes);
        console.log(results);
    });
}
function retriveInfoBool() {
    return __awaiter(this, void 0, void 0, function* () {
        const solidity = receiver_acc_id.toSolidityAddress();
        const query = new sdk_1.ContractCallQuery()
            .setContractId(contractID)
            .setQueryPayment(new sdk_1.Hbar(3))
            .setGas(200000)
            .setFunction('getDebit', new sdk_1.ContractFunctionParameters()
            .addAddress(`0x${solidity}`));
        const st = yield query.execute(client);
        console.log(st.getBool());
    });
}
function retriveInfoExecution() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = new sdk_1.ContractExecuteTransaction()
            .setContractId(contractID)
            .setGas(200000)
            .setFunction('getDebit', new sdk_1.ContractFunctionParameters()
            .addString(`${receiver_acc_id.toSolidityAddress()}`));
        const st = yield query.execute(client);
        console.log((yield st.getRecord(client)).contractFunctionResult.getBool());
    });
}
function UpdateInfo() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function deleteInfo() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield deployContract();
        yield createTransaction();
        yield sendInfo();
        // await retriveInfoExecution();
        // await UpdateInfo();
        yield retriveInfo();
        // await deleteInfo();
    });
}
main().catch((error) => {
    console.log(error);
    process.exit(1);
});
class BatchDebitData {
    constructor(receiver, timestamp, value, paymentType, description) {
        this.descriptions = description;
        this.paymentTypes = paymentType;
        this.receiver = receiver;
        this.timestamp = timestamp;
        this.value = value;
    }
    toString() {
        return `receiver: ${this.receiver}, timestamp: ${this.timestamp}, value: ${this.value}, paymentType: ${this.paymentTypes}, description: ${this.descriptions}`;
    }
}
//# sourceMappingURL=integration_test.js.map