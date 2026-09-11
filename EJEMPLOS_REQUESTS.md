# Ejemplos de Requests para la API

## Variables de Postman/Thunder Client
```
{{baseUrl}} = http://localhost:3000
{{eventoId}} = uuid-del-evento (reemplazar con un UUID real)
{{asistenteId}} = uuid-del-asistente (reemplazar con un UUID real)
```

---

## 📌 ASISTENTES

### 1. CREATE - Crear nuevo asistente
```
POST {{baseUrl}}/asistentes
Content-Type: application/json

{
  "nombre": "Juan Pérez García",
  "email": "juan.perez@gmail.com",
  "telefono": "+34612345678",
  "notas": "Preferencia vegetariana",
  "eventoId": "550e8400-e29b-41d4-a716-446655440000",
  "estadoAsistencia": "confirmado"
}
```

**Respuesta (201 Created):**
```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "nombre": "Juan Pérez García",
  "email": "juan.perez@gmail.com",
  "telefono": "+34612345678",
  "notas": "Preferencia vegetariana",
  "estadoAsistencia": "confirmado",
  "eventoId": "550e8400-e29b-41d4-a716-446655440000",
  "creadoEn": "2024-01-15T10:30:00.000Z",
  "actualizadoEn": "2024-01-15T10:30:00.000Z",
  "evento": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nombre": "Conferencia Tech 2024",
    ...
  }
}
```

---

### 2. READ - Obtener todos los asistentes
```
GET {{baseUrl}}/asistentes
```

**Respuesta (200 OK):**
```json
[
  {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "nombre": "Juan Pérez García",
    "email": "juan.perez@gmail.com",
    "telefono": "+34612345678",
    "notas": "Preferencia vegetariana",
    "estadoAsistencia": "confirmado",
    "eventoId": "550e8400-e29b-41d4-a716-446655440000",
    "creadoEn": "2024-01-15T10:30:00.000Z",
    "actualizadoEn": "2024-01-15T10:30:00.000Z",
    "evento": {...}
  },
  ...
]
```

---

### 3. READ - Obtener asistente por ID
```
GET {{baseUrl}}/asistentes/f47ac10b-58cc-4372-a567-0e02b2c3d479
```

**Respuesta (200 OK):**
```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "nombre": "Juan Pérez García",
  "email": "juan.perez@gmail.com",
  "telefono": "+34612345678",
  "notas": "Preferencia vegetariana",
  "estadoAsistencia": "confirmado",
  "eventoId": "550e8400-e29b-41d4-a716-446655440000",
  "creadoEn": "2024-01-15T10:30:00.000Z",
  "actualizadoEn": "2024-01-15T10:30:00.000Z",
  "evento": {...}
}
```

---

### 4. READ - Obtener asistentes de un evento específico
```
GET {{baseUrl}}/asistentes/evento/550e8400-e29b-41d4-a716-446655440000
```

**Respuesta (200 OK):**
```json
[
  {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "nombre": "Juan Pérez García",
    "email": "juan.perez@gmail.com",
    "telefono": "+34612345678",
    "notas": "Preferencia vegetariana",
    "estadoAsistencia": "confirmado",
    "eventoId": "550e8400-e29b-41d4-a716-446655440000",
    "creadoEn": "2024-01-15T10:30:00.000Z",
    "actualizadoEn": "2024-01-15T10:30:00.000Z",
    "evento": {...}
  },
  ...
]
```

---

### 5. UPDATE - Actualizar asistente (PATCH)
```
PATCH {{baseUrl}}/asistentes/f47ac10b-58cc-4372-a567-0e02b2c3d479
Content-Type: application/json

{
  "nombre": "Juan Carlos Pérez García",
  "estadoAsistencia": "pendiente",
  "notas": "Vegetariano - Sin gluten"
}
```

**Respuesta (200 OK):**
```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "nombre": "Juan Carlos Pérez García",
  "email": "juan.perez@gmail.com",
  "telefono": "+34612345678",
  "notas": "Vegetariano - Sin gluten",
  "estadoAsistencia": "pendiente",
  "eventoId": "550e8400-e29b-41d4-a716-446655440000",
  "creadoEn": "2024-01-15T10:30:00.000Z",
  "actualizadoEn": "2024-01-15T10:35:00.000Z",
  "evento": {...}
}
```

---

### 6. DELETE - Eliminar asistente
```
DELETE {{baseUrl}}/asistentes/f47ac10b-58cc-4372-a567-0e02b2c3d479
```

**Respuesta (204 No Content):** (sin cuerpo)

---

## ❌ Códigos de Error

### 400 Bad Request - Validación DTO fallida
```
POST {{baseUrl}}/asistentes
{
  "nombre": "Juan",
  "email": "email-inválido",  // No es un email
  "eventoId": "no-es-uuid"    // No es un UUID
}
```

**Respuesta:**
```json
{
  "message": [
    "email must be an email",
    "eventoId must be a UUID"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

### 404 Not Found - Evento no existe
```
POST {{baseUrl}}/asistentes
{
  "nombre": "Juan Pérez",
  "email": "juan@gmail.com",
  "eventoId": "550e8400-e29b-41d4-a716-446655440001"  // No existe
}
```

**Respuesta:**
```json
{
  "message": "Evento con ID 550e8400-e29b-41d4-a716-446655440001 no encontrado",
  "error": "Not Found",
  "statusCode": 404
}
```

---

### 400 Bad Request - Asistente duplicado
```
POST {{baseUrl}}/asistentes
{
  "nombre": "Juan Pérez García",
  "email": "juan.perez@gmail.com",  // Ya existe en este evento
  "eventoId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Respuesta:**
```json
{
  "message": "Este asistente ya está registrado en el evento",
  "error": "Bad Request",
  "statusCode": 400
}
```

---

### 404 Not Found - Asistente no existe
```
GET {{baseUrl}}/asistentes/f47ac10b-58cc-4372-a567-0e02b2c3d479  // No existe
```

**Respuesta:**
```json
{
  "message": "Asistente con ID f47ac10b-58cc-4372-a567-0e02b2c3d479 no encontrado",
  "error": "Not Found",
  "statusCode": 404
}
```

---

## 📤 cURL Examples

### Crear asistente
```bash
curl -X POST http://localhost:3000/asistentes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@gmail.com",
    "telefono": "+34612345678",
    "eventoId": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

### Obtener todos
```bash
curl http://localhost:3000/asistentes
```

### Obtener por ID
```bash
curl http://localhost:3000/asistentes/f47ac10b-58cc-4372-a567-0e02b2c3d479
```

### Actualizar
```bash
curl -X PATCH http://localhost:3000/asistentes/f47ac10b-58cc-4372-a567-0e02b2c3d479 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Carlos Pérez",
    "estadoAsistencia": "pendiente"
  }'
```

### Eliminar
```bash
curl -X DELETE http://localhost:3000/asistentes/f47ac10b-58cc-4372-a567-0e02b2c3d479
```

---

## 💡 Tips

1. **Para obtener un eventoId válido:** Primero debes crear eventos (si tienes endpoint para ello)
2. **Formatos de teléfono:** El validador usa el estándar español (+34...)
3. **UUIDs:** Usa generadores online si necesitas crear IDs de prueba
4. **Headers:** Siempre incluye `Content-Type: application/json` en POST/PATCH
5. **Estado de asistencia:** Los valores comunes son: "confirmado", "pendiente", "cancelado", "no-asistió"
