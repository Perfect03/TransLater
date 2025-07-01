import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Vasya', description: 'Имя пользователя' })
  @IsString({message: 'Должен быть строкой'})
  @Length(1, 255)
  @IsEmail({}, {message: 'Некорретный email'})
  email: string;

  @ApiProperty({ example: 'qwerty123', description: 'Пароль' })
  @IsString({message: 'Должен быть строкой'})
  @Length(4, 20, {message: 'Пароль должен быть длиной от 4 до 20 символов'})
  password: string;
}
