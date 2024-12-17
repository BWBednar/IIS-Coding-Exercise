import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsUUID,
    IsNotEmpty,
} from 'class-validator'

/**
 * DTO for clossing an account. All fields are required
 */
export class CloseAccountDto {
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
}

/**
 * DTO for the withdraw response to be sent from the API to the UI
 */
export class CloseAccountResponseDto {
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
        name: 'succeeded',
        description: 'If closing the account was successful or not',
        example: true,
        type: Boolean
    })
    readonly succeeded: boolean;

    constructor(
        customerId: string,
        accountId: string,
        succeeded: boolean
    ) {
        this.customerId = customerId;
        this.accountId = accountId;
        this.succeeded = succeeded;
    }
}