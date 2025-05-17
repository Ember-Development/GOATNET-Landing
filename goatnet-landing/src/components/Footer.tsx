// src/components/Footer.tsx
import { FaDiscord, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import Goat from "../assets/images/Goat.png";

const Footer = () => (
  <footer className="bg-black text-gray-400 border-t border-gray-700">
    {/* Top section */}
    <div className="max-w-7xl mx-auto px-2 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Logo & tagline */}
      <div className="flex flex-col space-y-4">
        <img src={Goat} alt="Goatnet" className="h-8" />
        <p className="text-sm text-gray-400">
          Elevating the game through technology and storytelling.
        </p>
      </div>

      {/* Quick links */}
      <div>
        <h4 className="text-white font-semibold mb-4">Explore</h4>
        <ul className="space-y-2">
          {["About", "Showcase", "Solutions", "Community", "Contact"].map(
            (item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  {item}
                </a>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Social */}
      <div>
        <h4 className="text-white font-semibold mb-4">Follow Goatnet</h4>
        <div className="flex space-x-4">
          <a
            href="https://discord.gg/yourserver"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors"
          >
            <FaDiscord size={20} />
          </a>
          <a
            href="https://youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors"
          >
            <FaYoutube size={20} />
          </a>
          <a
            href="https://tiktok.com/@yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors"
          >
            <FaTiktok size={20} />
          </a>
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-400 transition-colors"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Goatnet. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="/privacy"
            className="text-white hover:text-purple-400 transition-colors text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-white hover:text-purple-400 transition-colors text-sm"
          >
            Terms of Service
          </a>
          <a
            href="/contact"
            className="text-white hover:text-purple-400 transition-colors text-sm"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
