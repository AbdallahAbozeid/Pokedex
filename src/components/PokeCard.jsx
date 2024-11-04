import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { getFullPokedexNumber } from '../utils'
import { TypeCard } from "./TypeCard"
import Modal from "./Modal"


export const PokeCard = (props) => {
    const { selectedPokemon } = props
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const { name, stats, types, moves, sprites } = data || {}
    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) { return false }
        if (['versions', 'other'].includes(val)) { return false }
        return true
    })
    const [moveData, setMoveData] = useState(null)
    const [moveLoading, setMoveLoading] = useState(false)
    function handleCloseModal() {
        setMoveData(null)
    }
    async function handleMoveReq(move, URL) {
        if (moveLoading || !localStorage || !URL) { return }
        let c = {}
        if (localStorage.getItem(`pokedex-move`)) {
            c = JSON.parse(localStorage.getItem(`pokedex-move`))
        }
        if (move in c) {
            console.log('fetched from local storage')
            setMoveData(c[move])
            return
        }
        setMoveLoading(true)
        try {
            let res = await fetch(URL)
            c[move] = await res.json()
            console.log('fetched from api')
            setMoveData(c[move])
            localStorage.setItem('pokedex-move', JSON.stringify(c))
        }
        catch (err) {
            console.log(err.message)
        }
        finally {
            setMoveLoading(false)
        }
    }
    useEffect(() => {
        //if loading .. exit logic
        if (loading || !localStorage) { return }
        //check if slected pokemon is exist in the cache
        let cache = {}
        if (localStorage.getItem(`pokedex`)) {
            cache = JSON.parse(localStorage.getItem(`pokedex`))
        }
        if (selectedPokemon in cache) {
            console.log('fetched from local storage')
            setData(cache[selectedPokemon])
            return
        }
        async function fetchPokemonData() {
            setLoading(true)
            try {
                const baseURL = `https://pokeapi.co/api/v2/`
                const suffix = `pokemon/${selectedPokemon + 1}`
                const fullURL = baseURL + suffix
                const res = await fetch(fullURL)
                const resData = await res.json()
                cache[selectedPokemon] = resData
                setData(cache[selectedPokemon])
                localStorage.setItem(`pokedex`, JSON.stringify(cache))
                console.log('fetched from api')
            }
            catch (err) {
                console.log(err.message)
            }
            finally {
                setLoading(false)
            }
        }
        fetchPokemonData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPokemon])
    if (loading) {
        return <div className="mx-auto mt-10">
            <h4 className="text-4xl text-gray-400">Loading...</h4>
        </div>
    }
    return (
        <div className="flex-1">
            {moveData && <Modal handleCloseModal={handleCloseModal}>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 dark:text-gray-400">name</p>
                <h4 className="capitalize ms-2 mb-6 text-base md:text-xl text-emerald-500 dark:text-emerald-300">{moveData?.name.replaceAll("-", " ")}</h4>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 dark:text-gray-400">decription</p>
                <p className="ms-2 mb-6 text-base md:text-xl text-emerald-500 dark:text-emerald-300">{moveData?.flavor_text_entries.filter((flav) => { if (flav.language.name == "en") { return true } })[0].flavor_text}</p>
            </Modal>}
            <div className="p-4">
                <h4 className="text-2xl text-gray-300 dark:text-gray-600 font-semibold ">{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2 className="text-5xl text-emerald-600 dark:text-emerald-300 font-semibold capitalize">{name}</h2>
            </div>
            <div className="flex justify-start items-center gap-3 ms-4">
                {types?.map((typeObj, index) => {
                    return <TypeCard key={index} type={typeObj?.type?.name} />
                })}
            </div>
            <div className="size-80 mx-auto">
                <img className="default-img" src={`/pokemon/` + getFullPokedexNumber(selectedPokemon) + '.png'} alt={name + '_large_img'} />
            </div>
            <div className="img-container flex flex-wrap justify-center items-center gap-3">
                {imgList.map((val, index) => {
                    return <img className="size-16 sm:size-20 md:size-28" key={index} src={sprites[val]} alt={`${name}-img-${val}`} />
                })}
            </div>
            <h4 className="p-2 text-xl sm:text-2xl md:text-4xl text-gray-600 dark:text-gray-300 font-semibold uppercase">Stats</h4>
            <div className="p-2 mx-4 mb-6 grid grid-cols-2 gap-x-2 sm:gap-x-4 md:gap-x-8">
                {
                    stats?.map((statsObj, i) => {
                        return <div className="flex gap-8 justify-center items-center  mb-2  px-2" key={i}>
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 font-semibold w-1/2">{statsObj.stat?.name.replaceAll("-", " ")}</p>
                            <h4 className="text-sm sm:text-base md:text-lg text-emerald-600 dark:text-emerald-300 font-semibold w-1/2 flex-1" >{statsObj.base_stat}</h4>
                        </div>
                    })}
            </div>
            <h4 className="p-2 text-xl sm:text-2xl md:text-4xl text-gray-600 dark:text-gray-300 font-semibold uppercase">Moves</h4>
            <div className="inline-flex justify-between flex-wrap gap-1 sm:gap-2 p-4 ">
                {
                    moves?.map((moveObj, i) => {
                        return <button key={i} onClick={() => { handleMoveReq(moveObj?.move?.name, moveObj?.move?.url) }} className="text-sm sm:text-base md:text-lg block px-2 py-1 bg-slate-300 hover:bg-slate-400 text-slate-700 duration-300 rounded-md dark:bg-slate-600 dark:hover:bg-slate-400 dark:text-emerald-600 flex-auto">
                            <p>{moveObj?.move?.name.replaceAll("-", " ")}</p>
                        </button>
                    })
                }
            </div>
        </div>
    )
}
PokeCard.propTypes = {
    selectedPokemon: PropTypes.number.isRequired
}
