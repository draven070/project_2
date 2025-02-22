import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaTwitch,
} from "react-icons/fa";

const sections = [
  // {
  //   title: "Solutions",
  //   items: ["Marketing", "Analytics", "Commerce", "Data", "Cloud"],
  // },
  // {
  //   title: "Support",
  //   items: ["Pricing", "Documentation", "Guides", "API Status"],
  // },
  // {
  //   title: "Company",
  //   items: ["About", "Blog", "Jobs", "Press", "Partners"],
  // },
  // {
  //   title: "Legal",
  //   items: ["Claims", "Privacy", "Terms", "Policies", "Conditions"],
  // },
];

const socialMedia = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "Twitch", icon: FaTwitch, link: "https://www.twitch.tv/" },
  { name: "Github", icon: FaGithub, link: "https://github.com/" },
];

const Footer = () => {
  return (
    <div className="w-full bg-slate-800 text-gray-300 py-8 px-4">
      {/* Main Grid Section */}
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8">
        {sections.map((section, index) => (
          <div key={index}>
            <h6 className="font-bold uppercase pt-2">{section.title}</h6>
            <ul>
              {section.items.map((item, i) => (
                <li key={i} className="py-1 text-gray-400 hover:text-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact Us Section */}
        <div className="col-span-2 pt-8 md:pt-2">
          <h6 className="font-bold uppercase">Contact Us</h6>
          <p className="py-2 text-gray-400">
            For inquiries, please email us at:
          </p>
          <p className="py-1 text-gray-300 hover:text-white">
            <a
              href="mailto:yatrasathi@gmail.com?subject=Inquiry%20about%20YatraSathi&body=Hello%2C%0A%0AI%20would%20like%20to%20inquire%20about%20YatraSathi.%20Please%20provide%20more%20details."
              className="text-gray-300 hover:text-white"
            >
              yatrasathi@gmail.com
            </a>
          </p>
          <p className="py-2 text-gray-400">We’d love to hear from you!</p>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-400">
        <p className="py-4">© 2025 Yatra Sathi. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          {socialMedia.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <item.icon size={24} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;