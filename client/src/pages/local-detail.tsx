import { useState } from 'react';
import { Link, useParams, useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Building2, MapPin, Square, DollarSign, ArrowLeft, Loader2 } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { insertRequestSchema, type InsertRequest, type Local } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import retailImage from '@assets/generated_images/retail_commercial_space.png';
import restaurantImage from '@assets/generated_images/restaurant_commercial_space.png';
import officeImage from '@assets/generated_images/office_commercial_space.png';
import servicesImage from '@assets/generated_images/services_commercial_space.png';
import entertainmentImage from '@assets/generated_images/entertainment_commercial_space.png';

const typeImages: Record<string, string> = {
  'Comercio': retailImage,
  'Restaurante': restaurantImage,
  'Oficina': officeImage,
  'Servicios': servicesImage,
  'Entretenimiento': entertainmentImage,
};

const statusColors: Record<string, string> = {
  'Disponible': 'bg-green-500',
  'Ocupado': 'bg-gray-500',
  'Mantenimiento': 'bg-yellow-500',
  'Reservado': 'bg-blue-500',
};

export default function LocalDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: local, isLoading } = useQuery<Local>({
    queryKey: ['/api/locals', id],
    enabled: !!id,
  });

  const form = useForm<InsertRequest>({
    resolver: zodResolver(insertRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      localId: id,
      message: '',
    },
  });

  const createRequestMutation = useMutation({
    mutationFn: async (data: InsertRequest) => {
      return await apiRequest('POST', '/api/requests', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/requests'] });
      toast({
        title: 'Solicitud enviada',
        description: 'Nos pondremos en contacto contigo pronto',
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo enviar la solicitud',
        variant: 'destructive',
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!local) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-xl text-muted-foreground">Local no encontrado</p>
        <Button asChild>
          <Link href="/catalog">Volver al catálogo</Link>
        </Button>
      </div>
    );
  }

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
            {user && (
              <Button asChild data-testid="button-dashboard">
                <Link href={user.role === 'CentroComercialAdmin' ? '/admin/dashboard' : '/tenant/dashboard'}>
                  Dashboard
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container px-6 py-12 max-w-6xl">
        <Button variant="ghost" asChild className="mb-6" data-testid="button-back">
          <Link href="/catalog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al catálogo
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                <img
                  src={typeImages[local.type]}
                  alt={local.name}
                  className="w-full h-full object-cover"
                />
                <Badge 
                  className={`absolute top-4 right-4 ${statusColors[local.status]} text-white border-0`}
                >
                  {local.status}
                </Badge>
              </div>

              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{local.name}</h1>
                  <p className="text-muted-foreground font-body">{local.type}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    ${Number(local.monthlyPrice).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground font-body">por mes</p>
                </div>
              </div>

              <p className="text-lg font-body text-muted-foreground leading-relaxed">
                {local.description}
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Especificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Square className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-body">Tamaño</p>
                      <p className="font-semibold">{local.size} m²</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-body">Ubicación</p>
                      <p className="font-semibold">{local.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-body">Piso</p>
                      <p className="font-semibold">Nivel {local.floor}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-body">Tipo</p>
                      <p className="font-semibold">{local.type}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {local.amenities && local.amenities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Amenidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {local.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Solicitar Información</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground font-body">
                  ¿Interesado en este local? Contáctanos para más detalles
                </p>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full" 
                      disabled={local.status !== 'Disponible'}
                      data-testid="button-contact"
                    >
                      {local.status === 'Disponible' ? 'Contactar' : 'No Disponible'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Solicitar Información</DialogTitle>
                      <DialogDescription className="font-body">
                        Completa el formulario y nos pondremos en contacto contigo
                      </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit((data) => createRequestMutation.mutate(data))} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu nombre" {...field} data-testid="input-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="tu@email.com" {...field} data-testid="input-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 234 567 8900" {...field} data-testid="input-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mensaje</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Cuéntanos sobre tu interés en este local..." 
                                  {...field} 
                                  data-testid="input-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={createRequestMutation.isPending}
                          data-testid="button-submit-request"
                        >
                          {createRequestMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Enviar Solicitud
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>

                <div className="pt-4 border-t space-y-2 text-sm font-body">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estado:</span>
                    <Badge className={`${statusColors[local.status]} text-white border-0`}>
                      {local.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tamaño:</span>
                    <span className="font-medium">{local.size} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Piso:</span>
                    <span className="font-medium">Nivel {local.floor}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
