const express = require("express");

const {createVerifyEmail,verifyEmail} = require("../controllers/VerifyEmail");


const verifyRouter = express.Router();

verifyRouter.post("/", createVerifyEmail);
verifyRouter.post("/:token", verifyEmail);

module.exports = verifyRouter;
