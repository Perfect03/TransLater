import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'Роль' })
  @IsString()
  @Length(1, 255)
  value: string;

  @ApiProperty({ example: 'describe', description: 'Описание роли' })
  description: string;
}
