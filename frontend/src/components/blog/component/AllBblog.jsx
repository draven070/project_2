import React from "react";
import { Link } from "react-router-dom";

const AllBblog = () => {
  return (
    <section class="bg-white py-6 sm:py-8 lg:py-12">
      <div class="mx-auto max-w-screen-xl px-4 md:px-8">
        <div class="mb-10 md:mb-16">
          <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Most Recent Posts
          </h2>

          <p class="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg"></p>
        </div>

        <div class="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
          <article class="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
            <Link
              to={"/Singleblog1"}
              class="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
            >
              <img
                src="https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                loading="lazy"
                alt=""
                class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
            </Link>

            <div class="flex flex-col gap-2">
              <span class="text-sm text-gray-400">February 14, 2025</span>

              <h2 class="text-xl font-bold text-gray-800">
                <Link
                  to={"/Singleblog1"}
                  class="transition duration-100 hover:text-rose-500 active:text-rose-600"
                >
                  The Pines and the Mountains
                </Link>
              </h2>

              <p class="text-gray-500">
                Amidst towering mountains, the air is filled with the fresh
                scent of pines, their dark green needles swaying gently in the
                breeze. The peaks rise majestically against the sky, their
                snow-dusted tops glistening in the sunlight, while the dense
                forest below stretches endlessly, inviting exploration and
                solitude in equal measure.
              </p>

              <div>
                <Link
                  to={"/singleblog1"}
                  class="font-semibold text-rose-500 transition duration-100 hover:text-rose-600 active:text-rose-700"
                >
                  Read more
                </Link>
              </div>
            </div>
          </article>

          <article class="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
            <Link
              to={"/Singleblog2"}
              class="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
            >
              <img
                src="https://images.unsplash.com/photo-1511376777868-611b54f68947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                loading="lazy"
                alt=""
                class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
            </Link>

            <div class="flex flex-col gap-2">
              <span class="text-sm text-gray-400">February 14, 2025</span>

              <h2 class="text-xl font-bold text-gray-800">
                <Link
                  to={"/Singleblog2"}
                  class="transition duration-100 hover:text-rose-500 active:text-rose-600"
                >
                  The Coding Mania
                </Link>
              </h2>

              <p class="text-gray-500">
                In the world of endless code, lines of logic twist and turn like
                towering mountains, each solution a peak to be conquered. The
                hum of keyboards fills the air, as developers dive deep into the
                flow, their minds sharp as they navigate through problem after
                problem. Within this digital landscape, every line written
                brings them closer to mastery, turning complex challenges into
                triumphs with every keystroke.
              </p>

              <div>
                <Link
                  to={"/Singleblog2"}
                  class="font-semibold text-rose-500 transition duration-100 hover:text-rose-600 active:text-rose-700"
                >
                  Read more
                </Link>
              </div>
            </div>
          </article>

          <article class="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
            <Link
              to={"/Singleblog3"}
              class="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
            >
              <img
                src="https://images.unsplash.com/photo-1496395031280-4201b0e022ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                loading="lazy"
                alt=""
                class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
            </Link>

            <div class="flex flex-col gap-2">
              <span class="text-sm text-gray-400">February 14, 2025</span>

              <h2 class="text-xl font-bold text-gray-800">
                <Link
                  to={"/Singleblog3"}
                  class="transition duration-100 hover:text-rose-500 active:text-rose-600"
                >
                  Architectural Warfare
                </Link>
              </h2>

              <p class="text-gray-500">
                In the battlefield of design, every structure stands as a
                testament to strategic mastery. Architects, like warriors, wield
                their tools to sculpt cities, crafting intricate plans that rise
                like towering fortresses. Each line drawn and every blueprint
                constructed is a calculated move in a battle for innovation,
                where aesthetics, function, and power clash and converge to
                create lasting legacies of architectural dominance.
              </p>

              <div>
                <Link
                  to={"/Singleblog3"}
                  class="font-semibold text-rose-500 transition duration-100 hover:text-rose-600 active:text-rose-700"
                >
                  Read more
                </Link>
              </div>
            </div>
          </article>

          <article class="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
            <Link
              to={"/Singleblog4"}
              class="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
            >
              <img
                src="https://images.unsplash.com/photo-1510081887155-56fe96846e71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80"
                loading="lazy"
                alt=""
                class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
            </Link>

            <div class="flex flex-col gap-2">
              <span class="text-sm text-gray-400">February 13, 2025</span>

              <h2 class="text-xl font-bold text-gray-800">
                <Link
                  to={"/Singleblog4"}
                  class="transition duration-100 hover:text-rose-500 active:text-rose-600"
                >
                  Blues in Architecture
                </Link>
              </h2>

              <p class="text-gray-500">
                In the realm of Blue Architecture, every structure flows like
                water, sleek and fluid, yet built to endure. Architects blend
                natural elements with modern design, creating spaces that
                reflect both harmony and innovation. The cool hues of blue
                dominate the scene, symbolizing calm, clarity, and vision, as
                each design aims to balance beauty with function in a seamless
                dance of form and purpose
              </p>

              <div>
                <Link
                  to={"/Singleblog4"}
                  class="font-semibold text-rose-500 transition duration-100 hover:text-rose-600 active:text-rose-700"
                >
                  Read more
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default AllBblog;