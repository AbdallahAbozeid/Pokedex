import { useState } from 'react'
import PropTypes from 'prop-types'
import { first151Pokemon, getFullPokedexNumber } from '../utils/index'
export const Nav = (props) => {
    const { selectedPokemon, setSelectedPokemon, unDisplayNav } = props
    const [search, setSearch] = useState('')
    const filteredpoke = first151Pokemon.filter((name, index) => {
        if (name.toLowerCase().includes(search.toLowerCase())) { return true }
        if (getFullPokedexNumber(index) == search) { return true }
        return false
    })
    return (
        <nav className='flex flex-col px-10  gap-2 bg-gray-200 dark:bg-slate-900 p-2 overflow-y-scroll sticky top-[72px] left-0'>
            <input placeholder='E.g. 001 or bulba...' value={search} onChange={(e) => { setSearch(e.target.value) }} className='outline-none bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 p-2 rounded-md mb-2 caret-emerald-700 animate-pulse focus:animate-none' />
            {
                filteredpoke.map((poke) => {
                    const realIndex = first151Pokemon.indexOf(poke)
                    return <button key={realIndex} onClick={() => {
                        setSelectedPokemon(realIndex)
                        unDisplayNav()
                    }} className={`flex gap-2 px-4 py-2 text-emerald-900 dark:text-emerald-600 font-semibold bg-slate-300 hover:bg-slate-400 dark:bg-slate-800 hover:dark:bg-gray-400 transition-all duration-500 rounded-lg ${(realIndex == selectedPokemon ? 'bg-slate-400 dark:bg-gray-400' : '')}`}>
                        <p>{getFullPokedexNumber(realIndex)}</p>
                        <p>{poke}</p>
                    </button>
                })
            }
        </nav>
    )
}

Nav.propTypes = {
    selectedPokemon: PropTypes.number.isRequired,
    setSelectedPokemon: PropTypes.func.isRequired,
    unDisplayNav: PropTypes.func.isRequired
}
