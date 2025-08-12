import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

export default function SavedUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSavedUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch saved users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Saved Users</h1>
      {users.length === 0 ? (
        <p>No saved users yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user, i) => (
            <UserCard key={i} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
