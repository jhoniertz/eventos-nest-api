import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsDateString()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  lugar: string;
}
