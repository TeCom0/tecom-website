import { object, string } from 'zod';

export const EventSchema = object({
    body: object({
        Title: string({
            required_error: 'Title is required',
        }).min(1, 'Title cannot be empty'),

        description: string({
            required_error: 'Description is required',
        }).min(10, 'Description is too short'),

        date: string({
            required_error: 'Date is required',
        }),

        Location: string({
            required_error: 'Location is required',
        }).min(1, 'Location cannot be empty')
    })
});
