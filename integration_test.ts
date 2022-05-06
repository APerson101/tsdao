import {
  AccountId,
  Client,
  ContractCallQuery,
  ContractCreateFlow,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  ContractId,
  Hbar,
  PrivateKey,
  TransactionId,
  TransferTransaction
}
  from "@hashgraph/sdk";
import * as dotenv from "dotenv";

import { Interface } from "@ethersproject/abi";
import * as fs from "fs";
import * as path from "path";
dotenv.config()
var receivers: string[] = [];
var timestamps: string[] = [];
var values: number[] = [];
var paymentTypes: string[] = [];
var descriptions: string[] = [];
var transactionID: TransactionId;
let abiInterface: Interface;
const my_AccountID = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const my_pk = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

const sender_acc_id = AccountId.fromString(process.env.TEST_2);
const sender_private_key = PrivateKey.fromString(process.env.privateKeytest);

const receiver_acc_id = AccountId.fromString(process.env.NEW_ACCOUNT_ID_7);
const receiver_private_key = PrivateKey.fromString(process.env.MY_PRIVATE_KEY_7);

const client = Client.forTestnet();
client.setOperator(my_AccountID, my_pk);

// const client2 = Client.forTestnet();
// client2.setOperator(sender_acc_id, sender_private_key);

var contractID: ContractId = ContractId.fromString('0.0.34406142');
async function deployContract() {
  // send info- retrieve info -updateInfo
  const bytecode = process.env.bytecode;

  contractID = (await (await new ContractCreateFlow()
    .setBytecode(bytecode)
    .setGas(300_000)
    .execute(client)).getReceipt(client)).contractId;

  console.log(`Newly deployed contract is: ${contractID}`);

}
async function createTransaction() {
  const txn = await new TransferTransaction()
    .setMaxTransactionFee(new Hbar(20))
    .addHbarTransfer(sender_acc_id, new Hbar(-0.05))
    .addHbarTransfer(receiver_acc_id, new Hbar(0.05))
    .freezeWith(client)
    .sign(sender_private_key);
  const exectuedTxn = (await txn.execute(client));
  transactionID = exectuedTxn.transactionId;
  const receipt = await exectuedTxn.getReceipt(client);
  console.log(`Transfer status is : ${(receipt).status}`);
  receivers.push(`${receiver_acc_id.toSolidityAddress()}`);
  values.push(0.05);
  paymentTypes.push("Individual");
  descriptions.push("Transaction of type: 1 receiver")
  timestamps.push(transactionID.validStart.toDate().toUTCString());
  timestamps.push("hello dear");
  timestamps.push("It's me");
}

async function sendInfo() {
  const functioncall = new ContractExecuteTransaction()
    .setContractId(contractID)
    .setGas(500_000)
    .setFunction('addDebitTransaction', new ContractFunctionParameters()
      .addAddressArray(receivers)
      .addStringArray(timestamps)
      .addUint256Array(values)
      .addStringArray(paymentTypes)
      .addStringArray(descriptions)
      .addString(transactionID.toString()));

  console.log(`sending in the following: ${receivers[0]},${timestamps[0]}, ${values[0]}, ${paymentTypes[0]}, ${descriptions[0]}, ${transactionID.toString()} `)
  console.log(`function call is: ${(await (await functioncall.execute(client)).getReceipt(client)).status}`);
}
/**
 * what are you doing
 */
async function retriveInfo() {
  const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../contracts/contractabi.json'), 'utf-8'));
  abiInterface = new Interface(abi);

  const query = new ContractExecuteTransaction()
    .setContractId(contractID)
    // .setQueryPayment(new Hbar(3))
    .setGas(200_000)
    .setFunction('getDebit', new ContractFunctionParameters()
      .addString(transactionID.toString()));
  console.log("Finding info for", transactionID.toString())
  const st = await query.execute(client);
  const tt = await st.getRecord(client);
  let results = abiInterface.decodeFunctionResult('getDebit', tt.contractFunctionResult.bytes);
  console.log(results);

}

async function retriveInfoBool() {
  const solidity = receiver_acc_id.toSolidityAddress();
  const query = new ContractCallQuery()
    .setContractId(contractID)
    .setQueryPayment(new Hbar(3))
    .setGas(200_000)
    .setFunction('getDebit', new ContractFunctionParameters()
      .addAddress(`0x${solidity}`));
  const st = await query.execute(client);
  console.log(st.getBool());
}

async function retriveInfoExecution() {
  const query = new ContractExecuteTransaction()
    .setContractId(contractID)
    .setGas(200_000)
    .setFunction('getDebit', new ContractFunctionParameters()
      .addString(`${receiver_acc_id.toSolidityAddress()}`));
  const st = await query.execute(client);
  console.log((await st.getRecord(client)).contractFunctionResult.getBool());
}


async function UpdateInfo() {
}

async function deleteInfo() {
}

async function main() {

  await deployContract();
  await createTransaction();
  await sendInfo();
  // await retriveInfoExecution();
  // await UpdateInfo();
  await retriveInfo();
  // await deleteInfo();
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});

class BatchDebitData {
  receiver: string[];
  timestamp: string[];
  value: number[];
  paymentTypes: string[];
  descriptions: string[];
  constructor(
    receiver: string[],
    timestamp: string[],
    value: number[],
    paymentType: string[],
    description: string[]
  ) {
    this.descriptions = description;
    this.paymentTypes = paymentType;
    this.receiver = receiver;
    this.timestamp = timestamp;
    this.value = value;
  }

  toString(): string {

    return `receiver: ${this.receiver}, timestamp: ${this.timestamp}, value: ${this.value}, paymentType: ${this.paymentTypes}, description: ${this.descriptions}`;
  }
}