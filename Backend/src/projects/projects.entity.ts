import { ApiProperty } from '@nestjs/swagger';
import { UserProjectRole } from 'src/userProjectRole/user-project-role.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'projects' })
export class Project {
  @ApiProperty({ example: 1, description: 'Идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'MyProject', description: 'Имя проекта' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: 'my-project', description: 'Slug проекта' })
  @Column({ unique: true })
  slug: string;

  @ApiProperty({
    example: 'very good project',
    description: 'Описание проекта',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    example: '...пока что строка-ссылка на файл, позже будет файловая система',
    description: 'Лого проекта',
  })
  @Column({ nullable: true })
  logo: string;

  @OneToMany(() => UserProjectRole, (upr) => upr.project)
  userProjectRoles: UserProjectRole[];
}
