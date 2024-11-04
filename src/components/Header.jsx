import PropTypes from 'prop-types'
export const Header = (props) => {
    const { toggleShowNav } = props
    return (
        <header className="flex justify-start items-center p-2 gap-4 bg-gray-200 dark:bg-slate-900 sticky top-0">
            <button className="ms-2" onClick={toggleShowNav}>
                <i className="text-2xl text-gray-500 hover:text-gray-300 dark:hover:text-gray-700 fa-solid fa-bars"></i>
            </button>
            <h1 className='text-4xl p-2 font-bold bg-gradient-to-r w-fit from-emerald-500 to-slate-800 bg-clip-text text-transparent'>Pokédex</h1>
        </header>
    )
}
Header.propTypes = {
    toggleShowNav: PropTypes.func.isreguried
}