import { motion } from "framer-motion";

const certifications = [
  {
    title: "Introduction to IT and AWS",
    organization: "Amazon Web Services",
    image: "https://res.cloudinary.com/dn6xis9je/image/upload/v1771707306/aws_cloud_UA0K7X6W81OL_page-0001_fcim7j.jpg",
  },
  {
    title: "MCP Fundamental's by Anthropic",
    organization: "Anthropic",
    image: "https://res.cloudinary.com/dn6xis9je/image/upload/v1771910702/certificate-ss5ctdrhp23k-1771910491_page-0001_q02rvx.jpg",
  },


  {
    title: "Infenion Bug Hunter",
    organization: "Infenion",
    image: "https://res.cloudinary.com/dn6xis9je/image/upload/v1771708553/Bug_Hunter_Sathe_Onkar_Abasaheb_page-0001_ddpvl3.jpg",
  },

  {
    title: "Github Foundatons",
    organization: "Github",
    image: "https://res.cloudinary.com/dn6xis9je/image/upload/v1771707195/github_foundations_ogx0y8.png",
  },
  {
    title: "Meta Backend Developer",
    organization: "Meta Inc.",
    image: "https://res.cloudinary.com/dn6xis9je/image/upload/v1771707531/meta_backed_page-0001_j6q8r0.jpg",
  },
];

export default function Certifications() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-sm uppercase tracking-wide text-gray-500">
              Browse My Recent
            </h3>
            <h2 className="text-4xl font-bold">Certifications</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Continuous learning and validated expertise in modern technologies
            </p>

          </div>



        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <div className="relative">

            <div className="lg:hidden overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
              <div className="flex gap-4 md:gap-6 px-4 min-w-max">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="relative w-[240px] h-[150px] sm:w-[320px] sm:h-[200px] md:w-[400px] md:h-[250px] flex-shrink-0 snap-center"
                  >
                    <div className="relative w-full h-full overflow-hidden shadow-lg">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                        <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2">
                          {cert.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-200">
                          {cert.organization}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-3 gap-6 px-4">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="relative w-full h-[250px]"
                >
                  <div className="relative w-full h-full overflow-hidden shadow-lg">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {cert.organization}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex lg:hidden items-center justify-center gap-2 mt-6 text-xs text-gray-400 animate-pulse">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span>Swipe to view more</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
