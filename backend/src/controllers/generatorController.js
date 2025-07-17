const openaiService = require("../services/openaiService");
const { ApiError } = require("../utils/errorHandler");

/**
 * Generate learning materials based on provided notes
 */
const generateLearningMaterial = async (req, res, next) => {
  try {
    const { notes } = req.body;
    const { type } = req.params;

    // Validate input
    if (!notes || notes.trim() === "") {
      throw new ApiError(400, "Notes content is required");
    }

    if (!["mindmap", "quiz", "flashcards"].includes(type)) {
      throw new ApiError(
        400,
        'Invalid output type. Must be "mindmap", "quiz", or "flashcards"'
      );
    }

    // Process the notes based on the requested type
    const result = await openaiService.processNotes(notes, type);

    // Return the generated content
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateLearningMaterial,
};
