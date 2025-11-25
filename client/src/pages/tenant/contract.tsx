import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, FileText, Calendar, DollarSign, User } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import type { ContractWithDetails } from '@shared/schema';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function TenantContract() {
  const { user } = useAuth();

  const { data: contracts, isLoading } = useQuery<ContractWithDetails[]>({
    queryKey: ['/api/contracts/my'],
    enabled: !!user,
  });

  const activeContract = contracts?.find(c => c.status === 'Activo');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!activeContract) {
    return (
      <div className="p-8">
        <div className="text-center py-20">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No tienes un contrato activo</h2>
          <p className="text-muted-foreground font-body">
            Ponte en contacto con la administración para más información
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mi Contrato de Arrendamiento</h1>
          <p className="text-muted-foreground font-body">
            Detalles completos de tu contrato
          </p>
        </div>
        <Badge 
          variant={activeContract.status === 'Activo' ? 'default' : 'secondary'}
          className="text-lg px-4 py-2"
          data-testid="badge-contract-status"
        >
          {activeContract.status}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <img src="/favicon.png" alt="Local" className="h-5 w-5" />
              Información del Local
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground font-body mb-1">Nombre del Local</p>
              <p className="text-lg font-semibold">{activeContract.local.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground font-body mb-1">Tipo</p>
              <p className="font-body">{activeContract.local.type}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground font-body mb-1">Ubicación</p>
              <p className="font-body">{activeContract.local.location}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t">
              <div>
                <p className="text-sm text-muted-foreground font-body mb-1">Tamaño</p>
                <p className="font-semibold">{activeContract.local.size} m²</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-body mb-1">Piso</p>
                <p className="font-semibold">Nivel {activeContract.local.floor}</p>
              </div>
            </div>

            {activeContract.local.amenities && activeContract.local.amenities.length > 0 && (
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground font-body mb-2">Amenidades</p>
                <div className="flex flex-wrap gap-2">
                  {activeContract.local.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="font-body">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Periodo del Contrato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground font-body mb-1">Fecha de Inicio</p>
              <p className="text-lg font-semibold">
                {format(new Date(activeContract.startDate), 'dd MMMM yyyy', { locale: es })}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground font-body mb-1">Fecha de Vencimiento</p>
              <p className="text-lg font-semibold">
                {format(new Date(activeContract.endDate), 'dd MMMM yyyy', { locale: es })}
              </p>
            </div>

            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground font-body mb-1">Duración Total</p>
              <p className="font-body">
                {Math.ceil(
                  (new Date(activeContract.endDate).getTime() - new Date(activeContract.startDate).getTime()) 
                  / (1000 * 60 * 60 * 24 * 30)
                )} meses aproximadamente
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Información Financiera
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground font-body mb-1">Renta Mensual</p>
              <p className="text-3xl font-bold text-primary">
                ${Number(activeContract.monthlyRent).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground font-body mt-1">por mes</p>
            </div>

            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground font-body mb-1">Depósito de Garantía</p>
              <p className="text-lg font-semibold">
                ${Number(activeContract.deposit).toLocaleString()}
              </p>
            </div>

            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground font-body mb-1">Total Anual Estimado</p>
              <p className="text-lg font-semibold">
                ${(Number(activeContract.monthlyRent) * 12).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información del Inquilino
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground font-body mb-1">Nombre Completo</p>
              <p className="text-lg font-semibold">{activeContract.tenant.fullName}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground font-body mb-1">Email</p>
              <p className="font-body">{activeContract.tenant.email}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground font-body mb-1">Teléfono</p>
              <p className="font-body">{activeContract.tenant.phone || '-'}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Términos y Condiciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none font-body">
            <p className="whitespace-pre-wrap">{activeContract.terms}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Información Importante</h3>
              <p className="text-sm text-muted-foreground font-body">
                Este contrato se rige por las leyes locales de arrendamiento comercial. 
                Para cualquier consulta o modificación, por favor contacta con la administración 
                del centro comercial a través del dashboard o vía email.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
