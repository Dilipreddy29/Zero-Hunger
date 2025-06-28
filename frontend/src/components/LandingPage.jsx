import React from "react";
import Tasks from "./Tasks"; // Importing Tasks component
import Login from "./LoginForm"; // Importing Tasks component
import DonorForm from "./DonorForm"; // Importing DonorForm component

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-white text-gray-800 flex flex-col">
      
      {/* Navbar - Full Width */}
      <header className="bg-white shadow w-full">
        <div className="flex justify-between items-center w-full px-16 py-5">
          <h1 className="text-2xl font-bold text-blue-600">🚐 VolunteerConnect</h1>
          <nav className="space-x-10 text-base font-medium">
            <a href="/tasks" className="hover:text-blue-600">Tasks</a>
            <a href="/login" className="hover:text-blue-600">Login</a>
            <a
              href="/donorform"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Donate
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center w-full">
        <section className="w-full text-center py-32">
          <h2 className="text-6xl font-extrabold mb-6">
            Connect. Serve. Empower.
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto">
            Join a community of volunteers helping NGOs reach people faster. Register today and start making a difference.
          </p>
          <a
            href="/register"
            className="bg-green-600 text-white px-8 py-4 rounded-full text-lg hover:bg-green-700"
          >
            Register as Volunteer
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white text-center py-6 text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} VolunteerConnect. All rights reserved.
      </footer>
    </div>
  );
}
