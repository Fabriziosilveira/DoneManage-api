import { ErrorMessage } from "../../cross- utils/error/ErrorMessage";

export function validatePassword(password: string): void{
    if(password == ''){
        throw new Error(ErrorMessage.emptyPasswordValue);
    }

    validatePasswordFormat(password);
}

function validatePasswordFormat(password: string): void{
    if(password.length < 8){
        throw new Error(ErrorMessage.passwordIstooShort);
    }

    if(!/[A-Z]/.test(password)){
        throw new Error(ErrorMessage.passwordHasntUppercase);
    }

    if(!/\d/.test(password)){
        throw new Error(ErrorMessage.passwordHasntNumber);
    }

    if(!/[!@#$%^&*]/.test(password)){
        throw new Error(ErrorMessage.passwordHasntSpecialChar);
    }
}