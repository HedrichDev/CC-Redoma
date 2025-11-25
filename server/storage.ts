import { randomUUID } from 'crypto';
import type { 
  User, InsertUser, 
  Local, InsertLocal,
  Contract, InsertContract, ContractWithDetails,
  Payment, InsertPayment, PaymentWithContract,
  Request, InsertRequest
} from '@shared/schema';

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getLocals(): Promise<Local[]>;
  getLocal(id: string): Promise<Local | undefined>;
  createLocal(local: InsertLocal): Promise<Local>;
  updateLocal(id: string, local: Partial<InsertLocal>): Promise<Local | undefined>;
  deleteLocal(id: string): Promise<boolean>;
  
  getContracts(): Promise<ContractWithDetails[]>;
  getContract(id: string): Promise<ContractWithDetails | undefined>;
  getContractsByTenant(tenantId: string): Promise<ContractWithDetails[]>;
  createContract(contract: InsertContract): Promise<Contract>;
  updateContract(id: string, contract: Partial<InsertContract>): Promise<Contract | undefined>;
  
  getPayments(): Promise<PaymentWithContract[]>;
  getPayment(id: string): Promise<Payment | undefined>;
  getPaymentsByContract(contractId: string): Promise<Payment[]>;
  getPaymentsByTenant(tenantId: string): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  
  getRequests(): Promise<Request[]>;
  getRequest(id: string): Promise<Request | undefined>;
  createRequest(request: InsertRequest): Promise<Request>;
  updateRequest(id: string, request: Partial<InsertRequest>): Promise<Request | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private locals: Map<string, Local>;
  private contracts: Map<string, Contract>;
  private payments: Map<string, Payment>;
  private requests: Map<string, Request>;

  constructor() {
    this.users = new Map();
    this.locals = new Map();
    this.contracts = new Map();
    this.payments = new Map();
    this.requests = new Map();
    
    this.seedData();
  }

  private seedData() {
    const adminUser: User = {
      id: randomUUID(),
      username: 'admin',
      password: '$2a$10$rZ3qPpKzNPxYNqQJZwKQ5.7M9yP0mYF7DwOKhXZY8lQwKwEJYvBbC',
      email: 'admin@ccredoma.com',
      fullName: 'Administrador CCredoma',
      phone: '+1 234 567 8900',
      role: 'CentroComercialAdmin',
      createdAt: new Date(),
    };

    const tenantUser: User = {
      id: randomUUID(),
      username: 'inquilino1',
      password: '$2a$10$rZ3qPpKzNPxYNqQJZwKQ5.7M9yP0mYF7DwOKhXZY8lQwKwEJYvBbC',
      email: 'inquilino@example.com',
      fullName: 'María González',
      phone: '+1 234 567 8901',
      role: 'LocalOwner',
      createdAt: new Date(),
    };

    this.users.set(adminUser.id, adminUser);
    this.users.set(tenantUser.id, tenantUser);

    const sampleLocals: Local[] = [
      {
        id: randomUUID(),
        name: 'Local A-101',
        description: 'Amplio local comercial en zona de alto tráfico, ideal para tienda de ropa o accesorios. Cuenta con excelente visibilidad y acabados modernos.',
        type: 'Comercio',
        status: 'Disponible',
        size: '85.50',
        floor: 1,
        monthlyPrice: '2500.00',
        images: [],
        amenities: ['Aire Acondicionado', 'Iluminación LED', 'Vitrina Frontal'],
        location: 'Ala Norte, Sección A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: 'Local B-205',
        description: 'Local acogedor perfecto para restaurante o cafetería. Incluye instalación de gas y extracción de humos.',
        type: 'Restaurante',
        status: 'Ocupado',
        size: '120.00',
        floor: 2,
        monthlyPrice: '3800.00',
        images: [],
        amenities: ['Extracción de Humos', 'Instalación de Gas', 'Almacén'],
        location: 'Ala Sur, Sección B',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: 'Local C-150',
        description: 'Espacio moderno ideal para oficina profesional o servicios. Excelente ubicación con acceso directo.',
        type: 'Oficina',
        status: 'Disponible',
        size: '65.00',
        floor: 1,
        monthlyPrice: '1900.00',
        images: [],
        amenities: ['Baño Privado', 'Cableado de Red', 'Aire Acondicionado'],
        location: 'Ala Este, Sección C',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: 'Local D-302',
        description: 'Local espacioso perfecto para gimnasio, spa o centro de belleza. Techos altos y buena ventilación.',
        type: 'Servicios',
        status: 'Disponible',
        size: '180.00',
        floor: 3,
        monthlyPrice: '4500.00',
        images: [],
        amenities: ['Duchas', 'Vestidores', 'Área de Recepción'],
        location: 'Ala Oeste, Sección D',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: 'Local E-110',
        description: 'Local premium ideal para tienda de tecnología o entretenimiento. Zona de máxima afluencia.',
        type: 'Entretenimiento',
        status: 'Reservado',
        size: '95.00',
        floor: 1,
        monthlyPrice: '3200.00',
        images: [],
        amenities: ['Sistema de Sonido', 'Iluminación Especial', 'Vitrina Grande'],
        location: 'Plaza Central',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleLocals.forEach(local => this.locals.set(local.id, local));

    const occupiedLocal = Array.from(this.locals.values()).find(l => l.status === 'Ocupado');
    if (occupiedLocal) {
      const contract: Contract = {
        id: randomUUID(),
        localId: occupiedLocal.id,
        tenantId: tenantUser.id,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2025-12-31'),
        monthlyRent: occupiedLocal.monthlyPrice,
        deposit: '7600.00',
        status: 'Activo',
        terms: 'Contrato de arrendamiento a 2 años con opción a renovación.',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      this.contracts.set(contract.id, contract);

      for (let i = 0; i < 6; i++) {
        const dueDate = new Date('2024-01-01');
        dueDate.setMonth(dueDate.getMonth() + i);
        
        const payment: Payment = {
          id: randomUUID(),
          contractId: contract.id,
          amount: contract.monthlyRent,
          dueDate,
          paidDate: i < 5 ? new Date(dueDate.getTime() - 2 * 24 * 60 * 60 * 1000) : null,
          status: i < 5 ? 'Pagado' : 'Pendiente',
          paymentMethod: i < 5 ? 'Transferencia Bancaria' : null,
          reference: i < 5 ? `PAY-2024-${String(i + 1).padStart(3, '0')}` : null,
          notes: null,
          createdAt: new Date(),
        };
        
        this.payments.set(payment.id, payment);
      }
    }

    const sampleRequests: Request[] = [
      {
        id: randomUUID(),
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@example.com',
        phone: '+1 234 567 8902',
        localId: sampleLocals[0].id,
        message: 'Estoy interesado en el local A-101 para abrir una tienda de ropa. ¿Podríamos agendar una visita?',
        status: 'Pendiente',
        response: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: 'Ana Martínez',
        email: 'ana.martinez@example.com',
        phone: '+1 234 567 8903',
        localId: null,
        message: '¿Tienen disponibilidad de locales de más de 100m² en la planta baja?',
        status: 'EnProceso',
        response: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleRequests.forEach(request => this.requests.set(request.id, request));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async getLocals(): Promise<Local[]> {
    return Array.from(this.locals.values());
  }

  async getLocal(id: string): Promise<Local | undefined> {
    return this.locals.get(id);
  }

  async createLocal(insertLocal: InsertLocal): Promise<Local> {
    const local: Local = {
      ...insertLocal,
      id: randomUUID(),
      size: insertLocal.size.toString(),
      monthlyPrice: insertLocal.monthlyPrice.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.locals.set(local.id, local);
    return local;
  }

  async updateLocal(id: string, data: Partial<InsertLocal>): Promise<Local | undefined> {
    const local = this.locals.get(id);
    if (!local) return undefined;
    
    const updated: Local = {
      ...local,
      ...data,
      size: data.size ? data.size.toString() : local.size,
      monthlyPrice: data.monthlyPrice ? data.monthlyPrice.toString() : local.monthlyPrice,
      updatedAt: new Date(),
    };
    
    this.locals.set(id, updated);
    return updated;
  }

  async deleteLocal(id: string): Promise<boolean> {
    return this.locals.delete(id);
  }

  async getContracts(): Promise<ContractWithDetails[]> {
    const contracts = Array.from(this.contracts.values());
    return Promise.all(contracts.map(async (contract) => {
      const local = await this.getLocal(contract.localId);
      const tenant = await this.getUser(contract.tenantId);
      
      return {
        ...contract,
        local: local!,
        tenant: {
          id: tenant!.id,
          fullName: tenant!.fullName,
          email: tenant!.email,
          phone: tenant!.phone,
        },
      };
    }));
  }

  async getContract(id: string): Promise<ContractWithDetails | undefined> {
    const contract = this.contracts.get(id);
    if (!contract) return undefined;
    
    const local = await this.getLocal(contract.localId);
    const tenant = await this.getUser(contract.tenantId);
    
    return {
      ...contract,
      local: local!,
      tenant: {
        id: tenant!.id,
        fullName: tenant!.fullName,
        email: tenant!.email,
        phone: tenant!.phone,
      },
    };
  }

  async getContractsByTenant(tenantId: string): Promise<ContractWithDetails[]> {
    const contracts = Array.from(this.contracts.values()).filter(c => c.tenantId === tenantId);
    return Promise.all(contracts.map(async (contract) => {
      const local = await this.getLocal(contract.localId);
      const tenant = await this.getUser(contract.tenantId);
      
      return {
        ...contract,
        local: local!,
        tenant: {
          id: tenant!.id,
          fullName: tenant!.fullName,
          email: tenant!.email,
          phone: tenant!.phone,
        },
      };
    }));
  }

  async createContract(insertContract: InsertContract): Promise<Contract> {
    const contract: Contract = {
      ...insertContract,
      id: randomUUID(),
      monthlyRent: insertContract.monthlyRent.toString(),
      deposit: insertContract.deposit.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.contracts.set(contract.id, contract);
    return contract;
  }

  async updateContract(id: string, data: Partial<InsertContract>): Promise<Contract | undefined> {
    const contract = this.contracts.get(id);
    if (!contract) return undefined;
    
    const updated: Contract = {
      ...contract,
      ...data,
      monthlyRent: data.monthlyRent ? data.monthlyRent.toString() : contract.monthlyRent,
      deposit: data.deposit ? data.deposit.toString() : contract.deposit,
      updatedAt: new Date(),
    };
    
    this.contracts.set(id, updated);
    return updated;
  }

  async getPayments(): Promise<PaymentWithContract[]> {
    const payments = Array.from(this.payments.values());
    return Promise.all(payments.map(async (payment) => {
      const contract = await this.getContract(payment.contractId);
      return {
        ...payment,
        contract: contract!,
      };
    }));
  }

  async getPayment(id: string): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async getPaymentsByContract(contractId: string): Promise<Payment[]> {
    return Array.from(this.payments.values()).filter(p => p.contractId === contractId);
  }

  async getPaymentsByTenant(tenantId: string): Promise<Payment[]> {
    const tenantContracts = Array.from(this.contracts.values())
      .filter(c => c.tenantId === tenantId)
      .map(c => c.id);
    
    return Array.from(this.payments.values()).filter(p => tenantContracts.includes(p.contractId));
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const payment: Payment = {
      ...insertPayment,
      id: randomUUID(),
      amount: insertPayment.amount.toString(),
      createdAt: new Date(),
    };
    this.payments.set(payment.id, payment);
    return payment;
  }

  async getRequests(): Promise<Request[]> {
    return Array.from(this.requests.values());
  }

  async getRequest(id: string): Promise<Request | undefined> {
    return this.requests.get(id);
  }

  async createRequest(insertRequest: InsertRequest): Promise<Request> {
    const request: Request = {
      ...insertRequest,
      id: randomUUID(),
      status: 'Pendiente',
      response: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.requests.set(request.id, request);
    return request;
  }

  async updateRequest(id: string, data: Partial<InsertRequest>): Promise<Request | undefined> {
    const request = this.requests.get(id);
    if (!request) return undefined;
    
    const updated: Request = {
      ...request,
      ...data,
      updatedAt: new Date(),
    };
    
    this.requests.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
