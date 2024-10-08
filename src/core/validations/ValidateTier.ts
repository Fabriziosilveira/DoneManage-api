import { Tiers } from "../../cross- utils/enums/EnterpriseTiers";
import { ErrorMessage } from "../../cross- utils/error/ErrorMessage";

export function validateIsValidTier(tier: string): void{
    if(isInTierEnum(tier) == false){
        throw new Error(ErrorMessage.tierValueIsInvalid);
    }
}

function isInTierEnum(value: string): boolean{
    const tiersArray: string[] = Object.values(Tiers); 
    return tiersArray.includes(value.trim());
}