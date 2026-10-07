import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CompatibilityQuiz() {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({
    petType: "",
    genderPreference: "",
    petSize: "",
    petAge: "",
    behavior: ""
  });

  const handleChange = (field, value) => {
    setAnswers({ ...answers, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/quiz/submit",
        answers
      );

      console.log("QUIZ RESPONSE:", res.data);
      navigate("/quiz-result", { state: res.data });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Pet Compatibility Quiz 🐾
      </h1>

      {/* 1. Pet Type */}
      <Question title="1. What pet do you prefer?">
        <Select onChange={(e) => handleChange("petType", e.target.value)}>
          <option value="">Select</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="both">Open to both</option>
        </Select>
      </Question>

      {/* 2. Gender Preference */}
      <Question title="2. Do you have a gender preference for the pet?">
        <Select onChange={(e) => handleChange("genderPreference", e.target.value)}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="none">No preference</option>
        </Select>
      </Question>

      {/* 3. Pet Size */}
      <Question title="3. What size of pet do you prefer?">
        <Select onChange={(e) => handleChange("petSize", e.target.value)}>
          <option value="">Select</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </Select>
      </Question>

      {/* 4. Pet Age */}
      <Question title="4. What age group of pet do you prefer?">
        <Select onChange={(e) => handleChange("petAge", e.target.value)}>
          <option value="">Select</option>
          <option value="young">Young (0–2 years)</option>
          <option value="adult">Adult (2–6 years)</option>
          <option value="senior">Senior (6+ years)</option>
        </Select>
      </Question>

      {/* 5. Behavior */}
      <Question title="5. What kind of behavior do you prefer in a pet?">
        <Select onChange={(e) => handleChange("behavior", e.target.value)}>
          <option value="">Select</option>
          <option value="calm">Calm & quiet</option>
          <option value="playful">Playful & energetic</option>
          <option value="protective">Protective / alert</option>
        </Select>
      </Question>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded w-full mt-6"
      >
        See Recommended Pets
      </button>
    </div>
  );
}

/* Reusable components */
function Question({ title, children }) {
  return (
    <div className="mb-4">
      <p className="font-semibold mb-1">{title}</p>
      {children}
    </div>
  );
}

function Select({ children, ...props }) {
  return (
    <select className="border p-2 w-full rounded" {...props}>
      {children}
    </select>
  );
}
