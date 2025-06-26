import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Vasya', description: 'Имя пользователя' })
  @IsString()
  @Length(1, 255)
  email: string;

  @ApiProperty({ example: 'qwerty123', description: 'Пароль' })
  @IsString()
  password: string;
}
