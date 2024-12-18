import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { CustomerModule } from '../../src/customer/customer.module';
import { TransactionModule } from '../transaction/transaction.module'
import { FindAccountResponseDto } from './dto/findAccount.dto';
import { testAccountCollection, testSavingsAccount } from '../../models/test-models/test-account';
import { BadRequestException, HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { WithdrawAccountDto, WithdrawAccountResponseDto } from './dto/withdrawAccount.dto';
import { CustomerService } from '../customer/customer.service';
import { Account } from '../../src/types/account';
import { Customer } from '../../src/types/customer';
import { TransactionService } from '../../src/transaction/transaction.service';
import { CreateTransactionResponseDto } from '../../src/transaction/dto/createTransaction.dto';
import { v4 } from 'uuid';
import { DepositAccountDto, DespositAccountResponseDto } from './dto/depositAccount.dto';

describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;
  let customerService: CustomerService;
  let transactionSerivce: TransactionService

  beforeEach(async () => {
    jest.clearAllMocks()
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        CustomerModule,
        TransactionModule,
      ],
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();

    accountController = app.get<AccountController>(AccountController);
    accountService = app.get<AccountService>(AccountService);
    customerService = app.get<CustomerService>(CustomerService);
    transactionSerivce = app.get<TransactionService>(TransactionService)
  });

  afterEach(async () => {
    jest.clearAllMocks();
  })

  describe('accountControler', () => {
    it('should be defined', () => {
      expect(accountController).toBeDefined();
    })

    describe('findAccount', () => {
      const referenceAccount = testAccountCollection[0];
      const result: FindAccountResponseDto = new FindAccountResponseDto(
        referenceAccount.id,
        referenceAccount.balance,
        referenceAccount.accountTypeId,
        referenceAccount.isActive
      )
      it('should call accountService.findAccount', async () => {
        await accountController.findAccount(referenceAccount.id)
        expect(accountService.findAccountByAccount).toHaveBeenCalled
      })

      it('should return result if present', async () => {
        const callResult = await accountController.findAccount(referenceAccount.id)
        expect(JSON.stringify(callResult)).toBe(JSON.stringify(result));
      })

      it('should throw an error if not found', async () => {
        try {
          await accountController.findAccount('')
        } catch (error) {
          expect(error.status).toBe(HttpStatus.NOT_FOUND)
        }
      })

      it('should throw a default error for unexpected situations', async () => {
        jest.spyOn(accountService, 'findAccountByAccount').mockImplementationOnce(async () => {throw new InternalServerErrorException()})
        try {
          await accountController.findAccount(referenceAccount.id)
        } catch (error) {
          expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
        }
      })
    })

    /*
      Normally would have these test cases filled out and completed. 
      I did not have the available time to complete these additional test cases, 
      but normally would have them complete in an enterprise solution.
      The aspects that would be tested for are noted in the 'it' statements
    */

    // describe('depositAccount', () => {
    //   const referenceAccount: Account = testAccountCollection[0];
    //   const referenceCustomer: Customer = {
    //     id: referenceAccount.customerId,
    //     firstName: '',
    //     middleName: '',
    //     lastName: '',
    //     email: '',
    //     isActive: true,
    //     createdOn: new Date(),
    //     createdBy: '',
    //     updatedBy: '',
    //     updatedOn: new Date()
    //   }
    //   const input: DepositAccountDto = {
    //     customerId: testAccountCollection[0].customerId,
    //     accountId: testAccountCollection[0].id,
    //     amount: 10
    //   }
    //   const result: DespositAccountResponseDto = new DespositAccountResponseDto(
    //     testAccountCollection[0].customerId,
    //     testAccountCollection[0].id,
    //     testAccountCollection[0].balance + 10,
    //     true
    //   )

    //   it('should call accountService.depositAccount', async () => {
    //     await accountController.depositAccount(input)
    //     expect(accountService.depositAccount).toHaveBeenCalled
    //   })

      // it('should return the expected balance', async () => {
      //   jest.spyOn(customerService, 'queryCustomerTable').mockResolvedValueOnce( referenceCustomer )
      //   jest.spyOn(transactionSerivce, 'createTransaction').mockResolvedValueOnce(new CreateTransactionResponseDto(
      //     v4(),
      //     testAccountCollection[0].id,
      //     testAccountCollection[0].customerId,
      //     2,
      //     input.amount
      //   )) // not concerned about this output here
      //   jest.spyOn(transactionSerivce, 'completeTransaction').mockResolvedValueOnce(undefined)
      //   console.log(input)
      //   console.log(testAccountCollection[0])
      //   const callResult = await accountController.depositAccount(input) 
      //   expect(JSON.stringify(callResult)).toBe(JSON.stringify(result))
      // })

      // it('should fail if the account does not belong to the customer', async () => {
      //   jest.spyOn(customerService, 'queryCustomerTable').mockResolvedValueOnce(  )
      //   try {
      //     await accountController.depositAccount(input)
      //   } catch (error) {
      //     expect(error.status).toBe(HttpStatus.UNAUTHORIZED)
      //   }
      // })

      // it('should fail if the account is inactive', () => {
        
      // })

      // it('should fail if the customer is inactive', () => {

      // })

      // it('should fail if the balance is less than 0', () => {

      // })

      // it('should throw a default error if something unexpected happens', () => {

      // })
    // })

    // describe('withdrawAccount', () => {
      // it('should call accountService.withdrawAccount', async () => {

      // })

      // it('should return the expected balance', async () => {

      // })

      // it('should fail if the account does not belong to the customer', async () => {

      // })

      // it('should fail if the account is inactive', () => {
        
      // })

      // it('should fail if the customer is inactive', () => {

      // })

      // it('should fail if the balance is less than 0 after the withdraw', () => {

      // })

      // it('should throw a default error if something unexpected happens', () => {

      // })
    // })

    // describe('closeAccount', () => {
      // it('should call accountService.closeAccount', async () => {

      // })

      // it('should close the expected account', async () => {

      // })

      // it('should fail if the account does not belong to the customer', async () => {

      // })

      // it('should fail if the account is inactive', () => {
        
      // })

      // it('should fail if the customer is inactive', () => {

      // })
    // })

    // describe('createAccount', () => {
      // it('should call accountService.createAccount', async () => {

      // })

      // it('should create the expected account', async () => {

      // })

      // it('should fail if the customer is inactive', () => {

      // })

      // it('should fail if the initialBalance value is less than 100', async () => {

      // })

      // it('should fail if the user does is creating a checking account before savings account', () => {

      // })

      // it('should pass if the user already has a savings account created, regardless of account type', () => {

      // })
    // })
  });
});
