import { FaHome } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../State/authSlice'
import { useState, useEffect, useRef } from 'react'

export default function Header() {
    const Navigate = useNavigate()
    const user = useSelector(getCurrentUser)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isPhoneScreen, setIsPhoneScreen] = useState(window.innerWidth <= 620)
    const mobileMenuRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleResize = () => {
            setIsPhoneScreen(window.innerWidth <= 620)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

    const handleMenuItemClick = (path: string) => {
        Navigate(path)
        setIsMobileMenuOpen(false)
    }

    return (
        <>
            <header>
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 relative">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a className="flex items-center gap-2 hover:text-blue-400 hover:duration-300 hover:cursor-pointer" onClick={() => Navigate('/')}>
                            <FaHome />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Home</span>
                        </a>

                        <div className="flex items-center lg:order-2">
                            {!isPhoneScreen && <button className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" onClick={() => {
                                user ? Navigate('/manager') : Navigate('/login')
                            }}>{user ? 'Your Profile' : 'Login'}</button>}

                            {/* Mobile Menu Button */}
                            {isPhoneScreen && (
                                <button onClick={toggleMobileMenu} className="inline-flex items-center justify-center p-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg focus:outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Desktop Menu Items */}
                        <div className="hidden lg:flex lg:justify-between lg:items-center w-full lg:w-auto lg:order-1" id="mobile-menu-2">
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <button className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white hover:text-blue-400 hover:duration-300" aria-current="page">TechnoBreak</button>
                                </li>
                                <li>
                                    <button className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 hover:text-blue-400 hover:duration-300" onClick={() => Navigate('/TechTalk')}>TechTalks</button>
                                </li>
                                <li>
                                    <button className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 hover:text-blue-400 hover:duration-300" onClick={() => Navigate('/Workshop')}>Workshops</button>
                                </li>
                                <li>
                                    <button className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 hover:text-blue-400 hover:duration-300" onClick={() => Navigate('/TechnoBreak')}>TechnoBreaks</button>
                                </li>
                                <li>
                                    <button className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 hover:text-blue-400 hover:duration-300" onClick={() => Navigate('/UpComingEvent')}>Upcoming Events</button>
                                </li>
                                <li>
                                    <a href='mailto:technologycommunity@aui.ma' className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 hover:text-blue-400 hover:duration-300">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isPhoneScreen && isMobileMenuOpen && (
                        <div ref={mobileMenuRef} className="absolute top-full left-0 right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 z-10">
                            <ul className="flex flex-col py-1">
                                <li>
                                    <button className="block px-4 py-2 text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => handleMenuItemClick('/TechTalk')}>TechTalks</button>
                                </li>
                                <li>
                                    <button className="block px-4 py-2 text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => handleMenuItemClick('/Workshop')}>Workshops</button>
                                </li>
                                <li>
                                    <button className="block px-4 py-2 text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => handleMenuItemClick('/TechnoBreak')}>TechnoBreaks</button>
                                </li>
                                <li>
                                    <button className="block px-4 py-2 text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => handleMenuItemClick('/UpComingEvent')}>Upcoming Events</button>
                                </li>
                                <li>
                                    <a href='mailto:technologycommunity@aui.ma' className="block px-4 py-2 text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </nav>
            </header>
        </>
    )
}
