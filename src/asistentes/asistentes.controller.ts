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
import { AsistentesService } from './asistentes.service';
import { CreateAsistenteDto } from './dto/create-asistente.dto';
import { UpdateAsistenteDto } from './dto/update-asistente.dto';
import { Asistente } from './entities/asistente.entity';

@Controller('asistentes')
export class AsistentesController {
  constructor(private readonly asistentesService: AsistentesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAsistenteDto: CreateAsistenteDto): Promise<Asistente> {
    return this.asistentesService.create(createAsistenteDto);
  }

  @Get()
  async findAll(): Promise<Asistente[]> {
    return this.asistentesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Asistente> {
    return this.asistentesService.findById(id);
  }

  @Get('evento/:eventoId')
  async findByEvento(@Param('eventoId', ParseIntPipe) eventoId: number): Promise<Asistente[]> {
    return this.asistentesService.findByEvento(eventoId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAsistenteDto: UpdateAsistenteDto,
  ): Promise<Asistente> {
    return this.asistentesService.update(id, updateAsistenteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.asistentesService.remove(id);
  }
}
