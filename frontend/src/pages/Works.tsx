import { motion } from "framer-motion";
import Header from "../components/Header";
import techTalk from '../assets/fintech.jpg'
import techtalk2 from '../assets/Conference2.jpg'
import techtalk3 from '../assets/Conference.jpg'
import { useGetEventsQuery } from "../../Api/EventsApi";
import { Events } from "../../utils/Types";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Workshop from '../assets/workshop.jpg'
import Technobreak from '../assets/TechnoBreaks.jpg'
import Club from '../assets/Club.jpeg'
import Photo from '../assets/ClubFair.jpeg'
import Pic from '../assets/Events.jpeg'
import ClubPhoto from '../assets/Presentation.jpeg'
import Present from '../assets/Present.jpeg'
import pics from '../assets/Awards.jpeg'
import photos from '../assets/Recognition.jpeg'
import Slider from "react-slick";
import Workshop2 from '../assets/Workshopss.jpeg'
import Workshop3 from '../assets/Work.jpeg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { Descriptions } from "../../utils/constants";
import { DNA } from "react-loader-spinner";

export default function Works() {
    const Images = [Workshop, Workshop2, Workshop3, techTalk, techtalk2, techtalk3, Club, Technobreak, Photo, Pic, ClubPhoto, Present, pics, photos]

    let shuffledImages: string[] = [];
    let currentIndex = 0;

    const shuffleArray = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const randomizeImages = () => {
        if (currentIndex === 0) {
            shuffledImages = [...Images];
            shuffleArray(shuffledImages);
        }

        const image = shuffledImages[currentIndex];
        currentIndex = (currentIndex + 1) % Images.length;

        return image;
    };

    const { eventType } = useParams();
    const [key, setKey] = useState(eventType);

    const getDescription = () => {
        return Descriptions.filter(value => value.type === eventType)[0].description
    }

    useEffect(() => {
        setKey(eventType);
    }, [eventType]);

    const formatDate = (isoString: string | number | Date) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    };

    const ImageSrc = (type: string) => {
        switch (type) {
            case 'Workshop':
                return Workshop;
            case 'TechnoBreak':
                return Technobreak;
            case 'TechTalk':
                return techTalk;
            case 'UpComingEvent':
                return Club;
            default:
                break;
        }
    };

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        arrows: true
    };

    const { data, isLoading } = useGetEventsQuery(eventType);

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

    return (
        <>
            <Header />
            <div className="space-y-9 px-4 sm:px-6 lg:px-8">
                <motion.div
                    key={key}
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2 }}
                    className="flex flex-col sm:flex-row items-center p-4 sm:p-8 bg-black rounded-lg"
                >
                    <img src={ImageSrc(eventType!)} className="h-48 w-full sm:h-96 sm:w-1/2 object-cover rounded-lg" />
                    <div className="font-quickSand flex flex-col justify-center items-center mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                        <h1 className="font-bold text-2xl text-clearBlue mb-2">{eventType === 'UpComingEvent' ? 'UpComing Events' : eventType}</h1>
                        <p className="text-white">
                            {getDescription()}
                        </p>
                    </div>
                </motion.div>
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-32 sm:w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                    <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                        <svg
                            className="w-4 h-4 text-gray-700 dark:text-gray-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 14"
                        >
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                        </svg>
                    </div>
                </div>
                <div className="flex justify-center text-2xl font-bold mb-4">
                    <h1>Our {eventType === 'UpComingEvent' ? 'Future' : eventType} Activities</h1>
                </div>
                <div className="flex flex-wrap gap-5 justify-center">
                    {data?.map((event: Events) => (
                        <div key={event?.EventId} className="max-w-sm w-full sm:w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <Slider {...settings} className="rounded-t-lg">
                                <div>
                                    <img src={randomizeImages()} className="h-56 w-full object-cover rounded-t-lg" />
                                </div>
                                <div>
                                    <img src={randomizeImages()} className="h-56 w-full object-cover rounded-t-lg" />
                                </div>
                                <div>
                                    <img src={randomizeImages()} className="h-56 w-full object-cover rounded-t-lg" />
                                </div>
                            </Slider>
                            <div className="p-4">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{event?.Title}</h5>
                                <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{formatDate(event.date)}</h2>
                                <p className="text-center mb-3 font-normal text-gray-700 dark:text-gray-400">{event?.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
