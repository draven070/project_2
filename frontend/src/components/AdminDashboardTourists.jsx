import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/admin";

const AdminDashboardTourists = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/tourists`);
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    console.error("Invalid response format:", response.data);
                    setError("Invalid data received from the server.");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                setError("Failed to fetch users. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const handleDelete = useCallback(async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        
        if (confirmDelete) {
            try {
                await axios.delete(`${API_URL}/tourists/${id}`);
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
                alert("User deleted successfully!");
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Failed to delete user. Please try again.");
            }
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard for Tourist</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border">
                            <td className="border p-2">{user.fullName}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboardTourists;
