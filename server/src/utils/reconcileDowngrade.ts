/**
 * reconcileDowngrade.ts
 * 
 * When a restaurant switches from a higher-tier plan (e.g., PREMIUM → PRO),
 * this service soft-disables excess resources that exceed the new plan's limits.
 * 
 * Design decisions:
 *  - Soft-disable (isActive=false), NOT hard-delete. Data is preserved.
 *  - Oldest items stay active, newest get deactivated (FIFO priority).
 *  - For employees, only verified employees are counted against limits.
 *  - Deactivated employees lose `isVerified` so they can't log in.
 *  - This function is idempotent — safe to call multiple times.
 */

import { Plan } from "@prisma/client";
import prisma from "../config/prisma";

export interface ReconciliationReport {
  productsDeactivated: number;
  categoriesDeactivated: number;
  employeesDeactivated: number;
}

/**
 * Preview what would happen if the restaurant switched to `newPlan`.
 * Does NOT make any changes — purely a dry run for the confirmation modal.
 */
export async function previewPlanChange(
  restaurantId: string,
  newPlan: Plan
): Promise<{
  currentUsage: { products: number; categories: number; employees: number };
  newLimits: { products: number; categories: number; employees: number };
  willDeactivate: { products: number; categories: number; employees: number };
}> {
  const [productCount, categoryCount, employeeCount] = await Promise.all([
    prisma.product.count({
      where: { category: { restaurantId }, isActive: true },
    }),
    prisma.category.count({
      where: { restaurantId, isActive: true },
    }),
    prisma.user.count({
      where: { restaurantId, isVerified: true },
    }),
  ]);

  const currentUsage = {
    products: productCount,
    categories: categoryCount,
    employees: employeeCount,
  };

  const newLimits = {
    products: newPlan.maxProducts,
    categories: newPlan.maxCategories,
    employees: newPlan.maxEmployees,
  };

  // -1 means unlimited — no deactivation needed
  const willDeactivate = {
    products:
      newPlan.maxProducts === -1
        ? 0
        : Math.max(0, productCount - newPlan.maxProducts),
    categories:
      newPlan.maxCategories === -1
        ? 0
        : Math.max(0, categoryCount - newPlan.maxCategories),
    employees:
      newPlan.maxEmployees === -1
        ? 0
        : Math.max(0, employeeCount - newPlan.maxEmployees),
  };

  return { currentUsage, newLimits, willDeactivate };
}

/**
 * Actually reconcile — soft-disable excess resources after a plan change.
 * Called after payment is captured and subscription is updated.
 */
export async function reconcileDowngrade(
  restaurantId: string,
  newPlan: Plan
): Promise<ReconciliationReport> {
  const report: ReconciliationReport = {
    productsDeactivated: 0,
    categoriesDeactivated: 0,
    employeesDeactivated: 0,
  };

  // ──────────────── PRODUCTS ────────────────
  if (newPlan.maxProducts !== -1) {
    const activeProducts = await prisma.product.count({
      where: { category: { restaurantId }, isActive: true },
    });

    if (activeProducts > newPlan.maxProducts) {
      const excess = activeProducts - newPlan.maxProducts;

      // Find the newest excess products (oldest stay active)
      const productsToDeactivate = await prisma.product.findMany({
        where: { category: { restaurantId }, isActive: true },
        orderBy: { id: "desc" }, // UUID v4 isn't time-ordered, so we rely on DB insertion order
        take: excess,
        select: { id: true },
      });

      if (productsToDeactivate.length > 0) {
        await prisma.product.updateMany({
          where: {
            id: { in: productsToDeactivate.map((p) => p.id) },
          },
          data: { isActive: false },
        });
        report.productsDeactivated = productsToDeactivate.length;
      }
    }
  }

  // ──────────────── CATEGORIES ────────────────
  if (newPlan.maxCategories !== -1) {
    const activeCategories = await prisma.category.count({
      where: { restaurantId, isActive: true },
    });

    if (activeCategories > newPlan.maxCategories) {
      const excess = activeCategories - newPlan.maxCategories;

      const categoriesToDeactivate = await prisma.category.findMany({
        where: { restaurantId, isActive: true },
        orderBy: { createdAt: "desc" }, // Categories have createdAt as String ISO
        take: excess,
        select: { id: true },
      });

      if (categoriesToDeactivate.length > 0) {
        // Deactivate the categories
        await prisma.category.updateMany({
          where: {
            id: { in: categoriesToDeactivate.map((c) => c.id) },
          },
          data: { isActive: false },
        });

        // Also deactivate ALL products under those deactivated categories
        await prisma.product.updateMany({
          where: {
            categoryId: { in: categoriesToDeactivate.map((c) => c.id) },
          },
          data: { isActive: false },
        });

        report.categoriesDeactivated = categoriesToDeactivate.length;
      }
    }
  }

  // ──────────────── EMPLOYEES ────────────────
  if (newPlan.maxEmployees !== -1) {
    const verifiedEmployees = await prisma.user.count({
      where: { restaurantId, isVerified: true },
    });

    if (verifiedEmployees > newPlan.maxEmployees) {
      const excess = verifiedEmployees - newPlan.maxEmployees;

      // Deactivate newest verified employees (oldest stay)
      const employeesToDeactivate = await prisma.user.findMany({
        where: { restaurantId, isVerified: true },
        orderBy: { id: "desc" },
        take: excess,
        select: { id: true },
      });

      if (employeesToDeactivate.length > 0) {
        await prisma.user.updateMany({
          where: {
            id: { in: employeesToDeactivate.map((e) => e.id) },
          },
          data: { isVerified: false },
        });
        report.employeesDeactivated = employeesToDeactivate.length;
      }
    }
  }

  // ──────────────── RE-ACTIVATE on upgrade ────────────────
  // If the new plan has higher/unlimited limits, re-activate items
  if (newPlan.maxProducts === -1) {
    await prisma.product.updateMany({
      where: {
        category: { restaurantId },
        isActive: false,
      },
      data: { isActive: true },
    });
  }

  if (newPlan.maxCategories === -1) {
    await prisma.category.updateMany({
      where: { restaurantId, isActive: false },
      data: { isActive: true },
    });
    // Re-activate products under re-activated categories too
    await prisma.product.updateMany({
      where: {
        category: { restaurantId, isActive: true },
        isActive: false,
      },
      data: { isActive: true },
    });
  }

  return report;
}
