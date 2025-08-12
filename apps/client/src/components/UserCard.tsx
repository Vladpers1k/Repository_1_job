import React from "react";

interface User {
  name: string;
  gender: string;
  email: string;
  location: {
    city: string;
    country: string;
  };
  picture: string;
  weather: {
    temperature: number;
    min: number;
    max: number;
  };
}

interface Props {
  user: User;
  onSave?: () => void;
}

export default function UserCard({ user, onSave }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow flex flex-col items-center gap-2">
      <img
        src={user.picture || "https://via.placeholder.com/150"}
        alt={user.name || "User"}
        className="w-24 h-24 rounded-full"
      />

      <h2 className="text-lg font-semibold">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.gender}</p>
      <p className="text-sm">
        {user.location.city}, {user.location.country}
      </p>
      <p className="text-sm">{user.email}</p>
      <p className="text-sm font-medium">
        🌡 {user.weather.temperature}°C (min: {user.weather.min}°C, max:{" "}
        {user.weather.max}°C)
      </p>
      {onSave && (
        <button
          onClick={onSave}
          className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      )}
    </div>
  );
}
