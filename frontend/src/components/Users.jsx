import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/bulk?filter=${filter}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setUsers(response.data.user);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [filter]);

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-lg w-full max-w-2xl mx-auto">
      <h2 className="font-bold text-xl mb-4 text-blue-700">Users</h2>

      <input
        onChange={(e) => setFilter(e.target.value)}
        type="text"
        placeholder="Search users..."
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="overflow-y-auto max-h-96 pr-1 custom-scroll">
        {users.length > 0 ? (
          users.map((user) => <User key={user._id} user={user} />)
        ) : (
          <div className="text-gray-500 text-center mt-10">No users found</div>
        )}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center border-b py-3">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-blue-600 text-white flex items-center justify-center mr-3 text-xl font-semibold">
          {user.firstName[0].toUpperCase()}
        </div>
        <div className="text-md font-medium text-gray-800">
          {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
        </div>
      </div>
      <Button
        onClick={() =>
          navigate(`/send?id=${user._id}&name=${user.firstName}`)
        }
        label="Send Money"
      />
    </div>
  );
}
