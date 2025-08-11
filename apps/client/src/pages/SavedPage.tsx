import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

export default function SavedPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Saved Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user, i) => (
          <UserCard key={i} user={user} />
        ))}
      </div>
    </div>
  );
}
