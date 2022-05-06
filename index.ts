
import * as dotenv from "dotenv";
dotenv.config();
import {
  PrivateKey,
  Client,
  AccountCreateTransaction,
  TransferTransaction,
  AccountBalanceQuery,
  Hbar,
  AccountId,
  ContractCreateFlow,
  ContractCreateTransaction,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  ContractCallQuery,
  AccountUpdateTransaction,
  FileCreateTransaction,
  ContractId,
} from "@hashgraph/sdk";
var contractID: ContractId;
const bytecodeRemix = "60806040523480156200001157600080fd5b50604051620009ec380380620009ec8339818101604052810190620000379190620002e7565b81600090805190602001906200004f9291906200005f565b50806001819055505050620003b2565b8280546200006d906200037c565b90600052602060002090601f016020900481019282620000915760008555620000dd565b82601f10620000ac57805160ff1916838001178555620000dd565b82800160010185558215620000dd579182015b82811115620000dc578251825591602001919060010190620000bf565b5b509050620000ec9190620000f0565b5090565b5b808211156200010b576000816000905550600101620000f1565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b62000178826200012d565b810181811067ffffffffffffffff821117156200019a57620001996200013e565b5b80604052505050565b6000620001af6200010f565b9050620001bd82826200016d565b919050565b600067ffffffffffffffff821115620001e057620001df6200013e565b5b620001eb826200012d565b9050602081019050919050565b60005b8381101562000218578082015181840152602081019050620001fb565b8381111562000228576000848401525b50505050565b6000620002456200023f84620001c2565b620001a3565b90508281526020810184848401111562000264576200026362000128565b5b62000271848285620001f8565b509392505050565b600082601f83011262000291576200029062000123565b5b8151620002a38482602086016200022e565b91505092915050565b6000819050919050565b620002c181620002ac565b8114620002cd57600080fd5b50565b600081519050620002e181620002b6565b92915050565b6000806040838503121562000301576200030062000119565b5b600083015167ffffffffffffffff8111156200032257620003216200011e565b5b620003308582860162000279565b92505060206200034385828601620002d0565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200039557607f821691505b60208210811415620003ac57620003ab6200034d565b5b50919050565b61062a80620003c26000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806317d7de7c1461005c5780635353a2d81461007a578063967e6e6514610096578063c605f76c146100b4578063e46db354146100d2575b600080fd5b6100646100dc565b6040516100719190610326565b60405180910390f35b610094600480360381019061008f9190610491565b61016e565b005b61009e610188565b6040516100ab91906104f3565b60405180910390f35b6100bc610192565b6040516100c99190610326565b60405180910390f35b6100da6101cf565b005b6060600080546100eb9061053d565b80601f01602080910402602001604051908101604052809291908181526020018280546101179061053d565b80156101645780601f1061013957610100808354040283529160200191610164565b820191906000526020600020905b81548152906001019060200180831161014757829003601f168201915b5050505050905090565b80600090805190602001906101849291906101ea565b5050565b6000600154905090565b60606040518060400160405280600b81526020017f48656c6c6f20576f726c64000000000000000000000000000000000000000000815250905090565b60018060008282546101e1919061059e565b92505081905550565b8280546101f69061053d565b90600052602060002090601f016020900481019282610218576000855561025f565b82601f1061023157805160ff191683800117855561025f565b8280016001018555821561025f579182015b8281111561025e578251825591602001919060010190610243565b5b50905061026c9190610270565b5090565b5b80821115610289576000816000905550600101610271565b5090565b600081519050919050565b600082825260208201905092915050565b60005b838110156102c75780820151818401526020810190506102ac565b838111156102d6576000848401525b50505050565b6000601f19601f8301169050919050565b60006102f88261028d565b6103028185610298565b93506103128185602086016102a9565b61031b816102dc565b840191505092915050565b6000602082019050818103600083015261034081846102ed565b905092915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61039e826102dc565b810181811067ffffffffffffffff821117156103bd576103bc610366565b5b80604052505050565b60006103d0610348565b90506103dc8282610395565b919050565b600067ffffffffffffffff8211156103fc576103fb610366565b5b610405826102dc565b9050602081019050919050565b82818337600083830152505050565b600061043461042f846103e1565b6103c6565b9050828152602081018484840111156104505761044f610361565b5b61045b848285610412565b509392505050565b600082601f8301126104785761047761035c565b5b8135610488848260208601610421565b91505092915050565b6000602082840312156104a7576104a6610352565b5b600082013567ffffffffffffffff8111156104c5576104c4610357565b5b6104d184828501610463565b91505092915050565b6000819050919050565b6104ed816104da565b82525050565b600060208201905061050860008301846104e4565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061055557607f821691505b602082108114156105695761056861050e565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006105a9826104da565b91506105b4836104da565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156105e9576105e861056f565b5b82820190509291505056fea264697066735822122035cbda18e15d0abd36cce9bfeb8f12744ad3cc3eaf7d6cc4585098bf05ce6d4c64736f6c63430008090033";


