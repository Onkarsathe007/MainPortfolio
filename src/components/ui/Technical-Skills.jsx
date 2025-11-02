
import VerifiedIcon from '@mui/icons-material/Verified';

const skills = [
  { name: "C", level: "Experienced" },
  { name: "C++", level: "Experienced" },
  { name: "Java", level: "Experienced" },
  { name: "Python", level: "Intermediate" },
  { name: "SQL", level: "Experienced" },
  { name: "DBMS", level: "Intermediate" },
  { name: "OS", level: "Intermediate" },
  { name: "DSA", level: "Intermediate" },
  { name: "Android", level: "Intermediate" },
  { name: "CN", level: "Intermediate" },
];

export function TechnicalSkills() {
  return (
    <section className="flex justify-center items-center px-4 py-20 bg-white">

<div className="w-full max-w-6xl rounded-3xl border border-gray-300 bg-white p-8 md:p-12 shadow-sm">
        <h3 className="text-center text-2xl md:text-3xl font-bold text-gray-700 mb-10">
          Technical Skills
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl transition-all duration-300 hover:border-gray-900 hover:shadow-md group"
            >
              <div className="flex-shrink-0 bg-gray-100 rounded-full p-2">
                <VerifiedIcon className="text-black-600 w-6 h-6" />
              </div>

              <div>
                <div className="text-lg font-semibold text-gray-800">
                  {skill.name}
                </div>
                <div className="text-sm text-gray-500">{skill.level}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

