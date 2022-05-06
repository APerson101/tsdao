import { AccountId, Client } from "@hashgraph/sdk";
import { mailgun } from "mailgun-js";
import { CreateAccount, NewAccountDetails } from "./createDAO";

const myAccountIdString = process.env.MY_ACCOUNT_ID;
const myPrivateKeyString = process.env.MY_PRIVATE_KEY;
const my_AccountID = AccountId.fromString(myAccountIdString);
const client = Client.forTestnet();

async function CreateWallets(): Promise<NewAccountDetails> {

  const new_acc: NewAccountDetails = await CreateAccount(client);
  return new_acc;
}

async function ImportWalletMenmoic(mnemonic: String) {
}

async function ImportWalletPrivateKey(key: string) {
}

async function conecttoMailgun() {
  const DOMAIN = "sandbox8e48b7c9e0ca4fc4b1cbdb422dd5636b.mailgun.org";
  const mg = mailgun({
    apiKey: "d029e87c95bad698e518f0188dd3b5d2-fe066263-003db21b",
    domain: DOMAIN
  });
  const data = {
    from: "Mailgun Sandbox <postmaster@sandbox8e48b7c9e0ca4fc4b1cbdb422dd5636b.mailgun.org>",
    to: "abdulhadih48@gmail.com",
    subject: "Hello",
    text: "Testing some Mailgun awesomness!"
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
}