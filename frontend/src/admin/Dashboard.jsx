// AdminDashboard.js
import { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboardUsers from "./AdminDashboardUsers";
import AdminDashboardTourists from "./AdminDashboardTourists";
import AdminDashboardHotels from "./AdminDashboardHotels";

const API_URL = "http://localhost:3000/api/admin";
const KYC_API_URL = "http://localhost:3000/api/kyc";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("users");
    const [users, setUsers] = useState([]);
    const [tourists, setTourists] = useState([]);
    const [kycList, setKycList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, touristsRes, kycRes] = await Promise.all([
                    axios.get(`${API_URL}/users`),
                    axios.get(`${API_URL}/tourists`),
                    axios.get(KYC_API_URL)
                ]);

                setUsers(usersRes.data);
                setTourists(touristsRes.data);
                setKycList(kycRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleKycAction = async (email, status) => {
        if (status === "approved") {
            const user = users.find(u => u.email === email);
            if (!user) {
                alert("User not found for KYC approval.");
                return;
            }
            try {
                await axios.patch(`${API_URL}/users/form/${user.email}`, { formStatus: "verified" });
                setKycList(kycList.filter((kyc) => kyc.email !== email));
                alert("KYC approved and form status updated successfully!");
            } catch (error) {
                console.error("Error updating KYC:", error);
                alert("Failed to update KYC status.");
            }
        } else {
            setKycList(kycList.filter((kyc) => kyc.email !== email));
            alert("KYC declined.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                <div className="flex border-b">
                    <button className={`p-3 w-1/3 text-center ${activeTab === "users" ? "border-b-2 border-blue-500 font-bold" : ""}`} onClick={() => setActiveTab("users")}>Users & Tourists</button>
                    <button className={`p-3 w-1/3 text-center ${activeTab === "kyc" ? "border-b-2 border-blue-500 font-bold" : ""}`} onClick={() => setActiveTab("kyc")}>KYC Approvals</button>
                    <button className={`p-3 w-1/3 text-center ${activeTab === "hotels" ? "border-b-2 border-blue-500 font-bold" : ""}`} onClick={() => setActiveTab("hotels")}>Hotels</button>
                </div>
                {activeTab === "users" && (
                    <>
                        <AdminDashboardUsers users={users} setUsers={setUsers} />
                        <AdminDashboardTourists tourists={tourists} setTourists={setTourists} />
                    </>
                )}
                {activeTab === "kyc" && (
                    <div>
                        <h2 className="text-xl font-bold mt-6">KYC Approvals</h2>
                        <table className="w-full border-collapse border border-gray-300 mt-2">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Citizenship No.</th>
                                    <th className="border p-2">Profile Image</th>
                                    <th className="border p-2">Citizenship Photo</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kycList.map((kyc) => (
                                    <tr key={kyc.email} className="border">
                                        <td className="border p-2">{kyc.name}</td>
                                        <td className="border p-2">{kyc.email}</td>
                                        <td className="border p-2">{kyc.citizenshipNumber}</td>
                                        <td className="border p-2"><img src={`http://localhost:3000/public/data/uploads/${kyc.profileImage}`} alt="Profile" className="w-16 h-16 object-cover" /></td>
                                        <td className="border p-2"><img src={`http://localhost:3000/public/data/uploads/${kyc.citizenshipPhoto}`} alt="Citizenship" className="w-16 h-16 object-cover" /></td>
                                        <td className="border p-2">
                                            <button className="bg-green-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleKycAction(kyc.email, "approved")}>Approve</button>
                                            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleKycAction(kyc.email, "declined")}>Decline</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === "hotels" && <AdminDashboardHotels />}
            </div>
        </div>
    );
};

export default AdminDashboard;