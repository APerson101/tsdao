import { AccountId, Client, Hbar, KeyList, PrivateKey, ScheduleCreateTransaction, ScheduleDeleteTransaction, ScheduleId, ScheduleInfoQuery, ScheduleSignTransaction, TransferTransaction } from "@hashgraph/sdk";
import * as dotenv from "dotenv";
dotenv.config();
const myAccountIdString = process.env.MY_ACCOUNT_ID;
const myPrivateKeyString = process.env.MY_PRIVATE_KEY;
const my_AccountID = AccountId.fromString(myAccountIdString);
const my_pk = PrivateKey.fromString(myPrivateKeyString);
const newAccountIdString = process.env.NEW_ACCOUNT_ID_1;
const new_AccountID = AccountId.fromString(newAccountIdString);
const new_privateKey_string = process.env.MY_PRIVATE_KEY_1;
const new_acc_pk = PrivateKey.fromString(new_privateKey_string);

// const client = Client.forTestnet();
// client.setOperator(new_AccountID, new_acc_pk);

const client = Client.forTestnet();
client.setOperator(my_AccountID, my_pk);



// private key: a4a0857be50b1a5b0661a791a20ea92feb33692b03e6cc17438904beb4e81027, public key: 08e9fa3af1711d813d9f4f034cb748b5759c8fc1c102e450165a05d20294f2a2
// private key: dbd0ba225e2145178e92e5216e0840bd994897331871f0e05b28ca93fd7249d2, public key: be5880b3af24bd8e621157381c24d7b10b3126d4a1953feaac85f39e0f7bb1b4
// private key: 674944bd13d755d2044ba7773f907aff3cc2c5ddb32f46da5185f5a085d11535, public key: 68bd7ab000a3318abc17881cacd87ca8fc6c559ca966a3f348826ee265c6bdc4
// New private key: 04df7112d8489876972e74db912aaf5bfe6904b75ee70bc6ef2b5e5b921790b6 Account id: 0.0.34399606

var scheduleId: ScheduleId = ScheduleId.fromString('0.0.34399660');
const my_pk2 = PrivateKey.fromString("a4a0857be50b1a5b0661a791a20ea92feb33692b03e6cc17438904beb4e81027");
const my_pk3 = PrivateKey.fromString("dbd0ba225e2145178e92e5216e0840bd994897331871f0e05b28ca93fd7249d2");




async function createScheduledTxn() {
  const txn: TransferTransaction = new TransferTransaction()
    .addHbarTransfer(new_AccountID, new Hbar(-1))
    .addHbarTransfer(my_AccountID, new Hbar(1))
    .setNodeAccountIds([new AccountId(3)]);
  const scheduled = new ScheduleCreateTransaction()
    .setScheduledTransaction(txn);
  scheduleId = (await (await scheduled.execute(client)).getReceipt(client)).scheduleId;
  console.log(`new scheduled txn created with id: ${scheduleId}`);
}

async function signSchedultedTxn() {
  try {
    const signed = new ScheduleSignTransaction().setScheduleId(scheduleId)
      .freezeWith(client)
      .sign(my_pk3);

    console.log(`Signed a scheduled txn with status: ${(await (await (await signed).execute(client)).getReceipt(client)).status}`);
  } catch (error) {
    console.log("OMO THIS IS THE ERORR OHH!!");
    console.log(error)
  }

}

async function deleteScheduledTxn() {
  const tobedeleted = new ScheduleDeleteTransaction()
    .setScheduleId(scheduleId)
    .freezeWith(client)
    .sign(my_pk);
  console.log(`Scheduled Txn to be deleted id: ${(await (await (await tobedeleted).execute(client)).getReceipt(client)).status}`);
}

async function queryScheduleDetails() {
  const t = new ScheduleInfoQuery()
    .setScheduleId(scheduleId);
  const info = await t.execute(client);
  console.log(`Signers are: ${info.signers}`);

}

async function main() {
  // await createScheduledTxn();
  // await queryScheduleDetails();
  await signSchedultedTxn();

  // await createScheduledTxn();

  // await deleteScheduledTxn();
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
})