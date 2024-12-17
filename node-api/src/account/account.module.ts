import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TransactionModule } from '../transaction/transaction.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    CustomerModule,
    TransactionModule
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})
export class AccountModule {}
