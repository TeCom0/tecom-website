import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import { motion } from "framer-motion";
import { useAddEventMutation } from "../../Api/EventsApi";
import { SingleValue } from 'react-select';
import toast from "react-hot-toast";
import { Events } from "../../utils/Types";
import CreatableSelect from 'react-select/creatable';

interface Props {
    onClose: () => void;
    edited: () => void;
}

export default function RegisterEvent(prop: Props) {
    const { onClose, edited } = prop;
    const [date, setDate] = useState<Date | null>(new Date());
    const [selectedEventType, setSelectedEventType] = useState<string | undefined>('');
    const [selectedPlace, setSelectedPlace] = useState<string | undefined>('');
    const Schema = yup.object().shape({
        Title: yup.string().required('Event Title is required'),
        description: yup.string().min(10, "Description is too short").required('Description is required'),
    });

    const initialValues: Events = {
        Title: "",
        description: "",
        Location: "",
        EventType: "",
        date: "",
        EventId: "",
        updatedAt: ""
    };

    const [addEvent] = useAddEventMutation();

    const handleSubmit = async (values: Events) => {
        const eventData = {
            ...values,
            EventType: selectedEventType || "",
            date: date?.toISOString() || "",
            Location: selectedPlace || ""
        };

        console.log(eventData)
        try {
            const response = await addEvent(eventData);
            onClose();
            edited();
            toast.success(response.data || 'Event Registered');
        } catch (error: unknown) {
            console.error("Error registering event:", error);
            toast.error('Registering the Event Failed');
        }
    };

    const options = [
        { value: 'Workshop', label: 'Workshop' },
        { value: 'Competition', label: 'Competition' },
        { value: 'Trip', label: 'Trip' },
        { value: 'TechnoBreak', label: 'TechnoBreak' },
        { value: 'TechTalk', label: 'TechTalk' }
    ];

    const PlaceOptions = [
        { value: 'Event Room - Al Akhawayn University', label: 'Event Room - AUI' },
        { value: 'M6L ThinkSpace - Al Akhawayn University', label: 'M6L ThinkSpace - AUI' },
        { value: 'Auditorium 4 - Al Akhawayn University', label: 'Auditorium 4 - AUI' },
        { value: 'Auditorium 6 - Al Akhawayn University', label: 'Auditorium 6 - AUI' },
        { value: 'Lab 8B - Al Akhawayn University', label: 'Lab 8B - AUI' },
        { value: 'Lab 7 - Al Akhawayn University', label: 'Lab 7 - AUI' },
        { value: 'Lab 11 - Al Akhawayn University', label: 'Lab 11 - AUI' }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 flex bg-gray-900 bg-opacity-50 overflow-hidden justify-center items-center z-50"
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Register an Event
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => onClose()}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={Schema}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            <Form>
                                <div className="mb-4">
                                    <label htmlFor="Title" className="block text-gray-700 dark:text-gray-200">Event Title</label>
                                    <Field
                                        name="Title"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
                                    />
                                    <ErrorMessage name="Title" component="div" className="text-red-600" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-gray-700 dark:text-gray-200">Describe this Event</label>
                                    <Field
                                        name="description"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-600" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Location" className="block text-gray-700 dark:text-gray-200">Location</label>
                                    <CreatableSelect options={PlaceOptions} onChange={(selectedOption: SingleValue<{ value: string; label: string }>) => setSelectedPlace(selectedOption?.value)} />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-200 mb-2">Type of Event</label>
                                    <Select
                                        options={options}
                                        onChange={(selectedOption: SingleValue<{ value: string; label: string }>) =>
                                            setSelectedEventType(selectedOption?.value)
                                        }
                                        className="w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-200 mb-2">Date</label>
                                    <DatePicker
                                        selected={date}
                                        onChange={(date: Date | null) => setDate(date)}
                                        className="w-full border rounded-xl p-2"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className=" bg-clearBlue text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                        Register Event
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
