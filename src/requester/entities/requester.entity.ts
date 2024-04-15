import { BaseEntity } from 'src/database/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RequestEntity } from './request.entity';

@Entity({
  name: 'requester',
})
export class RequesterEntity extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => RequestEntity, (request) => request.requester)
  requests: Request[];
}
