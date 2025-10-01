// components/Projects.jsx
import { Github } from "lucide-react";


// components/Projects.jsx

const projects = [
  {
    title: "WorkPlace WingMan",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    link: "https://github.com/microsoft/vscode",
  },
  {
    title: "DS Library for C",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    link: "https://github.com/facebook/react",
  },
  {
    title: "OS Simulation",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=300&fit=crop",
    link: "https://github.com/nodejs/node",
  },
];

export default function Projects() {
  return (
    <section className="py-16">
      <div className="text-center mb-10">
        <h3 className="text-sm uppercase tracking-wide text-gray-500">
          Browse My Recent
        </h3>
        <h2 className="text-4xl font-bold">Projects</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto px-4">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="rounded-3xl border-2 border-black-700 p-6 flex flex-col items-center transition"
          >
            <img
              src={project.image}
              alt={project.title}
              className="rounded-xl w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold mb-4 text-center">
              {project.title}
            </h3>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100 transition"
            >
              Github
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}


