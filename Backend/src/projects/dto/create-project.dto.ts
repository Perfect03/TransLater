import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';

export class CreateProjectDto {

  @ApiProperty({example: 'Google', description: 'Имя проекта'})
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiProperty({example: 'Rules the World', description: 'Описание проекта'})
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  logo?: string;
}