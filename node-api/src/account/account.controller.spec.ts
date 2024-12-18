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

    describe('depositAccount', () => {

      const referenceAccount: Account = testAccountCollection[0];
      const referenceCustomer: Customer = {
        id: referenceAccount.customerId,
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        isActive: true,
        createdOn: new Date(),
        createdBy: '',
        updatedBy: '',
        updatedOn: new Date()
      }
      const input: DepositAccountDto = {
        customerId: testAccountCollection[0].customerId,
        accountId: testAccountCollection[0].id,
        amount: 10
      }
      const result: DespositAccountResponseDto = new DespositAccountResponseDto(
        testAccountCollection[0].customerId,
        testAccountCollection[0].id,
        testAccountCollection[0].balance + 10,
        true
      )

      it('should call accountService.depositAccount', async () => {
        await accountController.depositAccount(input)
        expect(accountService.depositAccount).toHaveBeenCalled
      })

      it('should return the expected balance', async () => {
        jest.spyOn(customerService, 'queryCustomerTable').mockResolvedValueOnce( referenceCustomer )
        jest.spyOn(transactionSerivce, 'createTransaction').mockResolvedValueOnce(new CreateTransactionResponseDto(
          v4(),
          testAccountCollection[0].id,
          testAccountCollection[0].customerId,
          2,
          input.amount
        )) // not concerned about this output here
        jest.spyOn(transactionSerivce, 'completeTransaction').mockResolvedValueOnce(undefined)
        console.log(input)
        console.log(testAccountCollection[0])
        const callResult = await accountController.depositAccount(input) 
        expect(JSON.stringify(callResult)).toBe(JSON.stringify(result))
      })

      it('should fail if the account does not belong to the customer', () => {

      })

      it('should fail if the account is inactive', () => {

      })

      it('should fail if the customer is inactive', () => {

      })

      it('should fail if the balance is less than 0', () => {

      })

      it('should throw a default error if something unexpected happens', () => {

      })
    })

    // describe('withdrawAccount', () => {
    //   const referenceAccount = testSavingsAccount;
    //   const input: WithdrawAccountDto = {
    //     customerId: referenceAccount.customerId,
    //     accountId: referenceAccount.id,
    //     amount: 12.34
    //   }
    //   const badInput: WithdrawAccountDto = {
    //     customerId: referenceAccount.customerId,
    //     accountId: referenceAccount.id,
    //     amount: -1
    //   }
    //   const result: WithdrawAccountResponseDto = new WithdrawAccountResponseDto(
    //     referenceAccount.customerId,
    //     referenceAccount.id,
    //     111.11, // 123.45 - 12.34
    //     true
    //   )
    //   it('should call accountService.withdrawAccount', async () => {
    //     jest.spyOn(accountService, 'withdrawAccount').mockImplementationOnce(async () => result)
    //     const callResult = await accountController.withdrawAccount(input)
    //     expect(accountService.withdrawAccount).toHaveBeenCalled()
    //     expect(accountService.withdrawAccount).toHaveBeenCalledWith(input)
    //   })

    //   it('should return result if input is correct', async () => {
    //     jest.spyOn(accountService, 'withdrawAccount').mockImplementationOnce(async () => result)
    //     const callResult = await accountController.withdrawAccount(input)
    //     expect(callResult).toBe(result);
    //   })

    //   it('should throw an error if value is negative', async () => {
    //     jest.spyOn
    //     try {
    //       await accountController.withdrawAccount(badInput)
    //     } catch (error) {
    //       expect(error.status).toBe(HttpStatus.BAD_REQUEST)
    //     }
    //   })

      // it('should throw an error if the customer is does not own the account', async () => {
      //   jest.spyOn(accountService, )
      //   jest.spyOn(accountService, 'findAccountByAccount').mockImplementationOnce(async () => {throw new BadRequestException()})
      //   try {
      //     await accountController.withdrawAccount(badInput)
      //   } catch (error) {
      //     expect(error.status).toBe(HttpStatus.BAD_REQUEST)
      //   }
      // })

      // it('should throw a default error for unexpected situations', async () => {
      //   jest.spyOn(accountService, 'findAccountByAccount').mockImplementationOnce(async () => {throw new InternalServerErrorException()})
      //   try {
      //     await accountController.findAccount(referenceAccount.id)
      //   } catch (error) {
      //     expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
      //   }
      // })
    //})

  });
});
