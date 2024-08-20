import Header from "../components/Header";
import videoBG from '../assets/TcomBG.mp4';
import HorizontalLine from "../components/Line";
import TypewriterComponent from "typewriter-effect";
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import { useGetEventsQuery } from '../../Api/EventsApi'
import { Events } from '../../utils/Types'
import Workshops from '../assets/workshop.jpg'
import Technobreak from '../assets/TechnoBreaks.jpg'
import Competition from '../assets/Conference.jpg'
import bgImg from '../assets/imgBack.png'
import Trips from '../assets/Gitex.jpg'
import Club from '../assets/Club.jpeg'
import Presentation from '../assets/Presentation.jpeg'
import Present from '../assets/Present.jpeg'
import Work from '../assets/Work.jpeg'
import Workshop from '../assets/Workshopss.jpeg'
import Photo from '../assets/Photo.jpeg'
import Recognition from '../assets/Recognition.jpeg'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
import { DNA } from "react-loader-spinner";
// import Join from "../components/Join";
interface Event {
    title: string,
    info: string,
    image?: string[]
}
export default function Home() {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [controls, isInView]);

    const [isPhoneScreen, setIsPhoneScreen] = useState(window.innerWidth <= 620)

    useEffect(() => {
        const handleResize = () => {
            setIsPhoneScreen(window.innerWidth <= 620)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    // const [dialog, setDialog] = useState(false)

    const { data, isLoading } = useGetEventsQuery('all')

    if (isLoading) return <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
        />
    </div>

    const carousels = [
        {
            type: 'Workshops',
            events: data?.filter((event: Events) => event.EventType === 'Workshop').slice(0, 3).map((event: Events) => ({
                info: event.description,
                title: event.Title,
                image: [Workshop, Workshops, Work]
            })),
        },
        {
            type: 'TechnoBreaks',
            events: data?.filter((event: Events) => event.EventType === 'TechnoBreak').slice(0, 3).map((event: Events) => ({
                info: event.description,
                title: event.Title,
                image: [Technobreak, Presentation, Club]
            })),
        },
        {
            type: 'Competitions',
            events: data?.filter((event: Events) => event.EventType === 'Competition').slice(0, 3).map((event: Events) => ({
                info: event.description,
                title: event.Title,
                image: [Competition, Present, Recognition]
            })),
        },
        {
            type: 'Trips',
            events: data?.filter((event: Events) => event.EventType === 'Trip').slice(0, 3).map((event: Events) => ({
                info: event.description,
                title: event.Title,
                image: [Trips, Photo, Club]
            })),
        },
        {
            type: 'TechTalks',
            events: data?.filter((event: Events) => event.EventType === 'TechTalk').slice(0, 3).map((event: Events) => ({
                info: event.description,
                title: event.Title,
                image: [Photo, Present, Presentation]
            })),
        }
    ]

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: true
    }

    return (
        <>
            <div>
                <div>
                    <Header />
                </div>
                <div className=" flex flex-col gap-y-10 overflow-x-hidden">
                    <div className="flex items-center justify-center">
                        <div className="absolute flex flex-col items-center">
                            <h1 className="font-bold text-3xl text-white">
                                <motion.div
                                    initial={{ y: -100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 3 }}
                                >
                                    TeCom: Invent With Us
                                </motion.div>
                            </h1>
                            <p className="text-white">
                                <TypewriterComponent
                                    onInit={(typewriter) => {
                                        typewriter.typeString('The Leading STEM Club at Al Akhawayn University')
                                            .pauseFor(2000)
                                            .start();
                                    }}
                                />
                            </p>
                        </div>
                        <video className="h-550 w-screen object-cover" src={videoBG} autoPlay loop muted />
                    </div>
                    <div ref={ref} className=" space-y-12 mb-5">
                        <motion.div
                            initial="hidden"
                            animate={controls}
                            variants={{
                                hidden: { opacity: 0, x: -100 },
                                visible: { opacity: 1, x: 0, transition: { duration: 1 } }
                            }}
                        >
                            <HorizontalLine />
                        </motion.div>
                        <motion.div initial="hidden"
                            animate={controls}
                            variants={{
                                hidden: { opacity: 0, y: -100 },
                                visible: { opacity: 1, y: 0, transition: { duration: 5 } }
                            }}>
                            <Slider {...settings}>
                                {carousels.map((carousel, index) => (
                                    <div key={index} className="carousel-section">
                                        <h2 className="text-center text-xl font-bold">{carousel?.type}</h2>
                                        <div className={`flex ${isPhoneScreen ? ' flex-col space-y-4 items-center' : ' flex-row space-x-4'} justify-center mt-4`}>
                                            {carousel.events?.map((event: Event, idx: number) => (
                                                <div key={idx} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                    <img className="rounded-t-lg h-64 w-full" src={event?.image![idx]} alt={event?.title} />

                                                    <div className=" p-1">

                                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{event?.title}</h5>
                                                        <motion.div initial={{ opacity: 0 }} whileHover={{
                                                            scale: 1.0,
                                                            opacity: 1,
                                                            transition: { duration: 1 },
                                                        }}
                                                            whileTap={{ scale: 0.0, opacity: 0 }}>
                                                            <p className={` text-center mb-3 font-normal text-gray-700 dark:text-gray-400`}>{event?.info}</p>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </motion.div>
                        <motion.div className={`flex ${isPhoneScreen ? 'flex-col items-center justify-center' : 'flex-row'} justify-between p-2 `} initial="hidden"
                            animate={controls}
                            variants={{
                                hidden: { opacity: 0, y: -100 },
                                visible: { opacity: 1, y: 0, transition: { duration: 2 } }
                            }}>
                            <motion.div animate={controls}
                                variants={{
                                    hidden: { opacity: 0, x: -100 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 4 } }
                                }} className={`flex flex-col gap-7 justify-center pl-10 text-center ${isPhoneScreen && 'items-center'}`} initial="hidden">
                                <h1 className=" font-quickSand font-bold text-2xl">Innovation, Collaboration, Inclusivity, & Excellence</h1>
                                <p className=" font-roboto">
                                    Striving for continuous improvement and pushing the boundaries of technological possibilities.
                                </p>
                            </motion.div>
                            <motion.div animate={controls}
                                variants={{
                                    hidden: { opacity: 0, x: -100 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 4 } }
                                }} initial="hidden">
                                <img src={bgImg} className=" h-96 pr-10"></img>
                            </motion.div>
                        </motion.div>
                        {/* {
                            dialog && <Join onClose={() => setDialog(false)} />
                        }
                        <motion.div animate={controls}
                            variants={{
                                hidden: { opacity: 0, y: -100 },
                                visible: { opacity: 1, y: 0, transition: { duration: 2 } }
                            }} initial="hidden" className=" flex justify-center items-center">
                            <button className=" bg-clearBlue text-white font-roboto p-3 rounded-lg hover:bg-orange-500 hover:duration-300  text-xl" onClick={() => setDialog(true)}>Join the Club</button>
                        </motion.div> */}
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
