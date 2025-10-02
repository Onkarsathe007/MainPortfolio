import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, ChevronDown } from 'lucide-react';

const AboutMe = ({
  profileImage = "https://res.cloudinary.com/dn6xis9je/image/upload/v1759402239/IMG-20250228-WA0003_2_lt5jep.jpg",
  name = "Ruturaj Amrutkar",
  experience = {
    years: "4+ years",
    details: ["Personal Projects", "Freelancing"]
  },
  education = {
    degree: "B-Tech in Computer Engineering",
    diploma: "Diploma in Computer Engineering"
  },
  aboutText = "Hello! I'm  Onkar Sathe, a passionate third-year Computer Engineering student in VIIT Pune with a keen interest in developing innovative software solutions. My journey in the tech world has been fueled by curiosity and a desire to create impactful projects. With a strong foundation in computer science principles and hands-on experience in various programming languages and frameworks, I am always eager to tackle new challenges and expand my skill set."
}) => {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "white",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 40px 40px",
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-16">
          {/* Profile Image - Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div 
              className="relative w-64 h-64 overflow-hidden"
              style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
              }}
            >
              <img
                src={profileImage}
                alt={`${name} profile`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target;
                  target.onerror = null;
                  target.src = `https://placehold.co/400x400/f3f4f6/6b7280?text=${name.split(' ').map(n => n[0]).join('')}`;
                }}
              />
            </div>
          </motion.div>

          {/* Experience Card - Center Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border border-black rounded-3xl p-8 text-center h-64 flex flex-col justify-center"
          >
            <Award className="w-8 h-8 mx-auto mb-4 text-black" />
            <h3 className="text-xl font-bold text-black mb-3">Experience</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {experience.years}
              <br />
              {experience.details.join(" | ")}
            </p>
          </motion.div>

          {/* Education Card - Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white border border-black rounded-3xl p-8 text-center h-64 flex flex-col justify-center"
          >
            <Users className="w-8 h-8 mx-auto mb-4 text-black" />
            <h3 className="text-xl font-bold text-black mb-3">Education</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {education.degree}
              <br />
              {education.diploma}
            </p>
          </motion.div>
        </div>

        {/* About Me Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <p className="text-gray-700 text-lg leading-relaxed text-left">
            {aboutText}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <ChevronDown className="w-6 h-6 text-gray-400" />
            <ChevronDown className="w-6 h-6 text-gray-400 -mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const AboutMeDemo = () => {
  return <AboutMe />;
};

export default AboutMeDemo;
