import { PrismaClient, Role, Status, PaymentOption, Duration } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  //console.log('🌱 Starting comprehensive seeding...');

  // 1. Cleanup existing data
  await prisma.subOrder.deleteMany();
  await prisma.order.deleteMany();
  await prisma.saleSummary.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.user.deleteMany();
  await prisma.restaurant.deleteMany();

  const saltRounds = 10;
  const hashedResPassword = await bcrypt.hash('restro123', saltRounds);
  const hashedUserPassword = await bcrypt.hash('user123', saltRounds);

  // 2. Create Plans
  const plans = await Promise.all([
    prisma.plan.create({
      data: {
        name: 'Demo Plan',
        type: 1, // DEMO
        isDemo: true,
        price: 0,
        maxProducts: 15,
        maxCategories: 3,
        maxEmployees: 1,
        maxQRCodes: 1,
        orderHistory: 7,
        features: ['Basic Dashboard', 'QR Ordering', 'Digital Menu (Up to 15 products)', '7 Days Order History'],
      }
    }),
    prisma.plan.create({
      data: {
        name: 'Pro Plan',
        type: 2, // PRO
        isDemo: false,
        price: 999,
        maxProducts: 50,
        maxCategories: 10,
        maxEmployees: 3,
        maxQRCodes: 5,
        orderHistory: 30,
        features: ['Advanced Analytics', 'Staff Management (3 Users)', 'QR Ordering (5 Tables)', '30 Days Order History'],
      }
    }),
    prisma.plan.create({
      data: {
        name: 'Premium Plan',
        type: 3, // PREMIUM
        isDemo: false,
        price: 1999,
        maxProducts: -1,
        maxCategories: -1,
        maxEmployees: -1,
        maxQRCodes: -1,
        orderHistory: -1,
        features: ['Unlimited Products & Orders', 'Unlimited Staff & QR Codes', 'Priority Support', 'Custom Branding & Advanced Export'],
      }
    })
  ]);

  //console.log('✅ Plans created');

  // 3. Create Restaurant with initial stats
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'The Royal Indian Bistro',
      slogan: 'A Legacy of Authentic Flavors & Royal Hospitality',
      resCode: 'RIB2024',
      thumbnail: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
      isOpen: true,
      number: '+91 88888 77777',
      address: 'Shop 42, Heritage Plaza, MG Road, Bangalore - 560001',
      email: 'owner@royalbistro.com',
      password: hashedResPassword,
      isVerified: true,
      verificationToken: 'verified-royal',
      role: Role.Restaurant,
      // Dashboard Stats
      totalEarning: 154200,
      totalOrders: 342,
      totalQRScan: 1250,
    },
  });

  // Create initial subscription for the seeded restaurant
  const now = new Date();
  const subscription = await prisma.subscription.create({
    data: {
      restaurantId: restaurant.id,
      planId: plans[0].id, // Demo Plan
      status: 1, // ACTIVE
      currentPeriodStart: now,
      currentPeriodEnd: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
    }
  });

  await prisma.payment.create({
    data: {
      amount: 0, // Demo Plan price
      currency: "INR",
      paymentType: 1, // SUBSCRIPTION
      status: 2, // CAPTURED
      gateway: "demo",
      gatewayPaymentId: `demo_txn_${Date.now()}`,
      subscriptionId: subscription.id,
      restaurantId: restaurant.id,
    }
  });

  //console.log('✅ Restaurant & Stats created');

  // 3. Create Admin & Staff
  await prisma.user.createMany({
    data: [
      {
        name: 'Abhishek Jaiswal',
        email: 'admin@royalbistro.com',
        number: '9000010000',
        password: hashedUserPassword,
        role: Role.User,
        canModify: true,
        isVerified: true,
        verificationToken: 'v-admin',
        restaurantId: restaurant.id,
      },
      {
        name: 'Rahul Sharma',
        email: 'staff1@royalbistro.com',
        number: '9000020000',
        password: hashedUserPassword,
        role: Role.User,
        canModify: false,
        isVerified: true,
        verificationToken: 'v-staff1',
        restaurantId: restaurant.id,
      }
    ]
  });

  //console.log('✅ Users created');

  // 4. Create Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Starters', thumbnail: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400', restaurantId: restaurant.id, createdAt: new Date().toISOString() } }),
    prisma.category.create({ data: { name: 'Main Course', thumbnail: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', restaurantId: restaurant.id, createdAt: new Date().toISOString() } }),
    prisma.category.create({ data: { name: 'Breads & Rice', thumbnail: 'https://images.unsplash.com/photo-1589187151003-0dd34ad2323b?w=400', restaurantId: restaurant.id, createdAt: new Date().toISOString() } }),
    prisma.category.create({ data: { name: 'Beverages', thumbnail: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400', restaurantId: restaurant.id, createdAt: new Date().toISOString() } }),
    prisma.category.create({ data: { name: 'Desserts', thumbnail: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400', restaurantId: restaurant.id, createdAt: new Date().toISOString() } }),
  ]);

  //console.log('✅ Categories created');

  // 5. Create Products & Variants
  const productData = [
    // Starters
    { name: 'Hara Bhara Kabab', categoryId: categories[0].id, variants: [{ size: '6 Pcs', price: 220, salePrice: 199 }] },
    { name: 'Chicken 65', categoryId: categories[0].id, variants: [{ size: 'Plate', price: 280, salePrice: 250 }] },
    // Main Course
    { name: 'Dal Makhani', categoryId: categories[1].id, variants: [{ size: 'Regular', price: 320, salePrice: 280 }] },
    { name: 'Paneer Butter Masala', categoryId: categories[1].id, variants: [{ size: 'Regular', price: 350, salePrice: 310 }] },
    { name: 'Mutton Rogan Josh', categoryId: categories[1].id, variants: [{ size: 'Portion', price: 550, salePrice: 499 }] },
    // Breads & Rice
    { name: 'Butter Naan', categoryId: categories[2].id, variants: [{ size: '1 Pc', price: 45 }] },
    { name: 'Hyderabadi Dum Biryani', categoryId: categories[2].id, variants: [{ size: 'Single', price: 250 }, { size: 'Full', price: 420 }] },
    // Beverages
    { name: 'Fresh Lime Soda', categoryId: categories[3].id, variants: [{ size: 'Glass', price: 90 }] },
    { name: 'Mango Lassi', categoryId: categories[3].id, variants: [{ size: 'Glass', price: 120 }] },
  ];

  for (const p of productData) {
    await prisma.product.create({
      data: {
        name: p.name,
        description: `Our signature ${p.name} prepared with secret spices and fresh ingredients.`,
        thumbnail: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
        categoryId: p.categoryId,
        productVariants: {
          create: p.variants.map(v => ({
            size: v.size,
            price: v.price,
            salePrice: v.salePrice || null,
            sold: Math.floor(Math.random() * 100),
          }))
        }
      }
    });
  }

  //console.log('✅ Products created');

  // 6. Create Detailed Orders (Today)
  const ordersToCreate = [
    { code: 'ORD-5001', name: 'John Doe', status: Status.Completed, items: 2, amount: 650 },
    { code: 'ORD-5002', name: 'Ananya S.', status: Status.Pending, items: 1, amount: 420 },
    { code: 'ORD-5003', name: 'Michael K.', status: Status.Ready, items: 3, amount: 1200 },
    { code: 'ORD-5004', name: 'Sneha Kapur', status: Status.Completed, items: 1, amount: 350 },
  ];

  for (const o of ordersToCreate) {
    const order = await prisma.order.create({
      data: {
        orderCode: o.code,
        name: o.name,
        amount: o.amount,
        status: o.status,
        isPack: false,
        paymentOption: PaymentOption.Online,
        createdAt: new Date().toISOString(),
        restaurantId: restaurant.id,
        isVerified: true,
      }
    });

    // Add sub-orders (items)
    await prisma.subOrder.create({
      data: {
        name: 'Sample Item',
        variant: 'Standard',
        productVariantId: (await prisma.productVariant.findFirst())?.id || '',
        quantity: o.items,
        unitPrice: Math.floor(o.amount / o.items),
        orderId: order.id
      }
    });

    // Create payment for order
    await prisma.payment.create({
      data: {
        amount: o.amount,
        currency: "INR",
        paymentType: 2, // ORDER
        status: o.status === Status.Completed || o.status === Status.Ready ? 2 : 1, // CAPTURED or PENDING
        gateway: o.paymentOption === PaymentOption.Online ? "phonepe" : "cash",
        gatewayPaymentId: `ord_txn_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        orderId: order.id,
        restaurantId: restaurant.id,
      }
    });
  }

  //console.log('✅ Live orders created');

  // 7. Historical Sale Summary (Last 7 Days)
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    await prisma.saleSummary.create({
      data: {
        amount: 8000 + Math.floor(Math.random() * 5000),
        orders: 15 + Math.floor(Math.random() * 10),
        duration: Duration.Day,
        createdAt: date.toISOString(),
        restaurantId: restaurant.id,
      }
    });
  }

  // 8. Historical Sale Summary (Last 6 Months)
  for (let i = 0; i < 6; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    await prisma.saleSummary.create({
      data: {
        amount: 250000 + Math.floor(Math.random() * 100000),
        orders: 450 + Math.floor(Math.random() * 200),
        duration: Duration.Month,
        createdAt: date.toISOString(),
        restaurantId: restaurant.id,
      }
    });
  }

  //console.log('✅ Analytics data created');
  //console.log('✨ Comprehensive seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
