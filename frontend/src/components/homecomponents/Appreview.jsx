import React from "react";

const Appreview = () => {
  const stats = [
    { id: 1, name: "Transactions every 24 hours", value: "44 million" },
    { id: 2, name: "Assets under holding", value: "$119 trillion" },
    { id: 3, name: "New users annually", value: "46,000" },
  ];
  return (
    <section
      id="comparison"
      aria-label="QuickEdit vs traditional editor"
      className="bg-slate-50 py-20 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl md:text-center">
          <h2
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl mb-9"
            style={{
              fontFamily: "'Playfair Display', serif", // Use Playfair Display for the heading
              fontWeight: "700", // Bold weight to make it stand out
              color: "#2C3E50", // A dark color for strong contrast
              textAlign: "center", // Center-align the heading for balance
              letterSpacing: "0.05em", // Slightly adjusted letter spacing for elegance
              lineHeight: "1.4", // Adjust line height for better readability
            }}
          >
            Empowering Communities, Enriching Journeys
          </h2>

          <p
            className="mt-4 text-lg tracking-tight text-slate-700"
            style={{
              fontFamily: "'Roboto Slab', serif", // Use a more attractive font for quotes
              fontStyle: "italic", // Make the quote italic for more emphasis
              fontWeight: "600", // Make it bold to make it stand out more
              color: "#4A4A4A", // A slightly darker color for a soft contrast
              textAlign: "center", // Center the text for better alignment
              lineHeight: "1.6", // Adjust line height for better readability
              maxWidth: "80%", // Limit width to improve readability on larger screens
              margin: "0 auto", // Center the text block
            }}
          >
            "Transforming lives through sustainable tourism. Empowering locals,
            boosting economies, and enriching your travel experience."
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3 px-4"
        >
          <li>
            <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
              <li>
                <figure className="relative rounded-2xl bg-white p-6 text-center shadow-xl shadow-slate-900/10 transition-transform transform">
                  <blockquote className="relative p-3">
                    <p className="text-3xl font-bold tracking-tight text-slate-900">
                      98% Faster
                    </p>
                  </blockquote>
                  <figcaption className="text-center">
                    <div className="font-display text-slate-900 mt-2">
                      Find Your Perfect Guide in Minutes
                    </div>
                  </figcaption>
                </figure>
              </li>
            </ul>
          </li>
          <li>
            <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
              <li>
                <figure className="relative rounded-2xl bg-white p-6 text-center shadow-xl shadow-slate-900/10 transition-transform transform">
                  <blockquote className="relative p-3">
                    <p className="text-3xl font-bold tracking-tight text-slate-900">
                      Authentic Experience
                    </p>
                  </blockquote>
                  <figcaption className="text-center">
                    <div className="font-display text-slate-900 mt-2">
                      Immerse yourself in local culture.
                    </div>
                  </figcaption>
                </figure>
              </li>
            </ul>
          </li>
          <li>
            <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
              <li>
                <figure className="relative rounded-2xl bg-white p-6 text-center shadow-xl shadow-slate-900/10 transition-transform transform">
                  <blockquote className="relative p-3">
                    <p className="text-3xl font-bold tracking-tight text-slate-900">
                      Sustainable Tourism
                    </p>
                  </blockquote>
                  <figcaption className="text-center">
                    <div className="font-display text-slate-900 mt-2">
                      Support Local Community
                    </div>
                  </figcaption>
                </figure>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default Appreview;