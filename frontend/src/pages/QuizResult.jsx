import { useLocation, Link, Navigate } from "react-router-dom";

export default function QuizResult() {
  const location = useLocation();
  const results = location.state;

  // 🔒 Safety check
  if (!results || results.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-xl font-bold mb-4">
          No recommendations found 😔
        </h2>
        <Link to="/compatibility-quiz" className="text-blue-600 underline">
          Take Quiz Again
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        Pets Suitable For You 🐾
      </h2>

      {results.map((pet, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 mb-4 shadow-sm bg-white"
        >
          <p><b>Pet Type:</b> {pet.petType}</p>
          <p><b>Breed:</b> {pet.breed}</p>
          <p><b>Compatibility:</b> {pet.match}%</p>

          {pet.reason && (
            <p className="text-sm text-gray-600 mt-2">
              <b>Why?</b> {pet.reason}
            </p>
          )}
        </div>
      ))}

      <Link
        to="/pets"
        className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        View Available Pets
      </Link>
    </div>
  );
}
