import { Request, Response } from "express";
import { CreateEnterpriseUseCase } from "../../../../application/useCase/Create.Enterprise.useCase";
import { HttpMethod, Route } from "./routes";
import { CreateEnterpriseInputDto, CreateEnterpriseResposeDto } from "../../../../adapters/dto/Enterprise.dto";
import { CreateEnterpriseRoutePresenter } from "../../../../adapters/presenters/Enterprise.presenter";

export class CreateEnterpriseRoute implements Route{
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createEnterpriseService: CreateEnterpriseUseCase,
    ){}

    public static create(createEnterpriseService: CreateEnterpriseUseCase){
        return new CreateEnterpriseRoute(
            '/enterprises',
            HttpMethod.POST,
            createEnterpriseService
        );
    }

    public getHandler(){
        return async (request: Request, response: Response) => {
            const { name, email,password, tier, cnpj, zipCode  } = request.body;

            const input: CreateEnterpriseInputDto = {
                name,
                email,
                password,
                tier,
                cnpj,
                zipCode,
            }

            const output: CreateEnterpriseResposeDto = 
            await this.createEnterpriseService.execute(input);

            const responseBody = CreateEnterpriseRoutePresenter(output);

            response.status(201).json(responseBody).send();
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}