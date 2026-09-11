import { IsString, IsEmail, IsOptional, IsNumber, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAsistenteDto {
  @IsString()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  codigoTicket: string;

  @IsNumber()
  evento_id: number;
}
