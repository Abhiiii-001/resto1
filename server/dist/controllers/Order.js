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
exports.NotifyCustomer = exports.Subscribe = exports.GetAllOrders = exports.UpdateStatus = exports.VerifyOrder = exports.CreateOrder = void 0;
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const socket_1 = require("../socket");
const generateInvoice_1 = require("../utils/generateInvoice");
const cloudinaryUploader_1 = require("../utils/cloudinaryUploader");
const notificationSender_1 = require("../utils/notificationSender");
const prisma = new client_1.PrismaClient();
function generateOrderCode() {
    return "ORD-" + crypto_1.default.randomBytes(4).toString("hex").toUpperCase();
}
const CreateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, note, orders, amount, isPack, paymentOption, restaurantId } = req.body;
        //@ts-ignore
        const { io } = req;
        if (!orders || !amount || !paymentOption || (paymentOption != "Online" && paymentOption != "Cash") || !restaurantId) {
            return res.status(402).json({
                success: false,
                message: "Missing data!"
            });
        }
        // //console.log("suborderdata",orders)
        // const subOrders = JSON.parse(orders);
        const restaurantDetails = yield prisma.restaurant.findUnique({
            where: {
                id: restaurantId
            }
        });
        const orderCode = generateOrderCode();
        const invoiceBuffer = yield (0, generateInvoice_1.generateInvoice)(req.body, orderCode, restaurantDetails);
        const invoiceRes = yield (0, cloudinaryUploader_1.uploadPDFToCloudinary)(invoiceBuffer);
        //console.log("Invoice Response",invoiceRes);
        yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            let totalAmount = 0;
            //create order 
            const order = yield prisma.order.create({
                data: {
                    name: name || "Guest",
                    note,
                    amount,
                    isPack,
                    paymentOption,
                    restaurantId,
                    orderCode,
                    invoice: (invoiceRes === null || invoiceRes === void 0 ? void 0 : invoiceRes.secure_url) || null,
                    isVerified: restaurantDetails ? restaurantDetails.autoAcceptOrder : false,
                    createdAt: new Date(Date.now()).toISOString()
                }
            });
            //console.log("order",order)
            for (const subOrderData of orders) {
                totalAmount += subOrderData.unitPrice;
                prisma.productVariant.update({
                    where: {
                        id: subOrderData.productVariantId
                    },
                    data: {
                        sold: {
                            increment: subOrderData.quantity
                        }
                    }
                });
                const t = yield prisma.subOrder.create({
                    data: {
                        name: subOrderData.name,
                        variant: subOrderData.variant,
                        productVariantId: subOrderData.productVariantId,
                        quantity: subOrderData.quantity,
                        unitPrice: subOrderData.unitPrice,
                        orderId: order.id
                    }
                });
                //console.log("suborder",t)
            }
            //if calculated amount is not equal to provided amount
            // if(totalAmount !== amount){
            //     await prisma.order.update({
            //         data:{
            //             amount: totalAmount,
            //         },
            //         where:{
            //             id:order.id
            //         }
            //     })
            // }
            const orderRes = yield prisma.order.findUnique({
                where: {
                    id: order.id
                },
                include: {
                    orders: true
                }
            });
            (0, socket_1.emitNewOrder)(io, restaurantId, orderRes);
            return res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: orderRes
            });
        }));
    }
    catch (error) {
        //console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something wrong while creating order!"
        });
    }
});
exports.CreateOrder = CreateOrder;
// Verify order may be use later as a future scope
const VerifyOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.body;
        const order = yield prisma.order.findUnique({
            where: {
                id: orderId
            }
        });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order is not found",
            });
        }
        const updatedOrder = yield prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                isVerified: true
            }
        });
        return res.status(200).json({
            success: true,
            message: "Order verified"
        });
    }
    catch (error) {
        //console.log("Verify order error",error);
        return res.status(500).json({
            success: false,
            message: "Something wrong while verifying order"
        });
    }
});
exports.VerifyOrder = VerifyOrder;
const UpdateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const { id } = req.params;
        if (!status || !id) {
            return res.status(401).json({
                success: false,
                message: "Data missing"
            });
        }
        const order = yield prisma.order.update({
            where: {
                id: id
            },
            data: { status }
        });
        if (!order) {
            return res.status(402).json({
                success: false,
                message: 'Something went wrong, Try again!'
            });
        }
        // Industry Standard: Handle notifications for all status updates
        if (order.subscription) {
            yield (0, exports.NotifyCustomer)(order.subscription, status, order.orderCode);
        }
        return res.status(200).json({
            success: true,
            message: "Status updated and customer notified"
        });
    }
    catch (error) {
        console.error("Error in UpdateStatus:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while updating status"
        });
    }
});
exports.UpdateStatus = UpdateStatus;
const GetAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId } = req.params;
        const orders = yield prisma.order.findMany({
            where: {
                restaurantId: restaurantId
            },
            include: {
                orders: true
            }
        });
        return res.status(200).json({
            success: true,
            message: "All orders retrived",
            data: orders
        });
    }
    catch (error) {
        //console.log("Get all orders error",error);
        return res.status(500).json({
            success: false,
            message: "Something wrong , while retriving all orders"
        });
    }
});
exports.GetAllOrders = GetAllOrders;
const Subscribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, subscription } = req.body;
        if (!orderId || !subscription) {
            return res.status(400).json({
                success: false,
                message: "OrderId and Subscription are required"
            });
        }
        // Industry Standard: Store the subscription as a string in the DB
        const subscriptionString = typeof subscription === 'string' ? subscription : JSON.stringify(subscription);
        const response = yield prisma.order.update({
            where: { id: orderId },
            data: { subscription: subscriptionString }
        });
        return res.status(200).json({
            success: true,
            message: "Subscription saved",
            data: response
        });
    }
    catch (error) {
        console.error("Error inside subscribe order:", error);
        return res.status(500).json({
            success: false,
            message: "Subscription couldn't be saved!"
        });
    }
});
exports.Subscribe = Subscribe;
const NotifyCustomer = (subscription, status, orderCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notificationMessages = {
            "Confirmed": {
                title: "Order Confirmed!",
                body: `Your order ${orderCode} has been confirmed and is being prepared.`
            },
            "Preparing": {
                title: "Preparing your food!",
                body: "Our chefs are working their magic on your order."
            },
            "Ready": {
                title: "Order Ready!",
                body: "Your order is ready for pickup! Please head to the counter."
            },
            "Cancelled": {
                title: "Order Cancelled",
                body: "We're sorry, but your order has been cancelled. Please contact the counter for details."
            },
            "Completed": {
                title: "Enjoy your meal!",
                body: "Thank you for dining with us. We hope to see you again soon!"
            }
        };
        const message = notificationMessages[status];
        if (message && subscription) {
            const subObject = typeof subscription === 'string' ? JSON.parse(subscription) : subscription;
            yield (0, notificationSender_1.sendPushNotification)(subObject, message);
        }
    }
    catch (error) {
        console.error("Error in NotifyCustomer utility:", error);
    }
});
exports.NotifyCustomer = NotifyCustomer;
