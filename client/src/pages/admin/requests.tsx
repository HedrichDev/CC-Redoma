import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import type { Request } from '@shared/schema';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function AdminRequests() {
  const { data: requests, isLoading } = useQuery<Request[]>({
    queryKey: ['/api/requests'],
  });

  const statusColors: Record<string, string> = {
    'Pendiente': 'secondary',
    'EnProceso': 'default',
    'Respondida': 'outline',
    'Cerrada': 'outline',
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Solicitudes de Información</h1>
        <p className="text-muted-foreground font-body">
          Gestiona las solicitudes de potenciales clientes
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
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Mensaje</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests && requests.length > 0 ? (
                  requests.map((request) => (
                    <TableRow key={request.id} data-testid={`row-request-${request.id}`}>
                      <TableCell className="font-medium">{request.name}</TableCell>
                      <TableCell className="font-body">{request.email}</TableCell>
                      <TableCell className="font-body">{request.phone}</TableCell>
                      <TableCell className="font-body max-w-md truncate">{request.message}</TableCell>
                      <TableCell className="font-body">
                        {format(new Date(request.createdAt), 'dd MMM yyyy', { locale: es })}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusColors[request.status] as any}>
                          {request.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground font-body">
                      No hay solicitudes registradas
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
