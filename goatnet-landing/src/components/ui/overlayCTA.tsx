import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import GoatCard from "../../assets/images/goatcard.png";

export default function OverlayCTA() {
  const [show, setShow] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const shouldShow = y < lastY.current || y < 100;
      setShow(shouldShow);
      lastY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute bottom-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md px-4 py-4 sm:px-8 sm:py-6"
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-y-4 lg:gap-y-0 gap-x-4 lg:gap-x-12 w-full">
        {/* Logo */}
        <img
          src={GoatCard}
          alt="GOATNET Logo"
          className="hidden lg:block w-16 h-16 sm:w-24 sm:h-24 object-contain mx-auto sm:mx-0"
        />

        {/* Text Block */}
        <div className="flex-1 text-center lg:text-left space-y-1">
          <h1 className="text-xl lg:text-2xl md:text-4xl font-bold text-neutral-200 uppercase">
            Welcome to Goatnet
          </h1>
          <p className="text-sm lg:text-base text-neutral-300 max-w-xs md:max-w-xl mx-auto lg:mx-0">
            Life is packed with great stories. We exist so they’re successfully
            shared.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const email = form.email.value;

            try {
              await fetch(
                "https://script.google.com/macros/s/AKfycbwJfGXgtTLeKIegi_WfV02uroAszJqf_hUN9_dwDkNB8u0aNeEW7xREtwemx6dN8n1-8Q/exec",
                {
                  method: "POST",
                  mode: "no-cors",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userType: "newsletter-only",
                    name: "",
                    email,
                    organization: "",
                    newsletter: true,
                  }),
                }
              );

              form.reset();

              alert("You're subscribed!");
            } catch (error) {
              console.error("Error submitting email:", error);
              alert("Something went wrong. Try again?");
            }
          }}
          className="flex items-center bg-[#131314] border border-neutral-500 rounded-full overflow-hidden px-3 py-2 w-full max-w-lg shadow-md space-x-2 sm:space-x-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-400 flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.877 1.778l-7.5 5.625a2.25 2.25 0 01-2.646 0l-7.5-5.625A2.25 2.25 0 012.25 6.993V6.75"
            />
          </svg>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="flex-1 min-w-0 bg-transparent text-white placeholder-gray-400 focus:outline-none px-2"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-full text-white font-bold italic uppercase text-sm leading-none bg-gradient-to-r from-blue-500 to-purple-600 transition-transform hover:scale-105"
          >
            Subscribe
          </button>
        </form>
      </div>
    </motion.div>
  );
}
