import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import type { PaymentWithContract } from '@shared/schema';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function AdminPayments() {
  const { data: payments, isLoading } = useQuery<PaymentWithContract[]>({
    queryKey: ['/api/payments'],
  });

  const statusColors: Record<string, string> = {
    'Pendiente': 'secondary',
    'Pagado': 'default',
    'Atrasado': 'destructive',
    'Cancelado': 'outline',
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gestión de Pagos</h1>
        <p className="text-muted-foreground font-body">
          Seguimiento de todos los pagos de alquiler
        </p>
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
                  <TableHead>Local</TableHead>
                  <TableHead>Inquilino</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead>Fecha de Pago</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments && payments.length > 0 ? (
                  payments.map((payment) => (
                    <TableRow key={payment.id} data-testid={`row-payment-${payment.id}`}>
                      <TableCell className="font-medium">{payment.contract.local.name}</TableCell>
                      <TableCell className="font-body">{payment.contract.tenant.fullName}</TableCell>
                      <TableCell className="font-body">
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
                      <TableCell>
                        <Badge variant={statusColors[payment.status] as any}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground font-body">
                      No hay pagos registrados
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
