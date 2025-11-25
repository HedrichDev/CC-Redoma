import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Search, MapPin, Square, DollarSign, Loader2 } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/lib/auth';
import type { Local, LocalType, LocalStatus } from '@shared/schema';
import retailImage from '@assets/generated_images/retail_commercial_space.png';
import restaurantImage from '@assets/generated_images/restaurant_commercial_space.png';
import officeImage from '@assets/generated_images/office_commercial_space.png';
import servicesImage from '@assets/generated_images/services_commercial_space.png';
import entertainmentImage from '@assets/generated_images/entertainment_commercial_space.png';

const typeImages: Record<LocalType, string> = {
  'Comercio': retailImage,
  'Restaurante': restaurantImage,
  'Oficina': officeImage,
  'Servicios': servicesImage,
  'Entretenimiento': entertainmentImage,
};

const statusColors: Record<LocalStatus, string> = {
  'Disponible': 'bg-green-500',
  'Ocupado': 'bg-gray-500',
  'Mantenimiento': 'bg-yellow-500',
  'Reservado': 'bg-blue-500',
};

export default function Catalog() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { data: locals, isLoading } = useQuery<Local[]>({
    queryKey: ['/api/locals'],
  });

  const filteredLocals = locals?.filter(local => {
    const matchesSearch = local.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         local.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || local.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || local.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">CCredoma</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <Button asChild data-testid="button-dashboard">
                <Link href={user.role === 'CentroComercialAdmin' ? '/admin/dashboard' : user.role === 'LocalOwner' ? '/tenant/dashboard' : '#'}>
                  Dashboard
                </Link>
              </Button>
            ) : (
              <Button asChild data-testid="link-login">
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Locales Disponibles</h1>
          <p className="text-xl text-muted-foreground font-body">
            Explora nuestro catálogo de espacios comerciales
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar locales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-48" data-testid="select-type">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="Comercio">Comercio</SelectItem>
              <SelectItem value="Restaurante">Restaurante</SelectItem>
              <SelectItem value="Servicios">Servicios</SelectItem>
              <SelectItem value="Entretenimiento">Entretenimiento</SelectItem>
              <SelectItem value="Oficina">Oficina</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48" data-testid="select-status">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="Disponible">Disponible</SelectItem>
              <SelectItem value="Ocupado">Ocupado</SelectItem>
              <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
              <SelectItem value="Reservado">Reservado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredLocals && filteredLocals.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLocals.map((local) => (
              <Card 
                key={local.id} 
                className="overflow-hidden hover-elevate active-elevate-2 transition-all"
                data-testid={`card-local-${local.id}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={typeImages[local.type]}
                    alt={local.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className={`absolute top-4 right-4 ${statusColors[local.status]} text-white border-0`}
                    data-testid={`badge-status-${local.id}`}
                  >
                    {local.status}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{local.name}</h3>
                    <p className="text-sm text-muted-foreground font-body line-clamp-2">
                      {local.description}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4 text-sm font-body">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{local.location} • Piso {local.floor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Square className="h-4 w-4" />
                      <span>{local.size} m²</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-lg">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span>${Number(local.monthlyPrice).toLocaleString()}/mes</span>
                    </div>
                  </div>

                  <Button 
                    asChild 
                    className="w-full"
                    variant={local.status === 'Disponible' ? 'default' : 'outline'}
                    data-testid={`button-view-local-${local.id}`}
                  >
                    <Link href={`/local/${local.id}`}>
                      Ver Detalles
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground font-body">
              No se encontraron locales con los filtros seleccionados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
