import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import SavedPage from "./pages/SavedUsersPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 flex justify-center gap-6">
        <Link to="/" className="hover:underline">
          Users
        </Link>
        <Link to="/saved" className="hover:underline">
          Saved Users
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/saved" element={<SavedPage />} />
      </Routes>
    </div>
  );
}

export default App;
