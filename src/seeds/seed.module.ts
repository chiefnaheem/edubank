import { Module } from '@nestjs/common';
import { SeedsService } from './seed.service';

@Module({
  imports: [],
  providers: [SeedsService],
})
export class SeedsModule {}
