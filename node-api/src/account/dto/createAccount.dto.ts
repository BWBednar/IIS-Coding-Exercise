import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsUUID,
    IsNotEmpty,
    IsNumber,
    IsIn
} from 'class-validator'

/**
 * DTO for clossing an account. All fields are required
 */
export class CreateAccountDto {
    @ApiProperty({
        name: 'customerId',
        description: 'ID tied to the customer trying to create this account',
        example: '0e0c4a11-19de-42b9-a144-e41f7faf5966',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    @IsUUID(4)
    readonly customerId: string;

    @ApiProperty({
        name: 'initialDeposit',
        description: 'The initialDeposit trying to be added to the account by the customer',
        example: 123.45,
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    readonly initialDeposit: number;

    @ApiProperty({
        name: 'accountTypeId',
        description: 'The type of account being created. 1 for Checking, 2 for Savings',
        example: 123.45,
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    @IsIn([1, 2])
    readonly accountTypeId: number;
}

/**
 * DTO for the opening an account response to be sent from the API to the UI
 */
export class CreateAccountResponseDto {
    @ApiProperty({
        name: 'customerId',
        description: 'ID tied to the customer trying to access this account',
        example: '0e0c4a11-19de-42b9-a144-e41f7faf5966',
        type: String
    })
    readonly customerId: string;

    @ApiProperty({
        name: 'accountId',
        description: 'ID tied to the account trying to be accessed',
        example: '0e0c4a11-19de-42b9-a144-e41f7faf5966',
        type: String
    })
    readonly accountId: string;

    @ApiProperty({
        name: 'accountTypeId',
        description: 'The type of account being created. 1 for Checking, 2 for Savings',
        example: 123.45,
        type: Number
    })
    readonly accountTypeId: number;

    @ApiProperty({
        name: 'amount',
        description: 'The starting balance in the account',
        example: 123.45,
        type: Number
    })
    readonly balance: number;

    @ApiProperty({
        name: 'succeeded',
        description: 'If the account creation was successful or not',
        example: true,
        type: Boolean
    })
    readonly succeeded: boolean;

    constructor(
        customerId: string,
        accountId: string,
        accountTypeId: number,
        balance: number,
        succeeded: boolean
    ) {
        this.customerId = customerId;
        this.accountId = accountId;
        this.accountTypeId = accountTypeId;
        this.balance = balance;
        this.succeeded = succeeded;
    }
}