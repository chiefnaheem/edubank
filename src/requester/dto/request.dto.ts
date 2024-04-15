import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { RequestType } from '../entities/request.entity';

export class RequestDto {
  @ApiProperty({
    type: RequestType,
    example: RequestType.A,
  })
  @IsEnum(RequestType)
  @IsNotEmpty()
  type: RequestType;

  @ApiProperty({
    type: Date,
  })
  @IsNotEmpty()
  @IsDateString()
  expirationDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  requester: string;
}
