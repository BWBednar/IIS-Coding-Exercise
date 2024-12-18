import { 
  Injectable, 
  Logger, 
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
  GoneException
} from '@nestjs/common';
import { FindAccountResponseDto } from './dto/findAccount.dto';
import { DepositAccountDto, DespositAccountResponseDto } from './dto/depositAccount.dto';

import { Account } from '../types/account'
import { Customer } from '../types/customer'
import { CustomerService } from '../customer/customer.service';
import { TransactionService } from '../transaction/transaction.service';
import { WithdrawAccountDto, WithdrawAccountResponseDto } from './dto/withdrawAccount.dto';
import { CreateTransactionResponseDto } from '../transaction/dto/createTransaction.dto';
import { CloseAccountDto, CloseAccountResponseDto } from './dto/closeAccount.dto';
import { CreateAccountDto, CreateAccountResponseDto } from './dto/createAccount.dto';
import { v4 } from 'uuid';

// Used to simulate the database for Accounts
import { testAccountCollection } from '../../models/test-models/test-account'



@Injectable()
export class AccountService {
  private logger = new Logger()
  
  constructor(
    // Connection to customer service for database
    private readonly customerService: CustomerService,
    // Connection to transaction service for database
    private readonly transactionService: TransactionService
  ) {}

  /**
   * Query the Account table for the relevant entry
   * @param id The ID of interest
   * @returns The data for a singular entry
   */
  async queryAccountTableByAccount(id: string): Promise<Account> {
    try {
      // This would be where to check the connection to the database is not having any issues if needed
      if (testAccountCollection === undefined) throw new InternalServerErrorException();
      // This would be a database call for the data, but using simulated data here
      const account: Account = testAccountCollection.find((account: Account) => account.id === id)
      if (account === undefined) throw new NotFoundException(`${id} not found`)
      return account
    } catch (error) {
      if (error) throw error;
      this.logger.error(`Error while querying customers: ${error}`)
      throw new InternalServerErrorException(`Internal error in querying for ${id}`)    
    }
  }

  /**
   * Get all accounts tied to the User ID
   * @param id The user ID tied to any accounts
   * @returns A list of accounts tied to the user ID
   */
  async queryAccountTableByUser(id: string): Promise<Account[]> {
    try {
      // This would be where to check the connection to the database is not having any issues if needed
      if (testAccountCollection === undefined) throw new InternalServerErrorException();
      // This would be a database call for the data, but using simulated data here
      const accounts: Account[] = testAccountCollection.filter((account: Account) => account.customerId === id)
      if (accounts === undefined) throw new NotFoundException(`No accounts tied to specified Customer`)
      return accounts
    } catch (error) {
      if (error) throw error;
      this.logger.error(`Error while querying customers: ${error}`)
      throw new InternalServerErrorException(`Internal error in querying for ${id}`)    
    }
  }

  /**
   * Query the Account table for the UUID of interest
   * Note: Query is simulated from a JSON object of premade accounts
   * @param id The UUID of the account being searched for
   * @returns The filtered account data with the relevant details for the requestor
   */
  async findAccountByAccount(id: string): Promise<FindAccountResponseDto> {
    try {
      const account: Account = await this.queryAccountTableByAccount(id)
      const response: FindAccountResponseDto = new FindAccountResponseDto(
        account.id,
        account.balance,
        account.accountTypeId,
        account.isActive
      )
      this.logger.log(`Account ${id} found. Returning to requestor`)
      return response;
    } catch (error) {
      if (error) throw error;
      this.logger.error(`Error while querying customers: ${error}`)
      throw new InternalServerErrorException(`Internal error in querying for ${id}`)    
    }
  }

  /**
   * Validate the user can make the requested deposit and update the account balance
   * @param request The request payload containing the information to process the deposit
   * @returns The result of the deposit to the account
   */
  async depositAccount(request: DepositAccountDto): Promise<DespositAccountResponseDto>{
    let transaction: CreateTransactionResponseDto;
    try {
      const customer: Customer = await this.customerService.queryCustomerTable(request.customerId)
      const account: Account = await this.queryAccountTableByAccount(request.accountId)
      if (customer.id !== account.customerId) throw new UnauthorizedException(`Invalid permissions. Please contact the account owner`);
      if (!customer.isActive || !account.isActive) throw new GoneException(`Account ${account.id} or Customer ${customer.id} are no longer active`)
      if (request.amount <= 0) throw new BadRequestException(`Desposits of positive amounts of money are required`);
      
      // Create a transaction entry for logging the action being taken
      transaction = await this.transactionService.createTransaction({
        accountId: account.id,
        customerId: customer.id,
        transactionType: 1,
        amount: request.amount
      })
      
      // This would be an actual database call to update the value
      const balance = account.balance += request.amount
      testAccountCollection.map((entry: Account) => {
        if (entry.id === account.id) entry.balance += request.amount
      })
        
      // Mark the previously created transaction entry completed if successful
      await this.transactionService.completeTransaction(transaction.id)

      const response: DespositAccountResponseDto = new DespositAccountResponseDto(
        customer.id,
        account.id,
        balance,
        true
      )
      return response;
    } catch (error) {
      if (error) throw error;
      if(transaction !== undefined) this.transactionService.cancelTransaction(transaction.id)
      this.logger.log(`Interal error in processing deposit. ${error}`)
      throw new InternalServerErrorException(`Internal error in processing deposit`)    
    }
  }

