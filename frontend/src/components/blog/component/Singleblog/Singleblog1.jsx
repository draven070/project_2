import React from "react";
import { Link } from "react-router-dom";

const Singleblog1 = () => {
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
              The Pines and the Mountains
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
              <span className="ml-1">Alisher Azimi</span>
            </div>
            <hr />
            <p className="text-base leading-8 my-5">
              Amidst towering mountains, the air is filled with the fresh scent
              of pines, their dark green needles swaying gently in the breeze.
              The peaks rise majestically against the sky, their snow-dusted
              tops glistening in the sunlight, while the dense forest below
              stretches endlessly, inviting exploration and solitude in equal
              measure.
            </p>
            <p className="text-base leading-8 my-5">
              The allure of mountains and pines lies in their ability to
              transport us to a different world. The serenity of a pine forest,
              with its soft rustling of leaves and the whisper of the wind,
              invites calm and reflection. As you step through the towering
              trees, the sound of crunching pine needles underfoot serves as a
              reminder of the quiet power of nature. Whether you're hiking a
              mountain trail or simply sitting in its shade, there's an
              undeniable sense of peace that comes from being surrounded by such
              ancient, untouched beauty.
            </p>
            <p className="text-base leading-8 my-5">
              Mountains, too, are more than just geographical features; they
              represent challenges to overcome, goals to reach, and heights to
              conquer. The climb may be difficult, but the view from the
              summit—overlooking miles of untouched forest and rugged terrain—is
              nothing short of breathtaking. Whether you're looking to
              disconnect, reflect, or test your own endurance, a mountain
              adventure with pines as your companions offers an experience that
              refreshes both body and soul
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

export default Singleblog1;
