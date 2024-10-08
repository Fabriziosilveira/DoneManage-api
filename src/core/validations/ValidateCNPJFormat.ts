import { ErrorMessage } from "../../cross- utils/error/ErrorMessage";

export function validateCNPJFormat(cnpj: string): void {
    if (cnpj == ''){
      throw new Error(ErrorMessage.emptyCNPJValue);
    }

    const cleanedCNPJ = cnpj.trim().replace(/[^\d]/g, '');
  
    if (cleanedCNPJ.length !== 14) {
      throw new Error(ErrorMessage.invalidCNPJLength);
    }

    if (/^(\d)\1{13}$/.test(cleanedCNPJ)) {
      throw new Error(ErrorMessage.invalidCNPJNumber);
    }
  
    const calculateDigit = (numbers: string, weights: number[]) => {
      let sum = 0;
  
      for (let i = 0; i < numbers.length; i++) {
        sum += Number(numbers[i]) * weights[i];
      }
  
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };
  
    const base = cleanedCNPJ.slice(0, 12);
    const firstDigit = Number(cleanedCNPJ[12]);
    const secondDigit = Number(cleanedCNPJ[13]);
  
    const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
    const calculatedFirstDigit = calculateDigit(base, firstWeights);
    const calculatedSecondDigit = calculateDigit(
      base + calculatedFirstDigit,
      secondWeights,
    );
  
    if (
      calculatedFirstDigit !== firstDigit ||
      calculatedSecondDigit !== secondDigit
    ) {
      throw new Error(ErrorMessage.invalidCNPJNumber);
    }
  }
  