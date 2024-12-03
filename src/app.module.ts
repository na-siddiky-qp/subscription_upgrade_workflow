import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from './payment/payment.module'; // Your module
import { SubscriptionModule } from './subscription/subscription.module'; // Your module

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'subscription_db',
      entities: [
        /* Your entities here */
      ],
      synchronize: true,
    }),
    SubscriptionModule,
    PaymentModule,
  ],
})
export class AppModule {}
