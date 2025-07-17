# Collab25

## Example Folder Structure to use and Create.

Timeplans

Where necessary add your own additions shaan and fred. But as long as it is ok in the main repo it is fine. 

ai-learning-supporter/
│
├── README.md                     # Project overview, setup instructions
├── .gitignore                    # Files to ignore in version control
├── package.json                  # Project metadata and dependencies
│
├── frontend/                     # Frontend code (managed by frontend dev)
│   ├── public/                   # Static assets
│   ├── src/                      # Source files
│   └── package.json              # Frontend-specific dependencies
│
├── backend/                      # Your domain as backend developer
│   ├── src/
│   │   ├── server.js             # Entry point
│   │   ├── config/               # Configuration files
│   │   │   ├── db.js             # Database configuration
│   │   │   └── env.js            # Environment variables
│   │   │
│   │   ├── api/                  # API routes
│   │   │   ├── routes/           # Route definitions
│   │   │   │   ├── notes.js
│   │   │   │   ├── mindmaps.js
│   │   │   │   ├── flashcards.js
│   │   │   │   ├── quizzes.js
│   │   │   │   └── users.js
│   │   │   │
│   │   │   ├── controllers/      # Request handlers
│   │   │   │   ├── noteController.js
│   │   │   │   ├── mindmapController.js
│   │   │   │   └── ...
│   │   │   │
│   │   │   └── middleware/       # Custom middleware
│   │   │       ├── auth.js
│   │   │       └── validation.js
│   │   │
│   │   ├── services/             # Business logic
│   │   │   ├── noteService.js
│   │   │   ├── aiProcessingService.js
│   │   │   ├── mindmapService.js
│   │   │   ├── flashcardService.js
│   │   │   └── quizService.js
│   │   │
│   │   └── utils/                # Helper functions
│   │       ├── mermaidConverter.js
│   │       └── aiResponseParser.js
│   │
│   ├── tests/                    # Backend tests
│   │   ├── unit/
│   │   └── integration/
│   │
│   └── package.json              # Backend-specific dependencies
│
├── database/                     # Database scripts and models (with DB specialist)
│   ├── migrations/
│   ├── models/
│   │   ├── User.js
│   │   ├── Note.js
│   │   ├── Mindmap.js
│   │   ├── Flashcard.js
│   │   └── Quiz.js
│   │
│   └── seeds/                    # Test data
│
└── docs/                         # Documentation
    ├── api/                      # API documentation
    ├── architecture/             # System architecture diagrams
    └── setup/                    # Setup guides
