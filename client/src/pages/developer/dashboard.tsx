import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Code2, Database, Users, Settings, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function DeveloperDashboard() {
  const { user } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ['/api/dev/stats'],
    retry: false,
  });

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Desarrollador</h1>
        <p className="text-muted-foreground">Herramientas y utilidades para el desarrollo de CCredoma</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-4">
            <CardTitle className="text-sm font-medium">API Status</CardTitle>
            <Code2 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">✓ Online</div>
            <Badge variant="outline" className="mt-2">Express.js</Badge>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-4">
            <CardTitle className="text-sm font-medium">Base de Datos</CardTitle>
            <Database className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">In-Memory</div>
            <Badge variant="outline" className="mt-2">MemStorage</Badge>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-4">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-2">Admin, Inquilino, Visitante, Developer</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Credenciales de Prueba
            </CardTitle>
            <CardDescription>Usuarios de prueba para desarrollo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-semibold">Admin</div>
              <code className="block text-xs bg-muted p-2 rounded">admin / password</code>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-semibold">Inquilino</div>
              <code className="block text-xs bg-muted p-2 rounded">inquilino1 / password</code>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-semibold">Visitante</div>
              <code className="block text-xs bg-muted p-2 rounded">visitante / password</code>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-semibold">Developer</div>
              <code className="block text-xs bg-muted p-2 rounded">HedrichDev / Coralito*10</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Información del Sistema
            </CardTitle>
            <CardDescription>Detalles de configuración</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">Entorno</div>
              <div className="font-semibold">Desarrollo</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Autenticación</div>
              <div className="font-semibold">JWT + bcryptjs</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Marco Frontend</div>
              <div className="font-semibold">React 18 + TypeScript</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Marco Backend</div>
              <div className="font-semibold">Express.js + Node.js</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Usuario Actual</div>
              <div className="font-semibold">{user?.fullName}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Endpoints API</CardTitle>
          <CardDescription>Rutas disponibles en el backend</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-green-600 dark:text-green-400">Autenticación</div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>POST /api/auth/register</li>
              <li>POST /api/auth/login</li>
              <li>GET /api/auth/me</li>
              <li>POST /api/auth/logout</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">Recursos</div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>GET /api/locals - Listar locales</li>
              <li>POST /api/locals - Crear local (Admin)</li>
              <li>GET /api/contracts - Listar contratos</li>
              <li>GET /api/payments - Listar pagos</li>
              <li>GET /api/requests - Listar solicitudes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
