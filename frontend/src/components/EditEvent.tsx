import { motion } from "framer-motion";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup'
import { useEditEventMutation } from "../../Api/EventsApi";
import { EditEvent } from "../../utils/Types";
import toast from "react-hot-toast";
import { useState } from "react";
import DatePicker from "react-datepicker";

interface Prop {
    onClose: () => void,
    Title: string | undefined
    Description: string | undefined
    EventId: string | undefined
    type?: string
    Dates?: string
    edited: () => void
}

export default function EditEventDialog(prop: Prop) {

    const { onClose, Title, Description, edited, EventId, type, Dates } = prop

    const [dates, setDate] = useState<Date | null>(new Date(Dates || ""));


    const [EditEvent] = useEditEventMutation()

    const schema = yup.object({
        Title: yup.string().required(),
        Description: yup.string().min(10, 'Description is too short').required()
    })

    const InitialValues: EditEvent = {
        Title: Title || "",
        description: Description || "",
        EventId: EventId || "",
        Type: type || ""
    }

    const handleSubmit = async (values: EditEvent) => {
        const eventData = {
            ...values,
            date: dates?.toISOString() || "",
        }
        console.log('Event data to be sent:', eventData);

        try {
            const response = await EditEvent(eventData);
            edited();
            onClose();
            toast.success(response.data);
        } catch (error) {
            console.error('Error updating event:', error);
            toast.error('Update Failed');
        }
    };

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
                            Update an Event
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
                            initialValues={InitialValues}
                            validationSchema={schema}
                            onSubmit={(values) => {
                                handleSubmit(values)
                                console.log('triggered')
                            }}

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
                                    <label htmlFor="description" className="block text-gray-700 dark:text-gray-200">Description</label>
                                    <Field
                                        name="description"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-600" />
                                </div>
                                {type === 'UpComingEvent' && (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 dark:text-gray-200 mb-2">Date</label>
                                        <DatePicker
                                            selected={dates}
                                            onChange={(date: Date | null) => setDate(date)}
                                            className="w-full border rounded-xl p-2"
                                        />
                                    </div>
                                )}
                                <div className="flex justify-end">
                                    <button type="submit" className="bg-clearBlue text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                        Update Event
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