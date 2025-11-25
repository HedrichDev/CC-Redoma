import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import type { Payment } from '@shared/schema';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function TenantPayments() {
  const { data: payments, isLoading } = useQuery<Payment[]>({
    queryKey: ['/api/payments/my'],
  });

  const statusColors: Record<string, string> = {
    'Pendiente': 'secondary',
    'Pagado': 'default',
    'Atrasado': 'destructive',
    'Cancelado': 'outline',
  };

  const totalPaid = payments
    ?.filter(p => p.status === 'Pagado')
    .reduce((sum, p) => sum + Number(p.amount), 0) || 0;

  const pendingAmount = payments
    ?.filter(p => p.status === 'Pendiente')
    .reduce((sum, p) => sum + Number(p.amount), 0) || 0;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mis Pagos</h1>
        <p className="text-muted-foreground font-body">
          Historial completo de tus pagos de alquiler
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Pagado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ${totalPaid.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pendiente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              ${pendingAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Monto</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead>Fecha de Pago</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments && payments.length > 0 ? (
                  payments.map((payment) => (
                    <TableRow key={payment.id} data-testid={`row-payment-${payment.id}`}>
                      <TableCell className="font-semibold">
                        ${Number(payment.amount).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-body">
                        {format(new Date(payment.dueDate), 'dd MMM yyyy', { locale: es })}
                      </TableCell>
                      <TableCell className="font-body">
                        {payment.paidDate 
                          ? format(new Date(payment.paidDate), 'dd MMM yyyy', { locale: es })
                          : '-'
                        }
                      </TableCell>
                      <TableCell className="font-body">
                        {payment.paymentMethod || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusColors[payment.status] as any}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground font-body">
                      No tienes pagos registrados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
