import { 
  Controller, 
  Get, 
  Param,
  HttpStatus,
  Logger,
  NotFoundException,
  InternalServerErrorException,
  ParseUUIDPipe
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindTransactionResponseDto } from './dto/findTransaction.dto'

@Controller('transaction')
export class TransactionController {
  private logger = new Logger()
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Find an Transaction tied to the provided ID'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Account found successfully',
    type: FindTransactionResponseDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Account not found',
    type: NotFoundException
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: InternalServerErrorException
  })
  async findTransaction(
    @Param('id', new ParseUUIDPipe({
      version: '4',
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    })) id: string
  ): Promise<FindTransactionResponseDto> {
    this.logger.log(`GET transaction/:id received with id ${id}`)
    this.logger.log(`Querying for Transaction ${id}`)
    return await this.transactionService.findTransaction(id)
  }
}
