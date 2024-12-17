import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { 
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

  describe('customerController', () => {
    it('should be defined', () => {
      expect(CustomerController).toBeDefined();
    });

    describe('findCustomer', () => {
      const referenceCustomer = testUser;
      const result: FindCustomerResponseDto = new FindCustomerResponseDto(
        referenceCustomer.id,
        referenceCustomer.firstName,
        referenceCustomer.middleName,
        referenceCustomer.lastName,
        referenceCustomer.isActive
      )
      it('should call customerService.findCustomer', async () => {
        jest.spyOn(customerService, 'findCustomer').mockImplementation(async () => result)
        const callResult = await customerController.findCustomer(referenceCustomer.id)
        expect(customerService.findCustomer).toHaveBeenCalled()
      })

      it('should return result if present', async () => {
        jest.spyOn(customerService, 'findCustomer').mockImplementation(async () => result)
        const callResult = await customerController.findCustomer(referenceCustomer.id)
        expect(callResult).toBe(result);
      })

      it('should throw an error if not found', async () => {
        jest.spyOn(customerService, 'findCustomer').mockImplementation(async () => {throw new NotFoundException()})
        try {
          await customerController.findCustomer(referenceCustomer.id)
        } catch (error) {
          expect(error.status).toBe(HttpStatus.NOT_FOUND)
        }
      })

      it('should throw a default error for unexpected situations', async () => {
        jest.spyOn(customerService, 'findCustomer').mockImplementation(async () => {throw new InternalServerErrorException()})
        try {
          await customerController.findCustomer(referenceCustomer.id)
        } catch (error) {
          expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
        }
      })
    })
  });
});
