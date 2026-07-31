import { Express } from "express";
import prisma from "./config/prisma";

// ─── CONFIGURABLE WRITE ACCESS ─────────────────────────────────────
// Set a model name to `true` for full CRUD, `false` for read-only.
// Any model not listed defaults to `true` (full write access).
const MODEL_WRITE_ACCESS: Record<string, boolean> = {
  Restaurant: true,
  User: true,
  Category: true,
  Product: true,
  ProductVariant: true,
  Order: true,
  subOrder: true,
  SaleSummary: true,
  Plan: true,
  Subscription: true,
  Payment: true,
};

// MULTI-ADMIN CREDENTIAL PARSER
// Env format: ADMIN_CREDENTIALS="email1:pass1,email2:pass2"
function parseAdminCredentials(): Array<{ email: string; password: string }> {
  const raw = process.env.ADMIN_CREDENTIALS || "";
  if (!raw.trim()) return [];

  return raw.split(",").map((entry) => {
    const [email, ...passwordParts] = entry.trim().split(":");
    return { email: email.trim(), password: passwordParts.join(":").trim() };
  });
}

// RESOURCE CONFIG BUILDER
function buildResourceOptions(modelName: string) {
  const hasWriteAccess = MODEL_WRITE_ACCESS[modelName] ?? true;

  const options: Record<string, any> = {
    navigation: getNavigationGroup(modelName),
  };

  options.actions = {};

  if (!hasWriteAccess) {
    options.actions = {
      new: { isAccessible: false },
      edit: { isAccessible: false },
      delete: { isAccessible: false },
      bulkDelete: { isAccessible: false },
    };
  }

  // Explicitly restrict deletion for Restaurants, even with write access
  if (modelName === "Restaurant" && hasWriteAccess) {
    options.actions = {
      ...options.actions,
      delete: { isAccessible: false },
      bulkDelete: { isAccessible: false },
    };
  }

  return options;
}

function getNavigationGroup(modelName: string): { name: string; icon: string } {
  const groups: Record<string, { name: string; icon: string }> = {
    Restaurant: { name: "Restaurants", icon: "Home" },
    User: { name: "Restaurants", icon: "User" },
    Category: { name: "Menu", icon: "Tag" },
    Product: { name: "Menu", icon: "Coffee" },
    ProductVariant: { name: "Menu", icon: "Package" },
    Order: { name: "Orders", icon: "ShoppingCart" },
    subOrder: { name: "Orders", icon: "List" },
    SaleSummary: { name: "Analytics", icon: "TrendingUp" },
    Plan: { name: "Billing", icon: "CreditCard" },
    Subscription: { name: "Billing", icon: "Calendar" },
    Payment: { name: "Billing", icon: "DollarSign" },
  };
  return groups[modelName] || { name: "Other", icon: "Database" };
}

// ─── MAIN SETUP (dynamic imports for ESM-only AdminJS) ──────────────
export async function setupAdminJS(app: Express): Promise<void> {
  try {
    // Dynamic imports — AdminJS v7+ is ESM-only
    const { default: AdminJS } = await (eval('import("adminjs")') as Promise<any>);
    const AdminJSExpress = await (eval('import("@adminjs/express")') as Promise<any>);
    const { Database, Resource, getModelByName } = await (eval(
      'import("@adminjs/prisma")'
    ) as Promise<any>);

    // Register Prisma adapter
    AdminJS.registerAdapter({ Database, Resource });

    // All Prisma model names
    const modelNames = [
      "Restaurant",
      "User",
      "Category",
      "Product",
      "ProductVariant",
      "Order",
      "subOrder",
      "SaleSummary",
      "Plan",
      "Subscription",
      "Payment",
    ];

    // Build resources array
    const resources = modelNames.map((modelName) => ({
      resource: { model: getModelByName(modelName), client: prisma },
      options: buildResourceOptions(modelName),
    }));

    // Initialize AdminJS
    const admin = new AdminJS({
      rootPath: "/admin",
      resources,
      branding: {
        companyName: "Restroo Admin",
        logo: false,
        softwareBrothers: false,
      },
    });

    // Parse multi-admin credentials
    const admins = parseAdminCredentials();

    // Build authenticated router
    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
      admin,
      {
        authenticate: async (email: string, password: string) => {
          const matched = admins.find(
            (a) => a.email === email && a.password === password
          );
          if (matched) {
            return { email: matched.email, role: "admin" };
          }
          return null;
        },
        cookiePassword:
          process.env.SESSION_SECRET || "fallback-cookie-secret-change-me",
      },
      null, // custom provider (not used)
      {
        secret: process.env.SESSION_SECRET || "fallback-session-secret-change-me",
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        },
      }
    );

    // Mount
    app.use(admin.options.rootPath, adminRouter);

    console.log(
      `✅ AdminJS panel running at http://localhost:${process.env.PORT || 8000}${admin.options.rootPath}`
    );
  } catch (error) {
    console.error("❌ Failed to initialize AdminJS:", error);
  }
}
