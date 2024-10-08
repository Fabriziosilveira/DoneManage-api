import { Enterprise } from "../../core/entities/Enterprise.Entity";

export interface EnterpriseGateway {
    create(enterprise: Enterprise): Promise<void>;
    listAll(skip: number, take: number): Promise<Omit<Enterprise, 'password' | 'users'>[]>;
    countAll(): Promise<number>;
//    getById(id: string): Promise<Enterprise>;
//   getByName(name: string): Promise<Enterprise>;
//    getByCNPJ(cnpj: string): Promise<Enterprise>;
//     updateName(name: string): Promise<void>;
//    updateZipCode(zipCode: string): Promise<void>;
}