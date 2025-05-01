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
const node_cron_1 = __importDefault(require("node-cron"));
const client_1 = require("@prisma/client");
const summary_1 = require("../utils/summary");
// Run every day at 00:10 (after day ends)
node_cron_1.default.schedule("10 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Calculating DAILY summary...");
    yield (0, summary_1.calculateSummary)(client_1.Duration.Day);
}));
// Run every Monday at 00:20
// cron.schedule("20 0 * * 1", async () => {
//   console.log("Calculating WEEKLY summary...");
//   await calculateSummary(Duration.Week);
// });
// Run every 1st of month at 00:30
node_cron_1.default.schedule("30 0 1 * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Calculating MONTHLY summary...");
    yield (0, summary_1.calculateSummary)(client_1.Duration.Month);
}));
