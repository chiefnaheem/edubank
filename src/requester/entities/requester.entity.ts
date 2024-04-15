import { BaseEntity } from 'src/database/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Request } from './request.entity';

@Entity({
  name: 'requester',
})
export class Requester extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Request, (request) => request.requester)
  requests: Request[];
}
