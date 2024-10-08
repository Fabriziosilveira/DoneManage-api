import { Enterprise } from "../../core/entities/Enterprise.Entity";
import { CreateEnterpriseOutputDto, CreateEnterpriseResposeDto, ListAllEnterpriseOutputDto, ListAllEnterpriseResponseDto } from "../dto/Enterprise.dto";

export function CreateEnterprisePresenterOutput(enterprise: Enterprise): CreateEnterpriseOutputDto{
    const output: CreateEnterpriseOutputDto = {
        id: enterprise.id,
    }

    return output;
}

export function CreateEnterpriseRoutePresenter(input: CreateEnterpriseResposeDto){
    const response = { id: input.id };

    return response;
}

export function ListAllEnterprisePresenterOutput(enterprises: Enterprise[], total: number): ListAllEnterpriseOutputDto{
    return {
        total,
        enterprises: enterprises.map((e) => {
            return {
                id: e.id,
                name: e.name,
                email: e.email,
                maximumEmployee: e.maximumEmployee,
                imageURL: e.imageURL,
                tier: e.tier,
                cnpj: e.cnpj,
                zipCode: e.zipCode
            }
        })
    }
}

export function ListAllEnterpriseRoutePresenter(input: ListAllEnterpriseOutputDto): ListAllEnterpriseResponseDto{
    const response: ListAllEnterpriseResponseDto = {
        total: input.total,
        enterprises: input.enterprises.map((enterprise) => ({
            id: enterprise.id,
            name: enterprise.name,
            email: enterprise.email,
            maximumEmployee: enterprise.maximumEmployee,
            imageURL: enterprise.imageURL,
            tier: enterprise.tier,
            cnpj: enterprise.cnpj,
            zipCode: enterprise.zipCode
        })),
    }

    return response;
}

