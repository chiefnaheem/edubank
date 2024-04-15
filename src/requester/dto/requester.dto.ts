import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequesterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
