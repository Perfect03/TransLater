import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { Project } from './projects/projects.entity';
import { User } from './users/users.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.entity';
import { UserProjectRole } from './userProjectRole/user-project-role.entity';
import { UserProjectRoleModule } from './userProjectRole/user-project-role.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Project, User, Role, UserProjectRole],
      synchronize: true,
    }),
    ProjectsModule,
    UsersModule,
    RolesModule,
    UserProjectRoleModule,
    AuthModule
  ],
})
export class AppModule {}
