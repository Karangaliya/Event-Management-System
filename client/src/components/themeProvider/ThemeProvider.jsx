import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'


function ThemeProvider({ children }) {

    const theme = useSelector((state) => state.theme.mode);

    useEffect(() => {
        document.querySelector("html").classList.remove("dark", "light")
        document.querySelector("html").classList.add(theme)
    }, [theme])


    return (
        <div>
            <div className=' dark:bg-gray-900 dark:text-white bg-slate-100 text-black min-h-screen'>
                {children}
            </div>
        </div>
    )
}

export default ThemeProvider