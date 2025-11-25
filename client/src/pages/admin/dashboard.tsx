import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, FileText, DollarSign, TrendingUp, Loader2 } from 'lucide-react';
import type { Local, Contract, Payment } from '@shared/schema';

export default function AdminDashboard() {
  const { data: locals, isLoading: localsLoading } = useQuery<Local[]>({
    queryKey: ['/api/locals'],
  });

  const { data: contracts, isLoading: contractsLoading } = useQuery<Contract[]>({
    queryKey: ['/api/contracts'],
  });

  const { data: payments, isLoading: paymentsLoading } = useQuery<Payment[]>({
    queryKey: ['/api/payments'],
  });

  const isLoading = localsLoading || contractsLoading || paymentsLoading;

  const availableLocals = locals?.filter(l => l.status === 'Disponible').length || 0;
  const occupiedLocals = locals?.filter(l => l.status === 'Ocupado').length || 0;
  const occupancyRate = locals && locals.length > 0 
    ? Math.round((occupiedLocals / locals.length) * 100) 
    : 0;

  const activeContracts = contracts?.filter(c => c.status === 'Activo').length || 0;
  
  const totalRevenue = contracts
    ?.filter(c => c.status === 'Activo')
    .reduce((sum, c) => sum + Number(c.monthlyRent), 0) || 0;

  const paidPayments = payments?.filter(p => p.status === 'Pagado').length || 0;
  const pendingPayments = payments?.filter(p => p.status === 'Pendiente').length || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Panel de Control</h1>
        <p className="text-muted-foreground font-body">
          Visión general de tu centro comercial
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card data-testid="card-metric-occupancy">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Ocupación</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground font-body mt-1">
              {occupiedLocals} de {locals?.length || 0} locales ocupados
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-metric-available">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locales Disponibles</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{availableLocals}</div>
            <p className="text-xs text-muted-foreground font-body mt-1">
              Espacios listos para alquilar
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-metric-contracts">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Activos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeContracts}</div>
            <p className="text-xs text-muted-foreground font-body mt-1">
              Total de contratos vigentes
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-metric-revenue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground font-body mt-1">
              Renta mensual total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Estado de Pagos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm font-body">Pagados</span>
                </div>
                <span className="text-2xl font-bold">{paidPayments}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="text-sm font-body">Pendientes</span>
                </div>
                <span className="text-2xl font-bold">{pendingPayments}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución de Locales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-sm font-body">Ocupados</span>
                </div>
                <span className="text-2xl font-bold">{occupiedLocals}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm font-body">Disponibles</span>
                </div>
                <span className="text-2xl font-bold">{availableLocals}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
