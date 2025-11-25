import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginCredentials } from '@shared/schema';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login, user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      await login(data.username, data.password);
      toast({
        title: 'Bienvenido',
        description: 'Has iniciado sesión correctamente',
      });
      
      window.location.reload();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Credenciales inválidas',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    const redirectPath = user.role === 'CentroComercialAdmin' 
      ? '/admin/dashboard' 
      : user.role === 'LocalOwner' 
      ? '/tenant/dashboard' 
      : '/catalog';
    setLocation(redirectPath);
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-8">
          <img src="/favicon.png" alt="CCredoma" className="h-24 w-24 mb-4" />
          <span className="text-4xl font-bold">CCredoma</span>
        </div>

        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription className="font-body">
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuario</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="usuario" 
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

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  data-testid="button-submit-login"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Iniciar Sesión
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm font-body">
              <span className="text-muted-foreground">¿No tienes cuenta? </span>
              <Link href="/register" className="text-primary hover:underline" data-testid="link-register">
                Regístrate aquí
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
