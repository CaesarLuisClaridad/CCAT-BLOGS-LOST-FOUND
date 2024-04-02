const express = require("express");
const { userSignUp, userLogIn, editInformation, updatePassword, findUser, initiatePasswordReset } = require("../controller/userController");

const router = express.Router();

router.post("/login", userLogIn);

router.post("/signup", userSignUp);

router.patch("/editinfo/:id", editInformation);

router.patch("/updatePassword/:id", updatePassword);

router.post("/findUser", findUser);

router. patch("/passwordReset/:id", initiatePasswordReset);

module.exports = router;
