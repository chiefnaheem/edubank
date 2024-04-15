import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import typeOrmConfig from 'typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { RequesterModule } from './requester/requester.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),

    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
    }),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    RequesterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
