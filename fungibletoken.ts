import {
  AccountCreateTransaction,
  AccountId,
  Client,
  Hbar, KeyList, PrivateKey, PublicKey, Status, TokenAssociateTransaction, TokenCreateTransaction, TokenSupplyType, TokenType, TransactionResponse, TransferTransaction
} from "@hashgraph/sdk";
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


async function tokenCreation() {

  const tkn = await new TokenCreateTransaction()
    .setTokenName("BABAYEGA")
    .setTokenSymbol("BYG")
    .setTokenType(TokenType.FungibleCommon)
    .setDecimals(2)
    .setInitialSupply(10000)
    .setTreasuryAccountId(new_AccountID)
    .setSupplyType(TokenSupplyType.Infinite)
    .setSupplyKey(new_acc_pk.publicKey)
    .freezeWith(client)
    .sign(new_acc_pk);
  const tkn1 = await tkn.execute(client);

  console.log(`new token created with id: ${(await tkn1.getReceipt(client)).tokenId
    } `);
}


/// Otherwise acc wont be able to send or receive token
async function AssociateAccWithtoken() {
  //associate multisig accs with token
  (await new TokenAssociateTransaction()
    .setAccountId(acc1)
    .freezeWith(client)
    .sign(acc1_pk)).execute(client);

  (await new TokenAssociateTransaction()
    .setAccountId(acc2)
    .freezeWith(client)
    .sign(acc2_pk)).execute(client);
}
var acc1: AccountId;
var acc1_pk: PrivateKey = PrivateKey.fromString("dbd0ba225e2145178e92e5216e0840bd994897331871f0e05b28ca93fd7249d2");
var acc2_pk: PrivateKey = PrivateKey.fromString("a4a0857be50b1a5b0661a791a20ea92feb33692b03e6cc17438904beb4e81027");
var acc2: AccountId;
async function createAcc() {
  const tt = new AccountCreateTransaction()
    .setKey(PublicKey.fromString("08e9fa3af1711d813d9f4f034cb748b5759c8fc1c102e450165a05d20294f2a2"))
    .setInitialBalance(new Hbar(10))
    .execute(client);
  acc2 = (await (await tt).getReceipt(client)).accountId;
  console.log(`${acc2}`);

  const ttt = new AccountCreateTransaction()
    .setKey(PublicKey.fromString("be5880b3af24bd8e621157381c24d7b10b3126d4a1953feaac85f39e0f7bb1b4"))
    .setInitialBalance(new Hbar(10))
    .execute(client);
  acc1 = (await (await ttt).getReceipt(client)).accountId;
  console.log(`${acc1}`);
}


async function TransferTokenFromTreasury() {

  // treasury is  multisig though
}