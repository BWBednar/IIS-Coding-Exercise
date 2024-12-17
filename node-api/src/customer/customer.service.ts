import { 
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { FindCustomerResponseDto } from './dto/findCustomer.dto';
import { Customer } from '../types/customer';

// Used to simulate the database for Customers
import { testCustomerCollection } from '../../models/test-models/test-customer';

@Injectable()
export class CustomerService {
  private logger = new Logger()
  
  /**
   * Query the Customer table for either the relevant entry
   * @param id The ID of interest
   * @returns Either the data for a singular entry
   */
  async queryCustomerTable(id: string): Promise<Customer> {
    try {
      // This would be where to check the connection to the database is not having any issues if needed
      if (testCustomerCollection === undefined) throw new InternalServerErrorException();
      // This would be a database call for the data, but using simulated data here
      const customer: Customer = testCustomerCollection.find((customer: Customer) => customer.id === id)
      if (customer === undefined) throw new NotFoundException(`${id} not found`)
      return customer
    } catch (error) {
      if (error) throw error;
      this.logger.error(`Error while querying customers: ${error}`)
      throw new InternalServerErrorException(`Internal error in querying for ${id}`)    
    }
  }

  /**
   * Query the Customer table for the UUID of interest
   * Note: Query is simulated from a JSON object of premade customers
   * @param id The UUID of the customer being searched for
   */
  async findCustomer(id: string): Promise<FindCustomerResponseDto> {
    try {
      const customer: Customer = await this.queryCustomerTable(id)
      const response: FindCustomerResponseDto = new FindCustomerResponseDto(
        customer.id,
        customer.firstName,
        customer.middleName,
        customer.lastName,
        customer.isActive
      )
      this.logger.log(`Customer ${id} found. Returning to requestor`)
      return response;
    } catch (error) {
      if (error) throw error;
      this.logger.error(`Error while querying customers: ${error}`)
      throw new InternalServerErrorException(`Internal error in querying for ${id}`)    
    }
  }
}
