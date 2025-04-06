import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const handleTransfer = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.warn("Please enter a valid amount", { position: "top-center" });
      return;
    }

    setIsSending(true);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/transfer`, {
        to: id,
        amount: Number(amount),
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      toast.success("Transfer successful!", {
        position: "top-center",
        autoClose: 1500,
        onClose: () => navigate(`/transfer-success?name=${name}`),
      });
    } catch (err) {
      toast.error("Transfer failed. Try again.", { position: "top-center" });
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0f0f] to-[#050505] text-white px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-[#111] rounded-2xl shadow-2xl px-8 py-10 space-y-6 border border-[#2e2e2e]">
        <h2 className="text-3xl font-bold text-center">
          Welcome to <span className="text-blue-500">PayMent</span>
        </h2>
        <p className="text-center text-gray-400">Send money securely and instantly!</p>

        <div className="flex items-center space-x-4 justify-center">
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-semibold">
            {name?.[0]?.toUpperCase()}
          </div>
          <div className="text-lg font-medium text-white capitalize">
            {name.toUpperCase()}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
            Enter Amount (₹)
          </label>
          <input
            id="amount"
            type="number"
            placeholder="E.g. 500"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 bg-[#1c1c1c] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <button
          onClick={handleTransfer}
          disabled={isSending}
          className={`w-full ${
            isSending ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 px-4 rounded-md transition text-sm font-medium`}
        >
          {isSending ? "Sending..." : `Send ₹${amount || 0}`}
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md transition text-sm font-medium"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};
