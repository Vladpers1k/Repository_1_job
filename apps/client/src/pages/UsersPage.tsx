import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Failed to load users", err));
  }, []);

  const loadRandomUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("/users/random", { method: "POST" });
      const data = await res.json();
      setUsers((prev) => [...prev, data]);
    } catch (err) {
      console.error("Failed to load random user", err);
    } finally {
      setLoading(false);
    }
  };

  const saveUser = async (user: any) => {
    try {
      await fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      console.log("User saved!");
    } catch (err) {
      console.error("Failed to save user", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Random Users</h1>
      <button
        onClick={loadRandomUser}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Load more"}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user, i) => (
          <UserCard key={i} user={user} onSave={() => saveUser(user)} />
        ))}
      </div>
    </div>
  );
}