  /**
   * Validate the user can make the requested withdraw and update the account balance
   * @param request The request payload containing the information to process the withdraw
   * @returns The result of the withdraw from the account
   */
  async withdrawAccount(request: WithdrawAccountDto): Promise<WithdrawAccountResponseDto>{
    let transaction: CreateTransactionResponseDto;
    try {
      const customer: Customer = await this.customerService.queryCustomerTable(request.customerId)
      const account: Account = await this.queryAccountTableByAccount(request.accountId)
      if (customer.id !== account.customerId) throw new UnauthorizedException(`Invalid permissions. Please contact the account owner`);
      if (!customer.isActive || !account.isActive) throw new GoneException(`Account ${account.id} or Customer ${customer.id} are no longer active`);
      if (request.amount < 0) throw new BadRequestException(`Withdraw amount must be a positive number`);
      if (account.balance - request.amount < 0) throw new BadRequestException(`Withdraw would result in an overdraft`);
      
      // Create a transaction entry for logging the action being taken
      transaction = await this.transactionService.createTransaction({
        accountId: account.id,
        customerId: customer.id,
        transactionType: 2,
        amount: request.amount
      })
      
      // This would be an actual database call to update the value
      const balance = account.balance -= request.amount
      // Would update the database entry with the new balance here. Simulating here
      testAccountCollection.map((entry: Account) => {
        if (entry.id === account.id) entry.balance -= request.amount
      })
      
      // Mark the previously created transaction entry completed if successful
      await this.transactionService.completeTransaction(transaction.id)

      const response: WithdrawAccountResponseDto = new WithdrawAccountResponseDto(
        customer.id,
        account.id,
        balance,
        true
      )
      return response;
    } catch (error) {
      if (error) throw error;
      if(transaction !== undefined) this.transactionService.cancelTransaction(transaction.id)
      this.logger.log(`Interal error in processing deposit. ${error}`)
      throw new InternalServerErrorException(`Internal error in processing deposit`)    
    }
  }

  /**
   * Close the Account tied to the User
   * @param request The DTO containing the request body
   * @returns The result of closing the account
   */
  async closeAccount(request: CloseAccountDto): Promise<CloseAccountResponseDto> {
    try {
      const customer: Customer = await this.customerService.queryCustomerTable(request.customerId)
      const account: Account = await this.queryAccountTableByAccount(request.accountId)
      if (customer.id !== account.customerId) throw new UnauthorizedException(`Invalid permissions. Please contact the account owner`);
      if (!customer.isActive || !account.isActive) throw new GoneException(`Account ${account.id} or Customer ${customer.id} are no longer active`);
      // Would update the database entry with the isActive field being set to false. Simulating here
      testAccountCollection.map((entry: Account) => {
        if (entry.id === account.id) entry.isActive = false;
      })
      const response: CloseAccountResponseDto = new CloseAccountResponseDto(
        customer.id,
        account.id,
        true
      )
      return response;
    } catch (error) {
      if (error) throw error;
      this.logger.log(`Interal error in processing deposit. ${error}`)
      throw new InternalServerErrorException(`Internal error in processing deposit`) 
    }
  }

  /**
   * Create a new Account entry
   * @param request The request DTO object
   * @returns The result of the account creation
   */
  async createAccount(request: CreateAccountDto): Promise<CreateAccountResponseDto> {
    try {
      const customer: Customer = await this.customerService.queryCustomerTable(request.customerId);
      const alreadyCreatedAccounts: Account[] = await this.queryAccountTableByUser(request.customerId);
      if (!customer.isActive) throw new GoneException(`Customer ${customer.id} is no longer active`);
      if (request.initialDeposit < 100) throw new BadRequestException(`Initial account creation must be for 100 or more dollars`);
      if (alreadyCreatedAccounts.length < 1) {
        if (request.accountTypeId !== 2) throw new BadRequestException(`This is the first account for this customer. It must be a Savings account`);
      }
      
      // This would be creating a new database entry. Simulating here
      const newAccount: Account = {
        id: v4(),
        customerId: customer.id,
        balance: request.initialDeposit,
        accountTypeId: request.accountTypeId,
        isActive: true,
        createdOn: new Date(),
        createdBy: customer.id,
        updatedOn: new Date(),
        updatedBy: customer.id
      }
      testAccountCollection.push(newAccount);

      const response: CreateAccountResponseDto = new CreateAccountResponseDto(
        customer.id,
        newAccount.id,
        request.accountTypeId,
        newAccount.balance,
        true
      )
      return response;
    } catch (error) {
      if (error) throw error;
      this.logger.log(`Interal error in processing deposit. ${error}`)
      throw new InternalServerErrorException(`Internal error in processing deposit`) 
    }
  }
}
