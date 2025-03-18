const express = require("express");

const {
  getAllOrderOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controller/admin/order-controller");

const router = express.Router();

router.get("/get", getAllOrderOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);

module.exports = router;