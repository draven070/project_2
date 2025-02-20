import React from "react";

// function Demo() {
//   return (
//     <>
//       <h1>This is demo</h1>
//     </>
//   );
// }
// export default Demo;
import { useState } from "react";

// Content Components
const UserActivities = () => (
  <div>
    <h2>User Activities</h2>
    <ul>
      <li>Activity 1: User registered</li>
      <li>Activity 2: User booked a hotel</li>
      {/* Add more activities as needed */}
    </ul>
  </div>
);

const Bookings = () => (
  <div>
    <h2>Bookings</h2>
    <ul>
      <li>Booking 1: Hotel X - User A</li>
      <li>Booking 2: Hotel Y - User B</li>
      {/* Add more bookings as needed */}
    </ul>
  </div>
);

const GuideRegistrations = () => (
  <div>
    <h2>Guide Registrations</h2>
    <ul>
      <li>Guide 1: John Doe - Verified</li>
      <li>Guide 2: Jane Smith - Pending</li>
      {/* Add more guides as needed */}
    </ul>
  </div>
);

const Hotels = () => (
  <div>
    <h2>Hotels</h2>
    <ul>
      <li>Hotel X - Added</li>
      <li>Hotel Y - Pending</li>
      {/* Add more hotels as needed */}
    </ul>
  </div>
);

const ComplaintsDisputes = () => (
  <div>
    <h2>Complaints & Disputes</h2>
    <ul>
      <li>Complaint 1: Issue with booking</li>
      <li>Complaint 2: Guide was unprofessional</li>
      {/* Add more complaints as needed */}
    </ul>
  </div>
);

// Main Dashboard Component
const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState("Dashboard");

  // Sidebar options
  const sidebarOptions = [
    { title: "Dashboard", icon: "🏠" },
    { title: "Users", icon: "👥" },
    { title: "Bookings", icon: "🛎️" },
    { title: "Guides", icon: "📝" },
    { title: "Hotels", icon: "🏨" },
    { title: "Complaints & Disputes", icon: "⚖️" },
  ];

  // Function to render content based on selected section
  const renderSection = () => {
    switch (selectedSection) {
      case "Users":
        return <UserActivities />;
      case "Bookings":
        return <Bookings />;
      case "Guides":
        return <GuideRegistrations />;
      case "Hotels":
        return <Hotels />;
      case "Complaints & Disputes":
        return <ComplaintsDisputes />;
      default:
        return <div>Welcome to the Admin Dashboard</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-800 text-white p-5 transition-all duration-300`}
      >
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-700 rounded-lg w-full flex items-center justify-center"
        >
          <span className="text-2xl">☰</span>
        </button>
        <nav className="mt-8 space-y-4">
          {sidebarOptions.map((option) => (
            <button
              key={option.title}
              onClick={() => setSelectedSection(option.title)}
              className="flex items-center p-2 hover:bg-gray-700 rounded-lg w-full text-left"
            >
              <span className="text-xl">{option.icon}</span>
              {isSidebarOpen && <span className="ml-3">{option.title}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <span className="text-xl">☰</span>
            </button>
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
            </div>
          </div>
        </header>

        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-6">
            {selectedSection} Content
          </h1>
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
