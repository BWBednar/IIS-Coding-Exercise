import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsUUID,
    IsNotEmpty,
    IsNumber,
    IsPositive
} from 'class-validator'

/**
 * DTO for withdraw from accounts. All fields are required
 */
export class WithdrawAccountDto {
    @ApiProperty({
        name: 'customerId',
        description: 'ID tied to the customer trying to access this account',
        example: '0e0c4a11-19de-42b9-a144-e41f7faf5966',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    @IsUUID(4)
    readonly customerId: string;

    @ApiProperty({
        name: 'accountId',
        description: 'ID tied to the account trying to be accessed',
        example: '0e0c4a11-19de-42b9-a144-e41f7faf5966',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    @IsUUID(4)
    readonly accountId: string;

    @ApiProperty({
        name: 'amount',
        description: 'The amount trying to be removed from the account by the customer',
        example: 123.45,
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly amount: number;
}

/**
 * DTO for the withdraw response to be sent from the API to the UI
 */
export class WithdrawAccountResponseDto {
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
        name: 'amount',
        description: 'The resulting balance in the account',
        example: 123.45,
        type: Number
    })
    readonly balance: number;

    @ApiProperty({
        name: 'succeeded',
        description: 'If the deposit was successful or not',
        example: true,
        type: Boolean
    })
    readonly succeeded: boolean;

    constructor(
        customerId: string,
        accountId: string,
        balance: number,
        succeeded: boolean
    ) {
        this.customerId = customerId;
        this.accountId = accountId;
        this.balance = balance;
        this.succeeded = succeeded;
    }
}