import { FaDiscord, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import Goat from "../assets/images/goat.png";

const Footer = () => (
  <footer className="bg-black text-gray-400 border-t border-gray-700">
    {/* Top section */}
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Logo & tagline */}
      <div className="flex flex-col space-y-4 col-span-1 md:col-span-1">
        <img src={Goat} alt="Goatnet" className="h-8" width={200} />
        <p className="text-sm text-gray-400">
          Elevating the game through technology and storytelling.
        </p>
        {/* Social Icons */}
        <div className="flex space-x-4 mt-4">
          {/* <a
            href="https://discord.gg/yourserver"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors"
          >
            <FaDiscord size={20} />
          </a> */}
          <a
            href="https://www.youtube.com/@GoatnetOriginals"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors"
          >
            <FaYoutube size={20} />
          </a>
          <a
            href="https://www.tiktok.com/@itsgoatnet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors"
          >
            <FaTiktok size={20} />
          </a>
          <a
            href="https://www.instagram.com/itsgoatnet/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>

      {/* Explore Links */}
      <div className="col-span-1">
        <h4 className="text-white font-semibold mb-4">Explore</h4>
        <ul className="space-y-2">
          {["About", "Attractions", "Vision"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-purple-400 transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Credentials & Partners */}
      <div className="col-span-1">
        <h4 className="text-white font-semibold mb-4">Membership</h4>
        <ul className="space-y-2">
          {["Credentials", "Partners"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-purple-400 transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Legal Links */}
      <div className="col-span-1">
        <h4 className="text-white font-semibold mb-4">Legal</h4>
        <ul className="space-y-2">
          {["Contact", "Terms of Service", "Privacy Policy"].map((item) => (
            <li key={item}>
              <a
                href={
                  item === "Contact"
                    ? `#${item.toLowerCase()}`
                    : item === "Terms of Service"
                    ? "/terms"
                    : "/privacy"
                }
                className="text-white hover:text-purple-400 transition-colors text-sm"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Goatnet. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
