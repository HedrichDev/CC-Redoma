import { Switch, Route } from 'wouter';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from './lib/theme';
import { AuthProvider, useAuth } from './lib/auth';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { ProtectedRoute } from './components/protected-route';
import { ThemeToggle } from './components/theme-toggle';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useLocation } from 'wouter';

import Landing from './pages/landing';
import Login from './pages/login';
import Register from './pages/register';
import Catalog from './pages/catalog';
import LocalDetail from './pages/local-detail';
import NotFound from './pages/not-found';

import AdminDashboard from './pages/admin/dashboard';
import AdminLocals from './pages/admin/locals';
import AdminContracts from './pages/admin/contracts';
import AdminPayments from './pages/admin/payments';
import AdminRequests from './pages/admin/requests';

import TenantDashboard from './pages/tenant/dashboard';
import TenantContract from './pages/tenant/contract';
import TenantPayments from './pages/tenant/payments';

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation('/login');
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground font-body">
                {user?.fullName}
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                data-testid="button-logout"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </Button>
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function TenantLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation('/login');
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground font-body">
                {user?.fullName}
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                data-testid="button-logout"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </Button>
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/local/:id" component={LocalDetail} />

      <Route path="/admin/dashboard">
        <ProtectedRoute allowedRoles={['CentroComercialAdmin']}>
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/admin/locals">
        <ProtectedRoute allowedRoles={['CentroComercialAdmin']}>
          <AdminLayout>
            <AdminLocals />
          </AdminLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/admin/contracts">
        <ProtectedRoute allowedRoles={['CentroComercialAdmin']}>
          <AdminLayout>
            <AdminContracts />
          </AdminLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/admin/payments">
        <ProtectedRoute allowedRoles={['CentroComercialAdmin']}>
          <AdminLayout>
            <AdminPayments />
          </AdminLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/admin/requests">
        <ProtectedRoute allowedRoles={['CentroComercialAdmin']}>
          <AdminLayout>
            <AdminRequests />
          </AdminLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/tenant/dashboard">
        <ProtectedRoute allowedRoles={['LocalOwner']}>
          <TenantLayout>
            <TenantDashboard />
          </TenantLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/tenant/contract">
        <ProtectedRoute allowedRoles={['LocalOwner']}>
          <TenantLayout>
            <TenantContract />
          </TenantLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/tenant/payments">
        <ProtectedRoute allowedRoles={['LocalOwner']}>
          <TenantLayout>
            <TenantPayments />
          </TenantLayout>
        </ProtectedRoute>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
