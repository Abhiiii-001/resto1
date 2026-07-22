import { v4 as uuidv4 } from 'uuid';
import prisma from "../config/prisma";

// Duration Enum (match your schema exactly)
type Duration = 'Day' | 'Month';

function getRandomAmount() {
  return Math.floor(Math.random() * 100000) + 100; // Between 100 and 10100
}

function getRandomOrder () {
    return Math.floor(Math.random() * 600) + 50;
}

function getFormattedISOString(offsetDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() - offsetDays);
  return date.toISOString();
}

export async function seedSaleSummary(restaurantId: string) {
  try {
    const saleData = [];

    // Seed for last 7 days (Day duration)
    for (let i = 0; i < 7; i++) {
      saleData.push({
        id: uuidv4(),
        amount: getRandomAmount(),
        duration: 'Day' as Duration,
        orders: getRandomOrder(),
        createdAt: getFormattedISOString(i),
        restaurantId,
      });
    }

    // Seed for last 12 months (Month duration)
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      saleData.push({
        id: uuidv4(),
        amount: getRandomAmount()*30,
        duration: 'Month' as Duration,
        orders: getRandomOrder() * 30,
        createdAt: date.toISOString(),
        restaurantId,
      });
    }

    // Insert into DB
    await prisma.saleSummary.createMany({ data: saleData });

    //console.log('✅ Seeded SaleSummary data successfully!');
  } catch (error) {
    console.error('❌ Failed to seed SaleSummary:', error);
  } finally {
    await prisma.$disconnect();
  }
}
