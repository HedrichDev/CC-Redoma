import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import type { ContractWithDetails } from '@shared/schema';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function AdminContracts() {
  const { data: contracts, isLoading } = useQuery<ContractWithDetails[]>({
    queryKey: ['/api/contracts'],
  });

  const statusColors: Record<string, string> = {
    'Activo': 'default',
    'Vencido': 'destructive',
    'Renovacion': 'secondary',
    'Cancelado': 'outline',
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gestión de Contratos</h1>
        <p className="text-muted-foreground font-body">
          Administra todos los contratos de alquiler
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
                  <TableHead>Inicio</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead>Renta Mensual</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts && contracts.length > 0 ? (
                  contracts.map((contract) => (
                    <TableRow key={contract.id} data-testid={`row-contract-${contract.id}`}>
                      <TableCell className="font-medium">{contract.local.name}</TableCell>
                      <TableCell className="font-body">{contract.tenant.fullName}</TableCell>
                      <TableCell className="font-body">
                        {format(new Date(contract.startDate), 'dd MMM yyyy', { locale: es })}
                      </TableCell>
                      <TableCell className="font-body">
                        {format(new Date(contract.endDate), 'dd MMM yyyy', { locale: es })}
                      </TableCell>
                      <TableCell className="font-body">
                        ${Number(contract.monthlyRent).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusColors[contract.status] as any}>
                          {contract.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground font-body">
                      No hay contratos registrados
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
