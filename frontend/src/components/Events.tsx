import { useEffect, useState } from "react"
import { useGetEventsQuery } from "../../Api/EventsApi"
import { EditEvent, Events } from "../../utils/Types"
import { SelectedTypes } from '../../utils/constants'
import Select from 'react-select'
import { useSelector } from "react-redux"
import { getCurrentUser } from "../../State/authSlice"
import { Navigate } from "react-router-dom"
import RegisterEvent from "./RegisterEvent"
import Delete from "./Delete"
import EditEventDialog from "./EditEvent"

export default function Event() {
    const [type, setType] = useState<string | undefined>('all')
    const [updated, setUpdated] = useState(false)
    const [editEvent, setEdit] = useState(false)
    const user = useSelector(getCurrentUser)
    const [register, setRegister] = useState(false)
    const { data, refetch } = useGetEventsQuery(type!)
    const [confirmDelete, setDelete] = useState(false)
    const [event, setEventId] = useState<string>('')
    const [Data_toBeEdited, setData] = useState<EditEvent>()

    useEffect(() => {
        if (updated) {
            refetch()
            setUpdated(false)
        }
    }, [refetch, type, updated])

    if (!user) return <Navigate to='/login' />

    return (
        <>
            {confirmDelete && <Delete onClose={() => setDelete(false)} eventId={event} edited={() => setUpdated(true)} />}

            {register && <RegisterEvent onClose={() => setRegister(false)} edited={() => setUpdated(true)} />}

            {editEvent && <EditEventDialog onClose={() => setEdit(false)} EventId={Data_toBeEdited?.EventId} Description={Data_toBeEdited?.description} Title={Data_toBeEdited?.Title} edited={() => setUpdated(true)} Dates={Data_toBeEdited?.date} type={Data_toBeEdited?.Type}/>}

            <div className="flex flex-col gap-4 font-quickSand">
                <div className="flex justify-between p-4">
                    <h1 className="text-2xl">Events</h1>
                    <div className="flex items-center gap-2">
                        <h3>Filter By Event Type:</h3>
                        <Select
                            className="basic-single w-56"
                            classNamePrefix="select"
                            defaultValue={SelectedTypes[0]}
                            name="Event Type"
                            options={SelectedTypes}
                            onChange={(selectedOption) => setType(selectedOption?.value)}
                        />
                    </div>
                    <div>
                        {user.Position === 'President' && <button className="bg-clearBlue text-white font-bold pl-4 pr-4 pt-2 pb-2 rounded-xl hover:duration-300 hover:bg-black" onClick={() => {
                            setRegister(true)
                            setUpdated(false)
                        }}>Register New Event</button>}
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    {data?.map((event: Events) => (
                        <div key={event.EventId} className="w-56 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex flex-col items-center pb-10 pt-10">
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{event.Title}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{event.EventType}</span>
                                {user.Position === 'President' && <div className="flex mt-4 md:mt-6">
                                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-clearBlue rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => {
                                        setData({ description: event.description, Title: event.Title, EventId: event.EventId, Type: event.EventType, date: event.date })
                                        setEdit(true)
                                    }
                                    }
                                    >Edit</button>
                                    <button className="py-2 px-4 ms-2 text-sm font-medium focus:outline-none bg-black text-clearBlue rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => {
                                        setEventId(event.EventId)
                                        setDelete(true)
                                    }}>Delete</button>
                                </div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
