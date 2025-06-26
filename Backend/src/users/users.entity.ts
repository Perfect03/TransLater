import { ApiProperty } from '@nestjs/swagger';
import { UserProjectRole } from 'src/userProjectRole/user-project-role.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: 1, description: 'Идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Vasya', description: 'Имя пользователя' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'qwerty123', description: 'Пароль' })
  @Column()
  password: string;

  @OneToMany(() => UserProjectRole, (upr) => upr.user)
  userProjectRoles: UserProjectRole[];
}
