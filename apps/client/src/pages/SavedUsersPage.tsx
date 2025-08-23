import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export default function SavedUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSavedUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch saved users:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (email: string) => {
    try {
      await fetch(`${API_URL}/users/${email}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.email !== email));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  useEffect(() => {
    loadSavedUsers();

    const interval = setInterval(loadSavedUsers, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="text-center p-4">
      <h1 className="text-2xl font-bold mb-4">Saved Users</h1>
      {users.length === 0 ? (
        <p>No saved users yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {users.map((user, i) => (
            <UserCard
              key={i}
              user={user}
              onDelete={() => deleteUser(user.email)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
