const express = require("express");
const {
  loginController,
  registerController,
  getuserController,
  deleteuserController
} = require("../controllers/userController");

//router object
const router = express.Router();

//routers
// POST || LOGIN USER
router.post("/login", loginController);

//POST || REGISTER USER
router.post("/register", registerController);

router.post("/get-user", getuserController);
router.post("/delete-user", deleteuserController);

module.exports = router;
