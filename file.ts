// This is to test sending a file to the hedera things

import { AccountId, Client, FileAppendTransaction, FileContentsQuery, FileCreateTransaction, FileId, Hbar, PrivateKey } from "@hashgraph/sdk";
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


async function StorefileToGraph() {
  const file: FileCreateTransaction = new FileCreateTransaction()
    .setKeys([keyId.publicKey])
    .setContents("Test content")
    .setMaxTransactionFee(new Hbar(2))
    .freezeWith(client);
  const signedTx = await file.sign(PrivateKey.fromString(pkSting));
  const executed = await signedTx.execute(client);
  const receipt = await executed.getReceipt(client);
  console.log(`new file id is: ${receipt.fileId}`);
  fileID = receipt.fileId;
}


async function AppendToFile() {
  const file: FileAppendTransaction = new FileAppendTransaction()
    .setFileId(fileID)
    .setMaxTransactionFee(new Hbar(2))
    .setContents("Added content")
    .freezeWith(client);
  const receipt = await (await (await file.sign(PrivateKey.fromString(pkSting))).execute(client)).getReceipt(client);
  console.log(`The new receipt is : ${receipt.status}`);
}

async function GetContent() {
  const file: FileContentsQuery = new FileContentsQuery()
    .setFileId(fileID);
  const values = (await file.execute(client)).toString();
  console.log(`The content of the file is : ${values}`);
}

async function main() {
  await StorefileToGraph();

  await GetContent();

  await AppendToFile();

  await GetContent();

}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
})