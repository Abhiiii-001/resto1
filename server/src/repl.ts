import repl from 'repl';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import email templates & mailSender
import mailSender from './utils/mailSender';
import {
  renderRestaurantVerification,
  renderUserVerification,
  renderRestaurantWelcome,
  renderUserWelcome,
  renderSubscriptionExpiry,
  renderSubscriptionExpired,
  emailTokens,
} from './emails';

import {
  welcomeEmailTemplate,
  verificationEmailTemplate,
  resetPasswordEmailTemplate,
  employeeVerifiedTemplate,
} from './utils/mailTemplates';

import uploadToCloudinary, { uploadPDFToCloudinary } from './utils/cloudinaryUploader';
import { generateInvoice } from './utils/generateInvoice';
import { sendPushNotification } from './utils/notificationSender';
import { generateRandomNumber } from './utils/randomCode';
import prisma from './config/prisma';

console.log('\n=======================================================');
console.log('⚡ Restro Interactive Email & Backend REPL Terminal');
console.log('=======================================================');
console.log('Pre-loaded Email Templates & Utility Globals:');
console.log('  • renderRestaurantVerification');
console.log('  • renderUserVerification');
console.log('  • renderRestaurantWelcome');
console.log('  • renderUserWelcome');
console.log('  • renderSubscriptionExpiry');
console.log('  • renderSubscriptionExpired');
console.log('  • welcomeEmailTemplate');
console.log('  • verificationEmailTemplate');
console.log('  • resetPasswordEmailTemplate');
console.log('  • employeeVerifiedTemplate');
console.log('  • mailSender');
console.log('  • prisma');
console.log('-------------------------------------------------------');
console.log('💡 Quick Send Example:');
console.log('  await mailSender("user@gmail.com", "Verify Restaurant", renderRestaurantVerification({ restaurantName: "Royal Restro", ownerName: "Abhishek", verificationUrl: "https://restro.com/verify/123" }));');
console.log('=======================================================\n');

// Start Node.js REPL instance
const replServer = repl.start({
  prompt: '\x1b[36mrestro-repl>\x1b[0m ',
  useColors: true,
});

// ------------------------------------------------------------------
// 🔑 BIND GLOBALS TO REPL CONTEXT
// Anything attached here becomes available directly in restro-repl>
// ------------------------------------------------------------------
replServer.context.prisma = prisma;
replServer.context.mailSender = mailSender;
replServer.context.emailTokens = emailTokens;

// Email Engine Templates
replServer.context.renderRestaurantVerification = renderRestaurantVerification;
replServer.context.renderUserVerification = renderUserVerification;
replServer.context.renderRestaurantWelcome = renderRestaurantWelcome;
replServer.context.renderUserWelcome = renderUserWelcome;
replServer.context.renderSubscriptionExpiry = renderSubscriptionExpiry;
replServer.context.renderSubscriptionExpired = renderSubscriptionExpired;

// Legacy / Helper Wrappers
replServer.context.welcomeEmailTemplate = welcomeEmailTemplate;
replServer.context.verificationEmailTemplate = verificationEmailTemplate;
replServer.context.resetPasswordEmailTemplate = resetPasswordEmailTemplate;
replServer.context.employeeVerifiedTemplate = employeeVerifiedTemplate;

// Utilities
replServer.context.uploadToCloudinary = uploadToCloudinary;
replServer.context.uploadPDFToCloudinary = uploadPDFToCloudinary;
replServer.context.generateInvoice = generateInvoice;
replServer.context.sendPushNotification = sendPushNotification;
replServer.context.generateRandomNumber = generateRandomNumber;

// Disconnect database client cleanly on exit
replServer.on('exit', async () => {
  console.log('\n👋 Exiting REPL... Disconnecting database.');
  await prisma.$disconnect();
  process.exit(0);
});
