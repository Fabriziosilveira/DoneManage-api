import { ErrorMessage } from "../../cross- utils/error/ErrorMessage";

export function validateName(name: string): void{
    if(name == ''){
        throw new Error(ErrorMessage.emptyNameValue);
    }
}