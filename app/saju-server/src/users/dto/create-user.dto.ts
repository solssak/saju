import { IsString, IsEmail, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly birthDate?: Date;

  // createdAt은 자동으로 생성되므로 DTO에서 제외
}
