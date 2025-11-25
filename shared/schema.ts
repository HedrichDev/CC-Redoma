import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userRoles = ["CentroComercialAdmin", "LocalOwner", "VisitanteExterno", "Developer"] as const;
export type UserRole = typeof userRoles[number];

export const localStatuses = ["Disponible", "Ocupado", "Mantenimiento", "Reservado"] as const;
export type LocalStatus = typeof localStatuses[number];

export const localTypes = ["Comercio", "Restaurante", "Servicios", "Entretenimiento", "Oficina"] as const;
export type LocalType = typeof localTypes[number];

export const contractStatuses = ["Activo", "Vencido", "Renovacion", "Cancelado"] as const;
export type ContractStatus = typeof contractStatuses[number];

export const paymentStatuses = ["Pendiente", "Pagado", "Atrasado", "Cancelado"] as const;
export type PaymentStatus = typeof paymentStatuses[number];

export const requestStatuses = ["Pendiente", "EnProceso", "Respondida", "Cerrada"] as const;
export type RequestStatus = typeof requestStatuses[number];

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  role: text("role").notNull().$type<UserRole>().default("VisitanteExterno"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const locals = pgTable("locals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull().$type<LocalType>(),
  status: text("status").notNull().$type<LocalStatus>().default("Disponible"),
  size: decimal("size", { precision: 10, scale: 2 }).notNull(),
  floor: integer("floor").notNull(),
  monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }).notNull(),
  images: text("images").array().notNull().default(sql`ARRAY[]::text[]`),
  amenities: text("amenities").array().notNull().default(sql`ARRAY[]::text[]`),
  location: text("location").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contracts = pgTable("contracts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  localId: varchar("local_id").notNull().references(() => locals.id),
  tenantId: varchar("tenant_id").notNull().references(() => users.id),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  monthlyRent: decimal("monthly_rent", { precision: 10, scale: 2 }).notNull(),
  deposit: decimal("deposit", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().$type<ContractStatus>().default("Activo"),
  terms: text("terms").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contractId: varchar("contract_id").notNull().references(() => contracts.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  dueDate: timestamp("due_date").notNull(),
  paidDate: timestamp("paid_date"),
  status: text("status").notNull().$type<PaymentStatus>().default("Pendiente"),
  paymentMethod: text("payment_method"),
  reference: text("reference"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const requests = pgTable("requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  localId: varchar("local_id").references(() => locals.id),
  message: text("message").notNull(),
  status: text("status").notNull().$type<RequestStatus>().default("Pendiente"),
  response: text("response"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  phone: true,
  role: true,
}).extend({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  username: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Usuario requerido"),
  password: z.string().min(1, "Contraseña requerida"),
});

export const insertLocalSchema = createInsertSchema(locals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  monthlyPrice: z.string().or(z.number()),
  size: z.string().or(z.number()),
  floor: z.number().int().min(0),
});

export const insertContractSchema = createInsertSchema(contracts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  monthlyRent: z.string().or(z.number()),
  deposit: z.string().or(z.number()),
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
}).extend({
  amount: z.string().or(z.number()),
});

export const insertRequestSchema = createInsertSchema(requests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  response: true,
}).extend({
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Teléfono requerido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type User = typeof users.$inferSelect;

export type InsertLocal = z.infer<typeof insertLocalSchema>;
export type Local = typeof locals.$inferSelect;

export type InsertContract = z.infer<typeof insertContractSchema>;
export type Contract = typeof contracts.$inferSelect;

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;

export type InsertRequest = z.infer<typeof insertRequestSchema>;
export type Request = typeof requests.$inferSelect;

export type ContractWithDetails = Contract & {
  local: Local;
  tenant: Pick<User, 'id' | 'fullName' | 'email' | 'phone'>;
};

export type PaymentWithContract = Payment & {
  contract: ContractWithDetails;
};