const ABI = [
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
const myAccountIdString = process.env.MY_ACCOUNT_ID;
const myPrivateKeyString = process.env.MY_PRIVATE_KEY;

const my_AccountID = AccountId.fromString(myAccountIdString);
const client = Client.forTestnet();
client.setOperator(myAccountIdString, myPrivateKeyString);
async function main() {

  await createPlebContract(client);
  // await thirdOptionDeploy(client);

  await callContractFunction(contractID, client);
  await readFromContract(contractID, client);

  await getFunctionAgain(contractID, client);
}
async function increaseTxnFee() {
  const acc = new AccountUpdateTransaction()
    .setAccountId(my_AccountID)
    .setMaxTransactionFee(new Hbar(1000));
  const tt = await acc.execute(client);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function thirdOptionDeploy(client) {
  const ftx = new FileCreateTransaction()
    .setContents(bytecodeRemix);
  const fileId = (await (await ftx.execute(client)).getReceipt(client)).fileId;
  console.log(`smart contract bytecode is: ${fileId}`);

  const item = new ContractCreateTransaction()
    .setBytecodeFileId(fileId)
    .setGas(3000000)
    .setConstructorParameters(new ContractFunctionParameters().addString("Sup"));
  const contractId = (await (await item.execute(client)).getReceipt(client)).contractId;
  console.log(`Contract id is: ${contractId}`);
  contractID = contractId;
}

async function createPlebContract(client) {
  // const byteCode = (await hre.artifacts.readArtifact("HTS")).bytecode;
  const contractCreate = new ContractCreateFlow()
    .setGas(100000)
    .setBytecode(bytecodeRemix)
    .setConstructorParameters(new ContractFunctionParameters()
      .addString("where are you")
      .addUint256(7));
  const txResponse = await contractCreate.execute(client);
  const receipt = await txResponse.getReceipt(client);
  const newContractId = receipt.contractId;
  console.log(`New contract id is: ${newContractId}`);
  contractID = newContractId;
}

async function callContractFunction(contractID: ContractId, client: Client) {
  const txn = new ContractExecuteTransaction()
    .setContractId(contractID)
    .setGas(100_000)
    .setMaxTransactionFee(new Hbar(100))
    .setFunction("changeName", new ContractFunctionParameters()
      .addString("Bin Laden"))
  const response = await txn.execute(client);
  const receipt = await response.getReceipt(client);
  console.log(`Change name returns: ${receipt.status}`);
  // await increaseTxnFee();
  const query = new ContractCallQuery()
    .setContractId(contractID)
    .setGas(100000)
    .setQueryPayment(new Hbar(3))
    .setFunction("getName");
  const res = await query.execute(client);

  // const txnn = new ContractExecuteTransaction()
  //   .setContractId(contractID)
  //   .setGas(100_000)
  //   .setMaxTransactionFee(new Hbar(100))
  //   .setFunction("getName")
  // const responser = await txnn.execute(client);
  // const receiptr = (await responser.getRecord(client)).contractFunctionResult.getString();
  console.log(`New name is now: ${res.getString()} `);

}

async function readFromContract(contractID, client) {
  await increaseTxnFee();
  const query = new ContractCallQuery()
    .setContractId(contractID)
    .setGas(100000)
    .setQueryPayment(new Hbar(3))
    .setFunction("helloWorld");
  const res = await query.execute(client);
  console.log(`Hello World returns: ${res.getString()} `);
}

async function getFunctionAgain(contractID, client) {

  const quaryr = new ContractExecuteTransaction()
    .setContractId(contractID)
    .setGas(100000)
    .setMaxTransactionFee(new Hbar(25))
    .setFunction("getAge");
  const resser = await quaryr.execute(client);
  console.log(`Age before increase is: ${(await resser.getRecord(client)).contractFunctionResult.getUint256()} `);


  const query = new ContractExecuteTransaction()
    .setContractId(contractID)
    .setGas(100000)
    .setMaxTransactionFee(new Hbar(25))
    .setFunction("appendAge");
  const res = await query.execute(client);
  console.log(`Append Age is now: ${(await res.getReceipt(client)).status} `);

  const quary = new ContractExecuteTransaction()
    .setContractId(contractID)
    .setGas(100000)
    .setMaxTransactionFee(new Hbar(25))
    .setFunction("getAge");
  const resse = await quary.execute(client);
  console.log(`New Age is now: ${(await resse.getRecord(client)).contractFunctionResult.getUint256()} `);

  const queryy = new ContractCallQuery()
    .setContractId(contractID)
    .setGas(100000)
    .setFunction("getAge");
  const ree = await queryy.execute(client);
  console.log(`New age second method returns: ${(ree.getUint256())} `);
}

