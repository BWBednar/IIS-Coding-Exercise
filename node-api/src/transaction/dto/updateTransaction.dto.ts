import { ApiProperty } from "@nestjs/swagger";

export class UpdateTransactionResponseDto {
    @ApiProperty({
        name: 'id',
        description: 'ID tied to this transaction',
        example: '0e0c4a11-19de-42b9-a144-e41f7faf5966',
        type: String
    })
    readonly id: string;

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
        isCompleted: boolean,
        isCanceled: boolean
    ) {
        this.id = id;
        this.isCompleted = isCompleted;
        this.isCanceled = isCanceled;
    }
}