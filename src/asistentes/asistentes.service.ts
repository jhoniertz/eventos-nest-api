import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistente } from './entities/asistente.entity';
import { CreateAsistenteDto } from './dto/create-asistente.dto';
import { UpdateAsistenteDto } from './dto/update-asistente.dto';
import { EventosService } from '../eventos/eventos.service';

@Injectable()
export class AsistentesService {
  constructor(
    @InjectRepository(Asistente)
    private asistentesRepository: Repository<Asistente>,
    private eventosService: EventosService,
  ) {}

  async create(createAsistenteDto: CreateAsistenteDto): Promise<Asistente> {
    // Validar que el evento existe
    await this.eventosService.findById(createAsistenteDto.evento_id);

    // Verificar si el asistente ya existe en ese evento
    const existente = await this.asistentesRepository.findOne({
      where: {
        correo: createAsistenteDto.correo,
        evento_id: createAsistenteDto.evento_id,
      },
    });

    if (existente) {
      throw new BadRequestException(
        'Este asistente ya está registrado en el evento',
      );
    }

    const asistente = this.asistentesRepository.create(createAsistenteDto);
    return this.asistentesRepository.save(asistente);
  }

  async findAll(): Promise<Asistente[]> {
    return this.asistentesRepository.find({ relations: ['evento'] });
  }

  async findById(id: number): Promise<Asistente> {
    const asistente = await this.asistentesRepository.findOne({
      where: { id },
      relations: ['evento'],
    });

    if (!asistente) {
      throw new NotFoundException(`Asistente con ID ${id} no encontrado`);
    }

    return asistente;
  }

  async findByEvento(eventoId: number): Promise<Asistente[]> {
    // Validar que el evento existe
    await this.eventosService.findById(eventoId);

    return this.asistentesRepository.find({
      where: { evento_id: eventoId },
      relations: ['evento'],
    });
  }

  async update(
    id: number,
    updateAsistenteDto: UpdateAsistenteDto,
  ): Promise<Asistente> {
    // Verificar que el asistente existe
    await this.findById(id);

    // Si se intenta cambiar de evento, validar que el nuevo evento existe
    if (updateAsistenteDto.evento_id) {
      await this.eventosService.findById(updateAsistenteDto.evento_id);
    }

    await this.asistentesRepository.update(id, updateAsistenteDto);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    const asistente = await this.findById(id);
    await this.asistentesRepository.remove(asistente);
  }
}
