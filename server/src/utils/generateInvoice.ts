import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

/**
 * Generates a high-quality, branded PDF invoice as a Buffer.
 * Now uses direct buffer generation to avoid disk I/O.
 */
export const generateInvoice = async (data: any, orderCode: string, restaurantDetails: any): Promise<Buffer> => {
    const { name, note, orders, amount, isPack, paymentOption } = data;
    console.log('------order---------', orders)
    const dateTime = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    const qrCodeImage = await generateQRCode(orderCode);
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const chunks: Buffer[] = [];

    return new Promise<Buffer>(async (resolve, reject) => {
        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', (err) => reject(err));

        // --- Header Section ---
        try {
            if (restaurantDetails?.thumbnail) {
                const response = await fetch(restaurantDetails.thumbnail);
                const arrayBuffer = await response.arrayBuffer();
                const logoBuffer = Buffer.from(arrayBuffer);
                doc.image(logoBuffer, 50, 45, { width: 50 });
            }
        } catch (error) {
            console.error("Failed to fetch restaurant logo for PDF:", error);
        }

        doc
            .fillColor('#444444')
            .fontSize(20)
            .text(restaurantDetails?.name || "Restroo", 110, 57)
            .fontSize(10)
            .text(restaurantDetails?.address || "", 110, 80)
            .text(`${restaurantDetails?.email} | ${restaurantDetails?.number}`, 110, 95)
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
        generateTableRow(doc, tableTop, 'S.No', 'Item Description', 'Price', 'Qty', 'Total');
        generateHr(doc, tableTop + 20);
        doc.font('Helvetica');

        let i;
        let currentY = tableTop + 30;

        for (i = 0; i < orders.length; i++) {
            const item = orders[i];
            const itemDesc = item.variant ? `${item.name} (${item.variant})` : item.name;

            // Calculate dynamic row height so multi-line item descriptions fit without clipping
            doc.fontSize(9.5);
            const descHeight = doc.heightOfString(itemDesc, { width: 245 });
            const rowHeight = Math.max(22, descHeight + 6);

            // Zebra striping for rows
            if (i % 2 === 1) {
                doc.rect(50, currentY - 4, 500, rowHeight).fill('#f9f9f9');
                doc.fillColor('#444444');
            }

            generateTableRow(
                doc,
                currentY,
                (i + 1).toString(),
                itemDesc,
                `₹${item.unitPrice}`,
                item.quantity.toString(),
                `₹${(item.unitPrice * item.quantity).toFixed(2)}`
            );

            generateHr(doc, currentY + rowHeight - 2);
            currentY += rowHeight + 4;
        }

        const subtotalPosition = currentY + 10;
        doc.font('Helvetica-Bold');
        generateTableRow(
            doc,
            subtotalPosition,
            '',
            '',
            '',
            'Grand Total',
            `₹${amount.toFixed(2)}`
        );
        doc.font('Helvetica');

        // --- Footer ---
        doc
            .fontSize(10)
            .text('Thank you for choosing us!', 50, 750, { align: 'center', width: 500 })
            .fontSize(8)
            .fillColor('#aaaaaa')
            .text('This is a computer-generated invoice.', 50, 765, { align: 'center', width: 500 });

        doc.end();
    });

    function generateTableRow(doc: any, y: number, sno: string, desc: string, price: string, qty: string, total: string) {
        doc
            .fontSize(9.5)
            .text(sno, 50, y, { width: 30 })
            .text(desc, 80, y, { width: 245 })
            .text(price, 330, y, { width: 60, align: 'right' })
            .text(qty, 400, y, { width: 40, align: 'right' })
            .text(total, 480, y, { width: 70, align: 'right' });
    }

    function generateHr(doc: any, y: number) {
        doc.strokeColor('#eeeeee').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
    }

    async function generateQRCode(orderCode: string): Promise<string> {
        return await QRCode.toDataURL(orderCode);
    }
}