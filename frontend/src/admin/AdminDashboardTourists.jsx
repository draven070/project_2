import { useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/admin";

const AdminDashboardTourists = ({ tourists, setTourists }) => {
    const handleDelete = useCallback(async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this tourist?");
        if (confirmDelete) {
            try {
                await axios.delete(`${API_URL}/tourists/${id}`);
                setTourists((prevTourists) => prevTourists.filter((tourist) => tourist._id !== id));
                alert("Tourist deleted successfully!");
            } catch (error) {
                console.error("Error deleting tourist:", error);
                alert("Failed to delete tourist. Please try again.");
            }
        }
    }, [setTourists]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Tourists</h1>
            <table className="w-full border-collapse border border-gray-300">
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
                            <td className="border p-2 text-center">{tourist.fullName}</td>
                            <td className="border p-2 text-center">{tourist.email}</td>
                            <td className="border p-2 text-center">
                                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(tourist._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboardTourists;
