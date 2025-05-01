"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Dashboard_1 = require("../controllers/Dashboard");
const Auth_1 = require("../middleware/Auth");
const router = (0, express_1.Router)();
router.get('/:restaurantId', Auth_1.Auth, Auth_1.IsRestaurant, Dashboard_1.GetDashboardData);
exports.default = router;
