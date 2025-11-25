# Configuración de Cloudflare D1 para Payload CMS

Este proyecto ha sido configurado para usar Cloudflare D1 (base de datos SQLite) y R2 (almacenamiento de objetos).

## Prerequisitos

1. Una cuenta de Cloudflare
2. Node.js 18.20.2 o superior
3. pnpm instalado

## Pasos de Configuración

### 1. Instalar dependencias

Las dependencias ya están instaladas. Si necesitas reinstalarlas:

```bash
pnpm install
```

### 2. Autenticarse en Cloudflare

```bash
npx wrangler login
```

### 3. Crear la base de datos D1

```bash
npx wrangler d1 create jhon2
```

Esto te dará un `database_id`. Copia este ID y actualiza el archivo `wrangler.jsonc`:

```jsonc
{
  "d1_databases": [
    {
      "binding": "D1",
      "database_id": "TU_DATABASE_ID_AQUI",  // Reemplaza con tu database_id
      "database_name": "jhon2"
    }
  ]
}
```

### 4. Crear el bucket R2

```bash
npx wrangler r2 bucket create jhon2
```

### 5. Ejecutar migraciones

```bash
pnpm payload migrate
```

### 6. Desarrollo local

Para desarrollo local, Wrangler puede emular D1 y R2:

```bash
pnpm dev
```

### 7. Desplegar a Cloudflare

```bash
pnpm deploy
```

Este comando:
- Ejecuta las migraciones de la base de datos
- Construye el proyecto con OpenNext
- Despliega a Cloudflare Workers

## Variables de entorno

Configura las siguientes variables de entorno en tu archivo `.env`:

```bash
PAYLOAD_SECRET=tu-secreto-aqui
NEXT_PUBLIC_SERVER_URL=https://tu-dominio.workers.dev
CRON_SECRET=tu-cron-secret
PREVIEW_SECRET=tu-preview-secret
```

## Comandos útiles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Construye el proyecto
- `pnpm deploy` - Despliega a Cloudflare
- `pnpm cf-typegen` - Genera tipos de TypeScript para Wrangler
- `npx wrangler d1 execute jhon2 --remote --command "SELECT * FROM users"` - Ejecuta comandos SQL

## Notas importantes

1. **Plan de Workers**: Se recomienda usar el plan pago de Cloudflare Workers debido al límite de tamaño del bundle (3MB).

2. **Read Replicas**: Puedes habilitar read replicas agregando `readReplicas: 'first-primary'` en el adaptador de DB y habilitándolo en el dashboard de D1.

3. **GraphQL**: El soporte completo de GraphQL no está garantizado cuando se despliega en Workers.

## Recursos

- [Documentación de Payload CMS](https://payloadcms.com/docs)
- [Documentación de Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Documentación de Cloudflare R2](https://developers.cloudflare.com/r2/)
- [Template oficial](https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1)
