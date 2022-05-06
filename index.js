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
var dotenv = require("dotenv");
dotenv.config();
var sdk_1 = require("@hashgraph/sdk");
var contractID;
var bytecodeRemix = "60806040523480156200001157600080fd5b50604051620009ec380380620009ec8339818101604052810190620000379190620002e7565b81600090805190602001906200004f9291906200005f565b50806001819055505050620003b2565b8280546200006d906200037c565b90600052602060002090601f016020900481019282620000915760008555620000dd565b82601f10620000ac57805160ff1916838001178555620000dd565b82800160010185558215620000dd579182015b82811115620000dc578251825591602001919060010190620000bf565b5b509050620000ec9190620000f0565b5090565b5b808211156200010b576000816000905550600101620000f1565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b62000178826200012d565b810181811067ffffffffffffffff821117156200019a57620001996200013e565b5b80604052505050565b6000620001af6200010f565b9050620001bd82826200016d565b919050565b600067ffffffffffffffff821115620001e057620001df6200013e565b5b620001eb826200012d565b9050602081019050919050565b60005b8381101562000218578082015181840152602081019050620001fb565b8381111562000228576000848401525b50505050565b6000620002456200023f84620001c2565b620001a3565b90508281526020810184848401111562000264576200026362000128565b5b62000271848285620001f8565b509392505050565b600082601f83011262000291576200029062000123565b5b8151620002a38482602086016200022e565b91505092915050565b6000819050919050565b620002c181620002ac565b8114620002cd57600080fd5b50565b600081519050620002e181620002b6565b92915050565b6000806040838503121562000301576200030062000119565b5b600083015167ffffffffffffffff8111156200032257620003216200011e565b5b620003308582860162000279565b92505060206200034385828601620002d0565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200039557607f821691505b60208210811415620003ac57620003ab6200034d565b5b50919050565b61062a80620003c26000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806317d7de7c1461005c5780635353a2d81461007a578063967e6e6514610096578063c605f76c146100b4578063e46db354146100d2575b600080fd5b6100646100dc565b6040516100719190610326565b60405180910390f35b610094600480360381019061008f9190610491565b61016e565b005b61009e610188565b6040516100ab91906104f3565b60405180910390f35b6100bc610192565b6040516100c99190610326565b60405180910390f35b6100da6101cf565b005b6060600080546100eb9061053d565b80601f01602080910402602001604051908101604052809291908181526020018280546101179061053d565b80156101645780601f1061013957610100808354040283529160200191610164565b820191906000526020600020905b81548152906001019060200180831161014757829003601f168201915b5050505050905090565b80600090805190602001906101849291906101ea565b5050565b6000600154905090565b60606040518060400160405280600b81526020017f48656c6c6f20576f726c64000000000000000000000000000000000000000000815250905090565b60018060008282546101e1919061059e565b92505081905550565b8280546101f69061053d565b90600052602060002090601f016020900481019282610218576000855561025f565b82601f1061023157805160ff191683800117855561025f565b8280016001018555821561025f579182015b8281111561025e578251825591602001919060010190610243565b5b50905061026c9190610270565b5090565b5b80821115610289576000816000905550600101610271565b5090565b600081519050919050565b600082825260208201905092915050565b60005b838110156102c75780820151818401526020810190506102ac565b838111156102d6576000848401525b50505050565b6000601f19601f8301169050919050565b60006102f88261028d565b6103028185610298565b93506103128185602086016102a9565b61031b816102dc565b840191505092915050565b6000602082019050818103600083015261034081846102ed565b905092915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61039e826102dc565b810181811067ffffffffffffffff821117156103bd576103bc610366565b5b80604052505050565b60006103d0610348565b90506103dc8282610395565b919050565b600067ffffffffffffffff8211156103fc576103fb610366565b5b610405826102dc565b9050602081019050919050565b82818337600083830152505050565b600061043461042f846103e1565b6103c6565b9050828152602081018484840111156104505761044f610361565b5b61045b848285610412565b509392505050565b600082601f8301126104785761047761035c565b5b8135610488848260208601610421565b91505092915050565b6000602082840312156104a7576104a6610352565b5b600082013567ffffffffffffffff8111156104c5576104c4610357565b5b6104d184828501610463565b91505092915050565b6000819050919050565b6104ed816104da565b82525050565b600060208201905061050860008301846104e4565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061055557607f821691505b602082108114156105695761056861050e565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006105a9826104da565b91506105b4836104da565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156105e9576105e861056f565b5b82820190509291505056fea264697066735822122035cbda18e15d0abd36cce9bfeb8f12744ad3cc3eaf7d6cc4585098bf05ce6d4c64736f6c63430008090033";
var ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "helloWorld",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "changedName",
                "type": "string"
            }
        ],
        "name": "modifyState",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
