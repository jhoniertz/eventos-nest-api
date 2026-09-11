import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Evento } from './entities/evento.entity';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEventoDto: CreateEventoDto): Promise<Evento> {
    return this.eventosService.create({
      ...createEventoDto,
      fecha: new Date(createEventoDto.fecha),
    });
  }

  @Get()
  async findAll(): Promise<Evento[]> {
    return this.eventosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Evento> {
    return this.eventosService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventoDto: UpdateEventoDto,
  ): Promise<Evento> {
    const dataToUpdate: Partial<Evento> = {
      ...updateEventoDto,
      fecha: updateEventoDto.fecha ? new Date(updateEventoDto.fecha) : undefined,
    };
    return this.eventosService.update(id, dataToUpdate);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.eventosService.remove(id);
  }
}
