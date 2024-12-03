import { Body, Controller, Post } from '@nestjs/common';
import { SubscriptionDTO } from './dto/subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('upgrade')
  async upgrade(@Body() subscriptionDTO: SubscriptionDTO) {
    return this.subscriptionService.upgradeSubscription(subscriptionDTO);
  }
}
