const {Signup} = require("../Controllers/AuthController.js");
const router = require("express").Router();

router.post("/sigup", Signup);




module.exports = router;