import { BaseEntity } from 'src/database/base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'approver',
})
export class Approver extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'simple-array' })
  approvedRequestTypes: string[];
}
