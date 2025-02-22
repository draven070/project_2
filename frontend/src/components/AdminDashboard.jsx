import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/admin";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("users");
    const [users, setUsers] = useState([]);
    const [tourists, setTourists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users and tourists data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, touristsRes] = await Promise.all([
                    axios.get(`${API_URL}/users`),
                    axios.get(`${API_URL}/tourists`),
                ]);

                setUsers(usersRes.data);
                setTourists(touristsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Delete user
    const handleDeleteUser = useCallback(async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`${API_URL}/users/${id}`);
                setUsers((prev) => prev.filter((user) => user._id !== id));
                alert("User deleted successfully!");
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Failed to delete user. Please try again.");
            }
        }
    }, []);

    // Delete tourist
    const handleDeleteTourist = useCallback(async (id) => {
        if (window.confirm("Are you sure you want to delete this tourist?")) {
            try {
                await axios.delete(`${API_URL}/tourists/${id}`);
                setTourists((prev) => prev.filter((tourist) => tourist._id !== id));
                alert("Tourist deleted successfully!");
            } catch (error) {
                console.error("Error deleting tourist:", error);
                alert("Failed to delete tourist. Please try again.");
            }
        }
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

                {/* Navbar Tabs */}
                <div className="flex border-b">
                    <button
                        className={`p-3 w-1/2 text-center ${activeTab === "users" ? "border-b-2 border-blue-500 font-bold" : ""}`}
                        onClick={() => setActiveTab("users")}
                    >
                        Users (Guides)
                    </button>
                    <button
                        className={`p-3 w-1/2 text-center ${activeTab === "tourists" ? "border-b-2 border-blue-500 font-bold" : ""}`}
                        onClick={() => setActiveTab("tourists")}
                    >
                        Tourists
                    </button>
                </div>

                {/* Users Table */}
                {activeTab === "users" && (
                    <div>
                        <h2 className="text-xl font-bold mt-6">Users (Guides)</h2>
                        <table className="w-full border-collapse border border-gray-300 mt-2">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Form</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border">
                                        <td className="border p-2">{user.fullName}</td>
                                        <td className="border p-2">{user.email}</td>
                                        <td className="border p-2">{user.form}</td>
                                        <td className="border p-2">
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={() => handleDeleteUser(user._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Tourists Table */}
                {activeTab === "tourists" && (
                    <div>
                        <h2 className="text-xl font-bold mt-6">Tourists</h2>
                        <table className="w-full border-collapse border border-gray-300 mt-2">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tourists.map((tourist) => (
                                    <tr key={tourist._id} className="border">
                                        <td className="border p-2">{tourist.fullName}</td>
                                        <td className="border p-2">{tourist.email}</td>
                                        <td className="border p-2">
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={() => handleDeleteTourist(tourist._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
