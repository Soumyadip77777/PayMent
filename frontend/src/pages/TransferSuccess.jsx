import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export const TransferSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#050505] text-white px-4">
      <div className="bg-[#111] border border-[#2e2e2e] p-8 rounded-2xl shadow-2xl w-full max-w-md text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto"
        >
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <h2 className="text-3xl font-bold text-blue-500">Transfer Successful!</h2>

        {name && (
          <p className="text-lg text-gray-300">
            You sent money to <strong className="capitalize text-white">{name}</strong>
          </p>
        )}

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-semibold transition"
          >
            Transfer Again
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md text-sm font-semibold transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
