export type CreateEnterpriseInputDto = {
    name: string;
    email: string;
    password: string;
    tier: string;
    cnpj: string;
    zipCode: string;
}

export type CreateEnterpriseOutputDto = {
    id: string;
}

export type CreateEnterpriseResposeDto = {
    id: string;
}

export type ListAllEnterpriseInputDto = {
    skip: number;
    take: number;
}


export type ListAllEnterpriseOutputDto = {
    total: number;
    enterprises: {
        id: string,
        name: string,
        email: string,
        maximumEmployee: number;
        imageURL: string;
        tier: string;
        cnpj: string;
        zipCode: string;
    }[]
}

export type ListAllEnterpriseResponseDto = {
    total: number;
    enterprises: {
        id: string,
        name: string,
        email: string,
        maximumEmployee: number;
        imageURL: string;
        tier: string;
        cnpj: string;
        zipCode: string;
    }[]
}

export type UpdateNameEnterpriseInputDto = {
    id: string;
    name: string;
}

export type UpdateNameEnterpriseOutputDto = {
    id: string;
}