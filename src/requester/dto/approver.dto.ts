import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { RequestType } from '../entities/request.entity';

export class ApproverDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(Object.values(RequestType), { each: true })
  approvedRequestTypes: string[];
}
