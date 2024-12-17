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

describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;
  let customerService: CustomerService;

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
  });

  describe('accountControler', () => {
    it('should be defined', () => {
      expect(accountController).toBeDefined();
    })

    describe('findAccount', () => {
      const referenceAccount = testAccountCollection[0];
      const result: FindAccountResponseDto = new FindAccountResponseDto(
        testAccountCollection[0].id,
        testAccountCollection[0].balance,
        testAccountCollection[0].accountTypeId,
        testAccountCollection[0].isActive
      )
      it('should call accountService.findAccount', async () => {
        await accountController.findAccount(referenceAccount.id)
        expect(accountService.findAccountByAccount).toHaveBeenCalled
        expect(accountService.findAccountByAccount).toHaveBeenCalledWith(referenceAccount.id)
      })

      it('should return result if present', async () => {
        const callResult = await accountController.findAccount(referenceAccount.id)
        expect(callResult).toBe(result);
      })

      it('should throw an error if not found', async () => {
        try {
          await accountController.findAccount('')
        } catch (error) {
          expect(error.status).toBe(HttpStatus.NOT_FOUND)
        }
      })

      it('should throw a default error for unexpected situations', async () => {
        jest.spyOn(accountService, 'findAccountByAccount').mockImplementation(async () => {throw new InternalServerErrorException()})
        try {
          await accountController.findAccount(referenceAccount.id)
        } catch (error) {
          expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
        }
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
    //     jest.spyOn(accountService, 'withdrawAccount').mockImplementation(async () => result)
    //     const callResult = await accountController.withdrawAccount(input)
    //     expect(accountService.withdrawAccount).toHaveBeenCalled()
    //     expect(accountService.withdrawAccount).toHaveBeenCalledWith(input)
    //   })

    //   it('should return result if input is correct', async () => {
    //     jest.spyOn(accountService, 'withdrawAccount').mockImplementation(async () => result)
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
      //   jest.spyOn(accountService, 'findAccountByAccount').mockImplementation(async () => {throw new BadRequestException()})
      //   try {
      //     await accountController.withdrawAccount(badInput)
      //   } catch (error) {
      //     expect(error.status).toBe(HttpStatus.BAD_REQUEST)
      //   }
      // })

      // it('should throw a default error for unexpected situations', async () => {
      //   jest.spyOn(accountService, 'findAccountByAccount').mockImplementation(async () => {throw new InternalServerErrorException()})
      //   try {
      //     await accountController.findAccount(referenceAccount.id)
      //   } catch (error) {
      //     expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
      //   }
      // })
    //})

  });
});
