import React from "react";
import { Link } from "react-router-dom";

const Singleblog2 = () => {
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
              The Coding Mania
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
              <span className="ml-1">Anup Adhikari</span>
            </div>
            <hr />
            <p className="text-base leading-8 my-5">
              In the world of endless code, lines of logic twist and turn like
              towering mountains, each solution a peak to be conquered. The hum
              of keyboards fills the air, as developers dive deep into the flow,
              their minds sharp as they navigate through problem after problem.
              Within this digital landscape, every line written brings them
              closer to mastery, turning complex challenges into triumphs with
              every keystroke. measure.
            </p>
            <p className="text-base leading-8 my-5">
              As the sun sets and the day winds down, the coding world continues
              to hum in the background, with developers racing against the clock
              to meet deadlines and achieve goals. They write, debug, and test,
              their perseverance unwavering in the face of challenges. With
              every bug fixed, with every function improved, there’s a sense of
              satisfaction, knowing they’re creating something of
              value—something that will impact users around the world.
            </p>
            <p className="text-base leading-8 my-5">
              The excitement of coding is not just in the immediate challenge,
              but in the long-term journey it promises. As technology advances,
              new languages and frameworks emerge, giving developers endless
              possibilities to explore. For those passionate about the craft,
              coding is more than just a job—it’s a lifestyle, a way of
              thinking, and a way to continually push the boundaries of what’s
              possible in the digital world.
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

export default Singleblog2;
