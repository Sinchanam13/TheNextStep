import dns from "node:dns";
import "dotenv/config";
import { z } from "zod";

// Optional: use specific DNS servers (helps when the network blocks MongoDB SRV lookups)
if (process.env.DNS_SERVERS) {
  const servers = process.env.DNS_SERVERS.split(",").map((s) => s.trim());
  dns.setServers(servers);
  dns.promises.setServers(servers);
}

const isTest = process.env.NODE_ENV === "test";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: isTest ? z.string().optional() : z.string().min(1, "MONGODB_URI is required"),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
  HIPOLABS_BASE_URL: z.string().url().default("http://universities.hipolabs.com"),
  CACHE_TTL_HOURS: z.coerce.number().positive().default(168),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error("Invalid environment configuration:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  clientOrigins: parsed.data.CLIENT_ORIGIN.split(",").map((s) => s.trim()).filter(Boolean),
};
