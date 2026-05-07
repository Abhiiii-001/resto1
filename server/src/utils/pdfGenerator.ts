import PDFDocument from 'pdfkit';

export const generateSubscriptionInvoicePDF = (payment: any, stream: NodeJS.WritableStream) => {
  const doc = new PDFDocument({ margin: 50 });

  doc.pipe(stream);

  // --- Header ---
  doc.fillColor("#444444").fontSize(20).text("INVOICE", { align: "right" });
  doc.fontSize(10).text(`Invoice Number: ${payment.gatewayOrderId}`, { align: "right" });
  doc.text(`Date: ${new Date(payment.createdAt).toLocaleDateString()}`, { align: "right" });
  doc.moveDown();

  // --- Company Info ---
  doc.fillColor("#000000").fontSize(14).text("Restro SaaS Platform");
  doc.fontSize(10).text("123 Tech Park, Bangalore");
  doc.text("Karnataka, India - 560001");
  doc.moveDown();

  // --- Bill To ---
  doc.fontSize(12).text("Bill To:", { underline: true });
  doc.fontSize(10).text(payment.restaurant.name);
  doc.text(payment.restaurant.email);
  doc.text(payment.restaurant.address || "No address provided");
  doc.moveDown();

  // --- Table Header ---
  const tableTop = 250;
  doc.font("Helvetica-Bold");
  doc.text("Description", 50, tableTop);
  doc.text("Plan Type", 250, tableTop);
  doc.text("Amount", 450, tableTop, { align: "right" });
  
  doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

  // --- Table Content ---
  const rowTop = tableTop + 30;
  doc.font("Helvetica");
  doc.text(`Subscription Upgrade: ${payment.subscription?.plan?.name || "Premium Plan"}`, 50, rowTop);
  doc.text(payment.subscription?.plan?.type === 2 ? "PRO" : "PREMIUM", 250, rowTop);
  doc.text(`INR ${payment.amount.toFixed(2)}`, 450, rowTop, { align: "right" });

  // --- Footer ---
  doc.moveTo(50, 400).lineTo(550, 400).stroke();
  doc.fontSize(12).text("Total Amount Paid:", 350, 410);
  doc.fontSize(12).font("Helvetica-Bold").text(`INR ${payment.amount.toFixed(2)}`, 450, 410, { align: "right" });

  doc.fontSize(10).fillColor("#777777").text(
    "Thank you for choosing Restro SaaS. For support, contact support@restro.com",
    50, 700, { align: "center", width: 500 }
  );

  doc.end();
};
