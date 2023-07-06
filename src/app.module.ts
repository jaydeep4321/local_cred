import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserGateway } from './modules/users/user.gateway';
import { WalletModule } from './modules/wallet/wallet.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, WalletModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService, UserGateway],
})
export class AppModule {}
