import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Signin from "./components/login/login";
import GuideLogin from "./components/login/guidelogin";
import Signup from "./components/register/register";
import GuideSignup from "./components/register/guideregister";
import Footer from "./components/common/Footer";
import ReviewCard from "./components/review/review";
import Profiles from "./components/dashboard/profile";
import { Navbar } from "./components/common/Navbar";
import Dashboard from "./admin/Dashboard";
import GuideVerification from "./admin/GuideVerification";
import UserSection from "./admin/UserSection";
import GuideSection from "./admin/GuideSection";
import Form from "./components/form/form";
import Sidebar from "./components/dashboard/sidebar";
import Profileform from "./components/form/profileForm";
import Notification from "./components/notification/notification.jsx";
import Hotel from "./components/hotel/hotel.jsx";
import Tourist from "./components/dashboard/tourist.jsx";
import KYCForm from "./components/form/kyc";
import Dash from "./components/dashboard/dash";

import PrivateRoute from "./components/PrivateRoute.jsx";
import Blog from "./components/blog/component/Blog";
import Singleblog from "./components/blog/component/Singleblog";
import Widget from "./components/dashboard/dash";
import Request from "./components/request/request";
import AdminDashboardUsers from "./components/AdminDashboardUsers.jsx";
import AdminDashboardTourists from "./components/AdminDashboardTourists.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/users" element={<UserSection />} />
        <Route path="/guides" element={<GuideSection />} />

        <Route path="/" element={<Home />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/singleblog" element={<Singleblog />} />

        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/login" element={<GuideLogin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/register" element={<GuideSignup />}></Route>
        <Route path="/footer" element={<Footer />}></Route>
        <Route path="/dash/:email" element={<Dash />}></Route>
        <Route path="/review" element={<ReviewCard />}></Route>
        <Route path="/kyc" element={<KYCForm />}></Route>
        <Route path="/profile/:email" element={<Profiles />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/verify/:id" element={<GuideVerification />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/profileform" element={<Profileform />} />
        <Route path="/request" element={<Request />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/tourist" element={<Tourist />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/admin/users" element={<AdminDashboardUsers />} />
        <Route path="/admin/tourists" element={<AdminDashboardTourists />} />
        <Route
            path="/admin"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminDashboardTourists/>
              </PrivateRoute>
            }
          />
          
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
