import React, { useState } from "react";
import UserCard from "../components/UserCard";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  const loadRandomUser = async () => {
    const res = await fetch("http://localhost:3000/users/random", {
      method: "POST",
    });
    const data = await res.json();
    setUsers((prev) => [...prev, data]);
  };

  const saveUser = async (user: any) => {
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    alert("User saved!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Random Users</h1>
      <button
        onClick={loadRandomUser}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Load more
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user, i) => (
          <UserCard key={i} user={user} onSave={() => saveUser(user)} />
        ))}
      </div>
    </div>
  );
}
