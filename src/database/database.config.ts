import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Evento } from '../eventos/entities/evento.entity';
import { Asistente } from '../asistentes/entities/asistente.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '123456789',
  database: process.env.DB_NAME || 'eventos_db',
  entities: [Evento, Asistente],
  synchronize: process.env.DB_SYNC === 'true' || false,
  logging: process.env.DB_LOGGING === 'true' || false,
};
