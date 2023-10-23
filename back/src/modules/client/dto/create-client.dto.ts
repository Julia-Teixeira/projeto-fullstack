import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString({ message: 'Deve ser um string' })
  @IsNotEmpty({ message: 'O campo full_name não pode estar vazio.' })
  @ApiProperty({ description: 'Nome completo do usuário', type: String })
  full_name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O campo email não pode estar vazio.' })
  @ApiProperty({ description: 'E-mail do usuário', type: String })
  email: string;

  @IsString({
    message: 'O campo phone deve ser um string no formato "(00) 0 0000-0000"',
  })
  @IsNotEmpty({ message: 'O campo phone não pode estar vazio.' })
  @ApiProperty({
    description: 'Telefone do usuário, no formato (00) 0 0000-0000 ',
    type: String,
  })
  phone: string;

  @IsOptional()
  @ApiProperty({
    description: 'Imagem do usuário',
    type: String,
  })
  image: string;

  @IsString({ message: 'O campo password deve ser um string' })
  @IsNotEmpty({ message: 'O campo password não pode estar vazio.' })
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  @ApiProperty({
    description: 'Senha do usuário',
    type: String,
  })
  password: string;
}
