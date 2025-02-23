import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
export const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role"); // Get the role of the logged-in user
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown
  const dropdownRef = useRef(null); // Ref for the dropdown

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload(); // Refresh the page to reflect the changes in the navbar
  };

  const handleUserIconClick = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown menu visibility
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close the dropdown if the click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#346bae] border-[#346bae]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo - Adjust behavior if logged in as admin */}
        <button
          className={`flex items-center space-x-3 rtl:space-x-reverse ${
            userRole === "admin" ? "cursor-default" : ""
          }`}
          onClick={userRole !== "admin" ? () => navigate("/") : undefined}
        >
          <span
            className={`self-center text-3xl font-bold font-mono text-white ${
              userRole === "admin" ? "" : "hover:text-green-500"
            } whitespace-nowrap dark:text-white dark:hover:text-green-500`}
          >
            YatraSathi
          </span>
        </button>

        <div className="flex justify-between gap-7 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLoggedIn && userRole !== "admin" && (
            <>
              <Link
                to="/"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-green-500 md:hover:bg-transparent md:hover:text-green-500 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Home
              </Link>
              {userRole !== "admin" && userRole !== "guide" && (
                <>
                  <Link
                    to="/hotel"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-green-500 md:hover:bg-transparent md:hover:text-green-500 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Hotel
                  </Link>

                  <a
                    href="/guide"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-green-500 md:hover:bg-transparent md:hover:text-green-500 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Guide
                  </a>
                </>
              )}
            </>
          )}

          {/* Conditionally hide About Us and Blog for Admin users */}
          {isLoggedIn && userRole !== "admin" && (
            <>
              <a
                href="#"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-green-500 md:hover:bg-transparent md:hover:text-green-500 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                onClick={() => navigate("/AboutUs")}
              >
                About Us
              </a>
              <Link
                to={"/blog"}
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-green-500 md:hover:bg-transparent md:hover:text-green-500 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Blog
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-gray-900 dark:text-white text-3xl cursor-pointer"
                onClick={handleUserIconClick}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {/* For non-admin users */}
                    {userRole !== "admin" && (
                      <>
                        <li>
                                    {userRole === "guide" && (
                                                   <button
                                          className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => navigate(`/dash/${localStorage.getItem("email")}`)}
                                  >
                            Profile
                          </button>
                           )}
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() =>
                              navigate(
                                userRole === "tourist"
                                  ? "/notification"
                                  : "/request"
                              )
                            }
                          >
                            Notifications
                          </button>
                        </li>
                      </>
                    )}
                    {/* Always show logout */}
                    <li>
                      <button
                        className="block px-4 py-2 w-full text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-red-400"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Show About Us and Blog when logged out, before Sign In buttons */}
              <div className="flex gap-4">
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-green-500 md:hover:bg-transparent md:hover:text-green-500 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  onClick={() => navigate("/AboutUs")}
                >
                  About Us
                </a>
                <Link
                  to={"/blog"}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-green-500 md:hover:bg-transparent md:hover:text-green-500 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Blog
                </Link>
              </div>
              {/* Sign In Buttons */}
              {/* <button
                type="button"
                className="text-white bg-green-500 hover:bg-green-700 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-700"
                onClick={() => navigate("/adminlogin")}
              >
                Admin
              </button> */}
              <button
                type="button"
                className="text-white bg-green-500 hover:bg-green-700 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-700"
                onClick={() => navigate("/signin")}
              >
                Sign up as Traveler
              </button>
              <button
                type="button"
                className="text-white bg-green-500 hover:bg-green-700 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-700"
                onClick={() => navigate("/login")}
              >
                Sign up as a YatraSathi
              </button>
            </>
          )}
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};