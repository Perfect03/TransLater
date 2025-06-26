import { ApiProperty } from '@nestjs/swagger';
import { UserProjectRole } from 'src/userProjectRole/user-project-role.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  value: string; // 'admin', 'editor', 'viewer'

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => UserProjectRole, (upr) => upr.role)
  userProjectRoles: UserProjectRole[];
}
