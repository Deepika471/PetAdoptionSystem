// const express = require("express");
// const router = express.Router();
// const { submitQuiz } = require("../controllers/quizController");

// router.post("/submit", submitQuiz);

// module.exports = router;

const express = require("express");
const router = express.Router();

// 🔥 TEMPORARY TEST ROUTE
router.post("/submit", (req, res) => {
  console.log("✅ /api/quiz/submit HIT");
  res.json([{ test: "quiz route working" }]);
});

module.exports = router;

