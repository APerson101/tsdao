import { AccountId, Client, ContractCallQuery, ContractCreateFlow, ContractExecuteTransaction, ContractFunctionParameters, ContractId, PrivateKey, TopicCreateTransaction, TopicId, TopicMessageQuery, TopicMessageSubmitTransaction, TransactionResponse } from "@hashgraph/sdk";
import * as dotenv from "dotenv";
import { Interface } from "@ethersproject/abi";
import * as fs from "fs";
import * as path from "path";
dotenv.config();
let abiInterface: Interface;

class Invoice {
  toMap(): {} {
    return {
      sender: this.sender,
      description: this.description,
      category: this.category,
      amount: this.amount,
      status: this.status
    }

  }
  toMessage(): string {
    return `new_invoice_${this.sender}_${this.amount}_${this.description}_${this.category}`;
  }
  sender: string;
  description: string;
  category: string;
  amount: number;
  status: boolean;

  constructor(sender: string, description: string, category: string, amount: number, status: boolean) {
    this.amount = amount;
    this.category = category;
    this.description = description;
    this.sender = sender;
    this.status = status;
  }
}




// var topicid: TopicId = TopicId.fromString('0.0.34538294');
async function createTopic(clientel: Client): Promise<TopicId> {
  // create Topic
  var topicid = (await (await new TopicCreateTransaction().execute(clientel)).getReceipt(clientel)).topicId;
  console.log(`${topicid} `);
  return topicid;
}

// subscribe to Topic
async function subscribeToTopic(topic: TopicId, clientel: Client, creatorId: AccountId, invoiceMap: {}, invoiceId: string, invoiceContract: ContractId) {

  new TopicMessageQuery()
    .setTopicId(topic)
    .subscribe(clientel, null, (message) => {
      const messageString = Buffer.from(message.contents).toString();
      console.log(` time received ${message.consensusTimestamp.toDate()}, message received is: ${messageString} `);
      ResolveMessage(messageString, creatorId, invoiceMap, invoiceId, invoiceContract, clientel);
    });
}

// send topic message
async function sendMessageToTopic(receiverTopicId: TopicId, senderClient: Client, messagecreated: string) {
  const topicmsgg: TransactionResponse = await new TopicMessageSubmitTransaction
    (
      {
        topicId: receiverTopicId, message: messagecreated
      })
    .execute(senderClient);
  console.log(`status of message is: ${(await topicmsgg.getReceipt(senderClient)).status} `)
}


// How to receive notifications in a decentralized manner:
/**
 * Option 1: Store 
 */

async function ResolveMessage(message: string, creatorId: AccountId, invoiceMap: {}, invoiceId: string, invoiceContract: ContractId, client: Client) {
  if (message.startsWith('new_invoice_', 0)) {
    // new invoice sent to us
    console.log(`you have a new invoice: ${message} `);
    // you can therefore accept, reject or pay

    //simulate accept
    await addnewInvoice(creatorId, invoiceMap, invoiceId, invoiceContract, client);
  }

  else if (message.startsWith('your_created_invoice_status_', 0)) {
    // there is an update regarding an invoice you created
    console.log(`the status is: ${message} `);

  }
}


async function NFTReceipt() {

}

async function deployInvoiceContract(clientel: Client): Promise<ContractId> {
  // create Invoice
  const contractByteCode = process.env.invoicebytecode;
  var invoiceContract = (await (await new ContractCreateFlow()
    .setBytecode(contractByteCode)
    .setGas(100_000)
    .execute(clientel)).getReceipt(clientel)).contractId;
  console.log(` new invoice contract is: ${invoiceContract} `);
  return invoiceContract;
}

// create invoice knowing the person's invoice contract ID, notify user of newly created invoice, trigger refresh.

// or

// create a new topic for every new invoice

async function createInvoice(sender: Client, receivertopicId: TopicId, invoice: Invoice) {

  await sendMessageToTopic(receivertopicId, sender, invoice.toMessage());
}

async function addnewInvoice(creatorId: AccountId, invoiceMap: {}, invoiceId: string, invoiceContract: ContractId, executingclient: Client) {
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
  abiInterface = new Interface(abi);
  const encoededFunctionParameters = Buffer.from(
    abiInterface.encodeFunctionData('addInvoice', [invoiceMap, invoiceId]).slice(2), 'hex');
  new ContractExecuteTransaction()
    .setContractId(invoiceContract)
    .setGas(400_000)
    .setFunction('addInvoice')
    .setFunctionParameters(
      encoededFunctionParameters)
    .execute(executingclient).then(async (result) => {
      console.log(`invoice adding status is: ${(await result.getRecord(executingclient)).contractFunctionResult.getBool()} `);
    })
}

async function main() {
  const my_AccountID = AccountId.fromString(process.env.MY_ACCOUNT_ID);
  const my_pk = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
  const client = Client.forTestnet();
  client.setOperator(my_AccountID, my_pk);

  const new_acc_id = AccountId.fromString(process.env.TEST_2);
  const new_private = PrivateKey.fromString(process.env.privateKeytest);
  const client2 = Client.forTestnet();
  client2.setOperator(new_acc_id, new_private);

  //create topic for first user
  // var topicUser1 = await createTopic(client);
  var topicUser1 = TopicId.fromString('0.0.34705317');
  // wait for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // create topic for second user
  // var topicUser2 = await createTopic(client2);
  var topicUser2 = TopicId.fromString('0.0.34705318');


  // wait for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // deploy invoice contract for first person
  // var contractid1 = await deployInvoiceContract(client);
  var contractid1 = ContractId.fromString('0.0.34705320')


  // deploy invoice contract for second person
  // var contractId2 = await deployInvoiceContract(client2);
  var contractId2 = ContractId.fromString('0.0.34705322');


  const mockInvoice = new Invoice(new_acc_id.toSolidityAddress(), "TESTING THINGS", "chocolate", 40, false);
  const mockInvoice2 = new Invoice(my_AccountID.toSolidityAddress(), "TESTING THINGS_AS_E_DEY_BE", "chocolate", 40, false);

  //Subscribe first person to first topic
  await subscribeToTopic(topicUser1, client, my_AccountID, mockInvoice.toMap(), "mock invoice_id", contractid1);

  //Subscribe second person to second topic
  await subscribeToTopic(topicUser2, client2, new_acc_id, mockInvoice2.toMap(), "mock_2", contractId2);


  //send invoice from user 2 to one, user accepts it and it adds to contract
  await createInvoice(client2, topicUser1, mockInvoice);

}

main().catch((error) => {
  console.log(error);
  process.exit(1);
})

