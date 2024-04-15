import { BaseEntity } from 'src/database/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Requester } from './requester.entity';

export enum RequestType {
  A = 'A',
  B = 'B',
  C = 'C',
}

@Entity({
  name: 'request',
})
export class Request extends BaseEntity {
  @Column({ nullable: true, enum: Object.values(RequestType) })
  type: RequestType;

  @Column({ type: 'timestamp' })
  expirationDate: Date;

  @ManyToOne(() => Requester, (requester) => requester.requests)
  requester: Requester;
}
