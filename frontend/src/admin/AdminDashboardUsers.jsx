import { useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/admin";

const AdminDashboardUsers = ({ users, setUsers }) => {
    const handleDelete = useCallback(async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await axios.delete(`${API_URL}/users/${id}`);
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
                alert("User deleted successfully!");
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Failed to delete user. Please try again.");
            }
        }
    }, [setUsers]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Users (Guides)</h1>
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
                            <td className="border p-2 text-center">{user.fullName}</td>
                            <td className="border p-2 text-center">{user.email}</td>
                            <td className="border p-2 text-center">
                                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboardUsers;
