const express = require("express");
const router = express.Router();
// 用户行为
const test = require("./test/index");

router.get("/test", test.test);
router.post("/test", test.test);
module.exports = router;
