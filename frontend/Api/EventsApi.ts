
import { EditEvent, Events } from "../utils/Types"
import { apiSlice } from "./apiSlice"
const EventsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: (type: string | undefined) => ({ url: `events/${type}`, method: 'GET' })
        }),
        addEvent: builder.mutation({
            query: (event: Events) => ({ url: 'events/Register', method: 'POST', body: event })
        }),
        deleteEvent: builder.mutation<string, string>({
            query: (eventId) => ({
                url: `/events/${eventId}`,
                method: 'DELETE',
            }),
            transformResponse: (response: { message: string }) => response.message,
        }),
        EditEvent: builder.mutation({
            query: (value: EditEvent) => ({ url: '/Edit', method: 'PUT', body: value })
        })
    })
})

export const {
    useGetEventsQuery,
    useAddEventMutation,
    useDeleteEventMutation,
    useEditEventMutation
} = EventsApiSlice