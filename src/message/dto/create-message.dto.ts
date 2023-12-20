import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsString()
  readonly sender: string;

  @IsString()
  readonly name: string;
}
