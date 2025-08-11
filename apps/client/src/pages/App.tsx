import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UsersPage from "./UsersPage";
import SavedPage from "./SavedPage";

export default function App() {
  return (
    <div className="p-4">
      <nav className="flex gap-4 mb-6 border-b pb-2">
        <Link to="/" className="text-blue-500 hover:underline">
          Users
        </Link>
        <Link to="/saved" className="text-blue-500 hover:underline">
          Saved
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/saved" element={<SavedPage />} />
      </Routes>
    </div>
  );
}
