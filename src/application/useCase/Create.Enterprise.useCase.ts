import { CreateEnterpriseInputDto, CreateEnterpriseOutputDto } from "../../adapters/dto/Enterprise.dto";
import { EnterpriseGateway } from "../../adapters/gateways/Enterprise.gateway";
import { UseCase } from "../../adapters/gateways/Usecase.gateway";
import { CreateEnterprisePresenterOutput } from "../../adapters/presenters/Enterprise.presenter";
import { Enterprise } from "../../core/entities/Enterprise.Entity";

export class CreateEnterpriseUseCase 
  implements UseCase<CreateEnterpriseInputDto, CreateEnterpriseOutputDto>{
  
    private constructor(private readonly enterpriseGateway: EnterpriseGateway){}

    public static create(enterpriseGateway: EnterpriseGateway){
      return new CreateEnterpriseUseCase(enterpriseGateway);
  }

    public async execute({
      name,
      email,
      password,
      tier,
      cnpj,
      zipCode
    }: CreateEnterpriseInputDto): Promise<CreateEnterpriseOutputDto> {
      const newEnterprise = Enterprise.create(
        name,
        email,
        password,
        tier,
        cnpj,
        zipCode,
      );

      await this.enterpriseGateway.create(newEnterprise);
      
      const output = CreateEnterprisePresenterOutput(newEnterprise);

      return output;
    }
}

