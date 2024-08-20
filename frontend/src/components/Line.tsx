export default function HorizontalLine() {
    return (
        <>
            <div className="relative flex items-center justify-center w-full">
                <hr className="w-32 sm:w-48 md:w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                    <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                    </svg>
                </div>
            </div>
            <div className="flex items-center justify-center px-4">
                <p className="text-black dark:text-gray-400 text-center text-sm sm:text-base md:text-lg lg:text-xl max-w-screen-md">
                    Welcome to Tecom, the STEM club at Al Akhawayn University! Our mission is to provide STEM enthusiasts with an environment to flourish and connect while raising awareness among the youth. At Tecom, we believe in the power of STEM to shape the future. Our club is committed to raising awareness and sparking interest in STEM fields among the youth. Through a variety of activities, including workshops, seminars, competitions, and social events, we aim to inspire and empower the next generation of thinkers, creators, and problem-solvers. Join us to explore, innovate, and be part of a dynamic community dedicated to shaping the future.
                </p>
            </div>
            <div className="relative flex items-center justify-center w-full">
                <hr className="w-32 sm:w-48 md:w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                    <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                    </svg>
                </div>
            </div>
        </>
    );
}
