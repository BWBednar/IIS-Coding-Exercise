import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { 
  testCompleteDeposit,
} from '../../models/test-models/test-transaction';
import { FindTransactionResponseDto } from './dto/findTransaction.dto';
import { HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('TransactionController', () => {
  let transactionController: TransactionController;
  let transactionService: TransactionService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService],
    }).compile();

    transactionController = app.get<TransactionController>(TransactionController);
    transactionService = app.get<TransactionService>(TransactionService);
  });

  afterEach(async () => {
    jest.resetAllMocks();
  })

  describe('transactionController', () => {
    it('should be defined', () => {
      expect(transactionController).toBeDefined();
    });

    describe('findTransaction', () => {
      const referenceTransaction = testCompleteDeposit
      const result: FindTransactionResponseDto = new FindTransactionResponseDto(
        referenceTransaction.id,
        referenceTransaction.accountId,
        referenceTransaction.customerId,
        referenceTransaction.transactionType,
        referenceTransaction.amount,
        referenceTransaction.isCompleted,
        referenceTransaction.isCanceled
      )
      it('should call transactionService.findTransaction', async () => {
        jest.spyOn(transactionService, 'findTransaction').mockImplementation(async () => result)
        const callResult = await transactionController.findTransaction(referenceTransaction.id)
        expect(transactionService.findTransaction).toHaveBeenCalled()
      })

      it('should return result if present', async () => {
        jest.spyOn(transactionService, 'findTransaction').mockImplementation(async () => result)
        const callResult = await transactionController.findTransaction(referenceTransaction.id)
        expect(callResult).toBe(result);
      })

      it('should throw an error if not found', async () => {
        jest.spyOn(transactionService, 'findTransaction').mockImplementation(async () => {throw new NotFoundException()})
        try {
          await transactionController.findTransaction(referenceTransaction.id)
        } catch (error) {
          expect(error.status).toBe(HttpStatus.NOT_FOUND)
        }
      })

      it('should throw a default error for unexpected situations', async () => {
        jest.spyOn(transactionService, 'findTransaction').mockImplementation(async () => {throw new InternalServerErrorException()})
        try {
          await transactionController.findTransaction(referenceTransaction.id)
        } catch (error) {
          expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
        }
      })
    })
  });
});
