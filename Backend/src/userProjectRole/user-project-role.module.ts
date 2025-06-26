import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProjectRole } from './user-project-role.entity';
import { UserProjectRoleService } from './user-project-role.service';
import { UserProjectRoleController } from './user-project-role.controller';
import { User } from 'src/users/users.entity';
import { Project } from 'src/projects/projects.entity';
import { Role } from 'src/roles/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProjectRole, User, Project, Role])],
  controllers: [UserProjectRoleController],
  providers: [UserProjectRoleService],
})
export class UserProjectRoleModule {}
