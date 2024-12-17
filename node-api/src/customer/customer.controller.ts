import { 
  Controller, 
  Get,
  Param,
  HttpStatus,
  NotFoundException,
  Logger,
  ParseUUIDPipe,
  InternalServerErrorException
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindCustomerResponseDto } from './dto/findCustomer.dto';

@Controller('customer')
export class CustomerController {
  private logger = new Logger()
  constructor(private readonly customerService: CustomerService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Find Customer tied to the provided ID'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer found successfully',
    type: FindCustomerResponseDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Customer not found',
    type: NotFoundException
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: InternalServerErrorException
  })
  async findCustomer(
    @Param('id', new ParseUUIDPipe({
      version: '4',
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    })) id: string
  ): Promise<FindCustomerResponseDto> {
    this.logger.log(`GET customer/:id received with id ${id}`)
    this.logger.log(`Querying for Customer ${id}`)
    return await this.customerService.findCustomer(id)
  }
}
