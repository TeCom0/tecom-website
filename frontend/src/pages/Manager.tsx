import { FaUserAlt, FaUsers } from 'react-icons/fa';
import { MdEventAvailable } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Logout } from '../../State/authSlice';

export default function Manager() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Navigation = [
        {
            text: 'Profile',
            url: '/manager/profile',
            icon: <FaUserAlt />
        },
        {
            text: 'Events',
            url: '/manager/events',
            icon: <MdEventAvailable />
        },
        {
            text: 'Members',
            url: '/manager/members',
            icon: <FaUsers />
        }
    ];

    return (
        <div className='flex'>
            <div className='bg-black h-screen w-72 p-4 flex flex-col justify-between'>
                <div className='flex flex-col font-quickSand gap-3'>
                    {Navigation.map((nav) => (
                        <NavLink
                            key={nav.text}
                            to={nav.url}
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-clearBlue text-black p-5 w-full rounded-xl flex items-center gap-3'
                                    : 'text-white font-quickSand hover:bg-white hover:text-black hover:duration-300 w-full p-5 rounded-xl flex items-center gap-3'
                            }
                        >
                            {nav.icon}
                            {nav.text}
                        </NavLink>
                    ))}
                </div>
                <div>
                    <button
                        className='w-full p-2 text-white font-quickSand hover:bg-white hover:text-black hover:duration-300'
                        onClick={() => navigate('/')}
                    >
                        Home
                    </button>
                    <button
                        className='w-full p-2 text-white font-quickSand hover:bg-white hover:text-black hover:duration-300'
                        onClick={() => dispatch(Logout())}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className='flex-grow p-4'>
                <Outlet />
            </div>
        </div>
    );
}
