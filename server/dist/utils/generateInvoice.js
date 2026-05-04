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
const qrcode_1 = __importDefault(require("qrcode"));
/**
 * Generates a high-quality, branded PDF invoice as a Buffer.
 * Now uses direct buffer generation to avoid disk I/O.
 */
const generateInvoice = (data, orderCode, restaurantDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, note, orders, amount, isPack, paymentOption } = data;
    const dateTime = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
    });
    const qrCodeImage = yield generateQRCode(orderCode);
    const doc = new pdfkit_1.default({ margin: 50, size: 'A4' });
    const chunks = [];
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', (err) => reject(err));
        // --- Header Section ---
        try {
            if (restaurantDetails === null || restaurantDetails === void 0 ? void 0 : restaurantDetails.thumbnail) {
                const response = yield fetch(restaurantDetails.thumbnail);
                const arrayBuffer = yield response.arrayBuffer();
                const logoBuffer = Buffer.from(arrayBuffer);
                doc.image(logoBuffer, 50, 45, { width: 50 });
            }
        }
        catch (error) {
            console.error("Failed to fetch restaurant logo for PDF:", error);
        }
        doc
            .fillColor('#444444')
            .fontSize(20)
            .text((restaurantDetails === null || restaurantDetails === void 0 ? void 0 : restaurantDetails.name) || "Restro", 110, 57)
            .fontSize(10)
            .text((restaurantDetails === null || restaurantDetails === void 0 ? void 0 : restaurantDetails.address) || "", 110, 80)
            .text(`${restaurantDetails === null || restaurantDetails === void 0 ? void 0 : restaurantDetails.email} | ${restaurantDetails === null || restaurantDetails === void 0 ? void 0 : restaurantDetails.number}`, 110, 95)
            .moveDown();
        // Add QR Code at top right
        doc.image(qrCodeImage, 450, 45, { width: 80 });
        // Horizontal Line
        doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, 135).lineTo(550, 135).stroke();
        // --- Order Info Section ---
        doc
            .fillColor('#444444')
            .fontSize(16)
            .text('Order Invoice', 50, 160);
        doc
            .fontSize(10)
            .text(`Invoice No: ${orderCode}`, 50, 185)
            .text(`Date: ${dateTime}`, 50, 200)
            .text(`Status: Pending`, 50, 215);
        doc
            .fontSize(10)
            .font('Helvetica-Bold')
            .text('Customer Name:', 350, 185)
            .font('Helvetica')
            .text(name || "Guest", 450, 185)
            .font('Helvetica-Bold')
            .text('Order Type:', 350, 200)
            .font('Helvetica')
            .text(isPack ? "Take Out" : "Eat In", 450, 200)
            .font('Helvetica-Bold')
            .text('Payment:', 350, 215)
            .font('Helvetica')
            .text(paymentOption, 450, 215);
        // --- Note Section ---
        if (note) {
            doc.moveDown()
                .fillColor('#666666')
                .fontSize(9)
                .text(`Note: ${note}`, 50, 240);
        }
        // --- Items Table ---
        const tableTop = 270;
        doc.font('Helvetica-Bold');
        generateTableRow(doc, tableTop, 'S.No', 'Item Description', 'Variant', 'Price', 'Qty', 'Total');
        generateHr(doc, tableTop + 20);
        doc.font('Helvetica');
        let i;
        let invoiceTableTop = tableTop + 30;
        for (i = 0; i < orders.length; i++) {
            const item = orders[i];
            const position = invoiceTableTop + i * 30;
            // Zebra striping for rows
            if (i % 2 === 1) {
                doc.rect(50, position - 5, 500, 25).fill('#f9f9f9');
                doc.fillColor('#444444');
            }
            generateTableRow(doc, position, (i + 1).toString(), item.name, item.variant, `₹${item.unitPrice}`, item.quantity.toString(), `₹${(item.unitPrice * item.quantity).toFixed(2)}`);
            generateHr(doc, position + 20);
        }
        const subtotalPosition = invoiceTableTop + (i + 1) * 30;
        doc.font('Helvetica-Bold');
        generateTableRow(doc, subtotalPosition, '', '', '', '', 'Grand Total', `₹${amount.toFixed(2)}`);
        doc.font('Helvetica');
        // --- Footer ---
        doc
            .fontSize(10)
            .text('Thank you for choosing us!', 50, 750, { align: 'center', width: 500 })
            .fontSize(8)
            .fillColor('#aaaaaa')
            .text('This is a computer-generated invoice.', 50, 765, { align: 'center', width: 500 });
        doc.end();
    }));
    function generateTableRow(doc, y, sno, desc, variant, price, qty, total) {
        doc
            .fontSize(10)
            .text(sno, 50, y)
            .text(desc, 80, y)
            .text(variant, 250, y)
            .text(price, 330, y, { width: 60, align: 'right' })
            .text(qty, 400, y, { width: 40, align: 'right' })
            .text(total, 480, y, { width: 70, align: 'right' });
    }
    function generateHr(doc, y) {
        doc.strokeColor('#eeeeee').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
    }
    function generateQRCode(orderCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield qrcode_1.default.toDataURL(orderCode);
        });
    }
});
exports.generateInvoice = generateInvoice;
