import { BaseEntity } from 'src/database/base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RequesterEntity } from './requester.entity';

export enum RequestType {
  A = 'A',
  B = 'B',
  C = 'C',
}

@Entity({
  name: 'request',
})
export class RequestEntity extends BaseEntity {
  @Column({ nullable: true, enum: Object.values(RequestType) })
  type: RequestType;

  @Column({ type: 'timestamp' })
  expirationDate: Date;

  @ManyToOne(() => RequesterEntity, (requester) => requester.requests, {
    nullable: false,
  })
  @JoinColumn({ name: 'requester' })
  requester: RequesterEntity;
}
