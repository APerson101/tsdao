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
class BatchDebitData {
    constructor(receiver, timestamp, value, paymentType, description) {
        this.description = description;
        this.paymentType = paymentType;
        this.receiver = receiver;
        this.timestamp = timestamp;
        this.value = value;
    }
    toString() {
        return `receiver: ${this.receiver}, timestamp: ${this.timestamp}, value: ${this.value}, paymentType: ${this.paymentType}, description: ${this.description}`;
    }
}
var contractID = sdk_1.ContractId.fromString('0.0.34392798');
const bytecodeRemix = "608060405234801561001057600080fd5b50610c23806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063015a322014610046578063908b30981461007a578063c53c1c54146100ae575b600080fd5b610060600480360381019061005b919061088e565b6100ca565b604051610071959493929190610976565b60405180910390f35b610094600480360381019061008f919061088e565b6102ce565b6040516100a5959493929190610976565b60405180910390f35b6100c860048036038101906100c39190610791565b610546565b005b6000818051602081018201805184825260208301602085012081835280955050505050506000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600101805461012990610ad9565b80601f016020809104026020016040519081016040528092919081815260200182805461015590610ad9565b80156101a25780601f10610177576101008083540402835291602001916101a2565b820191906000526020600020905b81548152906001019060200180831161018557829003601f168201915b5050505050908060020154908060030180546101bd90610ad9565b80601f01602080910402602001604051908101604052809291908181526020018280546101e990610ad9565b80156102365780601f1061020b57610100808354040283529160200191610236565b820191906000526020600020905b81548152906001019060200180831161021957829003601f168201915b50505050509080600401805461024b90610ad9565b80601f016020809104026020016040519081016040528092919081815260200182805461027790610ad9565b80156102c45780601f10610299576101008083540402835291602001916102c4565b820191906000526020600020905b8154815290600101906020018083116102a757829003601f168201915b5050505050905085565b600060606000606080600080876040516102e8919061095f565b90815260200160405180910390206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201805461036790610ad9565b80601f016020809104026020016040519081016040528092919081815260200182805461039390610ad9565b80156103e05780601f106103b5576101008083540402835291602001916103e0565b820191906000526020600020905b8154815290600101906020018083116103c357829003601f168201915b505050505081526020016002820154815260200160038201805461040390610ad9565b80601f016020809104026020016040519081016040528092919081815260200182805461042f90610ad9565b801561047c5780601f106104515761010080835404028352916020019161047c565b820191906000526020600020905b81548152906001019060200180831161045f57829003601f168201915b5050505050815260200160048201805461049590610ad9565b80601f01602080910402602001604051908101604052809291908181526020018280546104c190610ad9565b801561050e5780601f106104e35761010080835404028352916020019161050e565b820191906000526020600020905b8154815290600101906020018083116104f157829003601f168201915b505050505081525050905080600001518160200151826040015183606001518460800151955095509550955095505091939590929450565b6040518060a001604052808773ffffffffffffffffffffffffffffffffffffffff16815260200186815260200185815260200183815260200182815250600084604051610593919061095f565b908152602001604051809103902060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001019080519060200190610604929190610654565b5060408201518160020155606082015181600301908051906020019061062b929190610654565b506080820151816004019080519060200190610648929190610654565b50905050505050505050565b82805461066090610ad9565b90600052602060002090601f01602090048101928261068257600085556106c9565b82601f1061069b57805160ff19168380011785556106c9565b828001600101855582156106c9579182015b828111156106c85782518255916020019190600101906106ad565b5b5090506106d691906106da565b5090565b5b808211156106f35760008160009055506001016106db565b5090565b600061070a61070584610a03565b6109de565b90508281526020810184848401111561072657610725610b9f565b5b610731848285610a97565b509392505050565b60008135905061074881610bbf565b92915050565b600082601f83011261076357610762610b9a565b5b81356107738482602086016106f7565b91505092915050565b60008135905061078b81610bd6565b92915050565b60008060008060008060c087890312156107ae576107ad610ba9565b5b60006107bc89828a01610739565b965050602087013567ffffffffffffffff8111156107dd576107dc610ba4565b5b6107e989828a0161074e565b95505060406107fa89828a0161077c565b945050606087013567ffffffffffffffff81111561081b5761081a610ba4565b5b61082789828a0161074e565b935050608087013567ffffffffffffffff81111561084857610847610ba4565b5b61085489828a0161074e565b92505060a087013567ffffffffffffffff81111561087557610874610ba4565b5b61088189828a0161074e565b9150509295509295509295565b6000602082840312156108a4576108a3610ba9565b5b600082013567ffffffffffffffff8111156108c2576108c1610ba4565b5b6108ce8482850161074e565b91505092915050565b6108e081610a5b565b82525050565b60006108f182610a34565b6108fb8185610a3f565b935061090b818560208601610aa6565b61091481610bae565b840191505092915050565b600061092a82610a34565b6109348185610a50565b9350610944818560208601610aa6565b80840191505092915050565b61095981610a8d565b82525050565b600061096b828461091f565b915081905092915050565b600060a08201905061098b60008301886108d7565b818103602083015261099d81876108e6565b90506109ac6040830186610950565b81810360608301526109be81856108e6565b905081810360808301526109d281846108e6565b90509695505050505050565b60006109e86109f9565b90506109f48282610b0b565b919050565b6000604051905090565b600067ffffffffffffffff821115610a1e57610a1d610b6b565b5b610a2782610bae565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000610a6682610a6d565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015610ac4578082015181840152602081019050610aa9565b83811115610ad3576000848401525b50505050565b60006002820490506001821680610af157607f821691505b60208210811415610b0557610b04610b3c565b5b50919050565b610b1482610bae565b810181811067ffffffffffffffff82111715610b3357610b32610b6b565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b610bc881610a5b565b8114610bd357600080fd5b50565b610bdf81610a8d565b8114610bea57600080fd5b5056fea26469706673582212209a177fdd8bf52ac72a5f80d855d97af4d1816b2a10c191c97336c9c9a5f4e9ec64736f6c63430008070033";
const myAccountIdString = process.env.MY_ACCOUNT_ID;
const myPrivateKeyString = process.env.MY_PRIVATE_KEY;
const my_AccountID = sdk_1.AccountId.fromString(myAccountIdString);
const client = sdk_1.Client.forTestnet();
client.setOperator(myAccountIdString, myPrivateKeyString);
var allTxns = new Array(1);
var batchTransferId = "";
function carryOutArrayOfTransactions(sender, receivers) {
    return __awaiter(this, void 0, void 0, function* () {
        var txn = new sdk_1.TransferTransaction();
        for (let index = 0; index < receivers.length; index++) {
            const receiver = receivers[index];
            allTxns[index] = new BatchDebitData(receiver.toSolidityAddress(), "timeStamptrial", 1, "debit", "console trial");
            txn.addHbarTransfer(sender, new sdk_1.Hbar(-1));
            txn.addHbarTransfer(receiver, new sdk_1.Hbar(1));
        }
        var txnResponse = yield txn.execute(client);
        const receipt = yield txnResponse.getReceipt(client);
        const txnStatus = receipt.status;
        batchTransferId = txnResponse.transactionId.toString();
        console.log(`Batch transfer status: ${txnStatus} with id: ${batchTransferId}`);
    });
}
function sendBatchDataToContract(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`sending this to be stored: ${data.toString()}`);
        const txn = new sdk_1.ContractExecuteTransaction()
            .setContractId(contractID)
            .setGas(500000)
            .setMaxTransactionFee(new sdk_1.Hbar(100))
            .setFunction("AddDebitTransaction", new sdk_1.ContractFunctionParameters()
            .addAddress(`0x${data.receiver}`)
            .addString(data.timestamp)
            .addUint256(data.value)
            .addString(batchTransferId)
            .addString(data.paymentType)
            .addString(data.description));
        const response = yield txn.execute(client);
        const receipt = yield response.getReceipt(client);
        console.log(`Adding debit record status: ${receipt.status}`);
    });
}
function QueryDebitRecord(recordId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = new sdk_1.ContractCallQuery()
            .setContractId(contractID)
            .setGas(100000)
            .setQueryPayment(new sdk_1.Hbar(3))
            .setFunction("getDebitTxnInfo", new sdk_1.ContractFunctionParameters().addString(recordId));
        const res = yield query.execute(client);
        const returnedVal = new BatchDebitData(res.getAddress(0), res.getString(1), Number(res.getUint256(2)), res.getString(3), res.getString(4));
        console.log(`result of querying debit record with id: ${recordId} is : \n ${returnedVal.toString()}`);
    });
}
function deployContract() {
    return __awaiter(this, void 0, void 0, function* () {
        const contractCreate = new sdk_1.ContractCreateFlow()
            .setGas(100000)
            .setBytecode(bytecodeRemix);
        const txResponse = yield contractCreate.execute(client);
        const receipt = yield txResponse.getReceipt(client);
        const newContractId = receipt.contractId;
        console.log(`New contract id is: ${newContractId}`);
        contractID = newContractId;
    });
}
function createNewAcc() {
    return __awaiter(this, void 0, void 0, function* () {
        var priKeys = new Array(3);
        var pubkeys = new Array(3);
        for (let index = 0; index < 3; index++) {
            const pk = sdk_1.PrivateKey.generate();
            priKeys[index] = pk;
            pubkeys[index] = pk.publicKey;
            console.log(`private key: ${pk.toStringRaw()}, public key : ${pk.publicKey.toStringRaw()}`);
        }
        var thresholdkey = new sdk_1.KeyList(pubkeys, 2);
        const newprivateKey = yield sdk_1.PrivateKey.generateECDSAAsync();
        // const newpublicKey = newprivateKey.publicKey;
        const newAccount = yield new sdk_1.AccountCreateTransaction()
            .setKey(thresholdkey)
            .setInitialBalance(new sdk_1.Hbar(2))
            .execute(client);
        const getReceipt = yield newAccount.getReceipt(client);
        const newAccountId = getReceipt.accountId;
        console.log(`New private key: ${newprivateKey.toStringRaw()} Account id: ${newAccountId.toString()}`);
    });
}
const keyString = process.env.NEW_ACCOUNT_ID_1;
const pkSting = process.env.MY_PRIVATE_KEY_1;
const keyId = sdk_1.AccountId.fromString(keyString);
var fileID;
function StorefileToGraph() {
    return __awaiter(this, void 0, void 0, function* () {
        const file = new sdk_1.FileCreateTransaction()
            .setKeys([keyId.aliasKey])
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // await StorefileToGraph();
        yield createNewAcc();
        // await deployContract();
        // var allIds: AccountId[] = new Array(1);
        // const acc1 = process.env.NEW_ACCOUNT_ID_1;
        // const acc2 = process.env.NEW_ACCOUNT_ID_2;
        // const acc3 = process.env.NEW_ACCOUNT_ID_3;
        // const acc4 = process.env.NEW_ACCOUNT_ID_4;
        // const acc5 = process.env.NEW_ACCOUNT_ID_5;
        // const acc6 = process.env.NEW_ACCOUNT_ID_6;
        // const acc7 = process.env.NEW_ACCOUNT_ID_7;
        // const acc8 = process.env.NEW_ACCOUNT_ID_8;
        // const acc9 = process.env.NEW_ACCOUNT_ID_9;
        // const acc10 = process.env.NEW_ACCOUNT_ID_10;
        // allIds[0] = AccountId.fromString(acc1);
        // allIds[1] = AccountId.fromString(acc2);
        // allIds[2] = AccountId.fromString(acc3);
        // allIds[3] = AccountId.fromString(acc4);
        // allIds[4] = AccountId.fromString(acc5);
        // allIds[5] = AccountId.fromString(acc6);
        // allIds[6] = AccountId.fromString(acc7);
        // allIds[7] = AccountId.fromString(acc8);
        // allIds[8] = AccountId.fromString(acc9);
        // allIds[9] = AccountId.fromString(acc10);
        // await carryOutArrayOfTransactions(my_AccountID, allIds);
        // for (let index = 0; index < allTxns.length; index++) {
        //   const debitTxn = allTxns[index];
        //   await sendBatchDataToContract(debitTxn);
        // }
        // await QueryDebitRecord(batchTransferId);
    });
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
//# sourceMappingURL=test.js.map