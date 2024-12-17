import { ApiProperty } from '@nestjs/swagger';

export class FindAccountResponseDto {
    @ApiProperty({
        name: 'id',
        description: 'ID tied to this account',
        example: '0e0c4a11-19de-42b9-a144-e41f7faf5966',
        type: String
    })
    readonly id: string;

    @ApiProperty({
        name: 'balance',
        description: "The balance remaining in the account",
        example: 123.45,
        type: Number
    })
    readonly balance: number;

    @ApiProperty({
        name: 'accountType',
        description: 'The account type. This will be either Savings or Checking',
        example: 'Saving',
        type: Number
    })
    readonly accountTypeId: number;

    @ApiProperty({
        name: 'isActive',
        description: 'If the account is still active at this moment',
        example: true,
        type: Boolean
    })
    readonly isActive: boolean;

    constructor(
        id: string,
        balance: number,
        accountTypeId: number,
        isActive: boolean
    ) {
        this.id = id;
        this.balance = balance;
        this.accountTypeId = accountTypeId;
        this.isActive = isActive;
    }

}