
import PDFDocument, { file } from 'pdfkit'
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import QRCode from 'qrcode'
import path from 'path'


export const generateInvoice = async (data: any, orderCode: string, restaurantDetails: any): Promise<Buffer> => {
    const { name, note, orders, amount, isPack, paymentOption } = data;
    const dateTime = new Date(Date.now()).toISOString();
    const qrCodeImage = await generateQRCode(orderCode);
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, 'invoices', `invoice_${orderCode}.pdf`);
  
    // Ensure the 'invoices' directory exists
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  
    return new Promise<Buffer>((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);
      
      doc.pipe(writeStream);
  
      // Header Section
      addHeader(doc, restaurantDetails?.name || "Restro", restaurantDetails?.thumbnail, qrCodeImage, dateTime);
  
      // Customer Info Section
      addCustomerInfo(doc, name || "Anonymous", orderCode, dateTime, isPack, paymentOption);
  
      // Table of Orders
      addOrderTable(doc, orders);
  
      // Footer with Grand Total and Thank You Message
      addFooter(doc, amount);
  
      // Finalize the PDF
      doc.end();
  
      writeStream.on('finish', () => {
        try {
          const fileBuffer = fs.readFileSync(filePath);
          //console.log('File Buffer Generated:', fileBuffer);
          resolve(fileBuffer);  // Return the file buffer
        } catch (error) {
          console.error('Error reading file:', error);
          reject(error);
        }
      });
  
      writeStream.on('error', (error) => {
        console.error('Error writing file:', error);
        reject(error);
      });
    });
  };

async function generateQRCode(orderCode:string) {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(orderCode, (err, url) => {
        if (err) reject(err);
        else resolve(url);
      });
    });
  }

  function addHeader(doc:any, restaurantName:string, logo:any, qrCodeImage:any, dateTime:any) {
    // if (logo) {
    //   doc.image(logo, 50, 45, { width: 80 }); // Restaurant logo
    // }
    
    doc
      .fontSize(20)
      .text(restaurantName)
      .fontSize(10)
      .text(`Date: ${dateTime}`);
  
    doc.image(qrCodeImage, 450, 55, { width: 80 }) // QR Code at the top-right
  }

  function addCustomerInfo(doc:any, customerName:string, orderCode:string, dateTime:string,isPack:boolean,paymentOption:string) {
    doc
      .moveDown()
      .fontSize(12)
      .text(`Customer Name: ${customerName}`)
      .text(`Order Code: ${orderCode}`)
      .text(`Date & Time: ${dateTime}`)
      .moveDown();

    doc.fontSize(12).text(`Eating location: ${isPack ? "Take Out" : "Eat In"}`);
    doc.fontSize(12).text(`Payment method: ${paymentOption}`).moveDown().moveDown();
  }
  
  function addOrderTable(doc:any, items:any) {
    let i;
    const tableTop = 250;
    const itemRowHeight = 30;

    doc.moveDown();
  
    doc
      .fontSize(12)
      .text("S.No", 50, tableTop)
      .text("Product Name", 100, tableTop)
      .text("Variant", 200, tableTop)
      .text("Unit Price", 300, tableTop)
      .text("Quantity", 400, tableTop)
      .text("Total", 500, tableTop);
  
    for (i = 0; i < items.length; i++) {
      const item = items[i];
      const y = tableTop + (i + 1) * itemRowHeight;
      doc
        .fontSize(10)
        .text(i + 1, 50, y)
        .text(item.name, 100, y)
        .text(item.variant, 200, y)
        .text(item.unitPrice.toFixed(2), 300, y)
        .text(item.quantity, 400, y)
        .text((item.unitPrice * item.quantity).toFixed(2), 500, y);
    }
  }
  
  // Function to Add Footer with Grand Total and Thank You Message
  function addFooter(doc:any, grandTotal:number) {
    doc.moveDown();
    doc
      .moveDown()
      .fontSize(12)
      .text(`Grand Total: ${grandTotal.toFixed(2)}`, {lineBreak: false, align: "center"  });
  
    doc
      .moveDown()
      .fontSize(14)
      .text("Thank you for your order!", { width: 100, align: "left"});
  }