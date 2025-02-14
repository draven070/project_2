import React from "react";
import { Link } from "react-router-dom";

const Singleblog3 = () => {
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
              <span className="ml-1">Bhakti Shanki</span>
            </div>
            <hr />
            <p className="text-base leading-8 my-5">
              In the battlefield of design, every structure stands as a
              testament to strategic mastery. Architects, like warriors, wield
              their tools to sculpt cities, crafting intricate plans that rise
              like towering fortresses. Each line drawn and every blueprint
              constructed is a calculated move in a battle for innovation, where
              aesthetics, function, and power clash and converge to create
              lasting legacies of architectural dominance.
            </p>
            <p className="text-base leading-8 my-5">
              Every project begins with a vision—a spark of creativity that
              slowly takes shape through research, planning, and execution. But
              the real challenge lies in overcoming obstacles: budget
              constraints, regulatory hurdles, and the ever-present pressure to
              deliver on time. Yet, despite the challenges, architects stand
              resilient, always determined to bring their vision to life,
              knowing that their designs will be etched into the city’s skyline
              for generations to come
            </p>
            <p className="text-base leading-8 my-5">
              As the world continues to evolve, so too does the art of
              architecture. Modern architects are constantly pushing the limits
              of what’s possible, blending technology with creativity to build
              structures that not only serve their purpose but also inspire awe.
              From towering skyscrapers to sustainable homes, each building
              tells a unique story—a story that will live on, long after the
              architect has moved on to their next conquest.
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

export default Singleblog3;
