import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export const TransferSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");

    return (
        <div className="flex justify-center items-center h-screen bg-[#0f0f0f] text-white">
            <div className="bg-[#111111] border border-[#1f1f1f] p-8 rounded-xl shadow-2xl w-full max-w-md text-center space-y-6">
                
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
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

                <h2 className="text-3xl font-bold text-blue-600">Transfer Successful!</h2>
                {name && <p className="text-lg text-gray-300">to <strong className="capitalize">{name}</strong></p>}

                <div className="flex flex-col space-y-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-500 text-white py-2 rounded-md font-semibold transition"
                    >
                        Transfer Again
                    </button>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 text-white py-2 rounded-md font-semibold transition"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};
