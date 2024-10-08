import { Enterprise } from '../../core/entities/Enterprise.Entity';

export interface EnterpriseRepositoryInterface {
  create(input: Enterprise): Promise<Enterprise>;
  updateName(name: string): Promise<Enterprise>;
}
