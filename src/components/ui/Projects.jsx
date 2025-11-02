// components/Projects.jsx
import { Github, ExternalLink, BookOpen } from "lucide-react";


// components/Projects.jsx

const projects = [
  {
    title: "Fastshop",
    description: "E-commerce website",
    image: "https://res.cloudinary.com/dn6xis9je/image/upload/v1762107504/Blue_and_White_Illustrative_Project_Meeting_Instagram_Post_odt9d0.png",
    link: "https://github.com/Onkarsathe007/FastShop",
    liveLink: "#",
  },
  {
    title: "CiberBot",
    description: "Military based messaging system",
    image: "https://res.cloudinary.com/dn6xis9je/image/upload/v1762107505/Blue_and_White_Illustrative_Project_Meeting_Instagram_Post_1_mus5if.png",
    link: "https://github.com/Onkarsathe007",
    liveLink: "#",
  },
  {
    title: "Arch Linux Dotfiles",
    description: "Linux system config files",
    image: "https://res.cloudinary.com/dn6xis9je/image/upload/v1762107506/Blue_and_White_Illustrative_Project_Meeting_Instagram_Post_2_gylfbu.png",
    link: "https://github.com/Onkarsathe007",
    liveLink: "#",
  },
  {
    title: "HomeLab",
    description: "Personal Self-Hosted Server Ecosystem",
    image: "https://res.cloudinary.com/dn6xis9je/image/upload/v1762108194/Blue_and_White_Illustrative_Project_Meeting_Instagram_Post_3_eflflr.png",
    link: "/blog/68ea324cf08e7a3c9b7b0655",
    liveLink: "#",
  },
];

export default function Projects() {
  return (
    <section className="py-20 bg-white">
      <div className="text-center mb-12">
        <h3 className="text-sm uppercase tracking-wide text-gray-500">
          Browse My Recent
        </h3>
        <h2 className="text-4xl font-bold">Projects</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto px-4">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="rounded-3xl border-2 border-gray-200 p-6 flex flex-col items-center"
          >
            <div className="w-full aspect-square rounded-xl overflow-hidden mb-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center text-gray-900">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4 flex-grow">
              {project.description}
            </p>
            <div className="flex gap-3">
              {project.title === "HomeLab" ? (
                <a
                  href={project.link}
                  className="px-5 py-2.5 rounded-full border border-gray-300 text-sm flex items-center gap-2 font-medium"
                >
                  <BookOpen className="w-4 h-4" />
                  Read Blog
                </a>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-gray-300 text-sm flex items-center gap-2 font-medium"
                >
                  <Github className="w-4 h-4" />
                  Github
                </a>
              )}
              {project.liveLink && project.liveLink !== "#" && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-gray-300 text-sm flex items-center gap-2 font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


