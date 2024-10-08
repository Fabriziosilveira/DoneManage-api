import { Tiers } from '../../cross- utils/enums/EnterpriseTiers';
import { MaximumEmployeeTiers } from '../../cross- utils/enums/EnterpriseMaximunEmployee';
import { validateName } from '../validations/ValidateName';
import { validateEmail } from '../validations/ValidateEmail';
import { validateImageURL } from '../validations/ValidateImageURL';
import { validateZipCodeFormat } from '../validations/ValidateZipCodeFormat';
import { User } from './User.Entity';
import { validateCNPJFormat } from '../validations/ValidateCNPJFormat';
import { validateIsValidTier } from '../validations/ValidateTier';
import { validatePassword } from '../validations/ValidatePassword';

type PropsEnterprise = {
  id: string;
  name: string;
  email: string;
  password: string;
  maximumEmployee?: number;
  imageURL?: string;
  tier: string;
  cnpj: string;
  zipCode: string;
  users: User[]
};

export class Enterprise {
  private constructor(private readonly props: PropsEnterprise) {
    validateName(props.name);
    validateEmail(props.email);
    validateCNPJFormat(props.cnpj);
    validateZipCodeFormat(props.zipCode);
    validatePassword(props.password);
    this.validateTier(props.tier);
    this.validateMaximumEmployeeBasedTier(props.tier);
  }

  public static create(name: string, email: string, password: string, tier: string, cnpj: string, zipCode: string){
    return new Enterprise({
      id: crypto.randomUUID().toString(),
      name,
      email,
      tier,
      cnpj,
      zipCode,
      password,
      users: [],
    });
  }

  public static with(props: PropsEnterprise): Omit<PropsEnterprise, 'password' | 'users'>{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, users, ...safeProps } = props;
    const enterprise =  new Enterprise(safeProps as PropsEnterprise);

    enterprise.validateMaximumEmployeeBasedTier(safeProps.tier);

    return {
      ...safeProps,
      maximumEmployee: enterprise.maximumEmployee
    };
  }

  private validateMaximumEmployeeBasedTier(tier: string): void {

    validateIsValidTier(tier);

    switch (tier) {
      case Tiers.Free:
        this.props.maximumEmployee = MaximumEmployeeTiers.Free;
        break;
      case Tiers.Starter:
        this.props.maximumEmployee = MaximumEmployeeTiers.Starter;
        break;
      case Tiers.Business:
        this.props.maximumEmployee = MaximumEmployeeTiers.Business;
        break;
      case Tiers.Enterprise:
        this.props.maximumEmployee = MaximumEmployeeTiers.Enterprise;
        break;
      default:
        this.props.maximumEmployee = MaximumEmployeeTiers.Free;
    }
  }

  private validateTier(tier: string): void {

    if (tier == '') {
      this.getDefaultTier();

    }

    validateIsValidTier(tier);
  }

  private getDefaultTier(): string {
    return (this.props.tier = Tiers.Free);
  }

  get maximumEmployee(): number {
    return this.props.maximumEmployee!;
  }

  get tier(): string {
    return this.props.tier;
  }

  get id(): string {
    return this.props.id!;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get cnpj(): string {
    return this.props.cnpj;
  }

  get imageURL(): string {
    return this.props.imageURL!;
  }

  get zipCode(): string {
    return this.props.zipCode;
  }

  public set tier(tier: string) {
    this.validateTier(tier);
    this.validateMaximumEmployeeBasedTier(tier);
    this.props.tier = tier;
  }

  public set zipCode(zipCode: string) {
    validateZipCodeFormat(zipCode);
    this.props.zipCode = zipCode;
  }

  public set cnpj(cnpj: string) {
    validateCNPJFormat(cnpj);
    this.props.cnpj = cnpj; 
  }

  public set email(email: string) {
    validateEmail(email);
    this.props.email = email;
  }

  public set password(password: string){
    validatePassword(password);
    this.props.password = password;
  }

  public set imageURL(imageURL: string){
    validateImageURL(imageURL);
    this.props.imageURL = imageURL;
  }

  public set name(name: string) {
    validateName(name);
    this.props.name = name;
  }
}
