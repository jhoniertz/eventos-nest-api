import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistente } from './entities/asistente.entity';
import { AsistentesService } from './asistentes.service';
import { AsistentesController } from './asistentes.controller';
import { EventosModule } from '../eventos/eventos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Asistente]), EventosModule],
  controllers: [AsistentesController],
  providers: [AsistentesService],
  exports: [AsistentesService],
})
export class AsistentesModule {}
