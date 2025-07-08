import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Project } from 'src/projects/projects.entity';
import { User } from 'src/users/users.entity';
import { Role } from 'src/roles/roles.entity';
import { UserProjectRole } from 'src/userProjectRole/user-project-role.entity';

config({
  path: `.${process.env.NODE_ENV || 'dev'}.env`,
});

const configService = new ConfigService()

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: Number(configService.get<string>('POSTGRES_PORT')),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  synchronize: false,
  entities: [Project, User, Role, UserProjectRole],
  migrations: ['src/database/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;