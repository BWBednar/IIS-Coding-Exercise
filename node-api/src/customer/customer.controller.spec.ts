import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { 
  testCustomerCollection,
  testUser
} from '../../models/test-models/test-customer'
import { FindCustomerResponseDto } from './dto/findCustomer.dto';
import { HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('CustomerController', () => {
  let customerController: CustomerController;
  let customerService: CustomerService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService],
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
    customerService = app.get<CustomerService>(CustomerService);
  });

  afterEach(async () => {
    jest.resetAllMocks();
  })

  describe('customerController', () => {
    it('should be defined', () => {
      expect(CustomerController).toBeDefined();
    });

    describe('findCustomer', () => {
      const referenceCustomer = testCustomerCollection[0];
      const result: FindCustomerResponseDto = new FindCustomerResponseDto(
        testCustomerCollection[0].id,
        testCustomerCollection[0].firstName,
        testCustomerCollection[0].middleName,
        testCustomerCollection[0].lastName,
        testCustomerCollection[0].isActive
      )
      it('should call customerService.findCustomer', async () => {
        await customerController.findCustomer(referenceCustomer.id)
        expect(customerService.findCustomer).toHaveBeenCalled
      })

      it('should return result if present', async () => {
        const callResult = await customerController.findCustomer(referenceCustomer.id)
        expect(JSON.stringify(callResult)).toBe(JSON.stringify(result));
      })

      it('should throw an error if not found', async () => {
        try {
          await customerController.findCustomer('')
        } catch (error) {
          expect(error.status).toBe(HttpStatus.NOT_FOUND)
        }
      })

      it('should throw a default error for unexpected situations', async () => {
        jest.spyOn(customerService, 'findCustomer').mockImplementationOnce(async () => {throw new InternalServerErrorException()})
        try {
          await customerController.findCustomer(referenceCustomer.id)
        } catch (error) {
          expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
        }
      })
    })
  });
});
