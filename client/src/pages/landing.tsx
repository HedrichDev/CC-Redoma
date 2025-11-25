import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Store, FileText, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/lib/auth';

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">CCredoma</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <Button asChild data-testid="button-dashboard">
                <Link href={user.role === 'CentroComercialAdmin' ? '/admin/dashboard' : user.role === 'LocalOwner' ? '/tenant/dashboard' : '/catalog'}>
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild data-testid="link-login">
                  <Link href="/login">Iniciar Sesión</Link>
                </Button>
                <Button asChild data-testid="link-register">
                  <Link href="/register">Registrarse</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/redoma.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        <div className="relative z-10 container px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Gestión Inteligente para Centros Comerciales
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-body drop-shadow-md">
            Optimiza la administración de tu centro comercial con nuestra plataforma integral
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              asChild
              className="backdrop-blur-md bg-primary/90 hover:bg-primary text-primary-foreground border border-primary-border"
              data-testid="button-explore-catalog"
            >
              <Link href="/catalog">
                Explorar Locales Disponibles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              asChild
              className="backdrop-blur-md bg-background/20 hover:bg-background/30 text-white border-white/40"
              data-testid="button-contact"
            >
              <Link href="/catalog">Solicitar Información</Link>
            </Button>
          </div>
          
          <div className="mt-12 flex gap-8 justify-center text-sm font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>50+ Locales Comerciales</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>Gestión Centralizada</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span>Soporte 24/7</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Soluciones para Cada Rol</h2>
            <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
              Una plataforma diseñada para administradores, inquilinos y potenciales clientes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-elevate active-elevate-2 transition-transform">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-6">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Administradores</h3>
                <p className="text-muted-foreground font-body mb-4">
                  Dashboard completo con métricas en tiempo real, gestión de locales, contratos y reportes financieros automatizados.
                </p>
                <ul className="space-y-2 text-sm font-body">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Control total de operaciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Reportes financieros detallados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Gestión de solicitudes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate active-elevate-2 transition-transform">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Inquilinos</h3>
                <p className="text-muted-foreground font-body mb-4">
                  Portal personalizado para acceder a contratos, historial de pagos y comunicación directa con administración.
                </p>
                <ul className="space-y-2 text-sm font-body">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Acceso a documentos digitales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Historial de pagos transparente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Solicitudes de mantenimiento</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-elevate active-elevate-2 transition-transform">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-6">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Potenciales Clientes</h3>
                <p className="text-muted-foreground font-body mb-4">
                  Catálogo interactivo de locales disponibles con información detallada y contacto directo simplificado.
                </p>
                <ul className="space-y-2 text-sm font-body">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Exploración visual de espacios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Información completa y multimedia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Contacto rápido y sencillo</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para optimizar tu centro comercial?</h2>
          <p className="text-xl text-muted-foreground font-body mb-8 max-w-2xl mx-auto">
            Únete a los administradores que ya confían en CCredoma para gestionar sus espacios comerciales
          </p>
          <Button size="lg" asChild data-testid="button-get-started">
            <Link href="/register">
              Comenzar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-semibold">CCredoma</span>
            </div>
            <p className="text-sm text-muted-foreground font-body">
              © 2025 CCredoma. Gestión Inteligente para Centros Comerciales.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