var myAccountIdString = process.env.MY_ACCOUNT_ID;
var myPrivateKeyString = process.env.MY_PRIVATE_KEY;
var my_AccountID = sdk_1.AccountId.fromString(myAccountIdString);
var client = sdk_1.Client.forTestnet();
client.setOperator(myAccountIdString, myPrivateKeyString);
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createPlebContract(client)];
                case 1:
                    _a.sent();
                    // await thirdOptionDeploy(client);
                    return [4 /*yield*/, callContractFunction(contractID, client)];
                case 2:
                    // await thirdOptionDeploy(client);
                    _a.sent();
                    return [4 /*yield*/, readFromContract(contractID, client)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, getFunctionAgain(contractID, client)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function increaseTxnFee() {
    return __awaiter(this, void 0, void 0, function () {
        var acc, tt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    acc = new sdk_1.AccountUpdateTransaction()
                        .setAccountId(my_AccountID)
                        .setMaxTransactionFee(new sdk_1.Hbar(1000));
                    return [4 /*yield*/, acc.execute(client)];
                case 1:
                    tt = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()["catch"](function (error) {
    console.error(error);
    process.exitCode = 1;
});
function thirdOptionDeploy(client) {
    return __awaiter(this, void 0, void 0, function () {
        var ftx, fileId, item, contractId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ftx = new sdk_1.FileCreateTransaction()
                        .setContents(bytecodeRemix);
                    return [4 /*yield*/, ftx.execute(client)];
                case 1: return [4 /*yield*/, (_a.sent()).getReceipt(client)];
                case 2:
                    fileId = (_a.sent()).fileId;
                    console.log("smart contract bytecode is: " + fileId);
                    item = new sdk_1.ContractCreateTransaction()
                        .setBytecodeFileId(fileId)
                        .setGas(3000000)
                        .setConstructorParameters(new sdk_1.ContractFunctionParameters().addString("Sup"));
                    return [4 /*yield*/, item.execute(client)];
                case 3: return [4 /*yield*/, (_a.sent()).getReceipt(client)];
                case 4:
                    contractId = (_a.sent()).contractId;
                    console.log("Contract id is: " + contractId);
                    contractID = contractId;
                    return [2 /*return*/];
            }
        });
    });
}
function createPlebContract(client) {
    return __awaiter(this, void 0, void 0, function () {
        var contractCreate, txResponse, receipt, newContractId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contractCreate = new sdk_1.ContractCreateFlow()
                        .setGas(100000)
                        .setBytecode(bytecodeRemix)
                        .setConstructorParameters(new sdk_1.ContractFunctionParameters()
                        .addString("where are you")
                        .addUint256(7));
                    return [4 /*yield*/, contractCreate.execute(client)];
                case 1:
                    txResponse = _a.sent();
                    return [4 /*yield*/, txResponse.getReceipt(client)];
                case 2:
                    receipt = _a.sent();
                    newContractId = receipt.contractId;
                    console.log("New contract id is: " + newContractId);
                    contractID = newContractId;
                    return [2 /*return*/];
            }
        });
    });
}
function callContractFunction(contractID, client) {
    return __awaiter(this, void 0, void 0, function () {
        var txn, response, receipt, query, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    txn = new sdk_1.ContractExecuteTransaction()
                        .setContractId(contractID)
                        .setGas(100000)
                        .setMaxTransactionFee(new sdk_1.Hbar(100))
                        .setFunction("changeName", new sdk_1.ContractFunctionParameters()
                        .addString("Bin Laden"));
                    return [4 /*yield*/, txn.execute(client)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.getReceipt(client)];
                case 2:
                    receipt = _a.sent();
                    console.log("Change name returns: " + receipt.status);
                    query = new sdk_1.ContractCallQuery()
                        .setContractId(contractID)
                        .setGas(100000)
                        .setQueryPayment(new sdk_1.Hbar(3))
                        .setFunction("getName");
                    return [4 /*yield*/, query.execute(client)];
                case 3:
                    res = _a.sent();
                    // const txnn = new ContractExecuteTransaction()
                    //   .setContractId(contractID)
                    //   .setGas(100_000)
                    //   .setMaxTransactionFee(new Hbar(100))
                    //   .setFunction("getName")
                    // const responser = await txnn.execute(client);
                    // const receiptr = (await responser.getRecord(client)).contractFunctionResult.getString();
                    console.log("New name is now: " + res.getString() + " ");
                    return [2 /*return*/];
            }
        });
    });
}
function readFromContract(contractID, client) {
    return __awaiter(this, void 0, void 0, function () {
        var query, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, increaseTxnFee()];
                case 1:
                    _a.sent();
                    query = new sdk_1.ContractCallQuery()
                        .setContractId(contractID)
                        .setGas(100000)
                        .setQueryPayment(new sdk_1.Hbar(3))
                        .setFunction("helloWorld");
                    return [4 /*yield*/, query.execute(client)];
                case 2:
                    res = _a.sent();
                    console.log("Hello World returns: " + res.getString() + " ");
                    return [2 /*return*/];
            }
        });
    });
}
function getFunctionAgain(contractID, client) {
    return __awaiter(this, void 0, void 0, function () {
        var quaryr, resser, _a, _b, _c, query, res, _d, _e, _f, quary, resse, _g, _h, _j, queryy, ree;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    quaryr = new sdk_1.ContractExecuteTransaction()
                        .setContractId(contractID)
                        .setGas(100000)
                        .setMaxTransactionFee(new sdk_1.Hbar(25))
                        .setFunction("getAge");
                    return [4 /*yield*/, quaryr.execute(client)];
                case 1:
                    resser = _k.sent();
                    _b = (_a = console).log;
                    _c = "Age before increase is: ";
                    return [4 /*yield*/, resser.getRecord(client)];
                case 2:
                    _b.apply(_a, [_c + (_k.sent()).contractFunctionResult.getUint256() + " "]);
                    query = new sdk_1.ContractExecuteTransaction()
                        .setContractId(contractID)
                        .setGas(100000)
                        .setMaxTransactionFee(new sdk_1.Hbar(25))
                        .setFunction("appendAge");
                    return [4 /*yield*/, query.execute(client)];
                case 3:
                    res = _k.sent();
                    _e = (_d = console).log;
                    _f = "Append Age is now: ";
                    return [4 /*yield*/, res.getReceipt(client)];
                case 4:
                    _e.apply(_d, [_f + (_k.sent()).status + " "]);
                    quary = new sdk_1.ContractExecuteTransaction()
                        .setContractId(contractID)
                        .setGas(100000)
                        .setMaxTransactionFee(new sdk_1.Hbar(25))
                        .setFunction("getAge");
                    return [4 /*yield*/, quary.execute(client)];
                case 5:
                    resse = _k.sent();
                    _h = (_g = console).log;
                    _j = "New Age is now: ";
                    return [4 /*yield*/, resse.getRecord(client)];
                case 6:
                    _h.apply(_g, [_j + (_k.sent()).contractFunctionResult.getUint256() + " "]);
                    queryy = new sdk_1.ContractCallQuery()
                        .setContractId(contractID)
                        .setGas(100000)
                        .setFunction("getAge");
                    return [4 /*yield*/, queryy.execute(client)];
                case 7:
                    ree = _k.sent();
                    console.log("New age second method returns: " + (ree.getUint256()) + " ");
                    return [2 /*return*/];
            }
        });
    });
}
