import { Request, Response } from 'express'
import { DeleteEventService, GetAllEventsService, PostEventService, UpdateEventService } from '../services/events.services'
export async function GetEventsController(req: Request, res: Response) {
    const { type } = req.params
    try {
        const Events = await GetAllEventsService(type)
        res.status(200).send(Events)
    } catch (error) {
        res.status(500).send('Server Error')
    }
}

export async function PostEventsController(req: Request, res: Response) {
    const event = req.body
    try {
        await PostEventService(event);
        res.status(200).send('Event Created Successfully');
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
}

export async function DeleteEventController(req: Request, res: Response) {
    const { eventId } = req.params
    try {
        await DeleteEventService(eventId)
        res.status(200).json({ message: 'Event Deleted Successfully' })
        console.log('deleted')

    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

export async function UpdateEventController(req: Request, res: Response) {
    const newData = req.body
    try {
        await UpdateEventService(newData)
        res.status(200).send('Event has been updated')
    } catch (error) {
        res.status(500).send('Server Error')
    }
}