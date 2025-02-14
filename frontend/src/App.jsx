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
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import Blog from "./components/blog/component/Blog";
import Singleblog1 from "./components/blog/component/Singleblog/Singleblog1.jsx";
import Singleblog2 from "./components/blog/component/Singleblog/Singleblog2.jsx";
import Singleblog3 from "./components/blog/component/Singleblog/Singleblog3.jsx";
import Singleblog4 from "./components/blog/component/Singleblog/Singleblog4.jsx";
import Widget from "./components/dashboard/dash";
import Request from "./components/request/request";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/users" element={<UserSection />} />
        <Route path="/guides" element={<GuideSection />} />

        <Route path="/" element={<Home />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/singleblog1" element={<Singleblog1 />} />
        <Route path="/singleblog2" element={<Singleblog2 />} />
        <Route path="/singleblog3" element={<Singleblog3 />} />
        <Route path="/singleblog4" element={<Singleblog4 />} />
        <Route path="/AboutUs" element={<AboutUs />} />
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
