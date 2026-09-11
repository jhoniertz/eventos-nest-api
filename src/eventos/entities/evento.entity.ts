import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from 'typeorm';
import { Asistente } from '../../asistentes/entities/asistente.entity';

@Entity('eventos')
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'datetime' })
  fecha: Date;

  @Column({ type: 'varchar', length: 200 })
  lugar: string;

  @OneToMany(() => Asistente, (asistente) => asistente.evento, { cascade: true })
  asistentes: Asistente[];
}
