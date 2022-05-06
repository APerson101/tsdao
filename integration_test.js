"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var sdk_1 = require("@hashgraph/sdk");
var dotenv = require("dotenv");
var hethers_1 = require("@hashgraph/hethers");
dotenv.config();
var receivers = [];
var timestamps = [];
var values = [];
var paymentTypes = [];
var descriptions = [];
var transactionID;
var my_AccountID = sdk_1.AccountId.fromString(process.env.MY_ACCOUNT_ID);
var my_pk = sdk_1.PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
var sender_acc_id = sdk_1.AccountId.fromString(process.env.TEST_2);
var sender_private_key = sdk_1.PrivateKey.fromString(process.env.privateKeytest);
var receiver_acc_id = sdk_1.AccountId.fromString(process.env.NEW_ACCOUNT_ID_7);
var receiver_private_key = sdk_1.PrivateKey.fromString(process.env.MY_PRIVATE_KEY_7);
var client = sdk_1.Client.forTestnet();
client.setOperator(my_AccountID, my_pk);
// const client2 = Client.forTestnet();
// client2.setOperator(sender_acc_id, sender_private_key);
var contractID = sdk_1.ContractId.fromString('0.0.34406142');
function deployContract() {
    return __awaiter(this, void 0, void 0, function () {
        var bytecode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bytecode = process.env.bytecode;
                    return [4 /*yield*/, new sdk_1.ContractCreateFlow()
                            .setBytecode(bytecode)
                            .setGas(300000)
                            .execute(client)];
                case 1: return [4 /*yield*/, (_a.sent()).getReceipt(client)];
                case 2:
                    contractID = (_a.sent()).contractId;
                    console.log("Newly deployed contract is: ".concat(contractID));
                    return [2 /*return*/];
            }
        });
    });
}
function createTransaction() {
    return __awaiter(this, void 0, void 0, function () {
        var txn, exectuedTxn, receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new sdk_1.TransferTransaction()
                        .setMaxTransactionFee(new sdk_1.Hbar(20))
                        .addHbarTransfer(sender_acc_id, new sdk_1.Hbar(-0.05))
                        .addHbarTransfer(receiver_acc_id, new sdk_1.Hbar(0.05))
                        .freezeWith(client)
                        .sign(sender_private_key)];
                case 1:
                    txn = _a.sent();
                    return [4 /*yield*/, txn.execute(client)];
                case 2:
                    exectuedTxn = (_a.sent());
                    transactionID = exectuedTxn.transactionId;
                    return [4 /*yield*/, exectuedTxn.getReceipt(client)];
                case 3:
                    receipt = _a.sent();
                    console.log("Transfer status is : ".concat((receipt).status));
                    receivers.push("".concat(receiver_acc_id.toSolidityAddress()));
                    values.push(0.05);
                    paymentTypes.push("Individual");
                    descriptions.push("Transaction of type: 1 receiver");
                    timestamps.push(transactionID.validStart.toDate().toUTCString());
                    timestamps.push("hello dear");
                    timestamps.push("It's me");
                    return [2 /*return*/];
            }
        });
    });
}
function sendInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var functioncall, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    functioncall = new sdk_1.ContractExecuteTransaction()
                        .setContractId(contractID)
                        .setGas(500000)
                        .setFunction('addDebitTransaction', new sdk_1.ContractFunctionParameters()
                        .addAddressArray(receivers)
                        .addStringArray(timestamps)
                        .addUint256(values[0])
                        .addString(paymentTypes[0])
                        .addString(descriptions[0])
                        .addString(transactionID.toString()));
                    console.log("sending in the following: ".concat(receivers[0], ",").concat(timestamps[0], ", ").concat(values[0], ", ").concat(paymentTypes[0], ", ").concat(descriptions[0], ", ").concat(transactionID.toString(), " "));
                    _b = (_a = console).log;
                    _c = "function call is: ".concat;
                    return [4 /*yield*/, functioncall.execute(client)];
                case 1: return [4 /*yield*/, (_d.sent()).getReceipt(client)];
                case 2:
                    _b.apply(_a, [_c.apply("function call is: ", [(_d.sent()).status])]);
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * /what are you doing
 */
function retriveInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var query, st, tt, arrayresult, vs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = new sdk_1.ContractExecuteTransaction()
                        .setContractId(contractID)
                        // .setQueryPayment(new Hbar(3))
                        .setGas(200000)
                        .setFunction('getDebit', new sdk_1.ContractFunctionParameters()
                        .addString(transactionID.toString()));
                    console.log("Finding info for", transactionID.toString());
                    return [4 /*yield*/, query.execute(client)];
                case 1:
                    st = _a.sent();
                    return [4 /*yield*/, st.getRecord(client)];
                case 2:
                    tt = _a.sent();
                    // console.log(st.getAddress(0));
                    // console.log(st.getString(1));
                    // console.log(st.getUint256(2));
                    // console.log(st.getString(3));
                    // console.log(st.getString(4));
                    console.log(tt.contractFunctionResult.getAddress());
                    arrayresult = tt.contractFunctionResult.getString(1);
                    vs = hethers_1.hethers.utils.formatBytes32String(arrayresult[0]);
                    console.log(vs);
                    return [2 /*return*/];
            }
        });
    });
}
function retriveInfoBool() {
    return __awaiter(this, void 0, void 0, function () {
        var solidity, query, st;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    solidity = receiver_acc_id.toSolidityAddress();
                    query = new sdk_1.ContractCallQuery()
                        .setContractId(contractID)
                        .setQueryPayment(new sdk_1.Hbar(3))
                        .setGas(200000)
                        .setFunction('getDebit', new sdk_1.ContractFunctionParameters()
                        .addAddress("0x".concat(solidity)));
                    return [4 /*yield*/, query.execute(client)];
                case 1:
                    st = _a.sent();
                    console.log(st.getBool());
                    return [2 /*return*/];
            }
        });
    });
}
function retriveInfoExecution() {
    return __awaiter(this, void 0, void 0, function () {
        var query, st, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    query = new sdk_1.ContractExecuteTransaction()
                        .setContractId(contractID)
                        .setGas(200000)
                        .setFunction('getDebit', new sdk_1.ContractFunctionParameters()
                        .addString("".concat(receiver_acc_id.toSolidityAddress())));
                    return [4 /*yield*/, query.execute(client)];
                case 1:
                    st = _c.sent();
                    _b = (_a = console).log;
                    return [4 /*yield*/, st.getRecord(client)];
                case 2:
                    _b.apply(_a, [(_c.sent()).contractFunctionResult.getBool()]);
                    return [2 /*return*/];
            }
        });
    });
}
function UpdateInfo() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
function deleteInfo() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deployContract()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, createTransaction()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, sendInfo()];
                case 3:
                    _a.sent();
                    // await retriveInfoExecution();
                    // await UpdateInfo();
                    return [4 /*yield*/, retriveInfo()];
                case 4:
                    // await retriveInfoExecution();
                    // await UpdateInfo();
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (error) {
    console.log(error);
    process.exit(1);
});
var BatchDebitData = /** @class */ (function () {
    function BatchDebitData(receiver, timestamp, value, paymentType, description) {
        this.descriptions = description;
        this.paymentTypes = paymentType;
        this.receiver = receiver;
        this.timestamp = timestamp;
        this.value = value;
    }
    BatchDebitData.prototype.toString = function () {
        return "receiver: ".concat(this.receiver, ", timestamp: ").concat(this.timestamp, ", value: ").concat(this.value, ", paymentType: ").concat(this.paymentTypes, ", description: ").concat(this.descriptions);
    };
    return BatchDebitData;
}());
