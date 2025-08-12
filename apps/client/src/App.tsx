import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import SavedPage from "./pages/SavedUsersPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 flex gap-4">
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
    </Router>
  );
}

export default App;
