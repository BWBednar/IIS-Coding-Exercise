import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module'
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    CustomerModule,
    AccountModule,
    TransactionModule
  ],
})
export class AppModule {}
