import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0c0c1d] text-white">
     
      <Appbar />


      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        <div className="bg-[#111827] rounded-xl p-6 shadow-md border border-gray-700">
          <Balance />
        </div>

       
        <div className="bg-[#111827] rounded-xl p-6 shadow-md border border-gray-700">
          <Users />
        </div>
      </div>
    </div>
  );
};
