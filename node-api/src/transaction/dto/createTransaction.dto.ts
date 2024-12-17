import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsUUID,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsIn
} from 'class-validator'

export class CreateTransactionDto {
    @ApiProperty({
        name: 'id',
        description: 'ID tied to this the account in this transaction',
        example: '0e0c4a11-19de-42b9-a144-e41f7faf5966',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    @IsUUID(4)
    readonly accountId: string;

    @ApiProperty({
        name: 'id',
        description: 'ID tied to this the customer in this transaction',
        example: '0e0c4a11-19de-42b9-a144-e41f7faf5966',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    @IsUUID(4)
    readonly customerId: string;

    @ApiProperty({
        name: 'transactionType',
        description: 'The transaction type. This will be either Deposit (1) or Withdraw (2)',
        example: 'Saving',
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    @IsIn([1,2])
    readonly transactionType: number;

    @ApiProperty({
        name: 'amount',
        description: "The amount involved in the transaction",
        example: 123.45,
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly amount: number;
}

export class CreateTransactionResponseDto {
    @ApiProperty({
        name: 'id',
        description: 'ID tied to this transaction',
        example: '0e0c4a11-19de-42b9-a144-e41f7faf5966',
        type: String
    })
    readonly id: string;

    @ApiProperty({
        name: 'id',
        description: 'ID tied to this the account in this transaction',
        example: '0e0c4a11-19de-42b9-a144-e41f7faf5966',
        type: String
    })
    readonly accountId: string;

    @ApiProperty({
        name: 'id',
        description: 'ID tied to this the customer in this transaction',
        example: '0e0c4a11-19de-42b9-a144-e41f7faf5966',
        type: String
    })
    readonly customerId: string;

    @ApiProperty({
        name: 'transactionType',
        description: 'The transaction type. This will be either Deposit (1) or Withdraw (2)',
        example: 'Saving',
        type: Number
    })
    readonly transactionType: number;

    @ApiProperty({
        name: 'amount',
        description: "The amount involved in the transaction",
        example: 123.45,
        type: Number
    })
    readonly amount: number;

    constructor(
        id: string,
        accountId: string,
        customerId: string,
        transactionType: number,
        amount: number,
    ) {
        this.id = id;
        this.accountId = accountId;
        this.customerId = customerId;
        this.transactionType = transactionType;
        this.amount = amount;
    }

}