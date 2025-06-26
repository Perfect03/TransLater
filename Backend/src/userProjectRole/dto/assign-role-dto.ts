import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 2, description: 'ID проекта' })
  @IsInt()
  projectId: number;

  @ApiProperty({ example: 'admin', enum: ['admin', 'editor', 'viewer'] })
  @IsString()
  roleValue: string;
}
