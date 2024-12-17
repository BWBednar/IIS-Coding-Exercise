import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsUUID,
    IsNotEmpty,
} from 'class-validator'

export class FindCustomerResponseDto {
    @ApiProperty({
        name: 'id',
        description: 'ID tied to this customer',
        example: '0e0c4a11-19de-42b9-a144-e41f7faf5966',
        type: String
    })
    readonly id: string;

    @ApiProperty({
        name: 'firstname',
        description: 'First name of the Customer',
        example: '0e0c4a11-19de-42b9-a144-e41f7faf5966',
        type: String
    })
    readonly firstname: string;

    @ApiProperty({
        name: 'middleName',
        description: 'Middle name of the Customer',
        example: 'John',
        type: String
    })
    readonly middleName: string;

    @ApiProperty({
        name: 'lastname',
        description: 'Last name of the Customer',
        example: 'Doe',
        type: String
    })
    readonly lastname: string;

    @ApiProperty({
        name: 'email',
        description: 'Email of the Customer',
        example: 'customer@gmail.com',
        type: String
    })
    readonly email: string;

    @ApiProperty({
        name: 'isActive',
        description: 'If the account is still active at this moment',
        example: true,
        type: Boolean
    })
    readonly isActive: boolean;

    constructor(
        id: string,
        firstname: string,
        middleName: string,
        lastName: string,
        isActive: boolean
    ) {
        this.id = id;
        this.firstname = firstname;
        this.middleName = middleName;
        this.lastname = lastName;
        this.isActive = isActive;
    }

}