const express = require("express");
const {CreateOrder ,deleteOrder, getOrderByAuthor,getAllOrder,verifyEmail} = require("../controllers/Oeders");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const orderRouter = express.Router();

orderRouter.post("/create", authentication, authorization("CREATE_ORDER"), CreateOrder);
orderRouter.get("/delete/:id", authentication, deleteOrder);
orderRouter.get("/:userId",authentication, getOrderByAuthor);
orderRouter.get("/", getAllOrder);

module.exports = orderRouter;