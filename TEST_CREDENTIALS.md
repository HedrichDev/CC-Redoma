# CCredoma - Test Credentials & Verification Guide

## Test Users by Role

All test users use the password: **`password`**

### 1. Admin (CentroComercialAdmin)
- **Username**: `admin`
- **Password**: `password`
- **Email**: admin@ccredoma.com
- **Full Name**: Administrador CCredoma
- **Phone**: +1 234 567 8900
- **Access**: Dashboard administrativo con panel de control, gestión de locales, contratos, pagos, y solicitudes

### 2. Tenant/Local Owner (LocalOwner)
- **Username**: `inquilino1`
- **Password**: `password`
- **Email**: inquilino@example.com
- **Full Name**: María González
- **Phone**: +1 234 567 8901
- **Access**: Portal de inquilino con dashboard, contrato activo (Local B-205), historial de pagos, y gestión de renovaciones

### 3. External Visitor (VisitanteExterno)
- **Username**: `visitante`
- **Password**: `password`
- **Email**: visitante@example.com
- **Full Name**: Visitante Externo
- **Phone**: +1 234 567 8902
- **Access**: Catálogo público de locales, envío de solicitudes de información

---

## Verification Steps

### Step 1: Test Admin Login
1. Go to http://localhost:5000/login
2. Enter username: `admin`
3. Enter password: `password`
4. Verify: Redirects to `/admin/dashboard`
5. Verify: Can see:
   - Sidebar with: Dashboard, Locales, Contratos, Pagos, Solicitudes
   - Metrics cards showing stats
   - Tables with admin data

### Step 2: Test Tenant Login
1. Go to http://localhost:5000/login
2. Enter username: `inquilino1`
3. Enter password: `password`
4. Verify: Redirects to `/tenant/dashboard`
5. Verify: Can see:
   - Sidebar with: Dashboard, Mi Contrato, Mis Pagos
   - Dashboard showing contract summary
   - Can access `/tenant/contract` - shows "Local B-205" details
   - Can access `/tenant/payments` - shows payment history

### Step 3: Test External Visitor (Public Access)
1. Go to http://localhost:5000 (landing page)
2. Verify: Can view public pages without login:
   - Landing page with hero image
   - Browse catalog of available locales
   - View local details
   - Send contact request form
3. Optional login as `visitante` with password `password`
4. Verify: Still has access to public pages

### Step 4: Test Role-Based Access Control
1. Login as Admin
2. Try to access `/tenant/dashboard` - should redirect to admin dashboard
3. Logout and login as Tenant
4. Try to access `/admin/dashboard` - should redirect to tenant dashboard or show error
5. Verify: Each role only sees appropriate routes

### Step 5: Test Protected Routes
1. Try accessing `/admin/dashboard` without login - should redirect to login
2. Try accessing `/tenant/dashboard` without login - should redirect to login
3. After login as correct role, verify access is granted

---

## Sample Data Available

### Locales in Catalog
- **Local A-101** (Comercio) - 85.5m², Piso 1, Disponible - $2,500/mes
- **Local B-205** (Restaurante) - 120m², Piso 2, Ocupado - $3,800/mes
- **Local C-150** (Oficina) - 65m², Piso 1, Disponible - $1,900/mes
- **Local D-302** (Servicios) - 180m², Piso 3, Disponible - $4,500/mes
- **Local E-110** (Entretenimiento) - 95m², Piso 1, Reservado - $3,200/mes

### Active Contract
- **Tenant**: María González (inquilino1)
- **Local**: Local B-205
- **Duration**: 2024-01-01 to 2025-12-31
- **Monthly Rent**: $3,800
- **Deposit**: $7,600

### Payment History
- 5 payments marked as "Pagado" (Paid)
- 1 payment marked as "Pendiente" (Pending)

### Pending Requests
- 2 contact requests in the system from potential tenants

---

## Test Scenarios

### Scenario 1: Admin Full Workflow
```
1. Login as admin
2. View dashboard metrics
3. Browse and create a new local
4. Update existing local status
5. View all contracts
6. View payment history
7. Manage contact requests
8. Logout
```

### Scenario 2: Tenant Self-Service
```
1. Login as inquilino1
2. View dashboard summary
3. View active contract (Local B-205)
4. View payment history (5 paid + 1 pending)
5. Navigate between pages
6. Logout
```

### Scenario 3: Public Visitor
```
1. Browse landing page
2. Filter and search locales
3. View local detail page
4. Submit contact request
5. Optional: Create account or login
```

---

## Technical Details

### Authentication
- Method: JWT (JSON Web Tokens)
- Token Storage: localStorage (`ccredoma-token`)
- Password Hashing: bcryptjs (10 rounds)
- Token expiration: Configured in auth middleware

### API Endpoints for Testing

#### Authentication
- `POST /api/auth/login` - Login with username/password
- `GET /api/auth/me` - Get current user (requires token)
- `POST /api/auth/logout` - Logout

#### Locals
- `GET /api/locals` - List all locals (public)
- `GET /api/locals/:id` - Get local details (public)
- `POST /api/locals` - Create local (admin only)
- `PATCH /api/locals/:id` - Update local (admin only)

#### Contracts
- `GET /api/contracts` - List all contracts (admin only)
- `GET /api/contracts/my` - Get tenant's contracts (tenant only)

#### Payments
- `GET /api/payments` - List all payments (admin only)
- `GET /api/payments/my` - Get tenant's payments (tenant only)

#### Requests
- `GET /api/requests` - List all requests (admin only)
- `POST /api/requests` - Create new request (public)

---

## Troubleshooting

### Login Not Working
- Check browser console for errors
- Verify credentials match exactly (case-sensitive)
- Clear localStorage: `localStorage.clear()`
- Restart application: Server restart auto-reloads data

### Role Not Changing
- Clear browser cache and localStorage
- Log out completely
- Try private/incognito browsing window

### Routes Not Accessible
- Verify JWT token is in localStorage
- Check browser network tab for 401/403 responses
- Verify token includes correct role in payload

---

## Notes

- All test data is in-memory (MemStorage) - persists only during session
- Restarting server resets all data to seed state
- Test credentials are documented for demo purposes
- Production should use environment-specific credentials
