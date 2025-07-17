const express = require("express");
const generatorController = require("../controllers/generatorController");

const router = express.Router();

// Single endpoint that generates different types of learning materials
router.post("/generate/:type", generatorController.generateLearningMaterial);

module.exports = router;
