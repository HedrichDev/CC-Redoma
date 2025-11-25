import type { Express } from 'express';
import { createServer, type Server } from 'http';
import bcrypt from 'bcryptjs';
import { storage } from './storage';
import { authenticate, authorize, generateToken, type AuthRequest } from './middleware/auth';
import { 
  insertUserSchema, 
  loginSchema,
  insertLocalSchema,
  insertRequestSchema
} from '@shared/schema';

export async function registerRoutes(app: Express): Promise<Server> {
  app.post('/api/auth/register', async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const existingEmail = await storage.getUserByEmail(data.email);
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await storage.createUser({
        ...data,
        password: hashedPassword,
      });

      const { password, ...userWithoutPassword } = user;
      const token = generateToken(user);

      res.json({ user: userWithoutPassword, token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const { password: _, ...userWithoutPassword } = user;
      const token = generateToken(user);

      res.json({ user: userWithoutPassword, token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post('/api/auth/logout', (_req, res) => {
    res.json({ message: 'Logged out successfully' });
  });

  app.get('/api/auth/me', authenticate, async (req: AuthRequest, res) => {
    const { password, ...userWithoutPassword } = req.user!;
    res.json(userWithoutPassword);
  });

  app.get('/api/locals', async (_req, res) => {
    try {
      const locals = await storage.getLocals();
      res.json(locals);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/locals/:id', async (req, res) => {
    try {
      const local = await storage.getLocal(req.params.id);
      if (!local) {
        return res.status(404).json({ message: 'Local not found' });
      }
      res.json(local);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post('/api/locals', authenticate, authorize('CentroComercialAdmin'), async (req: AuthRequest, res) => {
    try {
      const data = insertLocalSchema.parse(req.body);
      const local = await storage.createLocal(data);
      res.json(local);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch('/api/locals/:id', authenticate, authorize('CentroComercialAdmin'), async (req: AuthRequest, res) => {
    try {
      const data = insertLocalSchema.partial().parse(req.body);
      const local = await storage.updateLocal(req.params.id, data);
      if (!local) {
        return res.status(404).json({ message: 'Local not found' });
      }
      res.json(local);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete('/api/locals/:id', authenticate, authorize('CentroComercialAdmin'), async (req: AuthRequest, res) => {
    try {
      const deleted = await storage.deleteLocal(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Local not found' });
      }
      res.json({ message: 'Local deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/contracts', authenticate, authorize('CentroComercialAdmin'), async (req: AuthRequest, res) => {
    try {
      const contracts = await storage.getContracts();
      res.json(contracts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/contracts/my', authenticate, authorize('LocalOwner'), async (req: AuthRequest, res) => {
    try {
      const contracts = await storage.getContractsByTenant(req.user!.id);
      res.json(contracts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/payments', authenticate, authorize('CentroComercialAdmin'), async (req: AuthRequest, res) => {
    try {
      const payments = await storage.getPayments();
      res.json(payments);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/payments/my', authenticate, authorize('LocalOwner'), async (req: AuthRequest, res) => {
    try {
      const payments = await storage.getPaymentsByTenant(req.user!.id);
      res.json(payments);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/requests', authenticate, authorize('CentroComercialAdmin'), async (req: AuthRequest, res) => {
    try {
      const requests = await storage.getRequests();
      res.json(requests);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post('/api/requests', async (req, res) => {
    try {
      const data = insertRequestSchema.parse(req.body);
      const request = await storage.createRequest(data);
      res.json(request);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
