"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("@hashgraph/sdk");
function verifyKey(enteredText) {
    sdk_1.PublicKey.fromString(enteredText);
    return true;
}
function CreateDAO(dao) {
    return __awaiter(this, void 0, void 0, function* () {
        new sdk_1.TokenCreateTransaction()
            .setDecimals(dao.tokenDetails.deciaml)
            .setInitialSupply(dao.tokenDetails.initialSupply)
            .setAdminKey(dao.tokenDetails.adminKey)
            .setFreezeKey(dao.tokenDetails.freezeKey)
            .setMaxSupply(dao.tokenDetails.maxSupply);
    });
}
class DAO {
    constructor(name, description, tokenDetails) {
        this.description = description;
        this.name = name;
        this.tokenDetails = tokenDetails;
    }
}
class TokenDetails {
    constructor(name, tokenSymbol, deciaml, initialSupply, treasuryAccountId, adminKey, kycKey, freezeKey, wipeKey, supplyKey, pauseKey, memo, maxSupply, customFees, infiniteSuply) {
        new sdk_1.CustomFixedFee();
        new sdk_1.CustomFractionalFee();
        new sdk_1.CustomRoyaltyFee();
        this.deciaml = deciaml;
        this.infiniteSuply = infiniteSuply;
        this.initialSupply = initialSupply;
        this.name = name;
        this.tokenSymbol = tokenSymbol;
        this.treasuryAccountId = treasuryAccountId;
        this.adminKey = adminKey;
        this.maxSupply = maxSupply;
    }
}
var customeFees;
(function (customeFees) {
    customeFees[customeFees["FIXED"] = 0] = "FIXED";
    customeFees[customeFees["FRACIONAL"] = 1] = "FRACIONAL";
    customeFees[customeFees["ROYALTY"] = 2] = "ROYALTY";
})(customeFees || (customeFees = {}));
//# sourceMappingURL=createDAO.js.map