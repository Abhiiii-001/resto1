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
exports.sendPushNotification = void 0;
const web_push_1 = __importDefault(require("web-push"));
const sendPushNotification = (subscription, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = JSON.stringify({
            title: message.title,
            body: message.body,
            icon: message.icon || "/default-icon.png", // Set an icon
            badge: message.badge || "/badge-icon.png", // Small badge icon (optional)
            vibrate: [200, 100, 200], // Vibration pattern
            requireInteraction: true, // Makes notification sticky (won’t disappear)
            // data: { url: message.url || "/" }, // URL to open on click
        });
        yield web_push_1.default.sendNotification(subscription, payload);
        //console.log("Push notification sent");
    }
    catch (error) {
        console.error("Error sending push notification", error);
    }
});
exports.sendPushNotification = sendPushNotification;
