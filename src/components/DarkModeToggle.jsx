import { useEffect, useRef, useState } from 'react'

export default function DarkModeToggle() {
    const rootElement = document.getElementById('root')
    const portalElement = document.getElementById('portal')
    const [darkMode, setDarkMode] = useState(false)
    const loaded = useRef(false)
    useEffect(() => {
        if (!loaded.current) {
            let localDark = null
            if (localStorage.getItem("theme")) {
                localDark = localStorage.getItem('theme') === 'dark'
            }
            setDarkMode(localDark ? true : false)
        }
        loaded.current = true
    }, [])
    useEffect(() => {
        if (loaded.current) {
            if (darkMode) {
                rootElement.classList.add('dark')
                portalElement.classList.add('dark')
            }
            else {
                rootElement.classList.remove('dark')
                portalElement.classList.remove('dark')
            }
            localStorage.setItem("theme", darkMode ? "dark" : "light")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [darkMode])
    return (
        <div className="p-2 w-16 h-8 rounded-full bg-gray-300 dark:bg-slate-800 fixed right-4 top-5 transition-all duration-300 cursor-pointer" onClick={() => { setDarkMode(!darkMode) }}>
            <div className="size-5 bg-yellow-600 rounded-full absolute top-1/2 left-2 -translate-y-1/2 dark:translate-x-9 dark:left-0 dark:bg-slate-700 transition-all duration-300"></div>
        </div>
    )
}
