import {
  AccountCreateTransaction,
  AccountId,
  BadKeyError,
  Client,
  CustomFixedFee,
  CustomFractionalFee,
  CustomRoyaltyFee,
  Hbar,
  KeyList,
  PrivateKey,
  PublicKey,
  TokenCreateTransaction,
  TokenId
} from "@hashgraph/sdk";
import { Either } from "monet";



function verifyKey(enteredText: string): Either<BadKeyError, PublicKey> {

  // sample implementation
  // verifyKey('dfsdfer').cata(() => { console.log("Wrong key enterted") }, (pk) => console.log('correct key entered'))
  return Either.fromTry(() => PublicKey.fromString(enteredText))
}

function verifyAccount(enteredText: string): Either<BadKeyError, AccountId> {

  // sample implementation
  // verifyKey('dfsdfer').cata(() => { console.log("Wrong key enterted") }, (pk) => console.log('correct key entered'))
  return Either.fromTry(() => AccountId.fromString(enteredText))
}

async function CreateDAOToken(
  dao: DAO, client: Client, treasuryPrivateKey: PrivateKey): Promise<TokenId> {
  const newTokenTransaction = await new TokenCreateTransaction()
    .setDecimals(dao.tokenDetails.deciaml)
    .setInitialSupply(dao.tokenDetails.initialSupply)
    .setAdminKey(dao.tokenDetails.adminKey)
    .setFreezeKey(dao.tokenDetails.freezeKey)
    .setMaxSupply(dao.tokenDetails.maxSupply)
    .setTreasuryAccountId(dao.tokenDetails.treasuryAccountId)
    .setTokenName(dao.tokenDetails.name)
    .setTokenSymbol(dao.tokenDetails.tokenSymbol)
    .setSupplyKey(dao.tokenDetails.supplyKey)
    .setKycKey(dao.tokenDetails.kycKey)
    .setTokenMemo(dao.tokenDetails.TokenMemo)
    .setWipeKey(dao.tokenDetails.wipeKey)
    .freezeWith(client)
    .sign(treasuryPrivateKey)
  const executed = await newTokenTransaction.execute(client);
  const new_created_token_id = (await executed.getReceipt(client)).tokenId;
  return new_created_token_id;
}

export type NewAccountDetails = { privateKey: PrivateKey, publicKey: PublicKey, accountID: AccountId }
async function CreateTreasuryAccount(
  threshhold: number, client: Client,
  keys_to_accounts: PublicKey[]
) {
  var thresholdkey = new KeyList(keys_to_accounts, threshhold);
  const newprivateKey = await PrivateKey.generateECDSAAsync();
  const newpublicKey = newprivateKey.publicKey;
  const newAccount = await new AccountCreateTransaction()
    .setKey(thresholdkey)
    .setInitialBalance(new Hbar(2))
    .execute(client);
  const getReceipt = await newAccount.getReceipt(client);
  const newAccountId = getReceipt.accountId;
  return { privateKey: newprivateKey, publicKey: newpublicKey, accountID: newAccountId }

  // ask for number of required signatories.

  //enter all 3 or create by sending link to their email,
  // which they then open to create an account.
  // It's basically and account creating page
}
export async function CreateAccount(client: Client): Promise<NewAccountDetails> {
  // var priKeys: PrivateKey[] = new Array(3);
  // var pubkeys: PublicKey[] = new Array(3);
  // for (let index = 0; index < 3; index++) {
  const pk = PrivateKey.generate();
  // priKeys[index] = pk;
  // pubkeys[index] = pk.publicKey;
  const pub_key = pk.publicKey;
  const newly_created_account = (await (await new AccountCreateTransaction()
    .setInitialBalance(new Hbar(2))
    .execute(client)).getReceipt(client)).accountId;
  return { privateKey: pk, publicKey: pub_key, accountID: newly_created_account };
  // console.log(`private key: ${pk.toStringRaw()}, public key : ${pk.publicKey.toStringRaw()}`);
}

class DAO {
  //name should me maximum of 100 characters
  name: string;
  description: string;
  tokenDetails: TokenDetails;
  constructor(name: string, description: string, tokenDetails: TokenDetails) {
    this.description = description;
    this.name = name;
    this.tokenDetails = tokenDetails;
  }

}

class TokenDetails {
  name: string;
  tokenSymbol: string;
  deciaml: number;
  initialSupply: number;
  adminKey: PublicKey | null;
  freezeKey: PublicKey | null;
  treasuryAccountId: AccountId;
  infiniteSuply: boolean;
  maxSupply: number;
  supplyKey: PublicKey | null;
  pauseKey: PublicKey | null;
  kycKey: PublicKey | null;
  TokenMemo: string;
  customeFees: CustomeFees | null;
  wipeKey: PublicKey | null;
  constructor(name: string,
    tokenSymbol: string,
    deciaml: number,
    initialSupply: number,
    treasuryAccountId: AccountId,
    adminKey: PublicKey,
    kycKey: PublicKey,
    freezeKey: PublicKey,
    wipeKey: PublicKey,
    supplyKey: PublicKey,
    pauseKey: PublicKey,
    memo: string,
    maxSupply: number,
    customFees: CustomeFees,
    infiniteSuply: boolean) {
    new CustomFixedFee();
    new CustomFractionalFee();
    new CustomRoyaltyFee();
    this.deciaml = deciaml;
    this.infiniteSuply = infiniteSuply;
    this.initialSupply = initialSupply;
    this.name = name;
    this.tokenSymbol = tokenSymbol;
    this.treasuryAccountId = treasuryAccountId;
    this.adminKey = adminKey;
    this.maxSupply = maxSupply;
    this.kycKey = kycKey;
    this.freezeKey = freezeKey;
    this.wipeKey = wipeKey;
    this.supplyKey = supplyKey;
    this.pauseKey = pauseKey;
    this.TokenMemo = memo;
    this.customeFees = customFees
  }
}

enum CustomeFees { FIXED, FRACIONAL, ROYALTY }