import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Topuser = () => {
  const [profiles, setProfiles] = useState([]);
  
  const listRef = useRef(null);
  useEffect(() => {
    const fetchProfiles = async () => {
      try {

        const response = await axios.get(
          "http://localhost:3000/api/profile/profile"
        );
        console.log(response);
        if (response.status === 200) {
          setProfiles(response.data); // Assuming response.data is an array of profiles
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);
 

  const slideLeft = () => {
    listRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const slideRight = () => {
    listRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <>
      <div className="max-w-6xl mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="text-center py-8" id="guide">
          <h1 className="text-4xl font-bold text-gray-900">
            Find your local tour guide with YatraSathi
          </h1>
          <p className="text-lg text-gray-500 mt-2">Choose your best</p>
        </div>

        <div className="relative overflow-hidden">
          {/* Previous Button */}
          <button
            onClick={slideLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-md hover:bg-gray-600 z-10"
          >
            <FaChevronLeft size={20} />
          </button>

          {/* Guide List */}
          <div
            className="flex space-x-4 overflow-x-auto no-scrollbar px-4"
            ref={listRef}
            style={{
              scrollSnapType: "x mandatory",
              display: "flex",
            }}
          >
            {profiles.map((profile, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white shadow-md rounded-lg p-4 w-72"
                style={{ scrollSnapAlign: "center" }}
              >
                <div className="rounded-t-lg h-32 overflow-hidden">
                  <img
                    className="object-cover object-top w-full h-full"
                    src={profile.coverImage
                      ? `http://localhost:3000/${profile.coverImage}`
                      : defaultBackgroundImage}
                    alt="Background"
                  />
                </div>
                <div className="mx-auto w-20 h-20 relative -mt-12 border-4 border-white rounded-full overflow-hidden">
                  <img
                    className="object-cover object-center w-full h-full"
                    src={profile.profileImage
                      ? `http://localhost:3000/${profile.profileImage}`
                      : defaultBackgroundImage}
                    alt="Profile"
                  />
                </div>
                <div className="text-center mt-2">
                  <h2 className="font-semibold text-xl">{profile.name}</h2>
                  <p className="text-gray-500 text-sm">{profile.quote}</p>
                </div>
                <Link
                  to={`/profile/${profile.email}`}
                  className="p-2 border-t mx-4 mt-2"
                >
                  <button className="w-full block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-4 py-2 text-sm">
                    View
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={slideRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-md hover:bg-gray-600 z-10"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Topuser;
