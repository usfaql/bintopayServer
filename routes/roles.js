const express = require("express");

// Import roles controller
const { createNewRole } = require("../controllers/Roles");

// Create roles router
const rolesRouter = express.Router();



rolesRouter.post("/", createNewRole);

module.exports = rolesRouter;
