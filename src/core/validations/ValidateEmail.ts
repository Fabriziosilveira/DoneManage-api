import { ErrorMessage } from "../../cross- utils/error/ErrorMessage";

export function validateEmail(email: string) {

    if(email == ''){
        throw new Error(ErrorMessage.emptyEmailValue);
    }

    validateEmailFormat(email);
}

function validateEmailFormat(email: string): void{
    const enableFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!enableFormat.test(email)){
        throw new Error(ErrorMessage.invalidEmailFormat);
    }
}