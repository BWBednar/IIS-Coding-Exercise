import { 
  Controller, 
  NotImplementedException, 
  Get,
  Put, 
  Param,
  Body,
  HttpStatus,
  Logger,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  ParseUUIDPipe,
  Post
} from '@nestjs/common';
import { AccountService } from './account.service';
import {
  FindAccountResponseDto
} from './dto/findAccount.dto'
import { 
  DepositAccountDto, 
  DespositAccountResponseDto 
} from './dto/depositAccount.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { WithdrawAccountDto, WithdrawAccountResponseDto } from './dto/withdrawAccount.dto';
import { CloseAccountDto, CloseAccountResponseDto } from './dto/closeAccount.dto';
import { CreateAccountDto, CreateAccountResponseDto } from './dto/createAccount.dto';


@Controller('account')
export class AccountController {
  private logger = new Logger()
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Find an Account tied to the provided ID'
  })
  @ApiParam({
    name: 'id',
    description: 'The ID tied to the account being interacted with'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Account found successfully',
    type: FindAccountResponseDto
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
  async findAccount(
    @Param('id', new ParseUUIDPipe({
      version: '4',
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    })) id: string
  ): Promise<FindAccountResponseDto> {
    this.logger.log(`GET account/:id received with id ${id}`)
    this.logger.log(`Querying for Account ${id}`)
    return await this.accountService.findAccountByAccount(id)
  }

  /**
   * Post endpoint for depositing into an account
   * Tied to Endpoint 1
   */
  @Put('deposit')
  @ApiOperation({
    summary: 'Attempt to add funds to an account tied to a user'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deposit processed successfully',
    type: DespositAccountResponseDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request body. Make sure you deposit a positive amount',
    type: BadRequestException
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not permitted to make a deposit to this account',
    type: UnauthorizedException
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User or Account is not found',
    type: NotFoundException
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: InternalServerErrorException
  })
  async depositAccount(
    @Body() request: DepositAccountDto
  ): Promise<DespositAccountResponseDto> {
    this.logger.log(`Request received at PUT /account/deposit`)
    this.logger.log(`Attempting deposit for account ${request.accountId}`)
    return await this.accountService.depositAccount(request)
  }

  /**
   * Put endpoint for withdraing from an account
   * Tied to Endpoint 2
   */
  @Put('withdraw')
  @ApiOperation({
    summary: 'Attempt to remove funds from an account tied to a user'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Withdraw processed successfully',
    type: DespositAccountResponseDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request body. Make sure you withdraw would not overdraft the account',
    type: BadRequestException
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not permitted to make a withdraw from this account',
    type: UnauthorizedException
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User or Account is not found',
    type: NotFoundException
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: InternalServerErrorException
  })
  async withdrawAccount(
    @Body() request: WithdrawAccountDto
  ): Promise<WithdrawAccountResponseDto> {
    this.logger.log(`Request received at PUT /account/withdraw`)
    this.logger.log(`Attempting withdraw for account ${request.accountId}`)
    return await this.accountService.withdrawAccount(request)
  }

  /**
   * Put endpoint for closing an account
   * Tied to Endpoint 3
   */
  @Put('close')
  @ApiOperation({
    summary: 'Attempt to remove funds from an account tied to a user'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Account closed processed successfully',
    type: DespositAccountResponseDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request body.',
    type: BadRequestException
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not permitted to close this account',
    type: UnauthorizedException
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User or Account is not found',
    type: NotFoundException
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: InternalServerErrorException
  })
  async closeAccount(
    @Body() request: CloseAccountDto
  ): Promise<CloseAccountResponseDto> {
    this.logger.log(`Request received at PUT /account/close`)
    this.logger.log(`Attempting account closure for account ${request.accountId}`)
    return await this.accountService.closeAccount(request)
  }

  /**
   * Put endpoint for closing an account
   * Tied to Endpoint 3
   */
  @Post('')
  @ApiOperation({
    summary: 'Attempt to create an account tied to a user'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Account created successfully',
    type: DespositAccountResponseDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request body. Make sure you initial deposit is above 100.00',
    type: BadRequestException
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User is not permitted to create the account',
    type: UnauthorizedException
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User is not found',
    type: NotFoundException
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: InternalServerErrorException
  })
  async createAccount(
    @Body() request: CreateAccountDto
  ): Promise<CreateAccountResponseDto> {
    this.logger.log(`Request received at POST /account`)
    this.logger.log(`Attempting to create an account for Customer ${request.customerId}`)
    return await this.accountService.createAccount(request)
  }
}
