const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { protect } = require("../middleware/verifyToken");

router.get("/single", protect, userController.getUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/refresh", userController.refresh);
router.delete("/logout", protect, userController.logout);

module.exports = router;
