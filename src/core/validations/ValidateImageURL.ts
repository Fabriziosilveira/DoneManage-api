import { ErrorMessage } from "../../cross- utils/error/ErrorMessage";

export function validateImageURL(imageURL: string): void{
    if(imageURL == ''){
        throw new Error(ErrorMessage.emptyImageURLValue);
    }

    const urlRegex = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([\w-.,@?^=%&:/~+#]*)+\.([a-zA-Z]{2,4})$/;

    if(!urlRegex.test(imageURL)){
        throw new Error(ErrorMessage.invalidImageURLFormat);
    }
}