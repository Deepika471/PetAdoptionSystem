// backend/src/controllers/quizController.js

const submitQuiz = (req, res) => {
  const answers = req.body;

  // Breed score map
  const scores = {
    pug: { score: 0, petType: "Dog", breed: "Pug", reason: [] },
    golden: { score: 0, petType: "Dog", breed: "Golden Retriever", reason: [] },
    german: { score: 0, petType: "Dog", breed: "German Shepherd", reason: [] },
    labrador: { score: 0, petType: "Dog", breed: "Labrador Retriever", reason: [] },
    persian: { score: 0, petType: "Cat", breed: "Persian Cat", reason: [] },
    ragdoll: { score: 0, petType: "Cat", breed: "Ragdoll Cat", reason: [] }
  };

  /* -------------------------------
     SCORING RULES
  --------------------------------*/

  // 1. Home type
  if (answers.home === "apartment") {
    scores.pug.score += 3;
    scores.persian.score += 3;
    scores.pug.reason.push("Apartment friendly");
    scores.persian.reason.push("Quiet indoor breed");
  }

  if (answers.home === "house" || answers.home === "farm") {
    scores.golden.score += 3;
    scores.german.score += 3;
    scores.labrador.score += 2;
    scores.german.reason.push("Needs open space");
    scores.golden.reason.push("Enjoys outdoor space");
  }

  // 2. Time availability
  if (answers.time === "low") {
    scores.persian.score += 2;
    scores.pug.score += 1;
  }

  if (answers.time === "high") {
    scores.golden.score += 2;
    scores.labrador.score += 2;
    scores.german.score += 2;
  }

  // 3. Kids at home
  if (answers.kids !== "no") {
    scores.golden.score += 3;
    scores.labrador.score += 3;
    scores.golden.reason.push("Great with kids");
    scores.labrador.reason.push("Very friendly nature");
  }

  // 4. Experience
  if (answers.experience === "first") {
    scores.pug.score += 3;
    scores.golden.score += 2;
    scores.pug.reason.push("Easy for first-time owners");
  }

  // 5. Grooming
  if (answers.grooming === "low") {
    scores.pug.score += 2;
    scores.labrador.score += 2;
  }

  if (answers.grooming === "high") {
    scores.persian.score += 2;
    scores.ragdoll.score += 2;
  }

  // 6. Alone time
  if (answers.aloneTime === "long") {
    scores.persian.score += 3;
    scores.ragdoll.score += 3;
    scores.persian.reason.push("Independent and calm");
  }

  // 7. Commitment
  if (answers.commitment === "yes") {
    scores.german.score += 2;
    scores.golden.score += 1;
  }

  // 8. Behavior preference
  if (answers.behavior === "calm") {
    scores.pug.score += 2;
    scores.persian.score += 2;
  }

  if (answers.behavior === "playful") {
    scores.labrador.score += 3;
    scores.golden.score += 3;
  }

  if (answers.behavior === "protective") {
    scores.german.score += 4;
    scores.german.reason.push("Highly alert and protective");
  }

  // 9. Pet type preference
  if (answers.petType === "dog") {
    scores.persian.score -= 5;
    scores.ragdoll.score -= 5;
  }

  if (answers.petType === "cat") {
    scores.golden.score -= 5;
    scores.labrador.score -= 5;
    scores.german.score -= 5;
  }

  // 10. Gender preference (soft preference)
  if (answers.genderPreference !== "none") {
    Object.values(scores).forEach(breed => {
      breed.reason.push(`Preferred ${answers.genderPreference} pet`);
    });
  }

  /* -------------------------------
     FINAL RESULT
  --------------------------------*/

  const result = Object.values(scores)
    .filter(b => b.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3) // top 3 matches
    .map(b => ({
      petType: b.petType,
      breed: b.breed,
      match: Math.min(95, b.score * 10),
      reason: [...new Set(b.reason)].join(", ")
    }));

  return res.status(200).json(result);
};

module.exports = { submitQuiz };
