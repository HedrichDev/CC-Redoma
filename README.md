
<div align="center" style="transition: transform 0.2s; display: inline-block;">
  <img height="150" src="https://github.com/HedrichDev/CC-Redoma/blob/main/client/public/favicon.png" 
       style="border-radius: 15px; transition: transform 0.2s;" 
       onmouseover="this.style.transform='scale(1.1)'" 
       onmouseout="this.style.transform='scale(1)'"/>
</div>

# CCredoma - Plataforma Integral de Gestión de Centros Comerciales
![](https://github.com/HedrichDev/CC-Redoma/blob/main/client/public/foto.png)


> **Solución completa y profesional para administración, control y gestión de espacios comerciales en centros comerciales modernos.**

---

## Integrantes del Proyecto 
> 👥 Christopher Hedrich C.I 31.821.175
> 
> 👥 Anayle Figueroa
> 
> 👥 
> 
> 👥 


## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Guía de Uso](#guía-de-uso)
- [Roles y Permisos](#roles-y-permisos)
- [Credenciales de Prueba](#credenciales-de-prueba)
- [Documentación de API](#documentación-de-api)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Deployment](#deployment)

---

## 🎯 Descripción General

**CCredoma** es una plataforma web integral diseñada para simplificar la gestión de centros comerciales. Proporciona herramientas poderosas para administradores, portales personalizados para inquilinos y un catálogo interactivo para potenciales clientes.

La plataforma combina un **diseño visual inspirado en Airbnb/Zillow** para las páginas públicas con **dashboards eficientes estilo Material Design** para tareas administrativas, creando una experiencia de usuario intuitiva y profesional.

### Objetivos Principales

✅ Centralizar la gestión de espacios comerciales  
✅ Automatizar procesos administrativos  
✅ Mejorar la comunicación entre administradores e inquilinos  
✅ Facilitar la búsqueda y contacto de nuevos clientes  
✅ Proporcionar reportes y análisis en tiempo real  

---

## ✨ Características Principales

### 🏢 Para Administradores (CentroComercialAdmin)

- **Dashboard Ejecutivo**: Métricas en tiempo real de ocupación, ingresos y estado de locales
- **Gestión de Locales**: CRUD completo de espacios comerciales con información detallada
- **Administración de Contratos**: Creación, seguimiento y renovación de contratos de arrendamiento
- **Gestión de Pagos**: Registro y seguimiento de pagos, detección de atrasos
- **Sistema de Solicitudes**: Recepción y gestión de solicitudes de mantenimiento e inquilinos
- **Reportes Financieros**: Análisis de rentabilidad, ocupación e ingresos

### 👤 Para Inquilinos (LocalOwner)

- **Portal Personalizado**: Acceso exclusivo a información relevante
- **Consulta de Contratos**: Visualización completa de términos y condiciones
- **Historial de Pagos**: Registro transparente y detallado de pagos realizados
- **Solicitudes de Mantenimiento**: Sistema fácil para reportar problemas
- **Comunicación Directa**: Canal directo con la administración

### 🌐 Para Visitantes (VisitanteExterno)

- **Catálogo Interactivo**: Exploración visual de locales disponibles
- **Búsqueda y Filtros**: Filtrado por tipo, tamaño, ubicación y estado
- **Detalles Completos**: Información multimedia de cada espacio
- **Contacto Rápido**: Formulario simple para solicitar información

### 👨‍💻 Para Desarrolladores (Developer)

- **Panel de Herramientas**: Acceso a información del sistema
- **Documentación de API**: Referencia completa de endpoints
- **Credenciales de Prueba**: Usuarios preconfigurados para testing
- **Información del Sistema**: Detalles técnicos y configuración

---

## 🛠 Tecnologías Utilizadas

### Frontend

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 18+ | Framework UI principal |
| **TypeScript** | Latest | Tipado estático del código |
| **Vite** | 5+ | Build tool y dev server |
| **Tailwind CSS** | 3+ | Estilos y diseño responsivo |
| **Shadcn/UI** | Latest | Componentes UI accesibles |
| **React Hook Form** | Latest | Gestión de formularios |
| **TanStack Query** | v5 | Gestión de estado del servidor |
| **Wouter** | Latest | Enrutamiento ligero |
| **Lucide React** | Latest | Iconografía |

### Backend

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **Node.js** | 18+ | Runtime de JavaScript |
| **Express.js** | 4+ | Framework web |
| **TypeScript** | Latest | Tipado estático |
| **Drizzle ORM** | Latest | Mapeo objeto-relacional |
| **PostgreSQL** | 13+ | Base de datos principal |
| **bcryptjs** | 2.4+ | Hash seguro de contraseñas |
| **jsonwebtoken** | 9+ | Tokens JWT para autenticación |

### Infraestructura

- **Vite Dev Server**: Hot Module Replacement (HMR) en desarrollo
- **Express Static**: Servicio de archivos estáticos en producción
- **Neon PostgreSQL**: Base de datos serverless en la nube

---

## 📁 Estructura del Proyecto

```
CCredoma/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── landing.tsx           # Página principal
│   │   │   ├── login.tsx             # Autenticación
│   │   │   ├── register.tsx          # Registro
│   │   │   ├── catalog.tsx           # Catálogo público
│   │   │   ├── local-detail.tsx      # Detalle de local
│   │   │   ├── admin/                # Panel administrativo
│   │   │   ├── tenant/               # Portal inquilino
│   │   │   └── developer/            # Panel desarrollador
│   │   ├── components/
│   │   │   ├── app-sidebar.tsx       # Navegación lateral
│   │   │   ├── theme-toggle.tsx      # Selector tema
│   │   │   └── ui/                   # Componentes shadcn
│   │   ├── lib/
│   │   │   ├── auth.tsx              # Contexto autenticación
│   │   │   ├── theme.tsx             # Sistema de temas
│   │   │   └── queryClient.ts        # Cliente de React Query
│   │   ├── hooks/
│   │   ├── App.tsx                   # Componente raíz
│   │   └── index.css                 # Estilos globales
│   └── public/
│       ├── favicon.png               # Logo de la aplicación
│       └── redoma.jpg                # Imagen hero
│
├── server/
│   ├── index-dev.ts                  # Punto de entrada desarrollo
│   ├── index.ts                      # Punto de entrada producción
│   ├── vite.ts                       # Configuración Vite
│   ├── routes.ts                     # Rutas API
│   ├── storage.ts                    # Capa de almacenamiento
│   ├── middleware/
│   │   └── auth.ts                   # Autenticación JWT
│   └── seedData/                     # Datos iniciales
│
├── shared/
│   └── schema.ts                     # Tipos y esquemas compartidos
│
├── vite.config.ts                    # Configuración Vite
├── tailwind.config.ts                # Configuración Tailwind
├── tsconfig.json                     # Configuración TypeScript
├── package.json                      # Dependencias
└── README.md                          # Este archivo
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos

- **Node.js** 18.0 o superior
- **npm** 9.0 o superior

### Pasos de Instalación

#### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd CCredoma
```

#### 2. Instalar dependencias

```bash
npm install
```

#### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/ccredoma

# Autenticación
JWT_SECRET=tu_clave_secreta_aqui
SESSION_SECRET=tu_sesion_secreta_aqui

# Aplicación
NODE_ENV=development
PORT=5000
```

#### 4. Inicializar la base de datos

```bash
npm run db:push
```

#### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5000**

---

## 📖 Guía de Uso

### 🔐 Autenticación

#### Página de Login

1. Navega a `http://localhost:5000/login`
2. Ingresa usuario y contraseña
3. Serás redirigido según tu rol

**Flujos de autenticación:**

```
Administrador → /admin/dashboard
Inquilino → /tenant/dashboard
Visitante → /catalog
Desarrollador → /developer/dashboard
```

#### Página de Registro

1. Haz clic en "Registrarse" en la página de login
2. Completa el formulario con:
   - Nombre de usuario
   - Email válido
   - Contraseña segura (mín. 6 caracteres)
   - Nombre completo
   - Teléfono (opcional)
3. Selecciona tu rol
4. Haz clic en "Crear Cuenta"

### 📊 Dashboard Administrativo

Acceso: `/admin/dashboard`

**Funcionalidades principales:**

- **Panel Principal**: Vista general con métricas clave
- **Gestión de Locales**: Crear, editar, eliminar espacios
- **Administración de Contratos**: Gestionar acuerdos de arrendamiento
- **Seguimiento de Pagos**: Registrar y monitorear ingresos
- **Gestión de Solicitudes**: Responder a inquilinos y visitantes

### 👥 Portal de Inquilino

Acceso: `/tenant/dashboard`

**Funcionalidades disponibles:**

- Ver contrato activo con términos completos
- Consultar historial de pagos
- Hacer seguimiento de solicitudes de mantenimiento
- Ver información del local arrendado

### 🛍 Catálogo Público

Acceso: `/catalog`

**Opciones de navegación:**

- Buscar locales por nombre o descripción
- Filtrar por tipo de local
- Filtrar por estado de disponibilidad
- Ver detalles completos de cada espacio
- Solicitar información de contacto

---

## 🔐 Roles y Permisos

### Matriz de Permisos

| Acción | Admin | Inquilino | Visitante | Developer |
|--------|-------|-----------|-----------|-----------|
| Ver Dashboard | ✅ | ✅ | ❌ | ✅ |
| Gestionar Locales | ✅ | ❌ | ❌ | ❌ |
| Crear Contratos | ✅ | ❌ | ❌ | ❌ |
| Ver Contratos | ✅ | ✅ | ❌ | ❌ |
| Gestionar Pagos | ✅ | ❌ | ❌ | ❌ |
| Ver Pagos | ✅ | ✅ | ❌ | ❌ |
| Responder Solicitudes | ✅ | ❌ | ❌ | ❌ |
| Hacer Solicitudes | ✅ | ✅ | ✅ | ❌ |
| Ver Catálogo | ✅ | ✅ | ✅ | ❌ |
| Panel Desarrollador | ❌ | ❌ | ❌ | ✅ |

---

## 🔑 Credenciales de Prueba

La aplicación viene preconfigurada con usuarios de prueba para cada rol:

### Administrador
```
Usuario: admin
Contraseña: password
Email: admin@ccredoma.com
Rol: CentroComercialAdmin
```

### Inquilino
```
Usuario: inquilino1
Contraseña: password
Email: inquilino@example.com
Rol: LocalOwner
Contrato: Local B-205
```

### Visitante Externo
```
Usuario: visitante
Contraseña: password
Email: visitante@example.com
Rol: VisitanteExterno
```

### Desarrollador
```
Usuario: HedrichDev
Contraseña: Coralito*10
Email: hedrich@ccredoma.dev
Rol: Developer
```

---

## 📡 Documentación de API

### Autenticación

#### POST `/api/auth/register`
Registrar nuevo usuario.

**Body:**
```json
{
  "username": "usuario",
  "email": "usuario@example.com",
  "password": "contraseña",
  "fullName": "Nombre Completo",
  "role": "VisitanteExterno"
}
```

**Respuesta:**
```json
{
  "user": { /* Usuario creado */ },
  "token": "jwt_token_aqui"
}
```

#### POST `/api/auth/login`
Iniciar sesión.

**Body:**
```json
{
  "username": "usuario",
  "password": "contraseña"
}
```

**Respuesta:**
```json
{
  "user": { /* Usuario */ },
  "token": "jwt_token_aqui"
}
```

#### GET `/api/auth/me`
Obtener usuario actual.

**Headers:**
```
Authorization: Bearer <token>
```

#### POST `/api/auth/logout`
Cerrar sesión.

### Locales (Espacios Comerciales)

#### GET `/api/locals`
Obtener todos los locales.

**Parámetros Query:**
- `type`: Filtrar por tipo (Comercio, Restaurante, etc.)
- `status`: Filtrar por estado (Disponible, Ocupado, etc.)

**Respuesta:**
```json
[
  {
    "id": "uuid",
    "name": "Local A-101",
    "type": "Comercio",
    "status": "Disponible",
    "size": "85.50",
    "monthlyPrice": "2500.00",
    "location": "Ala Norte",
    "amenities": ["Aire Acondicionado", "Iluminación LED"]
  }
]
```

#### POST `/api/locals` (Admin)
Crear nuevo local.

**Body:**
```json
{
  "name": "Local F-301",
  "description": "Descripción del local",
  "type": "Oficina",
  "size": 75,
  "floor": 3,
  "monthlyPrice": 1800,
  "location": "Ala Este",
  "amenities": ["Wifi", "Aire Acondicionado"]
}
```

### Contratos

#### GET `/api/contracts`
Obtener todos los contratos (Admin).

#### GET `/api/contracts/my`
Obtener contratos del usuario actual.

#### POST `/api/contracts` (Admin)
Crear nuevo contrato.

**Body:**
```json
{
  "localId": "local_uuid",
  "tenantId": "user_uuid",
  "startDate": "2025-01-01T00:00:00Z",
  "endDate": "2026-01-01T00:00:00Z",
  "monthlyRent": 2500,
  "deposit": 5000,
  "terms": "Términos del contrato..."
}
```

### Pagos

#### GET `/api/payments`
Obtener todos los pagos (Admin).

#### GET `/api/payments/tenant/:tenantId`
Obtener pagos de un inquilino.

#### POST `/api/payments` (Admin)
Registrar pago.

**Body:**
```json
{
  "contractId": "contract_uuid",
  "amount": 2500,
  "dueDate": "2025-02-01T00:00:00Z",
  "paymentMethod": "Transferencia"
}
```

---

## 🏗 Arquitectura del Sistema

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                     │
│  React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui    │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/HTTPS (REST API)
                         │
┌────────────────────────┴────────────────────────────────────┐
│                      SERVIDOR (Express.js)                   │
│  Node.js + TypeScript + Express + JWT + bcryptjs           │
├─────────────────────────────────────────────────────────────┤
│ Middleware:                                                  │
│ • Autenticación JWT                                          │
│ • Autorización basada en roles                              │
│ • Validación Zod                                             │
│ • Error handling                                             │
├─────────────────────────────────────────────────────────────┤
│ Rutas API:                                                   │
│ • /api/auth/*                                                │
│ • /api/locals/*                                              │
│ • /api/contracts/*                                           │
│ • /api/payments/*                                            │
│ • /api/requests/*                                            │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                    CAPA DE ALMACENAMIENTO                    │
│         MemStorage (Interfaz IStorage)                       │
│  • In-Memory Storage para desarrollo                         │
│  • Configurable para PostgreSQL en producción               │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                      BASE DE DATOS                           │
│   PostgreSQL (Neon Serverless)                              │
│   • Users                                                    │
│   • Locals                                                   │
│   • Contracts                                                │
│   • Payments                                                 │
│   • Requests                                                 │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Autenticación

```
1. Usuario ingresa credenciales
   ↓
2. POST /api/auth/login
   ↓
3. Servidor valida credenciales
   ↓
4. Genera JWT token
   ↓
5. Cliente almacena token en localStorage
   ↓
6. Futuras requests incluyen token en Authorization header
   ↓
7. Middleware verifica token
   ↓
8. Acceso autorizado/denegado según rol
```

---

## 🚢 Deployment

### Preparación para Producción

#### 1. Compilar la aplicación

```bash
npm run build
```

Este comando:
- Compila el cliente con Vite
- Agrupa el servidor con esbuild
- Genera archivos listos para producción en `dist/`

#### 2. Variables de entorno en producción

Asegúrate de configurar en tu servidor:

```env
NODE_ENV=production
DATABASE_URL=postgresql://... (tu base de datos en producción)
JWT_SECRET=clave_secreta_fuerte_aqui
SESSION_SECRET=clave_sesion_fuerte_aqui
PORT=5000
```

#### 3. Iniciar servidor de producción

```bash
npm start
```

### Publicar con Replit

1. Asegúrate que `npm start` funciona localmente
2. Haz commit de todos los cambios
3. Haz clic en el botón "Publish" en Replit
4. Espera a que se construya y despliegue
5. Tu app estará disponible en una URL pública

### Consideraciones de Seguridad

✅ **Configurado:**
- Contraseñas hasheadas con bcryptjs (salt 10)
- JWT para autenticación sin estado
- Validación con Zod en el servidor
- Middleware de autenticación/autorización
- CORS configurado

🔒 **Recomendaciones adicionales:**
- Usar HTTPS en producción
- Configurar rate limiting
- Implementar CSRF protection
- Mantener dependencias actualizadas
- Usar variables de entorno seguras
- Hacer backups regulares de base de datos

---

## 📊 Monitoreo y Mantenimiento

### Logs Importantes

Revisa los logs de la aplicación en:
- **Cliente**: Consola del navegador (F12)
- **Servidor**: Terminal de Replit

### Base de Datos

**Tablas principales:**
- `users`: Cuentas de usuario con roles
- `locals`: Espacios comerciales disponibles
- `contracts`: Acuerdos de arrendamiento
- `payments`: Registro de transacciones
- `requests`: Solicitudes de mantenimiento

**Consulta útil:**
```sql
SELECT status, COUNT(*) FROM locals GROUP BY status;
```

---

## 🤝 Contribución y Soporte

### Reportar Bugs

Para reportar errores:
1. Describe el problema claramente
2. Incluye pasos para reproducir
3. Especifica el navegador y versión
4. Adjunta screenshots si es posible

### Sugerencias de Mejora

Las sugerencias están siempre bienvenidas:
- Mejoras en UX/UI
- Nuevas características
- Optimizaciones de rendimiento
- Mejoras de seguridad

---

## 📝 Licencia

Este proyecto es propiedad de CCredoma. Todos los derechos reservados.

---

## 📞 Contacto

**Correo de Soporte:** support@ccredoma.com  
**Sitio Web:** www.ccredoma.com  
**Teléfono:** +1 (555) 123-4567

---

## 🎉 Conclusión

CCredoma es una solución moderna y completa para la gestión de centros comerciales. Con su interfaz intuitiva, arquitectura robusta y características avanzadas, facilita la administración de espacios comerciales de cualquier tamaño.

Para más información o consultas, no dudes en contactar con nuestro equipo de soporte.

**¡Gracias por usar CCredoma!** 🙏

---

**Última actualización:** Noviembre 2025  
**Versión:** 1.0.0
"# CC-Redoma" 
"# CC-Redoma" 

<div align="center" style="transition: transform 0.2s; display: inline-block;">
  <img height="150" src="https://avatars.githubusercontent.com/u/189280498?v=4" 
       style="border-radius: 15px; transition: transform 0.2s;" 
       onmouseover="this.style.transform='scale(1.1)'" 
       onmouseout="this.style.transform='scale(1)'"/>
</div>

