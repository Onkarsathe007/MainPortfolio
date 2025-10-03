import { NavBarDemo } from '../components/NavBarDemo'
import  { StackedCircularFooter } from "../components/ui/stacked-circular-footer.jsx";
import Hero from "../components/ui/hero.jsx"
import About from "../components/ui/About.jsx"
import {TechnicalSkills} from "../components/ui/Technical-Skills.jsx";
import Projects from "../components/ui/Projects.jsx";
import {Blog8 } from "../components/ui/Blog/BlogCards.jsx"

function BlogPage() {
  return (
    <div className="min-h-screen">
      <NavBarDemo />
    <section id="blogs">
        <Blog8/>
      </section>
 
      <StackedCircularFooter/>
    </div>
  )
}

export default BlogPage
