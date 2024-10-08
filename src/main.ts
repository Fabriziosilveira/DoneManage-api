import { CreateEnterpriseUseCase } from "./application/useCase/Create.Enterprise.useCase";
import { prisma } from "./infra/DataBase/PrismaClient";
import { ApiExpress } from "./infra/API/express/api.express";
import { EnterpriseRepositoryPrisma } from './infra/Repositories/Enterprise.repository';
import { ListAllEnterpriseRoute } from "./infra/API/express/routes/ListAll.Enterprise.routes";
import { CreateEnterpriseRoute } from "./infra/API/express/routes/Create.Enterpsrise.routes";
import { ListAllEnterprisesUseCase } from "./application/useCase/ListAll.Enterprise.useCase";
import { ErrorMessage } from "./cross- utils/error/ErrorMessage";

function main(){

    const repository = EnterpriseRepositoryPrisma.create(prisma);

    const createEnterpriseUseCase = CreateEnterpriseUseCase.create(repository);
    const listAllEnterpriseUseCase = ListAllEnterprisesUseCase.create(repository);

    const createEnterpriseRoute = CreateEnterpriseRoute.create(createEnterpriseUseCase);
    const listAllEnterpriseRoute = ListAllEnterpriseRoute.create(listAllEnterpriseUseCase);

    const port = process.env.PORT ? parseInt(process.env.PORT, 10): 3000;

    if (isNaN(port) || port <= 0 || port >= 65536){
        throw new Error(ErrorMessage.apiPOrtIsInvalid);
    }
    
    const api = ApiExpress.create(
        [
            createEnterpriseRoute,
            listAllEnterpriseRoute,
        ]
    );
    api.start(port);
}

main();