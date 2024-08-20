import logo from '../assets/Club_Logo.png'
export default function NotFound() {
    return <>
        <div className=' flex flex-col justify-center items-center gap-4 font-quickSand'>
            <img src={logo} className="mx-auto h-32 w-auto hover:cursor-pointer hover:scale-110 hover:duration-300"></img>
            <h1 className=' text-3xl'>Page Not Found</h1>
        </div>
    </>
}