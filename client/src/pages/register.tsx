import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertUserSchema, type InsertUser } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Building2, Loader2 } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { apiRequest } from '@/lib/queryClient';

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
      fullName: '',
      phone: '',
      role: 'VisitanteExterno',
    },
  });

  const onSubmit = async (data: InsertUser) => {
    setIsLoading(true);
    try {
      await apiRequest('POST', '/api/auth/register', data);
      toast({
        title: 'Registro exitoso',
        description: 'Tu cuenta ha sido creada. Por favor inicia sesión.',
      });
      setLocation('/login');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo crear la cuenta',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Building2 className="h-10 w-10 text-primary" />
          <span className="text-3xl font-bold">CCredoma</span>
        </div>

        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
            <CardDescription className="font-body">
              Regístrate para explorar locales disponibles y solicitar información
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre Completo</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Juan Pérez" 
                            {...field} 
                            disabled={isLoading}
                            data-testid="input-fullname"
                          />
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
                          <Input 
                            type="email" 
                            placeholder="juan@ejemplo.com" 
                            {...field} 
                            disabled={isLoading}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usuario</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="juanperez" 
                            {...field} 
                            disabled={isLoading}
                            data-testid="input-username"
                          />
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
                          <Input 
                            placeholder="+1 234 567 8900" 
                            {...field} 
                            disabled={isLoading}
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••" 
                            {...field} 
                            disabled={isLoading}
                            data-testid="input-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  data-testid="button-submit-register"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Crear Cuenta
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm font-body">
              <span className="text-muted-foreground">¿Ya tienes cuenta? </span>
              <Link href="/login" className="text-primary hover:underline" data-testid="link-login">
                Inicia sesión aquí
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground font-body" data-testid="link-home">
                ← Volver al inicio
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
