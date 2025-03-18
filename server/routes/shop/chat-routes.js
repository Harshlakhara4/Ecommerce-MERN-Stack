const express = require("express");
const { sendMessage } = require("../../controller/shop/chat-controller");


const router = express.Router();

router.post("/message", sendMessage);

module.exports = router;
