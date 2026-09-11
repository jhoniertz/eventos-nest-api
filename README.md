# Eventos NestJS API

API de gestión de eventos y asistentes construida con NestJS, TypeORM y MySQL.

## 📋 Arquitectura

```
[ Cliente HTTP / Postman ]
       │
       ▼ (Request con payload JSON)
[ ValidationPipe Global (main.ts) ] ── (¿Cumple DTO? No ➔ 400 Bad Request)
       │
       ▼
[ AsistentesController (@Post, @Get, @Patch, @Delete) ]
       │
       ▼ (Invoca método)
[ AsistentesService (Lógica de Negocio) ] ──► [ EventosService inyectado ] 
       │                                        (Valida existencia del Evento ➔ 404)
       ▼ (Operaciones con TypeORM)
[ Repository<Asistente> ]
       │
       ▼ (SQL Queries)
[ Base de Datos MySQL ]
```

## 📁 Estructura del Proyecto

```
burbano/
├── src/
│   ├── main.ts                          # Punto de entrada + ValidationPipe global
│   ├── app.module.ts                    # Módulo raíz
│   ├── database/
│   │   └── database.config.ts           # Configuración de TypeORM
│   ├── eventos/
│   │   ├── entities/
│   │   │   └── evento.entity.ts         # Entidad Evento
│   │   ├── eventos.service.ts           # Lógica de negocios
│   │   └── eventos.module.ts            # Módulo exportable
│   └── asistentes/
│       ├── entities/
│       │   └── asistente.entity.ts      # Entidad Asistente (relación con Evento)
│       ├── dto/
│       │   ├── create-asistente.dto.ts  # Validación para POST
│       │   └── update-asistente.dto.ts  # Validación para PATCH
│       ├── asistentes.controller.ts     # Rutas HTTP
│       ├── asistentes.service.ts        # Lógica + inyección de EventosService
│       └── asistentes.module.ts         # Módulo
├── .env                                 # Variables de entorno
├── .env.example                         # Template de variables
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Instalación

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar base de datos
Edita el archivo `.env`:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_contraseña
DB_NAME=eventos_nest_db
DB_SYNC=true      # true para sincronizar tablas automáticamente (desarrollo)
DB_LOGGING=false  # true para ver las queries SQL en consola
```

### 3. Crear la base de datos MySQL (opcional si DB_SYNC=true)
```bash
mysql -u root -p
CREATE DATABASE eventos_nest_db;
```

## 🏃 Ejecutar el proyecto

### Desarrollo (con hot-reload)
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

## 📡 API Endpoints

### Asistentes

#### POST /asistentes
Crear un nuevo asistente
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "telefono": "+34612345678",
  "notas": "Vegetariano",
  "eventoId": "uuid-del-evento",
  "estadoAsistencia": "confirmado"
}
```

#### GET /asistentes
Obtener todos los asistentes (con relación del evento)

#### GET /asistentes/:id
Obtener un asistente específico

#### GET /asistentes/evento/:eventoId
Obtener todos los asistentes de un evento específico

#### PATCH /asistentes/:id
Actualizar un asistente
```json
{
  "nombre": "Juan Carlos Pérez",
  "telefono": "+34698765432"
}
```

#### DELETE /asistentes/:id
Eliminar un asistente

## ✅ Validaciones

### CreateAsistenteDto
- `nombre`: string requerido
- `email`: email válido requerido
- `telefono`: teléfono español válido (opcional)
- `notas`: string (opcional)
- `eventoId`: UUID requerido (validado que evento exista)
- `estadoAsistencia`: string (opcional, default: "confirmado")

La validación se ejecuta automáticamente en `main.ts` con `ValidationPipe`.

## 🔄 Flujo de Validación

1. **Cliente** → Envía POST a `/asistentes` con JSON
2. **ValidationPipe** → Valida contra `CreateAsistenteDto`
   - Si falla → Retorna 400 Bad Request
   - Si pasa → Continúa
3. **Controller** → Invoca `AsistentesService.create()`
4. **Service** → 
   - Inyecta `EventosService` e invoca `findById(eventoId)`
   - Si evento no existe → Retorna 404 NotFoundException
   - Si existe → Verifica duplicados de email+evento
   - Si todo OK → Crea y retorna el asistente
5. **Repository** → Guarda en MySQL
6. **Response** → Retorna 201 Created + objeto creado

## 📝 Notas Importantes

- Las relaciones entre `Asistente` y `Evento` están configuradas con `CASCADE DELETE`
- Si eliminas un evento, se eliminarán todos sus asistentes automáticamente
- El `eventoId` en el DTO valida que el evento exista antes de crear el asistente
- Los DTOs incluyen `class-validator` para validaciones en tiempo de ejecución
- Las entidades usan `class-transformer` para transformar tipos automáticamente

## 🛠️ Scripts disponibles

```bash
npm run build       # Compilar a JavaScript
npm run start       # Ejecutar producción
npm run start:dev   # Ejecutar con watch (desarrollo)
npm run start:debug # Ejecutar en modo debug
npm run lint        # Verificar código
npm run format      # Formatear código con Prettier
npm run test        # Ejecutar tests
npm run test:e2e    # Ejecutar tests e2e
```

## 📦 Dependencias principales

- `@nestjs/common` - Core de NestJS
- `@nestjs/typeorm` - Integración con TypeORM
- `typeorm` - ORM para MySQL
- `mysql2` - Driver MySQL
- `class-validator` - Validación de DTOs
- `class-transformer` - Transformación de objetos

## 🔍 Troubleshooting

### Error: "Evento con ID ... no encontrado"
El evento no existe en la BD. Verifica el UUID del evento.

### Error: "Este asistente ya está registrado en el evento"
Ya existe un asistente con ese email en ese evento.

### Error de conexión a MySQL
Verifica que:
1. MySQL esté ejecutándose
2. Las credenciales en `.env` sean correctas
3. La base de datos exista o que `DB_SYNC=true`

---

**Creado con ❤️ usando NestJS**
