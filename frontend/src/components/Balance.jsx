import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/account/balance`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setBalance(response.data.balance);
      } catch (err) {
        console.error("Failed to fetch balance", err);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-gray-800 w-full max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-2 text-center">Account Balance</h2>
      <p className="text-2xl font-bold text-center text-blue-600">
        ₹ {balance.toFixed(2)}
      </p>
    </div>
  );
};
