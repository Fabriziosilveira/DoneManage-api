import { ListAllEnterpriseInputDto, ListAllEnterpriseOutputDto } from "../../adapters/dto/Enterprise.dto";
import { EnterpriseGateway } from "../../adapters/gateways/Enterprise.gateway";
import { UseCase } from "../../adapters/gateways/Usecase.gateway";
import { ListAllEnterprisePresenterOutput } from "../../adapters/presenters/Enterprise.presenter";

export class ListAllEnterprisesUseCase 
    implements UseCase<ListAllEnterpriseInputDto, ListAllEnterpriseOutputDto>{

    private constructor(private readonly enterpriseGateway: EnterpriseGateway){}

    public static create(enterpriseGateway: EnterpriseGateway){
        return new ListAllEnterprisesUseCase(enterpriseGateway);
    }

    public async execute(input: ListAllEnterpriseInputDto): Promise<ListAllEnterpriseOutputDto> {
        const { skip, take } = input;

        const allEnterprises = await this.enterpriseGateway.listAll(skip, take);
        const total = await this.enterpriseGateway.countAll();

        const output = ListAllEnterprisePresenterOutput(allEnterprises, total);

        return output;
    }
}