import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMessage {
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsString()
  readonly sender: string;
}
