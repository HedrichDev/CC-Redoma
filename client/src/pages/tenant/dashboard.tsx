import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, DollarSign, Calendar, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import type { ContractWithDetails, Payment } from '@shared/schema';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function TenantDashboard() {
  const { user } = useAuth();

  const { data: contracts, isLoading: contractsLoading } = useQuery<ContractWithDetails[]>({
    queryKey: ['/api/contracts/my'],
    enabled: !!user,
  });

  const { data: payments, isLoading: paymentsLoading } = useQuery<Payment[]>({
    queryKey: ['/api/payments/my'],
    enabled: !!user,
  });

  const isLoading = contractsLoading || paymentsLoading;
  const activeContract = contracts?.find(c => c.status === 'Activo');
  const nextPayment = payments?.find(p => p.status === 'Pendiente');
  const paidCount = payments?.filter(p => p.status === 'Pagado').length || 0;

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
        <h1 className="text-3xl font-bold mb-2">Bienvenido, {user?.fullName}</h1>
        <p className="text-muted-foreground font-body">
          Resumen de tu alquiler y pagos
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card data-testid="card-contract-status">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado del Contrato</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {activeContract ? (
              <>
                <div className="text-2xl font-bold">{activeContract.status}</div>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  {activeContract.local.name}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground font-body">Sin contrato activo</p>
            )}
          </CardContent>
        </Card>

        <Card data-testid="card-monthly-rent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Renta Mensual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {activeContract ? (
              <>
                <div className="text-2xl font-bold">
                  ${Number(activeContract.monthlyRent).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  Por mes
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground font-body">-</p>
            )}
          </CardContent>
        </Card>

        <Card data-testid="card-next-payment">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Pago</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {nextPayment ? (
              <>
                <div className="text-2xl font-bold">
                  {format(new Date(nextPayment.dueDate), 'dd MMM', { locale: es })}
                </div>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  ${Number(nextPayment.amount).toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground font-body">Sin pagos pendientes</p>
            )}
          </CardContent>
        </Card>
      </div>

      {activeContract && (
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Contrato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground font-body mb-1">Local</p>
                <p className="font-semibold">{activeContract.local.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-body mb-1">Estado</p>
                <Badge>{activeContract.status}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-body mb-1">Fecha de Inicio</p>
                <p className="font-body">
                  {format(new Date(activeContract.startDate), 'dd MMMM yyyy', { locale: es })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-body mb-1">Fecha de Vencimiento</p>
                <p className="font-body">
                  {format(new Date(activeContract.endDate), 'dd MMMM yyyy', { locale: es })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-body mb-1">Renta Mensual</p>
                <p className="font-semibold text-lg">
                  ${Number(activeContract.monthlyRent).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-body mb-1">Depósito</p>
                <p className="font-body">
                  ${Number(activeContract.deposit).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Resumen de Pagos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-sm font-body">Pagos Realizados</span>
              </div>
              <span className="text-2xl font-bold">{paidCount}</span>
            </div>
            {nextPayment && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="text-sm font-body">Próximo Vencimiento</span>
                </div>
                <span className="text-lg font-semibold">
                  {format(new Date(nextPayment.dueDate), 'dd MMM yyyy', { locale: es })}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
