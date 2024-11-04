import { useState } from "react"
import { Header } from "./components/Header"
import { Nav } from "./components/Nav"
import { PokeCard } from "./components/pokeCard"
import DarkModeToggle from "./components/DarkModeToggle"


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0)
  const [showNav, setShowNav] = useState(false)
  function toggleShowNav() {
    setShowNav(!showNav)
  }
  function unDisplayNav() {
    if (window.innerWidth <= 640)
      setShowNav(false)
  }

  return (
    <main className="min-h-full bg-gray-100 dark:bg-slate-800 w-full">
      <Header toggleShowNav={toggleShowNav} />
      <DarkModeToggle />
      <div className="flex flex-col sm:flex-row">
        {showNav && <Nav
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
          unDisplayNav={unDisplayNav} />}
        <PokeCard selectedPokemon={selectedPokemon} />
      </div>
    </main>
  )
}

export default App
