import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private eventosRepository: Repository<Evento>,
  ) {}

  async findById(id: number): Promise<Evento> {
    const evento = await this.eventosRepository.findOne({
      where: { id },
      relations: { asistentes: true },
    });

    if (!evento) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }

    return evento;
  }

  async findAll(): Promise<Evento[]> {
    return this.eventosRepository.find({ relations: { asistentes: true } });
  }

  async create(data: Partial<Evento>): Promise<Evento> {
    const evento = this.eventosRepository.create(data);
    return this.eventosRepository.save(evento);
  }

  async update(id: number, data: Partial<Evento>): Promise<Evento> {
    await this.findById(id); 
    await this.eventosRepository.update(id, data);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    const evento = await this.findById(id);
    await this.eventosRepository.remove(evento);
  }
}
