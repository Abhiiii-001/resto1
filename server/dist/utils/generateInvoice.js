"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoice = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const qrcode_1 = __importDefault(require("qrcode"));
const path_1 = __importDefault(require("path"));
const generateInvoice = (data, orderCode, restaurantDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, note, orders, amount, isPack, paymentOption } = data;
    const dateTime = new Date(Date.now()).toISOString();
    const qrCodeImage = yield generateQRCode(orderCode);
    const doc = new pdfkit_1.default();
    const filePath = path_1.default.join(__dirname, 'invoices', `invoice_${orderCode}.pdf`);
    // Ensure the 'invoices' directory exists
    const directory = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(directory)) {
        fs_1.default.mkdirSync(directory, { recursive: true });
    }
    return new Promise((resolve, reject) => {
        const writeStream = fs_1.default.createWriteStream(filePath);
        doc.pipe(writeStream);
        // Header Section
        addHeader(doc, (restaurantDetails === null || restaurantDetails === void 0 ? void 0 : restaurantDetails.name) || "Restro", restaurantDetails === null || restaurantDetails === void 0 ? void 0 : restaurantDetails.thumbnail, qrCodeImage, dateTime);
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
                const fileBuffer = fs_1.default.readFileSync(filePath);
                console.log('File Buffer Generated:', fileBuffer);
                resolve(fileBuffer); // Return the file buffer
            }
            catch (error) {
                console.error('Error reading file:', error);
                reject(error);
            }
        });
        writeStream.on('error', (error) => {
            console.error('Error writing file:', error);
            reject(error);
        });
    });
});
exports.generateInvoice = generateInvoice;
function generateQRCode(orderCode) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            qrcode_1.default.toDataURL(orderCode, (err, url) => {
                if (err)
                    reject(err);
                else
                    resolve(url);
            });
        });
    });
}
function addHeader(doc, restaurantName, logo, qrCodeImage, dateTime) {
    // if (logo) {
    //   doc.image(logo, 50, 45, { width: 80 }); // Restaurant logo
    // }
    doc
        .fontSize(20)
        .text(restaurantName)
        .fontSize(10)
        .text(`Date: ${dateTime}`);
    doc.image(qrCodeImage, 450, 55, { width: 80 }); // QR Code at the top-right
}
function addCustomerInfo(doc, customerName, orderCode, dateTime, isPack, paymentOption) {
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
function addOrderTable(doc, items) {
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
function addFooter(doc, grandTotal) {
    doc.moveDown();
    doc
        .moveDown()
        .fontSize(12)
        .text(`Grand Total: ${grandTotal.toFixed(2)}`, { lineBreak: false, align: "center" });
    doc
        .moveDown()
        .fontSize(14)
        .text("Thank you for your order!", { width: 100, align: "left" });
}
