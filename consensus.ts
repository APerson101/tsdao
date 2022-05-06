import { AccountId, Client, FileAppendTransaction, FileContentsQuery, FileCreateTransaction, FileId, Hbar, PrivateKey, TopicCreateTransaction, TopicDeleteTransaction, TopicId, TopicMessageQuery, TopicMessageSubmitTransaction, TopicUpdateTransaction, TransactionResponse } from "@hashgraph/sdk";
import * as dotenv from "dotenv";
dotenv.config();
const myAccountIdString = process.env.MY_ACCOUNT_ID;
const myPrivateKeyString = process.env.MY_PRIVATE_KEY;
const my_AccountID = AccountId.fromString(myAccountIdString);
const client = Client.forTestnet();
client.setOperator(myAccountIdString, myPrivateKeyString);
const keyString = process.env.NEW_ACCOUNT_ID_1;
const pkSting = process.env.MY_PRIVATE_KEY_1;
const keyId = PrivateKey.fromString(pkSting);
var fileID: FileId;
var topicID: TopicId;

// must renew every quarter
async function createTopic() {
  const topicTxn: TopicCreateTransaction = new TopicCreateTransaction();
  const executed = await topicTxn.execute(client);
  topicID = (await executed.getReceipt(client)).topicId;
  console.log(`Newly created topic id is: ${topicID}`);
}
async function getMessge() {
  new TopicMessageQuery({ topicId: topicID }).setStartTime(0).subscribe(client, (msg, error) => {
    console.log("ERROR WHILE TRYING TO RETRIEVE MESSAGE");
  }, (message) => {
    var dd = Buffer.from(message.contents).toString();
    console.log(`message gotten from topic is : ${dd}`);
  });
}

async function addMessage() {
  const topicmsgg: TransactionResponse = await new TopicMessageSubmitTransaction
    (
      {
        topicId: topicID, message: "Hello World"
      })
    .execute(client);
  console.log(`status of message is: ${(await topicmsgg.getReceipt(client)).status}`)
}

async function deleteTopic() {
  console.log(`Topic deletion is : ${(await (await new TopicDeleteTransaction({ topicId: topicID }).execute(client)).getReceipt(client)).status} `);
}
async function main() {
  await createTopic();
  await addMessage();
  await addMessage();
  await getMessge();
  await deleteTopic();
  await getMessge();
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
})