import React from "react";
import { Link } from "react-router-dom";

const Singleblog4 = () => {
  return (
    <div className="relative p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div className="">
            <a
              href="#"
              className="text-indigo-600 hover:text-gray-700 transition duration-500 ease-in-out text-sm"
            ></a>
            <h1 href="#" className="text-gray-900 font-bold text-4xl">
              Architectural Warfare
            </h1>
            <div className="py-5 text-sm font-regular text-gray-900 flex">
              <svg
                className="text-indigo-600"
                fill="currentColor"
                height="16px"
                aria-hidden="true"
                role="img"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                ></path>
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
              <span className="ml-1">Madhu Aryal</span>
            </div>
            <hr />
            <p className="text-base leading-8 my-5">
              In the realm of Blue Architecture, every structure flows like
              water, sleek and fluid, yet built to endure. Architects blend
              natural elements with modern design, creating spaces that reflect
              both harmony and innovation. The cool hues of blue dominate the
              scene, symbolizing calm, clarity, and vision, as each design aims
              to balance beauty with function in a seamless dance of form and
              purpose.
            </p>
            <p className="text-base leading-8 my-5">
              Blue architecture is more than just a color choice; it’s a
              philosophy. It’s about creating spaces that evoke a sense of
              tranquility, peace, and inspiration. Whether through the use of
              bold azure walls or subtle accents in furniture and decor, blue
              has the power to transform a room, evoking emotions of serenity
              and clarity. These spaces are designed not only to look beautiful
              but to help their inhabitants feel at ease and connected to the
              world around them.
            </p>
            <p className="text-base leading-8 my-5">
              As the world embraces sustainability, Blue Architecture is
              increasingly intertwined with eco-conscious design. The color blue
              represents water, sky, and the natural world—elements that
              architects are seeking to incorporate more consciously in their
              designs. From energy-efficient buildings to eco-friendly
              materials, blue architecture stands as a reminder that beauty and
              function can coexist with environmental responsibility, creating
              spaces that are as sustainable as they are inspiring.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-2 text-3xl">
        <Link to="/editblog" className="mx-2"></Link>
        <Link to="/deleteblog" className="mx-2"></Link>
      </div>
    </div>
  );
};

export default Singleblog4;
