import Navigation from "./components/Navigation";
import SlideDeck from "./components/SlideDeck";
import Hero from "./components/Hero";
import Scenario from "./components/Scenario";
import Architecture from "./components/Architecture";
import Simulation from "./components/Simulation";
import Results from "./components/Results";
import Limitations from "./components/Limitations";
import Team from "./components/Team";
import Footer from "./components/Footer";
import { SlideDeckProvider } from "./context/SlideDeckContext";

const SLIDES = [
  { id: "hero", label: "Título", component: Hero },
  { id: "scenario", label: "Cenário", component: Scenario },
  { id: "architecture", label: "Arquitectura", component: Architecture },
  { id: "simulation", label: "Demo", component: Simulation },
  { id: "results", label: "Resultados", component: Results },
  { id: "limitations", label: "Roadmap", component: Limitations },
  { id: "team", label: "Equipa", component: Team },
  { id: "footer", label: "Fim", component: Footer },
];

export default function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-white text-paper-100">
      <SlideDeckProvider slides={SLIDES}>
        <Navigation />
        <SlideDeck slides={SLIDES} />
      </SlideDeckProvider>
    </div>
  );
}
