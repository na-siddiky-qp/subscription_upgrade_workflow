import { IsDateString, IsNumber, IsString } from 'class-validator';

export class SubscriptionDTO {
  @IsString()
  readonly name: string;

  @IsString()
  readonly card_number: string;

  @IsString()
  readonly cvv: string;

  @IsString()
  @IsDateString()
  readonly expiry_date: string;

  @IsNumber()
  readonly subscription_id: number;
}
