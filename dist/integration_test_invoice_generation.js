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
let abiInterface;
class Invoice {
    constructor(sender, description, category, amount, status) {
        this.amount = amount;
        this.category = category;
        this.description = description;
        this.sender = sender;
        this.status = status;
    }
    toMap() {
        return {
            sender: this.sender,
            description: this.description,
            category: this.category,
            amount: this.amount,
            status: this.status
        };
    }
    toMessage() {
        return `new_invoice_${this.sender}_${this.amount}_${this.description}_${this.category}`;
    }
}
// var topicid: TopicId = TopicId.fromString('0.0.34538294');
function createTopic(clientel) {
    return __awaiter(this, void 0, void 0, function* () {
        // create Topic
        var topicid = (yield (yield new sdk_1.TopicCreateTransaction().execute(clientel)).getReceipt(clientel)).topicId;
        console.log(`${topicid} `);
        return topicid;
    });
}
// subscribe to Topic
function subscribeToTopic(topic, clientel, creatorId, invoiceMap, invoiceId, invoiceContract) {
    return __awaiter(this, void 0, void 0, function* () {
        new sdk_1.TopicMessageQuery()
            .setTopicId(topic)
            .subscribe(clientel, null, (message) => {
            const messageString = Buffer.from(message.contents).toString();
            console.log(` time received ${message.consensusTimestamp.toDate()}, message received is: ${messageString} `);
            ResolveMessage(messageString, creatorId, invoiceMap, invoiceId, invoiceContract, clientel);
        });
    });
}
// send topic message
function sendMessageToTopic(receiverTopicId, senderClient, messagecreated) {
    return __awaiter(this, void 0, void 0, function* () {
        const topicmsgg = yield new sdk_1.TopicMessageSubmitTransaction({
            topicId: receiverTopicId, message: messagecreated
        })
            .execute(senderClient);
        console.log(`status of message is: ${(yield topicmsgg.getReceipt(senderClient)).status} `);
    });
}
// How to receive notifications in a decentralized manner:
/**
 * Option 1: Store
 */
function ResolveMessage(message, creatorId, invoiceMap, invoiceId, invoiceContract, client) {
    return __awaiter(this, void 0, void 0, function* () {
        if (message.startsWith('new_invoice_', 0)) {
            // new invoice sent to us
            console.log(`you have a new invoice: ${message} `);
            // you can therefore accept, reject or pay
            //simulate accept
            yield addnewInvoice(creatorId, invoiceMap, invoiceId, invoiceContract, client);
        }
        else if (message.startsWith('your_created_invoice_status_', 0)) {
            // there is an update regarding an invoice you created
            console.log(`the status is: ${message} `);
        }
    });
}
function NFTReceipt() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function deployInvoiceContract(clientel) {
    return __awaiter(this, void 0, void 0, function* () {
        // create Invoice
        const contractByteCode = process.env.invoicebytecode;
        var invoiceContract = (yield (yield new sdk_1.ContractCreateFlow()
            .setBytecode(contractByteCode)
            .setGas(100000)
            .execute(clientel)).getReceipt(clientel)).contractId;
        console.log(` new invoice contract is: ${invoiceContract} `);
        return invoiceContract;
    });
}
// create invoice knowing the person's invoice contract ID, notify user of newly created invoice, trigger refresh.
// or
// create a new topic for every new invoice
function createInvoice(sender, receivertopicId, invoice) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sendMessageToTopic(receivertopicId, sender, invoice.toMessage());
    });
}
function addnewInvoice(creatorId, invoiceMap, invoiceId, invoiceContract, executingclient) {
    return __awaiter(this, void 0, void 0, function* () {
        //create new Invoice
        // const invoice: Invoice = new Invoice(creatorId.toSolidityAddress(), "Testing invoice", "bonus", 20, false);
        // const invoice2 = {
        //   sender: creatorId.toSolidityAddress(),
        //   description: "Testing invoice",
        //   category: "bonus",
        //   amount: 20,
        //   status: false
        // };
        // const invoice3 = [my_AccountID.toSolidityAddress(), "Testing invoice", "bonus", 20, false];
        // const testInvoiceId = "4421"
        // converted struct
        const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../contracts/invoiceabi.json'), 'utf-8'));
        abiInterface = new abi_1.Interface(abi);
        const encoededFunctionParameters = Buffer.from(abiInterface.encodeFunctionData('addInvoice', [invoiceMap, invoiceId]).slice(2), 'hex');
        new sdk_1.ContractExecuteTransaction()
            .setContractId(invoiceContract)
            .setGas(400000)
            .setFunction('addInvoice')
            .setFunctionParameters(encoededFunctionParameters)
            .execute(executingclient).then((result) => __awaiter(this, void 0, void 0, function* () {
            console.log(`invoice adding status is: ${(yield result.getRecord(executingclient)).contractFunctionResult.getBool()} `);
        }));
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const my_AccountID = sdk_1.AccountId.fromString(process.env.MY_ACCOUNT_ID);
        const my_pk = sdk_1.PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
        const client = sdk_1.Client.forTestnet();
        client.setOperator(my_AccountID, my_pk);
        const new_acc_id = sdk_1.AccountId.fromString(process.env.TEST_2);
        const new_private = sdk_1.PrivateKey.fromString(process.env.privateKeytest);
        const client2 = sdk_1.Client.forTestnet();
        client2.setOperator(new_acc_id, new_private);
        //create topic for first user
        // var topicUser1 = await createTopic(client);
        var topicUser1 = sdk_1.TopicId.fromString('0.0.34705317');
        // wait for 5 seconds
        yield new Promise((resolve) => setTimeout(resolve, 5000));
        // create topic for second user
        // var topicUser2 = await createTopic(client2);
        var topicUser2 = sdk_1.TopicId.fromString('0.0.34705318');
        // wait for 5 seconds
        yield new Promise((resolve) => setTimeout(resolve, 5000));
        // deploy invoice contract for first person
        // var contractid1 = await deployInvoiceContract(client);
        var contractid1 = sdk_1.ContractId.fromString('0.0.34705320');
        // deploy invoice contract for second person
        // var contractId2 = await deployInvoiceContract(client2);
        var contractId2 = sdk_1.ContractId.fromString('0.0.34705322');
        const mockInvoice = new Invoice(new_acc_id.toSolidityAddress(), "TESTING THINGS", "chocolate", 40, false);
        const mockInvoice2 = new Invoice(my_AccountID.toSolidityAddress(), "TESTING THINGS_AS_E_DEY_BE", "chocolate", 40, false);
        //Subscribe first person to first topic
        yield subscribeToTopic(topicUser1, client, my_AccountID, mockInvoice.toMap(), "mock invoice_id", contractid1);
        //Subscribe second person to second topic
        yield subscribeToTopic(topicUser2, client2, new_acc_id, mockInvoice2.toMap(), "mock_2", contractId2);
        //send invoice from user 2 to one, user accepts it and it adds to contract
        yield createInvoice(client2, topicUser1, mockInvoice);
    });
}
main().catch((error) => {
    console.log(error);
    process.exit(1);
});
//# sourceMappingURL=integration_test_invoice_generation.js.map