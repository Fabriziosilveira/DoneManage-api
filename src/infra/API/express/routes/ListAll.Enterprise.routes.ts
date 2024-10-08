import { Request, Response } from "express";
import { ListAllEnterprisesUseCase } from "../../../../application/useCase/ListAll.Enterprise.useCase";
import { HttpMethod, Route } from "./routes";
import { ListAllEnterpriseRoutePresenter } from "../../../../adapters/presenters/Enterprise.presenter";

export class ListAllEnterpriseRoute implements Route{
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listAllEnterpriseService: ListAllEnterprisesUseCase,
    ){}

    public static create(listAllEnterpriseService: ListAllEnterprisesUseCase){
        return new ListAllEnterpriseRoute(
            '/enterprises',
            HttpMethod.GET,
            listAllEnterpriseService,
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {

            const skip = parseInt(request.query.skip as string) || 0;
            const take = parseInt(request.query.take as string) || 10;

            const input = { skip, take };

            const output = await this.listAllEnterpriseService.execute(input);

            const responseBody = ListAllEnterpriseRoutePresenter(output);

            response.status(200).json(responseBody).send();
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}