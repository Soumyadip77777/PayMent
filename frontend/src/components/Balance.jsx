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
    <div className="bg-blue-600 rounded-2xl shadow-md p-6 max-w-sm mx-auto mt-6 border border-blue-700">
      <div className="text-center text-white">
        <h2 className="text-xl font-bold mb-2">Account Balance</h2>
        <p className="text-3xl font-extrabold tracking-wide">
          ₹ {balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
