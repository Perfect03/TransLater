import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/projects/projects.entity';
import { Role } from 'src/roles/roles.entity';
import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, Unique } from 'typeorm';

@Unique(['user', 'project'])
@Entity({ name: 'user-project-role' })
export class UserProjectRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.userProjectRoles)
  user: User;

  @ManyToOne(() => Project, project => project.userProjectRoles)
  project: Project;

  @ManyToOne(() => Role, role => role.userProjectRoles)
  role: Role;
}
