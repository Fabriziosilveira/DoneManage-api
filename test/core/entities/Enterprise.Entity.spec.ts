import { Enterprise } from '../../../src/core/entities/Enterprise.Entity';
import { MaximumEmployeeTiers } from '../../../src/cross- utils/enums/EnterpriseMaximunEmployee';
import { ErrorMessage } from '../../../src/cross- utils/error/ErrorMessage';

describe('Enterprise Entity Test', () => {
    it('Create Enterprise Test', () => {
        const enterprise = Enterprise.create(
            'TestName',
            'test@exemple.com',
            'Test123@',
            'free',
            '41.879.002/0001-80',
            '12345-678',
        ); 

        expect(enterprise.name).toBe('TestName');
        expect(enterprise.email).toBe('test@exemple.com');
        expect(enterprise.password).toBe('Test123@');
        expect(enterprise.tier).toBe('free');
        expect(enterprise.cnpj).toBe('41.879.002/0001-80');
        expect(enterprise.zipCode).toBe('12345-678');
    });

    describe('ID validations', () => {
        it('Should generate an ID in UUID format', () => {
            const enterprise = Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'free',
                '41.879.002/0001-80',
                '12345-678',
            );
    
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    
            expect(enterprise.id).toMatch(uuidRegex);
        });
    });

    describe('Name validations', () => {
        it('Should throw an error if name value is empty', () => {
            expect(() => Enterprise.create(
                '',
                'test@exemple.com',
                'Test123@',
                'free',
                '41.879.002/0001-80',
                '12345-678',
            )).toThrow(ErrorMessage.emptyNameValue);
        });
    });

    describe('Email validation', () => {
        it('Should throw an error if email value is empty', () => {
            expect(() => Enterprise.create(
                'TestName',
                '',
                'Test123@',
                'free',
                '41.879.002/0001-80',
                '12345-678',
            )).toThrow(ErrorMessage.emptyEmailValue);
        });

        it('Shoud email format must be valid', () => {
            const enterprise = Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'free',
                '41.879.002/0001-80',
                '12345-678',
            );
    
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
            expect(enterprise.email).toMatch(emailRegex);
        });
    });

    describe('Password Validations', () => {
        it('Should throw an error if password value is empty', () => {
            expect(() => Enterprise.create(
                'TestName',
                'test@exemple.com',
                '',
                'free',
                '41.879.002/0001-80',
                '12345-678',
            )).toThrow(ErrorMessage.emptyPasswordValue);
        });

        it('Should throw an error if password value length less than 8', () => {
            expect(() => Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Tes123@',
                'free',
                '41.879.002/0001-80',
                '12345-678',
            )).toThrow(ErrorMessage.passwordIstooShort);
        });

        it('Should throw an error if password value does not have a upper case', () => {
            expect(() => Enterprise.create(
                'TestName',
                'test@exemple.com',
                'test123@',
                'free',
                '41.879.002/0001-80',
                '12345-678',
            )).toThrow(ErrorMessage.passwordHasntUppercase);
        });

        it('Shoud throw an error if password value does not have a number', () => {
            expect(() => Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Testexample@',
                'free',
                '41.879.002/0001-80',
                '12345-678',
            )).toThrow(ErrorMessage.passwordHasntNumber);
        });

        it('Should throw an error if password value does not have a special character', () => {
            expect(() => Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test1234',
                'free',
                '41.879.002/0001-80',
                '12345-678',
            )).toThrow(ErrorMessage.passwordHasntSpecialChar);
        });
    });
    
    describe('Tier/Maximum Employee validations', () => {
        it('Should set free tier maximum employee value if tier is empty', () => {
            const enterprise = Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                '',
                '41.879.002/0001-80',
                '12345-678',
            );

            expect(enterprise.maximumEmployee).toBe(MaximumEmployeeTiers.Free);
        });

        it('Shoud set maximum employee 10 if tier is "free"', () => {
            const enterprise = Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'free',
                '41.879.002/0001-80',
                '12345-678',
            );

            expect(enterprise.maximumEmployee).toBe(MaximumEmployeeTiers.Free);
        });

        it('Shoud set maximum employee 100 if tier is "starter_Tier"', () => {
            const enterprise = Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'starter_Tier',
                '41.879.002/0001-80',
                '12345-678',
            );

            expect(enterprise.maximumEmployee).toBe(MaximumEmployeeTiers.Starter);
        });

        it('Shoud set maximum employee 350 if tier is "business_Tier"', () => {
            const enterprise = Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'business_Tier',
                '41.879.002/0001-80',
                '12345-678',
            );

            expect(enterprise.maximumEmployee).toBe(MaximumEmployeeTiers.Business);
        });

        it('Shoud set maximum employee 1000 if tier is "enterprise_Tier"', () => {
            const enterprise = Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'enterprise_Tier',
                '41.879.002/0001-80',
                '12345-678',
            );

            expect(enterprise.maximumEmployee).toBe(MaximumEmployeeTiers.Enterprise);
        });
    });
    
    describe('CNPJ validations', () => {
        it('Should throw an error if CNPJ value is empty', () => {
            expect(() => Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'free',
                '',
                '12345-678',
            )).toThrow(ErrorMessage.emptyCNPJValue);
        });

        it('Should throw an error if CNPJ length is different from 14', () => {
            expect(() => Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'free',
                '418790000010',
                '12345-678',
            )).toThrow(ErrorMessage.invalidCNPJLength);
        });

        it('Should throw an error if CNPJ has incorrect check digits', () => {
            expect(() => Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'free',
                '41879002000100',
                '12345-678',
            )).toThrow(ErrorMessage.invalidCNPJNumber);
        });

        it('Must pass to valid CNPJ', () => {
            expect(() => Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'free',
                '41879002000180',
                '12345-678',
            )).not.toThrow();
        });
    });

    describe('ZipCode validations', () => {
        it('Shoud throw an error if zipCode value is empty', () => {
            expect(() => Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'free',
                '41.879.002/0001-80',
                '',
            )).toThrow(ErrorMessage.emptyZipCodeValue);
        });

        it('Shoud throw an error if zipCode format is invalid', () => {
            expect(() => Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'free',
                '41.879.002/0001-80',
                '00000000000',
            )).toThrow(ErrorMessage.invalidZipCodeFormat);
        });
    });

    describe('Setter methods', () => {
        it('Should setName and validate input', () => {
            const enterprise = Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'free',
                '41.879.002/0001-80',
                '12345-678',
            );

            enterprise.name = 'New Enterprise Name';
            expect(enterprise.name).toBe('New Enterprise Name');
    
            expect(() => {
                enterprise.name = '';
            }).toThrow(ErrorMessage.emptyNameValue);
        });
    
        it('should setEmail and validate input', () => {
            const enterprise = Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'free',
                '41.879.002/0001-80',
                '12345-678',
            );
    
            enterprise.email = 'newemail@example.com';
            expect(enterprise.email).toBe('newemail@example.com');
    
            expect(() => {
                enterprise.email = '';
            }).toThrow(ErrorMessage.emptyEmailValue);

            expect(() => {
                enterprise.email = 'invalid_email';
            }).toThrow(ErrorMessage.invalidEmailFormat);
        });
    
        // Testes similares para os outros setters: cnpj, zipCode, tier, imageURL

        it('Shoud set imageURL and validate input', () => {
            const enterprise = Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                'free',
                '41.879.002/0001-80',
                '12345-678',
            );

            enterprise.imageURL = 'https://example.com/image.png';
            expect(enterprise.imageURL).toBe('https://example.com/image.png');

            expect(() => {
                enterprise.imageURL = '';
            }).toThrow(ErrorMessage.emptyImageURLValue);

            expect(() => {
                enterprise.imageURL = 'invalid_url';
              }).toThrow(ErrorMessage.invalidImageURLFormat);
        });
    
        it('should set tier and update maximumEmployee', () => {
            const enterprise = Enterprise.create(
                'TestName',
                'test@exemple.com',
                'Test123@',
                '',
                '41.879.002/0001-80',
                '12345-678',
            );

            enterprise.tier = 'free';
            expect(enterprise.maximumEmployee).toBe(MaximumEmployeeTiers.Free);
            
            enterprise.tier = 'starter_Tier';
            expect(enterprise.maximumEmployee).toBe(MaximumEmployeeTiers.Starter);

            enterprise.tier = 'business_Tier';
            expect(enterprise.maximumEmployee).toBe(MaximumEmployeeTiers.Business);

            enterprise.tier = 'enterprise_Tier';
            expect(enterprise.maximumEmployee).toBe(MaximumEmployeeTiers.Enterprise);

            expect(() => {
                enterprise.tier = 'InvalidTier';
            }).toThrow(ErrorMessage.tierValueIsInvalid);
        });
    });
});
