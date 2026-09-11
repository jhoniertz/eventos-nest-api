# 🔄 Actualización del Esquema - Sincronización con Base de Datos Real

## 📝 Cambios Realizados

Se han actualizado todas las entidades, DTOs, servicios y controladores para coincidir exactamente con tu esquema SQL real de MySQL.

### Cambios en Entidades TypeORM

#### Evento Entity
```typescript
// ANTES
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ type: 'datetime' })
fechaInicio: Date;
fechaFin: Date;

@Column({ type: 'varchar', length: 255 })
ubicacion: string;

// AHORA
@PrimaryGeneratedColumn()
id: number;

@Column({ type: 'datetime' })
fecha: Date;

@Column({ type: 'varchar', length: 200 })
lugar: string;

@CreateDateColumn({ type: 'timestamp' })
created_at: Date;

@UpdateDateColumn({ type: 'timestamp' })
updated_at: Date;
```

#### Asistente Entity
```typescript
// ANTES
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ type: 'varchar', length: 255 })
email: string;

@Column({ type: 'varchar' })
eventoId: string;

// AHORA
@PrimaryGeneratedColumn()
id: number;

@Column({ type: 'varchar', length: 150 })
correo: string;

@Column({ type: 'int' })
evento_id: number;

@ManyToOne(() => Evento, (evento) => evento.asistentes)
@JoinColumn({ name: 'evento_id' })
evento: Evento;
```

### Cambios en DTOs

#### CreateEventoDto
```typescript
// ANTES
fechaInicio: string;
fechaFin: string;
ubicacion: string;
capacidadMaxima?: number;
estado?: string;

// AHORA
fecha: string;
lugar: string;
```

#### CreateAsistenteDto
```typescript
// ANTES
email: string;
notas?: string;
eventoId: string;
estadoAsistencia?: string;

// AHORA
correo: string;
evento_id: number;
```

### Cambios en Servicios

- `EventosService.findById(id: string)` → `findById(id: number)`
- `AsistentesService.findById(id: string)` → `findById(id: number)`
- `AsistentesService.findByEvento(eventoId: string)` → `findByEvento(eventoId: number)`
- Validación de email actualizado a validación de correo

### Cambios en Controladores

Agregado `ParseIntPipe` para convertir string a number automáticamente en parámetros de ruta:
```typescript
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number): Promise<Evento> {
  return this.eventosService.findById(id);
}
```

### Cambio en Database Config

```typescript
database: process.env.DB_NAME || 'eventos_nest_db'  // Antes: 'eventos_db'
```

---

## 🚀 Cómo Usar la Base de Datos

### 1. Crear Base de Datos
Ejecuta el script SQL:
```bash
mysql -u root -p < database.sql
```

O en MySQL Workbench/PhpMyAdmin, copia todo el contenido de `database.sql` y ejecútalo.

### 2. Verificar Instalación
```sql
USE eventos_nest_db;
SHOW TABLES;
DESCRIBE eventos;
DESCRIBE asistentes;
SELECT * FROM eventos;
SELECT * FROM asistentes;
```

### 3. Ejecutar la Aplicación
```bash
npm run start:dev
```

---

## 📡 Ejemplos de Requests Actualizados

### POST /eventos - Crear evento
```json
{
  "nombre": "Conferencia Tech 2026",
  "descripcion": "Conferencia sobre tecnologías modernas",
  "fecha": "2026-10-15T09:00:00Z",
  "lugar": "Auditorio Central"
}
```

### POST /asistentes - Crear asistente
```json
{
  "nombre": "David Burbano",
  "correo": "david@gmail.com",
  "telefono": "3001234567",
  "evento_id": 1
}
```

### GET /asistentes/evento/1
Obtiene todos los asistentes del evento con ID 1

### PATCH /eventos/1
```json
{
  "nombre": "Conferencia Tech 2026 - Edición Especial",
  "lugar": "Centro de Convenciones"
}
```

---

## ✅ Validaciones en DTOs

### CreateEventoDto
- `nombre`: string requerido
- `descripcion`: string opcional
- `fecha`: fecha en formato ISO 8601 (ej: 2026-10-15T09:00:00Z)
- `lugar`: string requerido

### CreateAsistenteDto
- `nombre`: string requerido
- `correo`: email válido requerido
- `telefono`: string opcional
- `evento_id`: number requerido (debe existir un evento con ese ID)

---

## 🔍 Notas Importantes

1. **IDs Numéricos**: Todos los IDs ahora son `INT AUTO_INCREMENT` en lugar de UUID
2. **Campos Renombrados**: 
   - `email` → `correo`
   - `eventoId` → `evento_id`
   - `fechaInicio/fechaFin` → `fecha`
   - `ubicacion` → `lugar`
3. **Timestamps**: Usa `created_at` y `updated_at` automáticos
4. **Relación Cascada**: Eliminar evento elimina automáticamente sus asistentes
5. **ParseIntPipe**: Convierte automáticamente strings a números en rutas

---

## 📂 Archivos Actualizados

- ✅ `src/eventos/entities/evento.entity.ts`
- ✅ `src/eventos/dto/create-evento.dto.ts`
- ✅ `src/eventos/dto/update-evento.dto.ts`
- ✅ `src/eventos/eventos.service.ts`
- ✅ `src/eventos/eventos.controller.ts`
- ✅ `src/asistentes/entities/asistente.entity.ts`
- ✅ `src/asistentes/dto/create-asistente.dto.ts`
- ✅ `src/asistentes/asistentes.service.ts`
- ✅ `src/asistentes/asistentes.controller.ts`
- ✅ `src/database/database.config.ts`
- ✅ `database.sql` (NUEVO)

---

## 🐛 Troubleshooting

### Error: "Unknown column 'email' in 'where clause'"
Solución: Ya está corregido. Usa `correo` en lugar de `email`.

### Error: "Cannot convert string to number"
Solución: El `ParseIntPipe` convierte automáticamente. Asegúrate de enviar números válidos.

### Evento no encontrado (404)
Verifica que el `evento_id` sea un número válido y exista en la BD.

---

**Proyecto sincronizado con tu esquema SQL real** ✨
