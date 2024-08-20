import prisma from "../../prisma/Generator";
import { Request, Response } from 'express'
import { EditEvent, Events } from "../../utils/Types";
import multer from 'multer'
import { faker } from "@faker-js/faker";
const upload = multer({ dest: 'uploads/' });
export async function GetAllEventsService(type: string) {
    try {
        const events = await prisma.events.findMany({
            where: type === 'all' ? {} : { EventType: type },
        });
        return events
    } catch (error) {
        console.log('Error to get events')
    }
}

export async function PostEventService(event: Events) {
    const { EventType, date, description, Location, Title } = event
    try {
        await prisma.events.create({
            data: {
                EventId: faker.string.uuid(),
                description: description,
                Location: Location,
                Title: Title,
                EventType: EventType,
                date: new Date(date),
                updatedAt: new Date(date)
            }
        });
    } catch (error) {
        console.log('Error creating event', error);
        throw error;
    }
}

export async function DeleteEventService(eventId: string) {
    try {
        await prisma.events.delete({
            where: {
                EventId: eventId
            }
        })
    } catch (error) {
        throw error
    }
}

export async function UpdateEventService(data: EditEvent) {
    const { Title, description, EventId } = data

    try {
        await prisma.events.update({
            where: {
                EventId: EventId
            },
            data: {
                Title: Title,
                description: description
            }
        })
    } catch (error) {
       throw error
    }

}