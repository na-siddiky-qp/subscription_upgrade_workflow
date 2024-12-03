import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentService } from '../payment/payment.service';
import { SubscriptionDTO } from './dto/subscription.dto';
import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly paymentService: PaymentService,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async upgradeSubscription(subscriptionDTO: SubscriptionDTO) {
    const { name, card_number, cvv, expiry_date, subscription_id } =
      subscriptionDTO;

    const paymentResponse = await this.paymentService.processPayment({
      name,
      card_number,
      cvv,
      expiry_date,
    });

    if (paymentResponse.status === 'success') {
      const subscription = await this.subscriptionRepository.findOne({
        where: { id: subscription_id },
      });
      if (!subscription) {
        throw new Error('Subscription not found');
      }

      subscription.creation_ts = new Date();
      subscription.expiration_ts = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1),
      );
      await this.subscriptionRepository.save(subscription);

      return {
        status: 'success',
        transaction_id: paymentResponse.transaction_id,
      };
    } else {
      throw new Error('Payment failed: ' + paymentResponse.error);
    }
  }
}
