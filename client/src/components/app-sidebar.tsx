import { 
  LayoutDashboard, 
  Store, 
  FileText, 
  DollarSign, 
  MessageSquare,
  LogOut,
  Building2
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const adminMenuItems = [
  {
    title: 'Panel Principal',
    url: '/admin/dashboard',
    icon: LayoutDashboard,
    group: 'Gestión',
  },
  {
    title: 'Locales',
    url: '/admin/locals',
    icon: Store,
    group: 'Gestión',
  },
  {
    title: 'Contratos',
    url: '/admin/contracts',
    icon: FileText,
    group: 'Finanzas',
  },
  {
    title: 'Pagos',
    url: '/admin/payments',
    icon: DollarSign,
    group: 'Finanzas',
  },
  {
    title: 'Solicitudes',
    url: '/admin/requests',
    icon: MessageSquare,
    group: 'Comunicación',
  },
];

const tenantMenuItems = [
  {
    title: 'Mi Dashboard',
    url: '/tenant/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Mi Contrato',
    url: '/tenant/contract',
    icon: FileText,
  },
  {
    title: 'Mis Pagos',
    url: '/tenant/payments',
    icon: DollarSign,
  },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { user, logout, isAdmin } = useAuth();

  const menuItems = isAdmin ? adminMenuItems : tenantMenuItems;
  const groupedItems = menuItems.reduce((acc, item) => {
    const group = 'group' in item ? item.group : 'Principal';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  const initials = user?.fullName
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '??';

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">CCredoma</h2>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? 'Administración' : 'Portal Inquilino'}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {Object.entries(groupedItems).map(([group, items]) => (
          <SidebarGroup key={group}>
            {isAdmin && <SidebarGroupLabel>{group}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = location === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Link href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 p-2 rounded-md bg-sidebar-accent">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.fullName}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={() => logout()}
          data-testid="button-logout"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
