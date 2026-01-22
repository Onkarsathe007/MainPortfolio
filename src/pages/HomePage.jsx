import { NavBarDemo } from '../components/NavBarDemo'
import  { StackedCircularFooter } from "../components/ui/stacked-circular-footer.jsx";
import Hero from "../components/ui/hero.jsx"
import About from "../components/ui/About.jsx"
import {TechnicalSkills} from "../components/ui/Technical-Skills.jsx";
import Projects from "../components/ui/Projects.jsx";
import TiltShowcase from "../components/ui/TiltShowcase.jsx";
import {Blog8 } from "../components/ui/Blog/BlogCards.jsx"
import GitHubCalendarSection from "../components/ui/GitHubCalendar.jsx"

function HomePage() {
  return (
    <div className="min-h-screen">
      <NavBarDemo />
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <TechnicalSkills/>
      </section>
      <section id="projects">
        <Projects/>
      </section>
      <section id="showcase">
        <TiltShowcase/>
      </section>
      <section id="github-calendar">
        <GitHubCalendarSection/>
      </section>

      <StackedCircularFooter/>
    </div>
  )
}

export default HomePage
