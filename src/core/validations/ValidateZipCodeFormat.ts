import { ErrorMessage } from "../../cross- utils/error/ErrorMessage";

export function validateZipCodeFormat(zipCode: string): void{
    if(zipCode == ''){
      throw new Error(ErrorMessage.emptyZipCodeValue);
    }

    const usZipCodeValidFormat = /^\d{5}(-\d{4})?$/;
    const brZipCodeValidFormat = /^\d{5}-?\d{3}$/;

    if (
      !usZipCodeValidFormat.test(zipCode) &&
      !brZipCodeValidFormat.test(zipCode)
    ) {
      throw new Error(ErrorMessage.invalidZipCodeFormat);
    }
}