import { ApiProperty } from '@nestjs/swagger';

export class FindTransactionResponseDto {
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

    @ApiProperty({
        name: 'isCompleted',
        description: 'If the transaction is still active at this moment',
        example: true,
        type: Boolean
    })
    readonly isCompleted: boolean;

    @ApiProperty({
        name: 'isCanceled',
        description: 'If the transaction was canceled',
        example: true,
        type: Boolean
    })
    readonly isCanceled: boolean;

    constructor(
        id: string,
        accountId: string,
        customerId: string,
        transactionType: number,
        amount: number,
        isCompleted: boolean,
        isCanceled: boolean
    ) {
        this.id = id;
        this.accountId = accountId;
        this.customerId = customerId;
        this.transactionType = transactionType;
        this.amount = amount;
        this.isCompleted = isCompleted;
        this.isCanceled = isCanceled;
    }

}