import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { insertLocalSchema, type InsertLocal, type Local } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';

export default function AdminLocals() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLocal, setEditingLocal] = useState<Local | null>(null);

  const { data: locals, isLoading } = useQuery<Local[]>({
    queryKey: ['/api/locals'],
  });

  const form = useForm<InsertLocal>({
    resolver: zodResolver(insertLocalSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'Comercio',
      status: 'Disponible',
      size: '0',
      floor: 1,
      monthlyPrice: '0',
      images: [],
      amenities: [],
      location: '',
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertLocal) => {
      return await apiRequest('POST', '/api/locals', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/locals'] });
      toast({ title: 'Local creado exitosamente' });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertLocal }) => {
      return await apiRequest('PATCH', `/api/locals/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/locals'] });
      toast({ title: 'Local actualizado exitosamente' });
      setIsDialogOpen(false);
      setEditingLocal(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest('DELETE', `/api/locals/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/locals'] });
      toast({ title: 'Local eliminado exitosamente' });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const handleEdit = (local: Local) => {
    setEditingLocal(local);
    form.reset({
      name: local.name,
      description: local.description,
      type: local.type,
      status: local.status,
      size: local.size.toString(),
      floor: local.floor,
      monthlyPrice: local.monthlyPrice.toString(),
      images: local.images,
      amenities: local.amenities,
      location: local.location,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: InsertLocal) => {
    if (editingLocal) {
      updateMutation.mutate({ id: editingLocal.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingLocal(null);
      form.reset();
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestión de Locales</h1>
          <p className="text-muted-foreground font-body">
            Administra el inventario de espacios comerciales
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-local">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Local
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingLocal ? 'Editar Local' : 'Crear Nuevo Local'}</DialogTitle>
              <DialogDescription className="font-body">
                Completa la información del local comercial
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Local A-101" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-type">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Comercio">Comercio</SelectItem>
                            <SelectItem value="Restaurante">Restaurante</SelectItem>
                            <SelectItem value="Servicios">Servicios</SelectItem>
                            <SelectItem value="Entretenimiento">Entretenimiento</SelectItem>
                            <SelectItem value="Oficina">Oficina</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-status">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Disponible">Disponible</SelectItem>
                            <SelectItem value="Ocupado">Ocupado</SelectItem>
                            <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                            <SelectItem value="Reservado">Reservado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tamaño (m²)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="100.00" {...field} data-testid="input-size" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="floor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Piso</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="1" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value))}
                            data-testid="input-floor"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="monthlyPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio Mensual ($)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="2000.00" {...field} data-testid="input-price" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Ubicación</FormLabel>
                        <FormControl>
                          <Input placeholder="Ala Norte, Sección A" {...field} data-testid="input-location" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe las características del local..." 
                          {...field} 
                          data-testid="input-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 justify-end">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => handleDialogClose(false)}
                    data-testid="button-cancel"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit"
                  >
                    {(createMutation.isPending || updateMutation.isPending) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {editingLocal ? 'Actualizar' : 'Crear'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Tamaño</TableHead>
                  <TableHead>Piso</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locals && locals.length > 0 ? (
                  locals.map((local) => (
                    <TableRow key={local.id} data-testid={`row-local-${local.id}`}>
                      <TableCell className="font-medium">{local.name}</TableCell>
                      <TableCell className="font-body">{local.type}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={local.status === 'Disponible' ? 'default' : 'secondary'}
                          data-testid={`badge-status-${local.id}`}
                        >
                          {local.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-body">{local.size} m²</TableCell>
                      <TableCell className="font-body">Nivel {local.floor}</TableCell>
                      <TableCell className="font-body">${Number(local.monthlyPrice).toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleEdit(local)}
                            data-testid={`button-edit-${local.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => deleteMutation.mutate(local.id)}
                            data-testid={`button-delete-${local.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground font-body">
                      No hay locales registrados
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
