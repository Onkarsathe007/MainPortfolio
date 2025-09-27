import './App.css'
import { NavBarDemo } from './components/NavBarDemo'
import  { StackedCircularFooter } from "./components/ui/stacked-circular-footer.jsx";
import Hero from "./components/ui/hero.jsx"
import About from "./components/ui/About.jsx"


function App() {
  return (
    <div className="min-h-screen">
      <NavBarDemo />
      <Hero />
      <About />
      <StackedCircularFooter/>
    </div>
  )
}

export default App
