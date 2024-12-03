import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentService {
  async processPayment(paymentDetails: any): Promise<any> {
    try {
      const response = await axios.post(
        'https://payment.gateway.com/api/pay',
        paymentDetails,
      );
      return response.data;
    } catch (error) {
      throw new Error('Payment failed: ' + error.message);
    }
  }
}
