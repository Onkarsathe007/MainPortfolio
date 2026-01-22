"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiWakatime } from "react-icons/si";
import { Button } from "./moving-border";

// This is a placeholder for the `cn` utility function.
// In a real project, you would import it from a utility file.
// For this fix, we'll define a simple version that concatenates class names.
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// Component Code for AuroraBackground
export const AuroraBackground = ({
  className,
  children,

  ...props
}) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg pt-32 z-10",
          className
        )}
        {...props}
      >

        {children}
      </div>
    </main>
  );
};

// Demo Component
export default function AuroraBackgroundDemo() {
  return (
    <div className="flex text-center items-center justify-center mt-20">
      {/* <AuroraBackground> */}
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-6 items-center justify-center px-4 max-w-4xl mx-auto z-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400 tracking-wide"
        >
          {/* Hi, I'm */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gray-200 shadow-xl">
            <img
              src="https://res.cloudinary.com/dn6xis9je/image/upload/v1759349976/mehd_uitwj7.jpg"
              alt="Onkar Sathe"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <div className="text-4xl md:text-7xl font-bold dark:text-white text-black text-center leading-tight">
          Onkar Sathe
        </div>

        <div className="text-lg md:text-2xl font-normal text-gray-600 dark:text-gray-400 text-center max-w-2xl leading-relaxed">
          Full Stack Developer crafting digital experiences
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <a
            href="https://drive.google.com/uc?export=download&id=1OeVec6Yjn4J4tBudMyC5WW23PmYqCuP4"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-black dark:hover:bg-white rounded-full px-8 py-3 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Download Resume
          </a>

          <Button
            onClick={() => (window.location.href = "/blogs")}
            borderRadius="1.75rem"
            containerClassName="w-48 h-12"
            className="bg-transparent text-black dark:text-white font-semibold"
            borderClassName="h-2 w-12 bg-purple-500"
            duration={3000}
          >
            Read My Blog
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex gap-6 mt-6 text-2xl text-black dark:text-white"
        >
          <a
            href="https://github.com/onkarsathe007"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/onkarsathe007"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://wakatime.com/onkar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            <SiWakatime />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 text-sm md:text-base text-gray-500 dark:text-gray-400 text-center"
        >
        </motion.div>
      </motion.div>
      {/* </AuroraBackground> */}
    </div>
  );
}
