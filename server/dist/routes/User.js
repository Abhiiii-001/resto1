"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../controllers/Auth");
const router = (0, express_1.Router)();
router.post('/user/signup', Auth_1.UserSignup);
router.post('/restaurant/signup', Auth_1.RestaurantSignup);
exports.default = router;
