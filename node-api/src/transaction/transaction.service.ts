import { 
  Injectable, 
  Logger, 
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindTransactionResponseDto } from './dto/findTransaction.dto';
import { Transaction } from '../../src/types/transaction';
import { v4 } from 'uuid'
import { CreateTransactionDto, CreateTransactionResponseDto } from './dto/createTransaction.dto';


// User to simulate the database for Transactions
import { testTransactionCollection } from '../../models/test-models/test-transaction';
import { UpdateTransactionResponseDto } from './dto/updateTransaction.dto';


@Injectable()
export class TransactionService {
  private logger = new Logger()

  /**
   * Query the Transaction table for the relevant entry
   * @param id The ID of interest
   * @returns Either the data for a singular entry
   */
  async queryTransactionTable(id?: string) {
    try {
      // This would be where to check the connection to the database is not having any issues if needed
      if (testTransactionCollection === undefined) throw new InternalServerErrorException();
      // This would be a database call for the data, but using simulated data here
      const transaction: Transaction = testTransactionCollection.find((transaction: Transaction) => transaction.id === id)
      if (transaction === undefined) throw new NotFoundException(`${id} not found`)
      return transaction
    } catch (error) {
      if (error) throw error;
      this.logger.error(`Error while querying customers: ${error}`)
      throw new InternalServerErrorException(`Internal error in querying for ${id}`)    
    }
  }

  /**
   * Query for a specific transaction entry
   * @param id The id tied to the transaction entry being searched for
   * @returns The transaction information, if found
   */
  async findTransaction(id: string): Promise<FindTransactionResponseDto> {
    try {
      const transaction: Transaction = await this.queryTransactionTable(id);
      const response: FindTransactionResponseDto = new FindTransactionResponseDto(
        transaction.id,
        transaction.accountId,
        transaction.customerId,
        transaction.transactionType,
        transaction.amount,
        transaction.isCompleted,
        transaction.isCanceled
      )
      this.logger.log(`Transaction ${id} found. Returning to requestor`);
      return response;
    } catch (error) {
      if (error) throw error;
      this.logger.error(`Error while querying transactions: ${error}`)
      throw new InternalServerErrorException(`Internal error in querying for ${id}`)
    }
  }

  /**
   * Create a transaction entry for tracking a transaction
   * @param request The DTO to create the transaction
   * @returns The transaction that is created
   */
  async createTransaction(request: CreateTransactionDto): Promise<CreateTransactionResponseDto> {
    try {
      // This would be a call to create a new entry in the Transaction Table
      const newTransaction: Transaction = {
        id: v4(),
        accountId: request.accountId,
        customerId: request.customerId,
        transactionType: request.transactionType,
        amount: request.amount,
        isCompleted: false,
        isCanceled: false,
        createdOn: new Date(),
        createdBy: request.customerId, // this would be the user making the call
        updatedOn: new Date(),
        updatedBy: request.customerId // this would be the user making the call
      }
      testTransactionCollection.push(newTransaction)
      const response: CreateTransactionResponseDto = new CreateTransactionResponseDto(
        newTransaction.id,
        newTransaction.accountId,
        newTransaction.customerId,
        newTransaction.transactionType,
        newTransaction.amount
      )
      return response;
    } catch (error) {
      if (error) throw error;
      this.logger.log(`Error while creating transaction: ${error}`)
      throw new InternalServerErrorException(`Internal error in creating transaction`)
    }
  }

  /**
   * Mark a transaction entry as complete
   * @param id The id of the transaction being editted
   * @returns The result of the transaction being marked complete
   */
  async completeTransaction(id: string): Promise<UpdateTransactionResponseDto>{
    try {
      await this.queryTransactionTable(id);
      // This would actual update the isCompleted field for the entry, but just simulating here
      testTransactionCollection.map((entry: Transaction) => {
        if(entry.id === id) entry.isCompleted = true;
      })
      const response: UpdateTransactionResponseDto = new UpdateTransactionResponseDto(
        id,
        true,
        false
      )
      return response;
    } catch (error) {
      if (error) throw error;
      this.logger.log(`Error while updating transaction: ${error}`)
      throw new InternalServerErrorException(`Internal error in updating transaction`)
    }
  }

  /**
   * Mark a transaction as canceled and complete
   * @param id The transaction being updated
   * @returns The result of updating the transaction as canceled
   */
  async cancelTransaction(id: string): Promise<UpdateTransactionResponseDto> {
    try {
      await this.queryTransactionTable(id);
      // This would actual update the isCompleted field for the entry, but just simulating here
      testTransactionCollection.map((entry: Transaction) => {
        if(entry.id === id) {
          entry.isCompleted = true;
          entry.isCanceled = true;
        }
      })
      const response: UpdateTransactionResponseDto = new UpdateTransactionResponseDto(
        id,
        true,
        true
      )
      return response;
    } catch (error) {
      if (error) throw error;
      this.logger.log(`Error while updating transaction: ${error}`)
      throw new InternalServerErrorException(`Internal error in updating transaction`)
    }
  }
}
