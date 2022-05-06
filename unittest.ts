import { BadKeyError, PublicKey } from "@hashgraph/sdk";
import { Either } from "monet";

function verifyKey(enteredText: string): Either<BadKeyError, PublicKey> {

  return Either.fromTry(() => PublicKey.fromString(enteredText))
}
verifyKey('dfsdfer').cata(() => { console.log("Wrong key enterted") }, (pk) => console.log('correct key entered'))