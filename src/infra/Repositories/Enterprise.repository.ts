import { PrismaClient } from "@prisma/client";
import { Enterprise } from "../../core/entities/Enterprise.Entity"
import { EnterpriseGateway } from "../../adapters/gateways/Enterprise.gateway";

export class EnterpriseRepositoryPrisma implements EnterpriseGateway {

    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient){
        return new EnterpriseRepositoryPrisma(prismaClient);
    }

    public async create(enterprise: Enterprise): Promise<void> {
        const data = {
            id: enterprise.id,
            name: enterprise.name,
            email: enterprise.email,
            password: enterprise.password,
            tier: enterprise.tier,
            cnpj: enterprise.cnpj,
            zipCode: enterprise.zipCode,
        }

        await this.prismaClient.enterprise.create({data});
    }

    public async listAll(skip: number, take: number): Promise<Omit<Enterprise, 'password' | 'users'>[]> {
        const enterprises = await this.prismaClient.enterprise.findMany({
            skip,
            take
        });

        const enterpriseList = enterprises.map((e) => {
            return Enterprise.with({
                id: e.id,
                name: e.name,
                email: e.email,
                imageURL: e.imageURL || "",
                tier: e.tier,
                cnpj: e.cnpj,
                zipCode: e.zipCode,
                users: [],
                password: e.password,
            });
        });

        return enterpriseList;
    }

    public async countAll(): Promise<number> {
        return this.prismaClient.enterprise.count();
    }
}