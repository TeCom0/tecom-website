import { FaSquareInstagram } from 'react-icons/fa6'
import { FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Logo from '../assets/Club_Logo.png'

export default function Footer() {
    return (
        <footer className="bg-black rounded-lg shadow m-4 dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4">
                <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                        <img src={Logo} alt="TeCom Logo" className="h-20" />
                    </div>
                    <span className="text-sm text-clearBlue sm:text-center dark:text-gray-400 mb-4 md:mb-0">
                        © 2024 <a className="hover:underline">TeCom</a>. All Rights Reserved.
                    </span>
                    <ul className="flex gap-5 flex-wrap items-center font-medium text-white dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="https://www.instagram.com/tecom_aui/?igsh=azhlbjk4OG5rbTdw" className="hover:underline me-4 md:me-6 text-3xl" target="_blank" rel="noopener noreferrer">
                                <FaSquareInstagram />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/company/technology-communityaui?originalSubdomain=ma" className="hover:underline me-4 md:me-6 text-3xl" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                        </li>
                        <li>
                            <a href="mailto:technologycommunity@aui.ma" className="hover:underline me-4 md:me-6 text-3xl">
                                <MdEmail />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
