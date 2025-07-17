const { OpenAI } = require("openai");
const { ApiError } = require("../utils/errorHandler");
const config = require("../config/config");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

/**
 * Process notes and generate learning materials using OpenAI
 * @param {string} noteContent - User's notes to process
 * @param {string} outputType - Type of learning material to generate (mindmap, quiz, flashcards)
 * @returns {Object} Generated learning material
 */
const processNotes = async (noteContent, outputType) => {
  try {
    let prompt;

    // Create a specific prompt based on the output type
    if (outputType === "mindmap") {
      prompt = `
        You are an expert at creating flowcharts using Mermaid syntax. 
        Convert these notes into a Mermaid flowchart diagram.
        IMPORTANT: 
        - Start with "flowchart TD" (top-down direction)
        - Use proper Mermaid flowchart syntax with arrows (-->)
        - Use square brackets [] for process nodes
        - Use {} for decision nodes
        - Provide ONLY the raw Mermaid syntax without any markdown code blocks or backticks
        - Create a logical flow of processes and decisions
        - Keep the flowchart focused on key steps and relationships
        
        Example format:
        flowchart TD
            A[First Step] --> B[Second Step]
            B --> C{Decision}
            C -- Yes --> D[Action 1]
            C -- No --> E[Action 2]
        
        Notes to convert:
        ${noteContent}
      `;
    } else if (outputType === "quiz") {
      prompt = `
        Create 5 multiple choice questions based on these notes.
        Format your response as a JSON object with this structure:
        {
          "questions": [
            {
              "question": "The question text",
              "options": ["Option A", "Option B", "Option C", "Option D"],
              "correctAnswer": "Option A"
            }
          ]
        }
        Ensure the questions test understanding of key concepts from the notes.
        Make the options challenging but not misleading.
        
        Notes to use:
        ${noteContent}
      `;
    } else if (outputType === "flashcards") {
      prompt = `
        Create 8 flashcards based on these notes.
        Format your response as a JSON object with this structure:
        {
          "flashcards": [
            {
              "front": "Key term or concept",
              "back": "Definition or explanation"
            }
          ]
        }
        Focus on important terms, concepts, and relationships.
        Make the cards clear and concise.
        
        Notes to use:
        ${noteContent}
      `;
    }

    // Make API call to OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an educational content generator that creates high-quality study materials from student notes.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;

    // Process the response based on the output type
    if (outputType === "mindmap") {
      // Clean up the response and format with proper line breaks
      const mermaidSyntax = content
        .replace(/```mermaid\n?/, "")
        .replace(/```(\n)?$/, "")
        .replace(/```\n?/, "")
        .replace(/```/, "")
        .trim()
        // Split on \n and rejoin with actual line breaks
        .split("\\n")
        .join("\n")
        // Ensure it starts with flowchart TD
        .replace(/^(?!flowchart TD)/, "flowchart TD\n");

      return { content: mermaidSyntax, format: "mermaid" };
    } else {
      // For quiz and flashcards, try to parse JSON
      try {
        // Check if the response is wrapped in code blocks and extract
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) ||
          content.match(/```\n([\s\S]*?)\n```/) || [null, content];
        const jsonContent = jsonMatch[1] || content;
        const parsedContent = JSON.parse(jsonContent);
        return parsedContent;
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        // If JSON parsing fails, return the raw content
        return { content, format: "raw" };
      }
    }
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new ApiError(500, "Failed to generate content: " + error.message);
  }
};

module.exports = {
  processNotes,
};
